import React from "react";
import "./DynamicGuides882.css";

const DynamicGuides882 = () => {
  const tableData = [
    {
      select: false,
      name: "FM283 Pitch_EmergencyRun",
      taxonomy: ["S9x Emerson V1", "S9x Woodward V2", "India"],
      language: "🇺🇸",
      lastChange: "Nov 18, 2024 12:07",
      lastChangeBy: "Ruchika K",
      published: "Aug 12, 2021 15:02",
      createdBy: "Jignesh Limbani",
      version: 637,
    },
    {
      select: false,
      name: "FM103 Elec_SafetyChainStop",
      taxonomy: ["S9x Emerson V1", "S9x Woodward V2", "India"],
      language: "🇺🇸",
      lastChange: "Nov 18, 2024 11:41",
      lastChangeBy: "Ruchika K",
      published: "Oct 09, 2018 16:48",
      createdBy: "Makarand Nandrekar",
      version: 488,
    },
    // Add more rows as needed
  ];

  return (
    <div className="layout-container-882">
      {/* Sidebar */}
      <div className="sidebar-882">
        <ul>
          <li>Dashboard</li>
          <li>Dynamic Guides</li>
          <li>Static Guides</li>
          <li>FAQs</li>
          <li>Media</li>
          <li>Contact Center</li>
        </ul>
      </div>

      {/* Main Content (Table) */}
      <div className="content-882">
        <div className="dynamic-guides-container-882">
          <table className="dynamic-guides-table-882">
            <thead>
              <tr>
                <th>Select</th>
                <th>Name</th>
                <th>Taxonomy</th>
                <th>Language</th>
                <th>Last Change</th>
                <th>Last Change By</th>
                <th>Published</th>
                <th>Created By</th>
                <th>Version</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>
                    <input type="checkbox" checked={row.select} />
                  </td>
                  <td>{row.name}</td>
                  <td>
                    {row.taxonomy.map((tag, i) => (
                      <span key={i} className="taxonomy-tag-882">
                        {tag}
                      </span>
                    ))}
                  </td>
                  <td>{row.language}</td>
                  <td>{row.lastChange}</td>
                  <td>{row.lastChangeBy}</td>
                  <td>{row.published}</td>
                  <td>{row.createdBy}</td>
                  <td>{row.version}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DynamicGuides882;
