"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { CarFront, Lock, Mail } from "lucide-react"

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("https://car-backend-53dx.onrender.com/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            
            if (response.ok) {
                // Save tokens
                localStorage.setItem("accessToken", data.accessToken);
                localStorage.setItem("refreshToken", data.refreshToken);
                document.cookie = `accessToken=${data.accessToken}; path=/; max-age=86400`;
                router.push("/dashboard");
            } else {
                alert(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-slate-100 to-slate-200 p-4">
            <div className="flex flex-col items-center justify-center flex-1">
                <div className="mb-8 text-center">
                    <div className="bg-[#001B3C] w-12 h-12 mx-auto rounded-sm mb-4 flex items-center justify-center text-white font-bold"><CarFront size={20} className="text-[19px] font-[Inter] text-white" /></div>
                    <h1 className="text-2xl font-[Manrope] font-bold text-[#1A365D]">Kinetic Precision</h1>
                    <p className="text-sm font-[Inter] text-[#64748B] mt-1">Professional Fleet & Asset Management</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                    <h2 className="text-xl font-[Manrope] font-bold mb-1">Welcome Back</h2>
                    <p className="text-sm font-[Inter] text-[#64748B] mb-6">Enter your credentials to access the cockpit.</p>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <Label className="text-xs font-[Inter] text-slate-500 uppercase tracking-wider">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444749]" size={16} />
                                <Input 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@precision.com" 
                                    className="pl-10 bg-slate-50 font-[Inter] border-none h-12" 
                                    required 
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label className="text-xs font-[Inter] text-slate-500 uppercase tracking-wider">Password</Label>
                                <Link href="#" className="text-xs font-[Inter] font-bold text-[#0F294D]">Forgot Password?</Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444749]" size={16} />
                                <Input 
                                    type="password" 
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••" 
                                    className="pl-10 bg-slate-50 font-[Inter] border-none h-12" 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember" />
                            <label htmlFor="remember" className="text-sm font-[Inter] font-medium leading-none text-[#64748B]">Stay logged in for 30 days</label>
                        </div>

                        <Button disabled={loading} type="submit" className="w-full font-[Manrope] rounded-sm bg-[#0F294D] hover:bg-[#0B1727] text-white h-12 cursor-pointer">
                            {loading ? "Logging in..." : "Log In \u2192"}
                        </Button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm font-[Inter] text-[#64748B] mb-3">Don't have an account yet?</p>
                        <Button variant="secondary" asChild className="w-full font-[Inter] bg-slate-100 hover:bg-slate-200 text-slate-700 h-12">
                            <Link href="/signup" className="font-[Inter]">Request Access</Link>
                        </Button>
                    </div>
                </div>
                <div className="mt-6 flex gap-6 text-xs text-[#64748B] font-[Inter]">
                    <span className="cursor-pointer hover:text-black">Privacy Policy</span>
                    <span className="cursor-pointer hover:text-black">Terms of Service</span>
                    <span className="cursor-pointer hover:text-black">Support Center</span>
                </div>
            </div>
            <div className="flex justify-between items-center text-xs text-[#94A3B8] font-[Inter] px-4 mt-6">
                <span>© 2024 Kinetic Precision Framework. All rights reserved.</span>
                <div className="flex items-center gap-2">
                    <span className="uppercase tracking-wider">Global Status</span>
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    <span className="text-yellow-600">Systems Nominal</span>
                </div>
            </div>
        </div>
    )
}