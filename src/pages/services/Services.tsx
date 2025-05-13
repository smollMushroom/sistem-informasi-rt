import AnimatedItem from '@/components/AnimatedItem';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Link } from 'react-router-dom';
import searchDocumentIcon from '@/assets/search-document-icon.png';
import administrationIcon from '@/assets/administration-icon.png';
import useBreakpoint from '@/hooks/useBreakpoint';

const Services = () => {
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === 'desktop';

  return (
    <div className="flex flex-col justify-center items-center">
      <Header />
      <div className="max-w-[1100px] w-full flex flex-col justify-center items-center gap-[50px] my-4 md:my-[50px]">
        <div className="text-center flex flex-col w-[90%] gap-[15px]">
          <h2 className="text-header2 font-bold">
            LAYANAN RT 006 RW 004
            <br />
            DESA CIMANDALA KECAMATAN SUKARAJA
          </h2>
          <p className="text-normal text-justify md:text-center">
            RT 006 RW 004 berkomitmen memberikan pelayanan yang mudah, cepat,
            dan transparan bagi seluruh warga. Melalui halaman layanan ini,
            warga dapat mengakses berbagai kebutuhan administratif maupun
            informasi penting secara online, tanpa harus repot datang langsung
            ke pos RT.
          </p>
          <p className="text-normal text-justify md:text-center">
            Kami menyediakan beberapa layanan utama yang dapat membantu
            mempercepat proses administrasi dan meningkatkan kenyamanan warga
            dalam berinteraksi dengan pengurus RT.
          </p>
        </div>

        <div className="flex gap-[50px]">
          <AnimatedItem delay={0}>
            <Link
              to="/info"
              className="flex flex-col justify-between md:h-[180px] items-center gap-2 p-2 rounded cursor-pointer transition hover:scale-105"
            >
              <img
                src={searchDocumentIcon}
                alt="search-document-icon"
                className="w-[70px] h-[80px]"
              />
              <span className="text-normal text-primary text-center font-bold">
                Informasi
                <br />
                Rukun Tetangga
              </span>
            </Link>
          </AnimatedItem>
          <AnimatedItem delay={isDesktop ? 0.1 : 0}>
            <Link
              to="/administration"
              className="flex flex-col justify-between md:h-[180px] items-center gap-2 p-2 rounded cursor-pointer transition hover:scale-105"
            >
              <img
                src={administrationIcon}
                alt="administration-icon"
                className="w-[95px] h-[75px]"
              />
              <span className="text-normal text-primary text-center font-bold">
                Administrasi
                <br />
                Rukun Tetangga
              </span>
            </Link>
          </AnimatedItem>
        </div>
        <div></div>
      </div>
      <Footer />
    </div>
  );
};

export default Services;
