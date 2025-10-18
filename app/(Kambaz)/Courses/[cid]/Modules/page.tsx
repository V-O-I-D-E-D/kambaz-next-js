'use client';

import { ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "next/navigation";
import modulesData from "../../../Database/modules.json";

type Lesson = { _id: string; name: string };
type Module = { _id: string; course: string; name: string; lessons?: Lesson[] };

function isLesson(v: unknown): v is Lesson {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  return typeof o._id === "string" && typeof o.name === "string";
}
function isModule(v: unknown): v is Module {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  const base =
    typeof o._id === "string" &&
    typeof o.course === "string" &&
    typeof o.name === "string";
  if (!base) return false;
  if (o.lessons === undefined) return true;
  if (!Array.isArray(o.lessons)) return false;
  return o.lessons.every(isLesson);
}

export default function Modules() {
  const { cid } = (useParams() as { cid?: string });
  const rawModules: unknown = modulesData;
  const allModules: Module[] = Array.isArray(rawModules)
    ? rawModules.filter(isModule)
    : [];

  const courseModules = cid ? allModules.filter(m => m.course === cid) : [];

  return (
    <div id="wd-modules">
      {/* global toolbar across the top */}
      <div className="mb-3" id="wd-modules-controls">
        <ModulesControls />
      </div>

      {/* single, ListGroup-based modules list */}
      <ListGroup className="rounded-0" id="wd-modules">
        {courseModules.map((mod) => (
          <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray" key={mod._id}>
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {mod.name}
              <ModuleControlButtons />
            </div>
            <ListGroup>
              {(mod.lessons || []).map((l: Lesson) => (
                <ListGroupItem
                  key={l._id}
                  className="wd-lesson p-3 ps-1 d-flex justify-content-between align-items-center border-light"
                >
                  <span>
                    <BsGripVertical className="me-2 fs-3" />
                    {l.name}
                  </span>
                  <LessonControlButtons />
                </ListGroupItem>
              ))}
            </ListGroup>
          </ListGroupItem>
        ))}

        {courseModules.length === 0 && (
          <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">No modules yet for this course.</div>
          </ListGroupItem>
        )}
      </ListGroup>
    </div>
  );
}
