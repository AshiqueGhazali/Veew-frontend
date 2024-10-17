import React from "react";
import "./AdminFooter.css";
import Logo from "../../../assets/veewWhiteLogo.png";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";

const AdminFooter: React.FC = () => {
  return (
    <div className="admin-footer">
      <footer className="footer-admin">
        <div className="footer-container">
          <div className="footer-left">
            <img src={Logo} alt="" />
          </div>
          <div className="admin-footer-middle">
            <ul>
              <li>about us</li>
              <li>contact us</li>
              <li>privacy&security</li>
            </ul>
          </div>
          <div className="admin-footer-right">
            <ul className="social-icons">
              <li>
                <FaInstagram />
              </li>
              <li>
                <FaLinkedinIn />
              </li>
              <li>
                <FaXTwitter />
              </li>
              <li>
                <FaFacebookF />
              </li>
            </ul>
          </div>
        </div>
        <hr className="admin-footer-divider" />
        <div className="admin-footer-bottom">
          <p>© 2024 Veew. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AdminFooter;
