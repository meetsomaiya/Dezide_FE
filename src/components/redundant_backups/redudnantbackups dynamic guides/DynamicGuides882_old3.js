import React from "react";
import "./DynamicGuides882.css";

const DynamicGuides882 = () => {
  return (
    <div className="dynamic-guides-882">
      <div className="header-882">
        {/* <h1>Dynamic Guides</h1> */}

      </div>
      <table className="table-882">
      {/* <h1>Dynamic Guides</h1> */}

        <thead>
        <button className="btn-create-882">Create New</button>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Taxonomy</th>
            <th>Language</th>
            <th>Last Change</th>
            <th>Published</th>
            <th>Created By</th>
            <th>Version</th>
          </tr>
        </thead>
        <tbody>
          {/* Placeholder rows */}
          <tr>
            <td><input type="checkbox" /></td>
            <td>Guide 1</td>
            <td>Category A</td>
            <td>English</td>
            <td>12 Nov 2024</td>
            <td>10 Oct 2024</td>
            <td>Admin</td>
            <td>1.0</td>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <td>Guide 2</td>
            <td>Category B</td>
            <td>French</td>
            <td>15 Nov 2024</td>
            <td>18 Oct 2024</td>
            <td>User</td>
            <td>1.1</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DynamicGuides882;
