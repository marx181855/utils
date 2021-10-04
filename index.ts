interface AreaData {
  province_list: {
    [index: string] : string
  },
  city_list: {
    [index: string] : string
  },
  county_list: {
    [index: string] : string
  }
}

interface Item {
  value: string,
  label: string
}

interface ProvinceOrCityItem extends Item {
  children: Item[]
}


function getAreaListData(areaData: AreaData) {
  const temp = [];
  const { province_list, city_list, county_list } = areaData;

  for (const provinceCode in province_list) {
    const provinceId = provinceCode.substr(0, 2);
    const provinceItem: ProvinceOrCityItem = { value: '', label: '', children: [] };
    provinceItem.value = province_list[provinceCode];
    provinceItem.label = province_list[provinceCode];
    
    for (const cityCode in city_list) {
      const cityId = cityCode.substr(0, 4);
      const cityItem: ProvinceOrCityItem = { value: '', label: '', children: [] };

      if (cityId.includes(provinceId)) {
        cityItem.value = city_list[cityCode];
        cityItem.label = city_list[cityCode];

        for (const countyCode in county_list) {
          const countyItem: Item = { value: '', label: '' };
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