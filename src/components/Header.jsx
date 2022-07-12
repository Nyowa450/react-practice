import React from 'react';
import CoverImage from './images/cover-img.jpg';
import ProfileImage from './images/profile-img.jpg';
import { FaTwitter, FaGithub } from 'react-icons/fa';

export const Header = () => {
  return (
    <header
      className="main-cover"
      style={{ backgroundImage: `url(${CoverImage})` }}
    >
      <div className="overlay"></div>
      <div className="container">
        <div className="display-table">
          <div className="display-table-contents">
            <div
              className="profile-thumb"
              style={{ backgroundImage: `url(${ProfileImage})` }}
            ></div>
            {/* 名前と肩書はみなさんのお名前や肩書を自由に入れてください */}
            <h1 className="title-text">深草かどま</h1>
            <h3 className="title-text">Engeneer/Designer</h3>
            <ul className="social-icons">
              <li className="icon-link">
                <FaTwitter color="white" size="2rem" />
              </li>
              <li className="icon-link">
                <FaGithub color="white" size="2rem" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};
