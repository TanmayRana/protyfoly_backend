/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Award,
  ExternalLink,
  Upload,
  Calendar,
} from "lucide-react";
import { Certification } from "../../types";
import Button from "@/util/Button";
import Card from "@/util/Card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/util/Dialog";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  fetchCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} from "@/lib/storeData/certificationSlice";
import axios from "axios";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface CertificationExtended extends Certification {
  _id?: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

const AdminCertifications = () => {
  const dispatch = useAppDispatch();

  const certificationsSelector = useAppSelector(
    (state) => state.certifications
  );
  const certifications: CertificationExtended[] = Array.isArray(
    certificationsSelector.certifications
  )
    ? certificationsSelector.certifications
    : [];

  const loading = certificationsSelector.loading;
  const error = certificationsSelector.error;

  const [editingCert, setEditingCert] = useState<CertificationExtended | null>(
    null
  );
  const [editData, setEditData] = useState<Partial<CertificationExtended>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchCertifications())
      .unwrap()
      .catch(() => toast.error("Failed to load certifications"));
  }, [dispatch]);

  const handleEdit = (certification: CertificationExtended) => {
    setEditingCert(certification);
    setEditData({ ...certification });
    setIsDialogOpen(true);
  };

  const handleCancel = () => {
    setEditingCert(null);
    setEditData({});
    setIsDialogOpen(false);
    setUploadError(null);
  };

  const handleSave = async () => {
    const { title, issuer, date, credentialUrl } = editData;
    if (title && issuer && date) {
      try {
        if (!editingCert?._id) {
          await dispatch(
            createCertification({
              title,
              issuer,
              date,
              credentialUrl: credentialUrl || "",
            })
          ).unwrap();
          toast.success("Certification created successfully");
        } else {
          await dispatch(
            updateCertification({
              id: editingCert._id,
              title,
              issuer,
              date,
              credentialUrl: credentialUrl || "",
            })
          ).unwrap();
          toast.success("Certification updated successfully");
        }
        await dispatch(fetchCertifications()).unwrap();
        handleCancel();
      } catch {
        toast.error("Failed to save certification");
      }
    } else {
      toast.warning("Please fill in title, issuer, and date");
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await dispatch(deleteCertification(id)).unwrap();
      toast.success("Certification deleted successfully");
      await dispatch(fetchCertifications()).unwrap();
    } catch {
      toast.error("Failed to delete certification");
    }
  };

  const handleAddNew = () => {
    const newCert: Partial<CertificationExtended> = {
      title: "",
      issuer: "",
      date: new Date().getFullYear().toString(),
      credentialUrl: "",
    };
    setEditingCert(null);
    setEditData(newCert);
    setIsDialogOpen(true);
    setUploadError(null);
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          const base64String = reader.result.split(",")[1];
          resolve(base64String);
        } else {
          reject("FileReader result is not a string");
        }
      };
      reader.onerror = (error) => reject(error);
    });

  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);
      setUploadError(null);
      const base64File = await toBase64(file);
      const res = await axios.post("/api/upload", { file: base64File });
      return res.data.url as string;
    } catch (err) {
      console.error("Image upload failed:", err);
      setUploadError("Image upload failed. Please try again.");
      throw new Error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6 lg:space-y-8 ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Certifications Management
          </h1>
          <p className="text-gray-600">
            Manage your professional certifications and credentials
          </p>
        </div>
        <Button onClick={handleAddNew} disabled={loading}>
          <Plus size={16} />
          Add New Certification
        </Button>
      </div>

      {loading && (
        <div
          className="text-center text-gray-500"
          role="status"
          aria-live="polite"
        >
          Loading…
        </div>
      )}

      {!loading && certifications.length === 0 && (
        <div className="text-center py-12">
          <Award className="w-10 h-10 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-600 mb-4">No certifications yet.</p>
          <Button onClick={handleAddNew}>
            <Plus size={16} />
            Add Certification
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {certifications.map((cert) => (
          <Card key={cert._id || cert.title} className="p-5 border">
            <div className="text-center">
              {cert.credentialUrl ? (
                <img
                  src={cert.credentialUrl}
                  alt={`${cert.title} badge`}
                  className="w-20 h-20 object-cover rounded-lg mx-auto mb-3"
                />
              ) : (
                <div className="w-12 h-12 bg-indigo-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Award size={24} className="text-indigo-600" />
                </div>
              )}

              <h3 className="font-semibold text-gray-900 text-sm">
                {cert.title}
              </h3>
              <p className="text-xs text-gray-500">{cert.issuer}</p>
              <p className="text-xs flex items-center justify-center gap-1 text-gray-500">
                <Calendar size={12} />
                {cert.date}
              </p>

              {cert.credentialUrl && (
                <div className="mt-2">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-indigo-600 text-xs hover:underline"
                  >
                    <ExternalLink size={12} />
                    View Credential
                  </a>
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => handleEdit(cert)}
              >
                <Edit size={12} />
                Edit
              </Button>

              {/* AlertDialog for Delete */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="secondary" size="sm" className="flex-1">
                    <Trash2 size={12} />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Certification</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete the certification "
                      <strong>{cert.title}</strong>"? This action cannot be
                      undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        handleDelete(cert._id);
                      }}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </Card>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) handleCancel();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCert?._id ? "Edit Certification" : "Add Certification"}
            </DialogTitle>
            <DialogDescription>
              {editingCert?._id
                ? "Update your certification details"
                : "Add a new certification"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <label htmlFor="cert-title" className="sr-only">
              Title
            </label>
            <input
              id="cert-title"
              type="text"
              placeholder="Title"
              aria-label="Certification Title"
              value={editData.title || ""}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
            />

            <label htmlFor="cert-issuer" className="sr-only">
              Issuer
            </label>
            <input
              id="cert-issuer"
              type="text"
              placeholder="Issuer"
              aria-label="Certification Issuer"
              value={editData.issuer || ""}
              onChange={(e) =>
                setEditData({ ...editData, issuer: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
            />

            <label htmlFor="cert-date" className="sr-only">
              Year (e.g., 2024)
            </label>
            <input
              id="cert-date"
              type="text"
              placeholder="Year (e.g., 2024)"
              aria-label="Certification Year"
              value={editData.date || ""}
              onChange={(e) =>
                setEditData({ ...editData, date: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
            />

            {editData.credentialUrl && (
              <div className="relative">
                <img
                  src={editData.credentialUrl}
                  alt="Certification badge preview"
                  className="w-full h-48 object-cover rounded-lg border border-gray-300"
                />
                <button
                  type="button"
                  aria-label="Remove certification badge image"
                  onClick={() =>
                    setEditData({ ...editData, credentialUrl: "" })
                  }
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  disabled={uploading}
                >
                  <X size={16} />
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="file"
                accept="image/*"
                id="cert-image"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  try {
                    const url = await handleFileUpload(file);
                    if (url) {
                      setEditData((prev) => ({ ...prev, credentialUrl: url }));
                      toast.success("Image uploaded");
                    }
                  } catch {
                    toast.error("Failed to upload image.");
                  }
                }}
                className="hidden"
                disabled={uploading}
              />
              <label
                htmlFor="cert-image"
                className={`inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg cursor-pointer ${
                  uploading ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                <Upload size={16} />
                {uploading ? "Uploading…" : "Upload Image"}
              </label>

              <input
                type="url"
                placeholder="Or paste badge image URL"
                aria-label="Badge image URL"
                value={editData.credentialUrl || ""}
                onChange={(e) =>
                  setEditData({ ...editData, credentialUrl: e.target.value })
                }
                className="px-3 py-2 border rounded"
                disabled={uploading}
              />
            </div>

            {/* Uncomment to show upload error if you prefer
            {uploadError && (
              <p className="text-red-600 text-sm" role="alert" aria-live="assertive">
                {uploadError}
              </p>
            )} */}
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={handleCancel}>
              <X size={16} />
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={loading || uploading}>
              <Save size={16} />
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCertifications;
