import React, { useState } from "react";

const List = ({ orders, loading }) => {
  return (
    <article>
      {orders.map((item, index) => {
        const { id, orderNumber, title, image, description, submitted } = item;

        return (
          <>
            {submitted && (
              <div style={{ display: "inline-block" }}>
                <ul className="list" key={id}>
                  <div className="img-container">
                    <li className="order">
                      <center>
                        {`Order # ${orderNumber}`}
                        <div className="title-container">
                          <h2 className="order-title">{title}</h2>
                        </div>
                        <img src={image} alt={title} />
                        <div className="container">
                          <div className="wordWrap">
                            <p>{description}</p>
                          </div>
                        </div>
                      </center>
                    </li>
                  </div>
                </ul>
              </div>
            )}
          </>
        );
      })}
    </article>
  );
};

export default List;
