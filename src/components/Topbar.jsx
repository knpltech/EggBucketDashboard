import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faChevronDown, faUser, faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const username = "Admin User"; // later replace with dynamic value from backend

  return (
    <div className="fixed top-4 left-72 right-4 h-16 bg-white shadow rounded-xl flex items-center justify-end px-6 gap-6 z-10">

      {/* Notification Bell */}
      <button className="p-2 text-gray-600 hover:text-orange-600 transition">
        <FontAwesomeIcon icon={faBell} size="lg" />
      </button>

      {/* Admin User + Dropdown */}
      <div className="relative flex items-center gap-3 cursor-pointer"
           onClick={() => setOpen(!open)}
      >
        {/* Admin Name */}
        <span className="font-medium text-gray-800">{username}</span>

        {/* Profile Image */}
        <i class="fa-solid fa-user "></i>

        {/* Down Arrow */}
        <FontAwesomeIcon icon={faChevronDown} className="text-gray-600" />

        {/* Dropdown Menu */}
        {open && (
          <div className="absolute top-14 right-0 w-40 bg-white shadow-lg rounded-lg border p-2">

            <div className="flex items-center gap-2 px-3 py-2 hover:bg-orange-50 rounded-lg">
              <FontAwesomeIcon icon={faUser} className="text-gray-600" />
              <span>View Profile</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 hover:bg-orange-50 rounded-lg">
              <FontAwesomeIcon icon={faGear} className="text-gray-600" />
              <span>Settings</span>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 hover:bg-orange-50 rounded-lg text-red-600">
              <FontAwesomeIcon icon={faRightFromBracket} />
              <span>Sign Out</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
