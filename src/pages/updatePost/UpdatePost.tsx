import React, { useState } from 'react';
import NewsContentEditor from '@/components/NewsContentEditor';
import picture from '@/assets/example.png'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import 'quill/dist/quill.snow.css';
import { UpdatePostInput } from '@/types/post';
import { updatePost } from '@/services/postService';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { usePostStore } from '@/stores/postStore';
import LoadingScreen from '@/components/LoadingScreen';
import ConfirmActionModal from '@/components/ConfirmActionModal';
import NotificationModal from '@/components/NotificationModal';
import ImageToBase64Input from '@/components/ImageToBase64Input';

interface Modal {
  visibleConfirm: boolean;
  messageNotification: string;
  visibleNotification: boolean;
  typeNotification: 'error' | 'info';
}

const UpdatePost = () => {
  const navigate = useNavigate();
  const { fetchPosts, loading, posts } = usePostStore();

  const [modal, setModal] = useState<Modal>({
    visibleConfirm: false,
    messageNotification: '',
    typeNotification: 'info',
    visibleNotification: false,
  });

  const handleModal = (field: keyof Modal, value: Modal[keyof Modal]) => {
    setModal((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const [postData, setPostData] = useState<UpdatePostInput>({
    content: '',
    title: '',
    thumbnail: '',
    type: 'announcement',
  });

  const location = useLocation();
  const post = location.state?.post;

  useEffect(() => {
    if (post) {
      setPostData({
        title: post.title || '',
        type: post.type || 'announcement',
      });
    }
  }, [post]);

  useEffect(() => {
    fetchPosts({ limit: 1, search: window.location.pathname.split('/')[3] });
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      setPostData((prev) => ({
        ...prev,
        thumbnail: posts[0].thumbnail || '',
        content: posts[0].content || '',
      }));
    }
  }, [posts]);

  const handleInput = (field: keyof UpdatePostInput, value: string) => {
    setPostData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleModal('visibleConfirm', true);
  };

  const handleClose = () => {
    handleModal('visibleNotification', false);
    if (modal.typeNotification !== 'error') {
      navigate('/dashboard/posts');
    }
  };

  const handleConfirm = async () => {
    handleModal('visibleConfirm', false);
    try {
      await updatePost(postData, post.id);
      handleModal('typeNotification', 'info');
      handleModal('visibleNotification', true);
      handleModal(
        'messageNotification',
        'Berhasil menyimpan pengumuman atau berita'
      );
    } catch (error) {
      console.error('gagal memperbarui post ', error);
      handleModal('visibleNotification', true);
      handleModal('typeNotification', 'error');
      handleModal(
        'messageNotification',
        'Gagal menyimpan pengumuman atau berita'
      );
    }
  };

  return (
    <>
      <LoadingScreen isVisible={loading} />
      {!loading && (
        <div>
          <Header />
          <div className="w-[90%] md:max-w-[1100px] mx-auto my-[70px] bg-white">
            <div>
              <h1 className="text-header2 font-bold mb-4 text-primary">
                Update Pengumuman/Berita
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Judul Berita"
                  value={postData.title}
                  onChange={(e) => handleInput('title', e.target.value)}
                  required
                />
                <div className="flex flex-col gap-[5px]">
                  <h4>Jenis Pemberitahuan</h4>
                  <div className="flex gap-[20px]">
                    <label htmlFor="announcement">
                      <input
                        className="mr-1"
                        type="radio"
                        id="announcement"
                        name="notificationType"
                        value="announcement"
                        checked={postData.type === 'announcement'}
                        onChange={(e) => handleInput('type', e.target.value)}
                      />
                      Pengumuman
                    </label>
                    <label htmlFor="news">
                      <input
                        className="mr-1"
                        type="radio"
                        id="news"
                        name="notificationType"
                        value="news"
                        checked={postData.type === 'news'}
                        onChange={(e) => handleInput('type', e.target.value)}
                      />
                      Berita
                    </label>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row w-full gap-2">
                  <NewsContentEditor
                    className="md:max-w-[75%]"
                    height="500px"
                    onChange={(html) => handleInput('content', html)}
                    initialContent={postData.content}
                  />
                  <div className="md:max-w-[25%] w-full h-fit border border-gray-300 flex flex-col p-4 gap-4 justify-center items-center">
                    <ImageToBase64Input
                      buttonTitle="Upload Thumbnail"
                      onChange={(base64) =>
                        handleInput('thumbnail', base64 || postData.thumbnail || picture)
                      }
                    />
                    <div className="w-[250px] h-[187px] rounded-md border border-gray-300 ">
                      {postData.thumbnail !== '' ? (
                        <img
                          src={postData.thumbnail}
                          alt="thumbnail"
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div></div>
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Simpan Berita
                </button>
              </form>
            </div>

            <div className="mt-[50px]">
              <h1 className="text-header2 font-bold text-primary">Preview</h1>
              <div
                className="border border-slate-4 shadow-sm ql-editor min-h-[400px]"
                dangerouslySetInnerHTML={{ __html: postData.content || '' }}
              ></div>
            </div>
          </div>
          <Footer />
          <ConfirmActionModal
            onCancel={() => handleModal('visibleConfirm', false)}
            onConfirm={() => handleConfirm()}
            visible={modal.visibleConfirm}
            confirmLabel="Lanjutkan"
            message="Apakah Anda yakin ingin dengan perubahan berita atau pengumuman ini?"
            title="Konfirmasi"
          />
          <NotificationModal
            message={modal.messageNotification}
            visible={modal.visibleNotification}
            onClose={() => handleClose()}
            type={modal.typeNotification}
          />
        </div>
      )}
    </>
  );
};

export default UpdatePost;
