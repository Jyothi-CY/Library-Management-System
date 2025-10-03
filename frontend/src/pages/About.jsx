import { useBookContext } from "../hooks/useBookContext"

export default () => {
    const { state } = useBookContext();
    console.table(state);
    return (
        <>
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold text-center mt-10">About Us</h1>
                <p className="text-lg mt-5">This is a simple book store app built with the MERN stack.</p>
                <p className="text-lg mt-5">This app was built by <a href="">@dev</a></p>
            </div>
        </>
    )
}
