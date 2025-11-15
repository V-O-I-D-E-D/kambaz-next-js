import axios from "axios";
import type { Enrollment } from "../store/enrollmentsSlice";
import { HTTP_SERVER } from "../../../Account/client";

const COURSES_API = `${HTTP_SERVER}/api/courses`;
const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;

export const fetchEnrollmentsForCourse = async (
  courseId: string
): Promise<Enrollment[]> => {
  const { data } = await axios.get<Enrollment[]>(
    `${COURSES_API}/${courseId}/enrollments`,
    { withCredentials: true }
  );
  return data;
};

export const enrollUserInCourse = async (
  userId: string,
  courseId: string
): Promise<Enrollment> => {
  const { data } = await axios.post<Enrollment>(
    ENROLLMENTS_API,
    { userId, courseId },
    { withCredentials: true }
  );
  return data;
};

export const deleteEnrollment = async (enrollmentId: string): Promise<void> => {
  await axios.delete(`${ENROLLMENTS_API}/${enrollmentId}`, {
    withCredentials: true,
  });
};