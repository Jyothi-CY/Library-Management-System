import { Input, Button,ScrollShadow } from "@nextui-org/react";
import { Toaster, toast } from "sonner";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function SearchBar({ books }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setError(false);
    if (!searchTerm) {
      setError(true);
      setDropdownOpen(false);
      return;
    }
    setError(false);
    const results = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (results.length === 0) {
      setError(true);
      setDropdownOpen(false);
      return;
    }
    setSearchResults(results);
    setDropdownOpen(true);
  };

  return (
    <>
      
      <form
        className="w-[800px] flex justify-center flex-col"
        onSubmit={handleSearch}
      >
        <div className="relative">
          <Input
            type="search"
            placeholder="Search here"
            className="w-full p-4"
            value={searchTerm}
            onChange={(e) => {setSearchTerm(e.target.value); setError(false);}}
            color="secondary"
          />
          <Button
            className="absolute right-1 top-1/2 -translate-y-1/2 p-4"
            type="submit"
            variant="shadow"
            color="secondary"
          >
            Search
          </Button>
        </div>
      </form>
      {dropdownOpen && (
        <ScrollShadow hideScrollBar>
        <div className="w-[800px] bg-white rounded shadow-xl z-10 flex flex-col justify-center gap-1 overflow-auto max-h-[300px] scroll-smooth">
          {searchResults.map((book, index) => (
            <center>
              <Link
                to={`books/${book._id}`}
                className="text-violet-500"
              >
                <div
                  key={index}
                  className="px-3 py-2 cursor-pointer 
                  bg-slate-50 hover:bg-gray-200 w-full 
                  transition-all duration-300 
                  ease-in-out hover:text-violet-500 
                  hover:font-bold hover:shadow-md hover:rounded-md
                  flex justfy-between gap-2
                  "
                >
                  <p className="text-left text-sm font-semibold">{book.title}</p>
                  <span className="text-xs font-thin text-right align-baseline">{book.author}</span>
                </div>
              </Link>
            </center>
          ))}
        </div>
        </ScrollShadow>
      )}
      {error ? toast.error("Books not found"): null}
      <Toaster richColors position="top-right" closeButton />
    </>
  );
}
