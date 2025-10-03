import { useBookContext } from "../hooks/useBookContext";
import AllBooks from "./AllBooks";

export default function FantasyBooks() {
    const { state } = useBookContext();
    const books = state.books.filter((book) => book.subject === "Fantasy");
    return <AllBooks propbooks={books} />;
}