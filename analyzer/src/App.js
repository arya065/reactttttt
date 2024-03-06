import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import db from './db.json';
function App() {
  const PRECIOS = [415000, 1850000, 335000, 675000, 370000, 680000, 299000, 2599000, 520000, 1980000, 147000, 219900, 136000, 138000, 400000, 244000, 335000, 735000, 180000, 380000, 260000, 700000, 299200, 149000, 370000, 320000, 950000, 380000, 367000, 430000, 293000, 545000, 641000, 477225, 95000, 1395000, 158000, 165000, 296900, 1990000, 222500, 448000, 680000, 2250000, 369000, 375000, 429000, 1690000, 159000, 222500, 850000, 2750000, 400000, 780000, 400000, 370000, 680000, 735000, 335000, 299000, 1375000]
  let tmp = [];
  db.map((e, i) => {
    e.precio = PRECIOS[i];
    tmp.push(e)
  })

  let cnstAno = 0;
  let cnstBanos = 0;
  let cnstEstado = 0;
  let cnstHab = 0;
  let cnstMetros = 0;

  tmp.map((e, i) => {
    cnstAno += e.ano;
    cnstBanos += parseInt(e.precio/e.banos);
    cnstEstado += parseInt(e.precio/e.estado);
    cnstHab += parseInt(e.precio/e.habitaciones);
    cnstMetros += parseInt(e.precio/e.metros);
  })

  console.log(cnstMetros/tmp.length);
  return (
    <div  >
      test
    </div>
  );
}

export default App;
