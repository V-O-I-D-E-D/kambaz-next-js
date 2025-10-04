"use client";
import Link from "next/link";
import { FormControl } from "react-bootstrap";

export default function Signin() {
  return (
    <div id="wd-signin-screen" style={{ maxWidth: 420 }}>
      <h1 className="h3 mb-3">Sign in</h1>

      <FormControl id="wd-username" placeholder="username" className="mb-2" />
      <FormControl id="wd-password" placeholder="password" type="password" className="mb-2" />

      <Link
        id="wd-signin-btn"
        href="/Account/Profile"
        className="btn btn-primary w-100 mb-2"
      >
        Sign in
      </Link>

      <div className="d-flex justify-content-between">
        <Link id="wd-signup-link" href="/Account/Signup">Sign up</Link>
      </div>
    </div>
  );
}
