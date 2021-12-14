$(document).ready(function () {
  $("#vmap").vectorMap({
    map: "asia_en",
    backgroundColor: "#ffffff00",
    borderColor: "#000000",
    borderOpacity: 0.1,
    color: "#e4e4e4",
    hoverColor: "#7B6FFF",
    selectedColor: "#590000",
    selectedRegions: "JP",
    onRegionClick: function (element, code, region) {
      fetchAlClickear(code);
    },
  });
});
