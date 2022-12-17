import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navi from "./Navi";
import { url } from "../App";
import axios from "axios";

function Dashboard() {
  let navigate = useNavigate();
  let [products, setProducts] = useState([]);
  let [CartValue, setCartValue] = useState([]);
  window.localStorage.setItem(
    "CartValue",
    CartValue && CartValue ? CartValue.length : 0
  );
  useEffect(() => {
    getData();
  }, []);

  let getData = async () => {
    try {
      let request = await axios.get(`${`${url}/Dashboard`}`, {
        headers: {
          authorization: window.localStorage.getItem("app-token"),
          user: window.localStorage.getItem("UserId"),
        },
      });
      if (request.data.statusCode === 200) {
        setProducts(request.data.products);
        setCartValue(request.data.user[0].MyCart);
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
  let DeleteProduct = async (id, index) => {
    let update = [...products];
    update.splice(index, 1);
    setProducts(update);
    try {
      let request = await axios.delete(`${`${url}/deleteProduct/${id}`}`, {
        headers: {
          authorization: window.localStorage.getItem("app-token"),
          user: window.localStorage.getItem("UserId"),
        },
      });
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
  let handleSubmit = async (data) => {
    try {
      let request = await axios.put(
        `${url}/addToCart`,
        { data: data },
        {
          headers: {
            authorization: window.localStorage.getItem("app-token"),
            user: window.localStorage.getItem("UserId"),
          },
        }
      );
      if (request.data.statusCode === 200) {
        window.alert(request.data.message);
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
        <header className="header">
          <h1 className="header1">Dear Customers</h1>
          <h3 className="heading2">Welcome to all!</h3>
        </header>

        <div className="card-container">
          {products &&
            products.map((items, index) => {
              return (
                <>
                  <div className="cart" key={index}>
                    <img className="card-img-top" src={items.Image} alt="" />
                    <h4 className="product-name">{items.ProductName}</h4>
                    <h5 className="product-amount">₹ {items.Amount} /day</h5>
                    <h6 className="product-features">{items.Features}</h6>
                    <div className="buttons">
                      <button
                        className="add-to-btn"
                        onClick={() => {
                          let CartValue =
                            window.localStorage.getItem("CartValue");

                          CartValue = parseInt(CartValue);
                          if (CartValue) {
                            window.localStorage.setItem(
                              "CartValue",
                              CartValue + 1
                            );
                            document.querySelector(".cartValue").textContent =
                              CartValue + 1;
                          } else {
                            window.localStorage.setItem("CartValue", 1);
                            document.querySelector(
                              ".cartValue"
                            ).textContent = 1;
                          }
                          handleSubmit(items._id);
                        }}
                      >
                        Add to Cart
                      </button>
                      {window.localStorage.getItem("UserId") ===
                      "6389f63fb128d4871a0dc445" ? (
                        <>
                          {" "}
                          <button
                            className="edit-btn"
                            onClick={() => {
                              navigate(`/edit-product/${items._id}`);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => {
                              let result = window.confirm("Confirm to Delete?");
                              if (result === true) {
                                return DeleteProduct(items._id, index);
                              } else {
                                return;
                              }
                            }}
                          >
                            Delete
                          </button>
                        </>
                      ) : null}
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
      <footer className="footer">
        Copyright &copy; Royal Vintages 2022
        <br />
        contact:@Admin123@gmail.com,<br />
        6238550209
      </footer>
    </>
  );
}

export default Dashboard;
