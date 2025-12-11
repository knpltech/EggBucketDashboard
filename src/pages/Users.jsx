// src/pages/Users.jsx
import { useEffect, useMemo, useState } from "react";

/*
  Users.jsx - dynamic & responsive Users management page
  - Persists data to localStorage (key: "egg_users_v1")
  - Edit / Delete users
  - Search, pagination, responsive UI, permissions tiles
  - Add User handled ONLY through the right-side form (no Add button)
*/

const STORAGE_KEY = "egg_users_v1";

const PERMISSIONS = [
  { key: "necc", label: "NECC Rate", desc: "Manage daily pricing" },
  { key: "dailySales", label: "Daily Sales", desc: "Track outbound sales" },
  { key: "digitalPayments", label: "Digital Payments", desc: "Manage online transactions" },
  { key: "cashPayments", label: "Cash Payments", desc: "Log cash flow entries" },
  { key: "damages", label: "Damages", desc: "Report daily breakages" },
];

const DEFAULT_USERS = [
  {
    id: 1,
    fullName: "Alex Morgan",
    username: "alex.morgan",
    phone: "+91 98765 43210",
    roles: ["digitalPayments", "dailySales"],
  },
  {
    id: 2,
    fullName: "Priya Singh",
    username: "priya.s",
    phone: "+91 77665 54433",
    roles: ["necc"],
  },
];

function PermissionTile({ checked, onToggle, label, desc }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left transition-shadow ${
        checked
          ? "border-orange-200 bg-orange-50 shadow-sm"
          : "border-gray-100 bg-white hover:shadow-sm"
      }`}
    >
      <div
        className={`h-5 w-5 flex-shrink-0 rounded-full border flex items-center justify-center ${
          checked ? "border-orange-400 bg-white" : "border-gray-300 bg-white"
        }`}
      >
        <div className={`${checked ? "h-2.5 w-2.5 rounded-full bg-orange-500" : "h-2.5 w-2.5 rounded-full bg-transparent"}`} />
      </div>

      <div className="flex-1">
        <div className="text-sm font-semibold text-gray-900">{label}</div>
        <div className="mt-1 text-xs text-gray-500">{desc}</div>
      </div>
    </button>
  );
}

function initialsFromName(name = "") {
  return name
    .split(" ")
    .slice(0, 2)
    .map((p) => (p && p[0] ? p[0].toUpperCase() : ""))
    .join("");
}

export default function Users() {
  // Load saved users or defaults
  const [users, setUsers] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return DEFAULT_USERS;
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return DEFAULT_USERS;
      return parsed;
    } catch {
      return DEFAULT_USERS;
    }
  });

  // Persist users to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    } catch {}
  }, [users]);

  // UI state
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  // Editing & deleting
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState(null);

  // Form (add + edit use same structure)
  const emptyForm = {
    fullName: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    roles: new Set(),
  };

  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const resetForm = () => {
    setForm(emptyForm);
    setErrors({});
    setEditingUserId(null);
  };

  // Filtering + pagination
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;

    return users.filter(
      (u) =>
        (u.fullName || "").toLowerCase().includes(q) ||
        (u.username || "").toLowerCase().includes(q) ||
        (u.phone || "").toLowerCase().includes(q)
    );
  }, [users, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  // Permission toggle
  const toggleRoleInForm = (key) => {
    setForm((prev) => {
      const next = new Set(prev.roles);
      next.has(key) ? next.delete(key) : next.add(key);
      return { ...prev, roles: next };
    });
  };

  // Validation
  const validateForm = ({ isEdit = false } = {}) => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    if (!form.username.trim()) e.username = "Username is required.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";

    if (!isEdit) {
      if (!form.password) e.password = "Password is required.";
      if (form.password !== form.confirmPassword)
        e.confirmPassword = "Passwords do not match.";
    } else {
      if (form.password && form.password !== form.confirmPassword)
        e.confirmPassword = "Passwords do not match.";
    }

    return e;
  };

  // SAVE NEW USER from right-form
  const saveNewUser = () => {
    const e = validateForm({ isEdit: false });
    setErrors(e);
    if (Object.keys(e).length) return;

    const nextId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;

    const newUser = {
      id: nextId,
      fullName: form.fullName.trim(),
      username: form.username.trim(),
      phone: form.phone.trim(),
      roles: Array.from(form.roles),
    };

    setUsers((prev) => [newUser, ...prev]);
    resetForm();
    setPage(1);
  };

  // EDIT
  const openEdit = (userId) => {
    const u = users.find((x) => x.id === userId);
    if (!u) return;

    setForm({
      fullName: u.fullName,
      username: u.username,
      phone: u.phone,
      password: "",
      confirmPassword: "",
      roles: new Set(u.roles || []),
    });

    setEditingUserId(userId);
    setErrors({});
    setIsEditOpen(true);
  };

  const saveEdit = () => {
    const e = validateForm({ isEdit: true });
    setErrors(e);
    if (Object.keys(e).length) return;

    setUsers((prev) =>
      prev.map((u) =>
        u.id === editingUserId
          ? {
              ...u,
              fullName: form.fullName,
              username: form.username,
              phone: form.phone,
              roles: Array.from(form.roles),
            }
          : u
      )
    );

    setIsEditOpen(false);
    resetForm();
  };

  // DELETE
  const deleteUser = () => {
    setUsers((prev) => prev.filter((u) => u.id !== deletingUserId));
    setDeletingUserId(null);
    setIsDeleteConfirmOpen(false);
  };

  const metrics = useMemo(() => {
    return {
      total: users.length,
      multiRole: users.filter((u) => (u.roles || []).length > 1).length,
    };
  }, [users]);

  return (
    <div className="min-h-screen bg-eggBg px-4 py-6 md:px-8">
      {/* TITLE */}
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-1">
        Add New User
      </h1>
      <p className="text-sm md:text-base text-gray-500 mb-6">
        Create a new account for an employee and assign role access.
      </p>

      <div className="grid gap-6 lg:grid-cols-[1fr,520px]">
        {/* LEFT — USER LIST */}
        <div className="space-y-4">
          {/* Metrics Card */}
          <div className="rounded-2xl bg-eggWhite p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold text-gray-400 uppercase">
                  Users
                </p>
                <p className="text-lg font-semibold mt-1">{metrics.total}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Multi-role users</p>
                <p className="text-sm font-semibold mt-1">{metrics.multiRole}</p>
              </div>
            </div>
          </div>

          {/* User List Card */}
          <div className="rounded-2xl bg-eggWhite p-4 shadow-sm">
            {/* Search bar only (Add removed) */}
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-700">Users</p>

              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search name"
                className="rounded-xl bg-eggBg border border-transparent px-3 py-2 text-sm text-gray-700 placeholder:text-[#D0A97B] focus:ring-1 focus:ring-orange-400"
              />
            </div>

            <div className="divide-y divide-gray-100">
              {pageItems.map((u) => (
                <div key={u.id} className="flex justify-between items-center py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-semibold">
                      {initialsFromName(u.fullName)}
                    </div>
                    <div>
                      <div className="font-semibold">{u.fullName}</div>
                      <div className="text-[12px] text-gray-500">
                        {u.username} • {u.phone}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEdit(u.id)}
                      className="px-3 py-1 text-xs rounded-lg border bg-white hover:bg-gray-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setDeletingUserId(u.id);
                        setIsDeleteConfirmOpen(true);
                      }}
                      className="px-3 py-1 text-xs rounded-lg border bg-red-50 text-red-600 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              {pageItems.length === 0 && (
                <p className="text-center py-6 text-gray-500">No users found</p>
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
              <span>
                Showing {pageItems.length ? (page - 1) * pageSize + 1 : 0}–
                {Math.min(page * pageSize, filtered.length)} of {filtered.length}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className={`h-8 w-8 rounded-full flex items-center justify-center border ${
                    page <= 1 ? "text-gray-300 border-gray-100" : "hover:bg-gray-50"
                  }`}
                >
                  ‹
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className={`h-8 w-8 rounded-full flex items-center justify-center border ${
                    page >= totalPages ? "text-gray-300 border-gray-100" : "hover:bg-gray-50"
                  }`}
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — ADD NEW USER FORM */}
        <div className="rounded-2xl bg-eggWhite p-6 shadow-sm">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveNewUser();
            }}
            className="space-y-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs font-medium">Full Name</label>
                <input
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="Ex: John Doe"
                  className={`mt-2 w-full rounded-xl bg-eggBg border px-3 py-2 text-sm ${
                    errors.fullName ? "border-red-300" : "border-gray-200"
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-medium">Phone</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 9123456789"
                  className={`mt-2 w-full rounded-xl bg-eggBg border px-3 py-2 text-sm ${
                    errors.phone ? "border-red-300" : "border-gray-200"
                  }`}
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-medium">Username</label>
                <input
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  placeholder="Create a username"
                  className={`mt-2 w-full rounded-xl bg-eggBg border px-3 py-2 text-sm ${
                    errors.username ? "border-red-300" : "border-gray-200"
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-medium">Password</label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="●●●●●●●"
                  className={`mt-2 w-full rounded-xl bg-eggBg border px-3 py-2 text-sm ${
                    errors.password ? "border-red-300" : "border-gray-200"
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-medium">Confirm Password</label>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  placeholder="●●●●●●●"
                  className={`mt-2 w-full rounded-xl bg-eggBg border px-3 py-2 text-sm ${
                    errors.confirmPassword ? "border-red-300" : "border-gray-200"
                  }`}
                />
              </div>
            </div>

            {/* Permissions */}
            <div>
              <div className="text-sm font-semibold mb-3">Role Access Permission</div>
              <div className="grid gap-3 md:grid-cols-2">
                {PERMISSIONS.map((p) => (
                  <PermissionTile
                    key={p.key}
                    label={p.label}
                    desc={p.desc}
                    checked={form.roles.has(p.key)}
                    onToggle={() => toggleRoleInForm(p.key)}
                  />
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 rounded-2xl border bg-white text-sm hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2 rounded-2xl bg-orange-500 text-white text-sm shadow hover:bg-orange-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* EDIT MODAL */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/20 z-40 flex justify-center items-center px-4">
          <div className="bg-eggWhite rounded-2xl p-6 w-full max-w-xl shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Edit User</h2>
              <button onClick={() => setIsEditOpen(false)}>✕</button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 mb-4">
              <input
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="rounded-xl bg-eggBg border px-3 py-2 text-sm"
              />

              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="rounded-xl bg-eggBg border px-3 py-2 text-sm"
              />

              <div className="md:col-span-2">
                <input
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="rounded-xl bg-eggBg border px-3 py-2 w-full text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsEditOpen(false)}
                className="px-4 py-2 rounded-xl border"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-orange-500 text-white rounded-xl"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black/20 z-40 flex justify-center items-center">
          <div className="p-6 bg-eggWhite rounded-2xl shadow-xl w-full max-w-sm">
            <h3 className="font-semibold text-lg mb-3">Delete User?</h3>
            <p className="text-sm text-gray-600 mb-4">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-xl border"
                onClick={() => setIsDeleteConfirmOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-xl"
                onClick={deleteUser}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
