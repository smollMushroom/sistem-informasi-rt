import Footer from '@/components/Footer';
import Header from '@/components/Header';
import VillageMap from '@/components/VillageMap';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FaPeopleRoof } from 'react-icons/fa6';
import { MdOutlineEmojiPeople } from 'react-icons/md';
import AnimatedItem from '@/components/AnimatedItem';
import useBreakpoint from '@/hooks/useBreakpoint';

const Info = () => {
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === 'desktop';
  return (
    <div className="flex flex-col justify-center items-center bg-secondary">
      <Header />
      <div className="my-[50px] w-[90%] md:w-full max-w-[1100px]">
        <h1 className="text-center text-primary font-bold text-header2 md:text-title tracking-wide py-[50px]">
          HALAMAN INFORMASI WARGA RT 006
        </h1>
        <AnimatedItem>
          <div className="border bg-white rounded-3xl shadow-lg mb-[50px] flex gap-[30px] md:gap-[50px] md:justify-center flex-col items-center h-fit w-full mt-[50px] pt-[40px] md:py-[50px]">
            <h3 className="text-header2 font-bold text-primary">
              STATISTIK WARGA
            </h3>
            <div className="flex flex-col md:flex-row justify-center items-center gap-[20px] md:gap-[50px] w-full mb-[30px] px-[20px]">
              <div className="flex flex-col gap-2 justify-center items-center bg-white border shadow-lg min-w-[100px] w-full md:w-[40%] max-w-[300px] md:max-w-[250px] h-[150px] px-2 py-3 rounded-lg transition hover:scale-105">
                <FaPeopleRoof size={30} className="text-primary" />
                <span className="font-bold text-primary tracking-wide text-title ">
                  224
                </span>
                <p className="text-header4 font-bold text-primary">Jumlah KK</p>
              </div>
              <div className="flex flex-col gap-2 justify-center items-center bg-primary border border-primary shadow-lg min-w-[100px] w-full max-w-[300px] md:max-w-[250px] h-[150px] px-2 py-3 rounded-lg transition hover:scale-105">
                <MdOutlineEmojiPeople size={30} className="text-white" />
                <span className="font-bold text-white tracking-wide text-title ">
                  520
                </span>
                <p className="text-header4 font-bold text-white">
                  Jumlah Warga
                </p>
              </div>
              <div className="flex flex-col gap-2 justify-center items-center bg-white border shadow-lg min-w-[100px] w-full max-w-[300px] md:max-w-[250px] h-[150px] px-2 py-3 rounded-lg transition hover:scale-105">
                <FaRegCalendarAlt size={30} className="text-primary" />
                <span className="font-bold text-primary tracking-wide text-title ">
                  0
                </span>
                <p className="text-header4 font-bold text-primary">
                  Agenda Bulan ini
                </p>
              </div>
            </div>
          </div>
        </AnimatedItem>
        <AnimatedItem>
          <div className="bg-[#FFF] shadow-lg rounded-3xl w-full flex flex-col md:flex-row items-center gap-[50px] p-[20px] md:p-[50px]">
            <div className="shadow-lg rounded-lg">
              <VillageMap height={isDesktop ? "400px" : '250px'} zoom={!isDesktop ? 13 : undefined} width={isDesktop ? "400px" : '250px'} className="rounded-lg" />
            </div>
            <div className="text-center flex flex-col gap-[20px]">
              <h3 className="text-header2 text-primary font-bold">
                Desa Cimandala
              </h3>
              <p className="text-normal">
                RT 006 merupakan bagian dari wilayah administratif Desa
                Cimandala, Kecamatan Sukaraja, Kabupaten Bogor. Peta di samping
                menunjukkan batas desa secara keseluruhan, termasuk area tempat
                RT 006 berada. Aplikasi ini hadir untuk memudahkan warga RT 006
                dalam mengakses layanan administrasi, informasi kegiatan, dan
                pengajuan surat secara digital sebagai bagian dari upaya
                modernisasi pelayanan desa.
              </p>
            </div>
          </div>
        </AnimatedItem>
      </div>
      <Footer />
    </div>
  );
};

export default Info;
