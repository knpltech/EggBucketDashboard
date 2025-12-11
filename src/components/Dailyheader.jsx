import React from 'react'

const Dailyheader = () => {
  return (
    <div className="mb-6 pt-17 ml-5 flex item-center">
        <div className='mt-3'>
            <h1 className="text-3xl font-bold">Daily Sales</h1>
            <p className="text-gray-600">Manage and track daily egg sales across all outlets.</p>
        </div>

        <div className=" ml-30 flex item-center gap-4 mt-4">

            <input 
            type="date" 
            placeholder="Oct 1, 2023 - Oct 25, 2023" 
            className="border rounded-lg px-10 p-2"
            />

            <button className="border px-15 py-2 rounded-lg">Last Week</button>
            <button className="border px-10 py-2 rounded-lg">Last Month</button>

                <button className="bg-orange-600 text-white px-10 py-2 rounded-lg">
                    Download
                </button>
            

        </div>
        
    </div>
  )
}

export default Dailyheader
