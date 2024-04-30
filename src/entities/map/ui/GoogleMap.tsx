import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from '@vis.gl/react-google-maps';

export const GoogleMap = ({
  lat,
  lng,
  setLat,
  setLng,
  closeMap,
}: {
  lat: number;
  lng: number;
  setLat: (lat: number) => void;
  setLng: (lng: number) => void;
  closeMap: () => void;
}) => {
  const position = { lat: lat, lng: lng };

  const handleLatLngOnPinDrag = (e: google.maps.MapMouseEvent) => {
    setLat(e.latLng!.lat());
    setLng(e.latLng!.lng());
    closeMap();
  };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <div className="h-full w-full">
        <Map
          defaultCenter={position}
          defaultZoom={12}
          mapId={process.env.NEXT_PUBLIC_MAP_ID}
        >
          <AdvancedMarker
            draggable
            position={position}
            onDragEnd={handleLatLngOnPinDrag}
          >
            <Pin scale={1.2} />
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
};
