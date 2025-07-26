import React, { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState();
    // console.log(theme)
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        const themeChanger = storedTheme || 'light'
        document.documentElement.setAttribute('data-theme', themeChanger);
        setTheme(themeChanger)
    }, [])


    const themeChanger = () => {
        const exTheme = document.documentElement.getAttribute('data-theme')
        exTheme === 'light' ? setTheme('dark') : setTheme('light');
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }

    const themeData = {
        themeChanger,
        theme
    }

    return (
        <ThemeContext value={themeData}>
            {children}
        </ThemeContext>
    );
};

export default ThemeProvider;