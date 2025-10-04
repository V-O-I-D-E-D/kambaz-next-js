"use client";
import Link from "next/link";
import { FormControl } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen" style={{ maxWidth: 520 }}>
      <h1 className="h1 mb-3">Profile</h1>

      {/* same order & defaults as the screenshot */}
      <FormControl id="wd-username" defaultValue="alice" className="mb-3" />
      <FormControl id="wd-password" type="password" defaultValue="123" className="mb-3" />
      <FormControl id="wd-firstname" defaultValue="Alice" className="mb-3" />
      <FormControl id="wd-lastname" defaultValue="Wonderland" className="mb-3" />
      <FormControl id="wd-dob" type="date" className="mb-3" />
      <FormControl id="wd-email" type="email" defaultValue="alice@wonderland.com" className="mb-3" />
      <select id="wd-role" className="form-control mb-4" defaultValue="User">
        <option>User</option>
        <option>Admin</option>
        <option>Faculty</option>
        <option>Student</option>
      </select>

      <Link
        id="wd-signout-btn"
        href="/Account/Signin"
        className="btn btn-danger w-100"
      >
        Signout
      </Link>
    </div>
  );
}
