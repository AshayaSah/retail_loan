import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
} from "@/components/ui/dialog";
import { PlusCircle, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { districtsNepali } from "../provincedetails";

export function SecurityDetails({
  retailLoanData,
  setValue,
  stepper,
  handleStepper,
  handleSelectChange,
}) {
  const [securities, setSecurities] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Initialize useForm
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
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
    },
  });

  useEffect(() => {
    console.log("Securities Data: ", securities);
  }, [securities]);

  const addPerson = (data) => {
    const newPerson = { ...data, id: Date.now() };
    setSecurities((prev) => [...prev, newPerson]);

    if (!retailLoanData.table_drge) {
      setValue("table_drge", [newPerson]);
    } else {
      const updatedGuarantors = [...retailLoanData.table_drge, newPerson];
      setValue("table_drge", updatedGuarantors);
    }

    // Clear form data and close the form after adding
    reset();
    setIsFormOpen(false);
  };

  const deletePerson = (id) => {
    const updatedPeople = securities.filter((person) => person.id !== id);
    setSecurities(updatedPeople);
    setValue("securities", updatedPeople);
  };

  const filteredPeople = securities.filter(
    (person) =>
      person.name_of_owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          {filteredPeople.map((person) => (
            <TableRow key={person.id}>
              <TableCell>{person.name_of_owner}</TableCell>
              <TableCell>{person.district}</TableCell>
              <TableCell>{person.area}</TableCell>
              <TableCell>{person.location_of_property}</TableCell>
              <TableCell>{person.plot_no}</TableCell>
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
            <DialogTitle>Add Realstate Security</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(addPerson)} className="space-y-4">
            <h1 className="form-section-title">Property Details</h1>

            <div className="grid grid-cols-3 gap-4">
              <div className="form-section-content">
                <Label htmlFor="property">
                  Property <span className="text-red-600">*</span>
                </Label>
                <Select
                  id="property"
                  {...register("property", {
                    required: "Property is required.",
                  })} // Register input with validation
                  onValueChange={(value) => {
                    setValue("property", value);
                  }}
                >
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
                  {...register("area")} // Register input with validation
                  placeholder="Enter area in square meters"
                />
                {errors.area && (
                  <p className="text-red-600 text-sm">{errors.area.message}</p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="location_of_property">
                  Location <span className="text-red-600">*</span>
                </Label>
                <Select
                  id="location_of_property"
                  {...register("location_of_property")} // Register input with validation
                  onValueChange={(value) => {
                    setValue("location_of_property", value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Enter location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NA">NA</SelectItem>
                    <SelectItem value="Metropolitan">Metropolitan</SelectItem>
                    <SelectItem value="Sub-Metropolitan">
                      Sub-Metropolitan
                    </SelectItem>
                    <SelectItem value="Municipality">Municipality</SelectItem>
                    <SelectItem value="Village">Village</SelectItem>
                  </SelectContent>
                </Select>
                {errors.location_of_property && (
                  <p className="text-red-600 text-sm">
                    {errors.location_of_property.message}
                  </p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="province">Province</Label>
                <Input
                  id="province"
                  {...register("province")} // Register input
                  placeholder="Enter province"
                />
                {errors.province && (
                  <p className="text-red-600 text-sm">
                    {errors.province.message}
                  </p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="district">District</Label>
                <Input
                  id="district"
                  {...register("district")} // Register input
                  placeholder="Enter district"
                />
                {errors.district && (
                  <p className="text-red-600 text-sm">
                    {errors.district.message}
                  </p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="vdcmunicipality">VDC/Municipality</Label>
                <Input
                  id="vdcmunicipality"
                  {...register("vdcmunicipality")} // Register input
                  placeholder="Enter VDC/Municipality"
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

              <div className="form-section-content">
                <Label htmlFor="land_revenue_office">Land Revenue Office</Label>
                <Select
                  id="land_revenue_office"
                  {...register("land_revenue_office")} // Register input with validation
                  onValueChange={(value) => {
                    setValue("land_revenue_office", value);
                  }}
                >
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
                {errors.land_revenue_office && (
                  <p className="text-red-600 text-sm">
                    {errors.land_revenue_office.message}
                  </p>
                )}
              </div>
            </div>

            <h1 className="form-section-title mt-6">Description of the Land</h1>
            <div className="grid grid-cols-3 gap-4">
              <div className="form-section-content">
                <Label htmlFor="shape_of_land">Shape of Land</Label>
                <Select
                  id="shape_of_land"
                  {...register("shape_of_land")} // Register input with validation
                  onValueChange={(value) => {
                    setValue("shape_of_land", value);
                  }}
                >
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
                {errors.shape_of_land && (
                  <p className="text-red-600 text-sm">
                    {errors.shape_of_land.message}
                  </p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="motorable_road_access">
                  Motorable Road Access
                </Label>
                <Select
                  id="motorable_road_access"
                  {...register("motorable_road_access")} // Register input with validation
                  onValueChange={(value) => {
                    setValue("motorable_road_access", value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
                {errors.motorable_road_access && (
                  <p className="text-red-600 text-sm">
                    {errors.motorable_road_access.message}
                  </p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="road_width">Road Width</Label>
                <Select
                  id="road_width"
                  {...register("road_width")} // Register input with validation
                  onValueChange={(value) => {
                    setValue("road_width", value);
                  }}
                >
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
                {errors.road_width && (
                  <p className="text-red-600 text-sm">
                    {errors.road_width.message}
                  </p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="road_access_from">Road Access From</Label>
                <Select
                  id="road_access_from"
                  {...register("road_access_from")} // Register input with validation
                  onValueChange={(value) => {
                    setValue("road_access_from", value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Enter access point" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NA">NA</SelectItem>
                    <SelectItem value="Black Topped">Black Topped</SelectItem>
                    <SelectItem value="Graveled">Graveled</SelectItem>
                    <SelectItem value="Earthen">Earthen</SelectItem>
                  </SelectContent>
                </Select>
                {errors.road_access_from && (
                  <p className="text-red-600 text-sm">
                    {errors.road_access_from.message}
                  </p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="road_setbacks">Any Road Setbacks?</Label>
                <Select
                  id="road_setbacks"
                  {...register("road_setbacks")} // Register input with validation
                  onValueChange={(value) => {
                    setValue("road_setbacks", value);
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
                {errors.road_setbacks && (
                  <p className="text-red-600 text-sm">
                    {errors.road_setbacks.message}
                  </p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="river_setbacks">
                  Any River/Canal Setbacks?
                </Label>
                <Select
                  id="river_setbacks"
                  {...register("river_setbacks")} // Register input with validation
                  onValueChange={(value) => {
                    setValue("river_setbacks", value);
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
                {errors.river_setbacks && (
                  <p className="text-red-600 text-sm">
                    {errors.river_setbacks.message}
                  </p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="high_tension_setbacks">
                  Any High Tension Setbacks?
                </Label>
                <Select
                  id="high_tension_setbacks"
                  {...register("high_tension_setbacks")} // Register input with validation
                  onValueChange={(value) => {
                    setValue("high_tension_setbacks", value);
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
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {!stepper[3].state && (
        <div className="form-next-button">
          <Button type="button" onClick={() => handleStepper(3)}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Next&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Button>
        </div>
      )}
    </Card>
  );
}
