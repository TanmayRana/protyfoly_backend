/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  ExternalLink,
  Github,
  Upload,
  X,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  createProject,
  getProjects,
  updateProject,
  // deleteProject,
} from "@/lib/storeData/projectSlice";
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
import { Project } from "../../types";
import { toast } from "sonner";
import Image from "next/image";

const AdminProjects = () => {
  const dispatch = useAppDispatch();
  const { projects, isLoading } = useAppSelector((state) => state.project);

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editData, setEditData] = useState<Partial<Project>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Upload state
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getProjects()).catch(() => {
      toast.error("Failed to load projects");
    });
  }, [dispatch]);

  const handleSave = async () => {
    if (!editData.title || editData.title.trim() === "") {
      toast.error("Project title cannot be empty");
      return;
    }

    try {
      if (editingProject && editingProject._id) {
        // Update existing project
        const updateData: Partial<Project> = {
          ...editData,
          image: editData.image || "",
        };
        console.log("editingProject", editingProject?._id);

        console.log("updateData", updateData);

        dispatch(updateProject({ id: editingProject._id, data: updateData }));
        dispatch(getProjects());
        toast.success("Project updated successfully");
      } else {
        // Create new project
        dispatch(createProject(editData));
        dispatch(getProjects());
        toast.success("Project created successfully");
      }
      setEditingProject(null);
      setEditData({});
      setIsDialogOpen(false);
      setUploadError(null);
    } catch (err) {
      toast.error("Failed to save project. Please try again.");
    }
  };

  const handleCancel = () => {
    setEditingProject(null);
    setEditData({});
    setIsDialogOpen(false);
    setUploadError(null);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setEditData(project);
    setIsDialogOpen(true);
    setUploadError(null);
  };

  const handleAddNew = () => {
    setEditingProject(null);
    setEditData({});
    setIsDialogOpen(true);
    setUploadError(null);
  };

  const handleDelete = async (project: Project) => {
    try {
      const res = await axios.delete(`/api/project`, {
        data: { id: project._id },
      });
      console.log("res", res);

      if (res.status === 200) {
        dispatch(getProjects());
        toast.success("Project deleted successfully");
      }
    } catch (err) {
      toast.error("Failed to delete project. Please try again.");
    }
  };

  const safeProjects = Array.isArray(projects) ? projects : [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Projects Management
          </h1>
          <p className="text-gray-600">Manage your portfolio projects</p>
        </div>
        <Button onClick={handleAddNew} className="w-full sm:w-auto">
          <Plus size={16} /> Add New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {isLoading ? (
          <p>Loading...</p>
        ) : safeProjects.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-5xl mb-4">📁</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No projects yet
            </h3>
            <p className="text-gray-500 mb-4">
              Add your first project to get started.
            </p>
            <Button onClick={handleAddNew}>
              <Plus size={16} /> Add First Project
            </Button>
          </div>
        ) : (
          safeProjects.map((project) => (
            <Card key={project._id} className="p-5 border">
              {/* image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                {project.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.technologies?.map((tech: string) => (
                  <span
                    key={tech}
                    className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 text-xs text-gray-600 mb-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-600 flex items-center gap-1"
                  >
                    <ExternalLink size={12} /> Live
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-600 flex items-center gap-1"
                  >
                    <Github size={12} /> Code
                  </a>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(project)}
                  className="flex-1"
                >
                  <Edit size={14} /> Edit
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleDelete(project)}
                  className="flex-1"
                >
                  <Trash2 size={14} /> Delete
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>

      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => !open && handleCancel()}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingProject ? "Edit" : "Add"} Project</DialogTitle>
            <DialogDescription>Update your project details.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={editData.title || ""}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
              className="w-full border p-2 rounded text-sm"
              disabled={uploading}
            />

            <textarea
              placeholder="Description"
              value={editData.description || ""}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
              rows={4}
              className="w-full border p-2 rounded text-sm"
              disabled={uploading}
            />

            <input
              type="url"
              placeholder="Live URL"
              value={editData.liveUrl || ""}
              onChange={(e) =>
                setEditData({ ...editData, liveUrl: e.target.value })
              }
              className="w-full border p-2 rounded text-sm"
              disabled={uploading}
            />

            <input
              type="url"
              placeholder="GitHub URL"
              value={editData.githubUrl || ""}
              onChange={(e) =>
                setEditData({ ...editData, githubUrl: e.target.value })
              }
              className="w-full border p-2 rounded text-sm"
              disabled={uploading}
            />

            <input
              type="text"
              placeholder="Technologies (comma separated)"
              value={editData.technologies?.join(", ") || ""}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  technologies: e.target.value
                    .split(",")
                    .map((t) => t.trim())
                    .filter((t) => t),
                })
              }
              className="w-full border p-2 rounded text-sm"
              disabled={uploading}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Image
              </label>

              <div className="space-y-3">
                {/* Preview image with remove button */}
                {editData.image && (
                  <div className="relative">
                    <Image
                      src={editData.image}
                      alt="Project preview"
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      aria-label="Remove project image"
                      onClick={() => setEditData({ ...editData, image: "" })}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      disabled={uploading}
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* File upload input */}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        setUploading(true);
                        setUploadError(null);

                        const toBase64 = (file: File): Promise<string> =>
                          new Promise((resolve, reject) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = () => {
                              const base64String = (
                                reader.result as string
                              ).split(",")[1];
                              resolve(base64String);
                            };
                            reader.onerror = (error) => reject(error);
                          });

                        try {
                          const base64File = await toBase64(file);
                          const res = await axios.post("/api/upload", {
                            file: base64File,
                          });
                          const uploadedUrl = res.data.url;
                          setEditData((prev) => ({
                            ...prev,
                            image: uploadedUrl,
                          }));
                        } catch (err) {
                          setUploadError(
                            "Image upload failed. Please try again."
                          );
                        } finally {
                          setUploading(false);
                        }
                      }}
                      className="hidden"
                      id={`project-image-${editData._id ?? "new"}`}
                      disabled={uploading}
                    />
                    <label
                      htmlFor={`project-image-${editData._id ?? "new"}`}
                      className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 cursor-pointer transition-colors duration-200 text-sm font-medium ${
                        uploading ? "opacity-50 pointer-events-none" : ""
                      }`}
                    >
                      <Upload size={16} />
                      {uploading ? "Uploading…" : "Upload Image"}
                    </label>
                  </div>

                  {/* URL input for image */}
                  <input
                    type="url"
                    value={editData.image || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, image: e.target.value })
                    }
                    placeholder="Or paste image URL"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    disabled={uploading}
                  />
                </div>

                {/* Upload error message */}
                {uploadError && (
                  <p className="text-red-500 text-xs mt-1">{uploadError}</p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="pt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={uploading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={
                uploading || !editData.title || editData.title.trim() === ""
              }
            >
              <Save size={16} /> Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProjects;
