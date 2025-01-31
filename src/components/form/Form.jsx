import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "../ui/button";
import AppSidebar from "../AppSidebar";
import Heading from "./form_components/Heading";
import ApplicantDetails from "./form_components/ApplicantDetails";
import { GuarantorDetailsTable } from "./form_components/guarantor_details_table/GuarantorDetailsTable";
import { SecurityDetails } from "./form_components/securityDetails/SecurityDetails";
import { User, Users, Eye } from "lucide-react";

const Form = () => {
  const {
    data,
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isValid },
  } = useForm();

  const retailLoanData = useWatch({ control });

  useEffect(() => {
    console.log("All Form Values:", retailLoanData);
  }, [retailLoanData]);

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

    // Set individual values instead of the entire object
    Object.keys(fetchData).forEach((key) => setValue(key, fetchData[key]));
  };

  const onSubmit = (data) => {
    console.log("Form Submitted Data:", data);
  };

  const [stepper, setStepper] = useState([
    { state: false, value: "Applicant Details", icon: User },
    { state: false, value: "Guarantor Details", icon: Users },
    { state: false, value: "Security Details", icon: Users },
    { state: false, value: "Preview", icon: Eye },
  ]);

  const handleStepper = (index) => {
    setStepper((prevStepper) =>
      prevStepper.map((step, idx) =>
        idx === index ? { ...step, state: true } : step
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
            handleFetch={handleFetch}
            data={data}
            register={register}
            errors={errors}
            isValid={isValid}
            control={control}
            retailLoanData={retailLoanData}
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
              stepper={stepper}
              handleStepper={handleStepper}
            />
          )}
          {stepper[1].state && (
            <SecurityDetails
              data={data}
              register={register}
              errors={errors}
              isValid={isValid}
              setValue={setValue}
              control={control}
              retailLoanData={retailLoanData}
              stepper={stepper}
              handleStepper={handleStepper}
            />
          )}
          {stepper[2].state && (
            <div className="">
              <Button type="submit" className="form-next-button">
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