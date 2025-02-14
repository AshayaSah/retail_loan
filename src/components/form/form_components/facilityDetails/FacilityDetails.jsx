import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form"; // Import useForm
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
  DialogDescription,
} from "@/components/ui/dialog";
import { Edit2, PlusCircle, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export function FacilityDetails({
  retailLoanData,
  setValue,
  stepper,
  handleStepper,
}) {
  const [facilities, setFacilities] = useState(retailLoanData.table_lfoa || []);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const facilitySchema = z.object({
    facility_type: z.string().min(1, "Facility type is required"),
    tenure_in_months: z.coerce
      .number()
      .int("Must be a whole number")
      .positive("Must be at least 1 month"),
    proposal_limit: z.coerce
      .number()
      .positive("Proposal limit must be positive"),
    purpose: z.string().min(1, "Purpose is required"),
  });

  // Initialize useForm
  const {
    data,
    register,
    handleSubmit,
    reset,
    setValue: setFormValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(facilitySchema),
    defaultValues: {
      facility_type: "Housing Loan",
      tenure_in_months: "",
      proposal_limit: "",
      purpose: "",
    },
  });

  const [editingId, setEditingId] = useState(null);
  const [isFormComplete, setIsFormComplete] = useState(false);
  // Update parent form whenever facilities change
  useEffect(() => {
    setValue("table_lfoa", facilities);
  }, [facilities, setValue]);

  useEffect(() => {
    const hasErrors = Object.keys(errors).length > 0;
    setIsFormComplete(!hasErrors && facilities.length > 0); // Ensure at least one security is added
  }, [errors, facilities]);
  const addOrUpdateFacility = (data) => {
    let updatedFacilities;
    if (editingId) {
      updatedFacilities = facilities.map((facility) =>
        facility.id === editingId ? { ...data, id: editingId } : facility
      );
    } else {
      updatedFacilities = [...facilities, { ...data, id: Date.now() }];
    }

    setFacilities(updatedFacilities);
    reset();
    setIsFormOpen(false);
    setEditingId(null);
  };

  const editFacility = (e, id) => {
    e.preventDefault();
    const facilityToEdit = facilities.find((facility) => facility.id === id);
    if (facilityToEdit) {
      Object.entries(facilityToEdit).forEach(([key, value]) => {
        setFormValue(key, value);
      });
      setEditingId(id);
      setIsFormOpen(true);
    }
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
        <h1 className="form-section-title">Facility Details</h1>
        <Button type="button" onClick={() => setIsFormOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Facility
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Facility Type</TableHead>
            <TableHead>Tenure (Months)</TableHead>
            <TableHead>Proposal Limit</TableHead>
            <TableHead>Purpose</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {facilities.map((facility) => (
            <TableRow key={facility.id}>
              <TableCell>{facility.facility_type}</TableCell>
              <TableCell>{facility.tenure_in_months}</TableCell>
              <TableCell>{facility.proposal_limit}</TableCell>
              <TableCell>{facility.purpose}</TableCell>
              <TableCell className="flex gap-3">
                <Button
                  variant="ghost"
                  onClick={(e) => editFacility(e, facility.id)}
                  className="p-2 hover:bg-blue-100"
                >
                  <Edit2 className="h-4 w-4 text-blue-500" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => deleteFacility(facility.id)}
                  className="p-2 hover:bg-red-100"
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
            <DialogTitle id="dialog-title">Add Facility</DialogTitle>
            <DialogDescription id="dialog-description" className="hidden">
              Please fill in the Facility details below.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4">
            <h1 className="form-section-title">Facility Details</h1>

            <div className="form-section-content-container-three">
              <div className="form-section-content">
                <Label htmlFor="facility_type">Facility Type</Label>
                <Input
                  id="facility_type"
                  {...register("facility_type")} // Register input
                  placeholder="Enter facility type"
                  className="w-full h-10 p-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.facility_type && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.facility_type.message}
                  </p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="tenure_in_months">Tenure (In Months)</Label>
                <Input
                  id="tenure_in_months"
                  min="0"
                  type="number"
                  {...register("tenure_in_months", {})} // Register input
                  placeholder="Enter tenure in months"
                  className="w-full h-10 p-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.tenure_in_months && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.tenure_in_months.message}
                  </p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="proposal_limit">Loan Amount</Label>
                <Input
                  id="proposal_limit"
                  type="number"
                  min="0"
                  {...register("proposal_limit")} // Register input
                  placeholder="Enter proposal limit"
                  className="w-full h-10 p-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.proposal_limit && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.proposal_limit.message}
                  </p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="purpose">Purpose</Label>
                <Textarea
                  id="purpose"
                  {...register("purpose")} // Register input
                  placeholder="Enter purpose"
                  className="w-full h-24 p-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {errors.purpose && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.purpose.message}
                  </p>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsFormOpen(false)}
              >
                Cancel
              </Button>
              <Button type="button" onClick={handleSubmit(addOrUpdateFacility)}>
                {editingId ? "Update" : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {!stepper[2].state && (
        <div className="form-next-button">
          <Button
            type="button"
            onClick={() => handleStepper(2)}
            disabled={!isFormComplete}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Next&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Button>
        </div>
      )}
    </Card>
  );
}
