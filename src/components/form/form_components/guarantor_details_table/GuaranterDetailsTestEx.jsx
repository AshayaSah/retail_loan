import React, { useState, useEffect } from "react";
import { useForm, Controller, useWatch } from "react-hook-form"; // Import useForm and Controller
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // Import your Select components
import { Input } from "@/components/ui/input"; // Import your Input components
import { Button } from "@/components/ui/button"; // Import your Button components
import { Card } from "@/components/ui/card"; // Import your Card components
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"; // Import your Dialog components
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"; // Import your Table components
import { PlusCircle, Edit2, Trash2 } from "lucide-react"; // Import your icons
import { provinceData, districtsNepali } from "../provincedetails";

export default function GuarantorDetailsTest({
  retailLoanData,
  setValue,
  stepper,
  handleStepper,
}) {
  const [guarantors, setGuarantors] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [citizenshipMinDate, setCitizenshipMinDate] = useState("");

  // Initialize useForm
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
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
    },
  });

  const data = useWatch({ control });

  const [activeProvince, setActiveProvince] = useState("");
  const [activeDistrict, setActiveDistrict] = useState("");
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [availableMunicipalities, setAvailableMunicipalities] = useState([]);

  const onProvinceChange = (value) => {
    setActiveProvince(value);
    const provinceDataFound = provinceData.find((p) => p.province === value);
    setAvailableDistricts(provinceDataFound ? provinceDataFound.districts : []);
    setActiveDistrict("");
    setAvailableMunicipalities([]);
  };

  const onDistrictChange = (value) => {
    setActiveDistrict(value);
    const districtDataFound = availableDistricts.find((d) => d.name === value);
    setAvailableMunicipalities(
      districtDataFound ? districtDataFound.municipalities : []
    );
  };

  const onMunicipalityChange = (value) => {
    setValue("vdc__municipality", value);
  };

  const handleFetch = () => {
    if (data.account_number == "13420002008" && data.phone == "9810126827") {
      setTimeout(() => {
        reset({
          ...data,
          account_number: "13420002008",
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

  const addPerson = (data) => {
    const newPerson = { ...data, id: Date.now() };
    const updatedGuarantors = [...guarantors, newPerson];
    setGuarantors(updatedGuarantors);
    setValue("table_ngjk", updatedGuarantors);
    reset(); // Reset the form fields
    setIsFormOpen(false);
  };

  const editPerson = (e, data) => {
    e.preventDefault();
    const updatedGuarantors = guarantors.map((person) =>
      person.id === editingId ? { ...data, id: editingId } : person
    );

    setGuarantors(updatedGuarantors);
    setValue("table_ngjk", updatedGuarantors);
    setEditingId(null);
    setIsFormOpen(false);
    reset(); // Reset the form fields
  };

  const handleEdit = (id) => {
    const guarantorToEdit = guarantors.find((person) => person.id === id);
    if (guarantorToEdit) {
      reset(guarantorToEdit); // Reset form with the selected guarantor's data
      setEditingId(id);
      setIsFormOpen(true);
    }
  };

  const deletePerson = (id) => {
    const updatedPeople = guarantors.filter((person) => person.id !== id);
    setGuarantors(updatedPeople);
    setValue("table_ngjk", updatedPeople);
  };

  const filteredPeople = guarantors.filter(
    (person) =>
      person.guarantor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="form-section shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="form-section-title">Guarantor Details</h1>
        <Button
          type="button"
          onClick={() => {
            setEditingId(null);
            reset(); // Clear form
            setIsFormOpen(true);
          }}
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add Guarantor
        </Button>
      </div>

      <div className="relative mb-4">
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
            onSubmit={handleSubmit(editingId ? editPerson : addPerson)}
            className="space-y-4"
          >
            <div className="form-section-content-container-single py-0">
              <h1 className="form-section-title">Guarantor Details</h1>
              <div className="form-section-content">
                <Label htmlFor="is_existing_customer">
                  Are you an Existing CAS Bank Customer?{" "}
                  <span className="text-red-600">*</span>
                </Label>
                <Controller
                  name="is_existing_customer"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="YES">YES</SelectItem>
                        <SelectItem value="NO">NO</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.is_existing_customer && (
                  <p className="text-red-600 text-sm">
                    {errors.is_existing_customer.message}
                  </p>
                )}
              </div>
              {data && data.is_existing_customer === "YES" && (
                <>
                  <div className="form-section-content-container">
                    {/* Account Number */}
                    <div className="form-section-content">
                      <Label htmlFor="account_number">Account Number</Label>
                      <Input
                        id="account_number"
                        {...register("account_number")} // Register input without validation
                        placeholder="Enter your account number"
                      />
                      {errors.account_number && (
                        <p className="text-red-600 text-sm">
                          {errors.account_number.message}
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="form-section-content">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register("phone")} // Register input without validation
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && (
                        <p className="text-red-600 text-sm">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div className="form-section-content">
                      <Button type="button" onClick={() => handleFetch()}>
                        Fetch Data
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Personal Information Section */}
            <h1 className="form-section-title">Personal Information</h1>
            <div className="form-section-content-container">
              {/* Guarantor Full Name */}
              <div className="form-section-content">
                <Label htmlFor="guarantor_name">Guarantor Full Name</Label>
                <Input
                  id="guarantor_name"
                  {...register("guarantor_name")} // Use register for input
                  placeholder="Enter your full name"
                />
                {errors.guarantor_name && (
                  <p className="text-red-600 text-sm">
                    {errors.guarantor_name.message}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div className="form-section-content">
                <Label htmlFor="date_of_birth">
                  Date of Birth <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="date_of_birth"
                  type="date"
                  {...register("date_of_birth")} // Use register for input
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
                  {...register("email")} // Use register for input
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Nationality */}
              <div className="form-section-content">
                <Label htmlFor="nationality">
                  Nationality <span className="text-red-600">*</span>
                </Label>
                <Input
                  id="nationality"
                  type="text"
                  defaultValue="Nepali" // Default value
                  {...register("nationality")} // Use register for input
                  disabled // Keep it disabled if needed
                />
                {errors.nationality && (
                  <p className="text-red-600 text-sm">
                    {errors.nationality.message}
                  </p>
                )}
              </div>
            </div>

            {/* Citizenship and PAN Information Section */}
            <h1 className="form-section-title">
              Citizenship and PAN Information
            </h1>
            <div className="form-section-content-container">
              {/* Citizenship Number */}
              <div className="form-section-content">
                <Label htmlFor="citizenship_number">Citizenship Number</Label>
                <Input
                  {...register("citizenship_number")}
                  type="number"
                  placeholder="Enter your citizenship number"
                />
              </div>

              {/* Citizenship Issued Date */}
              <div className="form-section-content">
                <Label htmlFor="citizenship_issued_date">
                  Citizenship Issued Date
                </Label>
                <Input {...register("citizenship_issued_date")} type="date" />
              </div>

              {/* Citizenship Issued District (Using Controller for Select) */}
              <div className="form-section-content">
                <Label htmlFor="citizenship_issued_district">
                  Citizenship Issued District
                </Label>
                <Controller
                  name="citizenship_issued_district"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Citizenship Issued District" />
                      </SelectTrigger>
                      <SelectContent>
                        {districtsNepali.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* PAN Number */}
              <div className="form-section-content">
                <Label htmlFor="pan_number">PAN Number</Label>
                <Input
                  {...register("pan_number")}
                  type="text"
                  placeholder="Enter your PAN number"
                />
              </div>

              {/* PAN Registration Date */}
              <div className="form-section-content">
                <Label htmlFor="pan_registration_date">PAN Issued Date</Label>
                <Input {...register("pan_registration_date")} type="date" />
              </div>

              {/* PAN Issued District (Using Controller for Select) */}
              <div className="form-section-content">
                <Label htmlFor="pan_registration_district">
                  PAN Issued District
                </Label>
                <Controller
                  name="pan_registration_district"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select PAN Issued District" />
                      </SelectTrigger>
                      <SelectContent>
                        {districtsNepali.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            {/* Family Details  */}
            <h1 className="form-section-title">Family Information</h1>
            <div className="form-section-content-container">
              {/* Grandfather's Name */}
              <div className="form-section-content">
                <Label htmlFor="grandfathers_name">Grandfather's Name</Label>
                <Input
                  {...register("grandfathers_name")}
                  placeholder="Enter grandfather's name"
                />
              </div>

              {/* Father's Name */}
              <div className="form-section-content">
                <Label htmlFor="fathers_name">Father's Name</Label>
                <Input
                  {...register("fathers_name")}
                  placeholder="Enter father's name"
                />
              </div>

              {/* Mother's Name */}
              <div className="form-section-content">
                <Label htmlFor="mother_name">Mother's Name</Label>
                <Input
                  {...register("mother_name")}
                  placeholder="Enter mother's name"
                />
              </div>

              {/* Spouse's Name */}
              <div className="form-section-content">
                <Label htmlFor="spouse_name">Spouse's Name</Label>
                <Input
                  {...register("spouse_name")}
                  placeholder="Enter spouse's name (if applicable)"
                />
              </div>

              {/* Number of Offsprings */}
              <div className="form-section-content">
                <Label htmlFor="offsprings">Number of Offsprings</Label>
                <Input
                  {...register("offsprings")}
                  type="number"
                  placeholder="Enter number of children"
                />
              </div>
            </div>

            {/* Permanent Address */}
            <h1 className="form-section-title">Permanent Address</h1>
            <div className="form-section-content-container">
              {/* Province */}
              <div className="form-section-content">
                <Label htmlFor="province">Province</Label>
                <Controller
                  name="province"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (onProvinceChange) {
                          onProvinceChange(value);
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Province" />
                      </SelectTrigger>
                      <SelectContent>
                        {provinceData.map((province) => (
                          <SelectItem
                            key={province.province}
                            value={province.province}
                          >
                            {province.province}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* District */}
              <div className="form-section-content">
                <Label htmlFor="district">District</Label>
                <Controller
                  name="district"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (onDistrictChange) onDistrictChange(value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your district" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableDistricts.map((district) => (
                          <SelectItem key={district.name} value={district.name}>
                            {district.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* VDC / Municipality  */}
              <div className="form-section-content">
                <Label htmlFor="vdc__municipality">VDC / Municipality</Label>
                <Controller
                  name="vdc__municipality"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      onValueChange={(value) => {
                        field.onChange(value);
                        if (onMunicipalityChange) onMunicipalityChange(value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your VDC/Municipality" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableMunicipalities.map((municipality) => (
                          <SelectItem key={municipality} value={municipality}>
                            {municipality}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Ward No. */}
              <div className="form-section-content">
                <Label htmlFor="ward_no">Ward No.</Label>
                <Input {...register("ward_no")} placeholder="Enter Ward No." />
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
              <Button
                type="button"
                onClick={handleSubmit(editingId ? editPerson : addPerson)}
              >
                {editingId ? "Update" : "Submit"}
              </Button>
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
