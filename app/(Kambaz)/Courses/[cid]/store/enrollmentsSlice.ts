import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { enrollments as enrollmentsJson } from "../../../Database/index";

export type Enrollment = { _id: string; user: string; course: string };
export type EnrollmentsState = { enrollments: Enrollment[] };

function isEnrollment(v: unknown): v is Enrollment {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o._id === "string" &&
    typeof o.user === "string" &&
    typeof o.course === "string"
  );
}

const initialState: EnrollmentsState = {
  enrollments: Array.isArray(enrollmentsJson)
    ? (enrollmentsJson as unknown[]).filter(isEnrollment) as Enrollment[]
    : [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (
      state,
      { payload }: PayloadAction<{ userId: string; courseId: string; _id?: string }>
    ) => {
      const already = state.enrollments.some(
        (e) => e.user === payload.userId && e.course === payload.courseId
      );
      if (already) return;
      state.enrollments.push({
        _id: payload._id ?? `E${Date.now()}${Math.floor(Math.random() * 1_000_000)}`,
        user: payload.userId,
        course: payload.courseId,
      });
    },
    unenroll: (
      state,
      { payload }: PayloadAction<{ userId: string; courseId: string }>
    ) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === payload.userId && e.course === payload.courseId)
      );
    },
    deleteEnrollmentById: (state, { payload }: PayloadAction<string>) => {
      state.enrollments = state.enrollments.filter((e) => e._id !== payload);
    },
  },
});

export const { enroll, unenroll, deleteEnrollmentById } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
