import React from "react";
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

const GuarantorDetails = ({
  register,
  errors,
  isValid,
  handleSelectChange,
  handleStepper,
}) => {
  return (
    <div className="form-section ">
      <div className="form-section-content-container pt-0">
        <div className="form-section-content">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            {...register("guarantor_name", {
              required: "First Name is required",
            })}
          />
          {errors.firstName && (
            <p className="text-red-600 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        <div className="form-section-content">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            {...register("guarantor_lastName", {
              required: "Last Name is required",
            })}
          />
          {errors.lastName && (
            <p className="text-red-600 text-sm">{errors.lastName.message}</p>
          )}
        </div>

        <div className="form-section-content">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("guarantor_email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="form-section-content">
          <Label htmlFor="guarantor_phone">Phone</Label>
          <Input
            id="guarantor_phone"
            type="tel"
            {...register("guarantor_phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Invalid phone number",
              },
            })}
          />
          {errors.phone && (
            <p className="text-red-600 text-sm">{errors.phone.message}</p>
          )}
        </div>

        <div className="form-section-content">
          <Label htmlFor="education">Highest Education</Label>
          <Select
            onValueChange={(value) =>
              handleSelectChange("guarantor_education", value)
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
            <p className="text-red-600 text-sm">{errors.education.message}</p>
          )}
        </div>

        <div className="form-section-content">
          <Label htmlFor="experience">Years of Experience</Label>
          <Select
            onValueChange={(value) =>
              handleSelectChange("guarantor_experience", value)
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
            <p className="text-red-600 text-sm">{errors.experience.message}</p>
          )}
        </div>
      </div>
      <div className="form-section-content-container-single">
        <Button onClick={() => handleStepper(1)} disabled={!isValid}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default GuarantorDetails;
