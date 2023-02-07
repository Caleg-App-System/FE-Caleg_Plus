import React from "react";

const NavbarAdmin = () => {
  return (
    <>
      <div id="main">
        <div class="head">
          <div class="col-div-6">
            <span class="nav">&#9776; Dashboard</span>
            <span class="nav2">&#9776; Dashboard</span>
          </div>

          <div class="col-div-6">
            <div class="profile">
              <img src="images/user.png" class="pro-img" />
              <p>
                Manoj Adhikari <span>UI / UX DESIGNER</span>
              </p>
            </div>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
    </>
  );
};

export default NavbarAdmin;
