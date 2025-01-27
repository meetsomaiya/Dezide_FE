import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faFileAlt, faBook, faQuestionCircle, faPhotoVideo, faHeadset, faChevronLeft, faChevronRight, faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import './Sidebar991.css';

const Sidebar991 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMediaExpanded, setIsMediaExpanded] = useState(false);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const handleClick = (path) => {
    setActiveItem(path);
    navigate(path);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMediaSubmenu = () => {
    setIsMediaExpanded(!isMediaExpanded);
  };

  return (
    <div className={`sidebar-991 ${isCollapsed ? 'collapsed-991' : ''}`}>
      <div className="toggle-button-991" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={isCollapsed ? faChevronRight : faChevronLeft} />
      </div>
      <ul>
        <li className={activeItem === '/dashboard' ? 'active-991' : ''}>
          <Link to="/dashboard" onClick={() => handleClick('/dashboard')}>
            <FontAwesomeIcon icon={faTachometerAlt} /> {!isCollapsed && 'Dashboard'}
          </Link>
        </li>
        <li className={activeItem === '/dynamic-guides' ? 'active-991' : ''}>
          <Link to="/dynamic-guides" onClick={() => handleClick('/dynamic-guides')}>
            <FontAwesomeIcon icon={faFileAlt} /> {!isCollapsed && 'Dynamic Guides'}
          </Link>
        </li>
        {/* <li className={activeItem === '/static-guides' ? 'active-991' : ''}>
          <Link to="/static-guides" onClick={() => handleClick('/static-guides')}>
            <FontAwesomeIcon icon={faBook} /> {!isCollapsed && 'Static Guides'}
          </Link>
        </li>
        <li className={activeItem === '/faqs' ? 'active-991' : ''}>
          <Link to="/faqs" onClick={() => handleClick('/faqs')}>
            <FontAwesomeIcon icon={faQuestionCircle} /> {!isCollapsed && 'FAQs'}
          </Link>
        </li> */}
        <li>
          <div className="media-header" onClick={toggleMediaSubmenu}>
            <FontAwesomeIcon icon={faPhotoVideo} />
            {!isCollapsed && (
              <>
                {' Media '}
                <FontAwesomeIcon icon={isMediaExpanded ? faCaretDown : faCaretRight} />
              </>
            )}
          </div>
          {isMediaExpanded && !isCollapsed && (
            <ul className="media-submenu">
              <li className={activeItem === '/media/images' ? 'active-991' : ''}>
                <Link to="/images" onClick={() => handleClick('/images')}>
                  Images
                </Link>
              </li>
              <li className={activeItem === '/media/videos' ? 'active-991' : ''}>
                <Link to="/videos" onClick={() => handleClick('/videos')}>
                  Videos
                </Link>
              </li>
              <li className={activeItem === '/media/files' ? 'active-991' : ''}>
                <Link to="/files" onClick={() => handleClick('/files')}>
                  Files
                </Link>
              </li>
            </ul>
          )}
        </li>
        {/* <li className={activeItem === '/contact-center' ? 'active-991' : ''}>
          <Link to="/contact-center" onClick={() => handleClick('/contact-center')}>
            <FontAwesomeIcon icon={faHeadset} /> {!isCollapsed && 'Contact Center'}
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar991;
