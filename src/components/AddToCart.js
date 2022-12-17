import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navi from "./Navi";
import { url } from "../App";
import axios from "axios";

function AddToCart() {
  let navigate = useNavigate();
  let [Quantity, setQuantity] = useState(1);
  let [products, setProducts] = useState([]);
  let [isDateFrom, setDateFrom] = useState("");
  let [isDateTo, setDateTo] = useState("");
  const firstDate = new Date(isDateFrom.from);
  const secondDate = new Date(isDateTo.to);
  const oneDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

  useEffect(() => {
    getData();
  }, []);

  let getData = async () => {
    try {
      let request = await axios.get(`${`${url}/MyCart`}`, {
        headers: {
          authorization: window.localStorage.getItem("app-token"),
          user: window.localStorage.getItem("UserId"),
        },
      });
      if (request.data.statusCode === 200) {
        setProducts(request.data.user[0].MyCart);
      }

      if (request.data.statusCode === 400) {
        window.alert(request.data.message);
        navigate("/login");
      }
      if (request.data.statusCode > 400) {
        window.alert(request.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkout = async (id, Amount) => {
    try {
      let request = await axios.post(
        `${url}/checkout`,
        {
          productId: id,
          from: isDateFrom,
          to: isDateTo,
          quantity: Quantity,
          total: Amount,
        },
        {
          headers: {
            authorization: window.localStorage.getItem("app-token"),
            user: window.localStorage.getItem("UserId"),
          },
        }
      );
      if (request.data.statusCode === 200) {
        navigate(`/checkout/${request.data.orderId}`);
      }
      if (request.data.statusCode === 400) {
        window.alert(request.data.message);
        navigate("/login");
      }
      if (request.data.statusCode > 400) {
        window.alert(request.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  let handleRemove = async (index, data) => {
    let update = [...products];
    update.splice(index, 1);
    setProducts(update);

    try {
      let request = await axios.put(
        `${url}/removeFromCart`,
        { data },
        {
          headers: {
            authorization: window.localStorage.getItem("app-token"),
            user: window.localStorage.getItem("UserId"),
          },
        }
      );
      if (request.data.statusCode === 200) {
      }
      if (request.data.statusCode === 400) {
        window.alert(request.data.message);
        navigate("/login");
      }
      if (request.data.statusCode > 400) {
        window.alert(request.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navi />
      <div className="dashboard">
        <div className="card-container">
          {products &&
            products.map((items, index) => {
              return (
                <>
                  <div className="cart" key={index}>
                    <img className="card-img-top" src={items.Image} alt="" />
                    <h4 className="product-name">{items.ProductName}</h4>
                    <div className="rate">
                      <label htmlFor="quantity">Quantity:</label>

                      <select
                        className="quantity-dropdown"
                        onChange={(event) => setQuantity(event.target.value)}
                        value={Quantity}
                      >
                        <option value="1">1</option>
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="7">7</option>
                      </select>

                      <h5 className="product-amount">
                        ₹{" "}
                        {Quantity === 1
                          ? items.Amount * (diffDays ? diffDays : 1)
                          : items.Amount *
                            Quantity *
                            (diffDays ? diffDays : 1)}{" "}
                        /day
                      </h5>
                    </div>

                    <div className="calender">
                      <div className="calender-head">
                        <label htmlFor="quantity">From :</label>
                        <input
                          type="date"
                          onChange={(e) =>
                            setDateFrom({ from: e.target.value })
                          }
                          style={{ outline: "none", cursor: "pointer" }}
                          required
                        />
                      </div>
                      <div className="calender-head">
                        <label htmlFor="quantity">to :</label>
                        <input
                          type="date"
                          onChange={(e) => setDateTo({ to: e.target.value })}
                          style={{ outline: "none", cursor: "pointer" }}
                          required
                        />
                      </div>
                    </div>
                    <h6 className="product-features">{items.Features}</h6>
                    <div className="checkout-btn">
                      <button
                        className="add-to-btn"
                        onClick={() => {
                          let CartValue =
                            window.localStorage.getItem("CartValue");
                          CartValue = parseInt(CartValue);
                          if (CartValue) {
                            window.localStorage.setItem(
                              "CartValue",
                              CartValue - 1
                            );
                            document.querySelector(".cartValue").textContent =
                              CartValue - 1;
                          } else {
                            window.localStorage.setItem("CartValue", 0);
                            document.querySelector(
                              ".cartValue"
                            ).textContent = 0;
                          }
                          handleRemove(index, items._id);
                        }}
                      >
                        Remove
                      </button>
                      <button
                        className="buy-btn"
                        onClick={() => {
                          let Amount = items.Amount * Quantity * diffDays;
                          checkout(items._id, Amount);
                        }}
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
      {products && products.length ? null : (
        <div className="empty-container">
          <button onClick={() => navigate("/Dashboard")} className="Continue">
            Continue shopping
          </button>
        </div>
      )}
    </>
  );
}

export default AddToCart;
