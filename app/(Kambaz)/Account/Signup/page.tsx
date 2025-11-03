"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { FormControl } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import Link from "next/link";

type Role = "FACULTY" | "STUDENT";

export default function Signup() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [form, setForm] = useState<{
    username: string;
    password: string;
    verify: string;
    firstName: string;
    lastName: string;
    role: Role;
  }>({
    username: "",
    password: "",
    verify: "",
    firstName: "",
    lastName: "",
    role: "STUDENT",
  });

  const onInput =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((f) => ({ ...f, [k]: e.target.value }));
    };

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm((f) => ({ ...f, role: e.target.value as Role }));
  };

  const signup = () => {
    if (!form.username || !form.password || form.password !== form.verify) return;
    const user = {
      _id: `U${Date.now()}`,
      username: form.username,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
      role: form.role, // already uppercase FACULTY/STUDENT
    };
    dispatch(setCurrentUser(user));
    router.replace("/Account/Profile");
  };

  return (
    <div id="wd-signup-screen" style={{ maxWidth: 520 }}>
      <h1 className="h3 mb-3">Sign up</h1>

      <FormControl id="wd-signup-username" placeholder="username" className="mb-2"
        value={form.username} onChange={onInput("username")} />
      <FormControl id="wd-signup-password" placeholder="password" type="password" className="mb-2"
        value={form.password} onChange={onInput("password")} />
      <FormControl id="wd-signup-verify-password" placeholder="verify password" type="password" className="mb-2"
        value={form.verify} onChange={onInput("verify")} />
      <FormControl placeholder="first name" className="mb-2"
        value={form.firstName} onChange={onInput("firstName")} />
      <FormControl placeholder="last name" className="mb-3"
        value={form.lastName} onChange={onInput("lastName")} />

      <select id="wd-role" className="form-select mb-3"
        value={form.role} onChange={onSelect}>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>

      <button id="wd-signup-btn" className="btn btn-primary w-100" onClick={signup}>
        Signup
      </button>

      <div className="mt-3 text-end">
        <Link href="/Account/Signin">Already have an account? Sign in</Link>
      </div>
    </div>
  );
}
