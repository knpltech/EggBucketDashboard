import React from 'react'

const Entryform = () => {
  return (
    <div className="mt-10 pb-10">

      {/* Title */}
      <h1 className='text-3xl font-bold mb-6'>NECC Rate Entry Form</h1>

      {/* Form Container */}
      <div className="bg-white shadow rounded-xl p-6 ml-4 flex items-center gap-4">

        {/* Date */}
        <div>
            <p className='mb-2'>Date</p>
            <input
            type="date"
            required
            className="border rounded-lg p-2 w-55"
            />
        </div>
        

        {/* NECC Rate */}
        <div>
            <p className='mb-2'>NECC Rate ($)</p>
            <input
            type="number"
            placeholder="NECC Rate"
            required
            className="border rounded-lg p-2 w-55"
            />
        </div>
        

        {/* Remarks */}
        <div>
            <p className='mb-2'>Remarks(optional)</p>
             <input
                type="text"
                placeholder="Remarks (optional)"
                className="border rounded-lg p-2 w-150 flex-1"
                />
        </div>
       

        {/* Save Button */}
        <button className=" mt-6 ml-6 bg-orange-600 w-70 h-10 text-white px-6 py-2 rounded-xl font-semibold cursor-pointer">
          Save Data
        </button>
      </div>
    </div>
  )
}

export default Entryform
