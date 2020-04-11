import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

import env from '../../../env';

export default function Directions({ destination, origin, onReady }){
    
    return(
        <MapViewDirections
            destination={{
                latitude: destination.latitude,
                longitude: destination.longitude
            }}

            origin={origin}
            onReady={onReady}
            apikey={env.googleApiKey}
            strokeWidth={3}
            strokeColor="#222"
        />
    );
}