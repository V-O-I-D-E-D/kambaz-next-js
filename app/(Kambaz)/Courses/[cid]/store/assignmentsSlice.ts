import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { assignments as assignmentsJson } from "../../../Database/index";

export type Assignment = {
  _id: string;
  title: string;
  course: string;
  points?: number;
  dueDate?: string;
  editing?: boolean;
};

function isAssignment(v: unknown): v is Assignment {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o._id === "string" &&
    typeof o.title === "string" &&
    typeof o.course === "string"
  );
}

export type AssignmentsState = {
  assignments: Assignment[];
};

const initialState: AssignmentsState = {
  assignments: Array.isArray(assignmentsJson)
    ? (assignmentsJson as unknown[]).filter(isAssignment) as Assignment[]
    : [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (
      state,
      { payload }: PayloadAction<{ _id?: string; title: string; course: string; points?: number; dueDate?: string }>
    ) => {
      const id = payload._id ?? `A${Date.now()}${Math.floor(Math.random() * 1_000_000)}`;
      state.assignments.push({
        _id: id,
        title: payload.title,
        course: payload.course,
        points: payload.points,
        dueDate: payload.dueDate,
      });
    },
    deleteAssignment: (state, { payload }: PayloadAction<string>) => {
      state.assignments = state.assignments.filter((a) => a._id !== payload);
    },
    updateAssignment: (state, { payload }: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === payload._id ? payload : a
      );
    },
    editAssignment: (state, { payload }: PayloadAction<string>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === payload ? { ...a, editing: true } : a
      );
    },
    clearEditAssignment: (state, { payload }: PayloadAction<string>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === payload ? { ...a, editing: false } : a
      );
    },
  },
});

export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  editAssignment,
  clearEditAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
