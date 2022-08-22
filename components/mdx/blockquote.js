const Blockquote = ({ children }) => {
  return (
    <blockquote className='px-6 pb-4 italic text-gray-700 children:mb-0'>
      {children}
    </blockquote>
  );
};

export { Blockquote };
