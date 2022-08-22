const Avatar = ({ src, alt, name, role }) => {
  return (
    <div className='flex flex-col items-center pb-2 w-28'>
      <div className='w-24 h-24 mb-2 bg-center bg-cover'>
        <img
          src={src}
          alt={alt}
          className='object-cover w-24 h-24 rounded-full'
        />
      </div>
      <div className='text-xs text-center'>{name}</div>
      <div className='text-xs text-center'>{role}</div>
    </div>
  );
};

const AvatarGroup = ({ children }) => {
  return (
    <div className='flex justify-center'>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>{children}</div>
    </div>
  );
};

export const AvatarFamily = { AvatarGroup, Avatar };
