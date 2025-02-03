import { useEffect, useState } from "react";
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
import { PlusCircle, Search, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { use } from "react";

export function SecurityDetails({
  retailLoanData,
  setValue,
  stepper,
  handleStepper,
}) {
  const [securities, setSecurities] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState({});
  const [securityDetails, setSecurityDetails] = useState({
    name_of_owner: "",
    email: "",
    phone: "",
    property: "",
    data_rqrw: "",
    location_of_property: "",
    province: "",
    district: "",
    vdcmunicipality: "",
    ward_no: "",
    placestreet_name: "",
    plot_no: "",
    land_revenue_office: "",
    shape_of_land: "",
    motoorable_road_access: "",
    road_width: "",
    road_access_from: "",
    road_setbacks: "",
    river_setbacks: "",
    high_tension_setbacks: "",
  });

  useEffect(() => {
    console.log("Security Data: ", securityDetails);
  }, [securityDetails]);

  const addPerson = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Here");
      const newPerson = { ...securityDetails, id: Date.now() };
      setSecurities([...securities, newPerson]);

      if (!retailLoanData.table_drge) {
        setValue("table_drge", [newPerson]);
        setSecurityDetails({
          name_of_owner: "",
          email: "",
          phone: "",
          property: "",
          data_rqrw: "",
          location_of_property: "",
          province: "",
          district: "",
          vdcmunicipality: "",
          ward_no: "",
          placestreet_name: "",
          plot_no: "",
          land_revenue_office: "",
          shape_of_land: "",
          motoorable_road_access: "",
          road_width: "",
          road_access_from: "",
          road_setbacks: "",
          river_setbacks: "",
          high_tension_setbacks: "",
        });
        setIsFormOpen(false);
        return;
      }

      const updatedGuarantors = [...retailLoanData.table_drge, newPerson];
      setValue("table_drge", updatedGuarantors);

      // Clear form data and close the form after adding
      setSecurityDetails({
        name_of_owner: "",
        email: "",
        phone: "",
        property: "",
        data_rqrw: "",
        location_of_property: "",
        province: "",
        district: "",
        vdcmunicipality: "",
        ward_no: "",
        placestreet_name: "",
        plot_no: "",
        land_revenue_office: "",
        shape_of_land: "",
        motoorable_road_access: "",
        road_width: "",
        road_access_from: "",
        road_setbacks: "",
        river_setbacks: "",
        high_tension_setbacks: "",
      });
      setIsFormOpen(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSecurityDetails((prev) => ({ ...prev, [id]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!securityDetails.property) {
      newErrors.property = "Property is required.";
    }
    if (!securityDetails.location_of_property) {
      newErrors.location_of_property = "Location is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
        <Button
          type="button"
          onClick={() => setIsFormOpen(true)}
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Add Security
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
            <TableHead className="w-[200px]">Name of Owner</TableHead>
            <TableHead className="w-[200px]">District</TableHead>
            <TableHead className="w-[100px]">Total Value</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPeople.map((person) => (
            <TableRow key={person.id}>
              <TableCell className="font-medium">
                {person.name_of_owner}
              </TableCell>
              <TableCell>{person.district}</TableCell>
              <TableCell>{person.area}</TableCell>
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
          <form onSubmit={addPerson} className="space-y-4">
            <h1 className="form-section-title">Property Details</h1>

            <div className="grid grid-cols-3 gap-4">
              <div className="form-section-content">
                <Label htmlFor="property">Property</Label>
                <Select
                  id="property"
                  onValueChange={(value) =>
                    handleChange({
                      target: { id: "property", value },
                    })
                  }
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
                  <p className="text-red-600 text-sm">{errors.property}</p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="name_of_owner">Name of Owner</Label>
                <Input
                  id="name_of_owner"
                  value={securityDetails.name_of_owner}
                  onChange={handleChange}
                  placeholder="Enter owner's full name"
                />
                {errors.name_of_owner && (
                  <p className="text-red-600 text-sm">{errors.name_of_owner}</p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="data_rqrw">Area (Sq.mt)</Label>
                <Input
                  id="data_rqrw"
                  value={securityDetails.data_rqrw}
                  onChange={handleChange}
                  placeholder="Enter area in square meters"
                />
                {errors.data_rqrw && (
                  <p className="text-red-600 text-sm">{errors.data_rqrw}</p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="location_of_property">Location</Label>
                <Select
                  id="location_of_property"
                  onValueChange={(value) =>
                    handleChange({
                      target: { id: "location_of_property", value },
                    })
                  }
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
                    {errors.location_of_property}
                  </p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="province">Province</Label>
                <Input
                  id="province"
                  value={securityDetails.province}
                  onChange={handleChange}
                  placeholder="Enter province"
                />
                {errors.province && (
                  <p className="text-red-600 text-sm">{errors.province}</p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="district">District</Label>
                <Input
                  id="district"
                  value={securityDetails.district}
                  onChange={handleChange}
                  placeholder="Enter district"
                />
                {errors.district && (
                  <p className="text-red-600 text-sm">{errors.district}</p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="vdcmunicipality">VDC/Municipality</Label>
                <Input
                  id="vdcmunicipality"
                  value={securityDetails.vdcmunicipality}
                  onChange={handleChange}
                  placeholder="Enter VDC/Municipality"
                />
                {errors.vdcmunicipality && (
                  <p className="text-red-600 text-sm">
                    {errors.vdcmunicipality}
                  </p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="ward_no">Ward No</Label>
                <Input
                  id="ward_no"
                  value={securityDetails.ward_no}
                  onChange={handleChange}
                  placeholder="Enter ward number"
                />
                {errors.ward_no && (
                  <p className="text-red-600 text-sm">{errors.ward_no}</p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="placestreet_name">Place (Street Name)</Label>
                <Input
                  id="placestreet_name"
                  value={securityDetails.placestreet_name}
                  onChange={handleChange}
                  placeholder="Enter street name"
                />
                {errors.placestreet_name && (
                  <p className="text-red-600 text-sm">
                    {errors.placestreet_name}
                  </p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="plot_no">Plot No</Label>
                <Input
                  id="plot_no"
                  value={securityDetails.plot_no}
                  onChange={handleChange}
                  placeholder="Enter plot number"
                />
                {errors.plot_no && (
                  <p className="text-red-600 text-sm">{errors.plot_no}</p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="land_revenue_office">Land Revenue Office</Label>
                <Select
                  id="land_revenue_office"
                  onValueChange={(value) =>
                    handleChange({
                      target: { id: "land_revenue_office", value },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Accham">Accham</SelectItem>
                    <SelectItem value="Argakhanchi">Argakhanchi</SelectItem>
                    <SelectItem value="Baglung">Baglung</SelectItem>
                    <SelectItem value="Baitadi">Baitadi</SelectItem>
                    <SelectItem value="Bajhang">Bajhang</SelectItem>
                    <SelectItem value="Bajura">Bajura</SelectItem>
                    <SelectItem value="Balara">Balara</SelectItem>
                    <SelectItem value="Barathawa">Barathawa</SelectItem>
                    <SelectItem value="Bardibas">Bardibas</SelectItem>
                    <SelectItem value="Belauri">Belauri</SelectItem>
                    <SelectItem value="Belbari">Belbari</SelectItem>
                    <SelectItem value="Bhadrapur">Bhadrapur</SelectItem>
                    <SelectItem value="Bhaktapur">Bhaktapur</SelectItem>
                    <SelectItem value="Bhojpur">Bhojpur</SelectItem>
                    <SelectItem value="Biratnagar">Biratnagar</SelectItem>
                    <SelectItem value="Burtibang">Burtibang</SelectItem>
                    <SelectItem value="Butwal">Butwal</SelectItem>
                    <SelectItem value="Chabahil">Chabahil</SelectItem>
                    <SelectItem value="Chainpur">Chainpur</SelectItem>
                    <SelectItem value="Chanauli">Chanauli</SelectItem>
                    <SelectItem value="Chandranigahapur">Chandranigahapur</SelectItem>
                    <SelectItem value="Chandrauta">Chandrauta</SelectItem>
                    <SelectItem value="Chitwan">Chitwan</SelectItem>
                    <SelectItem value="Dadeldhura">Dadeldhura</SelectItem>
                    <SelectItem value="Dailekh">Dailekh</SelectItem>
                    <SelectItem value="Damak">Damak</SelectItem>
                    <SelectItem value="Darchula">Darchula</SelectItem>
                    <SelectItem value="Dhading">Dhading</SelectItem>
                    <SelectItem value="Dhalkebar">Dhalkebar</SelectItem>
                    <SelectItem value="Dhangadi">Dhangadi</SelectItem>
                    <SelectItem value="Dhankuta">Dhankuta</SelectItem>
                    <SelectItem value="Dharan">Dharan</SelectItem>
                    <SelectItem value="Diggala">Diggala</SelectItem>
                    <SelectItem value="Dillibazzar">Dillibazzar</SelectItem>
                    <SelectItem value="Dolakha">Dolakha</SelectItem>
                    <SelectItem value="Dolpa">Dolpa</SelectItem>
                    <SelectItem value="Doti">Doti</SelectItem>
                    <SelectItem value="Dullu">Dullu</SelectItem>
                    <SelectItem value="Gadsera">Gadsera</SelectItem>
                    <SelectItem value="Garudha">Garudha</SelectItem>
                    <SelectItem value="Gaur">Gaur</SelectItem>
                    <SelectItem value="Ghartigaun">Ghartigaun</SelectItem>
                    <SelectItem value="Ghorahi">Ghorahi</SelectItem>
                    <SelectItem value="Gorkha">Gorkha</SelectItem>
                    <SelectItem value="Gotikhel">Gotikhel</SelectItem>
                    <SelectItem value="Gulariya">Gulariya</SelectItem>
                    <SelectItem value="Gulmi">Gulmi</SelectItem>
                    <SelectItem value="Hariwon">Hariwon</SelectItem>
                    <SelectItem value="Humla">Humla</SelectItem>
                    <SelectItem value="Illam">Illam</SelectItem>
                    <SelectItem value="Inarwa">Inarwa</SelectItem>
                    <SelectItem value="Jajarkot">Jajarkot</SelectItem>
                    <SelectItem value="Jaleshwor">Jaleshwor</SelectItem>
                    <SelectItem value="Janakpur">Janakpur</SelectItem>
                    <SelectItem value="Jaspur">Jaspur</SelectItem>
                    <SelectItem value="Jhotabhairab">Jhotabhairab</SelectItem>
                    <SelectItem value="Jumla">Jumla</SelectItem>
                    <SelectItem value="Kalaiya">Kalaiya</SelectItem>
                    <SelectItem value="Kalanki">Kalanki</SelectItem>
                    <SelectItem value="Kalikot">Kalikot</SelectItem>
                    <SelectItem value="Kanchanpur">Kanchanpur</SelectItem>
                    <SelectItem value="Kapilbastu">Kapilbastu</SelectItem>
                    <SelectItem value="Kaski">Kaski</SelectItem>
                    <SelectItem value="Katari">Katari</SelectItem>
                    <SelectItem value="Kavrepalanchowk">Kavrepalanchowk</SelectItem>
                    <SelectItem value="Kawaswoti">Kawaswoti</SelectItem>
                    <SelectItem value="Khaireni">Khaireni</SelectItem>
                    <SelectItem value="Khandbari">Khandbari</SelectItem>
                    <SelectItem value="Khijifalate">Khijifalate</SelectItem>
                    <SelectItem value="Khotang">Khotang</SelectItem>
                    <SelectItem value="Khotang Bazar">Khotang Bazar</SelectItem>
                    <SelectItem value="Lagankhel">Lagankhel</SelectItem>
                    <SelectItem value="Lahan">Lahan</SelectItem>
                    <SelectItem value="Lamahi">Lamahi</SelectItem>
                    <SelectItem value="Lamjung">Lamjung</SelectItem>
                    <SelectItem value="Lekhnath">Lekhnath</SelectItem>
                    <SelectItem value="Madi">Madi</SelectItem>
                    <SelectItem value="Majhagawa">Majhagawa</SelectItem>
                    <SelectItem value="Majuwabazar">Majuwabazar</SelectItem>
                    <SelectItem value="Makawanpur">Makawanpur</SelectItem>
                    <SelectItem value="Malangawa">Malangawa</SelectItem>
                    <SelectItem value="Manamaiju">Manamaiju</SelectItem>
                    <SelectItem value="Manang">Manang</SelectItem>
                    <SelectItem value="Mangalbare">Mangalbare</SelectItem>
                    <SelectItem value="Maulapur">Maulapur</SelectItem>
                    <SelectItem value="Mehelakuna">Mehelakuna</SelectItem>
                    <SelectItem value="Mugu">Mugu</SelectItem>
                    <SelectItem value="Mustang">Mustang</SelectItem>
                    <SelectItem value="Myagdi">Myagdi</SelectItem>
                    <SelectItem value="Narainpur">Narainpur</SelectItem>
                    <SelectItem value="Nepalgunj">Nepalgunj</SelectItem>
                    <SelectItem value="Nuwakot">Nuwakot</SelectItem>
                    <SelectItem value="Okhaldhunga">Okhaldhunga</SelectItem>
                    <SelectItem value="Palpa">Palpa</SelectItem>
                    <SelectItem value="Panchthar">Panchthar</SelectItem>
                    <SelectItem value="Parasi">Parasi</SelectItem>
                    <SelectItem value="Parbat">Parbat</SelectItem>
                    <SelectItem value="Parsa">Parsa</SelectItem>
                    <SelectItem value="Pyuthan">Pyuthan</SelectItem>
                    <SelectItem value="Rajapur">Rajapur</SelectItem>
                    <SelectItem value="Rajbiraj">Rajbiraj</SelectItem>
                    <SelectItem value="Ramechhap">Ramechhap</SelectItem>
                    <SelectItem value="Rampur">Rampur</SelectItem>
                    <SelectItem value="Rangeli">Rangeli</SelectItem>
                    <SelectItem value="Rasuwa">Rasuwa</SelectItem>
                    <SelectItem value="Rolpa">Rolpa</SelectItem>
                    <SelectItem value="Rukum">Rukum</SelectItem>
                    <SelectItem value="Rukumkot">Rukumkot</SelectItem>
                    <SelectItem value="Rupandehi">Rupandehi</SelectItem>
                    <SelectItem value="Salyan">Salyan</SelectItem>
                    <SelectItem value="Sankhu">Sankhu</SelectItem>
                    <SelectItem value="Sankranti Bazzar">Sankranti Bazzar</SelectItem>
                    <SelectItem value="Shikharkot">Shikharkot</SelectItem>
                    <SelectItem value="Siddhibas">Siddhibas</SelectItem>
                    <SelectItem value="Simara">Simara</SelectItem>
                    <SelectItem value="Simaraungadh">Simaraungadh</SelectItem>
                    <SelectItem value="Sindhuli">Sindhuli</SelectItem>
                    <SelectItem value="Sindhupalchowk">Sindhupalchowk</SelectItem>
                    <SelectItem value="Siraha">Siraha</SelectItem>
                    <SelectItem value="Solukhumbu">Solukhumbu</SelectItem>
                    <SelectItem value="Sunsari">Sunsari</SelectItem>
                    <SelectItem value="Surkhet">Surkhet</SelectItem>
                    <SelectItem value="Syanja">Syanja</SelectItem>
                    <SelectItem value="Tanahu">Tanahu</SelectItem>
                    <SelectItem value="Taplejung">Taplejung</SelectItem>
                    <SelectItem value="Terathum">Terathum</SelectItem>
                    <SelectItem value="Tikapur">Tikapur</SelectItem>
                    <SelectItem value="Tokha">Tokha</SelectItem>
                    <SelectItem value="Tulsipur">Tulsipur</SelectItem>
                    <SelectItem value="Udayapur">Udayapur</SelectItem>
                    <SelectItem value="Waling">Waling</SelectItem>
                  </SelectContent>
                </Select>
                {errors.land_revenue_office && (
                  <p className="text-red-600 text-sm">
                    {errors.land_revenue_office}
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
                  onValueChange={(value) =>
                    handleChange({
                      target: { id: "shape_of_land", value },
                    })
                  }
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
                  <p className="text-red-600 text-sm">{errors.shape_of_land}</p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="road_access">Motorable Road Access</Label>
                <Select
                  id="motoorable_road_access"
                  onValueChange={(value) =>
                    handleChange({
                      target: { id: "motoorable_road_access", value },
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
                {errors.road_access && (
                  <p className="text-red-600 text-sm">{errors.road_access}</p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="road_width">Road Width</Label>
                <Select
                  id="road_width"
                  onValueChange={(value) =>
                    handleChange({
                      target: { id: "road_width", value },
                    })
                  }
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
                  <p className="text-red-600 text-sm">{errors.road_width}</p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="road_access_from">Road Access From</Label>
                <Select
                  id="road_access_from"
                  onValueChange={(value) =>
                    handleChange({
                      target: { id: "road_access_from", value },
                    })
                  }
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
                    {errors.road_access_from}
                  </p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="road_setbacks">Any Road Setbacks?</Label>
                <Select
                  id="road_setbacks"
                  onValueChange={(value) =>
                    handleChange({
                      target: { id: "road_setbacks", value },
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
                {errors.road_setbacks && (
                  <p className="text-red-600 text-sm">{errors.road_setbacks}</p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="river_setbacks">
                  Any River/Canal Setbacks?
                </Label>
                <Select
                  id="river_setbacks"
                  onValueChange={(value) =>
                    handleChange({
                      target: { id: "river_setbacks", value },
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
                {errors.river_setbacks && (
                  <p className="text-red-600 text-sm">
                    {errors.river_setbacks}
                  </p>
                )}
              </div>

              <div className="form-section-content">
                <Label htmlFor="high_tension_setbacks">
                  Any High Tension Setbacks?
                </Label>
                <Select
                  id="high_tension_setbacks"
                  onValueChange={(value) =>
                    handleChange({
                      target: { id: "river_setbacks", value },
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
                {errors.high_tension_setbacks && (
                  <p className="text-red-600 text-sm">
                    {errors.high_tension_setbacks}
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
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Next&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Button>
        </div>
      )}
    </Card>
  );
}
