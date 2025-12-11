export default function DailyTable() {
  const data = [
    {
      date: "Oct 25, 2023",
      aecs: 2300,
      bandepalya: 1950,
      hosaRoad: 2900,
      singasandra: 1300,
      kudluGate: 2150,
      total: 10600,
    },
    {
      date: "Oct 24, 2023",
      aecs: 2400,
      bandepalya: 1850,
      hosaRoad: 3100,
      singasandra: 1200,
      kudluGate: 2050,
      total: 10600,
    },
    {
      date: "Oct 23, 2023",
      aecs: 2350,
      bandepalya: 1900,
      hosaRoad: 3050,
      singasandra: 1150,
      kudluGate: 2100,
      total: 10550,
    }
  ];

  // 👉 Column Totals
  const totals = {
    aecs: data.reduce((sum, row) => sum + row.aecs, 0),
    bandepalya: data.reduce((sum, row) => sum + row.bandepalya, 0),
    hosaRoad: data.reduce((sum, row) => sum + row.hosaRoad, 0),
    singasandra: data.reduce((sum, row) => sum + row.singasandra, 0),
    kudluGate: data.reduce((sum, row) => sum + row.kudluGate, 0),
  };

  const grandTotal = Object.values(totals).reduce((sum, val) => sum + val, 0);

  return (
    <div className="bg-white ml-4 rounded-xl shadow p-6">
      <table className="w-full h-15 text-left ">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">AECS Layout</th>
            <th className="py-2 px-4">Bandepalya</th>
            <th className="py-2 px-4">Hosa Road</th>
            <th className="py-2 px-4">Singasandra</th>
            <th className="py-2 px-4">Kudlu Gate</th>
            <th className="py-2 px-4">Total</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b h-15">
              <td className="py-2 px-4">{row.date}</td>
              <td className="py-2 px-4">{row.aecs}</td>
              <td className="py-2 px-4">{row.bandepalya}</td>
              <td className="py-2 px-4">{row.hosaRoad}</td>
              <td className="py-2 px-4">{row.singasandra}</td>
              <td className="py-2 px-4">{row.kudluGate}</td>
              <td className="py-2 px-4 font-semibold text-orange-600">{row.total}</td>
            </tr>
          ))}

          {/* ⭐ COLUMN TOTAL ROW (GRAND TOTAL) */}
          <tr className="bg-orange-50 font-semibold text-orange-700">
            <td className="py-3 px-4">Grand Total</td>
            <td className="py-3 px-4">{totals.aecs.toLocaleString()}</td>
            <td className="py-3 px-4">{totals.bandepalya.toLocaleString()}</td>
            <td className="py-3 px-4">{totals.hosaRoad.toLocaleString()}</td>
            <td className="py-3 px-4">{totals.singasandra.toLocaleString()}</td>
            <td className="py-3 px-4">{totals.kudluGate.toLocaleString()}</td>
            <td className="py-3 px-4 text-orange-800">{grandTotal.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>

      <p className="mt-4 text-sm text-gray-500">
        Showing {data.length} out of 24 days
      </p>
    </div>
  );
}
