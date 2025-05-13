import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  isSubmission: boolean;
  role: 'ketua' | 'admin' | 'warga'
  handleSubmit: () => void;
}

const LetterAction: React.FC<Props> = ({ isSubmission, handleSubmit }) => {
  
  const navigate = useNavigate();

  const handleClickSubmit = () => {
    handleSubmit()
  }


  return (

    <div className={`w-full border shadow-lg h-fit p-4 rounded-md flex flex-col gap-4 ${isSubmission ? 'block' : 'hidden'}`}>
      <h2 className="text-header3 font-bold text-primary text-center mb-4">
        Tinjau Ulang Surat
      </h2>
      <div className='flex gap-2'>
        <button
          className="py-2 px-4 border rounded-md flex-1 bg-primary text-white font-bold"
          onClick={() => navigate('/dashboard/profile')}
        >
          Perbarui Data
        </button>
        <button
          className="py-2 px-4 border rounded-md flex-1 bg-blue-600 text-white font-bold"
          onClick={handleClickSubmit}
        >
          Ajukan Surat
        </button>
      </div>
    </div>
  );
};

export default LetterAction;
