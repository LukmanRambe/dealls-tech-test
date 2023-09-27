type NavbarPropsType = {
  pageTitle: string;
};

const Navbar: React.FC<NavbarPropsType> = ({ pageTitle }) => {
  return (
    <header className="fixed top-0 w-full px-5 py-4 bg-white border-b-[1px] -border--primary-20 text-end z-[1]">
      <h1 className="text-xl font-bold tracking-wide -text--primary">
        {pageTitle}
      </h1>
    </header>
  );
};

export default Navbar;
