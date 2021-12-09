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
  const [type, setType] = useState({});
  const [make, setMake] = useState({ Make_Name: "ASTON MARTIN" });
  const [year, setYear] = useState({});
  const [data, setData] = useState([]);
  const [makeList, setMakeList] = useState([{ Make_Name: "ASTON MARTIN" }]);
  const [typeList, setTypeList] = useState([]);
  const [query, setQuery] = useState("/GetModelsForMake/ASTON MARTIN");

  useEffect(() => {
    const url =
      "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json";
    axios
      .get(`${url}`)
      .then((res) => {
        setMakeList(res.data.Results);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setTypeList([]);
    if (make) {
      const url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/${make?.Make_Name.trim()}?format=json`;
      axios
        .get(`${url}`)
        .then((res) => {
          setTypeList(res.data.Results);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [make]);

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

    if (make?.Make_Name && (type?.VehicleTypeName || year?.year)) {
      val = `/GetModelsForMakeYear/make/${make?.Make_Name.trim()}`;

      if (type?.VehicleTypeName) {
        val = val + `/vehicletype/${type?.VehicleTypeName.trim()}`;
      }

      if (year?.year) {
        val = val + `/modelyear/${year?.year}`;
      }
    } else if (make?.Make_Name) {
      val = `/GetModelsForMake/${make?.Make_Name.trim()}`;
    } else if (!make?.Make_Name) {
      val = "";
    }

    setQuery(val);
  }, [type, make, year]);

  const handleFilterClear = () => {
    setType({});
    setYear({});
    handlePaginationReset();
  };

  const handlePaginationReset = () => {
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
    makeList,
    typeList,
  };

  return (
    <AppContext.Provider value={values}>
      <CustomTheme>{children}</CustomTheme>
    </AppContext.Provider>
  );
};
