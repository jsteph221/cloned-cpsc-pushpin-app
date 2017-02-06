import React from 'react'
import ReactDOM from 'react-dom'
import Map, {InfoWindow,Marker,GoogleApiWrapper} from 'google-maps-react'

const Container = React.createClass({
    getInitialState: function() {
        return {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
        }
    },

    onMapMoved: function(props, map) {
        const center = map.center;
    },

    onMarkerClick: function(props, marker) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    },

    onInfoWindowClose: function() {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        })
    },

    onMapClicked: function(props) {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    },

    render: function() {
        if (!this.props.loaded) {
            return <div>Loading...</div>
        }

        return (
            <Map google={this.props.google}
                 style={{width: '100%', height: '100%', position: 'relative'}}
                 className={'map'}
                 zoom={14}
                 containerStyle={{}}
                 centerAroundCurrentLocation={true}
                 onClick={this.onMapClicked}
                 onDragend={this.onMapMoved}>
                <Marker onClick={this.onMarkerClick} name={'Current location'} />
                <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                    </div>
                </InfoWindow>
            </Map>
        )
    }
});

export default Container;
/**
 * Created by Sven on 2/5/2017.
 */
