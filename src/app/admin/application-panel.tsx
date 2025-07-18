import React from "react";

const ApplicationsPanel: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Applications</h2>
      <p className="text-slate-600">No applications at the moment.</p>
    </div>
  );
};

export default ApplicationsPanel;
