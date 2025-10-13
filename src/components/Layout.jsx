import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useState, useMemo } from 'react';
import Step1Personal from './steps/Step1Personal';
import Step2Family from './steps/Step2Family';
import Step3Situations from './steps/Step3Situations';
import Review from './steps/Review';
import { AppBar, Toolbar, Typography, FormControlLabel, Box, Switch, Stepper, Step, StepLabel, Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from "react-redux";
import { setStep } from "../store/slices/form-slice";

const steps = ["personal.title", "family.title", "situations.title"];

export default function Layout() {
    const { t, i18n } = useTranslation();
    const [rtl, setRtl] = useState(i18n.language.startsWith("ar"));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useMemo(() => createTheme({ direction: rtl ? "rtl" : "ltr" }), [rtl]);
    const activeStep = useSelector(state => state.form.step)

    const handleLangToggle = () => {
        const isRtl = !rtl;
        console.log("Toggling language. RTL is was:" + rtl + " and will be:" + !rtl);
        setRtl(isRtl);
        const lang = isRtl ? 'ar' : 'en';
        i18n.changeLanguage(lang);
        document.dir = isRtl ? 'rtl' : 'ltr';
    };


    const go = (n) => {
        dispatch(setStep(n));
        if (n === 0) navigate("/personal");
        if (n === 1) navigate("/family");
        if (n === 2) navigate("/situations");
        if (n === 3) navigate("/review");
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
            <Container
                maxWidth="lg"
                sx={{
                    py: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                 <Box sx={{ width: "100%", maxWidth: 900 }}>
                <Stepper activeStep={activeStep} >
                    {steps.map((step, index) => (
                        <Step key={index} onClick={() => go(index)}>
                            <StepLabel>{t(step)}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
              
                    <Routes>
                        <Route path="/personal" element={<Step1Personal onNext={() => go(1)} />} />
                        <Route path="/family" element={<Step2Family onBack={() => go(0)} onNext={() => go(2)} />} />
                        <Route path="/situations" element={<Step3Situations onBack={() => go(1)} onNext={() => go(3)} />} />
                        <Route path="/review" element={<Review onBack={() => go(2)} />} />
                        <Route index element={<Navigate to="/personal" replace />} />
                    </Routes>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
