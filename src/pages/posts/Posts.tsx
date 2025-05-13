import Footer from '@/components/Footer';
import Header from '@/components/Header';
import NewsItem from '@/components/NewsItem';
import PaginatedPosts from '@/components/PaginatedPosts';
import dateTimeFormatter from '@/utils/formatters/dateTimeFormatter';

const Posts = () => {
  return (
    <div className="w-full h-full min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <Header />
      <div className="max-w-[1100px] w-full flex-grow">
        <PaginatedPosts order='desc' renderItem={(post) => (
            <NewsItem 
             authorUsername={post.author.username}
             date={dateTimeFormatter(post.publishedAt)}
             role={post.author.role}
             title={post.title}
             type={post.type}
             slug={post.slug}
             image={post.thumbnail}
             key={post.id}
            />)
          }
        />
      </div>
      <Footer />
    </div>
  );
};

export default Posts;
