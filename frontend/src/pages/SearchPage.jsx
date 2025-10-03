export default function SearchPage({books}) {

    books.map((book) => {
        return (
            <div key={book._id} className="card" style={{
                width: '18rem',
                margin: '0.5rem'
            }}>
                <img src={book.image} className="card-img-top" alt="book" style={{
                    width: '100%',
                    height: '300px'
                }}/>
                <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text">{book.author}</p>
                    <p className="card-text">{book.price}</p>
                </div>
            </div>
        )
    })
} 