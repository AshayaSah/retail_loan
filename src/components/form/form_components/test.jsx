import React from 'react'
import provinceData from './provincedetails';

const test = ({ 
    handleFetch,
    loading,
    error,
    register,
    errors,
    setValue,
    control,
    handleSelectChange,
    retailLoanData,
    stepper,
    handleStepper, }) => {
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [districts, setDistricts] = useState([]);
    const [municipalities, setMunicipalities] = useState([]);

    const handleProvinceChange = (value) => {
        setSelectedProvince(value);
        const selectedProvinceData = provinceData.find((p) => p.province === value);
        setDistricts(selectedProvinceData ? selectedProvinceData.districts : []);
        setSelectedDistrict("");
        setMunicipalities([]);
    };

    const handleDistrictChange = (value) => {
        setSelectedDistrict(value);
        const selectedDistrictData = districts.find((d) => d.name === value);
        setMunicipalities(selectedDistrictData ? selectedDistrictData.municipalities : []);
    };

    const handleMunicipalityChange = (value) => {
        setValue("vdc_municipality", value);
    };

    const [currentProvince, setCurrentProvince] = useState("");
    const [currentDistrict, setCurrentDistrict] = useState("");
    const [currentDistricts, setCurrentDistricts] = useState([]);
    const [currentMunicipalities, setCurrentMunicipalities] = useState([]);


    const handleCurrentProvinceChange = (value) => {
        console.log("The vaslue passsed by province change", currentProvince)
        setCurrentProvince(value);
        const selectedCurrentProvinceData = provinceData.find((p) => p.province === value);
        console.log(selectedCurrentProvinceData);
        setCurrentDistricts(selectedCurrentProvinceData ? selectedCurrentProvinceData.districts : []);
        setCurrentDistrict("");
        setCurrentMunicipalities([]);
    };

    useEffect(() => {
        console.log("List of districts", currentDistricts)
    }, [currentDistricts])

    const handleCurrentDistrictChange = (value) => {
        setCurrentDistrict(value);
        const selectedCurrentDistrictData = currentDistricts.find((d) => d.name === value);
        setCurrentMunicipalities(selectedCurrentDistrictData ? selectedCurrentDistrictData.municipalities : []);
    };

    const handleCurrentMunicipalityChange = (value) => {
        setValue("current_vdc_municipality", value);
    };
    useEffect(() => {

        if (sameAddress) {
            setValue("current_province", retailLoanData.province);
            setValue("current_district", retailLoanData.district);
            setValue("current_vdc_municipality", retailLoanData.vdc_municipality);
            setValue("current_ward_no", retailLoanData.ward_no);
        } else {
            // Optionally clear current address fields if unchecked
            setValue("current_province", "");
            setValue("current_district", "");
            setValue("current_vdc_municipality", "");
            setValue("current_ward_no", "");
        }

    }, [
        sameAddress,
        retailLoanData.province,
        retailLoanData.district,
        retailLoanData.vdc_municipality,
        retailLoanData.ward_no,
        setValue,
    ]);
    const [sameAddress, setSameAddress] = useState(false);
    return (
        <div>test</div>
    )
}

export default test