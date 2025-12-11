
import Entryform from '../components/Entryform'
import Rateanalytics from '../components/Rateanalytics'
import Sidebar from '../components/Sidebar'
import Table from '../components/Table'
import Topbar from '../components/Topbar'

const Neccrate = () => {
  return (
    <div className="flex">
      <Sidebar/>
      <div className=" ml-64 bg-[#F8F6F2] min-h-screen p-6 w-340">
        <Topbar/>
        <Table/>
        <Rateanalytics/>
        <Entryform/>
      </div>
    </div>
  )
}

export default Neccrate
