import React, { useState, useEffect } from "react";
import { AutoComplete, Input } from "antd";
import { useAppDispatch, useAppSelector } from "@/store";
import { get_user_list, select_user_list } from "@/store/slice/user";

function SearchComponent() {
  const dispatch = useAppDispatch();
  const searchData = useAppSelector(select_user_list);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!searchData.list || searchData.list.length === 0) {
      dispatch(get_user_list());
    }
  }, [dispatch, searchData.list]);

  const handleSearch = (value) => {
    const filteredResults = searchData.list.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchText(value);
    setSearchResults(filteredResults);
  };

  return (
    <div>
      <AutoComplete
        style={{ width: 200 }}
        value={searchText}
        onChange={handleSearch}
        options={searchResults.map((item) => ({
          value: item.name,
        }))}
      >
        <Input.Search placeholder="Search by name" enterButton />
      </AutoComplete>
    </div>
  );
}

export default SearchComponent;
