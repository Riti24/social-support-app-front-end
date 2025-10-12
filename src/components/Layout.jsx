import { Routes, Route } from "react-router-dom";
import { useState, useMemo } from 'react';
import Step1Personal from './steps/Step1Personal';
import Step2Family from './steps/Step2Family';
import Step3Situations from './steps/Step3Situations';
import Review from './steps/Review';
import { AppBar, Toolbar, Typography, FormControlLabel, Box, Switch, ThemeProvider,createTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';


export default function Layout() {
    const { t, i18n } = useTranslation();
    const [rtl, setRtl] = useState(i18n.language.startsWith("ar"));
    const theme = useMemo(()=>createTheme({direction: rtl ? "rtl" : "ltr"}), [rtl]);

    const handleLangToggle = () => {
    const isRtl = !rtl;
     console.log("Toggling language. RTL is was:" + rtl + " and will be:" + !rtl);
    setRtl(isRtl);
    const lang = isRtl ? 'ar' : 'en';
    i18n.changeLanguage(lang);
    document.dir = isRtl ? 'rtl' : 'ltr';
  };

    return (
        <ThemeProvider theme={theme}>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }} >
                        {t('appTitle')}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="body2">{t('english')}</Typography>
                        <FormControlLabel
                            sx={{ m: 0 }}
                            control={<Switch checked={rtl} onChange={handleLangToggle} />}
                            label={t('arabic')}
                        />
                    </Box>
                </Toolbar>
            </AppBar>
            <Routes>
                <Route path="/personal" element={<Step1Personal />} />
                <Route path="/family" element={<Step2Family />} />
                <Route path="/situations" element={<Step3Situations />} />
                <Route path="/review" element={<Review />} />
            </Routes>
        </ThemeProvider>
    );
}
