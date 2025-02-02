import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { useAppStore } from "../../zustand/useStore";
import { useNavigate } from "react-router-dom";

import { Button } from "../ui/button";

import {
  Calendar,
  Check,
  Home,
  Inbox,
  Search,
  Settings,
  User,
  Users,
  Building,
  Shield,
  Eye,
} from "lucide-react";

import AppSidebar from "../AppSidebar";
import Heading from "./form_components/Heading";
import ApplicantDetails from "./form_components/ApplicantDetails";
import { GuarantorDetailsTable } from "./form_components/guarantor_details_table/GuarantorDetailsTable";
import { SecurityDetails } from "./form_components/securityDetails/securityDetails";
import { FacilityDetails } from "./form_components/facilityDetails/facilityDetails";

const Form = () => {
  // Initialize useForm
  const {
    data,
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isValid },
  } = useForm();

  const {
    currentEdit,
    addPersonalInfo,
    updatePersonalInfo,
    clearCurrentEdit,
    adddPersonalInfo,
  } = useAppStore();

  const navigate = useNavigate();

  // Watch all form values at once
  const retailLoanData = useWatch({ control });

  // Log all form values whenever they change
  useEffect(() => {
    console.log("All Form Values:", retailLoanData);
  }, [retailLoanData]);

  // Helper to handle ShadCN Select values
  const handleSelectChange = (name, value) => {
    setValue(name, value, { shouldValidate: true });
  };

  const handleFetch = () => {
    const fetchData = {
      citizenship_issued_date: "02/12/2321",
      citizenship_issued_district: "Kathmandu",
      citizenship_number: "324324",
      custom_customer_name: "Sakshyam Shrestha",
      education: "bachelors",
      email: "sakshyamshrestha111@gmail.com",
      experience: "0-1",
      fathers_name: "Suraj",
      grandfathers_name: "Ambar",
      is_existing_customer: "YES",
      mother_name: "Karuna",
      offsprings: "0",
      pan_number: "11234",
      phone: "9808002930",
      spouse_name: "None",
    };

    Object.keys(fetchData).forEach((key) => setValue(key, fetchData[key]));
  };

  // Form submission handler
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", retailLoanData);
    // adddPersonalInfo(retailLoanData);

    // navigate("/");
  };

  // Stepper object to track section completion
  const [stepper, setStepper] = useState([
    {
      state: false,
      value: "Applicant Details",
      icon: User, // Use a user-related icon for applicant details
    },
    {
      state: false,
      value: "Guarantor Details",
      icon: Users, // Use a group-related icon for guarantors
    },
    {
      state: false,
      value: "Facility Details",
      icon: Building, // Use a building-related icon for facility details
    },
    {
      state: false,
      value: "Security Details",
      icon: Shield,
    },

    {
      state: false,
      value: "Preview",
      icon: Eye, // Use an eye icon for preview
    },
  ]);

  // Function to update the stepper state for a specific index
  const handleStepper = (index) => {
    console.log(index)
    setStepper((prevStepper) =>
      prevStepper.map(
        (step, idx) =>
          idx === index
            ? { ...step, state: true } // Update the state for the specific index
            : step // Keep other steps unchanged
      )
    );
  };

  return (
    <div className="flex w-full">
      <AppSidebar stepper={stepper} />
      <div className="flex-1">
        <Heading />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ApplicantDetails
            data={data}
            register={register}
            errors={errors}
            isValid={isValid}
            control={control}
            handleFetch={handleFetch}
            retailLoanData={retailLoanData}
            handleSelectChange={handleSelectChange}
            stepper={stepper}
            handleStepper={handleStepper}
          />

          {stepper[0].state && (
            <GuarantorDetailsTable
              data={data}
              register={register}
              errors={errors}
              isValid={isValid}
              setValue={setValue}
              control={control}
              retailLoanData={retailLoanData}
              handleSelectChange={handleSelectChange}
              stepper={stepper}
              handleStepper={handleStepper}
            />
          )}
          {stepper[1].state && (
            <FacilityDetails
              data={data}
              register={register}
              errors={errors}
              isValid={isValid}
              setValue={setValue}
              control={control}
              retailLoanData={retailLoanData}
              handleSelectChange={handleSelectChange}
              stepper={stepper}
              handleStepper={handleStepper} 
            />
          )}
          ,
          {
            stepper[2].state && (
             <SecurityDetails 
              data={data}
              register={register}
              errors={errors}
              isValid={isValid}
              setValue={setValue}
              control={control}
              retailLoanData={retailLoanData}
              handleSelectChange={handleSelectChange}
              stepper={stepper}
              handleStepper={handleStepper}
             />
            )
          }
          {stepper[3].state && (
            <div className="form-section">
              <Button type="button" className="btn-primary w-full">
                Submit Application
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;
