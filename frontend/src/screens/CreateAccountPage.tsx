import Background from "../components/login/Background"; // Adjust the import path as needed
import CreateAccount from "../components/login/CreateAccount"; // Adjust the import path
import React from "react";

const CreateAccountPage: React.FC = () => {
  return (
    <Background>
      <div className="flex items-center justify-center h-full">
        {/* Column 1: Informational Text */}
        <div className="flex-1 flex items-center justify-center mx-4 text-white">
          <div className="max-w-md text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome!</h1>
            <p className="mb-4">
              Join <strong>Tournament Tracker</strong> and make managing your
              hockey tournaments a breeze.
            </p>
            <ul className="list-disc list-inside mb-4">
              <li>Cut down on time with automatic schedule generation,</li>
              <li>Make quick edits with drag and drop functionality,</li>
              <li>Effortlessly manage multiple teams and tournaments.</li>
            </ul>
            <p>Start simplifying your tournament organization today.</p>
          </div>
        </div>

        {/* Column 2: Create Account Form */}
        <div className="flex-1 flex items-center justify-center mx-4">
          <div className="w-full max-w-lg">
            {" "}
            {/* Adjust the width as needed */}
            <CreateAccount />
          </div>
        </div>
      </div>
    </Background>
  );
};

export default CreateAccountPage;
