import React, { useState, useEffect } from "react";
import LineChart from "./core/LineChart";
import PieChart from "./core/PieChart";
import axios from 'axios';

import "./style.css";


const App = (props) => {
  const [dataX, setDataX] = useState([]);
  const [convertedDataX, setConvertedDataX] = useState([]);
  const [GlobalCountryList, setCountryList] = useState([]);
  const [GlobalDateStart, setGlobalDateStart] = useState(0);
  const [GlobalDateEnd, setGlobalDateEnd] = useState(30);
  const [countriesToBeEX, setCountToBeEX] = useState([])

  useEffect(() => {
    axios
      .get(
        "http://my-json-server.typicode.com/yisehak-awm/finbit-hiring/result"
      )
      .then(({ data }) => {
        console.log(data)

        var tempData = []
        var CList=[]

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
          CList.push(data[x].country)
        }
        setCountryList(CList)
        setConvertedDataX(tempData)
        setDataX(data);
        console.log(CList)
      });
  }, [GlobalDateStart, GlobalDateEnd, countriesToBeEX]);


  function changeStartDate(event) {

    event.preventDefault()
    console.log(event.target.value)
    setGlobalDateStart(event.target.value)
    updateDate()
  }
  function changeEndDate(event) {
    event.preventDefault()
    console.log(event.target.value)
    setGlobalDateEnd(event.target.value)
    updateDate()
  }
  var updateDate = () => {
    axios
      .get(
        "http://my-json-server.typicode.com/yisehak-awm/finbit-hiring/result"
      )
      .then(({ data }) => {
        console.log(data)

        var tempData = []
        var CList=[]

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
          var counter = 0
          for (var z = 0; z < countriesToBeEX.length; z++) {
            if (tempOBj.id === countriesToBeEX[z]) {
              console.log("FFF"+ tempOBj.id)
              counter = counter + 1
            }
          }
          if (counter !== 0) {
            tempData.push(tempOBj)
          }
                    CList.push(data[x].country)
        }
        setCountryList(CList)

        setConvertedDataX(tempData)
        setDataX(data);
      });
  }
  function handleCheckBox(event) {
    console.log(event.target.value)
    var tempEX=countriesToBeEX
    var counterX = 0
    for (var w = 0; w < tempEX.length; w++) {
      if (event.target.value === tempEX[w]) {
        tempEX.pop(w)
        counterX=counterX+1
      }
    }
    if(counterX===0){
      tempEX.push(event.target.value)
    }
    console.log(tempEX)
    setCountToBeEX(tempEX)
    updateDate()
  }

  return (
    <div className="wrapper">
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Finbit Hiring</a>
      </nav>
      <main className="container bg-light">

        <br></br>
        <br></br>
        {GlobalCountryList.map((d) =>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value={d.toString()} name={d} onChange={e => handleCheckBox(e)} />
            <label className="form-check-label" for="inlineCheckbox1">{d}</label>
          </div>
        )}
        <br></br>
        <br></br>
        <br></br>

        <div className="row">
          <div className="dropdown col-md-2">
            <label>Start Date  </label>
            <select class="custom-select" value={GlobalDateStart} defaultValue={GlobalDateStart} onChange={e => changeStartDate(e)} >
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
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
            </select>
          </div>
          <div className="dropdown col-md-2">
            <label>End Date  </label>

            <div class="input-group mb-3">
              <div class="input-group-prepend">
              </div>
              <select class="custom-select" value={GlobalDateEnd} defaultValue={GlobalDateEnd} onChange={e => changeEndDate(e)}>
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
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
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
