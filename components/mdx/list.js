export const ListItem = ({ children }) => {
  return <li className='children:font-normal'>{children}</li>;
};

export const OrderedList = ({ children }) => {
  return <ol className='mb-4 list-decimal list-inside'>{children}</ol>;
};

const List = ({ children }) => {
  return <ul className='mb-4 list-disc list-inside'>{children}</ul>;
};

export const ListFamily = { List, OrderedList, ListItem };
