import React, { useEffect, useRef } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose(); // Close modal if clicked outside
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = ""; // Restore scrolling when modal is closed
    };
  }, [isOpen, onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div 
        className="bg-gray-800 rounded-lg shadow-lg p-4 max-w-sm w-full sm:p-6" 
        ref={modalRef}
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="confirmation-modal-title"
        aria-describedby="confirmation-modal-description"
      >
        <div className="flex items-center mb-4">
          <h2 id="confirmation-modal-title" className="text-lg sm:text-xl text-white ml-2">
            Are you sure you want to delete this item?
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 mb-2 sm:mb-0 bg-gray-600 rounded-md hover:bg-gray-500 focus:outline-none"
            aria-label="Cancel"
          >
            No, cancel
          </button>
          <button
            onClick={onConfirm}
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
