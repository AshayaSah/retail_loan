import { useState, useEffect } from "react";
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
import { Edit2, PlusCircle, Search, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { provinceData, districtsNepali } from "../provincedetails";

export default function GuarantorDetailsTest({
  retailLoanData,
  setValue,
  stepper,
  handleStepper,
  register,
}) {
  const [guarantors, setGuarantors] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const [citizenshipMinDate, setCitizenshipMinDate] = useState("");

  const [guarantorDetails, setGuarantorDetails] = useState({
    is_existing_customer: "",
    account_number: "",
    guarantor_name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    citizenship_number: "",
    citizenship_issued_date: "",
    citizenship_issued_district: "",
    pan_number: "",
    pan_registration_date: "",
    pan_registration_district: "",
    province: "",
    district: "",
    vdc__municipality: "",
    ward_no: "",
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
          guarantor_name: "Jonathan Shrestha",
          email: "johndoe@example.com",
          citizenship_number: "1234567890",
          citizenship_issued_date: "2015-06-12",
          citizenship_issued_district: "Kathmandu",
          pan_number: "987654321",
          pan_registration_date: "2015-06-12",
          pan_registration_district: "Kathmandu",
          province: "Bagmati Province",
          district: "Kathmandu",
          vdc__municipality: "Kathmandu",
          ward_no: "10",
          grandfathers_name: "Ram Bahadur Shrestha",
          fathers_name: "Shyam Bahadur Shrestha",
          mother_name: "Sita Shrestha",
          spouse_name: "Rita Shrestha",
          offsprings: "2",
        });
      }, 1000);
    }
  };

  const addPerson = (e) => {
    e.preventDefault();

    if (validate()) {
      const newPerson = { ...guarantorDetails, id: Date.now() };
      const updatedGuarantors = [...guarantors, newPerson];
      setGuarantors(updatedGuarantors);
      setValue("table_ngjk", updatedGuarantors);

      clearForm();
    }
  };

  const editPerson = (e) => {
    e.preventDefault();

    if (validate()) {
      const updatedGuarantors = guarantors.map((person) =>
        person.id === editingId
          ? { ...guarantorDetails, id: editingId }
          : person
      );

      setGuarantors(updatedGuarantors);
      setValue("table_ngjk", updatedGuarantors);
      setEditingId(null);
      setIsFormOpen(false);
      clearForm();
    }
  };

  const handleEdit = (e, id) => {
    e.preventDefault();
    const guarantorToEdit = guarantors.find((person) => person.id === id);
    if (guarantorToEdit) {
      setGuarantorDetails(guarantorToEdit);
      setEditingId(id);
      setIsFormOpen(true);
    }
  };

  const clearForm = () => {
    setGuarantorDetails({
      is_existing_customer:'',
      name_of_owner: "",
      email: "",
      phone: "",
      property: "",
      area: "",
      location_of_property: "",
      province: "",
      district: "",
      vdcmunicipality: "",
      ward_no: "",
      placestreet_name: "",
      plot_no: "",
      land_revenue_office: "",
      shape_of_land: "",
      motorable_road_access: "",
      road_width: "",
      road_access_from: "",
      road_setbacks: "",
      river_setbacks: "",
      high_tension_setbacks: "",
    });
    setIsFormOpen(false);
    setErrors({});
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
    if (!guarantorDetails.guarantor_name) {
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
    return Object.keys(newErrors).length === 0;
  };

  const deletePerson = (id) => {
    // Filter out the person to be deleted from the local state
    const updatedPeople = guarantors.filter((person) => person.id !== id);
    setGuarantors(updatedPeople);

    setValue("guarantors", updatedPeople);
  };

  const filteredPeople = guarantors.filter(
    (person) =>
      person.guarantor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    // This will run when the date_of_birth changes
    const calculateMinCitizenshipDate = () => {
      const dob = retailLoanData.date_of_birth;
      const today = new Date(dob);

      if (!dob || isNaN(today.getTime())) return;

      // Add 16 years to the birthdate
      const minEligibleDate = new Date(today);
      minEligibleDate.setFullYear(today.getFullYear() + 16);

      // Format the date to YYYY-MM-DD and set it as the minimum allowed date for citizenship issuance
      setCitizenshipMinDate(minEligibleDate.toISOString().split("T")[0]);
    };

    calculateMinCitizenshipDate();
  }, [guarantorDetails.date_of_birth]);

  const calculateAge = (dob) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleAgeCalculation = (event) => {
    const dob = event.target.value;
    const calculatedAge = calculateAge(dob);

    if (calculatedAge < 0) {
      alert("Error: Date of Birth cannot be in future.");
      setValue("date_of_birth", "");
      return;
    }

    if (calculatedAge < 18) {
      alert("You must be at least 18 years old.");
      setValue("date_of_birth", "");
      return;
    }
    setValue("age", calculatedAge);
  };

  const handleAgeChangeandCalculation = (e) => {
    handleAgeCalculation(e);
    handleChange(e);
  };

  const handleClose = () => {
    clearForm();
    setIsFormOpen(false);
  };

  return (
    <Card className="form-section shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="form-section-title">Guarantor Details</h1>
        <Button
          type="button"
          onClick={() => {
            setEditingId(null);
            clearForm();
            setIsFormOpen(true);
          }}
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
            <TableHead className="w-[100px]">Province</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPeople.map((person) => (
            <TableRow key={person.id}>
              <TableCell className="font-medium">
                {person.guarantor_name}
              </TableCell>
              <TableCell>{person.email}</TableCell>
              <TableCell>{person.phone}</TableCell>
              <TableCell>{person.province}</TableCell>
              <TableCell className="flex gap-3">
                <Button
                  variant="ghost"
                  onClick={(e) => handleEdit(e, person.id)}
                  className="p-1 hover:bg-blue-100"
                >
                  <Edit2 className="h-4 w-4 text-blue-500" />
                </Button>
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => deletePerson(person.id)}
                  className="flex items-center justify-center p-2 bg-gray-200 text-red-500 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-red-100"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-[80%] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle id="dialog-title">
              {editingId ? "Edit Guarantor" : "Add Guarantor"}
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={!!editingId ? editPerson : addPerson}
            className="space-y-4"
          >
            <div>
              <div className="form-section-content-container-single py-0">
                <h1 className="form-section-title">Guarantor Details</h1>
                <div className="form-section-content">
                  <Label htmlFor="is_existing_customer">
                    Are you an Existing CAS Bank Customer?{" "}
                    <span className="text-red-600">*</span>
                  </Label>
                  <Select
                    id="is_existing_customer"
                    value={guarantorDetails.is_existing_customer}
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
                      <Label htmlFor="account_number">
                        Account Number <span className="text-red-600">*</span>
                      </Label>
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
                      <Label htmlFor="phone">
                        Phone Number <span className="text-red-600">*</span>
                      </Label>
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
                      <Label htmlFor="guarantor_name">
                        Guarantor Full Name
                      </Label>
                      <Input
                        id="guarantor_name"
                        value={guarantorDetails.guarantor_name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                      />
                      {errors.guarantor_name && (
                        <p className="text-red-600 text-sm">
                          {errors.guarantor_name}
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
                        value={guarantorDetails.date_of_birth}
                        onChange={handleAgeChangeandCalculation}
                        placeholder="Enter your date of Birth"
                        max={currentDate}
                      />
                      {errors.date_of_birth && (
                        <p className="text-red-600 text-sm">
                          {errors.date_of_birth.message}
                        </p>
                      )}
                    </div>
                    {/* Email */}
                    <div className="form-section-content">
                      <Label htmlFor="email">
                        Email Address <span className="text-red-600">*</span>
                      </Label>
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
                    <div className="form-section-content">
                      <Label htmlFor="nationality">
                        Nationality <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        id="nationality"
                        type="tel"
                        value={guarantorDetails.nationality}
                        defaultValue="Nepali"
                        onChange={handleChange}
                        placeholder="Enter your email"
                        disabled
                      />
                      {errors.email && (
                        <p className="text-red-600 text-sm">
                          {errors.nationality}
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
                        type="date"
                        min={citizenshipMinDate}
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
                      <Select
                        id="citizenship_issued_district"
                        value={guarantorDetails.citizenship_issued_district}
                        onValueChange={(value) =>
                          handleChange({
                            target: {
                              id: "citizenship_issued_district",
                              value,
                            },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Citizenship Issued district" />
                        </SelectTrigger>
                        <SelectContent>
                          {districtsNepali.map((district) => (
                            <SelectItem key={district} value={district}>
                              {district}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      <Label htmlFor="pan_registration_date">
                        PAN Issued Date (DD/MM/YYYY)
                      </Label>
                      <Input
                        id="pan_registration_date"
                        type="date"
                        value={guarantorDetails.pan_registration_date}
                        onChange={handleChange}
                        placeholder="DD/MM/YYYY"
                      />
                      {errors.pan_registration_date && (
                        <p className="text-red-600 text-sm">
                          {errors.pan_registration_date}
                        </p>
                      )}
                    </div>

                    <div className="form-section-content">
                      <Label htmlFor="pan_registration_district">
                        Pan Issued District
                      </Label>
                      <Select
                        id="pan_registration_district"
                        value={guarantorDetails.pan_registration_district} 
                        onValueChange={(value) =>
                          handleChange({
                            target: { id: "pan_registration_district", value },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your district" />
                        </SelectTrigger>
                        <SelectContent>
                          {districtsNepali.map((district) => (
                            <SelectItem key={district} value={district}>
                              {district}
                            </SelectItem>
                          ))}
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

                  {/* Permanent Address*/}
                  <h1 className="form-section-title">Permanent Address</h1>
                  <div className="form-section-content-container">
                    <div className="form-section-content">
                      <Label htmlFor="province">Province</Label>
                      <Input
                        id="province"
                        value={guarantorDetails.province}
                        onChange={handleChange}
                        placeholder="Enter grandfather's name"
                      />
                      {errors.province && (
                        <p className="text-red-600 text-sm">
                          {errors.province}
                        </p>
                      )}
                    </div>

                    <div className="form-section-content">
                      <Label htmlFor="district">District</Label>
                      <Input
                        id="district"
                        value={guarantorDetails.district}
                        onChange={handleChange}
                        placeholder="Enter father's name"
                      />
                      {errors.district && (
                        <p className="text-red-600 text-sm">
                          {errors.district}
                        </p>
                      )}
                    </div>

                    <div className="form-section-content">
                      <Label htmlFor="vdc__municipality">
                        VDC/Municipality
                      </Label>
                      <Input
                        id="vdc__municipality"
                        value={guarantorDetails.vdc__municipality}
                        onChange={handleChange}
                        placeholder="Enter mother's name"
                      />
                      {errors.vdc__municipality && (
                        <p className="text-red-600 text-sm">
                          {errors.vdc__municipality}
                        </p>
                      )}
                    </div>

                    <div className="form-section-content">
                      <Label htmlFor="ward_no">Ward No.</Label>
                      <Input
                        id="ward_no"
                        value={guarantorDetails.ward_no}
                        onChange={handleChange}
                        placeholder="Enter spouse's name (if applicable)"
                      />
                      {errors.ward_no && (
                        <p className="text-red-600 text-sm">{errors.ward_no}</p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit">{editingId ? "Update" : "Submit"}</Button>
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
