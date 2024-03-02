import React from "react";

interface EmptyStateProps {
  title: string;
  content: string;
  buttonText: string;
  buttonIcon: React.ReactNode;
  buttonFunction: () => void;
}

export default function EmptyState({
  title,
  content,
  buttonText,
  buttonIcon,
  buttonFunction,
}: EmptyStateProps) {
  return (
    <div className="flex justify-center items-center h-full w-full flex-col gap-4">
      <h1 className="text-6xl font-bold text-primary mb-2">{title}</h1>
      <p className="text-lg text-secondary mb-4">{content}</p>
      <button
        className="btn btn-primary flex items-center gap-2"
        onClick={buttonFunction} // Directly use buttonFunction without wrapping
      >
        <span>{buttonText}</span>
        {buttonIcon}
      </button>
    </div>
  );
}
