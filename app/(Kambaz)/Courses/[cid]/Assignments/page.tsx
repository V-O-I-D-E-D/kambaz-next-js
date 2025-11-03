"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { addAssignment, deleteAssignment } from "../store/assignmentsSlice";
import { ListGroup } from "react-bootstrap";

export default function AssignmentsPage() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((s: RootState) => s.account.currentUser);
  const isFaculty = (user?.role ?? "").toUpperCase() === "FACULTY";

  const assignments = useSelector((s: RootState) =>
    s.assignments.assignments.filter((a) => a.course === cid)
  );

  const handleAdd = () => {
    const newId = `A${Date.now()}${Math.floor(Math.random() * 1_000_000)}`;
    dispatch(addAssignment({ _id: newId, title: "New Assignment", course: cid }));
    router.push(`/Courses/${cid}/Assignments/${newId}`);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteAssignment(id));
  };

  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="m-0">Assignments</h3>
        {isFaculty && (
          <button id="wd-add-assignment-btn" className="btn btn-danger" onClick={handleAdd}>
            + Assignment
          </button>
        )}
      </div>
      <hr />

      <ListGroup id="wd-assignments-list" className="rounded-0">
        {assignments.map((a) => (
          <ListGroup.Item
            key={a._id}
            className="d-flex justify-content-between align-items-center"
          >
            <Link
              href={`/Courses/${cid}/Assignments/${a._id}`}
              className="text-decoration-none"
            >
              {a.title}
            </Link>

            {isFaculty && (
              <button
                id="wd-delete-assignment"
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDelete(a._id)}
              >
                Delete
              </button>
            )}
          </ListGroup.Item>
        ))}

        {assignments.length === 0 && (
          <div className="text-muted p-3">No assignments yet.</div>
        )}
      </ListGroup>
    </div>
  );
}
