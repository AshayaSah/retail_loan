import { useState } from "react";
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
import { PlusCircle, Search, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Controller } from "react-hook-form";

export function GuarantorDetailsTable({
  register,
  errors,
  isValid,
  control,
  handleSelectChange,
  retailLoanData,
  setValue,
  stepper,
  handleStepper,
}) {
  const [people, setPeople] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", age: "" });

  const addPerson = (e) => {
    e.preventDefault();
    const newPerson = { ...formData, id: Date.now() };
    setPeople([...people, newPerson]);

    // Update retailLoanData to append this person to the guarantors array
    const updatedGuarantors = [...retailLoanData.guarantors, newPerson];
    setValue("guarantors", updatedGuarantors); // This will update the `guarantors` in the useForm hook

    // Close the form after adding
    setIsFormOpen(false);
  };

  const deletePerson = (id) =>
    setPeople(people.filter((person) => person.id !== id));

  const filteredPeople = people.filter(
    (person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="form-section shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Guarantor Details</h1>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add Guarantor
        </Button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search by name or email"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Guarantor Name</TableHead>
            <TableHead className="w-[200px]">Email</TableHead>
            <TableHead className="w-[100px]">Phone</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPeople.map((person) => (
            <TableRow key={person.id}>
              <TableCell className="font-medium">{person.name}</TableCell>
              <TableCell>{person.email}</TableCell>
              <TableCell>{person.age}</TableCell>
              <TableCell className="pl-5">
                <Button
                  variant="ghost"
                  onClick={() => deletePerson(person.id)}
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Guarantor</DialogTitle>
          </DialogHeader>
          <form onSubmit={addPerson} className="space-y-4">
            <div className="form-section-content-container-single py-0">
              <h1 className="form-section-title">Guarantor Details</h1>
              <div className="form-section-content">
                <Label htmlFor="is_existing_customer">
                  Are you an Existing CAS Bank Customer?
                </Label>
                <Controller
                  name="is_existing_customer"
                  control={control}
                  rules={{ required: "This field is required" }}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="YES"
                          id="is_existing_customer_yes"
                        />
                        <Label htmlFor="is_existing_customer_yes">YES</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="NO"
                          id="is_existing_customer_no"
                        />
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

            {/* Guarantor Details Section */}
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
                    <Label htmlFor="custom_customer_name">
                      Guarantor Full Name
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
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: "Enter a valid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm">
                        {errors.email.message}
                      </p>
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
                      <p className="text-red-600 text-sm">
                        {errors.phone.message}
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

                  {/* Other sections can also follow a similar approach */}
                </div>
              </>
            )}

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
    </Card>
  );
}
