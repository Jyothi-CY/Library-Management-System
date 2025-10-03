import { useBookContext } from "../hooks/useBookContext";
import AllBooks from "./AllBooks";

export default function CrimeBooks() {
    const { state } = useBookContext();
    const books = state.books.filter((book) => book.subject === "Fantasy");
    books.reverse();
    return <AllBooks propbooks={books} />;
}