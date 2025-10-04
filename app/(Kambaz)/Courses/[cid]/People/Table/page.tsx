import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
export default function PeopleTable() {
 return (
  <div id="wd-people-table">
   <Table striped>
    <thead>
     <tr><th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th></tr>
    </thead>
    <tbody>
     <tr><td className="wd-full-name text-nowrap">
          <FaUserCircle className="me-2 fs-1 text-secondary" />
          <span className="wd-first-name">Tony</span>{" "}
          <span className="wd-last-name">Stark</span></td>
      <td className="wd-login-id">001234561S</td>
      <td className="wd-section">S101</td>
      <td className="wd-role">STUDENT</td>
      <td className="wd-last-activity">2020-10-01</td>
      <td className="wd-total-activity">10:21:32</td></tr>
          {/* Add at least 3 more users such as Bruce Wayne, Steve Rogers, and Natasha Romanoff */}
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">SpongeBob</span>{" "}
              <span className="wd-last-name">Squarepants</span>
            </td>
            <td className="wd-login-id">00234562S</td>
            <td className="wd-section">S101</td>
            <td className="wd-role">TA</td>
            <td className="wd-last-activity">2021-10-02</td>
            <td className="wd-total-activity">01:12:00</td>
          </tr>
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Patrick</span>{" "}
              <span className="wd-last-name">Starfish</span>
            </td>
            <td className="wd-login-id">00345673S</td>
            <td className="wd-section">S102</td>
            <td className="wd-role">STUDENT</td>
            <td className="wd-last-activity">2021-10-03</td>
            <td className="wd-total-activity">07:46:11</td>
          </tr>
          <tr>
            <td className="wd-full-name text-nowrap">
              <FaUserCircle className="me-2 fs-1 text-secondary" />
              <span className="wd-first-name">Eugene</span>{" "}
              <span className="wd-last-name">Krabs</span>
            </td>
            <td className="wd-login-id">00456784S</td>
            <td className="wd-section">S102</td>
            <td className="wd-role">INSTRUCTOR</td>
            <td className="wd-last-activity">2021-9-01</td>
            <td className="wd-total-activity">12:00:00</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}