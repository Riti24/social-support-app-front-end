import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from 'react';
import Step1Personal from './steps/Step1Personal';
import Step2Family from './steps/Step2Family';
import Step3Situations from './steps/Step3Situations';
import Review from './steps/Review';
import { AppBar, Toolbar, Typography, FormControlLabel, Box, Switch } from '@mui/material';


export default function Layout() {
    const [rtl, setRtl] = useState(false);

    const handleLangToggle = () => {
        console.log("Toggling language. RTL is was:" + rtl + " and will be:" + !rtl);
        setRtl(!rtl);
    }

    return (
        <div>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Social Support Application
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="body2">English</Typography>
                        <FormControlLabel
                            sx={{ m: 0 }}
                            control={<Switch checked={rtl} onChange={handleLangToggle} />}
                            label="Arabic"
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
        </div>
    );
}
