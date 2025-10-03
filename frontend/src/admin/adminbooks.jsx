// shows the list of books in the admin panel and also options to edit and delete the books
import { useState, useEffect, useMemo } from "react";
import { useBookContext } from "../hooks/useBookContext";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Chip,
  Tooltip,
} from "@nextui-org/react";

const DeleteIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 20 20"
    width="1em"
    {...props}
    color="red"
  >
    <path
      d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M8.60834 13.75H11.3833"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
    <path
      d="M7.91669 10.4167H12.0834"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    />
  </svg>
);

export default function AdminBooks() {
  const { state, dispatchb } = useBookContext();
  const [books, setBooks] = useState([state.books]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/books/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [page, setPage] = useState(1);
  const rowsPerPage = 8;
  const pages = Math.ceil(books.length / rowsPerPage);
  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return books.slice(start, end);
  }, [page, books]);

  return (
    <div>
      <h1>Books</h1>
      <Table
        fullWidth
        aria-label="books"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader aria-label="columns" className="h-[50px]">
          <TableColumn>Title</TableColumn>
          <TableColumn>Author</TableColumn>
          <TableColumn maxWidth={'50px'} className="w-7">Subject</TableColumn>
          <TableColumn>Available</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {items &&
            items.map((book) => (
              <TableRow key={book._id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>
                  <Chip color="secondary" className="text-ellipsis overflow-hidden w-6" size="sm">
                    {book.subject}
                  </Chip>
                </TableCell>
                <TableCell>
                  <Tooltip content={book.available} placement="top">
                    {book.available === 'true' ? (
                        <Chip color="success" size="sm">
                            Available
                        </Chip>
                        ) : (
                        <Chip color="error" size="sm">
                            Not Available
                        </Chip> 
                    )}
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <button onClick={() => handleDelete(book._id)}>
                    <DeleteIcon />
                  </button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
