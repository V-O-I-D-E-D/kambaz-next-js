"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup } from "react-bootstrap";

export default function AccountNavigation() {
  const pathname = usePathname();
  const links = [
    { label: "Profile", href: "/Account/Profile", id: "wd-account-profile-link" },
    { label: "Sign In", href: "/Account/Signin", id: "wd-account-signin-link" },
    { label: "Sign Up", href: "/Account/Signup", id: "wd-account-signup-link" },
  ];

  return (
    <div id="wd-account-navigation" style={{ width: 220 }}>
      <ListGroup className="rounded-0">
        {links.map((l) => {
          const active = pathname?.startsWith(l.href);
          return (
            <Link
              key={l.href}
              id={l.id}
              href={l.href}
              className={`list-group-item list-group-item-action border-0 rounded-0
                ${active ? "text-danger fw-bold bg-white" : "text-danger bg-transparent"}`}
            >
              {l.label}
            </Link>
          );
        })}
      </ListGroup>
    </div>
  );
}
