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
        account_number: "",
        name_of_owner: "",
        email: "",
        phone: "",
        property: "",
        area: "",
        location: "",
        province: "",
        district: "",
        vdc: "",
        ward_no: "",
        place: "",
        plot_no: "",
        land_revenue_office: "",
        shape_of_land: "",
        road_access: "",
        road_width: "",
        road_access_from: "",
        road_setbacks: "",
        river_setbacks: "",
        high_tension_setbacks: "",
    });

    const addPerson = (e) => {
        e.preventDefault();

        if (validate()) {
            const newPerson = { ...securityDetails, id: Date.now() };
            setSecurities([...securities, newPerson]);

            if (!retailLoanData.securities) {
                setValue("securities", [newPerson]);
                setSecurityDetails({
                    account_number: "",
                    name_of_owner: "",
                    email: "",
                    phone: "",
                    property: "",
                    area: "",
                    location: "",
                    province: "",
                    district: "",
                    vdc: "",
                    ward_no: "",
                    place: "",
                    plot_no: "",
                    land_revenue_office: "",
                    shape_of_land: "",
                    road_access: "",
                    road_width: "",
                    road_access_from: "",
                    road_setbacks: "",
                    river_setbacks: "",
                    high_tension_setbacks: "",
                });
                setIsFormOpen(false);
                return;
            }

            const updatedGuarantors = [...retailLoanData.securities, newPerson];
            setValue("securities", updatedGuarantors);

            // Clear form data and close the form after adding
            setSecurityDetails({
                account_number: "",
                name_of_owner: "",
                email: "",
                phone: "",
                property: "",
                area: "",
                location: "",
                province: "",
                district: "",
                vdc: "",
                ward_no: "",
                place: "",
                plot_no: "",
                land_revenue_office: "",
                shape_of_land: "",
                road_access: "",
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

        if (!securityDetails.name_of_owner) {
            newErrors.name_of_owner = "Full name is required.";
        }
        if (!securityDetails.property) {
            newErrors.property = "Property is required.";
        }
        if (!securityDetails.location) {
            newErrors.location = "Location is required.";
        }
        if (!securityDetails.road_access) {
            newErrors.road_access = "Motorable Road Access is required.";
        }
        if (!securityDetails.road_width) {
            newErrors.road_width = "Road Width is required.";
        }
        if (!securityDetails.road_access_from) {
            newErrors.road_access_from = "Road Access From is required.";
        };

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
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
                <h1 className="text-2xl font-bold text-gray-800">Security Details</h1>
                <Button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-blue-500 hover:bg-blue-600"
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
                        <DialogTitle>Add Security</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={addPerson} className="space-y-4">
                        <h1 className="form-section-title">Property Details</h1>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="form-section-content">
                                <Label htmlFor="property">Property</Label>
                                <Input
                                    id="property"
                                    value={securityDetails.property}
                                    onChange={handleChange}
                                    placeholder="Enter property type"
                                />
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
                                <Label htmlFor="area">Area (Sq.mt)</Label>
                                <Input
                                    id="area"
                                    value={securityDetails.area}
                                    onChange={handleChange}
                                    placeholder="Enter area in square meters"
                                />
                                {errors.area && (
                                    <p className="text-red-600 text-sm">{errors.area}</p>
                                )}
                            </div>

                            <div className="form-section-content">
                                <Label htmlFor="location">Location</Label>
                                <Input
                                    id="location"
                                    value={securityDetails.location}
                                    onChange={handleChange}
                                    placeholder="Enter location"
                                />
                                {errors.location && (
                                    <p className="text-red-600 text-sm">{errors.location}</p>
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
                                <Label htmlFor="vdc">VDC/Municipality</Label>
                                <Input
                                    id="vdc"
                                    value={securityDetails.vdc}
                                    onChange={handleChange}
                                    placeholder="Enter VDC/Municipality"
                                />
                                {errors.vdc && (
                                    <p className="text-red-600 text-sm">{errors.vdc}</p>
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
                                <Label htmlFor="place">Place (Street Name)</Label>
                                <Input
                                    id="place"
                                    value={securityDetails.place}
                                    onChange={handleChange}
                                    placeholder="Enter street name"
                                />
                                {errors.place && (
                                    <p className="text-red-600 text-sm">{errors.place}</p>
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
                                <Input
                                    id="land_revenue_office"
                                    value={securityDetails.land_revenue_office}
                                    onChange={handleChange}
                                    placeholder="Enter land revenue office"
                                />
                                {errors.land_revenue_office && (
                                    <p className="text-red-600 text-sm">{errors.land_revenue_office}</p>
                                )}
                            </div>
                        </div>

                        <h1 className="form-section-title mt-6">Description of the Land</h1>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="form-section-content">
                                <Label htmlFor="shape_of_land">Shape of Land</Label>
                                <Input
                                    id="shape_of_land"
                                    value={securityDetails.shape_of_land}
                                    onChange={handleChange}
                                    placeholder="Enter shape of land"
                                />
                                {errors.shape_of_land && (
                                    <p className="text-red-600 text-sm">{errors.shape_of_land}</p>
                                )}
                            </div>

                            <div className="form-section-content">
                                <Label htmlFor="road_access">Motorable Road Access</Label>
                                <Input
                                    id="road_access"
                                    value={securityDetails.road_access}
                                    onChange={handleChange}
                                    placeholder="Yes/No"
                                />
                                {errors.road_access && (
                                    <p className="text-red-600 text-sm">{errors.road_access}</p>
                                )}
                            </div>

                            <div className="form-section-content">
                                <Label htmlFor="road_width">Road Width</Label>
                                <Input
                                    id="road_width"
                                    value={securityDetails.road_width}
                                    onChange={handleChange}
                                    placeholder="Enter road width"
                                />
                                {errors.road_width && (
                                    <p className="text-red-600 text-sm">{errors.road_width}</p>
                                )}
                            </div>

                            <div className="form-section-content">
                                <Label htmlFor="road_access_from">Road Access From</Label>
                                <Input
                                    id="road_access_from"
                                    value={securityDetails.road_access_from}
                                    onChange={handleChange}
                                    placeholder="Enter access point"
                                />
                                {errors.road_access_from && (
                                    <p className="text-red-600 text-sm">{errors.road_access_from}</p>
                                )}
                            </div>

                            <div className="form-section-content">
                                <Label htmlFor="road_setbacks">Any Road Setbacks?</Label>
                                <Input
                                    id="road_setbacks"
                                    value={securityDetails.road_setbacks}
                                    onChange={handleChange}
                                    placeholder="Yes/No"
                                />
                                {errors.road_setbacks && (
                                    <p className="text-red-600 text-sm">{errors.road_setbacks}</p>
                                )}
                            </div>

                            <div className="form-section-content">
                                <Label htmlFor="river_setbacks">Any River/Canal Setbacks?</Label>
                                <Input
                                    id="river_setbacks"
                                    value={securityDetails.river_setbacks}
                                    onChange={handleChange}
                                    placeholder="Yes/No"
                                />
                                {errors.river_setbacks && (
                                    <p className="text-red-600 text-sm">{errors.river_setbacks}</p>
                                )}
                            </div>

                            <div className="form-section-content">
                                <Label htmlFor="high_tension_setbacks">Any High Tension Setbacks?</Label>
                                <Input
                                    id="high_tension_setbacks"
                                    value={securityDetails.high_tension_setbacks}
                                    onChange={handleChange}
                                    placeholder="Yes/No"
                                />
                                {errors.high_tension_setbacks && (
                                    <p className="text-red-600 text-sm">{errors.high_tension_setbacks}</p>
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