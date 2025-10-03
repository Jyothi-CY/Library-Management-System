import { useBookContext } from "../hooks/useBookContext";
import AllBooks from "./AllBooks";

export default function SciFiBooks() {
    const { state } = useBookContext();
    const books = state.books.filter((book) => book.subject === "Sci-fi");
    return <AllBooks propbooks={books} />;
}