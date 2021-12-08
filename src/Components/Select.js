import * as React from "react";
import { InputLabel, MenuItem, Select } from "@mui/material";

export const CustomSelect = ({
  title,
  list,
  value,
  handleChange,
  disabled,
}) => {
  return (
    <div>
      <InputLabel className="mb-1 text-gray-800">{title}</InputLabel>
      <Select
        value={value}
        onChange={({ target: { value } }) => handleChange(value)}
        fullWidth
        style={{ padding: 0 }}
        disabled={disabled}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {list.map((value, i) => (
          <MenuItem key={i} value={value.toString().toLowerCase()}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
