import { useEffect, useRef, useState } from "react";

export default function ExpandableItem({
  title,
  subtitle,
  children,
  isOpen,
  onClick,
}) {
  const prevIsOpen = useRef(isOpen);

  useEffect(() => {
    if (isOpen !== prevIsOpen.current) {
      prevIsOpen.current = isOpen;
    }
  }, [isOpen]);

  return (
    <div className={`w-full text-[#F3EBD3] pb-4 ${isOpen ? "" : ""}`}>
      <div
        className="relative pb-1 border-b border-[#F3EBD3] flex justify-between items-center cursor-pointer"
        onClick={onClick}
      >
        <div style={{ zIndex: 2, position: "relative" }}>
          <span className="text-[24px] tracking-wider italic font-semibold">
            {title}
          </span>
        </div>
        <div style={{ zIndex: 2, position: "relative" }}>
          <span className="ml-4 flex justify-end items-end  font-bold">
            {subtitle}
            <svg
              className={`ml-2 mb-[2px] transition-all duration-300 ${
                isOpen ? "rotate-45" : "rotate-0"
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
          isOpen ? "opacity-100 max-h-[700px]" : "opacity-0 max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
