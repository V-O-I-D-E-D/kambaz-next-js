import Link from "next/link";
export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      <input defaultValue="newuser" placeholder="username" className="wd-username" /><br/>
      <input defaultValue="password" placeholder="password" type="password" className="wd-password" /><br/>
      <input defaultValue="password" placeholder="verify password" type="password" className="wd-password-verify" /><br/>
      <Link  href="Profile" > Sign up </Link><br />
      <Link  href="Signin" > Sign in </Link>
    </div>
);}