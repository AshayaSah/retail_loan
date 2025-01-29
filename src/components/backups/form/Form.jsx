import React, { useState } from "react";
import AppSidebar from "../AppSidebar";
import Heading from "./form_components/Heading";
import ApplicantDetails from "./form_components/ApplicantDetails";

const Form = () => {
  // Form data.
  const [retailLoanData, setRetailLoanData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRetailLoanData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setRetailLoanData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", retailLoanData);
    // Here you can add logic to send the data to a server or perform other actions
  };

  return (
    <div className="flex w-full">
      <AppSidebar />

      <div className="flex-1">
        <Heading />
        <ApplicantDetails
          retailLoanData={retailLoanData}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          handleSubmit={handleSubmit}
        ></ApplicantDetails>
      </div>
    </div>
  );
};

export default Form;
