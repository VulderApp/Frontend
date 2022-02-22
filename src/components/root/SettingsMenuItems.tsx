import React, { useState } from "react";
import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { language, lightMode } from "../../states";
import { saveItem } from "../../utils/localStorageUtil";
import { LIGHT_MODE_KEY } from "../../constants";
import { useTranslation } from "react-i18next";

const SettingsMenuItems = () => {
  const [isLightMode, setLightMode] = useRecoilState(lightMode);
  const [currentLanguage, setCurrentLanguage] = useRecoilState(language);
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);
  const { t } = useTranslation();

  const handleLanguageChange = (event: SelectChangeEvent) => {
    setCurrentLanguage(event.target.value);
    setSelectedLanguage(event.target.value);
  };

  const handleThemeChange = () => {
    setLightMode(!isLightMode);
    saveItem(LIGHT_MODE_KEY, String(!isLightMode));
  };

  return (
    <>
      <MenuItem>
        <Switch checked={isLightMode} onChange={handleThemeChange} />
        {isLightMode ? t("optionsLightThemeLabel") : t("optionsDarkThemeLabel")}
      </MenuItem>
      <Divider />
      <MenuItem>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
          <InputLabel>{t("optionsLanguageLabel")}</InputLabel>
          <Select value={selectedLanguage} onChange={handleLanguageChange}>
            <MenuItem value="pl">PL</MenuItem>
            <MenuItem value="en">EN</MenuItem>
          </Select>
        </FormControl>
      </MenuItem>
    </>
  );
};

export default SettingsMenuItems;
