import Header from '@/components/Header';
import { Link, useNavigate } from 'react-router-dom';
import searchDocumentIcon from '@/assets/search-document-icon.png';
import administrationIcon from '@/assets/administration-icon.png';
import NewsItem from '@/components/NewsItem';
import AnimatedItem from '@/components/AnimatedItem';
import ProfileCard from '@/components/ProfileCard';
import bendaharaPicture from '@/assets/Sarwo.jpg'
import ketuaPicture from '@/assets/Deni.jpg'
import sekretarisPicture from '@/assets/Fatur.jpg'
import picture from '@/assets/example.png'
import Footer from '@/components/Footer';
import useBreakpoint from '@/hooks/useBreakpoint';
import { useEffect, useState } from 'react';
import { getPost } from '@/services/postService';
import { Post } from '@/types/post';
import dateTimeFormatter from '@/utils/formatters/dateTimeFormatter';
import { FaArrowRight } from 'react-icons/fa';

const Home = () => {
  const breakpoint = useBreakpoint();
  const isDesktop = breakpoint === 'desktop';
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate()

  const getPosts = async () => {
    const res = await getPost({
      limit: 3,
      sortBy: 'publishedAt',
      order: 'desc',
      page: 1,
      withContent: false,
    });
    setPosts(res.data.posts);
  };

  let delay = 0;

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="w-full">
        {/* Welcome Section */}

        <div className="my-[50px]">
          <h1 className="text-center text-primary font-bold text-header2 md:text-header tracking-wide pb-20">
            HALO, WARGA RT 006
            <br />
            SELAMAT DATANG
          </h1>

          <div className="flex justify-center md:items-end flex-col md:flex-row gap-6 md:gap-20">
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
        </div>

        {/* News/Announcement Section */}

        <div className=" bg-secondary py-[50px]">
          <div>
            <h2 className="text-center text-header font-bold text-primary mb-[50px]">
              Informasi Rukun Tetangga
            </h2>
          </div>

          <div className="w-full flex justify-center">
            <div className="flex w-[90%] md:max-w-[1100px] flex-col md:flex-row flex-wrap justify-center gap-[40px] md:gap-6 mb-[30px]">
              {posts.map((post) => {
                delay += 1 * 0.1;
                return (
                  <AnimatedItem
                    key={post.id}
                    delay={isDesktop ? delay : undefined}
                  >
                    <NewsItem
                      type={post.type}
                      slug={post.slug}
                      authorUsername={post.author.username}
                      role={post.author.role}
                      title={post.title}
                      date={dateTimeFormatter(post.publishedAt, false)}
                      image={post.thumbnail || picture}
                    />
                  </AnimatedItem>
                );
              })}
            </div>
          </div>
          <div className="flex justify-center items-center">
            <button onClick={() => navigate('/posts')} className="py-1 md:py-2 px-4 md:px-6 bg-blue-600 font-bold text-white rounded-md flex justify-center items-center gap-2">
              <span>Lihat Lainnya</span>
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* Profile */}

        <div className='className="w-full flex justify-center pt-[50px] pb-[70px] bg-white'>
          <div className="flex w-[80%] md:max-w-[1100px] flex-col gap-3">
            <h2 className="text-header2 md:text-header text-center mb-[50px] font-bold">
              Profil Pengurus Rukun Tetangga
            </h2>

            <div className="flex flex-col md:flex-row gap-9 flex-wrap md:gap-x-3 md:gap-y-9 items-center justify-around">
              <AnimatedItem delay={isDesktop ? 0 : 0}>
                <ProfileCard
                  image={ketuaPicture}
                  fullName="Deni S"
                  role="Ketua RT"
                  className='shadow-md border'
                />
              </AnimatedItem>
              <AnimatedItem delay={isDesktop ? 0.1 : 0}>
                <ProfileCard
                  image={sekretarisPicture}
                  fullName="Fatur"
                  role="Sekretaris"
                  className='shadow-md border'
                />
              </AnimatedItem>
              <AnimatedItem delay={isDesktop ? 0.2 : 0}>
                <ProfileCard
                  image={bendaharaPicture}
                  fullName="H Sarwo"
                  role="Bendahara"
                  className='shadow-md border'
                />
              </AnimatedItem>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
