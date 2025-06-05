// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { getAdminById, updateAdmin } from "../../Services/Admin"; // <-- Your API service
// import { message } from "antd";

// const EditAdmin = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     Name: "",
//     EmailID: "",
//     MobileNumber: ""
//   });

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchAdmin = async () => {
//       setLoading(true);
//       try {
//         const res = await getAdminById(id);
//         const data = res?.data || res;

//         setFormData({
//           Name: data?.Name || "",
//           EmailID: data?.EmailID || "",
//           MobileNumber: data?.MobileNumber || ""
//         });
//       } catch (err) {
//         console.error("Failed to load admin data", err);
//         message.error("Unable to load admin data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAdmin();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true);
//     try {
//       await updateAdmin(id, formData);
//       message.success("Admin updated successfully!");
//       navigate("/Admins");
//     } catch (err) {
//       console.error("Update failed", err);
//       message.error("Failed to update admin.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="container mx-auto p-6 max-w-lg">
//       <button onClick={() => navigate("/Admins")} className="mb-4 text-blue-600 hover:underline">
//         ← Back to Admins
//       </button>
//       <h1 className="text-2xl font-bold mb-6">Edit Admin ID: {id}</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-medium mb-1" htmlFor="Name">Name</label>
//           <input
//             id="Name"
//             name="Name"
//             type="text"
//             value={formData.Name}
//             onChange={handleChange}
//             required
//             className="input input-bordered w-full"
//             placeholder="Admin Name"
//           />
//         </div>

//         <div>
//           <label className="block font-medium mb-1" htmlFor="EmailID">Email ID</label>
//           <input
//             id="EmailID"
//             name="EmailID"
//             type="email"
//             value={formData.EmailID}
//             onChange={handleChange}
//             required
//             className="input input-bordered w-full"
//             placeholder="Email Address"
//           />
//         </div>

//         <div>
//           <label className="block font-medium mb-1" htmlFor="MobileNumber">Mobile Number</label>
//           <input
//             id="MobileNumber"
//             name="MobileNumber"
//             type="tel"
//             value={formData.MobileNumber}
//             onChange={handleChange}
//             required
//             pattern="\d{10}"
//             title="Enter a valid 10-digit phone number"
//             className="input input-bordered w-full"
//             placeholder="10-digit Mobile Number"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
//         >
//           {loading ? "Saving..." : "Save Changes"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditAdmin;
