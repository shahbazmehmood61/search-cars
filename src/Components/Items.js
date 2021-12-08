import { Typography } from "@mui/material";
import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import { Loader } from "./Loader";
import { TableFooter } from "./TableFooter";

export const Items = () => {
  const { data, sizePerPage, page, type, loading } = useContext(AppContext);

  return (
    <>
      <div className="relative w-full">
        <div className="absolute left-2/4 top-2/4 -translate-x-1/2 -translate-y-1/2">
          {loading && <Loader />}
        </div>
        <table className="result-table overflow-x-auto">
          <thead>
            <tr>
              <th align="left" className="md:w-40 w-28">
                <Head>Make ID</Head>
              </th>
              <th align="left" className="w-40 md:w-auto">
                <Head>Make Name</Head>
              </th>
              <th align="left" className="w-40 md:w-auto">
                <Head>Model Name</Head>
              </th>
              {type !== "" && loading === false && (
                <th align="left" className="w-40 md:w-auto">
                  <Head>Vehicle Type Name</Head>
                </th>
              )}
              <th align="right" className="w-24 md:w-auto">
                <Head>Model ID</Head>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data
                .slice(page * sizePerPage, page * sizePerPage + sizePerPage)
                .map((d) => (
                  <tr key={d.Model_ID}>
                    <TD>{d.Make_ID}</TD>
                    <TD>{d.Make_Name}</TD>
                    <TD>{d.Model_Name}</TD>
                    {d.VehicleTypeName && loading === false && (
                      <TD>{d.VehicleTypeName}</TD>
                    )}
                    <TD align="right">{d.Model_ID}</TD>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="4" rowSpan="2">
                  <div className="h-40 w-full flex flex-row justify-center items-center">
                    <Typography>
                      no records are availabe, please make filter to get results
                    </Typography>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <TableFooter />
    </>
  );
};

const Head = ({ children }) => {
  return (
    <Typography className=" text-white" component="p" variant="heading">
      {children}
    </Typography>
  );
};

const TD = ({ children, ...props }) => {
  return (
    <td {...props}>
      <Typography className="text-gray-800" component="p" variant="body1">
        {children}
      </Typography>
    </td>
  );
};
