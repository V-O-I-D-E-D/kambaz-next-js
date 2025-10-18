"use client";

import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import {
  users as usersData,
  enrollments as enrollmentsData,
} from "../../../../Database";

// Derive types from the JSON modules (matches your actual data)
type User = (typeof usersData)[number];
type Enrollment = (typeof enrollmentsData)[number];

export default function PeopleTable() {
  const { cid } = (useParams() as { cid?: string });

  // Runtime guards for safety, types stay aligned with JSON
  const allUsers: User[] = Array.isArray(usersData) ? usersData : [];
  const allEnrollments: Enrollment[] = Array.isArray(enrollmentsData)
    ? enrollmentsData
    : [];

  // Filter by course and join to user
  const rows = allEnrollments
    .filter((e) => !cid || e.course === cid)
    .map((e) => {
      const u = allUsers.find((u) => u._id === e.user);
      return {
        key: `${e.user}-${e.course}-${u?.section ?? ""}`,
        firstName: u?.firstName ?? "Unknown",
        lastName: u?.lastName ?? "",
        loginId: u?.loginId ?? u?._id ?? "",
        section: u?.section ?? "",
        role: u?.role ?? "STUDENT", // role comes from users.json; default if missing
        lastActivity: u?.lastActivity ?? "",
        totalActivity: u?.totalActivity ?? "",
      };
    });

  return (
    <div id="wd-people-table">
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{r.firstName}</span>{" "}
                <span className="wd-last-name">{r.lastName}</span>
              </td>
              <td className="wd-login-id">{r.loginId}</td>
              <td className="wd-section">{r.section}</td>
              <td className="wd-role">{r.role}</td>
              <td className="wd-last-activity">{r.lastActivity}</td>
              <td className="wd-total-activity">{r.totalActivity}</td>
            </tr>
          ))}

          {rows.length === 0 && (
            <tr>
              <td colSpan={6} className="text-muted">
                No people enrolled in this course.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
