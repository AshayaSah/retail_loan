import { Card } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import React from "react";


const Preview = ({ data }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Preview</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Preview </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 max-h-[70vh] overflow-auto">
          <Section title="General Information">
            <InfoField label="Client Type" value={data.custom_client_type} />
            <InfoField label="Full Name" value={data.custom_customer_name} />
            <InfoField label="Contact No" value={data.custom_contact_no} />
            <InfoField label="Email" value={data.custom_email} />
            <InfoField label="Account No" value={data.account_number} />
          </Section>

          <Section title="Citizenship & PAN Details">
            <InfoField label="Citizenship No" value={data.citizenship_number} />
            <InfoField label="Issued Date" value={data.citizenship_issued_date} />
            <InfoField label="Issued District" value={data.citizenship_issued_district} />
            <InfoField label="PAN Number" value={data.pan_number} />
            <InfoField label="PAN Registration Date" value={data.pan_registration_date} />
            <InfoField label="PAN Registration District" value={data.pan_registration_district} />
          </Section>
          <Section title="Family Information">
            <InfoField label="Father's Name" value={data.fathers_name} />
            <InfoField label="Grandfather's Name" value={data.grandfathers_name} />
            <InfoField label="Mother's Name" value={data.mothers_name} />
            <InfoField label="Spouse's Name" value={data.spouse_name} />
            <InfoField label="Number of Offsprings" value={data.offsprings} />
          </Section>
          <Section title="Permanent Address">
            <InfoField label="Province" value={data.province} />
            <InfoField label="District" value={data.district} />
            <InfoField label="VDC/Municipality" value={data.vdc_municipality} />
            <InfoField label="Ward No" value={data.ward_no} />
          </Section>
          <Section title="Current Address">
            <InfoField label="Province" value={data.current_province} />
            <InfoField label="District" value={data.current_district} />
            <InfoField label="VDC/Municipality" value={data.current_vdc_municipality} />
            <InfoField label="Ward No" value={data.current_ward_no} />
          </Section>

          {data.table_ngjk && <DataTable title="Guarantor Information" data={data.table_ngjk} />}
          {data.table_lfoa && <DataTable title="Facilities Details" data={data.table_lfoa} />}
          {data.table_drge && <DataTable title="Security Information Details" data={data.table_drge} />}
        </div>
        <DialogClose asChild>
          <Button>Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

const Section = ({ title, children }) => (
  <Card className="p-4 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">{children}</div>
  </Card>
);

const InfoField = ({ label, value }) => (
  <div className="bg-gray-50 p-3 rounded-lg shadow-sm hover:bg-gray-100 transition">
    <p className="text-gray-600 text-sm">{label}</p>
    <p className="text-black font-semibold">{value || "N/A"}</p>
  </div>
);

const DataTable = ({ title, data }) => {
  const fields = data.length > 0 ? Object.keys(data[0]).filter(field => field !== "id") : [];
  return (
    <section className="w-full overflow-x-auto bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            {fields.map((field, idx) => (
              <th key={idx} className="border border-gray-200 p-2 text-left">
                {field.replace(/_/g, " ").replace(/^./, char => char.toUpperCase())}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-gray-50 transition">
              {fields.map((field, colIdx) => (
                <td key={colIdx} className="border border-gray-200 p-2">
                  {item[field] || "N/A"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Preview;
