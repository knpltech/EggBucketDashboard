export default function NeccTableSection() {
  const rows = [
    { date: "2023-10-27", rate: "₹5.50 per egg", remarks: "Standard rate applied" },
    { date: "2023-10-26", rate: "₹5.50 per egg", remarks: "Standard rate applied" },
    { date: "2023-10-25", rate: "₹5.30 per egg", remarks: "Standard rate applied" },
    { date: "2023-10-24", rate: "₹5.25 per egg", remarks: "Standard rate applied" },
  ];

  return (
    <div className="pt-17"> 
      {/* 🟠 Title */}
      <h1 className="text-3xl font-bold mb-6">NECC Rate</h1>

      {/* 🟠 Filters */}
      <div className='flex justify-between items-center gap-3 mb-6'>
        <div className='flex gap-5 ml-4'>
          <input type='date' className="border rounded-lg p-2" />
          <input type='date' className="border rounded-lg p-2" />
        </div>
        <div className='flex gap-5 mr-4'>
          <button className="border px-4 py-2 rounded-lg bg-orange-600 text-white">
            Download Data
          </button>

          <button className="border px-4 py-2 rounded-lg bg-orange-600 text-white">
            Last week
          </button>

          <button className="border px-4 py-2 rounded-lg">
            Last month
          </button>
        </div>
        
      </div>

      {/* 🟠 Table */}
      <table className="w-340 bg-white rounded-xl ml-3 shadow">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-700">
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">NECC Rate</th>
            <th className="py-3 px-4">Remarks</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b">
              <td className="py-3 px-3">{row.date}</td>
              <td className="py-3 px-3">{row.rate}</td>
              <td className="py-3 px-3">{row.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
