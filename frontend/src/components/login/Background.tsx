import React from "react";

interface BackgroundProps {
  children: React.ReactNode; // Accepts any react node as children
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <div
      className="bg-no-repeat bg-cover bg-center relative flex h-screen"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1515703407324-5f753afd8be8?q=80&w=4032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

      {/* Content */}
      <div className="z-20 w-full">{children}</div>
    </div>
  );
};

export default Background;
