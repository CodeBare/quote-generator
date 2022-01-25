import {useEffect, useState} from "react";

export interface IQuote {
    text: string
    author: string
}

const fetchQuotes = async (): Promise<IQuote[]> => {
    const quotes: IQuote[] = []
    try {
        const results = await fetch('https://type.fit/api/quotes')
        const sayings = await results.text()
        return JSON.parse(sayings)
    } catch (error: any) {
        console.error('Error somewhere...', error.message)
        return quotes
    }
}

const QuoteDataHook = (nextQuote: boolean|null = null) => {
    const [sData, setData] = useState<IQuote[]>([])
    const [sQuote, setQuote] = useState<IQuote>({
        text: `What you are is what you have been. What
        you'll be is what you do now.`,
        author: `Buddha`
    })

    useEffect(() => {
            // Populate quotes from the api...
        fetchQuotes()
            .then(quotes => {
                const index = Math.floor(Math.random() * quotes.length)
                setQuote(quotes[index])
                setData([
                    ...quotes.slice(0, index),
                    ...quotes.slice(index + 1)
                ])
            })
    }, [])

    useEffect(() => {
        if(nextQuote) {
            // Get the next quote from the array
            const index = Math.floor(Math.random() * sData.length)
            setQuote(sData[index])
            setData(prev => ([
                ...prev.slice(0, index),
                ...prev.slice(index + 1)
            ]))
        }
    }, [nextQuote, sData])

    return sQuote
}

export default QuoteDataHook