import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";

export default function useLogout() {
    const { dispatch } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const logout = async () => {
        setError(null);
        setLoading(true);
        try {
            dispatch({ type: "LOGOUT" });
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return { logout, loading, error };
}
