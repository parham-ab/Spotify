// components
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Header className="lg:col-span-2 md:col-span-3" />
      <div className="flex h-[60vh]">
        <Sidebar />
        {children}
      </div>
    </>
  );
};

export default Layout;
