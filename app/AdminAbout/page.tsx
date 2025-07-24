/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useEffect, useState } from "react";
import { Save, Plus, Edit, Trash2 } from "lucide-react";
import { Passion } from "../../types"; // Adjust path as per your project structure
import Button from "@/util/Button"; // Adjust path as per your project structure
import Card from "@/util/Card"; // Adjust path as per your project structure
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/util/Dialog"; // Adjust path as per your project structure

import { useAppDispatch, useAppSelector } from "@/hooks"; // Adjust path as per your project structure
import {
  fetchAbout,
  fetchPassions,
  updateAbout,
  createPassion,
  updatePassion,
  deletePassion,
} from "@/lib/storeData/aboutSlice"; // Adjust path as per your project structure

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const AdminAbout = () => {
  const dispatch = useAppDispatch();
  const { story, passions, loading } = useAppSelector((state) => state.about);

  const [storyValue, setStoryValue] = useState(story || "");
  const [editingPassion, setEditingPassion] = useState<Passion | null>(null);
  const [editData, setEditData] = useState<Partial<Passion>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<Passion | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  // Set story value when Redux state updates
  useEffect(() => {
    setStoryValue(story);
  }, [story]);

  // Fetch initial data on component mount
  useEffect(() => {
    dispatch(fetchAbout());
    dispatch(fetchPassions());
  }, [dispatch]);

  const handleSaveStory = () => {
    dispatch(updateAbout(storyValue))
      .unwrap() // Use unwrap to handle fulfilled/rejected promises
      .then(() => {
        toast.success("Story updated successfully!");
      })
      .catch((error) => {
        toast.error(
          `Failed to update story: ${error.message || "Unknown error"}`
        );
        console.error("Failed to update story:", error);
      });
  };

  const handleOpenEditDialog = (passion: Passion) => {
    setEditingPassion(passion);
    // Ensure all required fields are present when setting editData
    setEditData({
      title: passion.title,
      description: passion.description,
      icon: passion.icon,
      _id: passion._id, // Include _id for existing passions
    });
    setIsDialogOpen(true);
  };

  const handleOpenAddDialog = () => {
    setEditingPassion(null);
    setEditData({ title: "", description: "", icon: "🎯" }); // Default icon for new passion
    setIsDialogOpen(true);
  };

  const handleSavePassion = async () => {
    if (!editData.title || !editData.description || !editData.icon) {
      toast.error("Please fill out all fields for the passion.");
      return;
    }

    if (editingPassion && editingPassion._id) {
      // Update existing passion
      dispatch(
        updatePassion({ id: editingPassion._id, data: editData as Passion })
      )
        .unwrap()
        .then(() => {
          toast.success("Passion updated successfully!");
        })
        .catch((error) => {
          toast.error(
            `Failed to update passion: ${error.message || "Unknown error"}`
          );
          console.error("Failed to update passion:", error);
        });
    } else {
      // Create new passion
      dispatch(createPassion(editData as Passion))
        .unwrap()
        .then(() => {
          toast.success("Passion created successfully!");
        })
        .catch((error) => {
          toast.error(
            `Failed to create passion: ${error.message || "Unknown error"}`
          );
          console.error("Failed to create passion:", error);
        });
    }

    setIsDialogOpen(false);
    setEditData({}); // Clear edit data
    setEditingPassion(null); // Clear editing passion state
  };

  // Function to open the delete confirmation alert
  const openDeleteAlertDialog = (passion: Passion) => {
    setDeleteTarget(passion);
    setIsAlertOpen(true);
  };

  // Function to confirm and dispatch delete action
  const confirmDeletePassion = () => {
    if (deleteTarget && deleteTarget._id) {
      dispatch(deletePassion(deleteTarget._id))
        .unwrap()
        .then(() => {
          toast.success("Passion deleted successfully!");
        })
        .catch((error) => {
          toast.error(
            `Failed to delete passion: ${error.message || "Unknown error"}`
          );
          console.error("Failed to delete passion:", error);
        });
    }
    setIsAlertOpen(false); // Close the alert dialog
    setDeleteTarget(null); // Clear delete target
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
          About Management
        </h1>
        <p className="text-gray-600">
          Manage your personal story and what you're passionate about
        </p>
      </div>

      {/* Story Section */}
      <Card className="p-4 lg:p-6 border" hover={false}>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Story</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Personal Story
            </label>
            <textarea
              value={storyValue}
              onChange={(e) => setStoryValue(e.target.value)}
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-sm lg:text-base"
              placeholder="Tell your story... Use \n\n to separate paragraphs."
            />
            <p className="text-xs text-gray-500 mt-1">
              Use double line breaks (\n\n) to create separate paragraphs.
            </p>
          </div>
          <Button onClick={handleSaveStory} className="w-full sm:w-auto">
            <Save size={16} />
            Save Story
          </Button>
        </div>
      </Card>

      {/* Passions Section */}
      <Card className="p-4 lg:p-6 border" hover={false}>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            What You're Passionate About
          </h2>
          <Button onClick={handleOpenAddDialog} size="sm">
            <Plus size={16} />
            Add Passion
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {passions.map((passion) => (
            <Card key={passion._id} className="p-4 border">
              <div className="text-center mb-4">
                <div className="text-3xl lg:text-4xl mb-3">{passion.icon}</div>
                <h4 className="font-bold text-gray-900 mb-2 text-sm lg:text-base">
                  {passion.title}
                </h4>
                <p className="text-gray-600 text-xs lg:text-sm">
                  {passion.description}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleOpenEditDialog(passion)}
                  className="flex-1"
                >
                  <Edit size={12} />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => openDeleteAlertDialog(passion)} // Use the alert dialog for deletion
                  className="flex-1"
                >
                  <Trash2 size={12} />
                  Delete
                </Button>
              </div>
            </Card>
          ))}
          {passions.length === 0 && (
            <div className="col-span-full text-center py-8">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No passions added yet
              </h3>
              <p className="text-gray-500 mb-4">
                Share what drives and motivates you.
              </p>
              <Button onClick={handleOpenAddDialog}>
                <Plus size={16} />
                Add First Passion
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Dialog for Add/Edit Passion */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingPassion && editingPassion._id
                ? "Edit Passion"
                : "Add Passion"}
            </DialogTitle>
            <DialogDescription>
              Fill out the details of your passion below.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon (Emoji)
              </label>
              <input
                type="text"
                value={editData.icon || ""}
                onChange={(e) =>
                  setEditData({ ...editData, icon: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center text-2xl"
                placeholder="e.g., 🎯, 💡, 🚀"
                maxLength={2} // Emojis are usually 1 or 2 chars
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={editData.title || ""}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                placeholder="e.g., Web Development"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={editData.description || ""}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none"
                placeholder="e.g., Building beautiful and functional web applications."
              />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleSavePassion}>
              <Save size={14} />
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* AlertDialog for Delete Confirmation */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong className="font-semibold text-red-600">
                {deleteTarget?.title}
              </strong>{" "}
              passion? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsAlertOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeletePassion}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminAbout;
