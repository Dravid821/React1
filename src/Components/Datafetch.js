import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Components/Datafetch.scss";

export default function Datafetch() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [selectData, setSelectData] = useState("");
  const [searchData, setSearchData] = useState("");
  const [clear, setClearData] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json"
      );
      setData(response.data.slice(1));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let filteredData = [...data];
    if (selectData !== "") {
      filteredData = filteredData.filter((d) => d.platform === selectData);
    }
    if (searchData !== "") {
      filteredData = filteredData.filter((d) =>
        d.title.toLowerCase().includes(searchData.toLowerCase())
      );
    }
    setFilterData(filteredData);
  }, [selectData, searchData, data]);

  const handlePlatformChange = (event) => {
    setSelectData(event.target.value);
  };

  const handlePlatformSearch = (event) => {
    setSearchData(event.target.value);
    setClearData(true);
  };

  const handleClick = (title) => {
    setSearchData(title);
    setClearData(false);
  };

  return (
    <div className="container main-list">
      <div className="row ">
        <div className="input-group mt-3 col-12 col-md-12 col-sm-12">
          <input
            type="search"
            value={searchData}
            onChange={handlePlatformSearch}
            className="form-control rounded"
            placeholder="Search"
          />
        </div>
        <div className="mt-3 col-12 col-md-12 col-sm-12 list">
          {clear &&
            searchData &&
            data.map((d) => (
              <div className="col-12" key={d.id}>
                <li
                  className="a"
                  onClick={() => handleClick(d.title)}
                  value={d.title}
                >
                  {d.title}
                </li>
              </div>
            ))}
        </div>
      </div>
      <div>
        <div className="col-12 col-md-12 col-sm-12">
          <select
            id="platform-select"
            onChange={handlePlatformChange}
            className="form-select mt-4"
            aria-label="Default select example"
          >
            <option value="">All</option>
            <option value="PlayStation Vita">PlayStation Vita</option>
            <option value="PlayStation 3">PlayStation 3</option>
            <option value="iPad">iPad</option>
            <option value="Xbox 360">Xbox 360</option>
            <option value="Macintosh">Macintosh</option>
            <option value="PC">PC</option>
            <option value="iPhone">iPhone</option>
            <option value="Nintendo DS">Nintendo DS</option>
          </select>
        </div>
        <div className="row">
          {filterData  &&
            filterData.map((item) => (
              <div className="col-12 col-md-6 col-lg-4 cl mt-4" key={item.id}>
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">
                      <span className="">Title :</span>
                      {item.title}
                    </p>
                    <p className="card-text">
                      <span>Platform :</span>
                      {item.platform}
                    </p>
                    <p className="card-text">
                      <span>genre :</span>
                      {item.genre}
                    </p>
                    <div className="d-flex justify-content-around btn1">
                      <button className="card-text btn btn-info btn-small">
                        <span>score :</span>
                        {item.score}
                      </button>
                      {item.editors_choice == "N" ? (
                        <button className="card-text btn btn1 btn-danger">
                          <span>editors_choice :</span>
                          {item.editors_choice}
                        </button>
                      ) : (
                        <button className="card-text btn btn1 btn-success">
                          <span>editors_choice :</span>
                          {item.editors_choice}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
