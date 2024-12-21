import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";


const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    })
    const { signup, isSigningUp } = useAuthStore()

    const valitdateForm = () => {
        if (!formData.fullName.trim()) {
            return toast.error("Vui lòng nhập tên của bạn")
        }
        if (!formData.email.trim()) {
            return toast.error("Vui lòng nhập email của bạn")
        }
        if (!formData.password.trim()) {
            return toast.error("Vui lòng nhập mật khẩu của bạn")
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Không đúng định dạng email");
        if (formData.password.length < 6) return toast.error("Tối thiểu 6 kí tự")
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const success = valitdateForm()
        if (success === true) signup(formData);

    }
    return (
        <div className="min-h-screen grid lg:grid-cols-2">
            {/* left side */}
            <div className="flex flex-col justify-center items-center sm:p-1 p-9">
                <div className="w-full max-w-md space-y-5">
                    {/* LOGO */}
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div
                                className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors"
                            >
                                <MessageSquare className="size-6 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold mt-2">Tạo tài khoản mới</h1>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Tên đăng nhập</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type="text"
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="Tên đăng nhập thật ngầu"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type="email"
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="Email riêng của bạn"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium">Mật khẩu</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="size-5 text-base-content/40" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="Mật khẩu khó đoán"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="size-5 text-base-content/40" />
                                    ) : (
                                        <Eye className="size-5 text-base-content/40" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className={`relative btn btn-primary w-full overflow-hidden 
    bg-gradient-to-r from-primary to-primary/70 
    hover:from-primary/90 hover:to-primary 
    text-white font-medium`} disabled={isSigningUp}>
                            {isSigningUp ? (
                                <>
                                    <Loader2 className="size-5 animate-spin" />
                                    Đang tải
                                </>
                            ) : (
                                "Tạo tài khoản"
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-base-content/60">
                            Bạn đã có tài khoản rồi?{" "}
                            <Link to="/dang-nhap" className="link link-primary">
                                Đăng nhập ngay
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* right side */}

            <AuthImagePattern
                title="Gia nhập với chúng tôi ngay"
                subtitle="Kết nối với bạn bè, người thân và những người bạn yêu thương"
            />
        </div>
    )
}

export default SignUpPage
