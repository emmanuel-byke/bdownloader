import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react"; // or use any close icon library of your choice

export const Popup = ({ children, onClose, isOpen: controlledIsOpen, closeOnOutsideClick = true, hideCloseBtn=false }) => {
    // Use controlled state if provided, otherwise use internal state
    const [internalIsOpen, setInternalIsOpen] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const popupRef = useRef(null);
    
    const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
    const setIsOpen = controlledIsOpen !== undefined ? onClose || (() => {}) : setInternalIsOpen;

    // Handle animation on mount
    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => {
                setIsVisible(true);
            });
        }
    }, [isOpen]);

    // Handle click outside
    useEffect(() => {
        if (!closeOnOutsideClick || !isOpen) return;

        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                handleClose();
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, closeOnOutsideClick]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape' && isOpen) {
                handleClose();
            }
        };
        
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

    // Prevent body scroll when popup is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            setIsOpen(false);
            if (onClose) onClose();
        }, 200); // Match this with transition duration
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
        >
            {/* Backdrop with animation */}
            <div 
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                onClick={closeOnOutsideClick ? handleClose : undefined}
            />
            
            {/* Popup Container */}
            <div
                ref={popupRef}
                className={`relative w-full max-h-[99vh] bg-transparent rounded-xl shadow-2xl transform transition-all duration-200 ${
                    isVisible 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-4 scale-95'
                }`}
            >
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className={`absolute right-4 top-4 z-10 p-2 rounded-full hover:bg-bg active:bg-muted 
                        transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 
                        ${hideCloseBtn?'hidden':''}`}
                    aria-label="Close popup"
                >
                    <X className="w-5 h-5 text-text" />
                </button>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(99vh-2rem)]">
                    {children}
                </div>
            </div>
        </div>
    );
};