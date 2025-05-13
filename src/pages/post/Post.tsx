import { getPost } from '@/services/postService';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'quill/dist/quill.snow.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

const Post = () => {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    const getDataPost = async () => {
      const post = await getPost({
        limit: 1,
        page: 1,
        order: 'asc',
        search: slug,
      });
      setContent(post.data.posts[0].content);
      setLoading(false)
    };

    getDataPost();
  }, [slug]);

  return (
    <>
      <LoadingScreen isVisible={loading} />
      { !loading &&
        <div className="w-full">
          <Header />
          <div className="w-full flex justify-center flex-grow items-center">
            <div
              className="w-full max-w-[1100px] ql-editor my-[50px]"
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          </div>
          <Footer />
        </div>
      }
    </>
  );
};

export default Post;
