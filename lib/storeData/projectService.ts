/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const createProject = async (data: any) => {
  const res = await axios.post("/api/project", data);
  return res.data;
};

const updateProject = async (id: string, data: any) => {
  const res = await axios.put(`/api/project`, { id, data });
  return res.data;
};

const getProjects = async () => {
  const res = await axios.get("/api/project");
  return res.data.projects;
};

export const projectService = {
  createProject,
  updateProject,
  getProjects,
};
