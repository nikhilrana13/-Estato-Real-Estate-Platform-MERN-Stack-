import React, { useState, useEffect } from 'react'
import useDebounce from './useDebounce';

const useLocationSearch = () => {
    const [value, setValue] = useState("")
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [isUserTyping, setIsUserTyping] = useState(false);
    const [hasSearched, SetHasSearched] = useState(false)

    const debounced = useDebounce(value)
    useEffect(() => {
        if (!isUserTyping) return;
        if (!debounced || debounced.length < 3) {
            setSuggestions([]);
            setOpen(false);
            SetHasSearched(false)
            return;
        }
        const fetchLocationSuggestions = async () => {
            try {
                setLoading(true);
                SetHasSearched(true)

                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?q=${debounced}&format=json&addressdetails=1&limit=6&countrycodes=in`,
                    {
                        headers: {
                            "Accept": "application/json",
                        },
                    }
                );
                const data = await response.json();
                // console.log("data", data)
                setSuggestions(data || []);
                setOpen(true);
            } catch (error) {
                console.log("failed to get suggestions", error);
            } finally {
                setLoading(false);
            }
        }
        fetchLocationSuggestions()
    }, [debounced, isUserTyping]);
    return {
        value,
        setValue,
        suggestions,
        loading,
        open,
        setOpen,
        hasSearched,
        setIsUserTyping,
    }
}

export default useLocationSearch