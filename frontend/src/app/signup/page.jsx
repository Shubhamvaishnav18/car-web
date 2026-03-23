"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Lock, Info, Terminal } from "lucide-react";
import Link from "next/link"

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("http://localhost:3000/api/auth/signup", {
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
                alert(data.message || "Signup failed");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-full bg-[#F8FAFC]">
            {/* LEFT PANEL */}
            <div className="hidden lg:flex flex-col justify-between w-[36%] relative text-white px-16 py-14 bg-[#0B1727] overflow-hidden">
                <div className="absolute inset-0 opacity-60 bg-cover bg-center" style={{ backgroundImage: "url('/signup-img.png')" }} />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B1727] via-[#0B1727]/90 to-[#0B1727]" />
                <div className="relative z-10">
                    <h1 className="font-[Manrope] text-2xl font-semibold mb-3">Kinetic Precision</h1>
                    <p className="font-[Inter] text-[#7C8FA9] text-sm w-3/4 leading-relaxed">The architectural cockpit for elite automotive fleet management.</p>
                </div>
                <div className="relative z-10 space-y-3">
                    <div className="bg-[#12233a]/90 backdrop-blur-md p-6 rounded-md border border-slate-700 w-[100%]">
                        <div className="mb-4">
                            <div className="p-2 bg-[#1b2f4a] rounded-md w-fit">
                                <Terminal size={18} className="text-white" />
                            </div>
                        </div>
                        <h3 className="font-[Manrope] text-lg text-white mb-2">Engineered for Scale</h3>
                        <p className="font-[Inter] text-sm text-[#8FA7C4] leading-relaxed">Join 500+ premium organizations managing over 50,000 performance vehicles with millisecond precision.</p>
                    </div>
                    <div className="flex justify-between items-center text-[11px] text-[#6B7C93] font-[Inter] w-[85%] tracking-wide">
                        <span>© 2024 KINETIC PRECISION FRAMEWORK.</span>
                        <div className="flex gap-6">
                            <span className="cursor-pointer hover:text-white transition">PRIVACY</span>
                            <span className="cursor-pointer hover:text-white transition">TERMS</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="flex w-full lg:w-[58%] items-center justify-center px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h2 className="text-3xl font-[Manrope] font-bold text-[#1A365D]">Create Account</h2>
                        <p className="text-[#64748B] mt-2 text-sm font-[Inter]">Enter your professional credentials to begin.</p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSignup}>
                        <div className="space-y-2">
                            <Label className="text-[11px] font-[Inter] text-[#475569] uppercase tracking-wider">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444749]" size={16} />
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Alexander Thorne"
                                    className="pl-10 bg-[#F1F5F9] font-[Inter] border-none h-12 text-sm text-[#8392A8]"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[11px] font-[Inter] text-[#475569] uppercase tracking-wider">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444749]" size={16} />
                                <Input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="a.thorne@precision.com"
                                    className="pl-10 bg-[#F1F5F9] font-[Inter] border-none h-12 text-sm text-[#8392A8]"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[11px] font-[Inter] text-[#475569] uppercase tracking-wider">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444749]" size={16} />
                                <Input
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="••••••••••••"
                                    className="pl-10 bg-[#F1F5F9] font-[Inter] border-none h-12 text-sm text-[#8392A8]"
                                />
                            </div>
                            <div className="flex items-center font-[Inter] gap-2 text-[11px] text-[#64748B]">
                                <Info size={14} className="text-[11px] font-[Inter] text-[#64748B]" />
                                <span>Minimum 6 characters.</span>
                            </div>
                        </div>

                        <Button disabled={loading} type="submit" className="w-full bg-[#0F294D] font-[Manrope] rounded-sm hover:bg-[#0B1727] text-white h-12 text-sm cursor-pointer">
                            {loading ? "Creating..." : "Create Account →"}
                        </Button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-[11px] uppercase">
                            <span className="bg-[#F8FAFC] font-[Inter] px-3 text-[#64748B]">OR</span>
                        </div>
                    </div>

                    <Button variant="outline" className="w-full font-[Inter] h-12 text-sm bg-white">
                        Continue with Organization SSO
                    </Button>

                    <p className="text-center font-[Inter] text-sm text-[#64748B]">
                        Already have an account?{" "}
                        <Link href="/login" className="font-[Inter] font-semibold text-[#0F294D]">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}