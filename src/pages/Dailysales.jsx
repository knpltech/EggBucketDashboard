import React from 'react'
import Topbar from '../components/Topbar'
import Dailyheader from '../components/Dailyheader'
import DailyTable from '../components/DailyTable'
import Dailyentryform from '../components/Dailyentryform'
import Weeklytrend from '../components/Weeklytrend'
import Sidebar from '../components/Sidebar'

const Dailysales = () => {
  return (
    <div className='flex'>
      <Sidebar/>
      <div className='ml-64 bg-[#F8F6F2] min-h-screen p-6 w-340'>

      <Topbar/>
      <Dailyheader/>
      <DailyTable/>
      <div className="grid grid-cols-3 gap-6 mt-10">

        {/* Entry Form (biggest block) */}
        <div className="col-span-2">
          <Dailyentryform />
        </div>

        <div className="flex flex-col">
          {/* Weekly Trend */}
          <Weeklytrend />
        </div>

      </div>
    </div>
    </div>
  )
}

export default Dailysales
