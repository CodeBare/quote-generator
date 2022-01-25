import {Box, Container, Icon, Typography, Button, useMediaQuery, useTheme} from "@mui/material";
import {FormatQuote, Twitter} from "@mui/icons-material";
import {useEffect, useState} from "react";
import QuoteDataHook from "./QuoteData.hook";

// These are styles applied to the buttons on the page.
const buttonSX = {
    cursor: 'pointer',
    fontSize: '1.2rem',
    height: '2.5rem',
    border: 'none',
    borderRadius: '10px',
    color: '#FFF',
    background: '#333',
    outline: 'none',
    padding: '0.5rem 1.8rem',
}

// The entry point to the application,
// technically index.tsx is the entry
// point, but it simply sets up React
// and passes this component as the
// primary object -- hence this is
// the entry point.
const App = () => {
    // Theme and media query to handle mobile differences
    // the single difference here is the font size is
    // slightly smaller on mobile devices
    // useTheme retrieves a theme object
    // with MUI defaults
    // useMediaQuery attempts to determine if the
    // screen size is smaller than their 'md' breakpoint
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('md'))

    // Dynamically set to compensate for longer quotes, 2.75 or 2.00
    const [sFontSize, setFontSize] = useState('2.75rem')
    // This state object exists when we want the quotes hook to return
    // a new quote
    const [sNewQuote, setNewQuote] = useState<boolean|null>(null)

    // The data hook that retrieves the quotes from the API and returns
    // a random quote from that data set.
    const hQuotes = QuoteDataHook(sNewQuote)

    useEffect(() => {
        // Slightly smaller font for mobile devices.
        // matches is based on the theme and media query
        if(matches)
            setFontSize('2.5rem')
    }, [matches])

    useEffect(() => {
        // This effect runs when the hQuotes data changes
        // OR when the newQuote value changes
        // Set the newQuote value to null, as the
        // quote data just changed.
        setNewQuote(null)
        // Alter the font sized based on the length of the
        // quote.  50 is some arbitrary number
        if(hQuotes.text.length >= 50)
            setFontSize('2rem')
        else
            setFontSize('2.75rem')
    }, [hQuotes])

  return (
    <Container sx={{
        width: 'auto',
        maxWidth: '900px',
        padding: '20px 30px',
        margin: 'auto 10px',
        borderRadius: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        boxShadow: '0 10px 10px 10px rgba(0, 0, 0, 0.2)'
    }}>
      <Typography fontSize={sFontSize}>
        <Icon sx={{
            fontSize: '4rem'
        }}><FormatQuote sx={{
            transform: 'scale(-1, 1)',
            fontSize: '4rem'
        }} /></Icon>
          <span id={'quote'}>{hQuotes.text}</span>
      </Typography>
        <Typography fontSize={'2rem'}
                    fontStyle={'italic'}
                    fontWeight={400} sx={{
            marginTop: '15px',
            textAlign: 'center'
        }}>
            <span id={'author'}>{Boolean(hQuotes.author) ? hQuotes.author : 'Unknown'}</span>
        </Typography>
        {/* Buttons */}
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: '15px'
        }}>
            <Button id={'twitter'}
                    variant={'contained'}
                    onClick={() => {
                        const url = `https://twitter.com/intent/tweet?text=${hQuotes.text} - ${hQuotes.author}`
                        window.open(url, '_blank')
                    }}
                    sx={buttonSX}
                    title={'Tweet this!'}>
                <Twitter sx={{
                    fontSize: '1.5rem'
                }} />
            </Button>
            <Button variant={'contained'}
                    onClick={() => setNewQuote(true)}
                    sx={buttonSX}>New Quote</Button>
        </Box>
    </Container>
  );
}

export default App;
