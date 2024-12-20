import "./Footer.css";
import { SiFacebook, SiX, SiInstagram } from "@icons-pack/react-simple-icons";

export const Footer = () => {
  return (
    <footer className="footer">

      <p className="logoText">© 2024 ysidro media. all rights reserved</p>

      <img src="icon.svg" alt="icon" className="logoPic" />

      <div className="icons">
        <SiFacebook color="#000000" size={24} />
        <SiX color="#000000" size={24} />
        <SiInstagram color="#000000" size={24} />
      </div>

    </footer>
  );
};
