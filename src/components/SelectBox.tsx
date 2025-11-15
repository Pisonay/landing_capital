import { ChevronDown } from "lucide-react";

interface SelectBoxProps {
  label: string;
  options: string[];
}

export default function SelectBox({ label, options }: SelectBoxProps) {
  return (
    <div className="relative w-full">
      <select
        className="
          appearance-none
          w-full
          text-white
          border
          border-gray-300
          text-center
          py-2
          px-3
          font-semibold
          uppercase
          tracking-wide
          outline-none
          transition-all
          duration-300
          placeholder-white
          focus:border-white
          focus:shadow-[0_0_10px_rgba(255,255,255,0.3)]
        "
        defaultValue=""
      >
        <option value="" disabled hidden>
          {label}
        </option>
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>

      {/* Icono Lucide */}
      <ChevronDown
        className="
          absolute
          right-3
          top-1/2
          -translate-y-1/2
          text-white
          pointer-events-none
          transition-transform
          duration-300
        "
        size={20}
      />
    </div>
  );
}
