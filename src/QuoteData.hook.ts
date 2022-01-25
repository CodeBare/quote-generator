import {useEffect, useState} from "react";

// The interface for a quote, I use the I designator
// because it's a holdover from dabbling with C#
export interface IQuote {
    text: string
    author: string
}

// This method actually fetches the data from an API
// and converts it to a JSON object, then returns
// the results
const fetchQuotes = async (): Promise<IQuote[]> => {
    const quotes: IQuote[] = []
    try {
        const results = await fetch('https://type.fit/api/quotes')
        return await results.json()
    } catch (error: any) {
        console.error('Error somewhere...', error.message)
        return quotes
    }
}

// This hook is responsible for managing the data for quotes.
// It could be used from anywhere within the application and
// provide the same data to multiple components.
const QuoteDataHook = (nextQuote: boolean|null = null) => {
    // We use state to hold a copy of the data
    const [sData, setData] = useState<IQuote[]>([])
    // This state holds the current quote information
    const [sQuote, setQuote] = useState<IQuote>({
        text: `What you are is what you have been. What
        you'll be is what you do now.`,
        author: `Buddha`
    })

    // This effect runs once when the hook is created
    // and calls the fetchQuotes method to get the
    // data.  Once it is returned, a random quote
    // is selected from the list to be stored in
    // sQuote, then sData is set with sQuote sliced
    // out.
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

    // This effect function runs when there is a change
    // to nextQuote.  It updates sData with a new random
    // quote and then removes the quote from sData
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

    // Return a new IQuote to any components that have
    // called this hook.
    return sQuote
}

export default QuoteDataHook