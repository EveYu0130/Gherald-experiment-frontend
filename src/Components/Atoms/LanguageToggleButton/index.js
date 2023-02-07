import React, { useState } from 'react';
import {Box, ToggleButtonGroup, ToggleButton} from "@mui/material";
import { useTranslation } from 'react-i18next';


export default function LanguageToggleButton() {
    const { i18n } = useTranslation()
    const [language, setLanguage] = useState(i18n.language);

    const handleChange = (
        event,
        newLanguage,
    ) => {
        setLanguage(newLanguage);
        i18n.changeLanguage(newLanguage);
    };

    return (
        <Box sx={{ textAlign: 'right', pr: '4%', pt: '20px' }}>
            <ToggleButtonGroup
                color="primary"
                value={language}
                exclusive
                onChange={handleChange}
                aria-label="Language"
            >
                <ToggleButton value="en">EN</ToggleButton>
                <ToggleButton value="zh">中</ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
}
