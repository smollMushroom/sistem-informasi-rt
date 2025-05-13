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
  labelClassName?: string;
  inputClassName?: string;
  mode?: 'edit' | 'view'
  viewClassName?: string;
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
  labelClassName = '',
  inputClassName = '',
  mode='edit',
  viewClassName = ''
}) => {
  const [touched, setTouched] = useState(false);
 
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    onValidate?.(e.target.value);
  }

  return (
    <div className={`flex flex-col gap-1 group ${className}`}>
    <label htmlFor={id} className={labelClassName ? labelClassName : `font-normal text-normal`}>
      {label}
    </label>

    {mode === 'edit' ? (
      <input
        type={type}
        autoComplete="off"
        id={id}
        className={inputClassName ? inputClassName : `w-full outline-none bg-white border-2 border-slate-300 rounded-md focus:ring-2 focus:ring-green-300 focus:border-primary px-[6px] py-1 text-sm font-normal transition-all duration-300 ease-in-out`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
      />
    ) : (
      <div
        className={viewClassName? viewClassName : "w-full bg-gray-100 border-2 border-slate-200 rounded-md px-[6px] py-1 text-sm font-normal text-gray-700"}
      >
        {value || '-'}
      </div>
    )}

    {error && touched && <p className="text-red-500 text-xs font-normal">{error}</p>}
  </div>
  )
}

export default Input