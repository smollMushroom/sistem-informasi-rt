import AnimatedItem from '@/components/AnimatedItem';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const About = () => {
  return (
    <div>
      <Header />
      <div className="flex justify-center items-center w-full">
        <div className="flex w-[90%] md:max-w-[1100px] flex-col gap-[50px] py-[30px]">
          <AnimatedItem>
            <div className="flex flex-col gap-[20px]">
              <h3 className="text-header2 font-bold text-center">
                TENTANG RT 006 RW 004
                <br />
                DESA CIMANDALA KECAMATAN SUKARAJA
              </h3>
              <p className="md:text-normal text-justify">
                RT 006 RW 004 adalah salah satu Rukun Tetangga yang berada di
                wilayah Desa Cimandala, Kecamatan Sukaraja, Kabupaten Bogor.
                Kami merupakan komunitas warga yang aktif, guyub, dan saling
                mendukung dalam menjaga keharmonisan serta kenyamanan
                lingkungan.
              </p>
              <p className="md:text-normal text-justify">
                Melalui website ini, kami berupaya menyediakan informasi terkini
                seputar kegiatan warga, layanan administrasi RT, pengumuman
                penting, serta wadah aspirasi dan pengaduan. Kami percaya bahwa
                dengan komunikasi yang baik, keterbukaan informasi, dan semangat
                gotong royong, kita bisa membangun lingkungan yang lebih baik
                dan inklusif bagi seluruh warga.
              </p>
              <p className="md:text-normal text-justify">
                Mari bersama-sama menjaga lingkungan RT 006 RW 004 agar tetap
                aman, bersih, dan penuh kebersamaan!
              </p>
            </div>
          </AnimatedItem>
          <AnimatedItem>
            <div className="flex flex-col gap-[20px]">
              <h3 className="text-header2 font-bold text-center">
                VISI & MISI
                <br />
                RT 006 RW 004 DESA CIMANDALA
              </h3>
              <div className="flex flex-col gap-[20px] md:text-normal text-justify">
                <h4 className="font-bold">VISI</h4>
                <p>
                  Mewujudkan lingkungan RT 006 RW 004 yang aman, tertib,
                  sejahtera, dan harmonis melalui semangat kebersamaan dan
                  gotong royong.
                </p>
                <h4 className="font-bold">MISI</h4>
                <ol className="list-decimal list-inside">
                  <li>
                    Menumbuhkan rasa kekeluargaan dan kebersamaan antarwarga.
                  </li>
                  <li>
                    Meningkatkan partisipasi warga dalam kegiatan sosial,
                    budaya, dan keamanan lingkungan.
                  </li>
                  <li>
                    Menyediakan layanan administrasi yang cepat, mudah, dan
                    transparan.
                  </li>
                  <li>
                    Menjaga kebersihan dan keindahan lingkungan secara
                    berkelanjutan.
                  </li>
                  <li>
                    Mendorong inovasi dan digitalisasi dalam pelayanan kepada
                    warga.
                  </li>
                </ol>
              </div>
            </div>
          </AnimatedItem>
          <AnimatedItem>
            <div className="flex flex-col gap-[20px]">
              <h3 className="text-header2 font-bold text-center">
                SEJARAH SINGKAT
                <br />
                RT 006 RW 004 DESA CIMANDALA
              </h3>
              <p className="md:text-normal text-justify">
                RT 006 RW 004 merupakan salah satu wilayah Rukun Tetangga di
                Desa Cimandala, Kecamatan Sukaraja, Kabupaten Bogor. Wilayah ini
                terbentuk pada tahun 2008 sebagai hasil dari pemekaran wilayah
                akibat meningkatnya jumlah penduduk di kawasan tersebut.
              </p>
              <p className="md:text-normal text-justify">
                Sejak awal berdirinya, RT 006 dikenal sebagai lingkungan yang
                menjunjung tinggi nilai kebersamaan dan gotong royong. Berbagai
                kegiatan sosial dan kemasyarakatan telah menjadi bagian dari
                budaya warga, seperti kerja bakti, ronda malam, dan perayaan
                hari besar nasional maupun keagamaan.
              </p>
              <p className="md:text-normal text-justify">
                Dalam perjalanannya, RT 006 RW 004 terus berupaya untuk
                berkembang mengikuti zaman, termasuk dengan memanfaatkan
                teknologi informasi untuk mempermudah pelayanan kepada warga dan
                meningkatkan keterbukaan informasi. Website ini adalah salah
                satu bentuk komitmen tersebut, sebagai media komunikasi dan
                informasi resmi bagi warga RT 006.
              </p>
            </div>
          </AnimatedItem>

          <div></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
