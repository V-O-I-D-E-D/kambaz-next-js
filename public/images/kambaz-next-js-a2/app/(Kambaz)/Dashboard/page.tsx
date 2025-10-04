import Link from "next/link";
import Image from "next/image";
import { Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row } from "react-bootstrap";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
          <Card>
          <Link href="/Courses/1234" 
            className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/cat7.jpg" width={200} height={150} alt="Course" />
            <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</CardTitle>
              <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>  
                Full Stack software developer </CardText>
              <Button variant="primary">Go</Button>
              </CardBody>
          </Link>
        </Card>
      </Col>

      <Col className="wd-dashboard-course" style={{ width: "300px" }}>
      <Card>
          <Link href="/Courses/1234" 
            className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/cat1.jpg" width={200} height={150} alt="Course" />
            <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS4730 Distributed Systems</CardTitle>
              <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>  
                Distributed Systems </CardText>
              <Button variant="primary">Go</Button>
              </CardBody>
          </Link>
        </Card>
      
      </Col>

      <Col className="wd-dashboard-course" style={{ width: "300px" }}>
      <Card>
          <Link href="/Courses/1234" 
            className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/cat2.jpg" width={200} height={150} alt="Course" />
            <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS4530 Fundamentals of Software Engineering</CardTitle>
              <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>  
                Fundamentals of Software Engineering </CardText>
              <Button variant="primary">Go</Button>
              </CardBody>
          </Link>
        </Card>
      
      </Col>

      <Col className="wd-dashboard-course" style={{ width: "300px" }}>
      <Card>
          <Link href="/Courses/1234" 
            className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/cat3.jpg" width={200} height={150} alt="Course" />
            <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS4400 Programming Languages</CardTitle>
              <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>  
                Programming Languages </CardText>
              <Button variant="primary">Go</Button>
              </CardBody>
          </Link>
        </Card>
      
      </Col>

      <Col className="wd-dashboard-course" style={{ width: "300px" }}>
      <Card>
          <Link href="/Courses/1234" 
            className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/cat4.jpg" width={200} height={150} alt="Course" />
            <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS3200 Introduction To Databases</CardTitle>
              <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>  
                Introduction To Databases </CardText>
              <Button variant="primary">Go</Button>
              </CardBody>
          </Link>
        </Card>
      
      </Col>

      <Col className="wd-dashboard-course" style={{ width: "300px" }}>
      <Card>
          <Link href="/Courses/1234" 
            className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/cat5.jpg" width={200} height={150} alt="Course" />
            <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS3650 Computer Systems</CardTitle>
              <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>  
                Computer Systems </CardText>
              <Button variant="primary">Go</Button>
              </CardBody>
          </Link>
        </Card>
      
      </Col>

      <Col className="wd-dashboard-course" style={{ width: "300px" }}>
      <Card>
          <Link href="/Courses/1234" 
            className="wd-dashboard-course-link text-decoration-none text-dark">
            <CardImg variant="top" src="/images/cat6.jpg" width={200} height={150} alt="Course" />
            <CardBody>
              <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS3800 Theory Of Computation</CardTitle>
              <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>  
                Theory Of Computation </CardText>
              <Button variant="primary">Go</Button>
              </CardBody>
          </Link>
        </Card>
      
      </Col>
      
      </Row>
      </div>
    </div>
  );
}
