import "./App.css";
import logo from "./assets/images/logo-full.svg";
import upload from "./assets/images/icon-upload.svg";
import info from "./assets/images/icon-info.svg";
import { useState, useEffect } from "react";
import Ticket from "./components/Ticket"; // Import the Ticket component

function App() {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [githubUsername, setGithubUsername] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null); // State for image preview
  const [formValid, setFormValid] = useState<boolean>(false);
  const [ticketGenerated, setTicketGenerated] = useState<boolean>(false); // State to track ticket generation

  // Track if user has interacted with fields
  const [fullNameTouched, setFullNameTouched] = useState<boolean>(false);
  const [emailTouched, setEmailTouched] = useState<boolean>(false);
  const [githubUsernameTouched, setGithubUsernameTouched] = useState<boolean>(false);

  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
    setFullNameTouched(true); // Mark the field as touched
  };

  const handleEmailAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = e.target.value;

    setEmail(email);
    setEmailTouched(true); // Mark the field as touched

    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handleGithubUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGithubUsername(e.target.value);
    setGithubUsernameTouched(true); // Mark the field as touched
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name); // Store the file name

      // Create a FileReader to preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Set the image preview
      };
      reader.readAsDataURL(file); // Read the image file as a data URL
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (fullName === "" || email === "" || githubUsername === "") {
      alert("Required field empty");
    } else if (emailError) {
      alert("Please fix the email format before submitting.");
    } else {
      setTicketGenerated(true); // Show the ticket on successful submission
    }
  };

  // Form validation check
  const validateForm = () => {
    if (
      fullName !== "" &&
      email !== "" &&
      githubUsername !== "" &&
      emailError === "" &&
      fileName
    ) {
      setFormValid(true); // Enable submit button if form is valid
    } else {
      setFormValid(false); // Disable submit button if form is invalid
    }
  };

  // Call validateForm whenever a field changes
  useEffect(() => {
    validateForm();
  }, [fullName, email, githubUsername, emailError, fileName]);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="p-4">
        <img src={logo} alt="logo" />
      </div>
      <h1 className="text-white text-4xl font-bold font-inconsolata">
        Your Journey to Coding Conf <br /> 2025 Starts Here!
      </h1>
      <p className="text-slate-300 font-inconsolata mt-4">
        Secure your spot at next year's biggest coding conference.
      </p>

      {/* Display the ticket after form submission */}
      {ticketGenerated ? (
        <Ticket
          fullName={fullName}
          email={email}
          githubUsername={githubUsername}
          fileName={fileName}
          imagePreview={imagePreview} // Pass the image preview
        />
      ) : (
        <form className="flex flex-col gap-2 mt-4" onSubmit={handleSubmit}>
          <label htmlFor="upload" className="text-slate-300 text-left">
            Upload Avatar
          </label>
          <label
            htmlFor="file-upload"
            className="cursor-pointer p-8 rounded-lg border-2 border-dashed border-slate-300 text-slate-300 text-sm hover:border-gray-600 hover:bg-gray-800 transition"
          >
            <p className="mb-2">Drag and drop or click to upload</p>
            <img src={upload} alt="Upload Icon" className="w-8 h-8 mx-auto" />
          </label>

          <input
            id="file-upload"
            required
            type="file"
            className="hidden"
            onChange={handleFileChange}
            aria-describedby="file-hint"
          />
          <p
            id="file-hint"
            className="text-[#afaebb] flex text-[10px] gap-1 items-center"
            aria-live="polite"
          >
            <img src={info} alt="info-image" />
            upload your photo (JPG or PNG, max size: 500kb)
          </p>
          {fileName && <p className="text-slate-300">Selected file: {fileName}</p>}

          {/* Show the image preview if available */}
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Avatar Preview"
                className="w-32 h-32 object-cover rounded-full mx-auto"
              />
            </div>
          )}

          <label className="text-slate-300 font-inconsolata text-left" htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={handleUserName}
            name="fullName"
            id="name"
            aria-describedby="name-hint"
            className={`p-2 rounded-lg border bg-transparent outline-none text-slate-300 font-inconsolata w-full border-gray-400 ${
              fullNameTouched && fullName === "" ? "border-red-500" : ""
            }`}
          />
          <p id="name-hint" className="text-slate-300 text-xs">Enter your full name.</p>

          <label className="text-slate-300 font-inconsolata text-left" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmailAddress}
            id="email"
            placeholder="email123@gmail.com"
            aria-describedby="email-hint"
            className={`p-2 rounded-lg border bg-transparent outline-none text-slate-300 font-inconsolata w-full border-gray-400 ${
              emailTouched && emailError ? "border-red-500" : ""
            }`}
          />
          {emailError && emailTouched && <p className="text-red-500 text-xs">{emailError}</p>}
          <p id="email-hint" className="text-slate-300 text-xs">Enter a valid email address.</p>

          <label className="text-slate-300 font-inconsolata text-left" htmlFor="githubUsername">
            Github Username
          </label>
          <input
            type="text"
            name="githubUsername"
            value={githubUsername}
            onChange={handleGithubUsernameChange}
            placeholder="@yourusername"
            id="githubUsername"
            className={`p-2 rounded-lg border bg-transparent outline-none text-slate-300 font-inconsolata w-full border-gray-400 ${
              githubUsernameTouched && githubUsername === "" ? "border-red-500" : ""
            }`}
            aria-describedby="github-hint"
          />
          <p id="github-hint" className="text-slate-300 text-xs">Enter your GitHub username.</p>

          <button
            type="submit"
            className={`rounded-md py-2 font-inconsolata font-bold text-[#030335] ${
              formValid ? "bg-[#f57463]" : "bg-[#292828]" // Disabled button with different background color
            }`}
            disabled={!formValid} // Disable button if form is invalid
          >
            Generate My Ticket
          </button>
        </form>
      )}
    </div>
  );
}

export default App;
