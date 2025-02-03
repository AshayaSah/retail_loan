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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Controller, useWatch } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { TwoColumnFormLoadingScreen } from "../loading/TwoColumnLoading";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const ApplicantDetails = ({
  handleFetch,
  loading,
  error,
  register,
  errors,
  isValid,
  setValue,
  control,
  handleSelectChange,
  retailLoanData,
  stepper,
  handleStepper,
}) => {
  const [sameAddress, setSameAddress] = useState(false);

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

  const { toast } = useToast();

  return (
    <Card className="form-section shadow-lg mt-8">
      {/* Check the Existing Customer Section */}
      <div className="form-section-content-container-single py-0">
        <h1 className="form-section-title">Applicant Details</h1>

        {/* Is Existing Customer  */}
        <div className="form-section-content">
          <Label htmlFor="custom_client_type">
            Are you an Existing CAS Bank Customer?{" "}
            <span className="text-red-600">*</span>
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
                  <SelectItem value="Existing">YES</SelectItem>
                  <SelectItem value="Non-Existing">NO</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.custom_client_type && (
            <p className="text-red-600 text-sm">
              {errors.custom_client_type.message}
            </p>
          )}
        </div>
      </div>

      {/* Applicant Details Section */}
      {retailLoanData.custom_client_type === "Existing" && (
        <>
          {/* Email Address Field */}
          <div className="form-section-content ">
            <Label htmlFor="expected_loan_amount">
              Expected Loan Ammount <span className="text-red-600">*</span>
            </Label>
            <Input
              id="expected_loan_amount"
              type="expected_loan_amount"
              placeholder="Enter your Loan Ammount"
              {...register("expected_loan_amount", {
                required: "Loan Ammount is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Enter a valid Loan Ammount",
                },
              })}
            />
            {errors.expected_loan_amount && (
              <p className="text-red-600 text-sm">
                {errors.expected_loan_amount.message}
              </p>
            )}
          </div>

          {/* Account Number  */}
          <div className="form-section-content-container-single pb-0">
            {/* Account Number  */}
            <div className="form-section-content">
              <Label htmlFor="account_number">
                Account Number <span className="text-red-600">*</span>
              </Label>
              <Input
                placeholder="Enter your Account Number (1342xxxxxxxxx)"
                id="account_number"
                {...register("account_number", {
                  required: "Please, enter your account number",
                })}
              />
              {errors.account_number && (
                <p className="text-red-600 text-sm">
                  {errors.account_number.message}
                </p>
              )}
            </div>
          </div>

          {/* Phone  */}
          <div className="form-section-content-container">
            {/* Phone Number Field */}
            <div className="form-section-content flex-1">
              <Label htmlFor="custom_contact_no">Contact Number</Label>
              <Input
                id="custom_contact_no"
                type="tel"
                placeholder="Enter your 10-digit phone number"
                {...register("custom_contact_no", {
                  // required: "Phone number is required",
                  // pattern: {
                  //   value: /^[0-9]{10}$/,
                  //   message: "Phone number must be 10 digits",
                  // },
                })}
              />
              {errors.custom_contact_no && (
                <p className="text-red-600 text-sm">
                  {errors.custom_contact_no.message}
                </p>
              )}
            </div>

            <div className="form-section-content">
              <Label>&nbsp;</Label>
              <Button
                type="button"
                onClick={() => {
                  toast({
                    title: "Scheduled: Catch up",
                    description: "Friday, February 10, 2023 at 5:57 PM",
                  });
                  handleFetch();
                }}
              >
                Fetch Data
              </Button>
            </div>
          </div>

          {error ? (
            <div className="form-section-content-container-single pt-0">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  Pleae enter valid Account Number and Phone Number
                </AlertDescription>
              </Alert>
            </div>
          ) : null}

          {loading ? (
            <TwoColumnFormLoadingScreen />
          ) : (
            <>
              {/* Personal Information Section  */}
              <h1 className="form-section-title">Personal Information</h1>
              <div className="form-section-content-container">
                <div className="form-section-content">
                  <Label htmlFor="custom_customer_name">
                    Applicant Full Name <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="custom_customer_name"
                    placeholder="Enter your full name"
                    {...register("custom_customer_name", {
                      required: "Full name is required",
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: "Only letters and spaces are allowed",
                      },
                      minLength: {
                        value: 3,
                        message: "Name must be at least 3 characters long",
                      },
                    })}
                  />
                  {errors.custom_customer_name && (
                    <p className="text-red-600 text-sm">
                      {errors.custom_customer_name.message}
                    </p>
                  )}
                </div>

                {/* Client COde */}
                <div className="form-section-content ">
                  <Label htmlFor="customer_client_code">
                    Client Code <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="customer_client_code"
                    type="customer_client_code"
                    placeholder="Enter your Client Code"
                    {...register("customer_client_code", {
                      required: "Client Code is required",
                      // pattern: {
                      //   value:
                      //     /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      //   message: "Enter a valid email address",
                      // },
                    })}
                  />
                  {errors.customer_client_code && (
                    <p className="text-red-600 text-sm">
                      {errors.customer_client_code.message}
                    </p>
                  )}
                </div>

                {/* Email Address Field */}
                <div className="form-section-content ">
                  <Label htmlFor="custom_email">
                    Email Address <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="custom_email"
                    type="custom_email"
                    placeholder="Enter your email"
                    {...register("custom_email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Enter a valid email address",
                      },
                    })}
                  />
                  {errors.custom_email && (
                    <p className="text-red-600 text-sm">
                      {errors.custom_email.message}
                    </p>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="form-section-content ">
                  <Label htmlFor="date_of_birth">
                    Date of Birth <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="date_of_birth"
                    type="date"
                    placeholder="Enter your date of Birth"
                    {...register("date_of_birth", {
                      pattern: {
                        message: "Enter a valid Date of Birth",
                      },
                    })}
                  />
                  {errors.date_of_birth && (
                    <p className="text-red-600 text-sm">
                      {errors.date_of_birth.message}
                    </p>
                  )}
                </div>

                {/* Gender */}
                <div className="form-section-content">
                  <Label htmlFor="gender">Gender</Label>
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.gender && (
                    <p className="text-red-600 text-sm">
                      {errors.gender.message}
                    </p>
                  )}
                </div>

                {/* Gender */}
                <div className="form-section-content">
                  <Label htmlFor="marital_status">Marital Status</Label>
                  <Controller
                    name="marital_status"
                    control={control}
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger id="marital_status">
                          <SelectValue placeholder="Select Marital Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Married">Married</SelectItem>
                          <SelectItem value="Single">Single</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.marital_status && (
                    <p className="text-red-600 text-sm">
                      {errors.marital_status.message}
                    </p>
                  )}
                </div>

                {/* Nationality */}
                <div className="form-section-content">
                  <Label htmlFor="nationality">Nationality</Label>
                  <Controller
                    name="nationality"
                    control={control}
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger id="nationality">
                          <SelectValue placeholder="Select Nationality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Nepali">Nepali</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.nationality && (
                    <p className="text-red-600 text-sm">
                      {errors.nationality.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Citizenship and PAN Information Section */}
              <h1 className="form-section-title">
                Citizenship and PAN Information
              </h1>
              <div className="form-section-content-container">
                <div className="form-section-content">
                  <Label htmlFor="citizenship_number">
                    Citizenship Number
                    <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="citizenship_number"
                    type="tel"
                    placeholder="Enter your citizenship number"
                    {...register("citizenship_number", {
                      required: "Please, enter your citizenship number",
                      pattern: {
                        value: /^[0-9]+$/,
                        message:
                          "Invalid citizenship number. Only digits are allowed.",
                      },
                    })}
                  />
                  {errors.citizenship_number && (
                    <p className="text-red-600 text-sm">
                      {errors.citizenship_number.message}
                    </p>
                  )}
                </div>

                <div className="form-section-content">
                  <Label htmlFor="citizenship_issued_date">
                    Citizenship Issued Date{" "}
                    <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="citizenship_issued_date"
                    type="date"
                    placeholder="DD/MM/YYYY"
                    {...register("citizenship_issued_date", {
                      required: "Please, enter your citizenship issued date",
                      pattern: {
                        message: "Invalid format. Use DD/MM/YYYY",
                      },
                    })}
                  />
                  {errors.citizenship_issued_date && (
                    <p className="text-red-600 text-sm">
                      {errors.citizenship_issued_date.message}
                    </p>
                  )}
                </div>

                <div className="form-section-content">
                  <Label htmlFor="citizenship_issued_district">
                    Citizenship Issued District{" "}
                    <span className="text-red-600">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("citizenship_issued_district", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your district" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kathmandu">Kathmandu</SelectItem>
                      <SelectItem value="Bhaktapur">Bhaktapur</SelectItem>
                      <SelectItem value="Lalitpur">Lalitpur</SelectItem>
                      <SelectItem value="Chitwan">Chitwan</SelectItem>
                      <SelectItem value="Pokhara">Pokhara</SelectItem>
                      <SelectItem value="Morang">Morang</SelectItem>
                      <SelectItem value="Sunsari">Sunsari</SelectItem>
                      <SelectItem value="Jhapa">Jhapa</SelectItem>
                      <SelectItem value="Dang">Dang</SelectItem>
                      <SelectItem value="Banke">Banke</SelectItem>
                      <SelectItem value="Bardiya">Bardiya</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.citizenship_issued_district && (
                    <p className="text-red-600 text-sm">
                      {errors.citizenship_issued_district.message}
                    </p>
                  )}
                </div>

                <div className="form-section-content">
                  <Label htmlFor="pan_number">PAN Number</Label>
                  <Input
                    id="pan_number"
                    type="text"
                    placeholder="Enter your PAN number"
                    {...register("pan_number", {})}
                  />
                  {errors.pan_number && (
                    <p className="text-red-600 text-sm">
                      {errors.pan_number.message}
                    </p>
                  )}
                </div>

                <div className="form-section-content">
                  <Label htmlFor="pan_registration_date">Pan Issued Date</Label>
                  <Input
                    id="pan_registration_date"
                    type="date"
                    placeholder="DD/MM/YYYY"
                    {...register("pan_registration_date", {
                      required: "Please, enter your pan issued date",
                      pattern: {
                        message: "Invalid format. Use DD/MM/YYYY",
                      },
                    })}
                  />
                  {errors.pan_registration_date && (
                    <p className="text-red-600 text-sm">
                      {errors.pan_registration_date.message}
                    </p>
                  )}
                </div>

                <div className="form-section-content">
                  <Label htmlFor="pan_registration_district">
                    Pan Issued District
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange("pan_registration_district", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your district" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kathmandu">Kathmandu</SelectItem>
                      <SelectItem value="Bhaktapur">Bhaktapur</SelectItem>
                      <SelectItem value="Lalitpur">Lalitpur</SelectItem>
                      <SelectItem value="Chitwan">Chitwan</SelectItem>
                      <SelectItem value="Pokhara">Pokhara</SelectItem>
                      <SelectItem value="Morang">Morang</SelectItem>
                      <SelectItem value="Sunsari">Sunsari</SelectItem>
                      <SelectItem value="Jhapa">Jhapa</SelectItem>
                      <SelectItem value="Dang">Dang</SelectItem>
                      <SelectItem value="Banke">Banke</SelectItem>
                      <SelectItem value="Bardiya">Bardiya</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.pan_registration_district && (
                    <p className="text-red-600 text-sm">
                      {errors.pan_registration_district.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Family Information Section */}
              <h1 className="form-section-title">Family Information</h1>
              <div className="form-section-content-container">
                <div className="form-section-content">
                  <Label htmlFor="fathers_name">
                    Father's Name <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="fathers_name"
                    placeholder="Enter father's name"
                    {...register("fathers_name", {
                      required: "Father's name is required",
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message:
                          "Invalid name. Only letters and spaces are allowed.",
                      },
                    })}
                  />
                  {errors.fathers_name && (
                    <p className="text-red-600 text-sm">
                      {errors.fathers_name.message}
                    </p>
                  )}
                </div>

                <div className="form-section-content">
                  <Label htmlFor="grandfathers_name">Grandfather's Name</Label>
                  <Input
                    id="grandfathers_name"
                    placeholder="Enter grandfather's name"
                    {...register("grandfathers_name", {
                      // required: "Grandfather's name is required",
                      // pattern: {
                      //   value: /^[A-Za-z\s]+$/,
                      //   message:
                      //     "Invalid name. Only letters and spaces are allowed.",
                      // },
                    })}
                  />
                  {errors.grandfathers_name && (
                    <p className="text-red-600 text-sm">
                      {errors.grandfathers_name.message}
                    </p>
                  )}
                </div>

                <div className="form-section-content">
                  <Label htmlFor="mothers_name">Mother's Name (Optional)</Label>
                  <Input
                    id="mothers_name"
                    placeholder="Enter mother's name"
                    {...register("mothers_name", {
                      // required: "Mother's name is required",
                      // pattern: {
                      //   value: /^[A-Za-z\s]+$/,
                      //   message:
                      //     "Invalid name. Only letters and spaces are allowed.",
                      // },
                    })}
                  />
                  {errors.mothers_name && (
                    <p className="text-red-600 text-sm">
                      {errors.mothers_name.message}
                    </p>
                  )}
                </div>

                <div className="form-section-content">
                  <Label htmlFor="spouse_name">Spouse's Name</Label>
                  <Input
                    id="spouse_name"
                    placeholder="Enter spouse's name (if applicable)"
                    {...register("spouse_name", {
                      // pattern: {
                      //   value: /^[A-Za-z\s]*$/,
                      //   message:
                      //     "Invalid name. Only letters and spaces are allowed.",
                      // },
                    })}
                  />
                  {errors.spouse_name && (
                    <p className="text-red-600 text-sm">
                      {errors.spouse_name.message}
                    </p>
                  )}
                </div>

                <div className="form-section-content">
                  <Label htmlFor="offsprings">Number of Offsprings</Label>
                  <Input
                    id="offsprings"
                    type="number"
                    placeholder="Enter number of children"
                    {...register("offsprings", {
                      min: {
                        value: 0,
                        message: "Number of offsprings cannot be negative",
                      },
                      // max: {
                      //   value: 20,
                      //   message: "Please enter a reasonable number",
                      // },
                    })}
                  />
                  {errors.offsprings && (
                    <p className="text-red-600 text-sm">
                      {errors.offsprings.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Permanent Address */}
              <h1 className="form-section-title">Permanent Address</h1>
              <div className="form-section-content-container pb-0">
                <div className="form-section-content">
                  <Label htmlFor="province">Province</Label>
                  <Input
                    id="province"
                    placeholder="Enter province"
                    {...register("province", {
                      required: "Province is required",
                    })}
                  />
                  {errors.province && (
                    <p className="text-red-600 text-sm">
                      {errors.province.message}
                    </p>
                  )}
                </div>

                <div className="form-section-content">
                  <Label htmlFor="district">District</Label>
                  <Input
                    id="district"
                    placeholder="Enter district"
                    {...register("district", {
                      required: "District is required",
                    })}
                  />
                  {errors.district && (
                    <p className="text-red-600 text-sm">
                      {errors.district.message}
                    </p>
                  )}
                </div>

                <div className="form-section-content">
                  <Label htmlFor="vdc_municipality">VDC/Municipality</Label>
                  <Input
                    id="vdc_municipality"
                    placeholder="Enter VDC/Municipality"
                    {...register("vdc_municipality", {
                      required: "This field is required",
                    })}
                  />
                  {errors.vdc_municipality && (
                    <p className="text-red-600 text-sm">
                      {errors.vdc_municipality.message}
                    </p>
                  )}
                </div>

                <div className="form-section-content">
                  <Label htmlFor="ward_no">Ward No</Label>
                  <Input
                    id="ward_no"
                    type="number"
                    placeholder="Enter ward number"
                    {...register("ward_no", {
                      required: "Ward number is required",
                    })}
                  />
                  {errors.ward_no && (
                    <p className="text-red-600 text-sm">
                      {errors.ward_no.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Checkbox  */}
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

              {/* Current Address */}
              <h1 className="form-section-title">Current Address</h1>
              <div className="form-section-content-container pb-0">
                <div className="form-section-content">
                  <Label htmlFor="current_province">Province</Label>
                  <Input
                    id="current_province"
                    placeholder="Enter province"
                    {...register("current_province", {
                      required: "Province is required",
                    })}
                  />
                  {errors.current_province && (
                    <p className="text-red-600 text-sm">
                      {errors.current_province.message}
                    </p>
                  )}
                </div>

                <div className="form-section-content">
                  <Label htmlFor="current_district">District</Label>
                  <Input
                    id="current_district"
                    placeholder="Enter district"
                    {...register("current_district", {
                      required: "District is required",
                    })}
                  />
                  {errors.current_district && (
                    <p className="text-red-600 text-sm">
                      {errors.current_district.message}
                    </p>
                  )}
                </div>

                <div className="form-section-content">
                  <Label htmlFor="current_vdc_municipality">
                    VDC/Municipality
                  </Label>
                  <Input
                    id="current_vdc_municipality"
                    placeholder="Enter VDC/Municipality"
                    {...register("current_vdc_municipality", {
                      required: "This field is required",
                    })}
                  />
                  {errors.current_vdc_municipality && (
                    <p className="text-red-600 text-sm">
                      {errors.current_vdc_municipality.message}
                    </p>
                  )}
                </div>

                <div className="form-section-content">
                  <Label htmlFor="current_ward_no">Ward No</Label>
                  <Input
                    id="current_ward_no"
                    type="number"
                    placeholder="Enter ward number"
                    {...register("current_ward_no", {
                      required: "Ward number is required",
                    })}
                  />
                  {errors.current_ward_no && (
                    <p className="text-red-600 text-sm">
                      {errors.current_ward_no.message}
                    </p>
                  )}
                </div>

                <div className="form-section-content">
                  <Label htmlFor="no_of_proposal">No. of Proposal</Label>
                  <Input
                    id="no_of_proposal"
                    placeholder="Select Proposal"
                    defaultValue="Multiple"
                    {...register("no_of_proposal", {
                      required: "No. of Proposal",
                    })}
                  />
                  {errors.no_of_proposal && (
                    <p className="text-red-600 text-sm">
                      {errors.no_of_proposal.message}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}

      <div className="pt-4">
        {!stepper[0].state &&
          retailLoanData.custom_client_type === "Existing" && (
            <div className="form-next-button">
              <Button type="button" onClick={() => handleStepper(0)}>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Next&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Button>
            </div>
          )}
      </div>
    </Card>
  );
};

export default ApplicantDetails;
