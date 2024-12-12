import { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: "https://localhost:7283/api/Articulo",
    headers: { accept: "*/*" },
});

export const useGetArticulos = (IdFilter) => {
    const [Articulos, setArticulos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticulos = async () => {
            try {
                const res = await api.get();
                setArticulos(res.data.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchArticulos();
    }, []); 

    return { Articulos, loading, error };
};