const styleDefault = {
  strokeColor: "#810FCB",
  strokeOpacity: 1.0,
  strokeWeight: 2.0,
  fillColor: "white",
  fillOpacity: 0.1,
};

const styleClicked = {
  ...styleDefault,
  fillColor: "#810FCB",
  fillOpacity: 0.5,
};

const styleMouseMove = {
  ...styleDefault,
  strokeWeight: 4.0,
};

const idOnClick = (featuredLayer: google.maps.FeatureLayer, map: google.maps.Map) => {

  let lastInteractedFeatureIds: string[] = [];
  let lastClickedFeatureIds: string[] = [];

  const applyStyle = (params: google.maps.FeatureStyleFunctionOptions & { feature: { placeId?: string } }) => {
    const placeId = params.feature.placeId || "";
    if (lastClickedFeatureIds.includes(placeId)) {
      return styleClicked;
    }
    if (lastInteractedFeatureIds.includes(placeId)) {
      return styleMouseMove;
    }
    return styleDefault;
  }

  const handleClick = (e: { features: { placeId: string }[] }) => {
    lastClickedFeatureIds = e.features.map(f => f.placeId);
    lastInteractedFeatureIds = [];
    featuredLayer.style = applyStyle;
    console.debug("lastClickedFeatureIds", e);
  }

  const handleMouseMove = (e: { features: { placeId: string }[] }) => {
    lastInteractedFeatureIds = e.features.map(f => f.placeId);
    featuredLayer.style = applyStyle;
  }

  // Add the event listeners for the feature layer.
  featuredLayer.addListener("click", handleClick);
  featuredLayer.addListener("mousemove", handleMouseMove);

  // Map event listener.
  map.addListener("mousemove", () => {
    // If the map gets a mousemove, that means there are no feature layers
    // with listeners registered under the mouse, so we clear the last
    // interacted feature ids.
    if (lastInteractedFeatureIds?.length) {
      lastInteractedFeatureIds = [];
      featuredLayer.style = applyStyle;
    }
  });

  featuredLayer.style = applyStyle;
}

export default idOnClick;