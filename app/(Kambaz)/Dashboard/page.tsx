"use client";

import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../Courses/[cid]/store";
import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
  Form,
} from "react-bootstrap";
import { useMemo, useState } from "react";
import {
  addCourse,
  deleteCourse,
  type Course,
} from "../Courses/[cid]/store/coursesSlice";
import { enroll, unenroll } from "../Courses/[cid]/store/enrollmentsSlice";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();

  const currentUser = useSelector((s: RootState) => s.account.currentUser);
  const isFaculty = (currentUser?.role ?? "").toUpperCase() === "FACULTY";

  const courses = useSelector((s: RootState) => s.courses.courses);
  const enrollments = useSelector((s: RootState) => s.enrollments.enrollments);

  const [draft, setDraft] = useState({
    number: "CS0000",
    name: "New Course",
    description: "Describe this course…",
    image: "",
  });

  const handleAdd = () => {
    dispatch(
      addCourse({
        number: draft.number || "CS0000",
        name: draft.name || "New Course",
        description: draft.description || "Describe this course…",
        image: draft.image || undefined,
      })
    );
    setDraft((d) => ({ ...d, number: "", name: "" }));
  };

  const handleDelete = (id: string) => dispatch(deleteCourse(id));

  const enrolledCourseIds = useMemo(() => {
    if (!currentUser) return new Set<string>();
    return new Set(
      enrollments.filter((e) => e.user === currentUser._id).map((e) => e.course)
    );
  }, [enrollments, currentUser]);

  const myCourses: Course[] = courses.filter((c) => enrolledCourseIds.has(c._id));

  const fallbacks = [
    "/images/cat7.jpg",
    "/images/cat1.jpg",
    "/images/cat2.jpg",
    "/images/cat3.jpg",
    "/images/cat4.jpg",
    "/images/cat5.jpg",
    "/images/cat6.jpg",
  ];

  const onEnroll = (courseId: string) => {
    if (!currentUser) return;
    dispatch(enroll({ userId: currentUser._id, courseId }));
  };
  const onUnenroll = (courseId: string) => {
    if (!currentUser) return;
    dispatch(unenroll({ userId: currentUser._id, courseId }));
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {/* New Course form — FACULTY only */}
      {isFaculty && (
        <div className="d-flex flex-wrap gap-2 align-items-center mb-3">
          <Form.Control
            id="wd-new-course-number"
            placeholder="Course number"
            style={{ maxWidth: 180 }}
            value={draft.number}
            onChange={(e) => setDraft((d) => ({ ...d, number: e.target.value }))}
          />
          <Form.Control
            id="wd-new-course-name"
            placeholder="Course name"
            style={{ maxWidth: 260 }}
            value={draft.name}
            onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
          />
          <Button id="wd-add-course-click" variant="success" onClick={handleAdd}>
            Add
          </Button>
        </div>
      )}

      {/* My Courses (enrolled) */}
      <h2 id="wd-dashboard-published">Published Courses ({myCourses.length})</h2>
      <hr />
      <Row xs={1} md={5} className="g-4 mb-4">
        {myCourses.map((course, i) => (
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
                  <CardText className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    {course.description}
                  </CardText>
                  <div className="d-flex gap-2">
                    <Button variant="primary">Go</Button>
                    {/* Delete — FACULTY only */}
                    {isFaculty && (
                      <Button
                        variant="outline-danger"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(course._id);
                        }}
                      >
                        Delete
                      </Button>
                    )}
                    {/* Unenroll — anyone can remove themselves */}
                    {currentUser && (
                      <Button
                        id="wd-unenroll-course"
                        variant="outline-secondary"
                        onClick={(e) => {
                          e.preventDefault();
                          onUnenroll(course._id);
                        }}
                      >
                        Unenroll
                      </Button>
                    )}
                  </div>
                </CardBody>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Browse All Courses to enroll */}
      {currentUser && (
        <>
          <h3 className="mt-4">Browse All Courses</h3>
          <hr />
          <Row xs={1} md={5} className="g-4">
            {courses.map((course, i) => {
              const isEnrolled = enrolledCourseIds.has(course._id);
              return (
                <Col key={course._id} style={{ width: "300px" }}>
                  <Card>
                    <CardImg
                      variant="top"
                      src={course.image ?? fallbacks[i % fallbacks.length]}
                      width={200}
                      height={150}
                      alt="Course"
                    />
                    <CardBody>
                      <CardTitle className="text-nowrap overflow-hidden">
                        {course.number} {course.name}
                      </CardTitle>
                      <CardText className="overflow-hidden" style={{ height: "80px" }}>
                        {course.description}
                      </CardText>
                      <div className="d-flex gap-2">
                        <Link href={`/Courses/${course._id}`} className="btn btn-primary">
                          Go
                        </Link>
                        {isEnrolled ? (
                          <Button
                            id="wd-unenroll-course"
                            variant="outline-secondary"
                            onClick={() => onUnenroll(course._id)}
                          >
                            Unenroll
                          </Button>
                        ) : (
                          <Button
                            id="wd-enroll-course"
                            variant="outline-success"
                            onClick={() => onEnroll(course._id)}
                          >
                            Enroll
                          </Button>
                        )}
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </div>
  );
}
