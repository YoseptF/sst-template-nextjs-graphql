"use client";

import {
  FC,
  useEffect,
  useRef,
  useState
} from "react";

import { Loader } from "@googlemaps/js-api-loader";
import { useSearchParams } from "next/navigation";

const loader = new Loader({
  apiKey: "AIzaSyA93OhFjBkFFg0vHaUoTB1xx2CaAMiMzPk",
  version: "beta",
  libraries: ["places", "core", "geocoding"]
});

const mapOptions: google.maps.MapOptions = {
  center: {
    lat: 19.375,
    lng: -98,
  },
  zoom: 9,
  mapId: "55b1b5e405625fc7",
};

const MexicanStates = {
  AGUASCALIENTES: {
    placeId: "ChIJuRMJdqXmKYQRHxX0saYvLmY",
    lat: 22.001,
    lng: -102.355,
  },
  BAJA_CALIFORNIA_NORTE: {
    placeId: "ChIJ0913qAxw14ARjt4YA5_9pPw",
    lat: 30.375,
    lng: -115.75,
  },
  BAJA_CALIFORNIA_SUR: {
    placeId: "ChIJyR6itTnTr4YRGFmnqTqz33E",
    lat: 24.144,
    lng: -110.300,
  },
  CAMPECHE: {
    placeId: "ChIJFeLHS0LD6IURw_yqe4z3i-Y",
    lat: 19.830,
    lng: -90.500,
  },
  CHIAPAS: {
    placeId: "ChIJZ85Xl7REjYURFdYZRoIzAM8",
    lat: 16.756,
    lng: -93.129,
  },
  CHIHUAHUA: {
    placeId: "ChIJCaSRhS91loYRB36nQFPig5s",
    lat: 28.633,
    lng: -106.069,
  },
  COAHUILA: {
    placeId: "ChIJKR6Opr1yiIYROXrNFNeaAGQ",
    lat: 27.058,
    lng: -101.706,
  },
  COLIMA: {
    placeId: "ChIJ6yVw_g0yJYQRCmlXH5dAHiw",
    lat: 19.245,
    lng: -103.725,
  },
  DURANGO: {
    placeId: "ChIJSUVzr8GpkIYRsgjjq0HifSk",
    lat: 24.027,
    lng: -104.653,
  },
  CUERNAVACA: {
    placeId: "ChIJR_72Ja7fzYURD91poSWCX5c",
    lat: 18.921,
    lng: -99.234,
  },
  GUANAJUATO: {
    placeId: "ChIJf3-bUI9bK4QRoEO-gRmmjuc",
    lat: 21.019,
    lng: -101.257,
  },
  GUERRERO: {
    placeId: "ChIJPyAn81hly4UROst3QpsiNzE",
    lat: 17.439,
    lng: -99.545,
  },
  HIDALGO: {
    placeId: "ChIJ5y_OIgQK0YURG3hAeb_FUoE",
    lat: 20.091,
    lng: -98.762,
  },
  JALISCO: {
    placeId: "ChIJb05i1OtAH4QRU0obWqOw_qA",
    lat: 20.659,
    lng: -103.349,
  },
  MEXICO_CITY: {
    placeId: "ChIJJyk1sTYAzoURW4rR6E6e_d4",
    lat: 19.432,
    lng: -99.133,
  },
  MICHOACAN: {
    placeId: "ChIJt1yzHj5fKoQR1OBL8wxlxzs",
    lat: 19.566,
    lng: -101.706,
  },
  MORELOS: {
    placeId: "ChIJR_72Ja7fzYURD91poSWCX5c",
    lat: 18.681,
    lng: -99.101,
  },
  NAYARIT: {
    placeId: "ChIJR9s-5pyoIIQROdKUhqL1yMI",
    lat: 21.751,
    lng: -104.845,
  },
  NUEVO_LEON: {
    placeId: "ChIJXbClooSVYoYRxrtsw0L0HXA",
    lat: 25.592,
    lng: -99.996,
  },
  OAXACA: {
    placeId: "ChIJUVwOOk_YwIURyQvZPUMMxkQ",
    lat: 17.064,
    lng: -96.727,
  },
  PUEBLA: {
    placeId: "ChIJZafA3bCMz4URrSAC1luuXOI",
    lat: 19.375,
    lng: -98,
  },
  QUERETARO: {
    placeId: "ChIJX3BEYdFE04URu2lIpMSxRpE",
    lat: 20.588,
    lng: -100.389,
  },
  QUINTANA_ROO: {
    placeId: "ChIJlSbD6vD8T48RnI1MSCrF8MQ",
    lat: 19.181,
    lng: -88.479,
  },
  SAN_LUIS_POTOSI: {
    placeId: "ChIJefusBQCiKoQRXkEExEGyIOY",
    lat: 22.156,
    lng: -100.985,
  },
  SINALOA: {
    placeId: "ChIJWUmnKJRTn4YR71--DXbfe5w",
    lat: 24.806,
    lng: -107.394,
  },
  SONORA: {
    placeId: "ChIJD9JN52kpmIYRdOO7_Br_Vs0",
    lat: 29.297,
    lng: -110.331,
  },
  STATE_OF_MEXICO: {
    placeId: "ChIJOwrrwJKJzYURV6jFn775_sI",
    lat: 19.496,
    lng: -99.723,
  },
  TABASCO: {
    placeId: "ChIJT8t4j1_77YURRGuG2RHLJtQ",
    lat: 17.840,
    lng: -92.618,
  },
  TAMAULIPAS: {
    placeId: "ChIJWSQe265TeYYRJRnoNVqfhTM",
    lat: 24.266,
    lng: -98.836,
  },
  TLAXCALA: {
    placeId: "ChIJE2EAHD_Zz4UR4L181Friujg",
    lat: 19.319,
    lng: -98.237,
  },
  VERACRUZ: {
    placeId: "ChIJbVJUr9BVw4URs7kQZwp_dy0",
    lat: 19.173,
    lng: -96.134,
  },
  YUCATAN: {
    placeId: "ChIJ7QTWqvgPVI8RCj0IMXUhzMw",
    lat: 20.709,
    lng: -89.094,
  },
  ZACATECAS: {
    placeId: "ChIJb_7JfqDRgYYRmG0lXv0tHxw",
    lat: 22.770,
    lng: -102.583,
  },
};

const GoogleMap: FC = () => {
  const [map, SetMap] = useState<google.maps.Map>();
  const mapsRef = useRef<HTMLDivElement>(null);

  const searchParams = useSearchParams();

  const state = searchParams.get("state") as (keyof typeof MexicanStates) | undefined;

  useEffect(() => {
    const loadMap = async () => {
      const { Map } = await loader.importLibrary("maps");
      const currentMap = new Map(mapsRef.current!, mapOptions);

      const featureStyleOptions: google.maps.FeatureStyleOptions = {
        strokeColor: "#810FCB",
        strokeOpacity: 1.0,
        strokeWeight: 3.0,
        fillColor: "#810FCB",
        fillOpacity: 0.5
      };
      const layer = currentMap.getFeatureLayer(google.maps.FeatureType.ADMINISTRATIVE_AREA_LEVEL_1);

      layer.style = (options) => {
        const stateKey = state && state.toUpperCase() as keyof typeof MexicanStates;

        const { placeId } = options.feature as google.maps.Feature & { placeId?: string };
        if (placeId && stateKey && MexicanStates[stateKey].placeId === placeId) return featureStyleOptions;

      };

      SetMap(currentMap);
    };
    loadMap();
  }, [state]);

  return (
    <div
      className="w-screen h-screen"
    >
      <div
        className="w-full h-full"
        ref={mapsRef}
      />

    </div>
  );
};

export default GoogleMap;