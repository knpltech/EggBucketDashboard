// src/pages/AddDistributor.jsx
import { useEffect, useMemo, useState } from "react";

/*
  AddDistributor.jsx
  - Frontend-only, dynamic and responsive "Add Distributor" page
  - Persists distributors to localStorage (key: "egg_distributors_v1")
  - Validates required fields and password match
  - Access Role: single-select tile radio (exactly one)
  - Responsive layout & Tailwind utility classes consistent with other pages
*/

const STORAGE_KEY = "egg_distributors_v1";

const ACCESS_MODULES = [
  { key: "dailySales", title: "Daily Sales", desc: "Manage daily egg sales records." },
  { key: "digitalPayments", title: "Digital Payments", desc: "Process UPI and card payments." },
  { key: "cashPayments", title: "Cash Payments", desc: "Log and verify cash transactions." },
  { key: "outlets", title: "Outlets", desc: "Manage distribution outlets." },
  { key: "reports", title: "Reports", desc: "View analytics and downloads." },
];

const SAMPLE = [
  {
    id: 1,
    fullName: "Karthik Rao",
    phone: "+91 98765 12345",
    username: "karthik.rao",
    module: "dailySales",
  },
];

function RadioTile({ active, onClick, title, desc }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-start gap-4 rounded-xl px-4 py-4 text-left border transition-shadow w-full ${
        active
          ? "border-orange-300 bg-orange-50 shadow-sm"
          : "border-gray-100 bg-white hover:shadow-sm"
      }`}
    >
      <div className={`h-5 w-5 flex items-center justify-center rounded-full border ${active ? "border-orange-400" : "border-gray-300"}`}>
        <div className={`h-2.5 w-2.5 rounded-full ${active ? "bg-orange-500" : "bg-transparent"}`} />
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-gray-900">{title}</div>
        </div>
        <div className="mt-1 text-xs text-gray-500">{desc}</div>
      </div>
    </button>
  );
}

export default function AddDistributor() {
  // load / persist
  const [distributors, setDistributors] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return SAMPLE;
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : SAMPLE;
    } catch {
      return SAMPLE;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(distributors));
    } catch {}
  }, [distributors]);

  // form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedModule, setSelectedModule] = useState(""); // single-select

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState({});
  const [savedMessage, setSavedMessage] = useState("");

  // simple derived metrics
  const metrics = useMemo(() => {
    return {
      total: distributors.length,
      dailySales: distributors.filter((d) => d.module === "dailySales").length,
    };
  }, [distributors]);

  const resetForm = () => {
    setFullName("");
    setPhone("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setSelectedModule("");
    setErrors({});
    setShowPassword(false);
    setShowConfirm(false);
    setSavedMessage("");
  };

  const validate = () => {
    const e = {};
    if (!fullName.trim()) e.fullName = "Full name is required.";
    if (!phone.trim()) e.phone = "Phone number is required.";
    if (!username.trim()) e.username = "Username is required.";
    if (!password) e.password = "Password is required.";
    if (!confirmPassword) e.confirmPassword = "Confirm the password.";
    if (password && confirmPassword && password !== confirmPassword) e.confirmPassword = "Passwords do not match.";
    if (!selectedModule) e.selectedModule = "Select exactly one access module.";
    return e;
  };

  const handleSave = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    // create distributor
    const nextId = distributors.length ? Math.max(...distributors.map((d) => d.id)) + 1 : 1;
    const newDist = {
      id: nextId,
      fullName: fullName.trim(),
      phone: phone.trim(),
      username: username.trim(),
      module: selectedModule,
      // NOTE: we do NOT store password in localStorage for a real app
    };

    setDistributors((prev) => [newDist, ...prev]);
    setSavedMessage("Distributor saved successfully.");
    // keep form? reset after a short delay
    setTimeout(() => {
      resetForm();
    }, 900);
  };

  // simple delete action for convenience (dynamic behaviour)
  const handleDelete = (id) => {
    if (!window.confirm("Delete this distributor?")) return;
    setDistributors((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="min-h-screen bg-eggBg px-4 py-6 md:px-8">
      {/* Breadcrumb + Heading */}
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-2">Home &nbsp;›&nbsp; Distribution &nbsp;›&nbsp; Add Distributor</div>
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Add Distributor</h1>
        <p className="mt-1 text-sm text-gray-500">Create a new distributor account and assign specific module permissions.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr,520px]">
        {/* LEFT: form card (major) */}
        <div>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="rounded-2xl bg-eggWhite p-6 shadow-sm">
              {/* Distributor Details */}
              <div className="mb-4 flex items-center gap-3">
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-orange-50 text-orange-600">👤</div>
                <div>
                  <div className="text-base font-semibold text-gray-900">Distributor Details</div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 items-center">
                <div>
                  <label className="text-xs font-medium text-gray-700">Full Name</label>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. John Smith"
                    className={`mt-2 w-full rounded-xl border px-3 py-2 text-sm bg-eggBg ${errors.fullName ? "border-red-300" : "border-gray-200"}`}
                  />
                  {errors.fullName && <div className="mt-1 text-xs text-red-600">{errors.fullName}</div>}
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-700">Phone Number</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className={`mt-2 w-full rounded-xl border px-3 py-2 text-sm bg-eggBg ${errors.phone ? "border-red-300" : "border-gray-200"}`}
                  />
                  {errors.phone && <div className="mt-1 text-xs text-red-600">{errors.phone}</div>}
                </div>
              </div>
            </div>

            {/* Account Security */}
            <div className="rounded-2xl bg-eggWhite p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-orange-50 text-orange-600">🔒</div>
                <div>
                  <div className="text-base font-semibold text-gray-900">Account Security</div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="text-xs font-medium text-gray-700">Username</label>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Choose a unique username"
                    className={`mt-2 w-full rounded-xl border px-3 py-2 text-sm bg-eggBg ${errors.username ? "border-red-300" : "border-gray-200"}`}
                  />
                  {errors.username && <div className="mt-1 text-xs text-red-600">{errors.username}</div>}
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-700">Password</label>
                  <div className="relative mt-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="●●●●●●●"
                      className={`w-full rounded-xl border px-3 py-2 pr-10 text-sm bg-eggBg ${errors.password ? "border-red-300" : "border-gray-200"}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      aria-label="toggle password"
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                  {errors.password && <div className="mt-1 text-xs text-red-600">{errors.password}</div>}
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-700">Confirm Password</label>
                  <div className="relative mt-2">
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="●●●●●●●"
                      className={`w-full rounded-xl border px-3 py-2 pr-10 text-sm bg-eggBg ${errors.confirmPassword ? "border-red-300" : "border-gray-200"}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                      aria-label="toggle confirm"
                    >
                      {showConfirm ? "🙈" : "👁️"}
                    </button>
                  </div>
                  {errors.confirmPassword && <div className="mt-1 text-xs text-red-600">{errors.confirmPassword}</div>}
                </div>
              </div>
            </div>

            {/* Access Role - single select */}
            <div className="rounded-2xl bg-eggWhite p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-3">
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-orange-50 text-orange-600">🛡️</div>
                <div>
                  <div className="text-base font-semibold text-gray-900">Access Role</div>
                  <div className="mt-1 text-sm text-gray-500">Distributor gets access to <span className="font-semibold text-orange-600">exactly one</span> module.</div>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {ACCESS_MODULES.map((m) => (
                  <RadioTile
                    key={m.key}
                    active={selectedModule === m.key}
                    onClick={() => setSelectedModule(m.key)}
                    title={m.title}
                    desc={m.desc}
                  />
                ))}
              </div>

              {errors.selectedModule && <div className="mt-3 text-xs text-red-600">{errors.selectedModule}</div>}
            </div>

            {/* Form actions */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">{savedMessage && <span className="text-green-600">{savedMessage}</span>}</div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-2xl border border-gray-200 bg-white px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-2xl bg-orange-500 px-6 py-2 text-sm font-semibold text-white shadow-md hover:bg-orange-600"
                >
                  Save Distributor
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* RIGHT: quick list + metrics (compact) */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-eggWhite p-4 shadow-sm">
            <div className="text-xs text-gray-400 uppercase tracking-wide">Distributors</div>
            <div className="mt-3 text-2xl font-semibold text-gray-900">{metrics.total}</div>
            <div className="mt-1 text-sm text-gray-500">{metrics.dailySales} with Daily Sales access</div>
          </div>

          <div className="rounded-2xl bg-eggWhite p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-gray-700">Recent distributors</div>
            </div>

            <div className="divide-y divide-gray-100">
              {distributors.map((d) => (
                <div key={d.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-semibold">
                      {d.fullName.split(" ").slice(0, 2).map(n => n[0]).join("").toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{d.fullName}</div>
                      <div className="text-xs text-gray-500">{d.username} • {d.phone}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-xs text-gray-500 capitalize">{d.module}</div>
                    <button
                      onClick={() => handleDelete(d.id)}
                      className="text-xs text-red-600 bg-red-50 px-3 py-1 rounded-lg border border-red-100 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              {distributors.length === 0 && <div className="py-6 text-center text-gray-500">No distributors yet</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
