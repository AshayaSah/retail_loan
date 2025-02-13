import React from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Preview from "@/components/form/form_components/preview/Preview";
import FancyAlert from "@/components/form/alert/FancyAlert";

const TermsAndConditionsSection = ({
  tandC,
  setTandC,
  handleSubmit,
  onSubmit,
  isSubmitted,
  alertMessage,
  setAlertMessage,
  retailLoanData,
}) => {
  const navigate = useNavigate();

  return (
    <div className="form-section">
      {/* Terms and Conditions */}
      <div className="form-section-content">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="same_address"
            checked={tandC}
            onCheckedChange={(checked) => setTandC(checked)}
          />
          <Label htmlFor="same_address">
            I acknowledge that the information provided is accurate and has been
            reviewed diligently. I accept full responsibility for its
            completeness and correctness upon submission.
          </Label>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" type="button" onClick={() => navigate("/")}>
          Cancel
        </Button>

        <Preview data={retailLoanData} />

        <Button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={!tandC || isSubmitted}
        >
          {!isSubmitted ? "Submit Application" : "Submitted"}
        </Button>

        {/* Fancy Alert */}
        {alertMessage && (
          <FancyAlert message={alertMessage} onClose={() => setAlertMessage("")} />
        )}
      </div>
    </div>
  );
};

export default TermsAndConditionsSection;
