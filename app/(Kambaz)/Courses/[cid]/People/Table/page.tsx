"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { users as usersDb } from "../../../../Database/index";
import { useParams } from "next/navigation";
import { setEnrollments } from "../../store/enrollmentsSlice";
import * as enrollmentsClient from "../client";

export default function PeopleTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { cid } = useParams<{ cid: string }>();

  useEffect(() => {
    const load = async () => {
      if (!cid) return;
      const data = await enrollmentsClient.fetchEnrollmentsForCourse(
        cid as string
      );
      dispatch(setEnrollments(data));
    };

    void load();
  }, [cid, dispatch]);

  const currentUser = useSelector((s: RootState) => s.account.currentUser);
  const enrollments = useSelector((s: RootState) =>
    s.enrollments.enrollments.filter((e) => e.course === cid)
  );

  const rows = enrollments
    .map(
      (e) =>
        usersDb.find((u) => u._id === e.user) ||
        (currentUser && currentUser._id === e.user ? currentUser : null)
    )
    .filter(Boolean) as Array<
    (typeof usersDb)[number] | NonNullable<typeof currentUser>
  >;

  return (
    <div id="wd-people-table" className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>NAME</th>
            <th>ROLE</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((u) => (
            <tr key={u._id}>
              <td>
                {u.firstName ?? ""} {u.lastName ?? ""}
                <div className="text-muted small">{u.username}</div>
              </td>
              <td>{(u.role ?? "").toString().toUpperCase()}</td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={2} className="text-muted">
                No people enrolled.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
