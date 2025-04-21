import React, { useState, useRef, useEffect, useCallback } from 'react';

interface Option {
  value: string;
  label: string;
}

interface Props {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onValidate?: (value: string) => void;
  error?: string | null;
  options: Option[];
  placeholder?: string;
  className?: string;
}

const CustomSelect: React.FC<Props> = ({
  id,
  label,
  value,
  onChange,
  onValidate,
  error,
  options,
  placeholder = '-- pilih --',
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((opt) => opt.value === value)?.label || placeholder;

  const handleBlur = useCallback(() => {
    if (interacted) {
      setTouched(true);
      onValidate?.(value);
    }
  }, [interacted, onValidate, value]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
        handleBlur();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleBlur]);

  return (
    <div className={`flex flex-col gap-1 group relative ${className}`} ref={dropdownRef}>
      <label htmlFor={id} className="font-light group-focus-within:font-normal transition-all duration-200">
        {label}
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setOpen((prev) => !prev);
            setInteracted(true);
          }}
          className={`bg-white border-2 border-slate-300 rounded-md px-2 py-1 text-left text-sm font-normal
            focus:border-blue-400 focus:ring-2 focus:ring-blue-200 focus:outline-none w-full transition-all duration-200
            ${value ? 'text-black' : 'text-gray-400'}
          `}
        >
          {selectedLabel}
        </button>

        <div
          className={`absolute z-10 left-0 w-full bg-white mt-1 border border-slate-300 rounded-md shadow transition-all duration-200 origin-top
            ${open ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}
          `}
        >
          {options.map((opt) => (
            <div
              key={opt.value}
              className="p-2 text-sm hover:bg-blue-100 cursor-pointer"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
                setTouched(true);
                onValidate?.(opt.value);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      </div>

      {error && touched && (
        <p className="text-red-500 text-xs font-normal mt-1">{error}</p>
      )}
    </div>
  );
};

export default CustomSelect;
