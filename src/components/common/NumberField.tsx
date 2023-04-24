import React, { useEffect, useState } from 'react';
import { Input, Button, InputAdornment, styled } from "@mui/material";
import { grey } from '@mui/material/colors';

interface NumberFieldProps {
    value: number;
    min?: number;
    onChange: (value: number) => void;
}

const IncreamentButton = styled(Button)({
    color: grey[800],
    padding: '8px',
    '&:hover': {
      backgroundColor: grey[200],
    },
})

const NumberField = ({ value, min, onChange }: NumberFieldProps) => {
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (!isNaN(Number(newValue)) && (!min || Number(newValue) >= min)) {
      setInputValue(Number(newValue));
      onChange(Number(newValue));
    }
  };

  const handleButtonClick = (delta: number) => {
    const newValue = Number(inputValue) + delta;

    if (!min || newValue >= min) {
      setInputValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <Input
      type="tel"
      value={inputValue}
      onChange={handleInputChange}
      disableUnderline
      inputProps={{
        min: min,
        style: { textAlign: 'center', appearance: 'none' }
      }}
      startAdornment={
        <InputAdornment position="start">
          <IncreamentButton onClick={() => handleButtonClick(-1)} disableRipple>-</IncreamentButton>
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end">
          <IncreamentButton onClick={() => handleButtonClick(1)} disableRipple>+</IncreamentButton>
        </InputAdornment>
      }
    />
  );
};

export default NumberField;
