import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <main className=" p-6 w-full bg-black">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
