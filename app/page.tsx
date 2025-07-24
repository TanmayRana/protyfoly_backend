// "use client";
// import React, { useState } from "react";
// import { Upload, Save } from "lucide-react";
// import { ContactInfo, PersonalInfo } from "@/types";
// import Button from "@/util/Button";
// import Card from "@/util/Card";
// import ProgressBar from "@/util/ProgressBar";
// // import { PersonalInfo, ContactInfo } from "../../types";
// // import ProgressBar from "@/lib/ProgressBar";
// // import Card from "@/lib/Card";
// // import Button from "@/lib/Button";

// interface AdminProfileProps {
//   personalInfo: PersonalInfo;
//   contactInfo: ContactInfo;
//   onUpdatePersonal: (info: PersonalInfo) => void;
//   onUpdateContact: (info: ContactInfo) => void;
// }
// import {
//   personalInfo as initialPersonalInfo,
//   contactInfo as initialContactInfo,
// } from "@/data/portfolio";

// const AdminProfile = () => {
//   const [personalInfo, setPersonalInfo] = useState(initialPersonalInfo);
//   const [contactInfo, setContactInfo] = useState(initialContactInfo);
//   const [personalData, setPersonalData] = useState(personalInfo);
//   const [contactData, setContactData] = useState(contactInfo);

//   const onUpdatePersonal = () => {};
//   const onUpdateContact = () => {};

//   const handlePersonalSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onUpdatePersonal(personalData);
//   };

//   const handleContactSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onUpdateContact(contactData);
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       // In a real app, you would upload to ImageKit here
//       const imageUrl = URL.createObjectURL(file);
//       setPersonalData({ ...personalData, profileImage: imageUrl });
//     }
//   };

//   return (
//     <div className="space-y-6 lg:space-y-8">
//       <div>
//         <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
//           Profile Management
//         </h1>
//         <p className="text-gray-600">
//           Update your personal information and contact details
//         </p>
//       </div>

//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
//         {/* Personal Information */}
//         <Card className="p-4 lg:p-6 border" hover={false}>
//           <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-6">
//             Personal Information
//           </h2>

//           <form
//             onSubmit={handlePersonalSubmit}
//             className="space-y-4 lg:space-y-6"
//           >
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Profile Image
//               </label>
//               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//                 <img
//                   src={personalData?.profileImage}
//                   alt="Profile"
//                   className="w-16 h-16 rounded-full object-cover flex-shrink-0"
//                 />
//                 <div className="w-full sm:w-auto">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     className="hidden"
//                     id="profile-image"
//                   />
//                   <label
//                     htmlFor="profile-image"
//                     className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors duration-200 w-full sm:w-auto text-sm"
//                   >
//                     <Upload size={16} />
//                     Upload New Image
//                   </label>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 value={personalData?.name}
//                 onChange={(e) =>
//                   setPersonalData({ ...personalData, name: e.target.value })
//                 }
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm lg:text-base text-black"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Professional Title
//               </label>
//               <input
//                 type="text"
//                 value={personalData?.title}
//                 onChange={(e) =>
//                   setPersonalData({ ...personalData, title: e.target.value })
//                 }
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm lg:text-base text-black"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Tagline
//               </label>
//               <textarea
//                 value={personalData?.tagline}
//                 onChange={(e) =>
//                   setPersonalData({ ...personalData, tagline: e.target.value })
//                 }
//                 rows={3}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-sm lg:text-base text-black"
//               />
//             </div>

//             <Button type="submit" className="w-full sm:w-auto">
//               <Save size={16} />
//               Save Personal Info
//             </Button>
//           </form>
//         </Card>

//         {/* Contact Information */}
//         <Card className="p-4 lg:p-6 border" hover={false}>
//           <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-6">
//             Contact Information
//           </h2>

//           <form
//             onSubmit={handleContactSubmit}
//             className="space-y-4 lg:space-y-6"
//           >
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 value={contactData?.email}
//                 onChange={(e) =>
//                   setContactData({ ...contactData, email: e.target.value })
//                 }
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm lg:text-base text-black"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Phone Number
//               </label>
//               <input
//                 type="tel"
//                 value={contactData?.phone}
//                 onChange={(e) =>
//                   setContactData({ ...contactData, phone: e.target.value })
//                 }
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm lg:text-base text-black"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Location
//               </label>
//               <input
//                 type="text"
//                 value={contactData?.location}
//                 onChange={(e) =>
//                   setContactData({ ...contactData, location: e.target.value })
//                 }
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm lg:text-base text-black"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 GitHub URL
//               </label>
//               <input
//                 type="url"
//                 value={contactData?.github}
//                 onChange={(e) =>
//                   setContactData({ ...contactData, github: e.target.value })
//                 }
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm lg:text-base text-black"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 LinkedIn URL
//               </label>
//               <input
//                 type="url"
//                 value={contactData?.linkedin}
//                 onChange={(e) =>
//                   setContactData({ ...contactData, linkedin: e.target.value })
//                 }
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm lg:text-base text-black"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Twitter URL (Optional)
//               </label>
//               <input
//                 type="url"
//                 value={contactData?.twitter || ""}
//                 onChange={(e) =>
//                   setContactData({ ...contactData, twitter: e.target.value })
//                 }
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm lg:text-base text-black"
//               />
//             </div>

//             <Button type="submit" className="w-full sm:w-auto">
//               <Save size={16} />
//               Save Contact Info
//             </Button>
//           </form>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default AdminProfile;

// "use client";
// import React, { useState } from "react";
// import { Upload, Save } from "lucide-react";
// import { ContactInfo, PersonalInfo } from "@/types";
// import Button from "@/util/Button";
// import Card from "@/util/Card";
// import {
//   personalInfo as initialPersonalInfo,
//   contactInfo as initialContactInfo,
// } from "@/data/portfolio";

// const AdminProfile = () => {
//   const [personalData, setPersonalData] =
//     useState<PersonalInfo>(initialPersonalInfo);
//   const [contactData, setContactData] =
//     useState<ContactInfo>(initialContactInfo);

//   const onUpdatePersonal = (info: PersonalInfo) => {
//     setPersonalData(info);
//     // Optionally, call API here
//   };

//   const onUpdateContact = (info: ContactInfo) => {
//     setContactData(info);
//     // Optionally, call API here
//   };

//   const handlePersonalSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onUpdatePersonal(personalData);
//   };

//   const handleContactSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onUpdateContact(contactData);
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setPersonalData({ ...personalData, profileImage: imageUrl });
//     }
//   };

//   return (
//     <div className="space-y-6 lg:space-y-8">
//       <div>
//         <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
//           Profile Management
//         </h1>
//         <p className="text-gray-600">
//           Update your personal information and contact details
//         </p>
//       </div>

//       <div className="flex justify-between  gap-6 lg:gap-8">
//         {/* Personal Info */}
//         <div className="w-4xl">
//           <Card className="p-4 lg:p-6 border" hover={false}>
//             <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-6">
//               Personal Information
//             </h2>

//             <form
//               onSubmit={handlePersonalSubmit}
//               className="space-y-4 lg:space-y-6"
//             >
//               {/* Profile Image Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Profile Image
//                 </label>
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//                   <img
//                     src={personalData.profileImage || "/placeholder.jpg"}
//                     alt="Profile"
//                     className="w-16 h-16 rounded-full object-cover flex-shrink-0"
//                   />
//                   <div>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleImageUpload}
//                       className="hidden"
//                       id="profile-image"
//                     />
//                     <label
//                       htmlFor="profile-image"
//                       className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer text-sm transition-colors"
//                     >
//                       <Upload size={16} />
//                       Upload New Image
//                     </label>
//                   </div>
//                 </div>
//               </div>

//               {/* Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   value={personalData.name}
//                   onChange={(e) =>
//                     setPersonalData({ ...personalData, name: e.target.value })
//                   }
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-black"
//                 />
//               </div>

//               {/* Title */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Professional Title
//                 </label>
//                 <input
//                   type="text"
//                   value={personalData.title}
//                   onChange={(e) =>
//                     setPersonalData({ ...personalData, title: e.target.value })
//                   }
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-black"
//                 />
//               </div>

//               {/* Tagline */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Tagline
//                 </label>
//                 <textarea
//                   rows={3}
//                   value={personalData.tagline}
//                   onChange={(e) =>
//                     setPersonalData({
//                       ...personalData,
//                       tagline: e.target.value,
//                     })
//                   }
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-sm text-black"
//                 />
//               </div>

//               <Button type="submit" className="w-full sm:w-auto">
//                 <Save size={16} />
//                 Save Personal Info
//               </Button>
//             </form>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminProfile;

// "use client";
// import React, { useState } from "react";
// import { Upload, Save } from "lucide-react";
// import { ContactInfo, PersonalInfo } from "@/types";
// import Button from "@/util/Button";
// import Card from "@/util/Card";
// import {
//   personalInfo as initialPersonalInfo,
//   contactInfo as initialContactInfo,
// } from "@/data/portfolio";
// import axios from "axios";
// import { RootState, useAppDispatch } from "@/lib/store";
// import { fetchProfileData, setProfileData } from "@/lib/storeData/profileSlice";
// import { useSelector } from "react-redux";

// const AdminProfile = () => {
//   const [personalData, setPersonalData] =
//     useState<PersonalInfo>(initialPersonalInfo);
//   const [contactData, setContactData] =
//     useState<ContactInfo>(initialContactInfo);
//   const dispatch = useAppDispatch();
//   const profile = useSelector((state: RootState) => state.profile);

//   const onUpdatePersonal = (info: PersonalInfo) => {
//     setPersonalData(info);
//     // Optionally, call API here
//   };

//   // const onUpdateContact = (info: ContactInfo) => {
//   //   setContactData(info);
//   //   // Optionally, call API here
//   // };

//   // const handlePersonalSubmit = async (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   console.log("personalData", personalData);
//   //   // const profileData=

//   //   const res = await axios.post("/api/profile", {
//   //     data: personalData,
//   //   });

//   //   onUpdatePersonal(personalData);
//   // };

//   const handlePersonalSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("personalData", personalData);

//     try {
//       const res = await axios.post("/api/profile", personalData);
//       console.log("res in handlePersonalSubmit", res);

//       dispatch(fetchProfileData());
//     } catch (error) {
//       console.log("error in handlePersonalSubmit", error);
//     }
//   };

//   // const handleContactSubmit = (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   onUpdateContact(contactData);
//   // };

//   // const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const file = e.target.files?.[0];
//   //   if (file) {
//   //     console.log("row file", file);
//   //     const res = await axios.post("/api/upload", {
//   //       file: file,
//   //     });
//   //     console.log("res", res);
//   //     const imageUrl = URL.createObjectURL(file);

//   //     setPersonalData({ ...personalData, profileImage: imageUrl });
//   //   }
//   // };

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     console.log("raw file", file);

//     // Convert file to base64
//     const toBase64 = (file: File): Promise<string> =>
//       new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => {
//           // Strip the "data:image/*;base64," prefix
//           const base64String = (reader.result as string).split(",")[1];
//           resolve(base64String);
//         };
//         reader.onerror = (error) => reject(error);
//       });

//     try {
//       const base64File = await toBase64(file);

//       const res = await axios.post("/api/upload", {
//         file: base64File,
//       });

//       const uploadedUrl = res.data.url;
//       console.log("Uploaded image URL:", uploadedUrl);

//       setPersonalData({ ...personalData, profileImage: uploadedUrl });
//     } catch (err) {
//       console.error("Image upload error:", err);
//     }
//   };

//   return (
//     <div className="space-y-6 lg:space-y-8">
//       <div>
//         <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
//           Profile Management
//         </h1>
//         <p className="text-gray-600">
//           Update your personal information and contact details
//         </p>
//       </div>

//       <div className="flex justify-center gap-6 lg:gap-8">
//         {/* Personal Info */}
//         <div className="w-full max-w-2xl">
//           <Card className="p-4 lg:p-6 border" hover={false}>
//             <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-6">
//               Personal Information
//             </h2>

//             <form
//               onSubmit={handlePersonalSubmit}
//               className="space-y-4 lg:space-y-6"
//             >
//               {/* Profile Image Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Profile Image
//                 </label>
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//                   <img
//                     src={personalData.profileImage || "/placeholder.jpg"}
//                     alt="Profile"
//                     className="w-16 h-16 rounded-full object-cover flex-shrink-0"
//                   />
//                   <div>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleImageUpload}
//                       className="hidden"
//                       id="profile-image"
//                     />
//                     <label
//                       htmlFor="profile-image"
//                       className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer text-sm transition-colors"
//                     >
//                       <Upload size={16} />
//                       Upload New Image
//                     </label>
//                   </div>
//                 </div>
//               </div>

//               {/* Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   value={personalData.name}
//                   onChange={(e) =>
//                     setPersonalData({ ...personalData, name: e.target.value })
//                   }
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-black"
//                 />
//               </div>

//               {/* Title */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Professional Title
//                 </label>
//                 <input
//                   type="text"
//                   value={personalData.title}
//                   onChange={(e) =>
//                     setPersonalData({ ...personalData, title: e.target.value })
//                   }
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-black"
//                 />
//               </div>

//               {/* Tagline */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Tagline
//                 </label>
//                 <textarea
//                   rows={3}
//                   value={personalData.tagline}
//                   onChange={(e) =>
//                     setPersonalData({
//                       ...personalData,
//                       tagline: e.target.value,
//                     })
//                   }
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-sm text-black"
//                 />
//               </div>

//               <Button type="submit" className="w-full sm:w-auto">
//                 <Save size={16} />
//                 Save Personal Info
//               </Button>
//             </form>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminProfile;

// "use client";
// import React, { useState } from "react";
// import { Upload, Save } from "lucide-react";
// import { ContactInfo, PersonalInfo } from "@/types";
// import Button from "@/util/Button";
// import Card from "@/util/Card";
// // import {
// //   personalInfo as initialPersonalInfo,
// //   contactInfo as initialContactInfo,
// // } from "@/data/portfolio";
// import axios from "axios";
// import { RootState, useAppDispatch } from "@/lib/store";
// import { fetchProfileData } from "@/lib/storeData/profileSlice";
// import { useSelector } from "react-redux";

// const AdminProfile = () => {
//   const dispatch = useAppDispatch();
//   const profile = useSelector((state: RootState) => state.profile);
//   const [personalData, setPersonalData] = useState(profile);

//   const [error, setError] = useState<string | null>(null);
//   const [success, setSuccess] = useState<string | null>(null);
//   const [uploading, setUploading] = useState(false);

//   const handlePersonalSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     try {
//       const res = await axios.post("/api/profile", personalData);
//       setSuccess("Profile updated successfully!");
//       dispatch(fetchProfileData());
//     } catch (error) {
//       setError("Failed to update profile, please try again.");
//       console.error("Error in handlePersonalSubmit", error);
//     }
//   };

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setUploading(true);
//     setError(null);
//     setSuccess(null);

//     // Convert file to base64 string without prefix
//     const toBase64 = (file: File): Promise<string> =>
//       new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => {
//           const base64String = (reader.result as string).split(",")[1];
//           resolve(base64String);
//         };
//         reader.onerror = (error) => reject(error);
//       });

//     try {
//       const base64File = await toBase64(file);

//       const res = await axios.post("/api/upload", {
//         file: base64File,
//       });

//       const uploadedUrl = res.data.url;
//       setPersonalData({ ...personalData, profileImage: uploadedUrl });
//       setSuccess("Profile image uploaded successfully!");
//     } catch (err) {
//       setError("Image upload failed. Please try again.");
//       console.error("Image upload error:", err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="space-y-6 lg:space-y-8">
//       <div>
//         <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
//           Profile Management
//         </h1>
//         <p className="text-gray-600">
//           Update your personal information and contact details
//         </p>
//       </div>

//       <div className="flex justify-center gap-6 lg:gap-8">
//         {/* Personal Info */}
//         <div className="w-full max-w-2xl">
//           <Card className="p-4 lg:p-6 border" hover={false}>
//             <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-6">
//               Personal Information
//             </h2>

//             <form
//               onSubmit={handlePersonalSubmit}
//               className="space-y-4 lg:space-y-6"
//             >
//               {/* Profile Image Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Profile Image
//                 </label>
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//                   <img
//                     src={personalData.profileImage || "/placeholder.jpg"}
//                     alt="Profile"
//                     className="w-16 h-16 rounded-full object-cover flex-shrink-0"
//                   />
//                   <div>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       onChange={handleImageUpload}
//                       className="hidden"
//                       id="profile-image"
//                       disabled={uploading}
//                     />
//                     <label
//                       htmlFor="profile-image"
//                       className={`inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer text-sm transition-colors ${
//                         uploading ? "opacity-50 cursor-not-allowed" : ""
//                       }`}
//                     >
//                       <Upload size={16} />
//                       {uploading ? "Uploading..." : "Upload New Image"}
//                     </label>
//                   </div>
//                 </div>
//               </div>

//               {/* Name */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   value={personalData.name}
//                   onChange={(e) =>
//                     setPersonalData({ ...personalData, name: e.target.value })
//                   }
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-black"
//                   required
//                 />
//               </div>

//               {/* Title */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Professional Title
//                 </label>
//                 <input
//                   type="text"
//                   value={personalData.title}
//                   onChange={(e) =>
//                     setPersonalData({ ...personalData, title: e.target.value })
//                   }
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-black"
//                   required
//                 />
//               </div>

//               {/* Tagline */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Tagline
//                 </label>
//                 <textarea
//                   rows={3}
//                   value={personalData.tagline}
//                   onChange={(e) =>
//                     setPersonalData({
//                       ...personalData,
//                       tagline: e.target.value,
//                     })
//                   }
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-sm text-black"
//                 />
//               </div>

//               {/* Feedback messages */}
//               {error && <p className="text-red-500 text-sm">{error}</p>}
//               {success && <p className="text-green-600 text-sm">{success}</p>}

//               <Button
//                 type="submit"
//                 className="w-full sm:w-auto"
//                 disabled={uploading}
//               >
//                 <Save size={16} />
//                 Save Personal Info
//               </Button>
//             </form>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminProfile;

"use client";
import React, { useState, useEffect } from "react";
import { Upload, Save } from "lucide-react";
// import { RootState, useAppDispatch } from "@/lib/store";
import {
  getProfileData,
  updateProfileData,
} from "@/lib/storeData/profileSlice";
// import { useSelector } from "react-redux";
import axios from "axios";
import Button from "@/util/Button";
import Card from "@/util/Card";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { toast } from "sonner";

const AdminProfile = () => {
  const dispatch = useAppDispatch();
  // Get profile from redux store
  const profile = useAppSelector((state) => state.profile);

  localStorage.setItem("profileImage", profile.profileImage);
  localStorage.setItem("profilename", profile.name);

  // Set local personal data state; init with profile or defaults
  const [personalData, setPersonalData] = useState(() => ({
    profileImage: profile?.profileImage ?? "/placeholder.jpg",
    name: profile?.name ?? "",
    title: profile?.title ?? "",
    tagline: profile?.tagline ?? "",
  }));

  useEffect(() => {
    dispatch(getProfileData());
  }, [dispatch]);

  // Update local state when redux profile changes (e.g. from fetch)
  useEffect(() => {
    if (profile) {
      setPersonalData({
        profileImage: profile.profileImage ?? "/placeholder.jpg",
        name: profile.name ?? "",
        title: profile.title ?? "",
        tagline: profile.tagline ?? "",
      });
    }
  }, [profile]);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handlePersonalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      // await axios.post("/api/profile", personalData);
      await dispatch(updateProfileData(personalData));
      // setSuccess("Profile updated successfully!");
      toast.success("Profile updated successfully!");
      dispatch(getProfileData());
    } catch (error) {
      setError("Failed to update profile, please try again.");
      console.error("Error in handlePersonalSubmit", error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    setSuccess(null);

    const toBase64 = (file: File): Promise<string> =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64String = (reader.result as string).split(",")[1];
          resolve(base64String);
        };
        reader.onerror = (error) => reject(error);
      });

    try {
      const base64File = await toBase64(file);

      const res = await axios.post("/api/upload", { file: base64File });

      const uploadedUrl = res.data.url;
      setPersonalData((prev) => ({ ...prev, profileImage: uploadedUrl }));
      // setSuccess("Profile image uploaded successfully!");
      toast.success("Profile image uploaded successfully!");
    } catch (err) {
      setError("Image upload failed. Please try again.");
      console.error("Image upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Profile Management
        </h1>
        <p className="text-gray-600">
          Update your personal information and contact details
        </p>
      </div>

      <div className="flex justify-center gap-6 lg:gap-8">
        {/* Personal Info */}
        <div className="w-full max-w-2xl">
          <Card className="p-4 lg:p-6 border" hover={false}>
            <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-6">
              Personal Information
            </h2>

            <form
              onSubmit={handlePersonalSubmit}
              className="space-y-4 lg:space-y-6"
            >
              {/* Profile Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <img
                    src={personalData.profileImage || "/placeholder.jpg"}
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="profile-image"
                      disabled={uploading}
                    />
                    <label
                      htmlFor="profile-image"
                      className={`inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer text-sm transition-colors ${
                        uploading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <Upload size={16} />
                      {uploading ? "Uploading..." : "Upload New Image"}
                    </label>
                  </div>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={personalData.name}
                  onChange={(e) =>
                    setPersonalData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-black"
                  required
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Title
                </label>
                <input
                  type="text"
                  value={personalData.title}
                  onChange={(e) =>
                    setPersonalData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm text-black"
                  required
                />
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tagline
                </label>
                <textarea
                  rows={3}
                  value={personalData.tagline}
                  onChange={(e) =>
                    setPersonalData((prev) => ({
                      ...prev,
                      tagline: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-sm text-black"
                />
              </div>

              {/* Feedback messages */}
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-600 text-sm">{success}</p>}

              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={uploading}
              >
                <Save size={16} />
                Save Personal Info
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
