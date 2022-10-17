import {useState, useCallback} from "react";


const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequests = useCallback(async (requestConfig, applydata) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                requestConfig.url, {
                    method: requestConfig.method ? requestConfig.method:"get",
                    headers: requestConfig.headers ? requestConfig.headers: {},
                    body: requestConfig.body ? JSON.stringify({text: requestConfig.text}) : null
                }
            );

            if (!response.ok) {
                throw new Error('Request failed!');
            }
            const data = await response.json();
            applydata(data);
        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    },[]);

    return {
        isLoading,
        error,
        sendRequests,
    }
}

export default useHttp;