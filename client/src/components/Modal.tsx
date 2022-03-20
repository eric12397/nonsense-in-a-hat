import React from "react";

interface ModalProps {
  isOpen: boolean;
  toggle: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, toggle, children }: ModalProps) => {
  return isOpen ? (
    <div className="fixed inset-0">
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto" onClick={ toggle }></div>
      <div className="relative top-1/2 right-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-1/4 p-5 items-center border shadow-lg rounded-md bg-white">
        <div className="flex justify-end">
          <button className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" onClick={ toggle } >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
          </button>
        </div>
        { children }
      </div>
    </div>
  ) : null;
};

export default Modal;
