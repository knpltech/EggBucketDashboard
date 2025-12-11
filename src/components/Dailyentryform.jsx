import React from 'react'

const Dailyentryform = () => {
  return (
    <div className="bg-white shadow rounded-xl p-6 m-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Daily Sales Entry</h1>
        <button className="px-3 py-1 text-sm border rounded-lg ">New Entry</button>
      </div>

      <div className="mt-4">
        <label className="text-gray-600 text-sm">Select Date</label>
        <input type="date" className="border rounded-lg w-full p-2 mt-1" />
      </div>

      {/* 5 Outlets */}
      <div className="grid grid-cols-3 gap-4 mt-4">

        <div>
          <label className="text-gray-600 text-sm mb-4">AECS Layout</label>
          <input type="number" placeholder='eggs' className="border p-2 rounded-lg w-full" />
        </div>

        <div>
          <label className="text-gray-600 text-sm m-2">Bandepalya</label>
          <input type="number" className="border p-2 rounded-lg w-full" />
        </div>

        <div>
          <label className="text-gray-600 text-sm">Hosa Road</label>
          <input type="number" className="border p-2 rounded-lg w-full" />
        </div>

        <div>
          <label className="text-gray-600 text-sm">Singasandra</label>
          <input type="number" className="border p-2 rounded-lg w-full" />
        </div>

        <div>
          <label className="text-gray-600 text-sm">Kudlu Gate</label>
          <input type="number" className="border p-2 rounded-lg w-full" />
        </div>

      </div>

      {/* Save Button */}
      <div className="mt-4 flex justify-end">
        <button className="bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold">
          Save Entry
        </button>
      </div>
    </div>
  );
}

export default Dailyentryform
