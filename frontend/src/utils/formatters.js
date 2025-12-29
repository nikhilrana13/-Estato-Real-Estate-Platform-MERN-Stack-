
const LABEL_MAP = {
  fullyfurnished: "Fully Furnished",
  semifurnished: "Semi Furnished",
  unfurnished: "Unfurnished",
  readytomove: "Ready To Move",
  underconstruction: "Under Construction",
};
export const formatLabel = (value = "") => {
  if (!value || typeof value !== "string") return "";
  const key = value.replace(/\s+/g, "").toLowerCase();
  // 1 exact known values
  if (LABEL_MAP[key]) return LABEL_MAP[key];
  return value
   // Fullyfurnished → Fully furnished
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    // fullyfurnished → fullyfurnished (no-op)
    .replace(/_/g, " ")
    // lowercase everything
    .toLowerCase()
    // Capitalize each word
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export const formatPrice = (value) => {
  if (value == null || isNaN(value)) return "NA";
  const num = Number(value);
  // Crores
  if (num >= 10000000) {
    return `₹ ${(num / 10000000).toFixed(num % 10000000 === 0 ? 0 : 1)} Crore`;
  }
  // Lakhs
  if (num >= 100000) {
    return `₹ ${(num / 100000).toFixed(num % 100000 === 0 ? 0 : 1)} Lakh`;
  }
  // Thousands (Indian commas)
  return `₹ ${num.toLocaleString("en-IN")}`;
};

export const timeAgo = (date) => {
  if (!date) return "";
  const now = new Date();
  const past = new Date(date);
  if (isNaN(past.getTime())) return "Just now";
  const seconds = Math.floor((now - past) / 1000);

  if (seconds < 60) return "Just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;

  const years = Math.floor(days / 365);
  return `${years}y ago`;
};



