import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./EditExplanation.css";

const EditExplanation = () => {
  const location = useLocation();
  const { modalName = "N/A", actionName = "N/A" } = location.state || {}; // Safely retrieve data with defaults

  const [editorContent, setEditorContent] = useState(""); // For the main content
  const [changeDescription, setChangeDescription] = useState(""); // For tracking changes
  const [imageList, setImageList] = useState([]); // For storing gallery images
  const [selectedImage, setSelectedImage] = useState(null); // Selected image from the gallery
  const [isGalleryVisible, setIsGalleryVisible] = useState(false); // Track the visibility of the gallery modal

  // Fetch Action Explanation from API
  useEffect(() => {
    const fetchActionExplanation = async () => {
      try {
        const response = await fetch(
          `http://localhost:226/api/fetch_action_explanation?actionName=${encodeURIComponent(actionName)}`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("API Response:", data); // Log the API response

          // Update editor content with explanation and image
          const explanation = data.actionData.actionExplanation || "";
          const base64Image = data.actionData.image || null;

          // Create HTML content to include in the editor
          let content = `<p>${explanation}</p>`;
          if (base64Image) {
            content += `<img src="${base64Image}" alt="Action Image" style="max-width:100%; margin-top:10px;" />`;
          }

          setEditorContent(content); // Set the combined explanation and image in the editor
        } else {
          console.error("Error fetching data:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error in fetch request:", error);
      }
    };

    const fetchImageGallery = async () => {
      try {
        const response = await fetch(`http://localhost:226/api/fetch_image_gallery`, {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          setImageList(data.images || []); // Populate the image gallery
        } else {
          console.error("Error fetching image gallery:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error fetching image gallery:", error);
      }
    };

    fetchActionExplanation();
    fetchImageGallery();
  }, [actionName]); // Dependency ensures this runs when actionName changes

  const handleImageInsert = (image) => {
    setSelectedImage(image);
    const updatedContent = `${editorContent}<img src="${image}" alt="Inserted Image" style="max-width:100%; margin-top:10px;" />`;
    setEditorContent(updatedContent);
  };

  return (
    <div className="blog-editor-container">
      {/* Modal Name */}
      <p className="modal-name">{modalName}</p>

      {/* Action Name */}
      <div className="action-name-container">
        {/* <p>Action Name:</p> */}
        <input
          type="text"
          value={actionName}
          readOnly
          className="action-input"
        />
      </div>

      {/* Toolbar */}
      <div className="toolbar-container">
        <button className="toolbar-button">B</button>
        <button className="toolbar-button">I</button>
        <button className="toolbar-button">U</button>
        <button className="toolbar-button" onClick={() => setIsGalleryVisible(true)}>
          Image
        </button>
        <button className="toolbar-button">Table</button>
      </div>

      {/* Editor Box */}
      <div className="editor-box">
        <ReactQuill
          value={editorContent}
          onChange={setEditorContent}
          placeholder="Write your content here..."
        />
      </div>

      {/* Image Gallery Modal */}
      {isGalleryVisible && (
        <div className="image-modal">
          <div className="modal-header">
            <h3>Insert Media</h3>
            <button className="close-button" onClick={() => setIsGalleryVisible(false)}>
              &times;
            </button>
          </div>
          <div className="modal-content">
            <div className="modal-sidebar">
              <div className="media-section">
                <button className="media-tab active-tab">Images</button>
                <button className="media-tab">Videos</button>
              </div>
            </div>
            <div className="modal-main">
              <div className="search-section">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search media..."
                />
                <button className="search-btn">Search</button>
                <button className="select-media-btn">Select Media</button>
              </div>
              <div className="image-gallery">
                {imageList.length > 0 ? (
                  imageList.map((image, index) => (
                    <div className="image-container" key={index}>
                      <img
                        src={image}
                        alt={`Image ${index}`}
                        className="thumbnail-image"
                        onClick={() => handleImageInsert(image)}
                      />
                      <p className="image-label">Image {index + 1}</p>
                    </div>
                  ))
                ) : (
                  <div className="no-images">
                    <p>No Images Found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="insert-button" onClick={() => setSelectedImage(null)}>
              Insert
            </button>
            <button className="cancel-button" onClick={() => setIsGalleryVisible(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="footer-container">
        <div className="language-indicator">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg"
            alt="US Flag"
            className="flag-icon"
          />
          <p>You are writing content in English</p>
        </div>
        <input
          type="text"
          placeholder="What did you change?"
          value={changeDescription}
          onChange={(e) => setChangeDescription(e.target.value)}
          className="change-input"
        />
        <div className="button-group">
          <button className="save-close-button">Save and Close</button>
          <button className="save-button">Save</button>
          <button className="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditExplanation;
