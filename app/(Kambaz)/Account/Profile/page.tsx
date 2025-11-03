"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { FormControl } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import type { RootState } from "../../Courses/[cid]/store";

type Role = "FACULTY" | "STUDENT";

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((s: RootState) => s.account.currentUser);

  const [form, setForm] = useState(() => ({
    username: user?.username ?? "",
    password: user?.password ?? "",
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    role: ((user?.role?.toUpperCase() as Role) || "STUDENT") as Role,
    email: `${user?.username ?? ""}@example.com`,
    phone: "",
    dob: "",
  }));

  // Keep form in sync when Redux user changes
  useEffect(() => {
    if (!user) return;
    setForm((prev) => ({
      ...prev,
      username: user.username ?? "",
      password: user.password ?? "",
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      role: ((user.role?.toUpperCase() as Role) || "STUDENT") as Role,
      email: `${user.username}@example.com`,
    }));
  }, [user]);

  // Redirect unauthenticated users
  useEffect(() => {
    if (!user) router.replace("/Account/Signin");
  }, [user, router]);

  // After hooks are declared, it's safe to early-return
  if (!user) return null;

  const onInput =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((f) => ({ ...f, [k]: e.target.value }));
    };

  const onSelectRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm((f) => ({ ...f, role: e.target.value as Role }));
  };

  const save = () => {
    dispatch(
      setCurrentUser({
        ...user,
        username: form.username,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
        role: form.role, // FACULTY/STUDENT uppercase
      })
    );
  };

  const signout = () => dispatch(setCurrentUser(null));

  return (
    <div id="wd-profile-screen" style={{ maxWidth: 520 }}>
      <h1 className="h1 mb-3">Profile</h1>

      <FormControl id="wd-username" className="mb-3" value={form.username} onChange={onInput("username")} placeholder="username" />
      <FormControl id="wd-password" className="mb-3" type="password" value={form.password} onChange={onInput("password")} placeholder="password" />
      <FormControl id="wd-firstname" className="mb-3" value={form.firstName} onChange={onInput("firstName")} placeholder="first name" />
      <FormControl id="wd-lastname" className="mb-3" value={form.lastName} onChange={onInput("lastName")} placeholder="last name" />

      <FormControl id="wd-dob" type="date" className="mb-3" value={form.dob} onChange={onInput("dob")} />
      <FormControl id="wd-email" type="email" className="mb-3" value={form.email} onChange={onInput("email")} placeholder="email" />
      <FormControl id="wd-phone" type="tel" className="mb-3" value={form.phone} onChange={onInput("phone")} placeholder="phone" />

      <select id="wd-role" className="form-select mb-4" value={form.role} onChange={onSelectRole}>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>

      <div className="d-flex gap-2">
        <button id="wd-save-profile" className="btn btn-danger flex-fill" onClick={save}>
          Save
        </button>
        <Link id="wd-signout-btn" href="/Account/Signin" onClick={signout} className="btn btn-secondary flex-fill">
          Signout
        </Link>
      </div>
    </div>
  );
}
