import React, { useState } from "react";
import { useForm } from "react-hook-form";

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

const Form = () => {
  // Initialize useForm
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm();

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
      state: false,
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
            register={register}
            errors={errors}
            isValid={isValid}
            handleSelectChange={handleSelectChange}
            stepper={stepper}
            handleStepper={handleStepper}
          />

          {stepper[0].state && (
            <GuarantorDetails
              register={register}
              errors={errors}
              isValid={isValid}
              handleSelectChange={handleSelectChange}
              stepper={stepper}
              handleStepper={handleStepper}
            />
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
