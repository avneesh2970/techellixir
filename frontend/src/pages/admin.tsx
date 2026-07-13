import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import {
  CheckCircle2,
  Inbox,
  Loader2,
  LockKeyhole,
  LogOut,
  Mail,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";
import {
  adminLogin,
  deleteQuery,
  getAdminQueries,
  type ContactQuery,
  type QueryStatus,
  updateQueryStatus,
} from "../lib/api";

const statusOptions: Array<{ label: string; value: QueryStatus | "all" }> = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "In Progress", value: "in-progress" },
  { label: "Resolved", value: "resolved" },
  { label: "Archived", value: "archived" },
];

const statusLabels: Record<QueryStatus, string> = {
  new: "New",
  "in-progress": "In Progress",
  resolved: "Resolved",
  archived: "Archived",
};

const statusClass: Record<QueryStatus, string> = {
  new: "bg-orange-50 text-orange-700",
  "in-progress": "bg-blue-50 text-blue-700",
  resolved: "bg-green-50 text-green-700",
  archived: "bg-gray-100 text-gray-600",
};

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem("adminToken") || "");
  const [password, setPassword] = useState("");
  const [queries, setQueries] = useState<ContactQuery[]>([]);
  const [filter, setFilter] = useState<QueryStatus | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const filteredQueries = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();
    return queries.filter((query) => {
      const matchesFilter = filter === "all" || query.status === filter;
      const matchesSearch =
        !search ||
        [query.fullName, query.email, query.subject, query.message]
          .join(" ")
          .toLowerCase()
          .includes(search);
      return matchesFilter && matchesSearch;
    });
  }, [filter, queries, searchTerm]);

  const stats = useMemo(
    () => ({
      total: queries.length,
      new: queries.filter((query) => query.status === "new").length,
      resolved: queries.filter((query) => query.status === "resolved").length,
    }),
    [queries],
  );

  const loadQueries = async (activeToken = token) => {
    if (!activeToken) return;
    setLoading(true);
    setError("");
    try {
      const data = await getAdminQueries(activeToken);
      setQueries(data.queries);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load queries.");
      if (err instanceof Error && err.message === "Unauthorized") {
        localStorage.removeItem("adminToken");
        setToken("");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;

    let ignore = false;
    void getAdminQueries(token)
      .then((data) => {
        if (!ignore) {
          setQueries(data.queries);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err instanceof Error ? err.message : "Unable to load queries.");
          if (err instanceof Error && err.message === "Unauthorized") {
            localStorage.removeItem("adminToken");
            setToken("");
          }
        }
      });

    return () => {
      ignore = true;
    };
  }, [token]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthLoading(true);
    setError("");
    try {
      const data = await adminLogin(password);
      localStorage.setItem("adminToken", data.token);
      setToken(data.token);
      setPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to login.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken("");
    setQueries([]);
  };

  const handleStatusChange = async (id: string, status: QueryStatus) => {
    const data = await updateQueryStatus(token, id, status);
    setQueries((current) =>
      current.map((query) => (query.id === id ? data.query : query)),
    );
  };

  const handleDelete = async (id: string) => {
    await deleteQuery(token, id);
    setQueries((current) => current.filter((query) => query.id !== id));
  };

  if (!token) {
    return (
      <main className="min-h-screen bg-[#fffaf7] pt-32 pb-20">
        <div className="container-shell">
          <div className="glass-card mx-auto max-w-md rounded-3xl p-8">
            <div className="icon-tile mx-auto">
              <LockKeyhole size={28} />
            </div>
            <h1 className="section-title mt-6 text-center text-3xl">
              Admin Login
            </h1>
            <p className="section-copy mt-3 text-center">
              Sign in to review and manage contact queries.
            </p>
            <form onSubmit={handleLogin} className="mt-8 space-y-4">
              <input
                type="password"
                className="field"
                placeholder="Admin password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              {error && (
                <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={authLoading}
                className="brand-button w-full px-8 py-4 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {authLoading ? "Signing in..." : "Login"}
              </button>
            </form>
            <p className="mt-5 text-center text-xs text-gray-500">
              Default local password: admin123
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf7] pt-28 pb-20">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow">Admin Panel</p>
            <h1 className="section-title mt-3 text-4xl md:text-5xl">
              Query Management
            </h1>
            <p className="section-copy mt-3 max-w-2xl">
              Review incoming contact messages, update their status, and keep
              your team focused on the right follow-ups.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => loadQueries()} className="ghost-button px-5 py-3">
              <RefreshCw size={18} />
              Refresh
            </button>
            <button onClick={handleLogout} className="ghost-button px-5 py-3">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="soft-card rounded-3xl p-6">
            <Inbox className="text-[#FF4D37]" size={26} />
            <p className="mt-4 text-3xl font-black text-[#182033]">{stats.total}</p>
            <p className="text-sm font-semibold text-gray-500">Total queries</p>
          </div>
          <div className="soft-card rounded-3xl p-6">
            <Mail className="text-[#FF4D37]" size={26} />
            <p className="mt-4 text-3xl font-black text-[#182033]">{stats.new}</p>
            <p className="text-sm font-semibold text-gray-500">New queries</p>
          </div>
          <div className="soft-card rounded-3xl p-6">
            <CheckCircle2 className="text-[#FF4D37]" size={26} />
            <p className="mt-4 text-3xl font-black text-[#182033]">{stats.resolved}</p>
            <p className="text-sm font-semibold text-gray-500">Resolved</p>
          </div>
        </div>

        <div className="soft-card mt-8 rounded-3xl p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                className="field pl-11"
                placeholder="Search by name, email, subject..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  className={`rounded-2xl px-4 py-2 text-sm font-black transition ${
                    filter === option.value
                      ? "bg-[#FF4D37] text-white"
                      : "bg-[#fff4ef] text-[#DF3420] hover:bg-[#ffe2da]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <p className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {error}
          </p>
        )}

        <section className="mt-6 space-y-4">
          {loading ? (
            <div className="soft-card flex items-center justify-center gap-3 rounded-3xl p-10 text-gray-600">
              <Loader2 className="animate-spin" size={22} />
              Loading queries...
            </div>
          ) : filteredQueries.length === 0 ? (
            <div className="soft-card rounded-3xl p-10 text-center">
              <Inbox className="mx-auto text-[#FF4D37]" size={34} />
              <h2 className="mt-4 text-2xl font-black text-[#182033]">
                No queries found
              </h2>
              <p className="section-copy mt-2">
                New contact submissions will appear here.
              </p>
            </div>
          ) : (
            filteredQueries.map((query) => (
              <article key={query.id} className="soft-card rounded-3xl p-6">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-2xl font-black text-[#182033]">
                        {query.subject}
                      </h2>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black ${statusClass[query.status]}`}
                      >
                        {statusLabels[query.status]}
                      </span>
                    </div>
                    <p className="mt-2 font-semibold text-gray-700">
                      {query.fullName} · {query.email}
                    </p>
                    <p className="section-copy mt-4 whitespace-pre-wrap">
                      {query.message}
                    </p>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
                      Received {new Date(query.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
                    <select
                      value={query.status}
                      onChange={(event) =>
                        handleStatusChange(query.id, event.target.value as QueryStatus)
                      }
                      className="field min-w-44"
                    >
                      {statusOptions
                        .filter((option) => option.value !== "all")
                        .map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                    </select>
                    <button
                      onClick={() => handleDelete(query.id)}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-4 font-black text-red-700 transition hover:bg-red-100"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
