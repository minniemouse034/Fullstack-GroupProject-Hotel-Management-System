"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import {
  CalendarDays as CalendarIcon,
  CirclePlus,
  CircleMinus,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function SearchBox({ className }) {
  const [date, setDate] = React.useState({
    from: addDays(new Date(), 1),
    to: addDays(new Date(), 2),
  });

  const [room, setRoom] = React.useState(1);
  const [guests, setGuests] = React.useState(2);

  const [isCheckInOpen, setIsCheckInOpen] = React.useState(false);
  const [isCheckOutOpen, setIsCheckOutOpen] = React.useState(false);
  const [isRoomGuestsOpen, setIsRoomGuestsOpen] = React.useState(false);

  const handleCheckInSelect = (selectedDate) => {
    if (date.from < selectedDate || selectedDate > date.to) {
      setDate({ from: selectedDate, to: addDays(selectedDate, 1) });
    } else {
      let newDate = { ...date, from: selectedDate };
      setDate(newDate);
    }
    if (selectedDate !== undefined) {
      setIsCheckInOpen(false);
      setIsCheckOutOpen(true);
    }
  };

  const handleCheckOutSelect = (selectedDate) => {
    let newDate = { ...date, to: selectedDate };
    setDate(newDate);
  };

  const handleRoom = (number) => {
    let newNumberOfRooms = room;
    if (number === 1) {
      newNumberOfRooms += 1;
    } else if (number === -1 && newNumberOfRooms > 1) {
      newNumberOfRooms -= 1;
    }
    setRoom(newNumberOfRooms);
  };

  const handleGuests = (number) => {
    let newNumberOfGuest = guests;
    if (number === 1) {
      newNumberOfGuest += 1;
    } else if (number === -1 && newNumberOfGuest > 1) {
      newNumberOfGuest -= 1;
    }
    setGuests(newNumberOfGuest);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="flex flex-col justify-center items-center gap-6  md:w-[1000px] md:flex-row md:justify-between md:h-[76px]">
        <div className="flex flex-col justify-center items-center gap-4 md:gap-2 md:flex-row">
          <Popover open={isCheckInOpen} onOpenChange={setIsCheckInOpen}>
            <PopoverTrigger asChild>
              <div>
                <h3 className="text-gray-900">Check In</h3>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[310px] h-12 justify-between text-left font-normal text-gray-600 text-base md:w-[240px]",
                    isCheckInOpen ? "bg-gray-200" : "bg-white"
                  )}
                >
                  {date?.from ? (
                    format(date.from, "eee, dd LLL y")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="mr-2 h-4 w-4" />
                </Button>
              </div>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="single"
                defaultMonth={new Date()}
                fromMonth={new Date()}
                selected={date}
                onSelect={handleCheckInSelect}
                numberOfMonths={2}
                disabled={{ before: new Date() }}
                classNames={{
                  caption_label: "text-sm font-medium text-gray-800",
                  day_selected:
                    "bg-orange-500 text-white hover:border-2 rounded-none",
                  day_disabled: "bg-gray-500 rounded-none",
                  day_range_middle: "bg-orange-500 rounded-none",
                  day_today: "bg-accent text-accent-foreground rounded-none",
                  day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:border hover:border-orange-500",
                }}
              />
            </PopoverContent>
          </Popover>
          <p className="hidden md:flex"> - </p>

          <Popover open={isCheckOutOpen} onOpenChange={setIsCheckOutOpen}>
            <PopoverTrigger asChild>
              <div>
                <h3 className="text-gray-900">Check Out</h3>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[310px] h-12 justify-between text-left font-normal text-gray-600 text-base md:w-[240px]",
                    isCheckOutOpen ? "bg-gray-200" : "bg-white"
                  )}
                >
                  {date?.to ? (
                    format(date.to, "eee, dd LLL y")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="mr-2 h-4 w-4" />
                </Button>
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 relative top-0 md:relative md:top-0 md:right-[295px]"
              align="start"
            >
              <Calendar
                initialFocus
                mode="single"
                defaultMonth={new Date()}
                fromMonth={new Date()}
                selected={date}
                onSelect={handleCheckOutSelect}
                numberOfMonths={2}
                disabled={{ before: date.from }}
                classNames={{
                  caption_label: "text-sm font-medium text-gray-800",
                  day_selected:
                    "bg-orange-500 text-white hover:border-2 rounded-none",
                  day_disabled: "bg-gray-500 rounded-none",
                  day_range_middle: "bg-orange-500 rounded-none",
                  day_today: "bg-accent text-accent-foreground rounded-none",
                  day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:border hover:border-orange-500",
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <h3 className="text-gray-900">Room & Guests</h3>
          <Popover onOpenChange={setIsRoomGuestsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[310px] md:w-[240px] h-12 justify-between text-left font-normal text-gray-600 text-base",
                  isRoomGuestsOpen ? "bg-gray-200" : "bg-white"
                )}
              >
                {room} room, {guests} guests
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[240px] text-gray-700 text-base">
              <div className="flex flex-col gap-2">
                <div className="w-full flex justify-between items-center">
                  <p>Room</p>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => handleRoom(-1)}
                      className="w-[30px] h-[30px]"
                    >
                      <CircleMinus className="mr-2 h-5 w-5 text-orange-500 m-1" />
                    </button>
                    <span>{room}</span>
                    <button
                      onClick={() => handleRoom(1)}
                      className="w-[30px] h-[30px]"
                    >
                      <CirclePlus className="mr-2 h-5 w-5 text-orange-500 m-1" />
                    </button>
                  </div>
                </div>
                <div className="w-full flex justify-between items-center">
                  <p>Guests</p>
                  <div className="flex gap-2 items-center">
                    <button className="w-[30px] h-[30px]">
                      <CircleMinus
                        onClick={() => handleGuests(-1)}
                        className="mr-2 h-5 w-5 text-orange-500 m-1"
                      />
                    </button>
                    <span>{guests}</span>
                    <button
                      onClick={() => handleGuests(1)}
                      className="w-[30px] h-[30px]"
                    >
                      <CirclePlus className="mr-2 h-5 w-5 text-orange-500 m-1" />
                    </button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <button
          className="w-[310px] my-4 md:w-[240px] h-[48px] rounded bg-orange-600 text-white hover:bg-orange-500 md:my-0 md:self-end md:mb-1"
          type="submit"
        >
          Search
        </button>
      </div>
    </form>
  );
}