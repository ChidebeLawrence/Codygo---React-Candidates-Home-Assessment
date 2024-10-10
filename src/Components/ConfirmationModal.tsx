import React, { useEffect, useRef, useState } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  const [isZoomOut, setIsZoomOut] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleCancelClick = () => {
    setIsZoomOut(true);
    setTimeout(() => {
      onClose();
      setIsZoomOut(false);
    }, 500);
  };

  const handleConfirmClick = () => {
    setIsZoomOut(true);
    setTimeout(() => {
      onConfirm();
      setIsZoomOut(false);
    }, 500);
  };

  if (!isOpen && !isZoomOut) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-all duration-500 ${
        isZoomOut ? "animate-fadeOutZoomOut" : "animate-fadeInZoomIn"
      }`}
    >
      <div
        className={`bg-gray-800 rounded-lg shadow-lg p-4 max-w-sm w-full sm:p-6 transition-all duration-500 ${
          isZoomOut ? "animate-fadeOutZoomOut" : "animate-fadeInZoomIn"
        }`}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-modal-title"
        aria-describedby="confirmation-modal-description"
      >
        <div className="flex items-center mb-4">
          <h2
            id="confirmation-modal-title"
            className="text-lg sm:text-xl text-white ml-2"
          >
            Are you sure you want to delete this item?
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row justify-between">
          <button
            onClick={handleCancelClick}
            className="px-4 py-2 mb-2 sm:mb-0 bg-gray-600 rounded-md hover:bg-gray-500 focus:outline-none"
            aria-label="Cancel"
          >
            No, cancel
          </button>
          <button
            onClick={handleConfirmClick}
            className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-500 focus:outline-none"
            aria-label="Confirm deletion"
          >
            Yes, I’m sure
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
