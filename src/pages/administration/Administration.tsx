import Footer from '@/components/Footer';
import Header from '@/components/Header';
import mailBlack from '@/assets/mail-black.png';
import mailWhite from '@/assets/mail-white.png';
import AnimatedItem from '@/components/AnimatedItem';
import useBreakpoint from '@/hooks/useBreakpoint';
import { Link } from 'react-router-dom';

const Administration = () => {
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === 'desktop';
  return (
    <div className=" w-full flex items-center justify-start flex-col">
      <Header />
      <div className="flex-grow max-w-[1100px] w-[90%] md:w-full md:p-6 h-fit flex flex-col items-center my-[50px] gap-[50px] ">
        <div>
          <h2 className="text-center text-header2 font-bold text-primary">
            Layanan Administrasi RT 006
            <br />
            Desa Cimandala
          </h2>
        </div>

        <AnimatedItem>
          <div className="bg-[#34874099] h-[451px] p-[30px] w-full flex md:flex-row gap-4 flex-col items-center justify-start rounded-lg shadow-md">
            <img
              className=" w-[200px] h-[200px] md:w-[280px] md:h-[280px]"
              src={mailWhite}
              alt="mail-icon"
            />
            <div>
              <h3 className="text-white font-bold text-header3 mb-3 text-center md:text-start">
                Kebutuhan Surat
              </h3>
              <p className="text-white max-w-[687px]  text-center md:text-start">
                Fitur surat menyurat digunakan untuk memfasilitasi proses
                pengajuan, verifikasi, dan pencetakan berbagai jenis surat
                administrasi oleh warga kepada pengurus RT secara digital.
              </p>
            </div>
          </div>
        </AnimatedItem>

        <div className="flex flex-col md:flex-row gap-5 w-full p-4">
          <AnimatedItem className="bg-white border hover:cursor-pointer w-full md:w-[32%] h-[250px] md:h-[383px] rounded-lg shadow-lg flex flex-col gap-3 justify-center items-center">
            <Link to={'/administration/submission/ktp'}  className='flex flex-col w-full items-center gap-2'>
              <img
                className="w-[150px] md:w-[221px]"
                src={mailBlack}
                alt="mail-black"
              />
              <p className="font-bold text-center">Surat Pengantar KTP</p>
            </Link>
          </AnimatedItem>
          <AnimatedItem
            delay={isDesktop ? 0.1 : 0}
            className="bg-[#34874099] hover:cursor-pointer w-full md:w-[32%] h-[250px] md:h-[383px] rounded-lg shadow-lg flex flex-col gap-3 justify-center items-center"
          >
            <Link to={'/administration/submission/kk'}  className='flex flex-col w-full items-center gap-2'>
              <img
                className="w-[150px] md:w-[221px]"
                src={mailWhite}
                alt="mail-black"
              />
              <p className="font-bold text-white text-center">Surat Pengantar KK</p>
            </Link>
          </AnimatedItem>
          <AnimatedItem
            delay={isDesktop ? 0.2 : 0}
            className="bg-white border hover:cursor-pointer w-full md:w-[32%] h-[250px] md:h-[383px] rounded-lg shadow-lg flex flex-col gap-3 justify-center items-center"
          >
            <Link to={'/administration/submission/skd'} className='flex flex-col w-full items-center gap-2'>
              <img
                className="w-[150px] md:w-[221px]"
                src={mailBlack}
                alt="mail-black"
              />
              <p className="font-bold text-center">Surat Keterangan Domisili</p>
            </Link>
          </AnimatedItem>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Administration;
