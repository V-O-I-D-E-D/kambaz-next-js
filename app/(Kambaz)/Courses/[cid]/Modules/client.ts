import axios from "axios";
import type { Module } from "../store/modulesSlice";
import { HTTP_SERVER } from "../../../Account/client";

const COURSES_API = `${HTTP_SERVER}/api/courses`;
const MODULES_API = `${HTTP_SERVER}/api/modules`;

export const findModulesForCourse = async (courseId: string): Promise<Module[]> => {
  const { data } = await axios.get<Module[]>(
    `${COURSES_API}/${courseId}/modules`,
    { withCredentials: true }
  );
  return data;
};

export const createModuleForCourse = async (
  courseId: string,
  module: Pick<Module, "name">
): Promise<Module> => {
  const { data } = await axios.post<Module>(
    `${COURSES_API}/${courseId}/modules`,
    module,
    { withCredentials: true }
  );
  return data;
};

export const deleteModule = async (moduleId: string): Promise<void> => {
  await axios.delete(`${MODULES_API}/${moduleId}`, {
    withCredentials: true,
  });
};

export const updateModule = async (module: Module): Promise<Module> => {
  const { data } = await axios.put<Module>(
    `${MODULES_API}/${module._id}`,
    module,
    { withCredentials: true }
  );
  return data;
};
