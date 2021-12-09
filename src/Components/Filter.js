import { Button, Grid, Typography, useMediaQuery } from "@mui/material";
import React, { useContext } from "react";
import { CustomSelect } from "./Select";
import { yearList } from "../data";
import { AppContext } from "../AppContext";
import { useTheme } from "@mui/styles";

export const Filter = () => {
  const {
    type,
    make,
    year,
    setYear,
    setMake,
    setType,
    handleFilterClear,
    makeList,
    typeList,
  } = useContext(AppContext);
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
                  disabled={
                    (type?.VehicleTypeName === undefined ||
                      type?.VehicleTypeName === {}) &&
                    (year?.year === undefined || year?.year === {})
                  }
                >
                  Clear Filter
                </Button>
              </div>
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <CustomSelect
            title="Make"
            keyName="Make_Name"
            list={makeList}
            value={make}
            handleChange={setMake}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <CustomSelect
            title="Type"
            keyName="VehicleTypeName"
            list={typeList}
            value={type}
            handleChange={setType}
            disabled={make === ""}
          />
        </Grid>
        <Grid item xs={12} sm={3} md={3}>
          <CustomSelect
            title="Year"
            list={yearList}
            value={year}
            handleChange={setYear}
            disabled={make === ""}
            keyName="year"
          />
        </Grid>
        {matches === false && (
          <Grid item xs={12} sm={3} md={3}>
            <div className="flex flex-row items-end justify-end h-full">
              <Button
                onClick={handleFilterClear}
                variant="outlined"
                size="small"
                disabled={
                  (type?.VehicleTypeName === undefined ||
                    type?.VehicleTypeName === {}) &&
                  (year?.year === undefined || year?.year === {})
                }
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
