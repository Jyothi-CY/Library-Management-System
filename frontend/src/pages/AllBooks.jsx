import { Link } from "react-router-dom";
import { useBookContext } from "../hooks/useBookContext";

import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { Image, Button } from "@nextui-org/react";
export default function AllBooks({ propbooks }) {

  const { state } = useBookContext();
  const books = propbooks ? propbooks : state.books;
return (
    <>
        <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-center mt-10 mb-5">All Books</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {books.map((book) => (
                    <Card key={book._id} shadow isPressable>
                        <Image
                            isZoomed
                            alt={book.title}
                            src={`bookcover${Math.floor(Math.random() * 4)}.jpg`}
                        />
                        <CardBody>
                            <p className="text-center font-medium">{book.title}</p>
                            <p className="text-center text-slate-500">{book.author}</p>
                        </CardBody>
                        <CardFooter className="flex justify-center items-center mt-2">
                            <Button
                            variant="ghost"
                            color="secondary"
                            >
                                <Link to={`/books/${book._id}`}>View Details</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    </>
);
}
