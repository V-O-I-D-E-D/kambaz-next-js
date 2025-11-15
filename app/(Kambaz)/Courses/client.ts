import axios from "axios";
import type { Course } from "./[cid]/store/coursesSlice";
import type { Module } from "./[cid]/store/modulesSlice";
import { HTTP_SERVER } from "../Account/client";

const COURSES_API = `${HTTP_SERVER}/api/courses`;

export const fetchAllCourses = async (): Promise<Course[]> => {
  const { data } = await axios.get<Course[]>(COURSES_API);
  return data;
};

export const deleteCourse = async (id: string): Promise<void> => {
  await axios.delete(`${COURSES_API}/${id}`);
};

export const updateCourse = async (course: Course): Promise<Course> => {
  const { data } = await axios.put<Course>(
    `${COURSES_API}/${course._id}`,
    course
  );
  return data;
};


export const findModulesForCourse = async (
  courseId: string
): Promise<Module[]> => {
  const { data } = await axios.get<Module[]>(
    `${COURSES_API}/${courseId}/modules`
  );
  return data;
};

export const createModuleForCourse = async (
  courseId: string,
  module: { name: string; course: string }
): Promise<Module> => {
  const { data } = await axios.post<Module>(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return data;
};
