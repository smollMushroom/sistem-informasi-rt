import React, { HTMLInputTypeAttribute, useState } from "react"

interface Props {
  id: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
  onValidate?: (value: string) => void;
  className?: string;
};

const Input: React.FC<Props> = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onValidate,
  error,
  className = '',
}) => {
  const [touhed, setTouched] = useState(false);
 
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    onValidate?.(e.target.value);
  }

  return (
    <div className={`flex flex-col gap-1 group ${className}`}>
      <label htmlFor={id} className="font-normal">
        {label}
      </label>
      <input
        type={type}
        autoComplete="off"
        id={id}
        className="w-full outline-none bg-white border-2 border-slate-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-400 px-[6px] py-1 text-sm font-normal transition-all duration-300 ease-in-out"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
      />
      {error && touhed && <p className="text-red-500 text-xs font-normal">{error}</p>}
    </div>
  )
}

export default Input