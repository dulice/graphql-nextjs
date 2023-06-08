"use client"
import { useEffect, useState } from "react"

export const useFetch = (fetch, name, slug) => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const syncData = async () => {
            setIsLoading(true); 
            try {
                const response = await fetch(name, slug);
                setData(response);
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false); 
                setError(err);
            }
        };
        syncData()
    },[name, slug, fetch]);
    return { data, isLoading, error }
}