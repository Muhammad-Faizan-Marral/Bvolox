import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import TopBar from "../components/layout/TopBar";
import UserAvatar from "../components/chat/UserAvatar";
import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
import ImageUploader from "../components/common/ImageUploader";
import { updateUser } from "../api/auth.api";

export const ProfilePage = () => {
  const { onMenuClick } = useOutletContext();
  const { user, logout } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || ". . .");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState();

  const handleAvatarSuccess = (url) => {
    setAvatar(url);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const userId = user?._id || user?.id;
      const { data } = await updateUser({ id: userId, name, bio, avatar });

      console.log("Updated data from backend:", data);
      setName(data.user.name);
      setBio(data.user.bio);
      setAvatar(data.user.avatar || "");
      alert("Profile saved successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong !";
      console.log("Full Error Object:", error);
      setError(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300">
      <TopBar onMenuClick={onMenuClick} title="Account" />
      
      <div className="flex-1 overflow-y-auto px-4 py-8 sm:p-8 md:p-12 chat-scroll">
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Profile Card */}
          <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-zinc-200/80 dark:border-zinc-800/60 p-6 md:p-10 shadow-sm transition-all duration-300">
            
            {error && (
              <div className="mb-6 rounded-xl w-full bg-red-50/50 dark:bg-red-950/10 border border-red-200/50 dark:border-red-900/30 px-4 py-3 text-xs md:text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
              
              {/* Left Column: Avatar & Upload */}
              <div className="flex flex-col items-center gap-4 flex-shrink-0">
                <div className="relative group p-1.5 rounded-full border border-zinc-200/60 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-inner flex items-center justify-center h-36 w-36 sm:h-40 sm:w-40 transition-transform duration-300 hover:scale-[1.02]">
                  <UserAvatar
                    name={name || "User"}
                    avatarUrl={avatar}
                    size="lg"
                    online={true}
                  />
                </div>
                
                <div className="w-full max-w-[150px] text-center">
                  <ImageUploader
                    onUploadSuccess={handleAvatarSuccess}
                    defaultPreview={avatar}
                  />
                </div>
              </div>

              {/* Right Column: Information Form */}
              <div className="flex-1 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                    Personal Details
                  </h2>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                    Manage your public workspace identity and avatar presence.
                  </p>
                </div>

                <div className="space-y-4">
                  <InputField
                    label="Full Name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full rounded-xl border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 focus:ring-zinc-400/20 transition-all text-sm py-2.5"
                  />

                  <InputField
                    label="Email Address"
                    type="email"
                    name="email"
                    value={user?.email || ""}
                    onChange={() => {}}
                    disabled
                    className="w-full rounded-xl bg-zinc-50/80 dark:bg-zinc-950/60 opacity-60 border-zinc-200/50 dark:border-zinc-800/50 cursor-not-allowed text-sm py-2.5"
                  />

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      Bio
                    </label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={3}
                      className="w-full px-3.5 py-2.5 bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-zinc-900/5 dark:focus:ring-white/5 focus:border-zinc-400 dark:focus:border-zinc-600 outline-none transition-all text-sm text-zinc-900 dark:text-zinc-100 resize-none placeholder-zinc-400"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button
                    onClick={handleSave}
                    disabled={isSaving || !name.trim()}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                  >
                    {isSaving ? "Saving Changes..." : "Save Changes"}
                  </Button>
                </div>
              </div>

            </div>
          </div>

          {/* Security Card */}
          <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md rounded-2xl border border-zinc-200/80 dark:border-zinc-800/60 p-6 md:p-10 shadow-sm transition-all duration-300">
            <div>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                Security & Environment
              </h2>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                Monitor your active session states and handle secure exits.
              </p>
            </div>

            <div className="mt-6 divide-y divide-zinc-100 dark:divide-zinc-800/60">
              
              {/* Row 1: Active Instance */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 first:pt-0">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Current Session</p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">Log out from your current browser active window.</p>
                </div>
                <button
                  onClick={() => logout(false)}
                  className="w-full sm:w-auto text-center px-4 py-2 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 rounded-xl transition-all text-xs font-medium shadow-sm"
                >
                  Logout
                </button>
              </div>

              {/* Row 2: Terminate Everywhere */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 last:pb-0">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Global Termination</p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">Instantly sign out from all browsers and systems.</p>
                </div>
                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to log out from all devices?")) {
                      logout(true);
                    }
                  }}
                  className="w-full sm:w-auto text-center px-4 py-2 bg-red-50/40 dark:bg-red-950/10 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 rounded-xl transition-all text-xs font-medium"
                >
                  Disconnect All
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;