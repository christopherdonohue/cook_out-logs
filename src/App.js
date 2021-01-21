import React, { useState } from "react";
import List from "./List";
import Form from "./Form";
require("dotenv").config();

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/posts">Posts</a>
          </li>
        </ul>
      </nav>
      <Form />
    </>
  );
}

export default App;
