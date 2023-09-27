import { AiOutlineLoading3Quarters } from 'react-icons/ai';

type LoaderPropsType = {
  size: string;
};

const Loader: React.FC<LoaderPropsType> = ({ size }) => {
  return (
    <div
      className={`flex items-center justify-center w-full py-16 text-${size} h-fit`}
    >
      <AiOutlineLoading3Quarters className={`-text--primary animate-spin`} />
    </div>
  );
};

export default Loader;
