import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
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

export function GuarantorDetailsTable({
  retailLoanData,
  setValue,
  stepper,
  handleStepper,
}) {
  const [guarantors, setGuarantors] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState({});
  const [guarantorDetails, setGuarantorDetails] = useState({
    is_existing_customer: "",
    account_number: "",
    custom_customer_name: "",
    email: "",
    phone: "",
    citizenship_number: "",
    citizenship_issued_date: "",
    citizenship_issued_district: "",
    pan_number: "",
    pan_issued_date: "",
    pan_issued_district: "",
    grandfathers_name: "",
    fathers_name: "",
    mother_name: "",
    spouse_name: "",
    offsprings: "",
  });

  const handleFetch = () => {
    if (
      guarantorDetails.account_number == "13420002008" &&
      guarantorDetails.phone == "9810126827"
    ) {
      setTimeout(() => {
        setGuarantorDetails({
          ...guarantorDetails,
          custom_customer_name: "John Doe",
          email: "johndoe@example.com",
          citizenship_number: "1234567890",
          citizenship_issued_date: "2015-06-12",
          citizenship_issued_district: "Kathmandu",
          pan_number: "987654321",
          pan_issued_date: "2015-06-12",
          pan_issued_district: "Kathmandu",
          grandfathers_name: "Ram Bahadur Doe",
          fathers_name: "Shyam Bahadur Doe",
          mother_name: "Sita Doe",
          spouse_name: "Rita Doe",
          offsprings: "2",
        });
      }, 1000);
    }
  };

  const addPerson = (e) => {
    e.preventDefault();

    if (validate()) {
      const newPerson = { ...guarantorDetails, id: Date.now() };
      setGuarantors([...guarantors, newPerson]);

      if (!retailLoanData.table_ngjk) {
        setValue("table_ngjk", [newPerson]);
        setGuarantorDetails({
          is_existing_customer: "",
          account_number: "",
          custom_customer_name: "",
          email: "",
          phone: "",
          citizenship_number: "",
          citizenship_issued_date: "",
          citizenship_issued_district: "",
          pan_number: "",
          grandfathers_name: "",
          fathers_name: "",
          mother_name: "",
          spouse_name: "",
          offsprings: "",
        });
        setIsFormOpen(false);
        return;
      }
      // Update retailLoanData to append this person to the guarantors array
      const updatedGuarantors = [...retailLoanData.table_ngjk, newPerson];
      setValue("table_ngjk", updatedGuarantors); // This will update the `guarantors` in the useForm hook

      // Clear form data and close the form after adding
      setGuarantorDetails({
        is_existing_customer: "",
        account_number: "",
        custom_customer_name: "",
        email: "",
        phone: "",
        citizenship_number: "",
        citizenship_issued_date: "",
        citizenship_issued_district: "",
        pan_number: "",
        education: "",
        experience: "",
        grandfathers_name: "",
        fathers_name: "",
        mother_name: "",
        spouse_name: "",
        offsprings: "",
      });
      setIsFormOpen(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setGuarantorDetails((prev) => ({ ...prev, [id]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!guarantorDetails.is_existing_customer) {
      newErrors.is_existing_customer = "This field is required.";
    }
    if (guarantorDetails.is_existing_customer === "YES") {
      if (!guarantorDetails.account_number) {
        newErrors.account_number = "Please, enter your account number.";
      }
    }
    if (!guarantorDetails.custom_customer_name) {
      newErrors.custom_customer_name = "Full name is required.";
    }
    if (!guarantorDetails.email) {
      newErrors.email = "Email is required.";
    }
    if (!guarantorDetails.phone) {
      newErrors.phone = "Phone number is required.";
    }
    // Add more validations as needed...

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const deletePerson = (id) => {
    // Filter out the person to be deleted from the local state
    const updatedPeople = guarantors.filter((person) => person.id !== id);
    setGuarantors(updatedPeople); // Update the local state

    // Update the form state with the new list of guarantors
    setValue("guarantors", updatedPeople); // This will update the `guarantors` in the useForm hook
  };

  const filteredPeople = guarantors.filter(
    (person) =>
      person.custom_customer_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      person.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="form-section shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="form-section-title">Guarantor Details</h1>
        <Button
          type="button"
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
              <TableCell className="font-medium">
                {person.custom_customer_name}
              </TableCell>
              <TableCell>{person.email}</TableCell>
              <TableCell>{person.phone}</TableCell>
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
        <DialogContent className="max-w-[80%] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Guarantor</DialogTitle>
          </DialogHeader>
          <form onSubmit={addPerson} className="space-y-4">
            <div>
              <div className="form-section-content-container-single py-0">
                <h1 className="form-section-title">Guarantor Details</h1>
                <div className="form-section-content">
                  <Label htmlFor="is_existing_customer">
                    Are you an Existing CAS Bank Customer?
                  </Label>
                  <Select
                    id="is_existing_customer"
                    onValueChange={(value) =>
                      handleChange({
                        target: { id: "is_existing_customer", value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="YES">YES</SelectItem>
                      <SelectItem value="NO">NO</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.is_existing_customer && (
                    <p className="text-red-600 text-sm">
                      {errors.is_existing_customer}
                    </p>
                  )}
                </div>
              </div>

              {guarantorDetails.is_existing_customer === "YES" && (
                <>
                  {/* Account Number */}
                  <div className="form-section-content-container">
                    <div className="form-section-content">
                      <Label htmlFor="account_number">Account Number</Label>
                      <Input
                        id="account_number"
                        value={guarantorDetails.account_number}
                        onChange={handleChange}
                        placeholder="Enter your account number"
                      />
                      {errors.account_number && (
                        <p className="text-red-600 text-sm">
                          {errors.account_number}
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="form-section-content">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={guarantorDetails.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && (
                        <p className="text-red-600 text-sm">{errors.phone}</p>
                      )}
                    </div>

                    <div className="form-section-content">
                      <Button type="button" onClick={() => handleFetch()}>
                        Fetch Data
                      </Button>
                    </div>
                  </div>

                  {/* Personal Information Section */}
                  <h1 className="form-section-title">Personal Information</h1>
                  <div className="form-section-content-container">
                    <div className="form-section-content">
                      <Label htmlFor="custom_customer_name">
                        Guarantor Full Name
                      </Label>
                      <Input
                        id="custom_customer_name"
                        value={guarantorDetails.custom_customer_name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                      />
                      {errors.custom_customer_name && (
                        <p className="text-red-600 text-sm">
                          {errors.custom_customer_name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="form-section-content">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={guarantorDetails.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="text-red-600 text-sm">{errors.email}</p>
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
                        value={guarantorDetails.citizenship_number}
                        onChange={handleChange}
                        placeholder="Enter your citizenship number"
                      />
                      {errors.citizenship_number && (
                        <p className="text-red-600 text-sm">
                          {errors.citizenship_number}
                        </p>
                      )}
                    </div>

                    <div className="form-section-content">
                      <Label htmlFor="citizenship_issued_date">
                        Citizenship Issued Date (DD/MM/YYYY)
                      </Label>
                      <Input
                        id="citizenship_issued_date"
                        type="text"
                        value={guarantorDetails.citizenship_issued_date}
                        onChange={handleChange}
                        placeholder="DD/MM/YYYY"
                      />
                      {errors.citizenship_issued_date && (
                        <p className="text-red-600 text-sm">
                          {errors.citizenship_issued_date}
                        </p>
                      )}
                    </div>

                    <div className="form-section-content">
                      <Label htmlFor="citizenship_issued_district">
                        Citizenship Issued District
                      </Label>
                      <Input
                        id="citizenship_issued_district"
                        type="text"
                        value={guarantorDetails.citizenship_issued_district}
                        onChange={handleChange}
                        placeholder="DD/MM/YYYY"
                      />
                      {errors.citizenship_issued_district && (
                        <p className="text-red-600 text-sm">
                          {errors.citizenship_issued_district}
                        </p>
                      )}
                    </div>

                    <div className="form-section-content">
                      <Label htmlFor="pan_number">PAN Number</Label>
                      <Input
                        id="pan_number"
                        type="text"
                        value={guarantorDetails.pan_number}
                        onChange={handleChange}
                        placeholder="Enter your PAN number"
                      />
                      {errors.pan_number && (
                        <p className="text-red-600 text-sm">
                          {errors.pan_number}
                        </p>
                      )}
                    </div>

                    <div className="form-section-content">
                      <Label htmlFor="pan_issued_date">
                        PAN Issued Date (DD/MM/YYYY)
                      </Label>
                      <Input
                        id="pan_issued_date"
                        type="text"
                        value={guarantorDetails.pan_issued_date}
                        onChange={handleChange}
                        placeholder="DD/MM/YYYY"
                      />
                      {errors.pan_issued_date && (
                        <p className="text-red-600 text-sm">
                          {errors.pan_issued_date}
                        </p>
                      )}
                    </div>

                    <div className="form-section-content">
                      <Label htmlFor="pan_issued_district">
                        PAN Issued District
                      </Label>
                      <Input
                        id="pan_issued_district"
                        type="text"
                        value={guarantorDetails.pan_issued_district}
                        onChange={handleChange}
                        placeholder="DD/MM/YYYY"
                      />
                      {errors.pan_issued_district && (
                        <p className="text-red-600 text-sm">
                          {errors.pan_issued_district}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Family Information Section */}
                  <h1 className="form-section-title">Family Information</h1>
                  <div className="form-section-content-container">
                    <div className="form-section-content">
                      <Label htmlFor="grandfathers_name">
                        Grandfather's Name
                      </Label>
                      <Input
                        id="grandfathers_name"
                        value={guarantorDetails.grandfathers_name}
                        onChange={handleChange}
                        placeholder="Enter grandfather's name"
                      />
                      {errors.grandfathers_name && (
                        <p className="text-red-600 text-sm">
                          {errors.grandfathers_name}
                        </p>
                      )}
                    </div>

                    <div className="form-section-content">
                      <Label htmlFor="fathers_name">Father's Name</Label>
                      <Input
                        id="fathers_name"
                        value={guarantorDetails.fathers_name}
                        onChange={handleChange}
                        placeholder="Enter father's name"
                      />
                      {errors.fathers_name && (
                        <p className="text-red-600 text-sm">
                          {errors.fathers_name}
                        </p>
                      )}
                    </div>

                    <div className="form-section-content">
                      <Label htmlFor="mother_name">Mother's Name</Label>
                      <Input
                        id="mother_name"
                        value={guarantorDetails.mother_name}
                        onChange={handleChange}
                        placeholder="Enter mother's name"
                      />
                      {errors.mother_name && (
                        <p className="text-red-600 text-sm">
                          {errors.mother_name}
                        </p>
                      )}
                    </div>

                    <div className="form-section-content">
                      <Label htmlFor="spouse_name">Spouse's Name</Label>
                      <Input
                        id="spouse_name"
                        value={guarantorDetails.spouse_name}
                        onChange={handleChange}
                        placeholder="Enter spouse's name (if applicable)"
                      />
                      {errors.spouse_name && (
                        <p className="text-red-600 text-sm">
                          {errors.spouse_name}
                        </p>
                      )}
                    </div>

                    <div className="form-section-content">
                      <Label htmlFor="offsprings">Number of Offsprings</Label>
                      <Input
                        id="offsprings"
                        type="number"
                        value={guarantorDetails.offsprings}
                        onChange={handleChange}
                        placeholder="Enter number of children"
                      />
                      {errors.offsprings && (
                        <p className="text-red-600 text-sm">
                          {errors.offsprings}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
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
      <div className="">
        {!stepper[1].state && (
          <div className="form-next-button">
            <Button type="submit" onClick={() => handleStepper(1)}>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Next&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
