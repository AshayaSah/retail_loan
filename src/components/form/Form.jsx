import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

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
  Eye,
} from "lucide-react";

import AppSidebar from "../AppSidebar";
import Heading from "./form_components/Heading";
import ApplicantDetails from "./form_components/ApplicantDetails";
import GuarantorDetails from "./form_components/GuarantorDetails";
import { GuarantorDetailsTable } from "./form_components/guarantor_details_table/GuarantorDetailsTable";

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

  // Form submission handler
  const onSubmit = (data) => {
    console.log("Form Submitted Data:", data);
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
      state: true,
      value: "Preview",
      icon: Eye, // Use an eye icon for preview
    },
  ]);

  // Function to update the stepper state for a specific index
  const handleStepper = (index) => {
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
            ></GuarantorDetailsTable>
          )}
          {stepper[3].state && (
            <div className="form-section">
              <Button type="submit" className="btn-primary w-full">
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
