import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import picture from '@/assets/example.png'

type Props = {
  title: string;
  image?: string;
  date: string;
  type: string;
  slug: string;
  authorUsername: string;
  role: string;
};

const NewsItem: FC<Props> = ({
  title,
  image,
  date,
  type,
  slug,
  authorUsername,
  role,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-[20px] items-center flex-col shadow-md bg-white p-4 md:p-6 w-full md:w-[350px] rounded-lg">
      <img
        src={image || picture}
        alt={`${title.split(' ').join('-')}`}
        className="h-[200px] w-[300px] object-cover rounded-lg shadow-sm"
      />
      <div className="flex flex-col gap-1 md:text-normal">
        <h3 className="font-bold text-header4 text-center ">{title}</h3>
        <p className="font-normal text-center">
          {type === 'news' ? 'Berita' : 'Pengumuman'} | {date}
        </p>
        <p className="text-center">
          {authorUsername} - {role}
        </p>
        <button
          onClick={() => navigate(`/post/${slug}`)}
          className="bg-primary w-fit py-1 md:py-2 px-4 md:px-6 rounded-md text-white font-bold self-center mt-2"
        >
          Selengkapnya
        </button>
      </div>
    </div>
  );
};

export default NewsItem;
