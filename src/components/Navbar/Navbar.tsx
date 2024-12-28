import { NavLink } from "react-router-dom";
import "./Navbar.css";

export function Navbar() {
  return (
    <nav className="navbar">
      <img src="icon.svg" alt="company logo" width={50} />
      <div>
        <a className="navbarHeading" href="#features">
          features
        </a>
        <a className="navbarHeading" href="#benefits">
          benefits
        </a>
        <a className="navbarHeading" href="#faq">
          faq
        </a>
      </div>
      <NavLink
        to={"/login"}
        type="button"
        className="btn btn-primary btn-lg loginNavbar"
      >
        LOGIN
      </NavLink>
    </nav>
  );
}
