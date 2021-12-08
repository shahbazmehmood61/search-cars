import React, { useState, useEffect } from "react";
import { CustomTheme } from "./theme";
import axios from "axios";

export const AppContext = React.createContext({});

export const AppProvider = ({ children }) => {
  const [sizePerPage, setSizePerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [numOfPages, setNumOfPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");
  const [make, setMake] = useState("honda");
  const [year, setYear] = useState("");
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("/GetModelsForMake/honda");

  useEffect(() => {
    handlePaginationReset();
    if (query) {
      setLoading(true);
      const url = `https://vpic.nhtsa.dot.gov/api/vehicles${query}`;
      axios
        .get(`${url}?format=json`)
        .then((res) => {
          setLoading(false);
          setData(res.data.Results);
          setCount(res.data.Count);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setData([]);
    }
  }, [query]);

  useEffect(() => {
    let val = "";

    if (make !== "" && (type !== "" || year !== "")) {
      val = `/GetModelsForMakeYear/make/${make}`;

      if (type !== "") {
        val = val + `/vehicletype/${type}`;
      }

      if (year !== "") {
        val = val + `/modelyear/${year}`;
      }
    } else if (make !== "") {
      val = `/GetModelsForMake/${make}`;
    } else if (make === "") {
      val = "";
    }

    setQuery(val);
  }, [type, make, year]);

  const handleFilterClear = () => {
    setType("");
    setYear("");
    handlePaginationReset();
  };

  const handlePaginationReset = () => {
    // setSizePerPage(10);
    setPage(0);
    setCount(0);
    setNumOfPages(0);
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setPage((prev) => {
      if (prev === 0) {
        return prev;
      }
      return prev - 1;
    });
  };

  const handleRowsPerPage = ({ target: { value } }) => {
    setSizePerPage(+value);
    setPage(0);
  };

  useEffect(() => {
    setNumOfPages(Math.ceil(count / sizePerPage));
  }, [sizePerPage, count]); // eslint-disable-line react-hooks/exhaustive-deps

  const values = {
    data,
    type,
    make,
    year,
    setYear,
    setMake,
    setType,
    handleRowsPerPage,
    sizePerPage,
    page,
    handleNextPage,
    handlePrevPage,
    numOfPages,
    count,
    handleFilterClear,
    loading,
  };

  return (
    <AppContext.Provider value={values}>
      <CustomTheme>{children}</CustomTheme>
    </AppContext.Provider>
  );
};
