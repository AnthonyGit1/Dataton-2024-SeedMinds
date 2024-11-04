import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './card';
import { InsightButton, InsightModal } from './InsightModal';

const StatCard = ({ title, value, description, icon: Icon, iconColor, insight }) => {
  const [showInsight, setShowInsight] = useState(false);

  return (
    <>
      <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium text-gray-600">
            {title}
          </CardTitle>
          <div className="flex items-center gap-2">
            <InsightButton onClick={() => setShowInsight(true)} />
            {Icon && <Icon className={`h-5 w-5 ${iconColor}`} />}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <div className="text-2xl font-bold text-gray-900">
              {value}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {description}
            </p>
          </div>
        </CardContent>
      </Card>

      <InsightModal
        isOpen={showInsight}
        onClose={() => setShowInsight(false)}
        title={`Insights: ${title}`}
      >
        <div className="space-y-4">
          {insight.summary && (
            <p className="text-lg text-gray-700 font-medium">
              {insight.summary}
            </p>
          )}
          {insight.details && (
            <div className="space-y-2">
              {insight.details.map((detail, index) => (
                <div key={index} className="flex gap-2">
                  <span className="text-purple-600">•</span>
                  <p className="text-gray-600">{detail}</p>
                </div>
              ))}
            </div>
          )}
          {insight.recommendation && (
            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-800 mb-2">Recomendación</h4>
              <p className="text-purple-700">{insight.recommendation}</p>
            </div>
          )}
        </div>
      </InsightModal>
    </>
  );
};

export default StatCard;