import Geolocation from "@react-native-community/geolocation";
import { LocationObject } from "expo-location";
import { useEffect, useState } from "react";

const useLocation = () => {
  const [location, setLocation] = useState<LocationObject | null>(null);

  useEffect(() => {
    (async () => {
      Geolocation.requestAuthorization(
        () => {
          Geolocation.getCurrentPosition(
            (position: {
              coords: {
                latitude: number;
                longitude: number;
                altitude: number | null;
                accuracy: number;
                altitudeAccuracy: number | null;
                heading: number | null;
                speed: number | null;
              };
              timestamp: number;
            }) => {
              setLocation(position);
            },
            (error: {
              code: number;
              message: string;
              PERMISSION_DENIED: number;
              POSITION_UNAVAILABLE: number;
              TIMEOUT: number;
            }) => {
              alert(error);
            }
          );
        },
        (error: {
          code: number;
          message: string;
          PERMISSION_DENIED: number;
          POSITION_UNAVAILABLE: number;
          TIMEOUT: number;
        }) => {
          alert(error.code);
        }
      );
    })();
  }, []);

  return location;
};

export default useLocation;
