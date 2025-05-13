import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface NewsThumbnailEditorProps {
  initialContent?: string;
  onChange?: (html: string) => void;
  width?: string;
  height?: string;
  className?: string;
  placeholder?: string;
}

const NewsThumbnailEditor: React.FC<NewsThumbnailEditorProps> = ({
  initialContent = '',
  onChange,
  width,
  height,
  className,
  placeholder
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: placeholder || 'Masukkan gambar thumbnail di sini',
        modules: {
          toolbar: [['image']],
        },
      });

      if (initialContent) {
        quillInstance.current.root.innerHTML = initialContent;
      }

      quillInstance.current.on('text-change', () => {
        const html = quillInstance.current?.root.innerHTML || '';

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const img = doc.querySelector('img');
        const cleanHtml = img ? `<img src="${img.src}" />` : '';

        if (
          quillInstance.current &&
          quillInstance.current.root.innerHTML !== cleanHtml
        ) {
          quillInstance.current.root.innerHTML = cleanHtml;
        }

        onChange?.(cleanHtml);
      });
    }
  }, []);

  useEffect(() => {
    if (quillInstance.current && initialContent) {
      const currentHTML = quillInstance.current.root.innerHTML;
      if (currentHTML !== initialContent) {
        quillInstance.current.root.innerHTML = initialContent;
      }
    }
  }, [initialContent]);

  return (
    <div
      className={`bg-white rounded shadow min-w-[50px] w-full h-fit ${className}`}
      style={{ width }}
    >
      <div
        ref={editorRef}
        style={{ height: height ?? '200px' }}
        className={`select-none pointer-events-none`}
      />
    </div>
  );
};

export default NewsThumbnailEditor;
