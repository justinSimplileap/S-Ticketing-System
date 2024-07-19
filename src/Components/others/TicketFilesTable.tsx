"use client";

import React from "react";
import { useForm } from "react-hook-form";

const TicketFilesTable = () => {
  const { handleSubmit } = useForm();

  const files = [
    { filename: "Document1.pdf", uploadedOn: "2024-07-09" },
    { filename: "Spreadsheet.xlsx", uploadedOn: "2024-07-08" },
    { filename: "Presentation.pptx", uploadedOn: "2024-07-07" },
  ];

  const handleDownload = (filename: string) => {
    console.log(`Downloading ${filename}`);
    console.log("tests")
  };

  return (
    <div>
      <table className="flex justify-between">
        <div>
          <thead>
            <tr>
              <th>Fil</th>
              <th>Uploaded On</th>
              <th>Actions</th>
            </tr>
          </thead>
        </div>

        <tbody>
          {files.map((file, index) => (
            <tr key={index}>
              <td>{file.filename}</td>
              <td>{file.uploadedOn}</td>
              <td>
                <button onClick={() => handleDownload(file.filename)}>
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketFilesTable;
