import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

function FilterDropdown({ label, options, selected, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option) => {
    if (selected.includes(option)) {
      onChange(selected.filter((o) => o !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const hasActive = selected.length > 0;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`group flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-bold tracking-widest font-space transition-colors ${
          hasActive
            ? "border-[#A3E635] text-[#A3E635] bg-[#A3E635]/10"
            : "border-[#6d28d9] text-[#6d28d9] bg-[#6d28d9]/10 hover:bg-[#6d28d9] hover:text-white"
        }`}
        data-cursor="pointer"
      >
        {label}
        {hasActive && (
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#A3E635] text-[9px] text-black">
            {selected.length}
          </span>
        )}
        <span
          className={
            hasActive
              ? "text-[#A3E635]"
              : "text-[#6d28d9] group-hover:text-white"
          }
        >
          +
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute top-[calc(100%+10px)] right-0 z-20 min-w-[220px] rounded-2xl border border-black/10 bg-white p-2 shadow-2xl"
          >
            <div className="max-h-[260px] overflow-y-auto pr-1 custom-scrollbar">
              {options.map((option) => {
                const isSelected = selected.includes(option);
                return (
                  <button
                    key={option}
                    onClick={() => toggleOption(option)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors ${
                      isSelected
                        ? "bg-[#A3E635]/10 text-[#A3E635] font-semibold"
                        : "text-black/70 hover:bg-black/5"
                    }`}
                    data-cursor="pointer"
                  >
                    {option}
                    {isSelected && <span>✓</span>}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FilterDropdown;
