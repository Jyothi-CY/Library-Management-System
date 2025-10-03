import { createContext, useReducer } from "react";
export const BookContext = createContext();
export const bookReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_BOOKS":
      return {
        ...state,
        books: action.payload,
        status: "success",
        error: null,
      };
    case "FETCH_BOOKS_ERROR":
      return {
        ...state,
        books: [],
        status: "error",
        error: action.payload,
      };
    case "FETCH_BOOKS_LOADING":
      return {
        ...state,
        books: [],
        status: "loading",
        error: null,
      };
    case "ADD_QUERY":
      const bookId = action.payload.bookId;
      const query = action.payload.query;
      const books5 = state.books.map((book) => {
        if (book._id === bookId) {
          return {
            ...book,
            queries: [...book.queries, query],
          };
        }
        return book;
      });
      return {
        ...state,
        books5,
      };
    case "ADD_ANSWER":
      const bookId2 = action.payload.bookId;
      const queryId = action.payload.queryId;
      const answer = action.payload.answer;
      const books2 = state.books.map((book) => {
        if (book._id === bookId2) {
          const queries = book.queries.map((query) => {
            if (query._id === queryId) {
              return {
                ...query,
                answers: [...query.answers, answer],
              };
            }
            return query;
          });
          return {
            ...book,
            queries,
          };
        }
        return book;
      });
      return {
        ...state,
        books: books2,
      };

    case "UPVOTE_ANSWER":
      const bookId3 = action.payload.bookId;
      const queryId2 = action.payload.queryId;
      const answerId = action.payload.answerId;
      const books3 = state.books.map((book) => {
        if (book._id === bookId3) {
          const queries = book.queries.map((query) => {
            if (query._id === query) {
              const answers = query.answers.map((answer) => {
                if (answer._id === answerId) {
                  return {
                    ...answer,
                    upvotes: {
                        count: answer.upvotes.count + 1,
                        users: [...answer.upvotes.users, action.payload.userId],
                    }
                  };
                }
                return answer;
              });
              return {
                ...query,
                answers,
              };
            }
            return query;
          });
          return {
            ...book,
            queries,
          };
        }
        return book;
      });
      return {
        ...state,
        books: books3,
      };
    default:
      return state;
  }
};

export const BookProvider = ({ children }) => {
  const initialState = {
    books: [],
    status: null,
    error: null,
  };
  const [state, dispatchb] = useReducer(bookReducer, initialState);
  return (
    <BookContext.Provider value={{ state, dispatchb }}>
      {children}
    </BookContext.Provider>
  );
};

export default BookProvider;
