import useBreakpoint from '@/hooks/useBreakpoint';
import { PDFViewer, PDFDownloadLink, DocumentProps } from '@react-pdf/renderer';
import { ReactElement } from 'react';

interface PDFPreviewWrapperProps {
  children: ReactElement<DocumentProps>;
}

const Preview: React.FC<PDFPreviewWrapperProps> = ({ children }) => {
  const breakpoint = useBreakpoint()
  const isMobile = breakpoint === 'mobile'

  return (
    <div className=" w-full h-full flex items-center justify-center ">
      <div className="w-full h-full">
        {isMobile ? (
          <div className="text-center p-4">
            <p className="mb-4">Pratinjau PDF tidak tersedia di perangkat mobile.</p>
            <PDFDownloadLink
              document={children}
              fileName="preview.pdf"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Download PDF
            </PDFDownloadLink>
          </div>
        ) : (
          <PDFViewer width="100%" height="100%" showToolbar={false}>
            {children}
          </PDFViewer>
        )}
      </div>
    </div>
  );
};

export default Preview;