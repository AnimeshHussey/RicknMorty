import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SidepanleFilters from "./Components/Filters/Filter";
import Card from "./Components/Card/card";
import "./App.css";
import _ from "lodash";

function App() {
  const [data, setData] = useState([]);
  const [filterTypes, setfilterTypes] = useState([]);
  const [filtereddata, setfiltereddata] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (data && data.length > 0) {
      let species = _.uniq(data.map(elem => elem.species)).map(elem => {
        return {
          type: "species",
          name: elem,
          isSelected: false
        };
      });
      let gender = _.uniq(data.map(elem => elem.gender)).map(elem => {
        return {
          type: "gender",
          name: elem,
          isSelected: false
        };
      });
      let origin = _.uniq(data.map(elem => elem.origin.name)).map(elem => {
        return {
          type: "origin",
          name: elem,
          isSelected: false
        };
      });
      setfilterTypes(species.concat(gender, origin));
    }
  }, [data]);

  const filterData = (type, searchedTxt) => {
    setfilterTypes(
      filterTypes.map(elem =>
        elem.type === type && elem.name === searchedTxt
          ? {
              ...elem,
              isSelected: !elem.isSelected
            }
          : elem
      )
    );
  };

  useEffect(() => {
    if (
      filterTypes &&
      filterTypes.length > 0 &&
      filterTypes.every(elem => elem.isSelected === false)
    ) {
      setfiltereddata([...data]);
    } else {
      let selectedfilters = filterTypes.filter(elem => elem.isSelected);
      if (selectedfilters && selectedfilters.length > 0) {
        let localdata = [...data];
        selectedfilters.forEach(elem => {
          localdata = localdata.filter(item =>
            item.hasOwnProperty(elem.type) && elem.type !== "origin"
              ? item[elem.type] === elem.name
              : item[elem.type].name === elem.name
          );
        });
        setfiltereddata([...localdata]);
      }
    }
  }, [filterTypes]);

  const fetchData = () => {
    try {
      fetch("https://rickandmortyapi.com/api/character/")
        .then(response => {
          return response.json();
        })
        .then(response => {
          setData(
            response && response.results && response.results.length > 0
              ? response.results
              : []
          );
        })
        .catch(err => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div id="main">
      <div className="header">
        <h1>{"Rick & Morty"}</h1>
      </div>
      <div className="bodyContainer">
        <div className="sidenav">
          <SidepanleFilters filterData={filterData} filterTypes={filterTypes} />
        </div>
        <div className="characters">
          {filterTypes.length > 0 &&
          filterTypes.some(elem => elem.isSelected === true)
            ? filtereddata.map(elem => <Card characterdata={elem} />)
            : data.map(elem => <Card characterdata={elem} />)}
        </div>
      </div>
    </div>
  );
}

export default App;
