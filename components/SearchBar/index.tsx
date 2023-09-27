import { AiOutlineSearch } from 'react-icons/ai';

type SearchBarPropsType = {
  searchQuery: string;
  onSearch: (event: React.FormEvent<HTMLInputElement>) => void;
};

const SearchBar: React.FC<SearchBarPropsType> = ({ searchQuery, onSearch }) => {
  return (
    <article className="w-full sm:w-fit">
      <div className="relative flex items-center w-full sm:w-fit">
        <span className="absolute ml-2">
          <AiOutlineSearch className="w-6 h-6 pointer-events-none -text--primary-90" />
        </span>

        <input
          type="text"
          className="ring-1 -ring--primary-50 text-gray-900 text-sm rounded-md hover:-ring--primary-90 focus:-ring--primary-90 block w-full sm:w-fit md:w-64 pl-10 p-2.5 outline-none"
          placeholder="Search by Product Name"
          value={searchQuery}
          onChange={onSearch}
        />
      </div>
    </article>
  );
};

export default SearchBar;
