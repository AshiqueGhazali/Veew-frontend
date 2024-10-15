import React from 'react';
import './CircularMenu.css';

const CircularMenu: React.FC = () => {

  return (
    <div className="center">
      <div className="menu">
        <a href="#">
          <div className="item"></div>
          <div className="option">
            <span className="material-icons-round">home</span>
            <div className="name">Events</div>
          </div>
        </a>
        <a href="#">
          <div className="item"></div>
          <div className="option">
            <span className="material-icons-round">theaters</span>
            <div className="name">Tickets</div>
          </div>
        </a>
        <a href="#">
          <div className="item"></div>
          <div className="option">
            <span className="material-icons-round">music</span>
            <div className="name">Wallet</div>
          </div>
        </a>
        <a href="#">
          <div className="item"></div>
          <div className="option">
            <span className="material-icons-round">sports</span>
            <div className="name">Notification</div>
          </div>
          <div className="item"></div>
        </a>
      </div>
    </div>
  );
};

export default CircularMenu;
