import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import "../Components/Datafetch.scss";
import { Button } from "bootstrap";
// UseState
export default function Datafetch() {
  const [data, setdata] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  const [selectdata, setSelectdata] = useState("");
  const [searchdata, setsearchdata] = useState("");
  const [clear, setCleardata] = useState(false);
  // const [matchdata, setmatchdata] = useState([])

  // Data Fetching

  const fetchData = async () => {
    let result = await axios.get(
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json"
    );
    let filterdata = result.data.slice(1);
    if (selectdata !== "") {
      filterdata = filterdata.filter((data) => data.platform === selectdata);
    }
    if (searchdata !== "") {
      filterdata = filterdata.filter((data) =>
        data.title.toLowerCase().includes(searchdata.toLowerCase())
      );
    }
    setfilterdata(filterdata);
    setdata(filterdata);
  };
  // UseEffect Calling Function
  useEffect(() => {
    fetchData();
  });
  //
  const handlePlatformChange = (event) => {
    setSelectdata(event.target.value);
  };
  //Platform Serach Funcnality
  const handlePlatformSearh = (event) => {
    event.preventDefault();
    setsearchdata(event.target.value);
    setCleardata(true);
  };
  // Input Click Funcnality
  const handleClick = (title) => {
    setsearchdata(title);
    setCleardata(false);
  };
  const searchItems = () => {
    const newdata = newdata.filter((data) =>
      data.title.toLowerCase().includes(searchdata.toLowerCase())
    );
    setdata(newdata);
  };
  return (
    //render part
    <div className="container main-list">
      <div className="row ">
        {/* Input Button */}
        <div className="input-group mt-3 col-12 col-md-12 col-sm-12">
          <input
            type="search"
            value={searchdata}
            onChange={handlePlatformSearh}
            className="form-control rounded"
            placeholder="Search"
          />
          {/* <button value={searchdata} type="submit" onClick={() => searchItems} className="btn btn-outline-primary">search</button> */}
        </div>
        {/* Input Button Click to show list Funcnality */}
        <div className="mt-3 col-12 col-md-12 col-sm-12 list">
          {clear &&
            searchdata &&
            data.map((data) => (
              <div className="col-12">
                <li
                  className="a"
                  onClick={() => handleClick(data.title)}
                  value={data.title}
                >
                  {data.title}
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
            <>
              <option value="">All</option>
              <option value="PlayStation Vita">PlayStation Vita</option>
              <option value="PlayStation 3">PlayStation 3</option>
              <option value="iPad">iPad</option>
              <option value="Xbox 360">Xbox 360</option>
              <option value="Macintosh">Macintosh</option>
              <option value="PC">PC</option>
              <option value="iPhone">iPhone</option>
              <option value="Nintendo DS">Nintendo DS</option>
            </>
          </select>
        </div>
        <div className="row">
          {filterdata &&
            data.map((item) => (
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
                      {
                        item.editors_choice == "N" ?
                        <button className="card-text btn btn1 btn-danger">
                          <span>editors_choice :</span>
                          {item.editors_choice}
                        </button>
                      :         
                      <button className="card-text btn btn1 btn-success">
                      <span>editors_choice :</span>
                      {item.editors_choice}
                    </button>
                    }
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
