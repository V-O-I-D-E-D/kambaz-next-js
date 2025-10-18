import Link from "next/link";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from "react-bootstrap";
import { courses as coursesData } from "../Database";

type Course = {
  _id: string;
  number: string;
  name: string;
  description: string;
  image?: string;
  startDate?: string;
  endDate?: string;
  department?: string;
  credits?: number;
  author?: string;
};

function isCourse(value: unknown): value is Course {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v._id === "string" &&
    typeof v.number === "string" &&
    typeof v.name === "string" &&
    typeof v.description === "string"
  );
}

export default function Dashboard() {
  const raw = coursesData as unknown;
  const courses: Course[] = Array.isArray(raw) ? raw.filter(isCourse) : [];

  const fallbacks = [
    "/images/cat7.jpg",
    "/images/cat1.jpg",
    "/images/cat2.jpg",
    "/images/cat3.jpg",
    "/images/cat4.jpg",
    "/images/cat5.jpg",
    "/images/cat6.jpg",
  ];

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course, i) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  href={`/Courses/${course._id}`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    variant="top"
                    src={course.image ?? fallbacks[i % fallbacks.length]}
                    width={200}
                    height={150}
                    alt="Course"
                  />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.number} {course.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </CardText>
                    <Button variant="primary">Go</Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
