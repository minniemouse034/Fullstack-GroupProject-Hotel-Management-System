import React, { useEffect } from "react";
import img1 from "../../assets/room&suite/1.png";
import img2 from "../../assets/room&suite/2.png";
import img3 from "../../assets/room&suite/3.png";
import img4 from "../../assets/room&suite/4.png";
import img5 from "../../assets/room&suite/5.png";
import img6 from "../../assets/room&suite/6.png";
import arrow from "../../assets/room&suite/arrow.svg";
import Link from "next/link";

const RoomSuite = () => {
  return (
    <section
      className="w-full max-w-[1440px] md:px-[10%] py-10 md:pb-[178px] flex flex-col justify-start items-center gap-10 md:gap-[72px]"
      id="room&suite"
    >
      <h2 className="font-heading w-full text-center text-[44px] md:text-[6rem] text-primary-foreground text-primary-heading ">
        Rooms & Suits
      </h2>
      <div className="w-full h-full flex flex-col gap-4">
        {/* First half */}
        <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-5">
          <div
            className="bg-slate-300 md:col-span-5 bg-center bg-cover bg-blend-multiply flex flex-col justify-end px-4 md:pl-[60px] pt-[138px] md:pt-[357px] pb-10 gap-2 md:gap-6"
            style={{ backgroundImage: `url(${img1.src})` }}
          >
            <h3 className="font-heading text-white text-[32px] md:text-[44px] md:leading-[55px]">
              Superior Garden View
            </h3>
            <div className="flex justify-start items-center">
              <Link
                href="/rooms/1"
                className="font-body text-white text-base hover:underline"
              >
                Explore Room
                <span>
                  <img src={arrow.src} />
                </span>
              </Link>
            </div>
          </div>
          <div
            className="bg-slate-300 md:col-span-3 bg-center bg-cover bg-blend-multiply flex flex-col justify-end px-4 md:pl-[60px] pt-[138px] md:pt-[217px] pb-10 gap-2 md:gap-6"
            style={{ backgroundImage: `url(${img2.src})` }}
          >
            <h3 className="font-heading text-white text-[32px] md:text-[44px] md:leading-[55px]">
              Deluxe
            </h3>
            <div className="flex gap-2 justify-start items-center">
              <Link
                href="/rooms/2"
                className="font-body text-white text-base hover:underline"
              >
                Explore Room
                <span>
                  <img src={arrow.src} />
                </span>
              </Link>
            </div>
          </div>
          <div
            className="bg-slate-300 md:col-span-2 bg-center bg-cover bg-blend-multiply flex flex-col justify-end px-4 md:pl-[60px] pt-[138px] md:pt-[217px] pb-10 gap-2 md:gap-6"
            style={{ backgroundImage: `url(${img3.src})` }}
          >
            <h3 className="font-heading text-white text-[32px] md:text-[44px] md:leading-[55px]">
              Superior
            </h3>
            <div className="flex justify-start items-center">
              <Link
                href="/rooms/3"
                className="font-body text-white text-base hover:underline"
              >
                Explore Room
                <span>
                  <img src={arrow.src} />
                </span>
              </Link>
            </div>
          </div>
        </div>
        {/* Second half */}
        <div className="w-full h-[50%] grid gap-4 grid-cols-1 md:grid-cols-7">
          <div
            className="bg-slate-300 md:row-span-2 md:col-span-3 bg-center bg-cover bg-blend-multiply flex flex-col justify-end px-4 md:pl-[60px] pt-[138px] pb-10 gap-2 md:gap-6"
            style={{ backgroundImage: `url(${img4.src})` }}
          >
            <h3 className="font-heading text-white text-[32px] md:text-[44px]">
              Premier Sea View
            </h3>
            <div className="flex gap-2 justify-start items-center">
              <Link
                href="/rooms/4"
                className="font-body text-white text-base hover:underline"
              >
                Explore Room
                <span>
                  <img src={arrow.src} />
                </span>
              </Link>
            </div>
          </div>
          <div
            className="bg-slate-300 md:col-span-4 bg-center bg-cover bg-blend-multiply flex flex-col justify-end px-4 md:pl-[60px] pt-[138px] pb-10 gap-2 md:gap-6"
            style={{ backgroundImage: `url(${img5.src})` }}
          >
            <h3 className="font-heading text-white text-[32px] md:text-[44px]">
              Supreme
            </h3>
            <div className="flex gap-2 justify-start items-center">
              <Link
                href="/rooms/5"
                className="font-body text-white text-base hover:underline"
              >
                Explore Room
                <span>
                  <img src={arrow.src} />
                </span>
              </Link>
            </div>
          </div>
          <div
            className="bg-slate-300 md:col-span-4 bg-center bg-cover bg-blend-multiply flex flex-col justify-end px-4 pt-[138px] md:pl-[60px] pb-10 gap-2 md:gap-6"
            style={{ backgroundImage: `url(${img6.src})` }}
          >
            <h3 className="font-heading text-white text-[32px] md:text-[44px]">
              Suite
            </h3>
            <div className="flex justify-start items-center">
              <Link
                href="/rooms/6"
                className="font-body text-white text-base hover:underline"
              >
                Explore Room
                <span>
                  <img src={arrow.src} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomSuite;
