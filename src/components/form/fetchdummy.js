
const handleFetch = ({retailLoanData, setError, setValue}) => {
  if (
    retailLoanData.account_number == "13420002008" &&
    retailLoanData.custom_contact_no == "9810126827"
  ) {
    setError(false);
    //   setLoading(true);
    setTimeout(() => {
      const fetchData = {
        custom_customer_name: "Sakshyam Shrestha",
        custom_email: "sakshyamshrestha111@gmail.com",
        date_of_birth: "1999-01-01",
        gender: "Male",
        marital_status: "Single",
        nationality: "Nepali",
        customer_client_code: "R01281735",

        citizenship_issued_date: "2020-08-26",
        citizenship_issued_district: "Kathmandu",
        citizenship_number: "324324",
        pan_number: "10241234",
        pan_registration_date: "2020-08-26",
        pan_registration_district: "Kathmandu",

        fathers_name: "Suraj Raj Shrestha",
        grandfathers_name: "Ambar Bahadur Raj Shrestha",
        mothers_name: "Karuna Shrestha",
        offsprings: "2",
        spouse_name: "None",

        province: "Bagmati Province",
        district: "Lalitpur",
        vdc_municipality: "Mahalaxmi",
        ward_no: "10",
      };

      Object.keys(fetchData).forEach((key) => setValue(key, fetchData[key]));

      // setLoading(false);
    }, 500);
  } else {
    return setError(true);
  }
};

export { handleFetch };
