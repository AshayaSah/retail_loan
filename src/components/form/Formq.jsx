import { useState, useEffect, useMemo } from "react";
import { User, Users, Building, Shield } from "lucide-react";
import { useForm, useFormContext, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import AppSidebar from "../AppSidebar";
import Heading from "./form_components/Heading";
import ApplicantDetails from "./form_components/ApplicantDetails";
import { SecurityDetails } from "./form_components/securityDetails/securityDetails";
import { FacilityDetails } from "./form_components/facilityDetails/FacilityDetails";
import Preview from "./form_components/preview/Preview";
import GuarantorDetailsTest from "./form_components/guarantor_details_table/GuaranterDetailsTest";
import Prerequisits from "./form_components/Prerequisits";
// import { useAppStore } from "../../zustand/useStore";
import useSubmitForm from "@/hooks/useSubmitForm";
import FinalStep from "./form_components/finalstep/FinalStep";
import { Label } from "@/components/ui/label";



// Zod Schema
const FormSchema = z.object({
  account_number: z.string().min(1, "Required"),
  custom_contact_no: z.string().min(1, "Required"),
  // Add all other fields here
});

const Form = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [tandC, setTandC] = useState(false);
  const { postRetailLoan, loading, error } = useSubmitForm();

  const formMethods = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: JSON.parse(localStorage.getItem("retailLoanData") || "{}"),
  });

  const { handleSubmit, formState, setError, watch, setValue, control } =
    formMethods;
  const retailLoanData = watch();

  // Stepper configuration
  const [stepper, setStepper] = useState([
    { state: true, value: "Applicant Details", icon: User },
    { state: false, value: "Guarantor Details", icon: Users },
    { state: false, value: "Facility Details", icon: Building },
    { state: false, value: "Security Details", icon: Shield },
  ]);

  // Memoized form sections
  const formSections = [
    { component: ApplicantDetails },
    { component: GuarantorDetailsTest },
    { component: FacilityDetails },
    { component: SecurityDetails },
    // { component: FinalStep },
  ];

  // Updated handleStepper to activate next step
  const handleNextStep = (currentIndex) => {
    // Validate before proceeding
    if (formState.isValid) {
      setStepper((prev) =>
        prev.map((step, idx) => ({
          ...step,
          state: idx === currentIndex + 1 ? true : step.state,
        }))
      );
    } else {
      // Handle validation errors
      toast({
        title: "Validation Error",
        description: "Please fill all required fields correctly",
        variant: "destructive",
      });
    }
  };

  const handleFetch = () => {
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

  // Save to localStorage with debounce
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem("retailLoanData", JSON.stringify(retailLoanData));
    }, 300);

    console.log("All Form Values:", retailLoanData);

    return () => clearTimeout(timeout);
  }, [retailLoanData]);

  const onSubmit = async (data) => {
    try {
      // Uncomment your actual API call
      await postRetailLoan(data);

      // Clear storage only on success
      //   localStorage.removeItem("retailLoanData");
      //   formMethods.reset();

      toast({
        title: "Success! 🎉",
        description: "Form submitted successfully!",
        variant: "success",
        className: "custom-toast",
      });
      navigate("/");
    } catch (error) {
      console.error("Submission error:", error);

      toast({
        title: "Submission Failed ❌",
        description:
          error.message || "Failed to submit form. Please try again.",
        variant: "destructive",
        action: (
          <ToastAction altText="Retry" onClick={() => handleSubmit(onSubmit)()}>
            Retry
          </ToastAction>
        ),
      });

      // Optional: Set form error state
      setError("root.serverError", {
        type: "manual",
        message: error.message,
      });
    }
  };

  return (
    <FormProvider {...formMethods}>
      <div className="flex w-full">
        <AppSidebar stepper={stepper} />
        <div className="flex-1">
          <Heading />
          <Prerequisits />

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* // In your main Form component's render section */}
            {stepper.map((step, index) => {
              if (!step.state) return null;
              const Component = formSections[index].component;

              return (
                <div key={index}>
                  <Component
                    control={control}
                    register={formMethods.register}
                    setValue={setValue}
                    formState={formState}
                    errors={formState.errors}
                    watch={watch}
                    retailLoanData={retailLoanData}
                    currentStep={index}
                    totalSteps={formSections.length}
                    onNextStep={() => handleNextStep(index)}
                    handleFetch={handleFetch}
                  />
                </div>
              );
            })}
            {stepper[3].state && (
              <div className="form-section">
                <div className="form-section-content">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="form_tandc"
                      checked={tandC}
                      onCheckedChange={(checked) => setTandC(checked)}
                    />
                    <Label htmlFor="form_tandc">
                      I acknowledge that the information provided is accurate
                      and has been reviewed diligently. I accept full
                      responsibility for its completeness and correctness upon
                      submission.
                    </Label>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button variant="outline" onClick={() => navigate("/")}>
                    Cancel
                  </Button>
                  <Preview data={retailLoanData} />
                  <Button
                    type="submit"
                    disabled={
                      !tandC || !formState.isValid || formState.isSubmitting
                    }
                  >
                    {formState.isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default Form;
