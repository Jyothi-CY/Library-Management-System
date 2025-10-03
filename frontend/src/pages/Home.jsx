import { useEffect, useState, useContext} from 'react';
import { BookContext } from '../context/bookContext.jsx';
import Books  from '../components/Books.jsx';
import SearchBar from '../components/SearchBar.jsx';

import {Spinner} from "@nextui-org/react";

function Home() {
    const { dispatchb } = useContext(BookContext);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [topBooks, setTopBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/books',{
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      "authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                  });
                if (!response.ok) {
                    throw new Error('Something went wrong!');
                }
                const data = await response.json();
                setBooks(data);
                dispatchb({ type: 'FETCH_BOOKS', payload: data });
                setLoading(false);
                setTopBooks(data.slice(0, 15));
            } catch (error) {
                dispatchb({ type: 'FETCH_BOOKS_ERROR', payload: error.message });
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    return (
        <div className="container mx-auto">
            {loading && <Spinner color="secondary" size='lg'className="absolute left-2 right-2" />}
            {books.length > 0 && (<center><SearchBar books={books}/>
            <Books books={topBooks} />
            </center>)}

        </div>
    )
}
export default Home;