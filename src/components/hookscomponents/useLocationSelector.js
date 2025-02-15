import { useState } from "react";
import { provinceData } from "../form/form_components/provincedetails";

// Custom hook to handle location selection logic
const useLocationSelector = (setValue, provinceField="", districtField="", municipalityField="") => {
  const [districts, setDistricts] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);

  const handleProvinceChange = (value) => {
    // Reset district and municipality selections
    setValue(provinceField, value);
    setValue(districtField, "");
    setValue(municipalityField, "");

    // Find the province and update districts
    const selectedProvince = provinceData.find((p) => p.province === value);
    setDistricts(selectedProvince?.districts || []);
    setMunicipalities([]);
  };

  const handleDistrictChange = (value) => {
    // Reset municipality selection on district change
    setValue(districtField, value);
    setValue(municipalityField, "");

    // Find the district and update municipalities
    const selectedDistrict = districts.find((d) => d.name === value);
    setMunicipalities(selectedDistrict?.municipalities || []);
  };

  const handleMunicipalityChange = (value) => {
    setValue(municipalityField, value);
  };

  return { districts, municipalities, handleProvinceChange, handleDistrictChange, handleMunicipalityChange };
};

export { useLocationSelector };
