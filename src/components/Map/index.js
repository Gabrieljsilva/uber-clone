import React, { Fragment } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Image } from 'react-native';
import Geocoder from 'react-native-geocoding';

/**STYLES */
import { Back, LocationBox, LocationText, LocationTimeBox, LocationTimeText, LocationTimeTextSmall } from './styles'

/**COMPONENTS */
import Search from '../Search';
import Directions from '../Directions';
import Details from '../Details';

/**UTILS */
import getPixelSize from '../../utils/getPixelSize';
import env from '../../../env';

/**ASSETS */

import markerImg from '../../assets/marker.png';
import backImg from '../../assets/back.png';

/**INITIALIZERS */
Geocoder.init(env.googleApiKey);

export default class Map extends React.Component {
    state = {
        location: null,
        region: null,
        destination: null,
        duration: null
    }

    async componentDidMount(){
        navigator.geolocation.getCurrentPosition(
            /** On Success */
            async ({ coords: { latitude, longitude } }) => {

                const response = await Geocoder.from({ latitude, longitude });

                const addres = response.results[0].formatted_address;
                const location = addres.substring(0, addres.indexOf(','));



                this.setState({
                    location,
                    region: {
                        latitude,
                        longitude,
                        latitudeDelta: 0.0143,
                        longitudeDelta: 0.0134
                    }
                })
            },
            /**On Fail */
            () => {
                alert('Houve um erro ao carregar sua localização')
            },
            {
                timeout: 2000,
                enableHighAccuracy: true,
                maximumAge: 1000
            }
        );
    }

    handleLocationSelected = (data, { geometry }) => {
        const { location: { lat: latitude, lng: longitude } } = geometry;
        this.setState({
            destination: {
                latitude,
                longitude,
                title: data.structured_formatting.main_text
            }
        });

    }

    handleBack = () => {
        this.setState({
            destination: null
        });
    }

    render() {
        const { region, destination, duration, location } = this.state;

        return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                region={region}
                showsUserLocation
                loadingEnabled
                ref={el => this.MapView = el}>
                    
                {
                    destination && (
                        <Fragment>
                            <Directions
                                origin={region}
                                destination={destination}
                                onReady={(result) => {
                                    this.setState({ duration: Math.floor(result.duration) });
                                    this.MapView.fitToCoordinates(result.coordinates, {
                                        edgePadding: {
                                            right:      getPixelSize(50),
                                            left:       getPixelSize(50),
                                            top:        getPixelSize(50),
                                            bottom:     getPixelSize(350)
                                        }
                                    })
                                }}
                            />

                            <Marker coordinate={destination} anchor={{ x: 0, y:0 }} image={markerImg} >
                                <LocationBox>
                                    <LocationText>
                                        { destination.title }
                                    </LocationText>
                                </LocationBox>
                            </Marker>

                            <Marker coordinate={region}>
                                <LocationBox>
                                    <LocationTimeBox>
                                        <LocationTimeText>{duration}</LocationTimeText>
                                        <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                                    </LocationTimeBox>
                                    <LocationText>{location}</LocationText>
                                </LocationBox>
                            </Marker>

                        </Fragment>
                    )
                }

            </MapView>
            
            { destination ?
            (
            <Fragment>
                <Back onPress={this.handleBack} >
                    <Image source={backImg}></Image>
                </Back>
                <Details></Details>
            </Fragment>
            )
            :
            <Search onLocationSelected={this.handleLocationSelected} /> }

            
            
        </View>
        );
    }
}
