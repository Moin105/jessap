import React from "react";
import "./styles.css";
import { GiHamburgerMenu } from "react-icons/gi";
import user from "../../Images/profile.png";

function Header({ show, setShow }) {
  const navHandle = () => {
    console.log("moin here", show);
    setShow(!show);
  };
  return (
    <React.Fragment>
      <div className="header">
        <React.Fragment>
          <div className="menu" onClick={navHandle}>
            {show == true ? (
              <>
                <GiHamburgerMenu />
              </>
            ) : (
              <GiHamburgerMenu />
            )}
          </div>
        </React.Fragment>
        <div className="circle">
          <img src={user} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Header;

// export default Header
