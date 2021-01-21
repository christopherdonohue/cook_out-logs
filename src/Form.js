import React, { useState, useEffect, Component } from "react";
import List from "./List";
import axios from "axios";

const orders = [
  {
    id: "",
    orderNumber: "",
    title: "",
    image: "",
    submitted: false,
    description: "",
  },
];

const Form = () => {
  const [order, setOrder] = useState(orders);
  const [order2, setOrder2] = useState(orders);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setOrder({
      ...order,
      submitted: true,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/orders/create", order)
      .then((res) => {
        console.log(res.data);
        setSubmitted(true);
      })
      .catch((error) => {
        console.log(error);
      });
    [e.target.name] = "";
  };

  const getOrders = () => {
    axios
      .get("http://localhost:8080/orders")
      .then((res) => {
        setOrder2(res.data);
        //orders.push({ order: res.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getOrders();
    if (submitted) {
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }
  }, [order2]);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "cookoutlogs");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dzr5otslt/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setOrder({
      ...order,
      image: file.secure_url,
    });
    setLoading(false);
  };

  return (
    <>
      <div className="container">
        <form className="contact" onSubmit={handleSubmit}>
          <h3>Cook Out Logs Form</h3>
          <h4>Post Thy Dankness</h4>
          {submitted && <h4 className="alert">Submission Successful!</h4>}
          <fieldset>
            <input
              required
              placeholder="Order Number"
              name="orderNumber"
              type="text"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset>
            <input
              required
              placeholder="Title"
              name="title"
              type="text"
              onChange={handleChange}
            />
          </fieldset>
          <fieldset>
            <input required name="file" type="file" onChange={uploadImage} />
          </fieldset>
          <fieldset>
            <textarea
              required
              placeholder="Description..."
              name="description"
              onChange={handleChange}
            />
          </fieldset>

          {!loading ? (
            <button type="submit">Submit</button>
          ) : (
            <button className="loading-button" disabled>
              Loading...
            </button>
          )}
        </form>
      </div>
      {<List orders={order2} loading={loading} />}
    </>
  );
};
export default Form;
