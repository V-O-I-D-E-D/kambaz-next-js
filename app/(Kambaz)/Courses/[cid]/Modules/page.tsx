'use client';

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store";
import { addModule, deleteModule, updateModule, type Module } from "../store/modulesSlice";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "next/navigation";

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const modules = useSelector((s: RootState) => s.modules.modules)
    .filter((m) => m.course === cid);

  const currentUser = useSelector((s: RootState) => s.account.currentUser);
  const isFaculty = (currentUser?.role ?? "").toUpperCase() === "FACULTY";

  const [editingId, setEditingId] = useState<string | null>(null);
  const [nameDraft, setNameDraft] = useState("");

  const handleAdd = () => dispatch(addModule({ name: "New Module", course: cid }));
  const startEdit = (m: Module) => {
    setEditingId(m._id);
    setNameDraft(m.name);
  };
  const cancelEdit = () => {
    setEditingId(null);
    setNameDraft("");
  };
  const commitUpdate = () => {
    if (!editingId) return;
    const target = modules.find((m) => m._id === editingId);
    if (!target) return;
    dispatch(updateModule({ ...target, name: nameDraft }));
    cancelEdit();
  };

  return (
    <div id="wd-modules">
      {/* Add module — FACULTY only */}
      {isFaculty && <ModulesControls onAddModule={handleAdd} />}
      <hr />

      <ListGroup className="rounded-0" id="wd-modules-list">
        {modules.map((module) => {
          const isEditing = editingId === module._id;
          return (
            <ListGroupItem
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center gap-2">
                <BsGripVertical className="me-2 fs-3" />
                {isEditing ? (
                  <input
                    id="wd-edit-module-name"
                    className="form-control form-control-sm w-auto"
                    value={nameDraft}
                    onChange={(e) => setNameDraft(e.target.value)}
                    placeholder="Module name"
                  />
                ) : (
                  <span>{module.name}</span>
                )}

                {/* Edit/Delete/Update/Cancel — FACULTY only */}
                {isFaculty && (
                  <ModuleControlButtons
                    editing={isEditing}
                    onEdit={() => startEdit(module)}
                    onUpdate={commitUpdate}
                    onCancel={cancelEdit}
                    onDelete={() => dispatch(deleteModule(module._id))}
                  />
                )}
              </div>

              <ListGroup className="wd-lessons rounded-0">
                {module.lessons?.map((lesson) => (
                  <ListGroupItem
                    key={lesson._id}
                    className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center border-light"
                  >
                    <span className="d-flex align-items-center gap-2">
                      <BsGripVertical className="me-2 fs-3" />
                      {lesson.name}
                    </span>
                    {/* Lesson-level controls — FACULTY only */}
                    {isFaculty && <LessonControlButtons />}
                  </ListGroupItem>
                ))}
              </ListGroup>
            </ListGroupItem>
          );
        })}

        {modules.length === 0 && (
          <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              No modules yet for this course.
            </div>
          </ListGroupItem>
        )}
      </ListGroup>
    </div>
  );
}
