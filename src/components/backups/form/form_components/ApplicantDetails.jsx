import React, { useState } from "react";
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

const ApplicantDetails = ({
  retailLoanData,
  handleInputChange,
  handleSelectChange,
  handleSubmit,
}) => {
  return (
    <form className="form-section">
      <div className="form-section-content-container">
        <div className="form-section-content">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            value={retailLoanData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-section-content">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            value={retailLoanData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-section-content">
          <Label htmlFor="email">Email</Label>
          <Input
            placeholder="Email"
            name="email"
            type="email"
            value={retailLoanData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-section-content">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={retailLoanData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-section-content">
          <Label htmlFor="education">Highest Education</Label>
          <Select
            name="education"
            onValueChange={(value) => handleSelectChange("education", value)}
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
        </div>

        <div className="form-section-content">
          <Label htmlFor="experience">Years of Experience</Label>
          <Select
            name="experience"
            onValueChange={(value) => handleSelectChange("experience", value)}
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
        </div>
      </div>

      <Button type="button" onClick={handleSubmit} className="w-full">
        Submit Application
      </Button>
    </form>
  );
};

export default ApplicantDetails;
