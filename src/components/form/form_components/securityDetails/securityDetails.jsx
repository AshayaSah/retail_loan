import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form"; // Import useForm
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
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
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
import { districtsNepali, provinceData } from "../provincedetails";

export function SecurityDetails({
  retailLoanData,
  setValue,
  onNextStep,
  currentStep,
  totalSteps,
  formState,
}) {
  const [securities, setSecurities] = useState(
    Array.isArray(retailLoanData.table_drge) ? retailLoanData.table_drge : []
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isFormComplete, setIsFormComplete] = useState(false);

  // const securitySchema = z.object({
  //   // Required fields
  //   property: z.string().min(1, "Property selection is required"),
  //   name_of_owner: z.string().min(1, "Owner name is required"),
  //   area: z.coerce.number().positive("Area must be a positive number"),
  //   location_of_property: z.string().min(1, "Location is required"),
  //   province: z.string().min(1, "Province is required"),
  //   district: z.string().min(1, "District is required"),

  //   // Optional fields
  //   vdcmunicipality: z.string().optional().or(z.literal("")),
  //   ward_no: z.coerce.number().nonnegative().optional(),
  //   placestreet_name: z.string().optional().or(z.literal("")),
  //   plot_no: z.string().optional().or(z.literal("")),
  //   land_revenue_office: z.string().optional().or(z.literal("")),
  //   shape_of_land: z.string().optional().or(z.literal("")),
  //   motorable_road_access: z.string().optional().or(z.literal("")),
  //   road_width: z.string().optional().or(z.literal("")),
  //   road_access_from: z.string().optional().or(z.literal("")),
  //   road_setbacks: z.string().optional().or(z.literal("")),
  //   river_setbacks: z.string().optional().or(z.literal("")),
  //   high_tension_setbacks: z.string().optional().or(z.literal("")),
  //   // Contact info (optional with validation)
  //   email: z
  //     .string()
  //     .email("Invalid email address")
  //     .optional()
  //     .or(z.literal("")),
  //   phone: z
  //     .string()
  //     .regex(/^[0-9]{10}$/, "Invalid phone number (10 digits)")
  //     .optional()
  //     .or(z.literal("")),
  // });

  // Initialize useForm

  // Zod schema with preprocess for numeric fields
  const securitySchema = z.object({
    property: z.string().min(1, "Property selection is required"),
    name_of_owner: z.string().min(1, "Owner name is required"),
    area: z.preprocess(
      (val) => (val === "" ? undefined : Number(val)),
      z.number().positive("Area must be a positive number")
    ),
    location_of_property: z.string().min(1, "Location is required"),
    province: z.string().min(1, "Province is required"),
    district: z.string().min(1, "District is required"),
    vdcmunicipality: z.string().optional().or(z.literal("")),
    ward_no: z
      .preprocess(
        (val) => (val === "" ? undefined : Number(val)),
        z.number().nonnegative("Ward number must be nonnegative")
      )
      .optional(),
    placestreet_name: z.string().optional().or(z.literal("")),
    plot_no: z.string().optional().or(z.literal("")),
    land_revenue_office: z.string().optional().or(z.literal("")),
    shape_of_land: z.string().optional().or(z.literal("")),
    motorable_road_access: z.string().optional().or(z.literal("")),
    road_width: z.string().optional().or(z.literal("")),
    road_access_from: z.string().optional().or(z.literal("")),
    road_setbacks: z.string().optional().or(z.literal("")),
    river_setbacks: z.string().optional().or(z.literal("")),
    high_tension_setbacks: z.string().optional().or(z.literal("")),
    email: z
      .string()
      .email("Invalid email address")
      .optional()
      .or(z.literal("")),
    phone: z
      .string()
      .regex(/^[0-9]{10}$/, "Invalid phone number (10 digits)")
      .optional()
      .or(z.literal("")),
  });

  const {
    data,
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
    setValue: setFormValue,
  } = useForm({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      name_of_owner: "",
      email: "",
      phone: "",
      property: "Land",
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
    },
  });

  // const watchDistrict = watch("district");
  console.log("data", data);
  useEffect(() => {
    setValue("table_drge", securities);
    // console.debug("Frappe", table_drge)
  }, [securities, setValue]);

  useEffect(() => {
    const hasErrors = Object.keys(errors).length > 0;
    setIsFormComplete(!hasErrors && securities.length > 0); // Ensure at least one security is added
  }, [errors, securities]);


  const addOrUpdateSecurity = (data) => {
    let updatedSecurities;
    if (editingId) {
      updatedSecurities = securities.map((security) =>
        security.id === editingId ? { ...data, id: editingId } : security
      );
    } else {
      updatedSecurities = [...securities, { ...data, id: Date.now() }];
    }

    setSecurities(updatedSecurities);
    reset();
    setIsFormOpen(false);
    setEditingId(null);
  };

  const editSecurity = (e, id) => {
    e.preventDefault();
    const securitiesToEdit = securities.find((security) => security.id === id);
    if (securitiesToEdit) {
      Object.entries(securitiesToEdit).forEach(([key, value]) => {
        setFormValue(key, value);
      });
      setEditingId(id);
      setIsFormOpen(true);
    }
  };

  const deleteSecurity = (id) => {
    const updatedSecurities = securities.filter(
      (security) => security.id !== id
    );
    setSecurities(updatedSecurities);
  };

  // // Updated Province/District/Municipality Handling
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [availableMunicipalities, setAvailableMunicipalities] = useState([]);
  // Reset dependent fields when province changes
  // Update province selection and reset dependent fields using form state
  const handleProvinceChange = (value) => {
    setFormValue("province", value);
    setFormValue("district", "");
    setFormValue("vdcmunicipality", "");
    const selectedProvince = provinceData.find((p) => p.province === value);
    setAvailableDistricts(selectedProvince?.districts || []);
    setAvailableMunicipalities([]);
  };

  // Update district selection and reset municipality
  const handleDistrictChange = (value) => {
    setFormValue("district", value);
    setFormValue("vdcmunicipality", "");
    const selectedDistrict = availableDistricts.find((d) => d.name === value);
    setAvailableMunicipalities(selectedDistrict?.municipalities || []);
  };

  // Update municipality selection
  const handleMunicipalityChange = (value) => {
    setFormValue("vdcmunicipality", value);
  };

  // Rebuild dependency chain when editing an entry
  useEffect(() => {
    if (isFormOpen && editingId) {
      const currentSecurity = securities.find((sec) => sec.id === editingId);
      if (currentSecurity) {
        const province = provinceData.find(
          (p) => p.province === currentSecurity.province
        );
        if (province) {
          setAvailableDistricts(province.districts);
          const district = province.districts.find(
            (d) => d.name === currentSecurity.district
          );
          setAvailableMunicipalities(district?.municipalities || []);
        }
      }
    }
  }, [isFormOpen, editingId, securities]);

  return (
    <Card className="form-section shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="form-section-title">Security Details</h1>
        <Button type="button" onClick={() => setIsFormOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Security
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px] font-bold">Name of Owner</TableHead>
            <TableHead className="w-[200px]">District</TableHead>
            <TableHead className="w-[100px]">Area (Sq.mt)</TableHead>
            <TableHead className="w-[100px]">Location</TableHead>
            <TableHead className="w-[100px]">Plot Number</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {securities.map((security) => (
            <TableRow key={security.id}>
              <TableCell>{security.name_of_owner}</TableCell>
              <TableCell>{security.district}</TableCell>
              <TableCell>{security.area}</TableCell>
              <TableCell>{security.location_of_property}</TableCell>
              <TableCell>{security.plot_no}</TableCell>
              <TableCell className="flex gap-3">
                <Button
                  variant="ghost"
                  onClick={(e) => editSecurity(e, security.id)}
                  className="p-2 hover:bg-blue-100"
                >
                  <Edit2 className="h-4 w-4 text-blue-500" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => deleteSecurity(security.id)}
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
            <DialogTitle>Add Realstate Security</DialogTitle>
            <DialogDescription className="hidden">
              Please fill in the Security details below.
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-4">
            <h1 className="form-section-title">Property Details</h1>
            <div className="form-section-content-container-three">
              {/* Property */}
              <div className="form-section-content">
                <Label htmlFor="property">Property</Label>
                <Controller
                  name="property"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Land">Land</SelectItem>
                        <SelectItem value="Land and Building">
                          Land and Building
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.property && (
                  <p className="text-red-600 text-sm">
                    {errors.property.message}
                  </p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="name_of_owner">Name of Owner</Label>
                <Input
                  id="name_of_owner"
                  {...register("name_of_owner")} // Register input with validation
                  placeholder="Enter owner's full name"
                />
                {errors.name_of_owner && (
                  <p className="text-red-600 text-sm">
                    {errors.name_of_owner.message}
                  </p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="area">Area (Sq.mt)</Label>
                <Input
                  id="area"
                  type="number"
                  min="0"
                  {...register("area")} // Register input with validation
                  placeholder="Enter area in square meters"
                />
                {errors.area && (
                  <p className="text-red-600 text-sm">{errors.area.message}</p>
                )}
              </div>

              {/* Location of Property */}
              <div className="form-section-content">
                <Label htmlFor="location_of_property">Location</Label>
                <Controller
                  name="location_of_property"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Enter location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NA">NA</SelectItem>
                        <SelectItem value="Metropolitan">
                          Metropolitan
                        </SelectItem>
                        <SelectItem value="Sub-Metropolitan">
                          Sub-Metropolitan
                        </SelectItem>
                        <SelectItem value="Municipality">
                          Municipality
                        </SelectItem>
                        <SelectItem value="Village">Village</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.location_of_property && (
                  <p className="text-red-600 text-sm">
                    {errors.location_of_property.message}
                  </p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="province">Province</Label>
                <Controller
                  name="province"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="province"
                      value={field.value}
                      onValueChange={handleProvinceChange}
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
                {errors.province && (
                  <p className="text-red-600 text-sm">
                    {errors.province.message}
                  </p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="district">District</Label>
                <Controller
                  name="district"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="district"
                      value={field.value}
                      disabled={!watch("province")} // Disable if province is not selected
                      onValueChange={handleDistrictChange}
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
                {errors.district && (
                  <p className="text-red-600 text-sm">
                    {errors.district.message}
                  </p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="vdc__municipality">VDC/Municipality</Label>
                <Controller
                  name="vdc__municipality"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="vdc__municipality"
                      value={field.value}
                      disabled={!watch("district")} // Disable if district is not selected
                      onValueChange={handleMunicipalityChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your municipality" />
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
                {errors.vdcmunicipality && (
                  <p className="text-red-600 text-sm">
                    {errors.vdcmunicipality.message}
                  </p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="ward_no">Ward No</Label>
                <Input
                  id="ward_no"
                  {...register("ward_no")} // Register input
                  placeholder="Enter ward number"
                  min="0"
                />
                {errors.ward_no && (
                  <p className="text-red-600 text-sm">
                    {errors.ward_no.message}
                  </p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="placestreet_name">Place (Street Name)</Label>
                <Input
                  id="placestreet_name"
                  {...register("placestreet_name")} // Register input
                  placeholder="Enter street name"
                />
                {errors.placestreet_name && (
                  <p className="text-red-600 text-sm">
                    {errors.placestreet_name.message}
                  </p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="plot_no">Plot No</Label>
                <Input
                  id="plot_no"
                  {...register("plot_no")} // Register input
                  placeholder="Enter plot number"
                />
                {errors.plot_no && (
                  <p className="text-red-600 text-sm">
                    {errors.plot_no.message}
                  </p>
                )}
              </div>

              {/* Land Revenue Office */}
              <div className="form-section-content">
                <Label htmlFor="land_revenue_office">Land Revenue Office</Label>
                <Controller
                  name="land_revenue_office"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Land Revenue Office" />
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
                {errors.land_revenue_office && (
                  <p className="text-red-600 text-sm">
                    {errors.land_revenue_office.message}
                  </p>
                )}
              </div>
            </div>

            <h1 className="form-section-title mt-6">Description of the Land</h1>
            <div className="form-section-content-container-three">
              {/* Shape of Land */}
              <div className="form-section-content">
                <Label htmlFor="shape_of_land">Shape of Land</Label>
                <Controller
                  name="shape_of_land"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Enter shape of land" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Square">Square</SelectItem>
                        <SelectItem value="Rectangular">Rectangular</SelectItem>
                        <SelectItem value="Triangular">Triangular</SelectItem>
                        <SelectItem value="Irregular">Irregular</SelectItem>
                        <SelectItem value="Vertical slope">
                          Vertical slope
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.shape_of_land && (
                  <p className="text-red-600 text-sm">
                    {errors.shape_of_land.message}
                  </p>
                )}
              </div>

              {/* Motorable Road Access */}
              <div className="form-section-content">
                <Label htmlFor="motorable_road_access">
                  Motorable Road Access
                </Label>
                <Controller
                  name="motorable_road_access"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Yes">Yes</SelectItem>
                        <SelectItem value="No">No</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.motorable_road_access && (
                  <p className="text-red-600 text-sm">
                    {errors.motorable_road_access.message}
                  </p>
                )}
              </div>

              {/* Road Width */}
              <div className="form-section-content">
                <Label htmlFor="road_width">Road Width</Label>
                <Controller
                  name="road_width"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Enter road width" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NA">NA</SelectItem>
                        <SelectItem value="More than 20 feet">
                          More than 20 feet
                        </SelectItem>
                        <SelectItem value="More than 13 feet up to 20 feet">
                          More than 13 feet up to 20 feet
                        </SelectItem>
                        <SelectItem value="More than 10 feet upto 13 feet">
                          More than 10 feet upto 13 feet
                        </SelectItem>
                        <SelectItem value="From 8 feet upto 10 feet">
                          From 8 feet upto 10 feet
                        </SelectItem>
                        <SelectItem value="Less than 8 feet">
                          Less than 8 feet
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.road_width && (
                  <p className="text-red-600 text-sm">
                    {errors.road_width.message}
                  </p>
                )}
              </div>

              {/* Road Access From */}
              <div className="form-section-content">
                <Label htmlFor="road_access_from">Road Access From</Label>
                <Controller
                  name="road_access_from"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Enter access point" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NA">NA</SelectItem>
                        <SelectItem value="Black Topped">
                          Black Topped
                        </SelectItem>
                        <SelectItem value="Graveled">Graveled</SelectItem>
                        <SelectItem value="Earthen">Earthen</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.road_access_from && (
                  <p className="text-red-600 text-sm">
                    {errors.road_access_from.message}
                  </p>
                )}
              </div>

              {/* Road Setbacks */}
              <div className="form-section-content">
                <Label htmlFor="road_setbacks">Any Road Setbacks?</Label>
                <Controller
                  name="road_setbacks"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
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
                {errors.road_setbacks && (
                  <p className="text-red-600 text-sm">
                    {errors.road_setbacks.message}
                  </p>
                )}
              </div>

              {/* River Setbacks */}
              <div className="form-section-content">
                <Label htmlFor="river_setbacks">
                  Any River/Canal Setbacks?
                </Label>
                <Controller
                  name="river_setbacks"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
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
                {errors.river_setbacks && (
                  <p className="text-red-600 text-sm">
                    {errors.river_setbacks.message}
                  </p>
                )}
              </div>

              {/* High Tension Setbacks */}
              <div className="form-section-content">
                <Label htmlFor="high_tension_setbacks">
                  Any High Tension Setbacks?
                </Label>
                <Controller
                  name="high_tension_setbacks"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
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
                {errors.high_tension_setbacks && (
                  <p className="text-red-600 text-sm">
                    {errors.high_tension_setbacks.message}
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
              <Button type="button" onClick={handleSubmit(addOrUpdateSecurity)}>
                {editingId ? "Update" : "Submit"}
              </Button>
            </DialogFooter>
          </form>
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
