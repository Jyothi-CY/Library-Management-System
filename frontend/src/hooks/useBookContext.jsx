import { useContext } from 'react';
import { BookContext } from '../context/bookContext';


export const useBookContext = () => {
    const context = useContext(BookContext);
    if (!context) {
        throw new Error('useBookContext must be used within a BookProvider');
    }
    return context;
};

// Export the book context
export const BookProvider = BookContext.Provider;