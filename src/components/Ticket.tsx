import React from "react";

interface TicketProps {
  fullName: string;
  email: string;
  githubUsername: string;
  fileName: string | null;
  imagePreview: string | null; // New prop for image preview
}

const Ticket: React.FC<TicketProps> = ({
  fullName,
  email,
  githubUsername,
  fileName,
  imagePreview,
}) => {
  return (
    <div>
      <div className="mt-4 p-4 rounded-lg bg-[#1e1e1e]">
        <h2 className="text-white text-2xl font-bold">Your Conference Ticket</h2>
        <p className="text-slate-300">Name: {fullName}</p>
        <p className="text-slate-300">Email: {email}</p>
        <p className="text-slate-300">GitHub Username: {githubUsername}</p>
        <p className="text-slate-300">Avatar: {fileName}</p>
        
        {/* Render the image preview if available */}
        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Avatar Preview"
              className="w-32 h-32 object-cover rounded-full mx-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Ticket;
