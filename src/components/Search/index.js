import React from 'react';
import { Image, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import styles from './styles';

import env from '../../../env';

export default class Map extends React.Component {
    state = {
        searchFocused: false
    }

    render(){

        const { searchFocused } = this.state;
        const { onLocationSelected } = this.props;
        return (
            <GooglePlacesAutocomplete
                placeholder='Para onde?'
                placeholderTextColor="#333"
                fetchDetails
                onPress={onLocationSelected}
                   
                query={{
                    key: env.googleApiKey,
                    language: 'pt-BR',
                }}
                
                textInputProps={{
                    autoCapitalize: 'none',
                    autoCorrect: false,
                    onFocus: () => { this.setState({ searchFocused: true }) },
                    onBlur: () => { this.setState({ searchFocused: false }) }
                }}

                listViewDisplayed={searchFocused}

                enablePoweredByContainer={false}
                styles={styles}
            />
        );
    }
}