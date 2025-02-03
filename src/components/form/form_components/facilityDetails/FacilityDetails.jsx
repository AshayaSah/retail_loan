import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { PlusCircle, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export function FacilityDetails({
  retailLoanData,
  setValue,
  stepper,
  handleStepper,
}) {
  const [facilities, setFacilities] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [facilityDetails, setFacilityDetails] = useState({
    facility_type: "Housing Loan",
    tenure: "",
    proposal_limit: "",
    base_rate: "",
    ir_premium: "",
    interest_proposed: "",
    service_fees: "",
    purpose: "",
    emi: "",
  });

  const addFacility = (e) => {
    e.preventDefault();
    const newFacility = { ...facilityDetails, id: Date.now() };
    setFacilities([...facilities, newFacility]);

    if (!retailLoanData.table_lfoa) {
      setValue("table_lfoa", [newFacility]);
    } else {
      const updatedFacilities = [...retailLoanData.table_lfoa, newFacility];
      setValue("table_lfoa", updatedFacilities);
    }

    setFacilityDetails({
      facility_type: "",
      tenure: "",
      proposal_limit: "",
      base_rate: "",
      ir_premium: "",
      interest_proposed: "",
      service_fees: "",
      purpose: "",
      emi: "",
    });
    setIsFormOpen(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFacilityDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleEmi = () => {
    const { tenure, proposal_limit, base_rate, ir_premium, interest_proposed } =
      facilityDetails;
    const tenureInMonths = parseInt(tenure);
    const proposalLimit = parseInt(proposal_limit);
    const baseRate = parseInt(base_rate);
    const irPremium = parseInt(ir_premium);
    // const interestProposed = parseInt(interest_proposed);

    // Convert annual interest rate to a monthly rate
    const interestProposed = baseRate + irPremium;
    const monthlyRate = interestProposed / 100 / 12;

    // Calculate EMI
    const emi =
      (proposalLimit *
        monthlyRate *
        Math.pow(1 + monthlyRate, tenureInMonths)) /
      (Math.pow(1 + monthlyRate, tenureInMonths) - 1);

    setFacilityDetails((prev) => ({
      ...prev,
      emi: emi.toFixed(2),
      interest_proposed: interestProposed,
    }));
  };

  const deleteFacility = (id) => {
    const updatedFacilities = facilities.filter(
      (facility) => facility.id !== id
    );
    setFacilities(updatedFacilities);
  };

  return (
    <Card className="form-section shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Facility Details</h1>
        <Button
          type="button"
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add Facility
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Facility Type</TableHead>
            <TableHead>Tenure (Months)</TableHead>
            <TableHead>Proposal Limit</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {facilities.map((facility) => (
            <TableRow key={facility.id}>
              <TableCell>{facility.facility_type}</TableCell>
              <TableCell>{facility.tenure}</TableCell>
              <TableCell>{facility.proposal_limit}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  onClick={() => deleteFacility(facility.id)}
                  className="p-1 hover:bg-red-100"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-[80%] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Facility</DialogTitle>
          </DialogHeader>
          <form onSubmit={addFacility} className="space-y-4">
            <h1 className="form-section-title">Facility Details</h1>

            <div className="form-section-content-container-three">
              <div className="form-section-content">
                <Label htmlFor="facility_type">Facility Type</Label>
                <Input
                  id="facility_type"
                  value={facilityDetails.facility_type}
                  onChange={handleChange}
                  placeholder="Enter facility type"
                  className="w-full h-10 p-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="form-section-content">
                <Label htmlFor="tenure">Tenure (In Months)</Label>
                <Input
                  id="tenure"
                  value={facilityDetails.tenure}
                  onChange={handleChange}
                  placeholder="Enter tenure in months"
                  className="w-full h-10 p-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="form-section-content">
                <Label htmlFor="proposal_limit">Loan Ammount</Label>
                <Input
                  id="proposal_limit"
                  value={facilityDetails.proposal_limit}
                  onChange={handleChange}
                  placeholder="Enter proposal limit"
                  className="w-full h-10 p-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="form-section-content">
                <Label htmlFor="base_rate">Base Rate (%)</Label>
                <Input
                  id="base_rate"
                  value={facilityDetails.base_rate}
                  onChange={handleChange}
                  placeholder="Enter base rate"
                  className="w-full h-10 p-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="form-section-content">
                <Label htmlFor="ir_premium">IR Premium Proposed (%)</Label>
                <Input
                  id="ir_premium"
                  value={facilityDetails.ir_premium}
                  onChange={handleChange}
                  placeholder="Enter IR premium proposed"
                  className="w-full h-10 p-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="form-section-content">
                <Label htmlFor="interest_proposed">Interest Proposed (%)</Label>
                <Input
                  id="interest_proposed"
                  value={facilityDetails.interest_proposed}
                  onChange={handleChange}
                  placeholder="Enter interest proposed"
                  className="w-full h-10 p-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="form-section-content">
                <Label htmlFor="purpose">Purpose</Label>
                <Textarea
                  id="purpose"
                  value={facilityDetails.purpose}
                  onChange={handleChange}
                  placeholder="Enter purpose"
                  className="w-full h-24 p-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="form-section-content">
                <Label htmlFor="service_fees">Service Fees</Label>
                <Input
                  id="service_fees"
                  value={facilityDetails.service_fees}
                  onChange={handleChange}
                  placeholder="Enter service fees"
                  className="w-full h-10 p-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="form-section-content">
                <Label>&nbsp;</Label>
                <Button type="button" onClick={() => handleEmi()}>
                  Calculate EMI
                </Button>
              </div>
            </div>
            <div className="form-section-content">
              <h1 className="form-section-title">Calculated EMI</h1>
              <Label htmlFor="emi">EMI</Label>
              <Input
                id="emi"
                value={facilityDetails.emi}
                onChange={handleChange}
                placeholder="Enter EMI"
                className="w-full h-10 p-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsFormOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {!stepper[2].state && (
        <div className="form-next-button">
          <Button type="button" onClick={() => handleStepper(2)}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Next&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Button>
        </div>
      )}
    </Card>
  );
}
