// src/components/QuillEditor.tsx
import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import QuillResizeImage from 'quill-resize-image';

Quill.register('modules/imageResize', QuillResizeImage);

interface NewsContentEditorProps {
  initialContent?: string;
  onChange?: (html: string) => void;
  width?: string;
  height?: string;
  className?: string;
}

const NewsContentEditor: React.FC<NewsContentEditorProps> = ({ initialContent = '', onChange, height, className }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Tulis isi pengumuman/berita di sini...',
        modules: {
          toolbar: [
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            ['link', 'image', 'video', 'formula'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }], 
            
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'] 
          ],
          imageResize: {
            modules: ['Resize', 'DisplaySize'],
          },
        },
      });
  
      if (initialContent) {
        quillInstance.current.root.innerHTML = initialContent;
      }
  
      quillInstance.current.on('text-change', () => {
        const html = quillInstance.current?.root.innerHTML;
        onChange?.(html || '');
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
    <div className={`bg-white rounded shadow ${className}`}>
      <div ref={editorRef} style={{ height: height ? height : '300px'}} />
    </div>
  );
};

export default NewsContentEditor;
