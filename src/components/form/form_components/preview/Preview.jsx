import { Card } from "@/components/ui/card";
import React from "react";

const Preview = ({ data }) => {
  // Grouped Sections for better readability
  const sections = [
    {
      title: "General Information",
      fields: [
        { key: "custom_customer_name", label: "Customer Name" },
        { key: "custom_contact_no", label: "Contact No." },
        { key: "custom_email", label: "Email" },
        { key: "account_number", label: "Account Number" },
        { key: "customer_client_code", label: "Client Code" },
      ],
    },
    {
      title: "Citizenship Details",
      fields: [
        { key: "citizenship_number", label: "Citizenship Number" },
        { key: "citizenship_issued_date", label: "Issued Date" },
        { key: "citizenship_issued_district", label: "Issued District" },
        { key: "pan_number", label: "PAN Number" },
        { key: "pan_registration_date", label: "PAN Registration Date" },
      ],
    },
  ];

  // Table fields (show only important ones)
  const tableData = [
    { key: "table_ngjk", title: "Guarantor Details", fields: ["guarantor_name", "email", "phone"] },
    { key: "table_lfoa", title: "Loan Facility Details", fields: ["loan_type", "amount", "tenure"] },
  ];

//   return (
//     <div className="form-section  p-8 bg-white rounded-lg shadow-2xl space-y-8 animate-fadeIn">
//       <h2 className="text-3xl font-semibold text-gray-800 text-center">Customer Overview</h2>

//       {/* Sections */}
//       {sections.map(({ title, fields }) => (
//         <div key={title} className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition duration-300">
//           <h3 className="text-xl font-bold text-gray-700 mb-4">{title}</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {fields.map(({ key, label }) => (
//               <div key={key} className="group">
//                 <p className="text-sm font-medium text-gray-500">{label}</p>
//                 <p className="text-lg text-gray-800 font-semibold group-hover:text-blue-600 transition duration-300">
//                   {retailLoanData[key] || "N/A"}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}

//       {/* Tables */}
//       {tableData.map(({ key, title, fields }) => {
//         const tableContent = retailLoanData[key];
//         if (!Array.isArray(tableContent) || tableContent.length === 0) return null;

//         return (
//           <div key={key} className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition duration-300">
//             <h3 className="text-xl font-bold text-gray-700 mb-4">{title}</h3>
//             <div className="overflow-x-auto">
//               <table className="w-full border-collapse border border-gray-300">
//                 <thead>
//                   <tr className="bg-gray-200">
//                     {fields.map((colKey) => (
//                       <th key={colKey} className="px-4 py-2 text-left border border-gray-300">
//                         {colKey.replace(/_/g, " ")}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {tableContent.map((row, rowIndex) => (
//                     <tr key={rowIndex} className="border border-gray-300 hover:bg-blue-50 transition duration-300">
//                       {fields.map((colKey, cellIndex) => (
//                         <td key={cellIndex} className="px-4 py-2 border border-gray-300">
//                           {row[colKey] || "N/A"}
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );

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
      {data.table_lfoa && <DataTable title="Loan Facilities" data={data.table_lfoa} fields={data.table_lfoa.length > 0 ? Object.keys(data.table_lfoa[0]) : []} />}

      {/* Property Table */}
      {data.table_drge && <DataTable title="Property Information" data={data.table_drge} fields={data.table_drge.length > 0 ? Object.keys(data.table_drge[0]) : []} />}
    </div>
  );

};

const InfoField = ({ label, value }) => (
    <div className="bg-gray-50 p-3 rounded-lg shadow-sm hover:bg-gray-100 transition">
      <p className="text-gray-600 text-sm">{label}</p>
      <p className="text-black font-semibold">{value || "N/A"}</p>
    </div>
  );
  
  const DataTable = ({ title, data, fields }) => (
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
  );

export default Preview;
