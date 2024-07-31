import axios from "axios";
import { useState, useEffect } from "react";
import PostRoomProperty from "./postRoomProperty";
import { useRouter } from "next/router";

export default function RoomList({ search }) {
  const room_per_page = 6;
  const router = useRouter();
  const [roomData, setRoomData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [startPage, setStartPage] = useState(1);
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    fetchRoomData(currentPage);
    setStartPage(Math.floor((currentPage - 1) / 5) * 5 + 1);
  }, [currentPage, search]);

  const fetchRoomData = async (page) => {
    try {
      setIsLoading(true);
      const result = await axios.get(
        `http://localhost:3000/api/getRoomStatus-Admin?page=${page}&limit=${room_per_page}&search=${search}`
      );
      const fetchedRooms = result.data.rooms;
      const totalRooms = result.data.total;
      const calculatedTotalPages = Math.ceil(totalRooms / room_per_page);

      setRoomData(fetchedRooms);

      setTotalPages(calculatedTotalPages);
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    if (page >= startPage + 4) {
      setStartPage(startPage + 5);
    } else if (page < startPage) {
      setStartPage(startPage - 5);
    }
  };

  const handleNextPage = () => {
    if (currentPage <= totalPages) {
      setStartPage(startPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setStartPage(startPage - 1);
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRoomClick = (roomID) => {
    router.push(`/admin/room-property/${roomID}`);
  };

  const renderPageNumberButton = () => {
    const pageNumber = [];
    const endPage = Math.min(startPage + 4, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      const buttonClassCurrent = `bg-white border-[1px] border-[#D5DFDA] rounded-sm py-1 text-sm px-2`;
      const buttonClassNone = `rounded-sm py-1 text-sm px-2`;
      pageNumber.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`${
            i === currentPage ? buttonClassCurrent : buttonClassNone
          } ${i === currentPage ? "text-[#5D7B6A]" : "text-[#C8CCDB]"}`}
        >
          {i}
        </button>
      );
    }

    return pageNumber;
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error</p>
      ) : (
        <div>
          {roomData.map((room) => (
            <PostRoomProperty
              key={room.room_id}
              image={room.main_image}
              typeBed={room.bed_type}
              typeRoom={room.type_name}
              price_per_night={room.current_price}
              promotion_price={room.promotion_price}
              guest={room.room_capacity}
              sizeRoom={room.room_size}
              handleRoomClick={() => handleRoomClick(room.room_id)}
            />
          ))}
        </div>
      )}
      <div className="flex justify-center m-6 gap-5">
        {currentPage > 1 && (
          <button onClick={handlePrevPage}>
            <img className="transform rotate-180" src="/img/next.svg" />
          </button>
        )}
        {renderPageNumberButton()}
        {currentPage < totalPages && (
          <button onClick={handleNextPage}>
            <img src="/img/next.svg" />
          </button>
        )}
      </div>
    </div>
  );
}
