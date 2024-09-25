import './Footer.css'
import Logo from '../../../assets/veewBlackLogo.png'
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";


const Footer = () => {
  return (
    <div className="clint-footer">
       <footer className="footer">
        <div className="footer-container">
          <div className="footer-left">
            {/* <h2>Logo</h2> */}
            <img src={Logo} alt="" />
          </div>
          <div className="footer-middle">
            <ul>
              <li>about us</li>
              <li>contact us</li>
              <li>privacy&security</li>
            </ul>
          </div>
          <div className="footer-right">
            <ul className="social-icons">
              <li>
                <FaInstagram />
              </li>
              <li>
                <FaLinkedinIn/>
              </li>
              <li>
                <FaXTwitter/>
              </li>
              <li>
                <FaFacebookF/>
              </li>
            </ul>
          </div>
        </div>
        <hr className="footer-divider" />
        <div className="footer-bottom">
          <p>© 2024 Veew. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer