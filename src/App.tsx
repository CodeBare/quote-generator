import {Box, IconButton, Container, Icon, Typography, Button, useMediaQuery, Theme, useTheme} from "@mui/material";
import {FormatQuote, Twitter} from "@mui/icons-material";
import {useEffect, useState} from "react";
import QuoteDataHook from "./QuoteData.hook";

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

const App = () => {
    // Theme and media query to handle mobile differences
    const theme = useTheme()
    const matches = useMediaQuery(theme.breakpoints.down('md'))

    // Dynamically set to compensate for longer quotes, 2.75 or 2.00
    const [sFontSize, setFontSize] = useState('2.75rem')
    const [sNewQuote, setNewQuote] = useState<boolean|null>(null)

    const hQuotes = QuoteDataHook(sNewQuote)

    useEffect(() => {
        // Slightly smaller font for mobile devices.
        if(matches)
            setFontSize('2.5rem')
    }, [matches])

    useEffect(() => {
        setNewQuote(null)
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
            <span id={'author'}>{hQuotes.author}</span>
        </Typography>
        {/* Buttons */}
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: '15px'
        }}>
            <Button id={'twitter'}
                        variant={'contained'}
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
