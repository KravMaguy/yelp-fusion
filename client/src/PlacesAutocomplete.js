import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export default function LocationSearchInput({
  place,
  setPlace,
  className,
  setCenter,
}) {
  const handleChange = (address) => {
    setPlace(address);
  };

  const handleSelect = (address) => {
    console.log(address, "the selected address here");
    setPlace(address);

    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        console.log("Success", latLng);
        setCenter({ lat: latLng.lat, lng: latLng.lng });
      })
      .catch((error) => console.error("Error", error));
  };

  return (
    <PlacesAutocomplete
      value={place}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <>
          <input
            {...getInputProps({
              placeholder: "Search Places ...",
              className: `location-search-input ${className}`,
            })}
          />
          <div className='my-container'>
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: "#fafafa", cursor: "pointer" }
                : {
                    backgroundColor: "black",
                    cursor: "pointer",
                    color: "white",
                  };
              return (
                <div
                  key={suggestion.description}
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </PlacesAutocomplete>
  );
}
