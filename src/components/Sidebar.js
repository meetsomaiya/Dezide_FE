import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faFileAlt, faBook, faQuestionCircle, faPhotoVideo, faHeadset } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(location.pathname);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const handleClick = (path) => {
    setActiveItem(path);
    navigate(path);
  };

  return (
    <div className="sidebar-001">
      <ul>
        <li className={activeItem === '/dashboard' ? 'active-001' : ''}>
          <Link to="/dashboard" onClick={() => handleClick('/dashboard')}>
            <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
          </Link>
        </li>
        <li className={activeItem === '/dynamic-guides' ? 'active-001' : ''}>
          <Link to="/dynamic-guides" onClick={() => handleClick('/dynamic-guides')}>
            <FontAwesomeIcon icon={faFileAlt} /> Dynamic Guides
          </Link>
        </li>
        <li className={activeItem === '/static-guides' ? 'active-001' : ''}>
          <Link to="/static-guides" onClick={() => handleClick('/static-guides')}>
            <FontAwesomeIcon icon={faBook} /> Static Guides
          </Link>
        </li>
        <li className={activeItem === '/faqs' ? 'active-001' : ''}>
          <Link to="/faqs" onClick={() => handleClick('/faqs')}>
            <FontAwesomeIcon icon={faQuestionCircle} /> FAQs
          </Link>
        </li>
        <li className={activeItem === '/media' ? 'active-001' : ''}>
          <Link to="/media" onClick={() => handleClick('/media')}>
            <FontAwesomeIcon icon={faPhotoVideo} /> Media
          </Link>
        </li>
        <li className={activeItem === '/contact-center' ? 'active-001' : ''}>
          <Link to="/contact-center" onClick={() => handleClick('/contact-center')}>
            <FontAwesomeIcon icon={faHeadset} /> Contact Center
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
