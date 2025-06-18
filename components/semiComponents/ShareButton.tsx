"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface ShareButtonProps {
  title: string;
  slug: string;
  description?: string;
  domain?: string;
  className?: string;
}

const ShareButton = ({
  title,
  slug,
  description = "Check out this product",
  domain = "yourdomain.com",
  className = "",
}: ShareButtonProps) => {
  const [isSharing, setIsSharing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const productUrl = `https://${domain}/products/${slug}`;

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        toast.success("Link copied to clipboard!");
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
        toast.success("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
      toast.success("Failed to copy link");
    }
  };

  const handleShare = async () => {
    if (isSharing) return;

    setIsSharing(true);

    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `${description}: ${title}`,
          url: productUrl,
        });
        showToastMessage("Shared successfully!");
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Error sharing:", err);

          await copyToClipboard(productUrl);
        }
      }
    } else {
      await copyToClipboard(productUrl);
    }

    setIsSharing(false);
  };

  return (
    <>
      <div
        className={`relative p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 ${className}`}
      >
        <div
          onClick={handleShare}
          className={`cursor-pointer flex items-center justify-center ${
            isSharing ? "opacity-50" : "hover:scale-110"
          } transition-all duration-200`}
          aria-label={`Share ${title}`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleShare();
            }
          }}
        >
          {isSharing ? (
            <svg
              className="animate-spin h-5 w-5 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-600 hover:text-gray-800"
            >
              <path
                d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.34C15.11 18.55 15.08 18.77 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z"
                fill="currentColor"
              />
            </svg>
          )}
        </div>
      </div>

      {showToast && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg">
            {toastMessage}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translate(-50%, 20px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default ShareButton;
