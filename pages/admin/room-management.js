import React from "react";

import NavbarRoom from "@/components/navigation-admin/NavbarRoom";
import RoomList from "@/components/room-mangement-status/roomList";
export default function roomManagement() {
  return (
    <div className=" w-screen h-screen">
      <NavbarRoom />
      <div className="bg-[#F6F7FC] w-full h-full p-16">
        <div className="bg-[#FFFFFF] w-full h-10 grid grid-cols-7 font-body text-sm font-medium tracking-tighter text-[#424C6B]">
          <div className="bg-[#E4E6ED] pl-5 flex justify-between items-center ">
            Room no.
          </div>
          <div className=" bg-[#E4E6ED] pl-5 flex justify-between items-center col-span-2">
            Room type
          </div>
          <div className=" bg-[#E4E6ED] pl-5 flex justify-between items-center col-span-2">
            Bed type
          </div>
          <div className=" bg-[#E4E6ED] pl-5 flex justify-between items-center col-span-2">
            Status
          </div>
        </div>

        <RoomList />
      </div>
    </div>
  );
}
