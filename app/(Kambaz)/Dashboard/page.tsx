import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/cat7.jpg" width={200} height={150} alt="Course" />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/4730" className="wd-dashboard-course-link">
            <Image src="/images/cat1.jpg" width={200} height={150} alt="Course" />
            <div>
              <h5>CS4730 Distributed Systems</h5>
              <p className="wd-dashboard-course-title">Distributed Systems</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/4530" className="wd-dashboard-course-link">
            <Image src="/images/cat2.jpg" width={200} height={150} alt="Course" />
            <div>
              <h5>CS4530 Fundamentals of Software Engineering</h5>
              <p className="wd-dashboard-course-title">Fundamentals of Software Engineering</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/4400" className="wd-dashboard-course-link">
            <Image src="/images/cat3.jpg" width={200} height={150} alt="Course" />
            <div>
              <h5>CS4400 Programming Languages</h5>
              <p className="wd-dashboard-course-title">Programming Languages</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/3200" className="wd-dashboard-course-link">
            <Image src="/images/cat4.jpg" width={200} height={150} alt="Course" />
            <div>
              <h5>CS3200 Introduction To Databases</h5>
              <p className="wd-dashboard-course-title">Introduction To Databases</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/3650" className="wd-dashboard-course-link">
            <Image src="/images/cat5.jpg" width={200} height={150} alt="Course" />
            <div>
              <h5>CS3650 Computer Systems</h5>
              <p className="wd-dashboard-course-title">Computer Systems</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/3800" className="wd-dashboard-course-link">
            <Image src="/images/cat6.jpg" width={200} height={150} alt="Course" />
            <div>
              <h5>CS3800 Theory Of Computation</h5>
              <p className="wd-dashboard-course-title">Theory Of Computation</p>
              <button>Go</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
