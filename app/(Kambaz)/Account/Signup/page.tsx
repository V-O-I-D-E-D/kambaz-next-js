"use client";
import Link from "next/link";
import { FormControl } from "react-bootstrap";

export default function Signup() {
  return (
    <div id="wd-signup-screen" style={{ maxWidth: 520 }}>
      <h1 className="h3 mb-3">Sign up</h1>
      <FormControl id="wd-signup-username" placeholder="username" className="mb-2" />
      <FormControl id="wd-signup-password" placeholder="password" type="password" className="mb-2" />
      <FormControl id="wd-signup-verify-password" placeholder="verify password" type="password" className="mb-2" />

      <div className="d-flex gap-2">
        <Link href="/Account/Profile" id="wd-signup-btn" className="btn btn-primary flex-fill">Signup</Link>
      </div>

      <div className="mt-3 text-end">
        <Link href="/Account/Signin">Already have an account? Sign in</Link>
      </div>
    </div>
  );
}
