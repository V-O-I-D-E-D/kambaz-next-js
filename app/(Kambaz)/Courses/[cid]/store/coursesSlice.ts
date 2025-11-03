import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { courses as coursesJson } from "../../../Database/index";

export type Course = {
  _id: string;
  number: string;
  name: string;
  description: string;
  image?: string;
};

function isCourse(v: unknown): v is Course {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o._id === "string" &&
    typeof o.number === "string" &&
    typeof o.name === "string" &&
    typeof o.description === "string"
  );
}

export type CoursesState = { courses: Course[] };

const initialState: CoursesState = {
  courses: Array.isArray(coursesJson)
    ? (coursesJson as unknown[]).filter(isCourse) as Course[]
    : [],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (
      state,
      {
        payload,
      }: PayloadAction<{
        _id?: string;
        number: string;
        name: string;
        description: string;
        image?: string;
      }>
    ) => {
      const id = payload._id ?? `C${Date.now()}${Math.floor(Math.random() * 1_000_000)}`;
      state.courses.unshift({
        _id: id,
        number: payload.number,
        name: payload.name,
        description: payload.description,
        image: payload.image,
      });
    },
    deleteCourse: (state, { payload }: PayloadAction<string>) => {
      state.courses = state.courses.filter((c) => c._id !== payload);
    },
    updateCourse: (state, { payload }: PayloadAction<Course>) => {
      state.courses = state.courses.map((c) => (c._id === payload._id ? payload : c));
    },
  },
});

export const { addCourse, deleteCourse, updateCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
