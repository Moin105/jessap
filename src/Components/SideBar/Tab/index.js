import React from "react";
import arrow from "../../../Images/arrow.png";
function Tab({ name, icon }) {
  return (
    <React.Fragment>
      <div className="tab-btn">
        <figure className="icon">
          <img src={icon} />
        </figure>
        <p className="tab-name">{name}</p>
        <figure className="arrow">
          <img src={arrow} />
        </figure>
      </div>
    </React.Fragment>
  );
}

export default Tab;
