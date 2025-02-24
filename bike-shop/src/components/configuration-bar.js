import React from "react";
import ConfigData from "../config-data";

export default function ConfigurationBar() {
  const listItems = Object.keys(ConfigData).map((category) => {
    const options = ConfigData[category].map((option) => {
      return (
        <li>
          <input type="radio" id="radio" />
          <label>{option}</label>
        </li>
      );
    });

    return (
      <div>
        <label>{category}</label>
        <ul>{options}</ul>
      </div>
    );
  });

  return <div>{listItems}</div>;
}
