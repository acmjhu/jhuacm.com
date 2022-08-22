export const Input = ({
  textSize = 'normal',
  textColor = 'black',
  textAlign = 'left',
  ...props
}) => {
  return (
    <input
      {...props}
      className={`block w-full px-3 py-2 mb-2 font-sans text-${textAlign} text-${textSize} text-${textColor} rounded-lg shadow-sm ring-1 ring-gray-900/10`}
    />
  );
};
