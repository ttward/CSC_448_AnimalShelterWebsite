import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Link, useNavigate } from "react-router-dom";
import {
  PawPrint,
  Eye,
  EyeOff,
  Heart,
  ArrowRight,
} from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
        const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
        });

        if (error) throw error;

        navigate("/dashboard");

    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
};

  const inputStyle =
    "w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3.5 text-sm text-stone-800 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/10 placeholder:text-stone-400";

  return (
    <main className="min-h-screen bg-[#f7f6f1] p-4 md:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl lg:grid-cols-2">

        {/* LEFT SIDE - IMAGE */}
        <section className="relative hidden min-h-[700px] lg:block">

          <img
            src="https://images.unsplash.com/photo-1552053831-71594a27632d?w=1200"
            alt="Happy golden retriever"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/10" />

          {/* Logo */}
          <div className="absolute left-10 top-10 flex items-center gap-3 text-white">
            <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
              <PawPrint size={28} />
            </div>

            <span className="text-lg font-semibold tracking-wide">
              A Place for Every Paw
            </span>
          </div>

          {/* Image text */}
          <div className="absolute bottom-12 left-10 right-10 text-white">

            <div className="mb-5 flex items-center gap-2">
              <Heart size={20} className="fill-white" />

              <span className="text-sm font-medium tracking-wider uppercase">
                Welcome back
              </span>
            </div>

            <h1 className="mb-5 text-4xl font-bold leading-tight xl:text-5xl">
              Every paw deserves a little more love.
            </h1>

            <p className="max-w-md text-base leading-relaxed text-white/85">
              Sign in to continue your journey, discover
              loving companions, and help animals find
              their forever homes.
            </p>

          </div>
        </section>

        {/* RIGHT SIDE - LOGIN FORM */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-12 lg:px-14">

          <div className="w-full max-w-md">

            {/* Mobile logo */}
            <div className="mb-10 flex items-center gap-2 lg:hidden">
              <PawPrint className="text-emerald-800" size={28} />

              <span className="font-semibold text-emerald-900">
                A Place for Every Paw
              </span>
            </div>

            {/* Heading */}
            <div className="mb-9">

              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-emerald-800">
                Welcome back!
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-stone-800 sm:text-4xl">
                Sign in to your account
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-stone-500">
                We're happy to have you back! Sign in to
                continue making a difference in the lives
                of animals waiting for their forever homes.
              </p>

            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>

                <label className="mb-2 block text-sm font-medium text-stone-700">
                  Email address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className={inputStyle}
                />

              </div>

              {/* Password */}
              <div>

                <label className="mb-2 block text-sm font-medium text-stone-700">
                  Password
                </label>

                <div className="relative">

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className={`${inputStyle} pr-12`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-emerald-800"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

              </div>

              {/* Remember me and Forgot password */}
              <div className="flex items-center justify-between gap-3">

                <label className="flex items-center gap-2 text-sm text-stone-500">

                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 accent-emerald-800"
                  />

                  Remember me

                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm font-semibold text-emerald-800 transition hover:text-emerald-900"
                >
                  Forgot password?
                </Link>

              </div>

              {error && (
                <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
                    {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 py-4 font-semibold text-white shadow-md transition hover:bg-emerald-900 disabled:opacity-60"
                >
                {loading ? "Signing in..." : "Sign in"}
                {!loading && <ArrowRight size={18} />}
              </button>

            </form>

            {/* Register link */}
            <p className="mt-8 text-center text-sm text-stone-500">

              Don't have an account?{" "}

              <Link
                to="/register"
                className="font-semibold text-emerald-800 transition hover:text-emerald-900"
              >
                Create an account
              </Link>

            </p>

            <p className="mt-8 text-center text-xs text-stone-400">
              Made with love for animals everywhere.
            </p>

          </div>
        </section>
      </div>
    </main>
  );
}