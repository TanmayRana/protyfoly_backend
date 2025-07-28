/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/util/Dialog";
import Card from "@/util/Card";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  addTechnologie,
  deleteTechnologie,
  fetchTechnologies,
  updateTechnologie,
} from "@/lib/storeData/technologieSlice";
import Button from "@/util/Button";

const Technologies = () => {
  const dispatch = useAppDispatch();
  const { data: technologies = [], loading } = useAppSelector(
    (state) => state.technologie
  );

  const [open, setOpen] = useState(false);
  const [technologyName, setTechnologyName] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchTechnologies());
  }, [dispatch]);

  const handleAddNew = () => {
    setTechnologyName("");
    setEditId(null);
    setOpen(true);
  };

  const handleClose = () => {
    if (loading) return;
    setOpen(false);
    setTechnologyName("");
    setEditId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!technologyName.trim()) return;

    try {
      if (editId) {
        await dispatch(
          updateTechnologie({
            id: editId,
            technologie: { name: technologyName },
          })
        ).unwrap();
        toast.success("Technology updated successfully!");
      } else {
        await dispatch(addTechnologie(technologyName)).unwrap();
        toast.success("Technology added successfully!");
      }
      dispatch(fetchTechnologies());
      handleClose();
    } catch (error) {
      toast.error("Failed to save technology.");
      console.error(error);
    }
  };

  const handleEdit = (tech: any) => {
    setTechnologyName(tech.name);
    setEditId(tech._id);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteTechnologie(id)).unwrap();
      dispatch(fetchTechnologies());
      toast.success("Technology deleted!");
    } catch (error) {
      toast.error("Failed to delete technology.");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Technologies
          </h1>
          <p className="text-muted-foreground">
            Manage your professional technologies and tools.
          </p>
        </div>
        <Button onClick={handleAddNew} disabled={loading}>
          <Plus size={16} className="mr-2" />
          Add New Technology
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {technologies.length === 0 && (
          <p className="text-muted-foreground">No technologies added yet.</p>
        )}
        {technologies.map((tech: any, index: number) => (
          <Card key={index} className="border">
            <div className="flex justify-between items-center p-4">
              <h3 className="text-lg font-semibold text-foreground">
                {tech.name}
              </h3>
              <div className="flex space-x-2">
                {/* <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(tech)}
                >
                  <Edit size={16} />
                </Button> */}
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleEdit(tech)}
                >
                  <Edit size={12} />
                  Edit
                </Button>
                {/* <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(tech._id)}
                >
                  <Trash2 size={16} />
                </Button> */}
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleDelete(tech._id)}
                >
                  <Trash2 size={12} className="text-red-500" />
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editId ? "Edit Technology" : "Add New Technology"}
            </DialogTitle>
            <DialogDescription>
              {editId
                ? "Update the technology name."
                : "Enter the name of your new technology."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="technologyName" className="text-sm font-medium">
                Technology Name
              </label>
              <input
                id="technologyName"
                type="text"
                value={technologyName}
                onChange={(e) => setTechnologyName(e.target.value)}
                className="w-full mt-1 p-2 border rounded-md bg-background text-foreground"
                required
              />
            </div>

            <DialogFooter className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Technologies;
