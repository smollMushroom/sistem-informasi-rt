import { FC } from "react";

type Props = {
  image: string;
  role: string;
  fullName: string;
  className?: string;
}

const ProfileCard: FC<Props> = ({image, role, fullName, className}) => {
  return (
    <div className={`h-[341px] md:h-[341px] w-[243px] md:w-[273px] p-4 ${className} bg-secondary rounded-xl flex flex-col gap-2 justify-center items-center transition hover:scale-105`}>
      <img 
        src={image}
        alt={`photo-${fullName.split(' ').join('-')}`} 
        className="h-[204px] w-[163px] rounded-sm"  
      />
      <div className="h-[70px] text-center flex justify-center items-center flex-col text-normal">
        <p className="underline">{role}</p>
        <p className="font-bold">{fullName}</p>
      </div>
    </div>
  )
}

export default ProfileCard;