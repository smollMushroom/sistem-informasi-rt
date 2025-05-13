import React, { useState } from 'react';
import NewsContentEditor from '@/components/NewsContentEditor';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import 'quill/dist/quill.snow.css';
import { CreatePostInput } from '@/types/post';
import { createPost } from '@/services/postService';
import ConfirmActionModal from '@/components/ConfirmActionModal';
import NotificationModal from '@/components/NotificationModal';
import { useNavigate } from 'react-router-dom';
import ImageToBase64Input from '@/components/ImageToBase64Input';

interface HandleNotification {
  visible: boolean;
  message: string;
  type: 'error' | 'success';
}

const CreatePost = () => {
  const navigate = useNavigate();
  const [visibleModal, setVisibleModal] = useState(false);
  const [notificationModal, setNotificationModal] =
    useState<HandleNotification>({
      message: '',
      type: 'success',
      visible: false,
    });

  const handleNotification = (
    field: keyof HandleNotification,
    value: HandleNotification[keyof HandleNotification]
  ) => {
    setNotificationModal((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const [postData, setPostData] = useState<CreatePostInput>({
    content: '',
    title: '',
    thumbnail: '',
    type: 'announcement',
  });

  const handleInput = (field: keyof CreatePostInput, value: string) => {
    setPostData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCancel = () => {
    setVisibleModal(false);
  };

  const handleNotificationClose = () => {
    handleNotification('visible', false);
    if (notificationModal.type !== 'error') navigate('/dashboard/posts');
  };

  const submitPost = async () => {
    setVisibleModal(false);
    try {
      const post = await createPost(postData);
      if (post) {
        handleNotification('visible', true);
        handleNotification(
          'message',
          'Berhasil Menyimpan Pengumuman atau Berita'
        );
        handleNotification('type', 'success');
      }
    } catch (error) {
      console.error('Gagal mengirim post, ', error);
      handleNotification('visible', true);
      handleNotification('message', 'Gagal Menyimpan Pengumuman atau Berita');
      handleNotification('type', 'error');
    } finally {
      setVisibleModal(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setVisibleModal(true); // Tampilkan modal konfirmasi
  };

  return (
    <div>
      <Header />
      <div className="w-[90%] md:max-w-[1100px] mx-auto my-[70px] bg-white">
        <div>
          <h1 className="text-header2 font-bold mb-4 text-primary">
            Buat Pengumuman/Berita Baru
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              className="w-full p-2 border rounded border-gray-300"
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
                onChange={(html) => handleInput('content', html)}
              />
              {/* <NewsThumbnailEditor
                className="md:max-w-[25%]"
                onChange={(html) => handleInput('thumbnail', html)}
              /> */}
              <div className='md:max-w-[25%] w-full h-fit border border-gray-300 flex flex-col p-4 gap-4 justify-center items-center'>
                <ImageToBase64Input
                  buttonTitle='Upload Thumbnail'
                  onChange={(base64) => handleInput('thumbnail', base64 || postData.thumbnail)}
                />
                <div className='w-[250px] h-[187px] rounded-md border border-gray-300 '>
                  { postData.thumbnail !== '' ?
                    <img src={postData.thumbnail} alt="thumbnail" className='w-full h-full object-cover' />
                    : null
                  }
                </div>
                <div>

                </div>
              </div>
            </div>
            <button
              type="submit"
              onClick={() => setVisibleModal(true)}
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
            dangerouslySetInnerHTML={{ __html: postData.content }}
          ></div>
        </div>
      </div>
      <Footer />
      <ConfirmActionModal
        onCancel={() => handleCancel()}
        onConfirm={() => submitPost()}
        visible={visibleModal}
        confirmLabel="Lanjutkan"
        message="Apakah Anda yakin ingin melanjutkan pembuatan berita atau pengumuman ini?"
        title="Konfirmasi"
      />
      <NotificationModal
        message={notificationModal.message}
        onClose={() => handleNotificationClose()}
        visible={notificationModal.visible}
        type={notificationModal.type}
      />
    </div>
  );
};

export default CreatePost;
