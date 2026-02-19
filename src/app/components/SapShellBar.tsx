import { Menu, Search, Bell, CircleHelp, Settings } from "lucide-react";
import sapLogo from "@/assets/saplogo.jpeg";

export function SapShellBar() {
  return (
    <header
      style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #d9dde3" }}
      className="h-[2.75rem] flex items-center justify-between px-3 shrink-0 select-none shadow-sm"
    >
      {/* LEFT */}
      <div className="flex items-center gap-0">
        <button
          className="w-10 h-10 flex items-center justify-center rounded hover:bg-[#f2f3f4] transition-colors"
          aria-label="Menu"
        >
          <Menu size={18} color="#1a2633" />
        </button>

        <button className="flex items-center justify-center px-2 h-10 hover:bg-[#f2f3f4] rounded transition-colors">
          <img
            src={sapLogo}
            alt="SAP"
            className="h-[1.125rem] w-auto object-contain"
          />
        </button>

        <div className="w-px h-5 bg-[#d9dde3] mx-1" />

        <button className="flex items-center gap-1.5 px-2 h-10 hover:bg-[#f2f3f4] rounded transition-colors">
          <span className="text-[#1a2633] font-semibold" style={{ fontSize: "14px" }}>
            BTP Cockpit
          </span>
        </button>

        <div className="w-px h-5 bg-[#d9dde3] mx-1" />

        <span className="text-[#5a6a78] px-2" style={{ fontSize: "13px" }}>
          Flexso CV Converter
        </span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center">
        <button
          className="w-10 h-10 flex items-center justify-center rounded hover:bg-[#f2f3f4] transition-colors"
          aria-label="Search"
        >
          <Search size={17} color="#5a6a78" />
        </button>

        <button
          className="w-10 h-10 flex items-center justify-center rounded hover:bg-[#f2f3f4] transition-colors relative"
          aria-label="Notifications"
        >
          <Bell size={17} color="#5a6a78" />
          <span
            className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#e9730c] flex items-center justify-center text-white"
            style={{ fontSize: "9px", fontWeight: 700 }}
          >
            3
          </span>
        </button>

        <button
          className="w-10 h-10 flex items-center justify-center rounded hover:bg-[#f2f3f4] transition-colors"
          aria-label="Help"
        >
          <CircleHelp size={17} color="#5a6a78" />
        </button>

        <button
          className="w-10 h-10 flex items-center justify-center rounded hover:bg-[#f2f3f4] transition-colors"
          aria-label="Settings"
        >
          <Settings size={17} color="#5a6a78" />
        </button>

        <button
          className="w-8 h-8 ml-1 flex items-center justify-center rounded-full hover:opacity-80 transition-colors"
          style={{ backgroundColor: "#0064d9" }}
          aria-label="User profile"
        >
          <span className="text-white font-semibold" style={{ fontSize: "11px" }}>
            LM
          </span>
        </button>
      </div>
    </header>
  );
}