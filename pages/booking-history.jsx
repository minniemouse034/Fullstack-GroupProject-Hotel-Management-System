import React, { useState, useEffect } from "react";
import NavbarComponent from "@/components/navigation-component/NavbarComponent";
import FooterComponent from "@/components/footer-component/FooterComponent";
import useBookingHistory from "@/hooks/use-booking-history";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const BookingHistory = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const { bookingHistory, getBookingHistoryByUsername, isLoading, isError } =
    useBookingHistory();

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedData = JSON.parse(userData);
        setUser(parsedData);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(Boolean(token));
  }, []);

  useEffect(() => {
    if (user.username) {
      getBookingHistoryByUsername(user.username);
    }
  }, [user.username]);
  return (
    <>
      <NavbarComponent isAuthenticated={isAuthenticated} />
      <section className="w-full px-[5%] md:px-[10%] flex flex-col justify-start items-center font-body">
        <h1 className="font-heading text-primary-heading text-[6rem] w-full text-left pb-14">
          Booking History
        </h1>
        {bookingHistory &&
          bookingHistory.map((history, index) => {
            return (
              <div
                key={index}
                className="border-b min-h-[700px] md:min-h-[500px] xl:min-h-[650px] py-[5%] border-gray-300 flex flex-col justify-center items-center w-full h-[90vh] md:h-[450px] md:flex-col md:justify-between md:items-center md:py-[2rem]"
              >
                <div className="w-full h-[90%] flex">
                  <div className="w-[50%] h-full">
                    <div
                      className="relative w-screen h-[45%] md:w-[90%] md:h-[90%] bg-center bg-cover md:rounded-lg bg-gray-300 "
                      style={{
                        backgroundImage: `url(${history.main_image})`,
                      }}
                    ></div>
                  </div>

                  <div className="h-[55%] md:h-full md:w-[45%] xl:w-[50%]">
                    <div className="py-[5%] size-full flex flex-col md:w-full md:h-full md:justify-start gap-[2rem]">
                      <div className="w-full flex justify-between text-gray-800 items-center">
                        <h1 className="text-[2rem] font-semibold">
                          {history.type_name}
                        </h1>
                        <p>
                          Booking date:{" "}
                          {format(history.created_at, "EEE, dd MMMM yyyy")}
                        </p>
                      </div>
                      <div className="w-full flex gap-[1.5rem] text-gray-800">
                        <div className="flex flex-col">
                          <h3>check-in</h3>
                          <p>
                            <span className="pr-[0.5rem]">
                              {format(history.check_in, "EEE, dd MMMM yyyy")}
                            </span>
                            <span className="pl-[0.5rem] border-l-[1px] border-gray-800">
                              After 2:00 PM
                            </span>
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <h3>check-out</h3>
                          <p>
                            <span className="pr-[0.5rem]">
                              {format(history.check_out, "EEE, dd MMMM yyyy")}
                            </span>
                            <span className="pl-[0.5rem] border-l-[1px] border-gray-800">
                              Before 12:00PM
                            </span>
                          </p>
                        </div>
                      </div>
                      <Accordion type="single" collapsible className="w-full text-gray-700" >
                        <AccordionItem value="item-1">
                          <AccordionTrigger className="bg-gray-200 px-[5%]">
                            Booking Detail
                          </AccordionTrigger>
                          <AccordionContent className="bg-gray-200 px-[5%]">
                            <div className="flex justify-between">
                              <h3>2 Guests (1 Night)</h3>
                              <h3>{history.payment_method}</h3>
                            </div>
                          </AccordionContent>
                          <AccordionContent className="bg-gray-200 px-[5%]">
                            <div className="flex justify-between">
                              <h3>{history.type_name}</h3>
                              <h3>{history.promotion_price}</h3>
                            </div>
                          </AccordionContent>
                          <AccordionContent className="bg-gray-200 px-[5%]">
                            <div className="flex justify-between">
                              <h3>Special request 1</h3>
                              <h3>.....</h3>
                            </div>
                          </AccordionContent>
                          <AccordionContent className="bg-gray-200 px-[5%]">
                            <div className="flex justify-between">
                              <h3>Special request 2</h3>
                              <h3>.....</h3>
                            </div>
                          </AccordionContent>
                          <AccordionContent className="bg-gray-200 px-[5%] border-b-[1px] border-gray-400">
                            <div className="flex justify-between">
                              <h3>Promotion Code</h3>
                              <h3>.....</h3>
                            </div>
                          </AccordionContent>
                          <AccordionContent className="bg-gray-200 px-[5%]">
                            <div className="flex flex-col justify-between">
                              <h3>Total</h3>
                              <h3>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus eum magni, numquam saepe fuga et autem deserunt dicta eaque cumque? Dolores at voluptas consectetur architecto, earum dolorum culpa fuga corporis!</h3>
                            </div>
                          </AccordionContent>
                          <AccordionContent className="bg-gray-200 px-[5%] border-b-[1px] border-gray-400">
                            <div className="flex flex-col justify-between">
                              <h3>Additional Request</h3>
                              <h3>.....</h3>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-row  justify-between items-center pl-[5%]">
                  <Link
                    href="/room-detail/1"
                    className="text-orange-500 hover:underline"
                  >
                    Cancel Booking
                  </Link>
                  <div className="flex items-center gap-[1.5rem]">
                    <Link
                      href="/change-date"
                      className="text-orange-500 hover:underline"
                    >
                      Room Deatail
                    </Link>
                    <Button className="w-40 xl:w-[180px] rounded xl:text-[1.25rem]" onClick="">
                      Change date
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
      </section>
      <FooterComponent />
    </>
  );
};

export default BookingHistory;
