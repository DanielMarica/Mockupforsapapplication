import { Bell, Search, Grid3X3, ChevronDown, User } from "lucide-react";

export function SapShellBar() {
  return (
    <header className="bg-[#0064d9] text-white flex items-center px-4 h-[44px] gap-3 shadow-md select-none">
      {/* SAP Logo + App Name */}
      <div className="flex items-center gap-3">
        <button className="p-1 rounded hover:bg-white/10 transition-colors">
          <Grid3X3 size={18} />
        </button>
        <div className="flex items-center gap-2">
          <span
            className="text-white font-black tracking-tight"
            style={{ fontSize: "18px", fontFamily: "Arial, sans-serif" }}
          >
            SAP
          </span>
          <div className="w-px h-5 bg-white/30" />
          <span className="text-white/90" style={{ fontSize: "14px" }}>
            Flexso CV Converter
          </span>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right actions */}
      <div className="flex items-center gap-1">
        <button className="p-2 rounded hover:bg-white/10 transition-colors">
          <Search size={16} />
        </button>
        <button className="p-2 rounded hover:bg-white/10 transition-colors relative">
          <Bell size={16} />
          <span
            className="absolute top-1 right-1 w-2 h-2 bg-[#ff5c2b] rounded-full"
            style={{ fontSize: "9px" }}
          />
        </button>
        <button className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/10 transition-colors ml-1">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
            <User size={13} />
          </div>
          <span style={{ fontSize: "13px" }}>John Doe</span>
          <ChevronDown size={12} />
        </button>
      </div>
    </header>
  );
}
