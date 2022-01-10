export const H1 = ({ children }) => {
  return <h1 className='mt-2 mb-4 text-3xl font-bold'>{children}</h1>;
};

const getAnchor = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/[ ]/g, '-');
};

const H2 = ({ children }) => {
  const anchor = getAnchor(children);
  const href = `#${anchor}`;

  return (
    <h2 className='mt-2 mb-4 text-2xl font-bold group'>
      <a
        href={href}
        className='opacity-0 group-hover:opacity-100 text-[#666] absolute -translate-x-6 font-normal'
      >
        #
      </a>
      {children}
    </h2>
  );
};

export const H3 = ({ children }) => {
  return <h3 className='mb-4 text-xs text-gray-500 '>{children}</h3>;
};

export const Heading = { H1, H2, H3 };
