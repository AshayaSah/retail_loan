// Create a new file: FinalStep.jsx
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
// import Preview from "./preview/Preview";
import { Label } from "@/components/ui/label";
import Preview from "../preview/Preview";

const FinalStep = ({ retailLoanData }) => {
  const {  formState } = useFormContext();
  const navigate = useNavigate();
  const [tandC, setTandC] = useState(false);
  return (
    <div className="form-section">
      <div className="form-section-content">
        <Checkbox
          id="form_tandc"
          checked={tandC}
          onCheckedChange={(checked) => setTandC(checked)}
        />
        <Label htmlFor="form_tandc">
          I acknowledge that the information provided is accurate and has been
          reviewed diligently. I accept full responsibility for its completeness
          and correctness upon submission.
        </Label>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => navigate("/")}>
          Cancel
        </Button>
        <Preview data={retailLoanData} />
        <Button
          type="submit"
          disabled={!formState.isValid || formState.isSubmitting}
        >
          {formState.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
};

export default FinalStep;
