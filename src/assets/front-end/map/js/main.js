function loadMap(markers){
  const map = new jsVectorMap({
    map: "world", // 'canada', ...
    selector: "#map",
    backgroundColor: "tranparent",
    draggable: true,
    zoomButtons: false,
    zoomOnScroll: true,
    zoomOnScrollSpeed: 3,
    zoomMax: 12,
    zoomMin: 2,
    zoomAnimate: true,
    showTooltip: false,
    zoomStep: 1.5,
    regionsSelectable: false,
    regionsSelectableOne: false,
    bindTouchEvents: true,
    regionStyle: {
      // Region style
      initial: {
        fill: "#e3eaef",
        fillOpacity: 1,
        stroke: "none",
        strokeWidth: 0,
        strokeOpacity: 1,
      },
      hover: {
        fillOpacity: 1,
        cursor: "pointer",
      },
      selected: {
        fill: "#000",
      },
      selectedHover: {},
    },
    markers: markers,
  });
};