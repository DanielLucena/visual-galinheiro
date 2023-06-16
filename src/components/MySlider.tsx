import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { useState } from "react";
export type SlidersProps = {
  valor: number;
  range: number;
};

export default function MySlider(props: SlidersProps) {
  const grau = (props.valor / props.range) * 100;
  console.log(grau);
  const [value, setValue] = useState(grau);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <Box sx={{ width: 200 }}>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <Slider aria-label="Volume" value={value} onChange={handleChange} />
      </Stack>
    </Box>
  );
}
