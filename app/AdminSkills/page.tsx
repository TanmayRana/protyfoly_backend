/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { toast } from "sonner"; // Using sonner for toast notifications

// Assuming these types, utilities, and Redux hooks/slices are correctly defined and imported
import { Skill } from "../../types"; // Adjust path as needed
import Button from "@/util/Button"; // Adjust path as needed
import Card from "@/util/Card"; // Adjust path as needed
import ProgressBar from "@/util/ProgressBar"; // Adjust path as needed
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/util/Dialog"; // Adjust path as needed

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Adjust path as needed

import { useAppDispatch, useAppSelector } from "@/hooks"; // Adjust path as needed

import {
  fetchSkills,
  addSkill,
  updateSkill,
  deleteSkill,
} from "@/lib/storeData/skillsSlice"; // Adjust path as needed

import {
  getSkillsCategories,
  createSkillsCategory,
  updateSkillsCategory,
  deleteSkillsCategory,
} from "@/lib/storeData/SkillsCategorySlice"; // Adjust path as needed

// Import AlertDialog components
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

const AdminSkills = () => {
  const dispatch = useAppDispatch();

  // Select skills and categories from redux store:
  const {
    skills,
    loading: skillsLoading,
    error: skillsError,
  } = useAppSelector((state) => state.skills);
  const {
    skillsCategories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useAppSelector((state) => state.skillsCategory);

  // console.log("skillsCategory", skillsCategories);
  // console.log("skills", skills);

  // Local UI state:
  // --- Skill dialog ---
  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Skill>>({});

  // --- Category dialogs ---
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("bg-gray-500");

  // --- Edit category ---
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editCategoryColor, setEditCategoryColor] = useState("bg-gray-500");

  // --- Alert Dialog States for Deletion Confirmation ---
  const [skillToDelete, setSkillToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isSkillDeleteDialogOpen, setIsSkillDeleteDialogOpen] = useState(false);

  const [categoryToDelete, setCategoryToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [isCategoryDeleteDialogOpen, setIsCategoryDeleteDialogOpen] =
    useState(false);

  // Predefined colors for categories:
  const predefinedColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-gray-500",
    "bg-teal-500",
    "bg-cyan-500",
    "bg-lime-500",
  ];

  // Fetch skills and categories on mount
  useEffect(() => {
    dispatch(getSkillsCategories()); // Fetch categories first
  }, [dispatch]);

  // Fetch skills after categories are loaded (or if categories change)
  useEffect(() => {
    if (skillsCategories && skillsCategories.length > 0) {
      dispatch(fetchSkills());
    } else if (!categoriesLoading && skillsCategories?.length === 0) {
      dispatch(fetchSkills());
    }
  }, [dispatch, skillsCategories, categoriesLoading]);

  // Get category color helper
  const getCategoryColor = (categoryName: string) => {
    const cat = skillsCategories.find((c) => c.category === categoryName);
    return cat ? cat.color : "bg-gray-500";
  };

  // Group skills by category for display
  const groupedSkills: Record<string, Skill[]> = skills.reduce((acc, skill) => {
    (acc[skill.category] = acc[skill.category] || []).push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Skill Dialog handlers:
  const handleEdit = (skill: Skill) => {
    setEditingSkillId(skill._id);
    setEditData(skill); // Pre-fill the form with existing skill data
    setIsSkillDialogOpen(true);
  };

  const handleAddNew = (categoryName: Skill["category"]) => {
    setEditingSkillId(null); // Clear editing ID for new skill
    setEditData({
      name: "",
      level: 50, // Default level
      category: categoryName, // Pre-select the category
    });
    setIsSkillDialogOpen(true);
  };

  // Saving skill handler - dispatch add or edit thunk
  const handleSkillSave = async () => {
    if (!editData.name || !editData.category) {
      toast.error("Please provide both skill name and category.");
      return;
    }

    try {
      if (editingSkillId) {
        // Edit skill
        await dispatch(
          updateSkill({
            id: editingSkillId,
            data: editData as Partial<Skill>,
          })
        ).unwrap(); // Use .unwrap() to catch rejected promises
        toast.success("Skill updated successfully!");
        dispatch(fetchSkills()); // Re-fetch skills to update UI
      } else {
        // Add skill
        await dispatch(addSkill(editData as Omit<Skill, "_id">)).unwrap();
        toast.success("Skill added successfully!");
        dispatch(fetchSkills()); // Re-fetch skills to update UI
      }
      closeSkillDialog();
    } catch (error: any) {
      toast.error(`Failed to save skill: ${error.message || "Unknown error"}`);
      console.error("Skill save error:", error);
    }
  };

  // This now only prepares the data for the AlertDialog
  const handleDeleteSkillClick = (id: string, name: string) => {
    setSkillToDelete({ id, name });
    setIsSkillDeleteDialogOpen(true);
  };

  const closeSkillDialog = () => {
    setIsSkillDialogOpen(false);
    setEditingSkillId(null);
    setEditData({}); // Clear edit data
  };

  // Category Dialog handlers:
  const openCategoryDialog = () => {
    setNewCategoryName("");
    setNewCategoryColor("bg-gray-500");
    setIsCategoryDialogOpen(true);
  };

  const handleCategorySave = async () => {
    const trimmedName = newCategoryName.trim();
    if (!trimmedName) {
      toast.error("Category name cannot be empty.");
      return;
    }
    // Check for duplicate category name (case-insensitive)
    if (
      skillsCategories?.some(
        (cat) => cat?.category?.toLowerCase() === trimmedName.toLowerCase()
      )
    ) {
      toast.error("Category with this name already exists.");
      return;
    }

    try {
      await dispatch(
        createSkillsCategory({ category: trimmedName, color: newCategoryColor })
      ).unwrap();
      toast.success("Category added successfully!");
      dispatch(getSkillsCategories()); // Re-fetch categories to update UI
      setIsCategoryDialogOpen(false);
    } catch (error: any) {
      toast.error(
        `Failed to add category: ${error.message || "Unknown error"}`
      );
      console.error("Category add error:", error);
    }
  };

  const closeCategoryDialog = () => {
    setIsCategoryDialogOpen(false);
    setNewCategoryName("");
    setNewCategoryColor("bg-gray-500");
  };

  // Edit Category handlers:
  const handleEditCategory = (categoryId: string) => {
    const category = skillsCategories.find((cat) => cat._id === categoryId);
    if (!category) {
      toast.error("Category not found.");
      return;
    }

    setEditingCategoryId(category._id || null);
    setEditCategoryName(category.category);
    setEditCategoryColor(category.color);
    setIsEditingCategory(true);
  };

  const handleEditCategorySave = async () => {
    const trimmedName = editCategoryName.trim();
    if (!trimmedName) {
      toast.error("Category name cannot be empty.");
      return;
    }

    // Check for duplicate category name (case-insensitive), excluding the current category being edited
    if (
      skillsCategories.some(
        (cat) =>
          cat.category.toLowerCase() === trimmedName.toLowerCase() &&
          cat._id !== editingCategoryId
      )
    ) {
      toast.error("Another category with this name already exists.");
      return;
    }

    if (!editingCategoryId) {
      toast.error("No category selected for editing.");
      return;
    }

    try {
      await dispatch(
        updateSkillsCategory({
          id: editingCategoryId,
          data: { category: trimmedName, color: editCategoryColor },
        })
      ).unwrap();
      toast.success("Category updated successfully!");
      dispatch(getSkillsCategories()); // Re-fetch categories to update UI
      setIsEditingCategory(false);
      setEditingCategoryId(null);
      setEditCategoryName("");
      setEditCategoryColor("bg-gray-500");
    } catch (error: any) {
      toast.error(
        `Failed to update category: ${error.message || "Unknown error"}`
      );
      console.error("Category update error:", error);
    }
  };

  // This now only prepares the data for the AlertDialog
  const handleDeleteCategoryClick = (
    categoryId: string,
    categoryName: string
  ) => {
    setCategoryToDelete({ id: categoryId, name: categoryName });
    setIsCategoryDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6 lg:space-y-8 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Skills Management
          </h1>
          <p className="text-gray-600">
            Manage your technical skills and expertise levels.
          </p>
        </div>
        <Button onClick={openCategoryDialog} className="w-full sm:w-auto">
          <Plus size={16} className="mr-2" /> Add New Category
        </Button>
      </div>

      {/* Optional Loading/Error Feedback (currently commented out) */}
      {/* {categoriesLoading && (
        <p className="text-blue-500">Loading categories...</p>
      )}
      {categoriesError && (
        <p className="text-red-500">
          Error loading categories: {categoriesError}
        </p>
      )}
      {skillsLoading && <p className="text-blue-500">Loading skills...</p>}
      {skillsError && (
        <p className="text-red-500">Error loading skills: {skillsError}</p>
      )} */}

      {/* Skill Categories Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {skillsCategories?.length === 0 && !categoriesLoading && (
          <p className="text-gray-600 col-span-full text-center py-10">
            No skill categories found. Click "Add New Category" to get started.
          </p>
        )}
        {skillsCategories?.map((category) => (
          <Card key={category._id} className="p-4 lg:p-6 border" hover={false}>
            <div className="flex justify-between items-start gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 capitalize">
                  {category.category}
                </h3>
                {/* Actions for the category itself */}
                <div className="flex gap-1 ml-4 flex-shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditCategory(category._id!)}
                    aria-label={`Edit category ${category.category}`}
                    // title="Edit Category"
                  >
                    <Edit size={12} />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() =>
                      handleDeleteCategoryClick(
                        category._id!,
                        category.category
                      )
                    }
                    aria-label={`Delete category ${category.category}`}
                    // title="Delete Category"
                  >
                    <Trash2 size={12} />
                  </Button>
                </div>
              </div>
              <Button
                onClick={() =>
                  handleAddNew(category.category as Skill["category"])
                }
                className="w-full sm:w-auto flex-shrink-0"
                // title="Add New Skill"
              >
                <Plus size={16} className="mr-2" /> Add Skill
              </Button>
            </div>

            <div className="space-y-4">
              {(groupedSkills[category.category] || []).length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">No skills in this category yet.</p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleAddNew(category.category as Skill["category"])
                    }
                    className="mt-2"
                  >
                    Add First Skill
                  </Button>
                </div>
              ) : (
                (groupedSkills[category.category] || []).map((skill) => (
                  <div
                    key={skill._id}
                    className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <span className="font-medium text-gray-900 truncate">
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-500 flex-shrink-0">
                          {skill.level}%
                        </span>
                      </div>
                      <ProgressBar
                        value={skill.level}
                        color={getCategoryColor(skill.category)}
                        showValue={false}
                      />
                    </div>
                    <div className="flex gap-1 ml-4 flex-shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(skill)}
                        // title="Edit Skill"
                      >
                        <Edit size={12} />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() =>
                          handleDeleteSkillClick(skill._id, skill.name)
                        }
                        // title="Delete Skill"
                      >
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Edit/Add Skill Dialog */}
      <Dialog
        open={isSkillDialogOpen}
        onOpenChange={(open) => !open && closeSkillDialog()}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingSkillId ? "Edit Skill" : "Add Skill"}
            </DialogTitle>
            <DialogDescription>
              {editingSkillId
                ? "Update your skill details."
                : "Enter details for the new skill."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* Skill Name */}
            <div>
              <label
                htmlFor="skill-name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Skill Name
              </label>
              <input
                id="skill-name"
                type="text"
                value={editData.name || ""}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                autoFocus
              />
            </div>

            {/* Category Select */}
            <div>
              <label
                htmlFor="skill-category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category
              </label>
              <Select
                value={
                  editData.category ||
                  (skillsCategories.length > 0
                    ? skillsCategories[0]?.category
                    : "")
                }
                onValueChange={(value) =>
                  setEditData({
                    ...editData,
                    category: value as Skill["category"],
                  })
                }
              >
                <SelectTrigger
                  id="skill-category"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {skillsCategories?.length === 0 ? (
                    <SelectItem disabled value="">
                      No categories available. Please add one first.
                    </SelectItem>
                  ) : (
                    skillsCategories?.map((cat) => (
                      <SelectItem key={cat._id} value={cat.category}>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${cat.color}`}
                          ></div>
                          {cat.category}
                        </div>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Skill Level */}
            <div>
              <label
                htmlFor="skill-level"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Skill Level: {editData.level || 0}%
              </label>
              <input
                id="skill-level"
                type="range"
                min={0}
                max={100}
                value={editData.level || 0}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    level: parseInt(e.target.value, 10),
                  })
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500" // Added accent color
              />
            </div>
          </div>

          <DialogFooter className="pt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={closeSkillDialog}>
              <X size={16} className="mr-2" /> Cancel
            </Button>
            <Button onClick={handleSkillSave}>
              <Save size={16} className="mr-2" /> Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Category Dialog */}
      <Dialog
        open={isCategoryDialogOpen}
        onOpenChange={(open) => !open && closeCategoryDialog()}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Enter a name and choose a color for the new skill category.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="new-category-name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category Name
              </label>
              <input
                id="new-category-name"
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                autoFocus
              />
            </div>

            <div>
              <label
                htmlFor="new-category-color"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Choose Color
              </label>
              <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg">
                {predefinedColors.map((colorClass) => (
                  <button
                    key={colorClass}
                    type="button"
                    onClick={() => setNewCategoryColor(colorClass)}
                    className={`w-8 h-8 rounded-full border-2 ${colorClass} ${
                      newCategoryColor === colorClass
                        ? "border-indigo-500 ring-2 ring-indigo-500"
                        : "border-transparent"
                    }`}
                    aria-label={`Select color ${colorClass.replace("bg-", "")}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="pt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={closeCategoryDialog}>
              <X size={16} className="mr-2" /> Cancel
            </Button>
            <Button onClick={handleCategorySave}>
              <Save size={16} className="mr-2" /> Add Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog
        open={isEditingCategory}
        onOpenChange={(open) => !open && setIsEditingCategory(false)}
      >
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the category name and color.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="edit-category-name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category Name
              </label>
              <input
                id="edit-category-name"
                type="text"
                value={editCategoryName}
                onChange={(e) => setEditCategoryName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                autoFocus
              />
            </div>

            <div>
              <label
                htmlFor="edit-category-color"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Choose Color
              </label>
              <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-lg">
                {predefinedColors.map((colorClass) => (
                  <button
                    key={colorClass}
                    type="button"
                    onClick={() => setEditCategoryColor(colorClass)}
                    className={`w-8 h-8 rounded-full border-2 ${colorClass} ${
                      editCategoryColor === colorClass
                        ? "border-indigo-500 ring-2 ring-indigo-500"
                        : "border-transparent"
                    }`}
                    aria-label={`Select color ${colorClass.replace("bg-", "")}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="pt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsEditingCategory(false)}
            >
              <X size={16} className="mr-2" /> Cancel
            </Button>
            <Button onClick={handleEditCategorySave}>
              <Save size={16} className="mr-2" /> Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- ALERT DIALOGS FOR DELETION CONFIRMATION --- */}

      {/* Alert Dialog for Skill Delete */}
      <AlertDialog
        open={isSkillDeleteDialogOpen}
        onOpenChange={setIsSkillDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Skill</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the skill{" "}
              <strong>{skillToDelete?.name}</strong>? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setIsSkillDeleteDialogOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (skillToDelete) {
                  try {
                    await dispatch(deleteSkill(skillToDelete.id)).unwrap();
                    toast.success("Skill deleted successfully!");
                    if (editingSkillId === skillToDelete.id) closeSkillDialog(); // Close dialog if the deleted skill was being edited
                    setIsSkillDeleteDialogOpen(false); // Close the AlertDialog
                    setSkillToDelete(null); // Clear state
                  } catch (error: any) {
                    toast.error(
                      `Failed to delete skill: ${
                        error.message || "Unknown error"
                      }`
                    );
                    console.error("Skill delete error:", error);
                  }
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Alert Dialog for Category Delete */}
      <AlertDialog
        open={isCategoryDeleteDialogOpen}
        onOpenChange={setIsCategoryDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the category{" "}
              <strong>{categoryToDelete?.name}</strong>? This will also delete
              all skills associated with this category.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setIsCategoryDeleteDialogOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                if (categoryToDelete) {
                  try {
                    await dispatch(
                      deleteSkillsCategory(categoryToDelete.id)
                    ).unwrap();
                    toast.success(
                      `Category "${categoryToDelete.name}" and its skills deleted successfully!`
                    );
                    dispatch(getSkillsCategories()); // Re-fetch categories
                    dispatch(fetchSkills()); // Re-fetch all skills (should reflect deletions handled by backend)
                    if (editingCategoryId === categoryToDelete.id) {
                      setIsEditingCategory(false);
                      setEditingCategoryId(null);
                    }
                    setIsCategoryDeleteDialogOpen(false); // Close the AlertDialog
                    setCategoryToDelete(null); // Clear state
                  } catch (error: any) {
                    toast.error(
                      `Failed to delete category: ${
                        error.message || "Unknown error"
                      }`
                    );
                    console.error("Category delete error:", error);
                  }
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminSkills;
