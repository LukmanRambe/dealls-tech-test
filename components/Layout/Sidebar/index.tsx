import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineMenu } from 'react-icons/ai';

import { generateSidebarMenus } from '../../../utils/generateData';

type SidebarPropsType = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  isSmallScreen: boolean;
};

const Sidebar: React.FC<SidebarPropsType> = ({
  isOpen,
  setIsOpen,
  isSmallScreen,
}) => {
  const router = useRouter();
  const sidebarMenus = generateSidebarMenus();

  return (
    <aside
      className={`${
        isSmallScreen
          ? isOpen
            ? 'after:fixed after:transition-opacity after:opacity-100 after:duration-200 after:-contents[""] after:w-full after:h-full after:bg-black/30 after:overflow-hidden after:inset-0 after:transform after:ease-in-out after:left-0 after:top-0 after:z-[2]'
            : 'after:transition-opacity after:opacity-0 after:duration-200'
          : ''
      }`}
    >
      <section
        className={`fixed left-0 top-0 z-10 bg-white px-5 py-4 ${
          isSmallScreen
            ? isOpen
              ? 'border-r-0 w-[280px] h-full'
              : 'border-r-0'
            : isOpen
            ? 'border-r-[1px] -border--primary-20 h-full w-[280px]'
            : 'border-r-[1px] -border--primary-20 h-full'
        }`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex w-full -text--primary-90 hover:-text--primary text-xl border-0 outline-0 ${
            isSmallScreen
              ? isOpen
                ? 'w-fit mb-10'
                : 'w-fit mb-0 justify-center'
              : isOpen
              ? 'mb-10'
              : 'mb-10 justify-center'
          }`}
        >
          <AiOutlineMenu />
        </button>

        <ul
          className={`flex flex-col gap-4 ${
            isSmallScreen ? (isOpen ? 'flex' : 'hidden') : 'flex'
          }`}
        >
          {sidebarMenus.map((menu) => (
            <li key={menu.name} className="w-full font-semibold">
              <Link
                href={menu.href}
                title={menu.name}
                className={`flex items-center w-full h-[45px] gap-5 rounded-md -text--primary-90 hover:-bg--primary-10 transition-colors duration-200 ease-in-out ${
                  isOpen ? 'px-4' : 'px-3'
                } ${
                  router.asPath === menu.href ? '-bg--primary-10' : 'bg-white'
                }`}
              >
                <span className="text-xl">{menu.icon}</span>
                <span className={`${isOpen ? 'inline' : 'hidden'}`}>
                  {menu.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
};

export default Sidebar;
