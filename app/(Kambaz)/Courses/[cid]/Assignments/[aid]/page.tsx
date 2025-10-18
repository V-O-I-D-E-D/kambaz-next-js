"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Form, Row, Col, Card } from "react-bootstrap";
import { assignments as assignmentsData } from "../../../../Database";

// ---- Helpers you already have ----
function titleCase(s: string) {
  return s.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
function computeDefaults(aid: string) {
  const lower = (aid || "").toLowerCase();
  const quizMatch = lower.match(/^quiz[-_]?(\d+)$/);
  if (quizMatch) return { name: `Q${quizMatch[1]} — Quiz`, group: "QUIZZES", points: 20 };
  if (lower === "midterm" || lower === "final") return { name: `${titleCase(lower)} — Exam`, group: "EXAMS", points: 200 };
  if (lower === "project") return { name: "Project — Project", group: "PROJECT", points: 400 };
  if (/^\d+$/.test(lower)) return { name: `A${aid} — Assignment`, group: "ASSIGNMENTS", points: 100 };
  const aNum = lower.match(/^a(\d+)$/);
  if (aNum) return { name: `A${aNum[1]} — Assignment`, group: "ASSIGNMENTS", points: 100 };
  return { name: `${titleCase(aid)} — Assignment`, group: "ASSIGNMENTS", points: 100 };
}

// ---- Types (no `any`) ----
type Assignment = {
  _id: string;
  title: string;
  course: string;
  description?: string;
  points?: number;
  dueDate?: string;         // "YYYY-MM-DD"
  availableFrom?: string;   // "YYYY-MM-DD"
  availableUntil?: string;  // "YYYY-MM-DD"
};
// ---- Type guard ----
function isAssignment(v: unknown): v is Assignment {
  if (typeof v !== "object" || v === null) return false;
  const o = v as Record<string, unknown>;
  return typeof o._id === "string" && typeof o.title === "string" && typeof o.course === "string";
}

export default function AssignmentEditor() {
  const { cid, aid } = (useParams() as { cid?: string; aid?: string });

  // Load from DB
  const raw: unknown = assignmentsData;
  const all: Assignment[] = Array.isArray(raw) ? raw.filter(isAssignment) : [];
  const assignment = all.find(a => a._id === aid && a.course === cid);

  // Fallbacks if the JSON doesn’t have the extra fields yet
  const defaults = computeDefaults(aid ?? "");
  const title          = assignment?.title ?? defaults.name;
  const description    = assignment?.description ?? "The assignment is available online. Submit a link to your deployed app or a zip of your code.";
  const points         = assignment?.points ?? defaults.points;
  const dueDate        = assignment?.dueDate ?? "";
  const availableFrom  = assignment?.availableFrom ?? "";
  const availableUntil = assignment?.availableUntil ?? "";
  const groupDefault   = defaults.group;

  return (
    <div id="wd-assignments-editor" className="pe-3">
      {/* Header actions */}
      <div className="d-flex justify-content-end gap-2 mb-3">
        <Link id="wd-cancel" href={`/Courses/${cid}/Assignments`} className="btn btn-outline-secondary">
          Cancel
        </Link>
        <Link id="wd-save" href={`/Courses/${cid}/Assignments`} className="btn btn-success">
          Save
        </Link>
      </div>

      <Form>
        {/* Assignment Name */}
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label className="fw-semibold">Assignment Name</Form.Label>
          <Form.Control defaultValue={title} placeholder="e.g., A1 — ENV + HTML" />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-4" controlId="wd-description">
          <Form.Label className="fw-semibold">Description</Form.Label>
          <Form.Control as="textarea" rows={6} defaultValue={description} />
        </Form.Group>

        <Row className="g-3">
          {/* Main column */}
          <Col lg={8}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="border rounded-1 p-3">
                {/* Points */}
                <Form.Group as={Row} className="mb-3 align-items-center" controlId="wd-points">
                  <Form.Label column lg={3} className="text-muted">Points</Form.Label>
                  <Col lg={9}>
                    <Form.Control type="number" defaultValue={points} />
                  </Col>
                </Form.Group>

                {/* Assignment Group (kept from earlier chapters) */}
                <Form.Group as={Row} className="mb-3 align-items-center" controlId="wd-group">
                  <Form.Label column lg={3} className="text-muted">Assignment Group</Form.Label>
                  <Col lg={9}>
                    <Form.Select defaultValue={groupDefault}>
                      <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                      <option value="QUIZZES">QUIZZES</option>
                      <option value="EXAMS">EXAMS</option>
                      <option value="PROJECT">PROJECT</option>
                    </Form.Select>
                  </Col>
                </Form.Group>

                {/* Display Grade as (kept) */}
                <Form.Group as={Row} className="mb-3 align-items-center" controlId="wd-display-grade-as">
                  <Form.Label column lg={3} className="text-muted">Display Grade as</Form.Label>
                  <Col lg={9}>
                    <Form.Select defaultValue="Points">
                      <option>Points</option>
                      <option>Percentage</option>
                      <option>Complete/Incomplete</option>
                    </Form.Select>
                  </Col>
                </Form.Group>

                {/* Submission Type + Online options (kept) */}
                <Form.Group as={Row} className="mb-3" controlId="wd-submission-type">
                  <Form.Label column lg={3} className="text-muted">Submission Type</Form.Label>
                  <Col lg={9}>
                    <Form.Select defaultValue="Online">
                      <option>Online</option>
                      <option>On Paper</option>
                      <option>No Submission</option>
                    </Form.Select>

                    <div className="border rounded-1 p-3 mt-2">
                      <div className="fw-semibold mb-2">Online Entry Options</div>
                      <Form.Check id="wd-text-entry" type="checkbox" label="Text Entry" />
                      <Form.Check id="wd-website-url" type="checkbox" label="Website URL" />
                      <Form.Check id="wd-media-recordings" type="checkbox" label="Media Recordings" />
                      <Form.Check id="wd-student-annotation" type="checkbox" label="Student Annotation" />
                      <Form.Check id="wd-file-upload" type="checkbox" label="File Upload" />
                    </div>
                  </Col>
                </Form.Group>

                {/* Assign block */}
                <div className="border rounded-1 p-3">
                  <div className="fw-semibold mb-2">Assign</div>

                  <Form.Group className="mb-3" controlId="wd-assign-to">
                    <Form.Label className="text-muted">Assign to</Form.Label>
                    <Form.Control defaultValue="Everyone" />
                  </Form.Group>

                  <Row className="g-3">
                    <Col md={4}>
                      <Form.Group controlId="wd-due-date">
                        <Form.Label className="text-muted">Due</Form.Label>
                        <Form.Control type="date" defaultValue={dueDate} />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="wd-available-from">
                        <Form.Label className="text-muted">Available from</Form.Label>
                        <Form.Control type="date" defaultValue={availableFrom} />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="wd-available-until">
                        <Form.Label className="text-muted">Until</Form.Label>
                        <Form.Control type="date" defaultValue={availableUntil} />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>

            {/* Bottom actions */}
            <div className="d-flex justify-content-end gap-2 mt-3">
              <Link id="wd-cancel" href={`/Courses/${cid}/Assignments`} className="btn btn-outline-secondary">
                Cancel
              </Link>
              <Link id="wd-save" href={`/Courses/${cid}/Assignments`} className="btn btn-success">
                Save
              </Link>
            </div>
          </Col>

          {/* Right side (unchanged) */}
          <Col lg={4}>
            <div className="position-sticky" style={{ top: 16 }}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="border rounded-1 p-3">
                  <div className="fw-semibold mb-2">Tips</div>
                  <ul className="mb-0 small text-muted ps-3">
                    <li>Use Online Entry for links or uploads.</li>
                    <li>Set Due/Available dates in Assign.</li>
                  </ul>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
