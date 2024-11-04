import React from 'react';
import { X, LightbulbIcon } from 'lucide-react';

export const InsightButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="p-2 rounded-full hover:bg-purple-50 text-purple-600 transition-colors"
    title="Ver insights"
  >
    <LightbulbIcon className="h-5 w-5" />
  </button>
);

export const InsightModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        <div 
          className="fixed inset-0 transition-opacity bg-black bg-opacity-50"
          onClick={onClose}
        />
        
        <div className="relative z-50 w-full max-w-2xl p-6 mx-auto bg-white rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-500 transition-colors rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mt-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};