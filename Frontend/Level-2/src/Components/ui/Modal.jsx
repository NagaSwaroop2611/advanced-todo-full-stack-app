import React, { useEffect } from "react";

export default function Modal({ isOpen, onClose, children }) {
  useEffect(() => {
    
    const handleKeyDown = (e) => {
      // console.log(e.key);
      
      if (e.key === "Escape" && typeof onClose === "function") {
        console.log("Hi");
        
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div>
      <div
        className="overlay-style"
        onClick={typeof onClose === "function" ? onClose : undefined}
      />
      <div className="modal-style">{children}</div>
    </div>
  );
}
