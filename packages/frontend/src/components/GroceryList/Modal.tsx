import React, { useRef } from "react";
import './Modal.css'

interface Modal {
    children: React.ReactNode;
    isOpen: boolean;
    onCloseRequested: () => void; 
    headerLabel: string;
}

function Modal(props : Modal) {
    if (!props.isOpen) return null;
  
    const dialogRef = useRef<HTMLDivElement>(null);
    function handleOverlayClick(event: React.MouseEvent<HTMLDivElement>) {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        props.onCloseRequested();
      }
    }
  
  
    return (
        <div className="overlay" onClick={handleOverlayClick}>
        <div className="dialog" ref={dialogRef}>
          <header className="dialog-header">
            <b className="dialog-title">{props.headerLabel}</b>
            <button onClick={props.onCloseRequested} aria-label="Close">
              X
            </button>
          </header>
          <div className="dialog-content">{props.children}</div>
        </div>
      </div>
    );
}

export default Modal;