import { Button, Grid, Typography, useMediaQuery } from "@mui/material";
import React, { useContext } from "react";
import { CustomSelect } from "./Select";
import { makeList, yearList, typeList } from "../data";
import { AppContext } from "../AppContext";
import { useTheme } from "@mui/styles";

export const Filter = () => {
  const { type, make, year, setYear, setMake, setType, handleFilterClear } =
    useContext(AppContext);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="py-4 mt-6">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <div className="flex flex-row justify-between">
            <Typography className="text-gray-800" variant="h2">
              Search Cars
            </Typography>
            {matches && (
              <div className="flex flex-row items-end">
                <Button
                  onClick={handleFilterClear}
                  variant="outlined"
                  size="small"
                  disabled={type === "" && year === ""}
                >
                  Clear Filter
                </Button>
              </div>
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <CustomSelect
            title="Make"
            list={makeList}
            value={make}
            handleChange={setMake}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <CustomSelect
            title="Type"
            list={typeList}
            value={type}
            handleChange={setType}
            disabled={make === ""}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <CustomSelect
            title="Year"
            list={yearList}
            value={year}
            handleChange={setYear}
            disabled={make === ""}
          />
        </Grid>
        {matches === false && (
          <Grid item xs={12} sm={3} md={6}>
            <div className="flex flex-row items-end justify-end h-full">
              <Button
                onClick={handleFilterClear}
                variant="outlined"
                size="small"
                disabled={type === "" && year === ""}
              >
                Clear Filter
              </Button>
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};
