import { Link } from "react-router-dom";
export default function Hero() {
    return (
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto gap-4 lg:gap-8 xl:gap-0 lg:py-16 grid-cols-3 lg:grid-cols-12 h-full">
            <div className="mr-auto place-self-center col-span-2 lg:col-span-7 px-6">
                <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white font-serif"><i><u>BIBLIOTHÈQUE</u></i></h1>
                <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"><i>Online Library Management System</i></p>
                <Link to="/books" className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                    View Books
                    <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </Link>
                <a href="https://www.iiitkottayam.ac.in/#!/faculty" target="blank" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800 bg-gray-700">
                    Talk with Faculty
                </a>
            </div>
            <div className="lg:mt-0 lg:col-span-5 sm:col-span-1 rounded-2xl">
                <img src="/Books.jpg" className="rounded-2xl" alt="mockup" />
            </div>
        </div>
    );
}
