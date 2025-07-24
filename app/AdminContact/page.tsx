"use client";

import React, { useEffect, useState } from "react";
import {
  Save,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

import Button from "@/util/Button";
import Card from "@/util/Card";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { getContact, postContact } from "@/lib/storeData/contactSlice";
import {
  getSocialMedia,
  postSocialMedia,
} from "@/lib/storeData/SocialMediaSlice";

const AdminContact = () => {
  const dispatch = useAppDispatch();

  // Redux states
  const { data: contactDataFromStore } = useAppSelector(
    (state) => state.contact
  );
  const { data: socialDataFromStore } = useAppSelector(
    (state) => state.socialMedia
  );

  // console.log("contactDataFromStore:", contactDataFromStore[0].email);
  // console.log("socialDataFromStore:", socialDataFromStore);

  // Update localStorage with profile email after contact data is loaded

  // Local form state with your keys
  const [contactData, setContactData] = useState({
    email: "",
    phone: "",
    location: "",
    githunurl: "", // typo preserved as per your original code
    linkedinurl: "",
    twitterurl: "",
  });

  // useEffect(() => {
  //   if (contactData?.email) {
  //     localStorage.setItem("profileemail", contactData.email);
  //   }
  // }, [contactData.email]);

  // useEffect(() => {
  //   if (typeof window !== "undefined" && contactData?.email) {
  //     localStorage.setItem("profileemail", contactData.email);
  //   }
  // }, [contactData.email]);

  // Load data on mount
  useEffect(() => {
    dispatch(getContact());
    dispatch(getSocialMedia());
  }, [dispatch]);

  // Update local state when redux store changes
  useEffect(() => {
    if (contactDataFromStore && contactDataFromStore.length > 0) {
      setContactData((prev) => ({
        ...prev,
        ...contactDataFromStore[0],
      }));
    }

    if (socialDataFromStore && socialDataFromStore.length > 0) {
      setContactData((prev) => ({
        ...prev,
        ...socialDataFromStore[0],
      }));
    }
  }, [contactDataFromStore, socialDataFromStore]);

  // Contact form submit handler
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, phone, location } = contactData;
    console.log("Submitted contact info:", { email, phone, location });
    dispatch(postContact({ email, phone, location }));
  };

  // Social media submit handler
  const handleSocialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Use keys exactly as in state
    const { githunurl, linkedinurl, twitterurl } = contactData;
    console.log("Submitted social links:", {
      githunurl,
      linkedinurl,
      twitterurl,
    });
    dispatch(
      postSocialMedia({
        github: githunurl,
        linkedin: linkedinurl,
        twitter: twitterurl,
      })
    );
  };

  // localStorage.setItem("profileemail", contactData?.email);

  return (
    <div className="space-y-6 lg:space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          Contact Management
        </h1>
        <p className="text-gray-600">
          Manage your contact information and social media links
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* Contact Info Form */}
        <Card className="p-4 lg:p-6 border" hover={false}>
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <Mail className="text-indigo-600" size={24} />
            Contact Information
          </h2>

          <form
            onSubmit={handleContactSubmit}
            className="space-y-4 lg:space-y-6"
          >
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Mail size={16} />
                Email Address
              </label>
              <input
                type="email"
                value={contactData.email}
                onChange={(e) =>
                  setContactData({ ...contactData, email: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm lg:text-base"
                required
              />
            </div>

            <div>
              <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Phone size={16} />
                Phone Number
              </label>
              <input
                type="tel"
                value={contactData.phone}
                onChange={(e) =>
                  setContactData({ ...contactData, phone: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm lg:text-base"
                required
              />
            </div>

            <div>
              <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <MapPin size={16} />
                Location
              </label>
              <input
                type="text"
                value={contactData.location}
                onChange={(e) =>
                  setContactData({ ...contactData, location: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm lg:text-base"
                required
              />
            </div>

            <Button type="submit" className="w-full sm:w-auto">
              <Save size={16} />
              Save Contact Info
            </Button>
          </form>
        </Card>

        {/* Social Media Form */}
        <Card className="p-4 lg:p-6 border" hover={false}>
          <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <Github className="text-indigo-600" size={24} />
            Social Media Links
          </h2>

          <form
            onSubmit={handleSocialSubmit}
            className="space-y-4 lg:space-y-6"
          >
            <div>
              <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Github size={16} />
                GitHub URL
              </label>
              <input
                type="url"
                value={contactData.githunurl}
                onChange={(e) =>
                  setContactData({ ...contactData, githunurl: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm lg:text-base"
                required
              />
            </div>

            <div>
              <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Linkedin size={16} />
                LinkedIn URL
              </label>
              <input
                type="url"
                value={contactData.linkedinurl}
                onChange={(e) =>
                  setContactData({
                    ...contactData,
                    linkedinurl: e.target.value,
                  })
                }
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm lg:text-base"
                required
              />
            </div>

            <div>
              <label className=" text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Twitter size={16} />
                Twitter URL (Optional)
              </label>
              <input
                type="url"
                value={contactData.twitterurl || ""}
                onChange={(e) =>
                  setContactData({ ...contactData, twitterurl: e.target.value })
                }
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm lg:text-base"
              />
            </div>

            <Button type="submit" className="w-full sm:w-auto">
              <Save size={16} />
              Save Social Links
            </Button>
          </form>
        </Card>
      </div>

      {/* Preview Section */}
      <Card className="p-4 lg:p-6 border" hover={false}>
        <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-6">
          Contact Preview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <Mail className="text-indigo-600" size={20} />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Email</h4>
              <p className="text-gray-600 text-sm">{contactData.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <Phone className="text-indigo-600" size={20} />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Phone</h4>
              <p className="text-gray-600 text-sm">{contactData.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <MapPin className="text-indigo-600" size={20} />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Location</h4>
              <p className="text-gray-600 text-sm">{contactData.location}</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminContact;
