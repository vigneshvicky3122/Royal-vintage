import React, { useEffect, useState } from "react";
import Navi from "./Navi";
import { url } from "../App";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Payment() {
  let params = useParams();
  let navigate = useNavigate();
  let [products, setProducts] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  let getData = async () => {
    try {
      let request = await axios.get(`${`${url}/buyProduct/${params.id}`}`, {
        headers: {
          authorization: window.localStorage.getItem("app-token"),
          user: window.localStorage.getItem("UserId"),
        },
      });
      if (request.data.statusCode === 200) {
        setProducts(request.data.products);
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
  let handleRemove = async (id) => {
    try {
      let request = await axios.put(
        `${url}/removeCart`,
        { data: id },
        {
          headers: {
            authorization: window.localStorage.getItem("app-token"),
            user: window.localStorage.getItem("UserId"),
          },
        }
      );
      if (request.data.statusCode === 200) {
        navigate("/Dashboard");
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

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_nH5ck4L7VwKa6x",
      amount: data.data.amount,
      currency: data.data.currency,
      name: "Royal Vintages",
      description: "Test Transaction",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx5DW7GDnJACNOi5TC7KzxsqWk-U4-xTdkaA&usqp=CAU",
      order_id: data.data.id,
      handler: async (response) => {
        try {
          let request = await axios.post(
            `${url}/verify/${params.id}`,
            {
              response,
            },
            {
              headers: {
                authorization: window.localStorage.getItem("app-token"),
                user: window.localStorage.getItem("UserId"),
              },
            }
          );
          if (request.status === 200) {
            handleRemove(params.id);
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async (amount) => {
    try {
      let request = await axios.post(
        `${url}/order`,
        { amount: amount },
        {
          headers: {
            authorization: window.localStorage.getItem("app-token"),
            user: window.localStorage.getItem("UserId"),
          },
        }
      );
      initPayment(request.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navi />
      <div className="Order-summary">Order Summary</div>
      {products &&
        products.map((items, index) => {
          return (
            <div key={index} className="section">
              {items.shippingAddress.map((add) => {
                return (
                  <>
                    <div className="address-container">
                      <div>
                        <h5>{add.Name}</h5>
                        <p>{add.Address}</p>
                        <p>Ph: {add.Mobile}</p>
                      </div>
                    </div>
                  </>
                );
              })}
              {items.product.map((product) => {
                return (
                  <>
                    <div className="product-container">
                      <img src={product.Image} alt="" className="buy-img" />
                      <div className="product2">
                        <h4>{product.ProductName}</h4>
                        <h5>&#x20b9; {product.Amount} /day</h5>
                        <p>{product.Features}</p>
                        <p>
                          Quantity : <strong>{items.quantity}</strong>
                        </p>
                        <p>From: {items.from}</p>
                        <p>To: {items.to}</p>
                      </div>
                    </div>
                    <div className="pay-container">
                      <div className="estimate-details">
                        <h4>&#x20b9; {items.total}.00</h4>

                        <button
                          className="payment-btn"
                          onClick={() => handlePayment(items.total)}
                        >
                          Pay
                        </button>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          );
        })}
    </>
  );
}

export default Payment;
