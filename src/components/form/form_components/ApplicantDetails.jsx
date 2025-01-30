import React, { useEffect } from "react";
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

const ApplicantDetails = ({
  register,
  errors,
  isValid,
  control,
  handleSelectChange,
  retailLoanData,
  stepper,
  handleStepper,
}) => {
  return (
    <Card className="form-section shadow-lg mt-8">
      {/* Check the Existing Customer Section */}
      <div className="form-section-content-container-single py-0">
        <h1 className="form-section-title">Applicant Details</h1>
        <div className="form-section-content">
          <Label htmlFor="is_existing_customer">
            Are you an Existing CAS Bank Customer?
          </Label>
          <Controller
            name="is_existing_customer"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <RadioGroup onValueChange={field.onChange} value={field.value}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="YES" id="is_existing_customer_yes" />
                  <Label htmlFor="is_existing_customer_yes">YES</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="NO" id="is_existing_customer_no" />
                  <Label htmlFor="is_existing_customer_no">NO</Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.is_existing_customer && (
            <p className="text-red-600 text-sm">
              {errors.is_existing_customer.message}
            </p>
          )}
        </div>
      </div>

      {/* Applicant Details Section */}
      {retailLoanData.is_existing_customer === "YES" && (
        <>
          {/* Account Number  */}
          <div className="form-section-content-container-single">
            <div className="form-section-content">
              <Label htmlFor="account_number">Account Number</Label>
              <Input
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

          {/* Personal Information Section  */}
          <h1 className="form-section-title">Personal Information</h1>
          <div className="form-section-content-container">
            <div className="form-section-content">
              <Label htmlFor="custom_customer_name">Applicant Full Name</Label>
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

            {/* Email */}
            <div className="form-section-content">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="form-section-content">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your 10-digit phone number"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Phone number must be 10 digits",
                  },
                })}
              />
              {errors.phone && (
                <p className="text-red-600 text-sm">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Citizenship and PAN Information Section */}
          <h1 className="form-section-title">
            Citizenship and PAN Information
          </h1>
          <div className="form-section-content-container">
            <div className="form-section-content">
              <Label htmlFor="citizenship_number">Citizenship Number</Label>
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
                Citizenship Issued Date
              </Label>
              <Input
                id="citizenship_issued_date"
                type="tel"
                placeholder="DD/MM/YYYY"
                {...register("citizenship_issued_date", {
                  required: "Please, enter your citizenship issued date",
                  pattern: {
                    value: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
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
                Citizenship Issued District
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
                {...register("pan_number", {
                  required: "Please, enter your PAN number",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Invalid PAN number. It must be exactly 9 digits.",
                  },
                })}
              />
              {errors.pan_number && (
                <p className="text-red-600 text-sm">
                  {errors.pan_number.message}
                </p>
              )}
            </div>

            <div className="form-section-content">
              <Label htmlFor="education">Highest Education</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("education", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high-school">High School</SelectItem>
                  <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                  <SelectItem value="masters">Master's Degree</SelectItem>
                  <SelectItem value="phd">Ph.D.</SelectItem>
                </SelectContent>
              </Select>
              {errors.education && (
                <p className="text-red-600 text-sm">
                  {errors.education.message}
                </p>
              )}
            </div>

            <div className="form-section-content">
              <Label htmlFor="experience">Years of Experience</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("experience", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select years of experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1">0-1 years</SelectItem>
                  <SelectItem value="1-3">1-3 years</SelectItem>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="5+">5+ years</SelectItem>
                </SelectContent>
              </Select>
              {errors.experience && (
                <p className="text-red-600 text-sm">
                  {errors.experience.message}
                </p>
              )}
            </div>
          </div>

          {/* Family Information Section */}
          <h1 className="form-section-title">Family Information</h1>
          <div className="form-section-content-container">
            <div className="form-section-content">
              <Label htmlFor="grandfathers_name">Grandfather's Name</Label>
              <Input
                id="grandfathers_name"
                placeholder="Enter grandfather's name"
                {...register("grandfathers_name", {
                  required: "Grandfather's name is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message:
                      "Invalid name. Only letters and spaces are allowed.",
                  },
                })}
              />
              {errors.grandfathers_name && (
                <p className="text-red-600 text-sm">
                  {errors.grandfathers_name.message}
                </p>
              )}
            </div>

            <div className="form-section-content">
              <Label htmlFor="fathers_name">Father's Name</Label>
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
              <Label htmlFor="mother_name">Mother's Name</Label>
              <Input
                id="mother_name"
                placeholder="Enter mother's name"
                {...register("mother_name", {
                  required: "Mother's name is required",
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message:
                      "Invalid name. Only letters and spaces are allowed.",
                  },
                })}
              />
              {errors.mother_name && (
                <p className="text-red-600 text-sm">
                  {errors.mother_name.message}
                </p>
              )}
            </div>

            <div className="form-section-content">
              <Label htmlFor="spouse_name">Spouse's Name</Label>
              <Input
                id="spouse_name"
                placeholder="Enter spouse's name (if applicable)"
                {...register("spouse_name", {
                  pattern: {
                    value: /^[A-Za-z\s]*$/,
                    message:
                      "Invalid name. Only letters and spaces are allowed.",
                  },
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
                  max: {
                    value: 20,
                    message: "Please enter a reasonable number",
                  },
                })}
              />
              {errors.offsprings && (
                <p className="text-red-600 text-sm">
                  {errors.offsprings.message}
                </p>
              )}
            </div>
          </div>
        </>
      )}
      {!stepper[0].state && retailLoanData.is_existing_customer === "YES" && (
        <div className="form-next-button">
          <Button
            type="submit"
            onClick={() => (isValid ? handleStepper(0) : null)}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Next&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ApplicantDetails;
