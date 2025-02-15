import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Controller } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { TwoColumnFormLoadingScreen } from "../loading/TwoColumnLoading";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { provinceData, districtsNepali } from "./provincedetails";
import { useLocationSelector } from "@/components/hookscomponents/useLocationSelector";

const ApplicantDetails = ({
  handleFetch,
  loading,
  error,
  register,
  errors,
  control,
  retailLoanData,
  onNextStep,
  currentStep,
  totalSteps,
  formState,
  setValue,
  watch,
}) => {
  const [sameAddress, setSameAddress] = useState(false);
  const [citizenshipMinDate, setCitizenshipMinDate] = useState("");
  // const { toast } = useToast();

  useEffect(() => {
    if (sameAddress) {
      setValue("current_province", retailLoanData.province);
      setValue("current_district", retailLoanData.district);
      setValue("current_vdc_municipality", retailLoanData.vdc_municipality);
      setValue("current_ward_no", retailLoanData.ward_no);
    } else {
      setValue("current_province", "");
      setValue("current_district", "");
      setValue("current_vdc_municipality", "");
      setValue("current_ward_no", "");
    }
  }, [sameAddress, setValue]);

  useEffect(() => {
    const dob = retailLoanData.date_of_birth;
    const today = new Date(dob);
    if (!dob || isNaN(today.getTime())) return;

    const minEligibleDate = new Date(today);
    minEligibleDate.setFullYear(today.getFullYear() + 16);
    setCitizenshipMinDate(minEligibleDate.toISOString().split("T")[0]);
  }, [retailLoanData.date_of_birth]);

  const handleFetchData = async () => {
    try {
      await handleFetch();
      // toast({
      //   title: "Successfully Fetched",
      //   duration: 1000,
      //   variant: "success",
      // });
    } catch (error) {
      console.error("Fetch error:", error);
      // toast({
      //   title: "Fetch Failed",
      //   description: "There was an error fetching the data.",
      //   variant: "destructive",
      // });
    }
  };

  return (
    <Card className="form-section shadow-lg mt-6">
      <ApplicantTypeSection
        control={control}
        errors={errors}
        retailLoanData={retailLoanData}
      />
      {retailLoanData.custom_client_type === "Existing" && (
        <>
          <ExistingCustomerSection
            register={register}
            setValue={setValue}
            errors={errors}
            loading={loading}
            handleFetchData={handleFetchData}
            error={error}
            retailLoanData={retailLoanData}
          />
          <PersonalInformationSection
            register={register}
            setValue={setValue}
            errors={errors}
            control={control}
            citizenshipMinDate={citizenshipMinDate}
          />
          <FamilyInformationSection
            register={register}
            setValue={setValue}
            errors={errors}
          />
          <AddressSection
            sameAddress={sameAddress}
            setSameAddress={setSameAddress}
            register={register}
            setValue={setValue}
            control={control}
            errors={errors}
            watch={watch}
          />
          {currentStep < totalSteps - 1 && (
            <div className="flex justify-end mt-8">
              <Button
                type="button"
                onClick={onNextStep}
                disabled={!formState.isValid}
                className="px-8 py-4 text-lg"
              >
                Next →
              </Button>
            </div>
          )}
        </>
      )}
    </Card>
  );
};

const ApplicantTypeSection = ({ control, errors, retailLoanData }) => (
  <div className="form-section-content">
    <Label htmlFor="custom_client_type">
      Are you an Existing Customer? <span className="text-red-600">*</span>
    </Label>
    <Controller
      name="custom_client_type"
      control={control}
      rules={{ required: "This field is required" }}
      render={({ field }) => (
        <Select onValueChange={field.onChange} value={field.value}>
          <SelectTrigger id="custom_client_type">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Existing">Yes</SelectItem>
            <SelectItem value="Non-Existing">No</SelectItem>
          </SelectContent>
        </Select>
      )}
    />
    {errors.custom_client_type && (
      <p className="text-red-600 text-sm">
        {errors.custom_client_type.message}
      </p>
    )}
    {retailLoanData.custom_client_type === "Non-Existing" && <AlertSection />}
  </div>
);

const AlertSection = () => (
  <div className="form-section-content-container-single pt-6">
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Not Eligible</AlertTitle>
      <AlertDescription>
        You must be a CAS Bank Customer to apply for Loan.
      </AlertDescription>
    </Alert>
  </div>
);

const ExistingCustomerSection = ({
  register,
  errors,
  loading,
  handleFetchData,
  error,
}) => (
  <>
    <InputField
      id="expected_loan_amount"
      label="Expected Loan Amount"
      register={register}
      errors={errors}
      required
      placeholder="Enter your Loan Amount"
      pattern={{ value: /^[0-9]+$/, message: "Enter a valid Loan Amount" }}
    />
    <InputField
      id="account_number"
      label="Account Number"
      register={register}
      errors={errors}
      required
      placeholder="Enter your Account Number (1342xxxxxxxxx)"
    />
    <ContactNumberSection
      register={register}
      errors={errors}
      handleFetchData={handleFetchData}
      loading={loading}
      error={error}
    />
  </>
);

const InputField = ({
  id,
  label,
  register,
  errors,
  required,
  placeholder,
  pattern,
}) => (
  <div className="form-section-content">
    <Label htmlFor={id}>
      {label} {required && <span className="text-red-600">*</span>}
    </Label>
    <Input
      id={id}
      placeholder={placeholder}
      {...register(id, {
        required: required ? `${label} is required` : false,
        pattern: pattern,
      })}
    />
    {errors[id] && <p className="text-red-600 text-sm">{errors[id].message}</p>}
  </div>
);

const ContactNumberSection = ({
  register,
  errors,
  handleFetchData,
  loading,
  error,
}) => (
  <div className="form-section-content-container">
    <div className="form-section-content flex-1">
      <Label htmlFor="custom_contact_no">Contact Number</Label>
      <Input
        id="custom_contact_no"
        type="tel"
        placeholder="Enter your 10-digit phone number"
        {...register("custom_contact_no")}
      />
      {errors.custom_contact_no && (
        <p className="text-red-600 text-sm">
          {errors.custom_contact_no.message}
        </p>
      )}
    </div>
    <div className="form-section-content w-[50%]">
      <Label>&nbsp;</Label>
      <Button type="button" onClick={handleFetchData} disabled={loading}>
        {!loading ? "Fetched" : "Fetch Data"}
      </Button>
    </div>
    {error && <ErrorAlert />}
  </div>
);

const ErrorAlert = () => (
  <div className="form-section-content-container-single pt-0">
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Please enter a valid Account Number and Phone Number
      </AlertDescription>
    </Alert>
  </div>
);

const PersonalInformationSection = ({
  register,
  errors,
  control,
  citizenshipMinDate,
}) => (
  <>
    <h1 className="form-section-title">Personal Information</h1>
    <div className="form-section-content-container">
      <InputField
        id="custom_customer_name"
        label="Applicant Full Name"
        register={register}
        errors={errors}
        required
        placeholder="Enter your full name"
        pattern={{
          value: /^[A-Za-z\s]+$/,
          message: "Only letters and spaces are allowed",
        }}
      />
      <InputField
        id="customer_client_code"
        label="Client Code"
        register={register}
        errors={errors}
        required
        placeholder="Enter your Client Code"
      />
      <InputField
        id="custom_email"
        label="Email Address"
        register={register}
        errors={errors}
        required
        placeholder="Enter your email"
        pattern={{
          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          message: "Enter a valid email address",
        }}
      />
      <DateOfBirthField
        register={register}
        errors={errors}
        citizenshipMinDate={citizenshipMinDate}
      />
      <InputField
        id="age"
        label="Age"
        register={register}
        errors={errors}
        disabled
        placeholder="Age"
      />
      <SelectField
        id="gender"
        label="Gender"
        control={control}
        errors={errors}
        options={["Male", "Female"]}
      />
      <SelectField
        id="marital_status"
        label="Marital Status"
        control={control}
        errors={errors}
        options={["Married", "Single"]}
      />
      <SelectField
        id="nationality"
        label="Nationality"
        control={control}
        errors={errors}
        options={["Nepali", "Other"]}
      />
    </div>
  </>
);

const DateOfBirthField = ({ register, errors, citizenshipMinDate }) => (
  <div className="form-section-content">
    <Label htmlFor="date_of_birth">
      Date of Birth <span className="text-red-600">*</span>
    </Label>
    <Input
      id="date_of_birth"
      type="date"
      placeholder="Enter your date of Birth"
      min={citizenshipMinDate}
      {...register("date_of_birth", {
        onChange: (e) => handleAgeCalculation(e),
        required: "Date of Birth is required",
      })}
    />
    {errors.date_of_birth && (
      <p className="text-red-600 text-sm">{errors.date_of_birth.message}</p>
    )}
  </div>
);

const SelectField = ({ id, label, control, errors, options }) => (
  <div className="form-section-content">
    <Label htmlFor={id}>{label}</Label>
    <Controller
      name={id}
      control={control}
      rules={{ required: "This field is required" }}
      render={({ field }) => (
        <Select onValueChange={field.onChange} value={field.value}>
          <SelectTrigger id={id}>
            <SelectValue placeholder={`Select ${label}`} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
    {errors[id] && <p className="text-red-600 text-sm">{errors[id].message}</p>}
  </div>
);

const FamilyInformationSection = ({ register, errors }) => (
  <>
    <h1 className="form-section-title">Family Information</h1>
    <div className="form-section-content-container">
      <InputField
        id="fathers_name"
        label="Father's Name"
        register={register}
        errors={errors}
        required
        placeholder="Enter father's name"
        pattern={{
          value: /^[A-Za-z\s]+$/,
          message: "Invalid name. Only letters and spaces are allowed.",
        }}
      />
      <InputField
        id="grandfathers_name"
        label="Grandfather's Name"
        register={register}
        errors={errors}
        placeholder="Enter grandfather's name"
      />
      <InputField
        id="mothers_name"
        label="Mother's Name (Optional)"
        register={register}
        errors={errors}
        placeholder="Enter mother's name"
        pattern={{
          value: /^[A-Za-z\s]+$/,
          message: "Invalid name. Only letters and spaces are allowed.",
        }}
      />
      <InputField
        id="spouse_name"
        label="Spouse's Name"
        register={register}
        errors={errors}
        placeholder="Enter spouse's name (if applicable)"
        pattern={{
          value: /^[A-Za-z\s]*$/,
          message: "Invalid name. Only letters and spaces are allowed.",
        }}
      />
      <InputField
        id="offsprings"
        label="Number of Offsprings"
        register={register}
        errors={errors}
        type="number"
        placeholder="Enter number of children"
        min={{ value: 0, message: "Number of offsprings cannot be negative" }}
      />
    </div>
  </>
);

const AddressSection = ({
  sameAddress,
  setSameAddress,
  register,
  control,
  errors,
  setValue,
  watch,
}) => {
  const {
    districts: availableDistricts,
    municipalities: availableMunicipalities,
    handleProvinceChange,
    handleDistrictChange,
    handleMunicipalityChange,
  } = useLocationSelector(setValue, "province", "district", "vdc_municipality");

  const {
    districts: currentDistricts,
    municipalities: currentMunicipalities,
    handleProvinceChange: handleCurrentProvinceChange,
    handleDistrictChange: handleCurrentDistrictChange,
    handleMunicipalityChange: handleCurrentMunicipalityChange,
  } = useLocationSelector(
    setValue,
    "current_province",
    "current_district",
    "current_vdc_municipality"
  );

  return (
    <>
      <h1 className="form-section-title">Permanent Address</h1>
      <AddressFields
        register={register}
        control={control}
        errors={errors}
        availableDistricts={availableDistricts}
        availableMunicipalities={availableMunicipalities}
        handleProvinceChange={handleProvinceChange}
        handleDistrictChange={handleDistrictChange}
        handleMunicipalityChange={handleMunicipalityChange}
      />
      <div className="form-section-content-container-single">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="same_address"
            checked={sameAddress}
            onCheckedChange={(checked) => setSameAddress(checked)}
          />
          <Label htmlFor="same_address">
            Current Address Same as Permanent Address?
          </Label>
        </div>
      </div>
      <h1 className="form-section-title">Current Address</h1>
      {sameAddress ? (
        <SameAddressFields register={register} errors={errors} />
      ) : (
        <CurrentAddressFields
          register={register}
          control={control}
          errors={errors}
          currentDistricts={currentDistricts}
          currentMunicipalities={currentMunicipalities}
          handleCurrentProvinceChange={handleCurrentProvinceChange}
          handleCurrentDistrictChange={handleCurrentDistrictChange}
          handleCurrentMunicipalityChange={handleCurrentMunicipalityChange}
        />
      )}
    </>
  );
};

const AddressFields = ({
  register,
  control,
  errors,
  availableDistricts,
  availableMunicipalities,
  handleProvinceChange,
  handleDistrictChange,
  handleMunicipalityChange,
}) => (
  <div className="form-section-content-container pb-0">
    <SelectField
      id="province"
      label="Province"
      control={control}
      errors={errors}
      options={provinceData.map((province) => province.province)}
      onValueChange={handleProvinceChange}
    />
    <SelectField
      id="district"
      label="District"
      control={control}
      errors={errors}
      options={availableDistricts.map((district) => district.name)}
      onValueChange={handleDistrictChange}
    />
    <SelectField
      id="vdc_municipality"
      label="VDC/Municipality"
      control={control}
      errors={errors}
      options={availableMunicipalities}
      onValueChange={handleMunicipalityChange}
    />
    <InputField
      id="ward_no"
      label="Ward No"
      register={register}
      errors={errors}
      required
      placeholder="Enter ward number"
    />
  </div>
);

const SameAddressFields = ({ register, errors }) => (
  <>
    <InputField
      id="current_province"
      label="Province"
      register={register}
      errors={errors}
      required
      placeholder="Enter province"
    />
    <InputField
      id="current_district"
      label="District"
      register={register}
      errors={errors}
      required
      placeholder="Enter district"
    />
    <InputField
      id="current_vdc_municipality"
      label="VDC/Municipality"
      register={register}
      errors={errors}
      required
      placeholder="Enter VDC/Municipality"
    />
    <InputField
      id="current_ward_no"
      label="Ward No"
      register={register}
      errors={errors}
      required
      placeholder="Enter ward number"
    />
  </>
);

const CurrentAddressFields = ({
  register,
  control,
  errors,
  currentDistricts,
  currentMunicipalities,
  handleCurrentProvinceChange,
  handleCurrentDistrictChange,
  handleCurrentMunicipalityChange,
}) => (
  <>
    <SelectField
      id="current_province"
      label="Province"
      control={control}
      errors={errors}
      options={provinceData.map((province) => province.province)}
      onValueChange={handleCurrentProvinceChange}
    />
    <SelectField
      id="current_district"
      label="District"
      control={control}
      errors={errors}
      options={currentDistricts.map((district) => district.name)}
      onValueChange={handleCurrentDistrictChange}
    />
    <SelectField
      id="current_vdc_municipality"
      label="VDC/Municipality"
      control={control}
      errors={errors}
      options={currentMunicipalities}
      onValueChange={handleCurrentMunicipalityChange}
    />
    <InputField
      id="current_ward_no"
      label="Ward No"
      register={register}
      errors={errors}
      required
      placeholder="Enter ward number"
    />
  </>
);

export default ApplicantDetails;
