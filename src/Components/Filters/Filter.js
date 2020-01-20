import React from "react";
import "./filter.css";

const SidepanleFilters = props => {
  return (
    <>
      <span href="">Filters</span>
      <a href="">Species</a>
      {props.filterTypes &&
        props.filterTypes.map(elem =>
          elem.type === "species" ? (
            <div className="sideNav-items">
              <input
                className="marginLeft"
                type="checkbox"
                value={elem.name}
                onChange={e => props.filterData("species", e.target.value)}
                checked={elem.isSelected}
              />
              <span>{elem.name}</span>
            </div>
          ) : (
            <></>
          )
        )}
      <a href="">Gender</a>
      {props.filterTypes &&
        props.filterTypes.map(elem =>
          elem.type === "gender" ? (
            <div className="sideNav-items">
              <input
                className="marginLeft"
                type="checkbox"
                value={elem.name}
                onChange={e => props.filterData("gender", e.target.value)}
                checked={elem.isSelected}
              />
              <span>{elem.name}</span>
            </div>
          ) : (
            <></>
          )
        )}

      <a href="">Origin</a>
      {props.filterTypes &&
        props.filterTypes.map(elem =>
          elem.type === "origin" ? (
            <div className="sideNav-items">
              <input
                className="marginLeft"
                type="checkbox"
                value={elem.name}
                onChange={e => props.filterData("origin", e.target.value)}
                checked={elem.isSelected}
              />
              <span>{elem.name}</span>
            </div>
          ) : (
            <></>
          )
        )}
    </>
  );
};
export default SidepanleFilters;
