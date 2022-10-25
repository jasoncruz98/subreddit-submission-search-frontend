import { useEffect, useState } from 'react'

export const useAllSubmissions = (value: string) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    console.log('value', value)

    useEffect(() => {
        setLoading(true)
        setError(false)
        fetch(`https://api.pushshift.io/reddit/search/submission/?q=${value}`)
            .then(response => response.json())
            .then(json => {
                setData(json.data)
                setLoading(false)
            })
            .catch(() => {
                setError(true)
                setLoading(false)
            })
    }, [value])

    return { data, loading, error }
}

