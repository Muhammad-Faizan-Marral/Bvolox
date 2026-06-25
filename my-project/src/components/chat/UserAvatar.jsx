import PropTypes from "prop-types";
import OnlineBadge from "./OnlineBadge";

const colors = [
  // --- Your Original Colors ---
  "bg-indigo-500",
  "bg-violet-500",
  "bg-teal-500",
  "bg-emerald-500",
  "bg-blue-500",
  "bg-rose-500",

  // --- Premium Jewels & Deep Tones ---
  "bg-fuchsia-600", // Vibrant Purple-Pink
  "bg-purple-700", // Deep Royal Amethyst
  "bg-violet-800", // Midnight Violet
  "bg-indigo-900", // Deep Ink / Obsidian Blue
  "bg-blue-900", // Deep Navy
  "bg-cyan-700", // Deep Ocean Blue
  "bg-teal-700", // Dark Teal / Alpine
  "bg-emerald-700", // Forest Emerald
  "bg-rose-700", // Deep Crimson / Wine

  // --- Sophisticated Earthy & Warm Tones ---
  "bg-stone-500", // Warm Slate
  "bg-stone-700", // Deep Walnut
  "bg-neutral-600", // Pure Minimalist Gray
  "bg-zinc-700", // Cool Charcoal
  "bg-slate-600", // Slate Blue-Gray
  "bg-amber-600", // Rich Amber / Marigold
  "bg-orange-600", // Burnt Terracotta
  "bg-red-600", // Premium Scarlet
  "bg-lime-600", // Olive-Lime Green

  // --- Modern Hyper-Saturated & Neon Pops ---
  "bg-pink-500", // Bubblegum Pink
  "bg-fuchsia-500", // Neon Orchid
  "bg-purple-500", // Classic Purple
  "bg-sky-500", // Clean Sky Blue
  "bg-cyan-500", // Cyber Cyan
  "bg-lime-500", // Electric Lime
  "bg-yellow-500", // Cyberpunk Yellow
  "bg-amber-500", // Warm Honey

  // --- Soft & Elegant Pastels (600/400 Balance) ---
  "bg-rose-400", // Soft Blush
  "bg-pink-400", // Pastel Rose
  "bg-fuchsia-400", // Soft Magenta
  "bg-purple-400", // Lavender
  "bg-violet-400", // Pale Violet
  "bg-indigo-400", // Soft Indigo
  "bg-blue-400", // Baby Blue
  "bg-sky-400", // Light Sky
  "bg-cyan-400", // Soft Turquoise
  "bg-teal-400", // Pale Teal
  "bg-emerald-400", // Minty Emerald
  "bg-green-400", // Soft Sage
  "bg-lime-400", // Pistachio
  "bg-yellow-400", // Pastel Yellow
  "bg-amber-400", // Soft Peach
  "bg-orange-400", // Creamsicle Orange

  // --- Ultra-Dark "Luxury Night" Shades ---
  "bg-slate-900", // Gunmetal
  "bg-zinc-900", // Matte Black
  "bg-neutral-900", // Jet Black
  "bg-stone-900", // Dark Onyx
  "bg-red-950", // Dark Burgundy
  "bg-green-950", // Deep British Racing Green
  "bg-fuchsia-950", // Dark Plum
  "bg-cyan-950", // Deep Abyssal Blue
];

export const UserAvatar = ({
  name,
  avatarUrl,
  size = "md",
  online = false,
}) => {
  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.split(" ");
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getColor = (name) => {
    if (!name) return colors[0];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-16 h-16 text-xl",
  };
console.log("avatarUrl is ", avatarUrl)
  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full text-white font-medium ${sizeClasses[size]} ${!avatarUrl ? getColor(name) : ""}`}
    >
      {avatarUrl ? (
        <div>
          <img
            src={avatarUrl}
            alt={name || "User"}
            className="w-full h-full rounded-full "
          />
        </div>
      ) : (
        getInitials(name)
      )}

      <OnlineBadge online={online} />
    </div>
  );
};

UserAvatar.propTypes = {
  name: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string, // Naya prop add kiya
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  online: PropTypes.bool,
};

export default UserAvatar;
