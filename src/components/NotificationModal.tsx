import React from 'react';

interface NotificationModalProps {
  visible: boolean;
  type?: 'success' | 'error' | 'info';
  title?: string;
  message: string;
  onClose: () => void;
}

const getTypeColor = (type: 'success' | 'error' | 'info' = 'info') => {
  switch (type) {
    case 'success':
      return 'bg-green-100 text-green-800';
    case 'error':
      return 'bg-red-100 text-red-800';
    case 'info':
    default:
      return 'bg-blue-100 text-blue-800';
  }
};

const NotificationModal: React.FC<NotificationModalProps> = ({
  visible,
  type = 'info',
  title,
  message,
  onClose,
}) => {
  if (!visible) return null;

  const colorClass = getTypeColor(type);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className={`w-[90%] md:w-full max-w-sm rounded-lg p-6 shadow-lg bg-white`}>
        <div className={`p-4 rounded ${colorClass}`}>
          <h3 className="text-lg font-semibold mb-2">{title ?? (type === 'success' ? 'Sukses' : type === 'error' ? 'Gagal' : 'Info')}</h3>
          <p>{message}</p>
        </div>
        <div className="mt-4 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
