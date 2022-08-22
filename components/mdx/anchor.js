const Anchor = ({ href, children }) => {
  return (
    <a
      href={href}
      className='font-semibold underline hover:decoration-2 decoration-1 decoration-sky-500'
    >
      {children}
    </a>
  );
};

export { Anchor };
