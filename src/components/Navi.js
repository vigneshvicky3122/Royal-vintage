import React from "react";
import { useNavigate } from "react-router-dom";

function Navi() {
  let navigate = useNavigate();
  let LogOut = async () => {
    window.localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <nav className="nav">
        <div className="nav-container">
          <div className="navbar-brand">Royal Vintages</div>
          <div className="nav-secondary">
            <a className="nav-link" href="/Dashboard">
              Dashboard
            </a>

            <a className="nav-link" href="/orders">
              Orders
            </a>
            {window.localStorage.getItem("UserId") ===
            "6389f63fb128d4871a0dc445" ? (
              <a className="nav-link" href="/Admin">
                Admin
              </a>
            ) : (
              <a className="nav-link" href="/MyCart">
                My Cart{" "}
                <span className="cartValue">
                  {window.localStorage.getItem("CartValue") === null || ""
                    ? 0
                    : window.localStorage.getItem("CartValue")}
                </span>
              </a>
            )}

            <a href="/login" onClick={LogOut} className="nav-link">
              LogOut
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navi;
