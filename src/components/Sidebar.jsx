import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableCells,
  faEgg,
  faDollarSign,
  faWallet,
  faTruck,
  faStore,
  faChartLine,
  faUsers,
  faExclamationTriangle
} from "@fortawesome/free-solid-svg-icons";
import logo from '../assets/logo.png';

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/", icon: faTableCells },
    { name: "Daily Damages", path: "/damages", icon: faExclamationTriangle },
    { name: "NECC Rate", path: "/neccrate", icon: faEgg },
    { name: "Daily Sales", path: "/dailysales", icon: faDollarSign },
    { name: "Digital Payments", path: "/digital-payments", icon: faWallet },
    { name: "Cash Payments", path: "/cash-payments", icon: faDollarSign },
    { name: "Distribution", path: "/distribution", icon: faTruck },
    { name: "Outlets", path: "/outlets", icon: faStore },
    { name: "Reports", path: "/reports", icon: faChartLine },
    { name: "Users", path: "/users", icon: faUsers },
  ];

  return (
    <div className="fixed left-4 top-2 h-screen w-64 bg-[#F1E9DD] p-6 flex flex-col gap-6 shadow-md">
      
      <img src={logo} className="w-50 h-20"/>

      <nav className="flex flex-col gap-2">
        {menu.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all
                ${
                  isActive
                    ? "bg-orange-200 text-orange-700"
                    : "hover:bg-orange-100 text-gray-700"
                }
              `}
            >
              <FontAwesomeIcon icon={item.icon} className="text-lg" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className='mt-30'>
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
        <button className='ml-2 hover:cursor-pointer'>Sign Out</button>
      </div>

    </div>
  );
}
