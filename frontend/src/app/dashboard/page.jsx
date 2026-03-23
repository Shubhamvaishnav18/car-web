"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { fetchWithAuth } from "@/lib/api"

export default function HomePage() {
  const [cars, setCars] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        // ✨ Normal fetch ki jagah fetchWithAuth lagaya. Token automatically chala jayega!
        const res = await fetchWithAuth('http://localhost:3000/api/cars');
        if (res.ok) {
          const data = await res.json();
          setCars(data);
        }
      } catch (err) {
        console.error("Error fetching cars:", err);
      }
    };
    fetchCars();
  }, []);

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-extrabold font-[Manrope] tracking-tighter text-[#0F294D] mb-2">Fleet Overview</h1>
            <p className="text-slate-800 font-[Inter]">Manage your technical inventory and operational readiness.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex font-[Manrope] bg-slate-100 rounded-sm p-1">
              <button className="px-4 py-2 bg-white rounded-sm shadow-sm text-sm font-bold flex items-center gap-2 text-slate-900">
                <span className="material-symbols-outlined text-base">grid_view</span> Grid
              </button>
              <button className="px-4 py-2 text-slate-500 text-sm font-bold flex items-center gap-2 hover:bg-slate-200/50 rounded-lg transition-colors">
                <span className="material-symbols-outlined text-base">format_list_bulleted</span> List
              </button>
            </div>
            <button className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-sm text-sm font-[Manrope] font-bold border border-slate-200 shadow-sm hover:bg-slate-50 transition-all text-slate-900">
              <span className="material-symbols-outlined text-base">filter_list</span> Filters
            </button>
          </div>
        </header>

        {/* Stats Row */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 font-[Manrope] gap-6 mb-12">
          {/* Stat Card 1 */}
          <div className="bg-white p-5 rounded-md shadow-[0_12px_40px_rgba(25,28,30,0.06)] flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#565960]">Active Fleet</span>
              <span className="material-symbols-outlined text-[#0F294D]">directions_car</span>
            </div>
            <div>
              <h3 className="text-3xl font-black font-[Manrope] text-[#0F294D]">{cars.length}</h3>
              <p className="text-[10px] text-green-600 font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">trending_up</span> +4 this month
              </p>
            </div>
          </div>
          {/* Stat Card 2 */}
          <div className="bg-white p-5 rounded-md shadow-[0_12px_40px_rgba(25,28,30,0.06)] flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#565960]">In Service</span>
              <span className="material-symbols-outlined text-[#C6955E]">build</span>
            </div>
            <div>
              <h3 className="text-3xl font-black font-[Manrope] text-[#0F294D]">0</h3>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#4F2E00] h-full w-[12%]"></div>
              </div>
            </div>
          </div>
          {/* Stat Card 3 */}
          <div className="bg-white p-5 rounded-md shadow-[0_12px_40px_rgba(25,28,30,0.06)] flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#565960]">Revenue / KM</span>
              <span className="material-symbols-outlined text-[#0F294D]">payments</span>
            </div>
            <div>
              <h3 className="text-3xl font-black font-[Manrope] text-[#0F294D]">$4.82</h3>
              <p className="text-[10px] text-blue-600 font-bold">Standard Performance</p>
            </div>
          </div>
          {/* Stat Card 4 */}
          <div className="bg-[#0F294D] text-white p-5 rounded-md shadow-xl shadow-blue-900/10 flex flex-col justify-between h-32">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-semibold uppercase tracking-widest opacity-70">Compliance Rate</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </div>
            <div>
              <h3 className="text-3xl font-black font-[Manrope]">99.2%</h3>
              <p className="text-[10px] opacity-80 font-bold">Excellent Safety Rating</p>
            </div>
          </div>
        </section>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => {
            const status = "AVAILABLE"; // Defaulting since it's not in DB schema yet
            const img = car.images && car.images.length > 0 ? car.images[0] : "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=600&auto=format&fit=crop";
            const make = `${car.manufacturer} ${car.modelName}`;
            const isElectric = car.powertrain?.toLowerCase().includes('electric');

            return (
            <div key={car._id} className="bg-white font-[Manrope] rounded-xl border overflow-hidden flex flex-col">
              <div className="h-55 relative bg-slate-100">
                <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded text-white z-10 ${status === 'AVAILABLE' ? 'bg-[#0F294D]' : 'bg-[#492C03]'}`}>{status}</span>
                <img src={img} alt={make} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-extrabold text-lg text-slate-900">{make}</h3>
                      <p className="text-sm text-slate-800">{car.modelYear} • {car.powertrain}</p>
                    </div>
                    <div className="text-[10px] bg-[#ECEEF0] px-2 py-1 rounded text-slate-900">VIN: ...{car.vin?.substring(car.vin.length - 4)}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                      <p className="text-[10px] font-extrabold text-slate-400 uppercase">{isElectric ? 'Battery' : 'Fuel'}</p>
                      <p className="text-sm font-extrabold text-slate-900">{isElectric ? '100%' : 'Full'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Odometer</p>
                      <p className="text-sm font-bold text-slate-900">{car.mileage} km</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex space-x-2">
                  <Link href={`/dashboard/car/${car._id}`} className="flex-1">
                    <Button variant="outline" className="w-full text-[#0F294D] py-5 font-bold rounded-sm bg-gray-100 border-slate-200 cursor-pointer">DETAILS</Button>
                  </Link>
                  <Button variant="outline" className="px-3 text-[#0F294D] py-5 font-bold rounded-sm">•••</Button>
                </div>
              </div>
            </div>
          )})}

          {/* Expand Fleet Card */}
          <Link href="/dashboard/add-car">
            <div className="bg-[#ECEEF0] rounded-xl border border-dashed border-slate-300 flex flex-col items-center justify-center p-8 text-center min-h-[350px] cursor-pointer hover:bg-slate-200 transition-colors">
              <div className="w-12 h-12 rounded-md bg-[white] font-bold shadow-sm flex items-center justify-center text-2xl text-[#002045] mb-4">+</div>
              <h3 className="font-extrabold font-[Manrope] text-lg text-[#002045]">Expand Fleet</h3>
              <p className="text-xs font-[Inter] font-bold text-[#43474E] mt-2 max-w-[200px]">Register a new vehicle with VIN identification and telemetry sync.</p>
            </div>
          </Link>
        </div>
      </div>
      <footer className="w-full pt-5 mt-[20px] border-t border-slate-200 font-[Manrope] bg-transparent flex flex-col md:flex-row justify-between items-center">
        <p className="font-sans text-xs text-slate-500">© 2024 Kinetic Precision Framework. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0 font-sans text-xs text-slate-500">
          <Link href="#" className="hover:text-[#0F294D] transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-[#0F294D] transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-[#0F294D] transition-colors">Support</Link>
          <Link href="#" className="hover:text-[#0F294D] transition-colors">API Docs</Link>
        </div>
      </footer>
    </>
  )
}