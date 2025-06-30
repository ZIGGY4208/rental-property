import React from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
  borderRadius: "1rem",
};

const center = {
  lat: 4.1607,
  lng: 9.2439, // Buea center
};

const HouseMap = ({ houses = [] }) => {
  const [selectedHouse, setSelectedHouse] = React.useState(null);

  if (!Array.isArray(houses) || houses.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No house locations to display.
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey="AIzaSyAY1W02AXuK8_0TeLhwa0YMSAwvUWq04Ao">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
      >
        {houses.map((house) => (
          house.coordinates && (
            <Marker
              key={house.id}
              position={house.coordinates}
              onClick={() => setSelectedHouse(house)}
            />
          )
        ))}

        {selectedHouse && (
          <InfoWindow
            position={selectedHouse.coordinates}
            onCloseClick={() => setSelectedHouse(null)}
          >
            <div className="text-sm max-w-xs">
              <strong>{selectedHouse.type}</strong>
              <br />
              {selectedHouse.location}
              <br />
              <span className="text-purple-600 font-semibold">
                FCFA {selectedHouse.price.toLocaleString()}
              </span>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default HouseMap;
