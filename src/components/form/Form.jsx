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

import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import AppSidebar from "../AppSidebar";
import Heading from "./form_components/Heading";
import ApplicantDetails from "./form_components/ApplicantDetails";
import { GuarantorDetailsTable } from "./form_components/guarantor_details_table/GuarantorDetailsTable";
import { SecurityDetails } from "./form_components/securityDetails/securityDetails";
import { FacilityDetails } from "./form_components/facilityDetails/FacilityDetails";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { Toaster } from "../ui/toaster";
import Preview from "./form_components/preview/Preview";

const Form = () => {
  // Initialize useForm
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
  const [toast, setToast] = useState(null);

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
    if (
      retailLoanData.account_number == "13420002008" &&
      retailLoanData.custom_contact_no == "9810126827"
    ) {
      setError(false);
      setLoading(true);
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

        setLoading(false);
      }, [1000]);
    } else {
      return setError(true);
    }
  };

  // Form submission handler
  const onSubmit = () => {
    // e.preventDefault();
    console.log("Form Submitted:", retailLoanData);
    // adddPersonalInfo(retailLoanData);
    
    navigate("/");
    alert("Form Submitted");
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
    console.log(index);
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
        <form>
          <ApplicantDetails
            data={data}
            loading={loading}
            error={error}
            register={register}
            errors={errors}
            isValid={isValid}
            setValue={setValue}
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
          {stepper[2].state && (
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
          )}
          {stepper[3].state && (
            <Preview
              data={retailLoanData}
            />
          )}
          {stepper[3].state && (
            <div className="form-section flex justify-end space-x-4">
              <Button variant="outline" type="button" className="">
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleSubmit(onSubmit)}
                className=""
              >
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
