import React from 'react'
import Topbar from '../components/Topbar'
import Distributorcomp from '../components/Distributorcomp'
import Sidebar from '../components/Sidebar'

const Distributor = () => {
  return (
    <div classname='flex'>
      <Sidebar/>
      <div className='ml-64 bg-[#F8F6F2] min-h-screen p-6 w-340'>
        <Topbar/>
      <Distributorcomp/>
      </div>
    </div>
  )
}

export default Distributor;
