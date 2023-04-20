import React from 'react';
import {Circle, GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api';

const apiKey = 'AIzaSyDo0KVqGLzCqIUks4a8UJSuAJSW_k3ec3o';

export function MapSection(props: {
    lat: number;
    lng: number;
    zoom: number;
    height: string;
}) {
    // Set the Google Maps API key and options
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey,
        libraries: ['geometry', 'drawing'],
    });
    const options = {
        center: {lat: props.lat, lng: props.lng},
        zoom: props.zoom
    };


    const circleOptions = {
        center: options.center,
        radius: 500, // Example: Draw a circle with 500 meters radius
        fillColor: '#66B8CA', // Set the fill color of the circle
        fillOpacity: 0.2, // Set the fill opacity of the circle
        strokeColor: '#66B8CA', // Set the stroke color of the circle
        strokeWeight: 2, // Set the stroke weight of the circle
        clickable: true, // Make the circle clickable
    };
    return <div>
        {isLoaded &&
            <GoogleMap mapContainerStyle={{height: props.height, width: '100%'}} center={options.center}
                       zoom={options.zoom}>
                <Circle  options={circleOptions} center={options.center}  radius={500} />
                {/*   <Marker position={options.center}/>*/}
            </GoogleMap>
        }
    </div>;
}


