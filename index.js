function getAreaListData(areaData) {
  const temp = [];
  const { province_list, city_list, county_list } = areaData;

  for (const provinceCode in province_list) {
    const provinceId = provinceCode.substr(0, 2);
    const provinceItem = {};
    provinceItem.value = province_list[provinceCode];
    provinceItem.label = province_list[provinceCode];
    provinceItem.children = [];
    
    for (const cityCode in city_list) {
      const cityId = cityCode.substr(0, 4);
      const cityItem = {};
      cityItem.children = [];

      if (cityId.includes(provinceId)) {
        cityItem.value = city_list[cityCode];
        cityItem.label = city_list[cityCode];

        for (const countyCode in county_list) {
          const countyItem = {};
          if (countyCode.includes(cityId)) {
            countyItem.value = county_list[countyCode];
            countyItem.label = county_list[countyCode];
            cityItem.children.push(countyItem);
          }
        }
        provinceItem.children.push(cityItem);
      }
    }
    temp.push(provinceItem);
  }
  return temp;
}