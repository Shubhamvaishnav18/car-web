"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { fetchWithAuth } from "@/lib/api";

export default function DashboardLayout({ children }) {
  const router = useRouter();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      
      await fetchWithAuth("http://localhost:3000/api/auth/logout", {
        method: "POST"
      });
    } catch (error) {
      console.log("Logout error", error);
    } finally {
      
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; 
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC] font-sans antialiased text-slate-900 overflow-hidden">
     
      <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0 z-20 relative shadow-sm">
        <div className="flex items-center h-full">
          <div className="flex items-center space-x-2 font-[Manrope] font-bold text-lg tracking-tight text-[#0F294D] mr-12">
            <span>Kinetic Precision</span>
          </div>
          <nav className="flex space-x-6 h-full text-sm font-[Manrope] font-medium">
            <Link href="/dashboard" className="flex items-center text-blue-900 border-b-2 border-blue-900 pt-1">Dashboard</Link>
            <Link href="#" className="flex items-center text-slate-500 hover:text-slate-900 transition-colors pt-1">Inventory</Link>
            <Link href="#" className="flex items-center text-slate-500 hover:text-slate-900 transition-colors pt-1">Service</Link>
            <Link href="#" className="flex items-center text-slate-500 hover:text-slate-900 transition-colors pt-1">Analytics</Link>
          </nav>
        </div>
        <div className="flex items-center space-x-5">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">search</span>
            <input type="text" placeholder="Search fleet..." className="bg-slate-100 border-none rounded-md font-[Inter] pl-10 pr-4 py-1.5 text-sm outline-none w-64 focus:ring-1 focus:ring-slate-300 transition-shadow" />
          </div>
          <button className="text-slate-500 hover:text-[#0F294D] transition-colors flex items-center"><span className="material-symbols-outlined text-[22px]">notifications</span></button>
          <button className="text-slate-500 hover:text-[#0F294D] transition-colors flex items-center"><span className="material-symbols-outlined text-[22px]">settings</span></button>
          <div className="w-8 h-8 rounded-full bg-slate-300 overflow-hidden border border-slate-200 cursor-pointer">
            <img src="https://i.pravatar.cc/150?img=47" alt="User Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        
        <aside className="w-64 bg-slate-100 border-r border-slate-200/50 hidden md:flex flex-col p-4 gap-y-2 overflow-y-auto z-10">
          <div className="px-4 mb-6 mt-2">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded bg-[#0F294D] flex items-center justify-center text-white shadow-sm">
                <span className="material-symbols-outlined">precision_manufacturing</span>
              </div>
              <div>
                <h3 className="text-lg font-black text-[#0F294D] font-[Manrope] leading-none">Precision Motors</h3>
                <p className="text-[10px] font-[Inter] font-semibold uppercase tracking-widest text-slate-500 mt-1">Fleet Manager</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-1">
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 font-[Manrope] text-xs font-semibold uppercase tracking-widest bg-white text-blue-900 rounded-lg shadow-sm transition-all duration-300 ease-in-out">
              <span className="material-symbols-outlined text-lg">dashboard</span>
              <span>Overview</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 font-[Manrope] text-xs font-semibold uppercase tracking-widest text-slate-500 hover:text-blue-700 hover:bg-slate-200/50 rounded-lg transition-all duration-300 ease-in-out">
              <span className="material-symbols-outlined text-lg">directions_car</span>
              <span>Fleet</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 font-[Manrope] text-xs font-semibold uppercase tracking-widest text-slate-500 hover:text-blue-700 hover:bg-slate-200/50 rounded-lg transition-all duration-300 ease-in-out">
              <span className="material-symbols-outlined text-lg">build</span>
              <span>Maintenance</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 font-[Manrope] text-xs font-semibold uppercase tracking-widest text-slate-500 hover:text-blue-700 hover:bg-slate-200/50 rounded-lg transition-all duration-300 ease-in-out">
              <span className="material-symbols-outlined text-lg">description</span>
              <span>Documents</span>
            </Link>
            <Link href="#" className="flex items-center gap-3 px-4 py-3 font-[Manrope] text-xs font-semibold uppercase tracking-widest text-slate-500 hover:text-blue-700 hover:bg-slate-200/50 rounded-lg transition-all duration-300 ease-in-out">
              <span className="material-symbols-outlined text-lg">group</span>
              <span>Team</span>
            </Link>
          </nav>

          <div className="mt-auto pt-4 border-t border-slate-200/50 space-y-1">
            <Button asChild className="w-full bg-[#0F294D] hover:bg-[#0B1727] text-white py-6 rounded-md font-[Manrope] font-bold text-sm mb-4 shadow-lg shadow-blue-900/20 active:scale-95 transition-all">
              <Link href="/dashboard/add-car" className="font-[Manrope]">Add New Vehicle</Link>
            </Button>
            <Link href="#" className="flex items-center gap-3 px-4 py-2 font-[Manrope] text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-blue-700 transition-all">
              <span className="material-symbols-outlined text-xs">help</span>
              <span>Help Center</span>
            </Link>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 font-[Manrope] text-xs font-semibold uppercase tracking-widest text-slate-500 hover:text-red-600 transition-all cursor-pointer">
              <span className="material-symbols-outlined text-xs">logout</span>
              <span>Logout</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-auto p-8 lg:p-10 transition-all">
          {children}
        </main>
      </div>
    </div>
  )
}