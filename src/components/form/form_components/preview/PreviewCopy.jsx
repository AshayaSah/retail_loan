import { Card } from "@/components/ui/card";
import React from "react";

const Preview = ({ data }) => {
  // Grouped Sections for better readability
  // const sections = [
  //   {
  //     title: "General Information",
  //     fields: [
  //       { key: "custom_customer_name", label: "Customer Name" },
  //       { key: "custom_contact_no", label: "Contact No." },
  //       { key: "custom_email", label: "Email" },
  //       { key: "account_number", label: "Account Number" },
  //       { key: "customer_client_code", label: "Client Code" },
  //     ],
  //   },
  //   {
  //     title: "Citizenship Details",
  //     fields: [
  //       { key: "citizenship_number", label: "Citizenship Number" },
  //       { key: "citizenship_issued_date", label: "Issued Date" },
  //       { key: "citizenship_issued_district", label: "Issued District" },
  //       { key: "pan_number", label: "PAN Number" },
  //       { key: "pan_registration_date", label: "PAN Registration Date" },
  //     ],
  //   },
  // ];

  // // Table fields (show only important ones)
  // const tableData = [
  //   { key: "table_ngjk", title: "Guarantor Details", fields: ["guarantor_name", "email", "phone"] },
  //   { key: "table_lfoa", title: "Loan Facility Details", fields: ["loan_type", "amount", "tenure"] },
  //   { key: "table_drge", title: "Security Details", fields: ["loan_type", "amount", "tenure"] },
  // ];


return (
    <div className="form-section max-w-[90vw]">
      <h1 className="form-section-title mb-4">Preview</h1>

      {/* General Information */}
      <Card className=" p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-2">General Information</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <InfoField label="Client Type" value={data.custom_client_type} />
          <InfoField label="Full Name" value={data.custom_customer_name} />
          <InfoField label="Contact No" value={data.custom_contact_no} />
          <InfoField label="Email" value={data.custom_email} />
          <InfoField label="Account No" value={data.account_number} />
        </div>
      </Card>

      {/* Citizenship Details */}
      <Card className=" p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-2">Citizenship Details and Pan Details</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <InfoField label="Citizenship No" value={data.citizenship_number} />
          <InfoField label="Issued Date" value={data.citizenship_issued_date} />
          <InfoField label="Issued District" value={data.citizenship_issued_district} />
          <InfoField label="PAN Number" value={data.pan_number} />
          <InfoField label="PAN Registration Date" value={data.pan_registration_date} />
          <InfoField label="PAN Registration District" value={data.pan_registration_district} />
        </div>
      </Card>

      {/* Family Information */}
      <Card className=" p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-2">Family Information </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <InfoField label="Father's Name" value={data.fathers_name} />
          <InfoField label="Grandfather's Name" value={data.grandfathers_name} />
          <InfoField label="Mother's Name" value={data.mothers_name} />
          <InfoField label="Spouse's Name" value={data.spouse_name} />
          <InfoField label="Number of Offsprings" value={data.offsprings} />
        </div>
      </Card>

      {/* Permanent Address */}
      <Card className=" p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-2">Permanent Address</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <InfoField label="Province" value={data.province} />
          <InfoField label="District" value={data.district} />
          <InfoField label="VDC/Municipality" value={data.vdc_municipality} />
          <InfoField label="Ward No" value={data.ward_no} />
        </div>
      </Card>
     {/* Temporary Address */}
      <Card className=" p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-2">Current Address</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <InfoField label="Province" value={data.current_province} />
          <InfoField label="District" value={data.current_district} />
          <InfoField label="VDC/Municipality" value={data.current_vdc_municipality} />
          <InfoField label="Ward No" value={data.current_ward_no} />
        </div>
      </Card>

      {/* Guarantor Table */}
      {data.table_ngjk && <DataTable title="Guarantor Information" data={data.table_ngjk} fields={ data.table_ngjk.length > 0 ? Object.keys(data.table_ngjk[0]) : []} />}

      {/* Loan Facility Table */}
      {data.table_lfoa && <DataTable title="Loan Facilities Details" data={data.table_lfoa} fields={data.table_lfoa.length > 0 ? Object.keys(data.table_lfoa[0]) : []} />}

      {/* Security Table */}
      {data.table_drge && <DataTable title="Security Information Details" data={data.table_drge} fields={data.table_drge.length > 0 ? Object.keys(data.table_drge[0]) : []} />}
    </div>
  );

};

const InfoField = ({ label, value }) => (
    <div className="bg-gray-50 p-3 rounded-lg shadow-sm hover:bg-gray-100 transition">
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="text-black font-semibold">{value || "N/A"}</p>
    </div>
  );
  
  const DataTable = ({ title, data, fields }) => {
    fields = data.length > 0 ? Object.keys(data[0]).filter(field => field !== "id") : [];
  return (
    <section className="w-full overflow-x-auto bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              {fields.map((field, idx) => (
                <th key={idx} className="border border-gray-200 p-2 text-left">
                   {field.replace(/_/g, " ").replace(/^./, (char) => char.toUpperCase())}
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
      </div>
    </section>
  )};

export default Preview;
