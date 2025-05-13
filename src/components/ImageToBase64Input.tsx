import React, { useRef } from 'react';

interface ImageToBase64InputProps {
  onChange: (base64: string | null) => void;
  buttonClassName?: string;
  containerClassName?: string;
  buttonTitle?: string;
}

const ImageToBase64Input: React.FC<ImageToBase64InputProps> = ({ onChange, buttonClassName, containerClassName, buttonTitle }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      onChange(null);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64 = reader.result as string;
      onChange(base64);
    };
  };

  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  return (
    <div className={containerClassName ? containerClassName : "flex flex-col gap-4 items-start"}>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={triggerFileInput}
        className={buttonClassName ? buttonClassName : 'px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow'}
      >
        {buttonTitle ? buttonTitle : 'Upload Gambar'} 
      </button>
    </div>
  );
};

export default ImageToBase64Input;
