function loadMap(markers) {
  const map = new jsVectorMap({
    map: "world", // 'canada', ...
    selector: "#map",
    backgroundColor: "tranparent",
    draggable: true,
    zoomButtons: false,
    zoomOnScroll: false,
    zoomOnScrollSpeed: 3,
    zoomMax: 7,
    zoomMin: 2,
    zoomAnimate: true,
    showTooltip: false,
    zoomStep: 1.5,
    regionsSelectable: false,
    regionsSelectableOne: false,
    bindTouchEvents: true,
    lineStyle: {
      stroke: "#808080",
      strokeWidth: 1,
      strokeLinecap: "round",
    },
    focusOn: {
        region: "MA",
        scale: 0.3
    },
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
}
function loadMapMobile(markers) {
    const map = new jsVectorMap({
      map: "world", // 'canada', ...
      selector: "#map_mobile",
      backgroundColor: "tranparent",
      draggable: true,
      zoomButtons: false,
      zoomOnScroll: false,
      zoomOnScrollSpeed: 3,
      zoomMax: 12,
      zoomMin: 12,
      zoomAnimate: true,
      showTooltip: false,
      zoomStep: 1.5,
      regionsSelectable: false,
      regionsSelectableOne: false,
      bindTouchEvents: true,
      lineStyle: {
        stroke: "#808080",
        strokeWidth: 1,
        strokeLinecap: "round",
      },
      focusOn: {
          region: "BE",
          scale: 0.3
      },
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
  }