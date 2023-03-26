import { useEffect, useState } from "react";

const doFetch = async (url: string, signal: AbortSignal | null) => {
    const res = await fetch(url, { signal })
    const json = await res.json()
    return json
}

const useData = function<T>(url: string) {
    const [data, setData] = useState<T>();

    const refresh = async () => {
        doFetch(url, null).then(data => setData(data))
    }

    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        doFetch(url, signal).then(data => setData(data))

        return () => controller.abort()
    }, [url]);

    return { data, refresh };
}

export default useData