import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user }, error: authError } =
        await supabase.auth.getUser();

      if (authError || !user) {
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error(error.message);
        return;
      }

      setProfile(data);
    };

    loadProfile();
  }, [navigate]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/login");
  };

  if (!profile) {
    return <p className="p-8">Loading your account...</p>;
  }

  return (
    <main className="min-h-screen bg-[#f7f6f1] p-8">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-lg">

        <h1 className="text-3xl font-bold text-stone-800">
          Welcome, {profile.first_name}!
        </h1>

        <p className="mt-3 text-stone-500">
          Welcome to your animal shelter dashboard.
        </p>

        <p className="mt-6 text-stone-700">
          Email: {profile.email}
        </p>

        <button
          onClick={handleLogout}
          className="mt-8 rounded-xl bg-emerald-800 px-6 py-3 font-semibold text-white hover:bg-emerald-900"
        >
          Log out
        </button>

      </div>
    </main>
  );
}