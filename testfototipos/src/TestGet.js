import React, { useEffect, useState } from "react";
import axios from "axios";

function TestGet() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/Proyectos/API/Teor_Servicios_Web/primera_api/saludo")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("ERRORRRRRRR", error);
      });
  }, []);

  return (
    <div>
      <h1>LISTA:</h1>
      <ul>
        {data.mensaje}
      </ul>
    </div>
  );
}
//add to php
// header('Access-Control-Allow-Origin: *');
export default TestGet;