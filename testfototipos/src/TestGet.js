import React, { useEffect, useState } from "react";
import axios from "axios";

function TestGet() {
  const [data, setData] = useState([]);

  const selectMethod = (url) => {
    apiGet(url);
  }
  const getAll = () => {
    console.log(data);
    return (
      <ul>
        {data.map(e => (
          <li>
            id:<span>{e.result.id}</span>
            -
            puntos:<span>{e.result.points}</span>
          </li>
        ))}
      </ul>
    );
  }
  const getWithId = () => {
    return (
      <ul>
        <li>
          id:<span>{data.result.id}</span>
          -
          puntos:<span>{data.result.points}</span>
        </li>
      </ul>
    );
  }
  const getList = () => {
    if (data.length != undefined) {
      return getAll();
    } else {
      return getWithId();
    }
  }

  const apiGet = (url) => {
    axios
      .get("http://localhost/Proyectos/API/apiTestfototipos" + url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("ERRORRRRRRR", error);
      });
  };

  return (
    <div>
      <button onClick={() => selectMethod("/take/all")}>Get all</button>
      <button onClick={() => selectMethod("/take/1")}>Get with id</button>
      <button onClick={() => selectMethod("/add/100/100")}>Put in database</button>
      <h1>Resultado</h1>
      {getList()}
    </div>
  );
}
//add to php
// header('Access-Control-Allow-Origin: *');
export default TestGet;