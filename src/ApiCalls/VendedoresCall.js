import { useState, useEffect } from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: "https://run.mocky.io/v3/135e6f01-d759-4a9f-b625-3e5f843a29de",
    headers: { accept: "*/*" },
});

export const useGetVendedores = () => {
    const [vendedores, setVendedores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVendedores = async () => {
            try {
                const res = await api.get();
                setVendedores(res.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchVendedores();
    }, []);

    return { vendedores, loading, error };
};