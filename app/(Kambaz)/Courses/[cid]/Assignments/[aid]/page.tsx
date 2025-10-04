"use client";
import { use } from "react";
import Link from "next/link";
import { Form, Row, Col, Card } from "react-bootstrap";

function titleCase(s: string) {
  return s.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function computeDefaults(aid: string) {
  const lower = (aid || "").toLowerCase();

  const quizMatch = lower.match(/^quiz[-_]?(\d+)$/);
  if (quizMatch) {
    return {
      name: `Q${quizMatch[1]} — Quiz`,
      group: "QUIZZES",
      points: 20,
    };
  }

  if (lower === "midterm" || lower === "final") {
    return {
      name: `${titleCase(lower)} — Exam`,
      group: "EXAMS",
      points: 200,
    };
  }

  if (lower === "project") {
    return {
      name: "Project — Project",
      group: "PROJECT",
      points: 400,
    };
  }

  if (/^\d+$/.test(lower)) {
    return {
      name: `A${aid} — Assignment`,
      group: "ASSIGNMENTS",
      points: 100,
    };
  }

  const aNum = lower.match(/^a(\d+)$/);
  if (aNum) {
    return {
      name: `A${aNum[1]} — Assignment`,
      group: "ASSIGNMENTS",
      points: 100,
    };
  }

  return {
    name: `${titleCase(aid)} — Assignment`,
    group: "ASSIGNMENTS",
    points: 100,
  };
}

export default function AssignmentEditor({
  params,
}: {
  params: Promise<{ cid: string; aid: string }>;
}) {
  const { cid, aid } = use(params);
  const defaults = computeDefaults(aid);

  return (
    <div id="wd-assignments-editor" className="pe-3">
      {/* Header actions */}
      <div className="d-flex justify-content-end gap-2 mb-3">
        <Link href={`/Courses/${cid}/Assignments`} className="btn btn-outline-secondary">
          Cancel
        </Link>
        <Link href={`/Courses/${cid}/Assignments`} className="btn btn-success">
          Save
        </Link>
      </div>

      <Form>
        {/* Assignment Name */}
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label className="fw-semibold">Assignment Name</Form.Label>
          <Form.Control
            defaultValue={defaults.name}
            placeholder="e.g., A1 — ENV + HTML"
          />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-4" controlId="wd-description">
          <Form.Label className="fw-semibold">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            defaultValue="The assignment is available online. Submit a link to your deployed app or a zip of your code."
          />
        </Form.Group>

        <Row className="g-3">
          {/* Main column */}
          <Col lg={8}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="border rounded-1 p-3">
                {/* Points */}
                <Form.Group as={Row} className="mb-3 align-items-center" controlId="wd-points">
                  <Form.Label column lg={3} className="text-muted">
                    Points
                  </Form.Label>
                  <Col lg={9}>
                    <Form.Control type="number" defaultValue={defaults.points} />
                  </Col>
                </Form.Group>

                {/* Assignment Group */}
                <Form.Group as={Row} className="mb-3 align-items-center" controlId="wd-group">
                  <Form.Label column lg={3} className="text-muted">
                    Assignment Group
                  </Form.Label>
                  <Col lg={9}>
                    <Form.Select defaultValue={defaults.group}>
                      <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                      <option value="QUIZZES">QUIZZES</option>
                      <option value="EXAMS">EXAMS</option>
                      <option value="PROJECT">PROJECT</option>
                    </Form.Select>
                  </Col>
                </Form.Group>

                {/* Display Grade as */}
                <Form.Group
                  as={Row}
                  className="mb-3 align-items-center"
                  controlId="wd-display-grade-as"
                >
                  <Form.Label column lg={3} className="text-muted">
                    Display Grade as
                  </Form.Label>
                  <Col lg={9}>
                    <Form.Select defaultValue="Points">
                      <option>Points</option>
                      <option>Percentage</option>
                      <option>Complete/Incomplete</option>
                    </Form.Select>
                  </Col>
                </Form.Group>

                {/* Submission Type + Online options */}
                <Form.Group as={Row} className="mb-3" controlId="wd-submission-type">
                  <Form.Label column lg={3} className="text-muted">
                    Submission Type
                  </Form.Label>
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
                        <Form.Control type="date" />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="wd-available-from">
                        <Form.Label className="text-muted">Available from</Form.Label>
                        <Form.Control type="date" />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="wd-available-until">
                        <Form.Label className="text-muted">Until</Form.Label>
                        <Form.Control type="date" />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>

            {/* Bottom actions */}
            <div className="d-flex justify-content-end gap-2 mt-3">
              <Link href={`/Courses/${cid}/Assignments`} className="btn btn-outline-secondary">
                Cancel
              </Link>
              <Link href={`/Courses/${cid}/Assignments`} className="btn btn-success">
                Save
              </Link>
            </div>
          </Col>

          {/* Right side */}
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
