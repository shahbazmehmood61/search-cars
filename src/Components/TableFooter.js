import React, { useContext } from "react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { AppContext } from "../AppContext";
import { IconButton, Typography } from "@mui/material";

export const TableFooter = () => {
  const { handleRowsPerPage, page, count, sizePerPage, numOfPages } =
    useContext(AppContext);

  return (
    <div className="flex sm:flex-row flex-col justify-between w-full py-4 sm:items-center items-start">
      <div className="sm:flex-1 w-full">
        <div className="flex sm:flex-row flex-col justify-between sm:items-center items-start w-full">
          <div className="sm:mr-5 mr-2 whitespace-nowrap">
            <Typography variant="page" component="span">
              Showing {count > 0 ? page * sizePerPage + 1 : 0} -{" "}
              {count < sizePerPage || page + 1 === numOfPages
                ? count
                : page * sizePerPage + sizePerPage}
            </Typography>
            <Typography variant="page" component="span">
              &nbsp;out of&nbsp;{count.toLocaleString()}
            </Typography>
          </div>
          <div className="flex flex-row justify-between sm:justify-end items-center w-full sm:order-2 order-1">
            <div>
              <span className="mr-2 sm:mr-0">
                <Typography variant="page" component="span">
                  Show Rows
                </Typography>
              </span>
              <select
                className="border border-gray-400 w-16 sm:ml-5 mr-l"
                onChange={handleRowsPerPage}
              >
                <option value="10">10</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div className="sm:hidden block">
              <Buttons />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:block">
        <Buttons />
      </div>
    </div>
  );
};

const Buttons = () => {
  const { handleNextPage, handlePrevPage, page, count, numOfPages } =
    useContext(AppContext);

  return (
    <div className="sm:ml-4">
      <IconButton
        className="sm:mr-3 mr-2"
        disabled={page === 0}
        onClick={handlePrevPage}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextPage}
        disabled={count <= 0 || page + 1 === numOfPages}
      >
        <KeyboardArrowRight />
      </IconButton>
    </div>
  );
};
