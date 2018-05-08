
export default {
    getAddress (provinceName, cityName, areaName) {
        provinceName = provinceName ? provinceName : "";
        cityName = cityName ? provinceName == cityName ? "" : cityName : "";
        areaName = areaName ? areaName : "";
        return provinceName + cityName + areaName;
    }
}