import React, { useState, useEffect } from "react";
import LineChart from "./core/LineChart";
import PieChart from "./core/PieChart";
import axios from 'axios';

import "./style.css";


const App = (props) => {
  const [dataX, setDataX] = useState([]);
  const [convertedDataX, setConvertedDataX] = useState([]);
  const [GlobalDateStart, setGlobalDateStart] = useState(0);
  const [GlobalDateEnd, setGlobalDateEnd] = useState(30);

  useEffect(() => {
    axios
      .get(
        "http://my-json-server.typicode.com/yisehak-awm/finbit-hiring/result"
      )
      .then(({ data }) => {
        console.log(data)

        var tempData = []


        for (var x = 0; x < data.length; x++) {
          var tempXY = []
          for (var y = GlobalDateStart; y < GlobalDateEnd; y++) {
            var tempXYData = {
              "x": data[x].records[y].day,
              "y": data[x].records[y].new
            }
            tempXY.push(tempXYData)
          }
          var tempOBj = {
            "id": data[x].country,
            "data": tempXY
          }
          tempData.push(tempOBj)
        }
        setConvertedDataX(tempData)
        setDataX(data);
      });
  }, []);

  var changeStartDate = ((event) => {
    setGlobalDateStart(event.target.value)
    console.log(GlobalDateStart)
    updateDate()
  })
  var changeEndDate = ((event) => {
    setGlobalDateEnd(event.target.value)
    console.log(GlobalDateEnd)
    updateDate()
  })
  var updateDate=()=>{
    axios
    .get(
      "http://my-json-server.typicode.com/yisehak-awm/finbit-hiring/result"
    )
    .then(({ data }) => {
      console.log(data)

      var tempData = []


      for (var x = 0; x < data.length; x++) {
        var tempXY = []
        for (var y = GlobalDateStart; y < GlobalDateEnd; y++) {
          var tempXYData = {
            "x": data[x].records[y].day,
            "y": data[x].records[y].new
          }
          tempXY.push(tempXYData)
        }
        var tempOBj = {
          "id": data[x].country,
          "data": tempXY
        }
        tempData.push(tempOBj)
      }
      setConvertedDataX(tempData)
      setDataX(data);
    });
  }
  return (
    <div className="wrapper">
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Finbit Hiring</a>
      </nav>
      <main className="container bg-light">

        <br></br>
        <br></br>
        {convertedDataX.map((d) =>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value={d.id} />
            <label className="form-check-label" for="inlineCheckbox1">{d.id}</label>
          </div>
        )}
        <br></br>
        <br></br>
        <br></br>

        <div className="row">
          <div className="dropdown col-md-3">
            <label>Start Date  </label>
            <select class="custom-select"  defaultValue={GlobalDateStart}  onChange={changeStartDate} >
              <option value="0">0</option>
              <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
            </select>
          </div>
          <div className="dropdown col-md-3">
            <label>End Date  </label>

            <div class="input-group mb-3">
              <div class="input-group-prepend">
              </div>
              <select class="custom-select" defaultValue={GlobalDateEnd} onChange={changeEndDate}>
                <option value="30">30</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
              </select>
            </div>
          </div>
        </div>
        <LineChart data={convertedDataX} />
        <PieChart data={[]} />

      </main>
      <nav className="navbar fixed-bottom navbar-dark bg-dark">
        <a className="navbar-brand" href="#"></a>
      </nav>
    </div>
  )
};

export default App;
