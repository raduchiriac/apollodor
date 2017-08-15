import React from 'react';
import ReactMapboxGl, { Marker } from "react-mapbox-gl";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN

const Map = ReactMapboxGl({
  accessToken: MAPBOX_TOKEN
});

export class MapView extends React.Component {

  // constructor() {
  //   super();
  // }

  render() {
    return <Map
      // eslint-disable-next-line
      style="mapbox://styles/radd/cj52jmzt71i7w2smvfwkdl09z"
      containerStyle={{
        height: "100vh",
        width: "100vw"
      }}>
        <Marker
          coordinates={[-0.2416815, 51.5285582]}
          anchor="bottom">
          <img alt="" width="50" height="50" src="http://www.aquota.net/dms/documenti-aquota/infinity-mobile/geolocal.png"/>
        </Marker>
    </Map>
  }
}
