import React from 'react';
import Sidebar991 from './Sidebar991';
import './Images009.css';

const Videos010 = () => {
  const images = [
    { name: 'F58 LSC IGBT not switched.PNG', id: 1 },
    { name: 'F9 sync fault.PNG', id: 2 },
    { name: 'F9 Sync fault due to gen rotor.PNG', id: 3 },
    { name: 'F34 DR1.PNG', id: 4 },
    { name: 'Module channel bad.PNG', id: 5 },
    { name: 'Another example.PNG', id: 6 },
    { name: 'Image 7 example.PNG', id: 7 },
    { name: 'Image 8 example.PNG', id: 8 },
    { name: 'Image 9 example.PNG', id: 9 },
    { name: 'Extra image.PNG', id: 10 },
  ];

  return (
    <div className="container009">
      <Sidebar991 />
      <div className="images-section009">
        <h1 className="header009">Images</h1>
        <div className="filter-bar009">
          <button className="filter-button009">Filter</button>
          <input
            type="text"
            className="search-box009"
            placeholder="Search"
          />
        </div>
        <div className="image-grid009">
          {images.map((image) => (
            <div key={image.id} className="image-card009">
              <div className="image-placeholder009"></div>
              <p className="image-name009">{image.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="details-section009">
        <h2 className="details-header009">Details</h2>
        <p className="details-text009">No image selected.</p>
      </div>
    </div>
  );
};

export default Videos010;
