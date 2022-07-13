import React from 'react';
import '../styles/Footer.scss';
import { BsLinkedin, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="footer-dark">
      <footer>
        <div className="container footer-container">
          <div>
            <h3>About</h3>
            <ul>
              <li>
                <a
                  href="https://tonic3.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Company
                </a>
              </li>
              <li>
                <a href="/">Team</a>
              </li>
            </ul>
          </div>

          <div>
            <h3>Contact</h3>
            <div className="item social">
              <a
                href="https://twitter.com/tonic3com?lang=es"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsTwitter></BsTwitter>
              </a>
              <a
                href="https://www.instagram.com/tonic.3/?hl=es"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsInstagram></BsInstagram>
              </a>
              <a
                href="https://github.com/marshelaillon/tonic3-api"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsGithub></BsGithub>
              </a>
              <a
                href="https://www.linkedin.com/company/tonic3/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsLinkedin></BsLinkedin>
              </a>
            </div>
          </div>

          <div>
            <p className="copyright copyright-border">
              Virtual Events T3 ©2022
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
