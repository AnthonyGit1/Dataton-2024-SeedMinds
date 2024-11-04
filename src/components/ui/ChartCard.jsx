import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { LightbulbIcon, X } from 'lucide-react';

const InsightModal = ({ isOpen, onClose, title, children }) => {
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

export const ChartCard = ({ children, insight, className = '' }) => {
  const [showInsight, setShowInsight] = useState(false);

  return (
    <Card className={`bg-white shadow-lg relative ${className}`}>
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setShowInsight(true)}
          className="p-2 rounded-full hover:bg-purple-50 text-purple-600 transition-colors"
          title="Ver insights"
        >
          <LightbulbIcon className="h-5 w-5" />
        </button>
      </div>

      {children}

      <InsightModal
        isOpen={showInsight}
        onClose={() => setShowInsight(false)}
        title={`Insights: ${insight.title}`}
      >
        <div className="space-y-4">
          <p className="text-lg text-gray-700 font-medium">
            {insight.summary}
          </p>
          <div className="space-y-2">
            {insight.details.map((detail, index) => (
              <div key={index} className="flex gap-2">
                <span className="text-purple-600">•</span>
                <p className="text-gray-600">{detail}</p>
              </div>
            ))}
          </div>
          {insight.recommendation && (
            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-2">Recomendación</h4>
              <p className="text-purple-700">{insight.recommendation}</p>
            </div>
          )}
        </div>
      </InsightModal>
    </Card>
  );
};