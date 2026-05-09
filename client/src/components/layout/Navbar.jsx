import React from "react";
import { useGetProfileQuery } from "../../services/api";
import { Link } from "react-router";

const Navbar = () => {
    const { data, isLoading } = useGetProfileQuery();
  return (
    <nav>
      <div className=" py-8 bg-[#001F54]">
        <div className="container flex justify-between">
          <Link to={"/"} className="text-white text-4xl">Task Manager</Link>
          <div className="flex gap-2 items-center">
            <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs">
              {data?.userData.avatar ? (
                <img
                  src={data?.userData.avatar}
                  alt="profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                data?.fullName?.charAt(0)
              )}
            </div>
            <h2 className="text-white font-bold">{data?.userData.fullName}</h2>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
