import React, { useEffect, useState } from "react";
import Navi from "./Navi";
import { url } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FileSaver from "file-saver";

function Orders() {
  let navigate = useNavigate();
  let [Orders, setOrders] = useState([]);
  let [Active, setActive] = useState(false);

  useEffect(() => {
    getData();
  }, []);
  let getData = async () => {
    try {
      let request = await axios.get(`${url}/orders`, {
        headers: {
          authorization: window.localStorage.getItem("app-token"),
          user: window.localStorage.getItem("UserId"),
        },
      });
      if (request.data.statusCode === 200) {
        setOrders(request.data.orders);
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

  let DownloadFiles = (url) => {
    FileSaver.saveAs(url, "image.jpg");
  };
  return (
    <>
      <Navi />
      <div className="head">
        <h3 className="summary">My Orders</h3>
        {Orders && Orders.length ? (
          <button
            onClick={() => setActive((previous) => !previous)}
            className="pay-btn"
          >
            Get Payment Details
          </button>
        ) : (
          <button onClick={() => navigate("/Dashboard")} className="pay-btn">
            Continue shopping
          </button>
        )}
      </div>
      {Orders &&
        Orders.map((items, index) => {
          return (
            <div key={index} className="section">
              {items.shippingAddress.map((add) => {
                return (
                  <>
                    <div
                      className={
                        window.localStorage.getItem("UserId") ===
                        "6389f63fb128d4871a0dc445"
                          ? "address-container"
                          : "nor-address"
                      }
                    >
                      <div>
                        <h5>{add.Name}</h5>
                        <p>{add.Address}</p>
                        <p>Ph: {add.Mobile}</p>
                      </div>
                      {window.localStorage.getItem("UserId") ===
                      "6389f63fb128d4871a0dc445" ? (
                        <div className="proof-container">
                          <label style={{ fontSize: "12px" }}>
                            Customer Identity:{" "}
                          </label>

                          <button
                            style={{
                              fontSize: "10px",
                              border: "none",
                              color: "blue",
                              cursor: "pointer",
                            }}
                            onClick={() => DownloadFiles(add.Proof)}
                          >
                            Download
                          </button>
                        </div>
                      ) : null}
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
                        <p>
                          Quantity : <strong>{items.quantity}</strong>
                        </p>
                        <p>{items.from}</p>
                        <p>{items.to}</p>
                      </div>
                    </div>
                    <div className="pay-container">
                      <div className="estimate-details">
                        <h4>&#x20b9; {items.total}.00</h4>

                        <button
                          disabled
                          className={
                            items.paymentStatus === "Success"
                              ? "status-btn"
                              : "failed-btn"
                          }
                        >
                          {items.paymentStatus === "Success"
                            ? items.paymentStatus
                            : "Failed"}
                        </button>
                      </div>
                    </div>
                    {Active ? (
                      <div className="paymentDetails">
                        <img
                          className="Details-img"
                          src={
                            items.paymentStatus === "Success"
                              ? "http://craftizen.org/wp-content/uploads/2019/02/successful_payment_388054.png"
                              : "https://printme.online/wp-content/uploads/2020/04/payment_fail_icon.png"
                          }
                          alt=""
                        />
                        <div className="paymentData">
                          <p>
                            <strong>
                              {items.paymentStatus === "Success"
                                ? items.paymentStatus
                                : "Failed"}
                            </strong>
                          </p>
                          <p>
                            {"PaymentId : "}
                            <strong>
                              {items.paymentId
                                ? items.paymentId
                                : "can not proceed to pay"}
                            </strong>
                          </p>
                          <p>
                            OrderId : <strong>{items._id}</strong>
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </>
                );
              })}
            </div>
          );
        })}
    </>
  );
}

export default Orders;
