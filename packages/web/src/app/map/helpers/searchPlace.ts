import { Loader } from "@googlemaps/js-api-loader";

const SearchPlace = async(loader: Loader) => {
  const { Place } = await loader.importLibrary("places")
  const { places } = await Place.searchByText({
    fields: ["id", "location"],
    textQuery: "Puebla, Mexico",
    includedType: "administrative_area_level_1",
  });
  // Puebla: ChIJZafA3bCMz4URrSAC1luuXOI

  return places;
}

export default SearchPlace;