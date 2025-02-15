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
  DialogDescription,
} from "@/components/ui/dialog";
import { Edit2, PlusCircle, Search, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { provinceData, districtsNepali } from "../provincedetails";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

export default function GuarantorDetailsTest({
  retailLoanData,
  setValue,
  onNextStep,
  currentStep,
  totalSteps,
  formState,
}) {

  const guarantorSchema = z.object({
    is_existing_customer: z.enum(["YES", "NO"]),
    account_number: z.string().optional(),
    phone: z.string().optional(),
    guarantor_name: z.string().min(1, "Required"),
    email: z.string().email("Invalid email"),
    date_of_birth: z.string().min(1, "Required"),
    citizenship_number: z.string().optional(),
    citizenship_issued_date: z.string().optional(),
    citizenship_issued_district: z.string().optional(),
    pan_number: z.string().optional(),
    pan_registration_date: z.string().optional(),
    pan_registration_district: z.string().optional(),
    province: z.string().optional(),
    district: z.string().optional(),
    vdc__municipality: z.string().optional(),
    ward_no: z.string().optional(),
    grandfathers_name: z.string().optional(),
    fathers_name: z.string().optional(),
    mother_name: z.string().optional(),
    spouse_name: z.string().optional(),
    offsprings: z.string().optional(),
  });

  const [currentDate, setCurrentDate] = useState("");
  const [citizenshipMinDate, setCitizenshipMinDate] = useState("");
  const [isFormComplete, setIsFormComplete] = useState(false);


  const [guarantors, setGuarantors] = useState(
    Array.isArray(retailLoanData.table_ngjk) ? retailLoanData.table_ngjk : []
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [availableMunicipalities, setAvailableMunicipalities] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue: setFormValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(guarantorSchema),
    defaultValues: {
      is_existing_customer: "",
      account_number: "13420002008",
      phone: "9810126827",
    },
  });

  useEffect(() => {
    setValue("table_ngjk", guarantors);
    // console.debug("Frappe", table_ngjk)
  }, [guarantors, setValue]);

  const currentProvince = watch("province");
  const currentDistrict = watch("district");
  const isExistingCustomer = watch("is_existing_customer");

  useEffect(() => {
    if (currentProvince) {
      const selected = provinceData.find((p) => p.province === currentProvince);
      setAvailableDistricts(selected?.districts || []);
    }
  }, [currentProvince]);

  useEffect(() => {
    if (currentDistrict) {
      const selected = availableDistricts.find(
        (d) => d.name === currentDistrict
      );
      setAvailableMunicipalities(selected?.municipalities || []);
    }
  }, [currentDistrict]);

  const addOrUpdateGuarantors = (data) => {
    let UpdateGuarantors;
    if (editingId) {
      UpdateGuarantors = guarantors.map((security) =>
        security.id === editingId ? { ...data, id: editingId } : security
      );
    } else {
      UpdateGuarantors = [...guarantors, { ...data, id: Date.now() }];
    }

    setGuarantors(UpdateGuarantors);
    reset();
    setIsFormOpen(false);
    setEditingId(null);
  };

  const editGuarantors = (e, id) => {
    e.preventDefault();
    const guarantorToEdit = guarantors.find((guarantor) => guarantor.id === id);
    if (guarantorToEdit) {
      Object.entries(guarantorToEdit).forEach(([key, value]) => {
        setFormValue(key, value);
      });
      setEditingId(id);
      setIsFormOpen(true);
    }
  };

  const deleteGuarantors = (id) => {
    const UpdateGuarantors = guarantors.filter(
      (guarantor) => guarantor.id !== id
    );
    setGuarantors(UpdateGuarantors);
  };

  const filteredPeople = guarantors.filter(
    (person) =>
      person.guarantor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    reset();
    setIsFormOpen(false);
  };

  const handleFetch = () => {
    if (
      guarantors.account_number == "13420002008" &&
      guarantors.phone == "9810126827"
    ) {
      setTimeout(() => {
        setGuarantors({
          ...guarantors,
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

  useEffect(() => {
    // This will run when the date_of_birth changes
    const calculateMinCitizenshipDate = () => {
      const dob = guarantors.date_of_birth;
      const today = new Date(dob);

      if (!dob || isNaN(today.getTime())) return;

      // Add 16 years to the birthdate
      const minEligibleDate = new Date(today);
      minEligibleDate.setFullYear(today.getFullYear() + 16);

      // Format the date to YYYY-MM-DD and set it as the minimum allowed date for citizenship issuance
      setCitizenshipMinDate(minEligibleDate.toISOString().split("T")[0]);
    };

    calculateMinCitizenshipDate();
  }, [guarantors.date_of_birth]);

  useEffect(() => {
    const hasErrors = Object.keys(errors).length > 0;
    setIsFormComplete(!hasErrors && guarantors.length > 0); // Ensure at least one security is added
  }, [errors, guarantors]);

  return (
    <Card className="form-section shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="form-section-title">Guarantor Details</h1>
        <Button
          type="button"
          onClick={() => {
            setEditingId(null);
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
                  onClick={(e) => editGuarantors(e, person.id)}
                  className="p-2 hover:bg-blue-100"
                >
                  <Edit2 className="h-4 w-4 text-blue-500" />
                </Button>
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => deleteGuarantors(person.id)}
                  //  className="p-1 hover:scale-105 hover:bg-red-100"
                  className="flex items-center justify-center p-2 text-red-500 rounded-lg transition-transform transform hover:scale-105 hover:bg-red-100"
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
            <DialogTitle id="dialog-title">Add Guarantor</DialogTitle>
            <DialogDescription className="hidden">
              Please fill in the guarantor details below.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4">
            <div>
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
                      <Select
                        {...field}
                        onValueChange={(value) => {
                          field.onChange(value);
                          // if (value === "NO") {
                          //   setValue("account_number", "");
                          //   setValue("phone", "");
                          // }
                        }}
                      >
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
              </div>

              {watch("is_existing_customer") === "YES" && (
                <>
                  <div className="form-section-content-container">
                    <div className="form-section-content">
                      <Label htmlFor="account_number">
                        Account Number <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        {...register("account_number")}
                        placeholder="Enter your account number"
                      />
                      {errors.account_number && (
                        <p className="text-red-600 text-sm">
                          {errors.account_number.message}
                        </p>
                      )}
                    </div>

                    <div className="form-section-content">
                      <Label htmlFor="phone">
                        Phone Number <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        {...register("phone")}
                        type="tel"
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && (
                        <p className="text-red-600 text-sm">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div className="form-section-content">
                      <Button type="button" onClick={handleFetch}>
                        Fetch Data
                      </Button>
                    </div>
                  </div>

                  <h1 className="form-section-title">Personal Information</h1>
                  <div className="form-section-content-container">
                    <div className="form-section-content">
                      <Label htmlFor="guarantor_name">
                        Guarantor Full Name
                      </Label>
                      <Input
                        {...register("guarantor_name")}
                        placeholder="Enter your full name"
                      />
                      {errors.guarantor_name && (
                        <p className="text-red-600 text-sm">
                          {errors.guarantor_name.message}
                        </p>
                      )}
                    </div>

                    <div className="form-section-content">
                      <Label htmlFor="date_of_birth">
                        Date of Birth <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        {...register("date_of_birth")}
                        type="date"
                        max={(new Date().toISOString().split("T")[0]) + 16}
                        onChange={(e) => {
                          register("date_of_birth").onChange(e);
                          handleAgeCalculation(e);
                        }}
                      />
                      {errors.date_of_birth && (
                        <p className="text-red-600 text-sm">
                          {errors.date_of_birth.message}
                        </p>
                      )}
                    </div>

                    <div className="form-section-content">
                      <Label htmlFor="email">
                        Email Address <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        {...register("email")}
                        type="email"
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="text-red-600 text-sm">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="form-section-content">
                      <Label htmlFor="nationality">
                        Nationality <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        {...register("nationality")}
                        defaultValue="Nepali"
                        disabled
                      />
                    </div>
                  </div>

                  <h1 className="form-section-title">
                    Citizenship and PAN Information
                  </h1>
                  <div className="form-section-content-container">
                    <div className="form-section-content">
                      <Label htmlFor="citizenship_number">
                        Citizenship Number
                      </Label>
                      <Input
                        {...register("citizenship_number")}
                        placeholder="Enter your citizenship number"
                      />
                      {errors.citizenship_number && (
                        <p className="text-red-600 text-sm">
                          {errors.citizenship_number.message}
                        </p>
                      )}
                    </div>

                    <div className="form-section-content">
                      <Label htmlFor="citizenship_issued_date">
                        Citizenship Issued Date
                      </Label>
                      <Input
                        {...register("citizenship_issued_date")}
                        type="date"
                        min={citizenshipMinDate}
                        max={new Date().toISOString().split("T")[0]}
                      />
                    </div>

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
                              <SelectValue placeholder="Select district" />
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

                    <div className="form-section-content">
                      <Label htmlFor="pan_number">PAN Number</Label>
                      <Input
                        {...register("pan_number")}
                        placeholder="Enter your PAN number"
                        minLength="6"  
                      />
                    </div>

                    <div className="form-section-content">
                      <Label htmlFor="pan_registration_date">
                        PAN Issued Date
                      </Label>
                      <Input
                        {...register("pan_registration_date")}
                        type="date"
                      />
                    </div>

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
                              <SelectValue placeholder="Select district" />
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

                  <h1 className="form-section-title">Family Information</h1>
                  <div className="form-section-content-container">
                    <div className="form-section-content">
                      <Label htmlFor="grandfathers_name">
                        Grandfather's Name
                      </Label>
                      <Input
                        {...register("grandfathers_name")}
                        placeholder="Enter grandfather's name"
                      />
                    </div>

                    <div className="form-section-content">
                      <Label htmlFor="fathers_name">Father's Name</Label>
                      <Input
                        {...register("fathers_name")}
                        placeholder="Enter father's name"
                      />
                    </div>

                    <div className="form-section-content">
                      <Label htmlFor="mother_name">Mother's Name</Label>
                      <Input
                        {...register("mother_name")}
                        placeholder="Enter mother's name"
                      />
                    </div>

                    <div className="form-section-content">
                      <Label htmlFor="spouse_name">Spouse's Name</Label>
                      <Input
                        {...register("spouse_name")}
                        placeholder="Enter spouse's name"
                      />
                    </div>

                    <div className="form-section-content">
                      <Label htmlFor="offsprings">Number of Offsprings</Label>
                      <Input
                        {...register("offsprings")}
                        type="number"
                        placeholder="Enter number of children"
                        min="0"
                      />
                    </div>
                  </div>

                  <h1 className="form-section-title">Permanent Address</h1>
                  <div className="form-section-content-container">
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
                              handleProvinceChange(value);
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
                              handleDistrictChange(value);
                            }}
                            disabled={!watch("province")}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select district" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableDistricts.map((district) => (
                                <SelectItem
                                  key={district.name}
                                  value={district.name}
                                >
                                  {district.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>

                    <div className="form-section-content">
                      <Label htmlFor="vdc__municipality">
                        VDC/Municipality
                      </Label>
                      <Controller
                        name="vdc__municipality"
                        control={control}
                        render={({ field }) => (
                          <Select
                            {...field}
                            onValueChange={field.onChange}
                            disabled={!watch("district")}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select municipality" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableMunicipalities.map((municipality) => (
                                <SelectItem
                                  key={municipality}
                                  value={municipality}
                                >
                                  {municipality}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>

                    <div className="form-section-content">
                      <Label htmlFor="ward_no">Ward No.</Label>
                      <Input
                        {...register("ward_no")}
                        placeholder="Enter Ward No."
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </form>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmit(addOrUpdateGuarantors)}>
              {editingId ? "Update" : "Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {currentStep < totalSteps - 1 && (
        <div className="flex justify-end mt-8">
          <Button
            type="button"
            onClick={onNextStep}
            disabled={!formState.isValid}
            className="px-8 py-4 text-lg"
          >
            Next →
          </Button>
        </div>
      )}
    </Card>
  );
}
