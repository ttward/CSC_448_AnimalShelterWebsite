
import { useState } from "react";
import {
  PawPrint,
  Eye,
  EyeOff,
  Heart,
  ArrowRight,
} from "lucide-react";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Your passwords do not match!");
      return;
    }

    alert("Your registration form is ready! Account creation will be connected later.");
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

          <div className="absolute left-10 top-10 flex items-center gap-3 text-white">
            <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
              <PawPrint size={28} />
            </div>
            <span className="text-lg font-semibold tracking-wide">
              A Place for Every Paw
            </span>
          </div>

          <div className="absolute bottom-12 left-10 right-10 text-white">
            <div className="mb-5 flex items-center gap-2">
              <Heart size={20} className="fill-white" />
              <span className="text-sm font-medium tracking-wider uppercase">
                Love starts here
              </span>
            </div>

            <h1 className="mb-5 text-4xl font-bold leading-tight xl:text-5xl">
              Every pet deserves a place to call home.
            </h1>

            <p className="max-w-md text-base leading-relaxed text-white/85">
              Join our community and help make a difference
              in the lives of animals waiting for their forever families.
            </p>
          </div>
        </section>

        {/* RIGHT SIDE - REGISTRATION FORM */}
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
                Welcome!
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-stone-800 sm:text-4xl">
                Create your account
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-stone-500">
                Sign up to discover loving companions and
                become part of our animal-loving community.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

            {/* First and Last Name */}
            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">
                  First name
                </label>

                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  autoComplete="given-name"
                  required
                  className={inputStyle}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">
                  Last name
                </label>

                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  autoComplete="family-name"
                  required
                  className={inputStyle}
                />
              </div>

            </div>

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
                    placeholder="Create a password"
                    autoComplete="new-password"
                    minLength={8}
                    required
                    className={`${inputStyle} pr-12`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-emerald-800"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>

                <p className="mt-2 text-xs text-stone-400">
                  Must be at least 8 characters.
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">
                  Confirm password
                </label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Enter your password again"
                    autoComplete="new-password"
                    required
                    className={`${inputStyle} pr-12`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-emerald-800"
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 text-sm leading-relaxed text-stone-500">
                <input
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 accent-emerald-800"
                />
                <span>
                  I agree to the Terms of Service and Privacy Policy.
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 py-4 font-semibold text-white shadow-md transition hover:bg-emerald-900 hover:shadow-lg"
              >
                Create account
                <ArrowRight size={18} />
              </button>

            </form>

            {/* Sign in */}
            <p className="mt-8 text-center text-sm text-stone-500">
              Already have an account?{" "}
              <span className="font-semibold text-emerald-800">
                Sign in coming soon
              </span>
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