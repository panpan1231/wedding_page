import { useEffect, useRef, useState } from "react";

export default function ExpandableItem({
  title,
  subtitle,
  children,
  isOpen,
  onClick,
}) {
  const [flash, setFlash] = useState(false);
  const [flashDir, setFlashDir] = useState("right"); // "right" or "left"
  const prevIsOpen = useRef(isOpen);

  useEffect(() => {
    if (isOpen !== prevIsOpen.current) {
      setFlash(true);
      setFlashDir(isOpen ? "right" : "left");
      setTimeout(() => setFlash(false), 300);
      prevIsOpen.current = isOpen;
    }
  }, [isOpen]);

  return (
    <div className={`w-full text-[#F3EBD3] pb-4 ${isOpen ? "fade-bg" : ""}`}>
      {/* 閃光動畫 keyframes */}
      <style>
        {`
      @keyframes flash-right {
        0% { transform: translateX(-100%); opacity: 0.7; }
        60% { opacity: 1; }
        100% { transform: translateX(100%); opacity: 0; }
      }
      @keyframes flash-left {
        0% { transform: translateX(100%); opacity: 0.7; }
        60% { opacity: 1; }
        100% { transform: translateX(-100%); opacity: 0; }
      }
      .animate-flash-right {
        animation: flash-right 0.3s linear;
      }
      .animate-flash-left {
        animation: flash-left 0.3s linear;
      }
      `}
      </style>
      <div
        className="relative pb-2 border-b border-[#F3EBD3] flex justify-between items-center cursor-pointer"
        onClick={onClick}
      >
        {/* 閃光條 */}
        <span
          className={`pointer-events-none h-[80%] absolute left-0 top-0 w-[50%] ${
            flash
              ? flashDir === "right"
                ? "animate-flash-right"
                : "animate-flash-left"
              : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(120deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 60%, rgba(255,255,255,0) 100%)",
            zIndex: 1,
          }}
        />
        <div style={{ zIndex: 2, position: "relative" }}>
          <span className="text-[24px] leading-0 tracking-wider italic font-semibold">
            {title}
          </span>
        </div>
        <div style={{ zIndex: 2, position: "relative" }}>
          <span className="ml-4 flex justify-end items-end  font-bold">
            {subtitle}
            <svg
              className={`ml-2 mb-[2px] transition-all duration-300 ${
                isOpen ? "rotate-315" : "rotate-0"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
            >
              <path fill="#F3EBD3" d="M5 13v-1h6V6h1v6h6v1h-6v6h-1v-6H5Z" />
            </svg>
          </span>
        </div>
      </div>
      <div
        className={`mt-4 text-white text-sm transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
