import { useBookContext } from "../hooks/useBookContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLocation } from "react-router-dom";
import Query from "../components/Query";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

import {
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
} from "@nextui-org/react";
import Datepicker from "react-tailwindcss-datepicker";

function BookDetail() {
  let { state } = useBookContext();
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];
  let book = state.books.find((book) => book._id == bookId);
  const { title, author } = book;
  const { state: auth } = useAuthContext();
  const borrowerId = auth.user._id;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [transaction, setTransaction] = useState({});
  const [loading, setLoading] = useState(false);

  async function onBorrow() {
    let start = new Date(startDate.startDate);
    let end = new Date(endDate.endDate);
   if (start.getDate() > end.getDate()) {
      toast.error("Invalid date range");
      return;
    }
    if (start.getDate() + 15 > end.getDate()) {
      toast.error("Book can be borrowed for a maximum of 15 days");
      return;
    } 
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:5000/api/transactions/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            bookId,
            borrowerId,
            fromDate: startDate.startDate,
            toDate: endDate.endDate,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to borrow book");
      }
      const data = await response.json();
      setTransaction(data);
      toast.success("Book borrowed successfully");
      setLoading(false);
    } catch (error) {
      toast.error(`Failed to borrow book${error}`);
      setLoading(false);
    }
  }

  return (
    <>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <Image
              isZoomed
              width={240}
              alt={title}
              src={`https://img.freepik.com/free-vector/minimal-voronoi-covers-design-geometric-glass-clusters-with-gradient-color-cool-trendy-abstract-backdrop-banne-poster-flyer-etc-vector-template_1217-5813.jpg?size=626&ext=jpg&ga=GA1.1.1687694167.1711670400&semt=ais`}
              style={{ opacity: 0.8 }}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {title}
            </div>
            <p className="mt-2 text-gray-500">{author}</p>
            <Popover placement="bottom" showArrow offset={10}>
              <PopoverTrigger>
                {book.available === "true" ? (<Button color="secondary">Borrow Now</Button>): (
                  borrowerId === transaction.borrowerId ? (
                    <Button color="primary">Return</Button>
                  ) : (
                    <Button color="danger" disabled>Not available</Button>  
                  )
                
                )}
              </PopoverTrigger>
              <PopoverContent className="w-[240px] bg-slate-100 rounded-md">
                {(titleProps) => (
                  <div className="px-1 py-2 w-full">
                    <p
                      className="text-small font-bold text-foreground"
                      {...titleProps}
                    >
                      Enter the following details
                    </p>
                    <div className="mt-2 flex flex-col gap-2 w-full">
                      <Input
                        defaultValue="24px"
                        label="username"
                        size="sm"
                        variant="bordered"
                        isReadOnly
                        value={auth.user.username}
                      />
                      <Input
                        defaultValue="30px"
                        label="Book name"
                        size="sm"
                        variant="bordered"
                        isReadOnly
                        value={title}
                      />
                      <Datepicker
                        minDate={new Date()}
                        placeholder="From"
                        useRange={false}
                        asSingle={true}
                        value={startDate}
                        startFrom="2024-04-01"
                        onChange={setStartDate}
                      />
                      <Datepicker
                        minDate={startDate}
                        maxDate={null}
                        placeholder="To"
                        useRange={false}
                        asSingle={true}
                        value={endDate}
                        startFrom={new Date()}
                        onChange={setEndDate}
                      />
                      <Button color="primary" onClick={onBorrow} isDisabled={loading}>
                        Borrow
                      </Button>
                    </div>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <Query />
      <Toaster richColors closeButton position="top-right"/>
    </>
  );
}

export default BookDetail;
