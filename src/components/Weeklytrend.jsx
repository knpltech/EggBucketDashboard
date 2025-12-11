import React from 'react'

const Weeklytrend = () => {
  return (
    <div className="bg-white align-center h-70 shadow rounded-xl p-3 mt-8">
      <h2 className="text-gray-600 text-sm">Weekly Trend</h2>
      <h1 className="text-3xl font-bold text-orange-600 mt-2">10.5k</h1>
      <p className="text-sm text-gray-500 mb-4">avg/day</p>

      <div className="h-24 w-50 flex items-end gap-2">
        <div className="bg-orange-200 w-6 h-8 rounded"></div>
        <div className="bg-orange-300 w-6 h-12 rounded"></div>
        <div className="bg-orange-400 w-6 h-16 rounded"></div>
        <div className="bg-orange-300 w-6 h-10 rounded"></div>
        <div className="bg-orange-200 w-6 h-6 rounded"></div>
        <div className="bg-orange-400 w-6 h-20 rounded"></div>
        <div className="bg-orange-300 w-6 h-14 rounded"></div>
      </div>
    </div>
  );
}

export default Weeklytrend
