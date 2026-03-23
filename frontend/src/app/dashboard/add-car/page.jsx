"use client"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { fetchWithAuth } from "@/lib/api"

export default function AddCarPage() {
  const router = useRouter();
  const fileInputRef = useRef(null); 
  
  const [formData, setFormData] = useState({
    manufacturer: "", modelName: "", modelYear: "", vin: "", description: "",
    powertrain: "Internal Combustion", engineDisplacement: "", horsepower: "",
    topSpeed: "", colorHex: "", finish: "", mileage: ""
  });
  
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      
      const submitData = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (key === 'modelYear' || key === 'horsepower' || key === 'topSpeed') {
            submitData.append(key, parseInt(formData[key]) || 0);
        } else if (key === 'mileage') {
            submitData.append(key, parseInt(formData[key].replace(/,/g, '')) || 0);
        } else {
            submitData.append(key, formData[key]);
        }
      });

      imageFiles.forEach(file => {
        submitData.append("images", file);
      });

      const response = await fetchWithAuth("http://localhost:3000/api/cars", {
        method: "POST",
        body: submitData, 
      });

      if (response.ok) {
        router.push("/dashboard");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to add car");
      }
    } catch (error) {
      console.error("Error adding car:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl font-[Manrope] mx-auto">
    
      <div className="flex justify-between items-end mb-8">
        <div>
          <span className="text-[10px] font-bold tracking-wider text-[#CAA070] uppercase bg-[#E5E4E1] px-3 py-1 rounded">Fleet Inventory</span>
          <h1 className="text-5xl font-extrabold text-[#0F294D] mt-2">Register Vehicle</h1>
          <p className="text-slate-500 mt-2 text-md">Add a new high-performance asset to your precision fleet. Ensure all technical specifications match the manufacturer's log.</p>
        </div>
        <div className="flex space-x-3">
          <Link href="/dashboard">
            <Button variant="outline" className="bg-[#E0E3E5] text-slate-900 border-slate-200 px-5 py-5 rounded-sm cursor-pointer">Cancel</Button>
          </Link>
          <Button onClick={handleSubmit} disabled={loading} className="bg-[#0F294D] hover:bg-[#0B1727] text-white px-5 py-5 rounded-sm cursor-pointer">
            {loading ? "Saving..." : "Save Asset"}
          </Button>
        </div>
      </div>

     
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
   
        <div className="lg:col-span-2 bg-white p-6 rounded-md shadow shadow-md">
          <h2 className="text-lg font-bold flex items-center mb-6 text-slate-900">
            <span className="w-4 h-4 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] mr-2">i</span>
            Basic Information
          </h2>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Manufacturer</Label>
              <Input name="manufacturer" value={formData.manufacturer} onChange={handleChange} placeholder="e.g. Porsche" className="bg-[#F2F4F6] border-none rounded-sm h-10" />
            </div>
            <div className="space-y-2">
              <Label className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Model Name</Label>
              <Input name="modelName" value={formData.modelName} onChange={handleChange} placeholder="e.g. 911 GT3" className="bg-[#F2F4F6] border-none rounded-sm h-10" />
            </div>
            <div className="space-y-2">
              <Label className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Model Year</Label>
              <Input name="modelYear" value={formData.modelYear} onChange={handleChange} placeholder="2024" type="number" className="bg-[#F2F4F6] border-none rounded-sm h-10" />
            </div>
            <div className="space-y-2">
              <Label className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">VIN (Vehicle Identification Number)</Label>
              <Input name="vin" value={formData.vin} onChange={handleChange} placeholder="17-DIGIT CODE" className="bg-[#F2F4F6] border-none rounded-sm h-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Asset Description</Label>
            <textarea
              name="description" value={formData.description} onChange={handleChange}
              placeholder="Enter vehicle history or specific configuration details..."
              className="w-full bg-[#F2F4F6] border-none rounded-sm p-3 text-sm min-h-[100px] outline-none resize-none"
            ></textarea>
          </div>
        </div>

        <div className="bg-[#F2F4F6] p-8 rounded-md shadow shadow-sm">
          <h2 className="text-sm font-bold flex items-center mb-6 text-slate-900">
            <span className="material-symbols-outlined text-base pr-3">image</span>
            Media & Assets
          </h2>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageSelect} 
            multiple 
            accept="image/*" 
            className="hidden" 
          />
          
          <div 
            onClick={() => fileInputRef.current.click()} 
            className="border-2 border-dashed border-slate-200 rounded-lg bg-white h-48 flex flex-col items-center justify-center text-center mb-4 cursor-pointer hover:bg-slate-100 transition"
          >
            <span className="p-3 rounded-md material-symbols-outlined bg-[#D6E3FF] text-[#001B3C] text-3xl mb-2">upload_file</span>
            <p className="text-sm font-bold text-[#0F294D]">Upload Gallery</p>
            <p className="text-xs text-slate-500 mt-2 max-w-[190px]">{imageFiles.length > 0 ? `${imageFiles.length} images selected` : "Drag and drop 4K high-resolution images. Max size 20MB."}</p>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((index) => (
              <div key={index} className="aspect-square bg-[#E0E3E5] rounded-sm border border-slate-200 flex items-center justify-center text-slate-400 cursor-pointer overflow-hidden relative hover:bg-slate-200">
                {imagePreviews[index] ? (
                  <img src={imagePreviews[index]} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  "+"
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-md shadow shadow-md mb-6">
        <h2 className="text-lg font-bold flex items-center mb-6 text-slate-900">
          <span className="material-symbols-outlined text-primary-fixed-variant mr-2">settings_suggest</span> Technical Specifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Powertrain</Label>
              <div className="relative">
                <select name="powertrain" value={formData.powertrain} onChange={handleChange} className="w-full bg-[#F2F4F6] border-none rounded-xs p-2.5 pr-10 text-sm outline-none appearance-none cursor-pointer">
                  <option value="Internal Combustion">Internal Combustion</option>
                  <option value="Electric (EV)">Electric (EV)</option>
                  <option value="Hybrid (PHEV)">Hybrid (PHEV)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <span className="material-symbols-outlined text-slate-500">keyboard_arrow_down</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Input name="engineDisplacement" value={formData.engineDisplacement} onChange={handleChange} placeholder="Engine Displacement (L)" className="bg-[#F2F4F6] border-none rounded-xs h-10" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Performance</Label>
              <div className="relative">
                <Input name="horsepower" value={formData.horsepower} onChange={handleChange} type="number" placeholder="Horsepower" className="bg-[#F2F4F6] border-none rounded-xs h-10" />
                <span className="absolute right-3 top-3 text-xs text-slate-400">HP</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Input name="topSpeed" value={formData.topSpeed} onChange={handleChange} type="number" placeholder="Top Speed" className="bg-[#F2F4F6] border-none rounded-xs h-10" />
                <span className="absolute right-3 top-3 text-xs text-slate-400">KM/H</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Exterior & Aesthetics</Label>
              <div className="flex space-x-2 items-center bg-[slate-50] rounded-md p-1 h-10">
                <div className="w-9 h-8 bg-[#0F294D] rounded-md shadow-sm border-[3px] border-[#E0E3E5]" style={{ backgroundColor: formData.colorHex || '#0F294D' }}></div>
                <Input name="colorHex" value={formData.colorHex} onChange={handleChange} placeholder="Color Code / Hex" className="bg-[#F2F4F6] border-none rounded-xs shadow-none h-8 w-full text-sm" />
              </div>
            </div>
            <div className="space-y-2">
              <Input name="finish" value={formData.finish} onChange={handleChange} placeholder="Finish (e.g. Matte, Metallic)" className="bg-[#F2F4F6] border-none rounded-xs h-10" />
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Usage Metrics</Label>
              <div className="relative">
                <Input name="mileage" value={formData.mileage} onChange={handleChange} placeholder="Current Mileage" className="bg-[#F2F4F6] rounded-xs border-red-200 border h-10" />
                <span className="absolute right-3 top-3 text-xs text-slate-400">KM</span>
              </div>
              <p className="text-[12px] text-red-500 font-bold flex items-center mt-1">
                <span className="material-symbols-outlined mr-1">warning</span> High mileage alert
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-[#002045] rounded-xl p-9 text-white relative overflow-hidden">
          <span className="p-3 rounded-sm material-symbols-outlined bg-[#1A3657] text-[#ADC7F7] text-3xl mb-2">analytics</span>
          <h3 className="text-lg font-bold mb-2">Automated Appraisal</h3>
          <p className="text-sm text-slate-400 mb-8 max-w-[250px]">Once saved, our AI will automatically estimate current market value based on similar Porsche 911 GT3 models in the EMEA region.</p>
          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">Database Sync</span>
              <span className="text-xs font-bold text-[#B49472]">PENDING</span>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-[#A9C3F3]"></div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 bg-[#F1F4F6] rounded-lg shadow shadow-xs border-none p-6 flex items-center justify-between">
          <div className="max-w-md">
            <h3 className="text-lg font-bold text-slate-900 mb-1">Compliance & Registration</h3>
            <p className="text-md text-slate-600">Ensure all uploaded documentation complies with regional automotive safety standards. Digital signing will be required in the next step.</p>
          </div>
          <Button className="flex items-center gap-2 px-6 py-4 rounded-md bg-white font-bold text-sm text-[#0F294D] shadow-sm hover:shadow-md transition-all">
            <span className="material-symbols-outlined text-lg">description</span>
            Add Docs
          </Button>
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
    </div>
  )
}