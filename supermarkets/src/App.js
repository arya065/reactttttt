import React, { Component, useState, useEffect } from "react";
import { List, Button, Progress, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
// https://reactstrap.github.io/?path=/docs/components-popover--update

// function Cell(props) {
//   const [status, setStatus] = useState(false);
//   // const [color, setColor] = useState("hsl(" + 0 + "," + 0 + "%," + 70 + "%" + ")");
//   const [added, setAdded] = useState(false);
//   const [distMap, setDistMap] = useState([]);
//   const [textColor, setTextColor] = useState("white");
//   const handleClick = () => {
//     setStatus(!status);
//   }
//   const [h, s, l] = props.color ?? [0, 0, 0];
//   const color = "hsl(" + h + "," + s + "%," + l + "%" + ")";
//   // const printShop = () => {
//   //   let current = props.shops.find((e) => e[0] == props.i);
//   //   console.log("cur", current);
//   //   if (current) {
//   //     setColor("hsl(" + current[1][0] + "," + current[1][1] + "%," + current[1][2] + "%" + ")");
//   //   }
//   // }

//   const printAll = () => {
//     if (distMap.length != 0 && distMap[0].length != 0) {
//       let minDist = Math.min(...distMap.map(e => { return e[0] }));
//       let closest = distMap.filter(e => e[0] == minDist);//array of closest shop with distance and id
//       let colors = [];
//       closest.map((e) => {
//         props.shops.filter(el => { if (el[0] == e[1]) { colors = el[1] } });//заменить на colors.push() для микса цветов
//       });
//       // if (closest[0][0] != 0) {
//       // setColor("hsl(" + colors[0] + "," + parseInt(colors[1] - 30) + "%," + parseInt(colors[2] + 30) + "%" + ")");
//       // }
//       if ((colors[0] > 50 && colors[0] < 160) || (color[2] > 80)) {
//         setTextColor("black");
//       } else {
//         setTextColor("white");
//       }
//       console.log("printAll");
//       // console.log("colors:", colors);
//       // console.log("all shops:", props.shops);
//       // console.log("closest:", closest);
//     }
//   }

//   const randInt = (multi) => {
//     return Math.floor(Math.random() * multi);
//   }

//   //добавить шаг со смещением
//   //таблица цветов
//   //алг для hue, остальное в рандом
//   //таблица с hue, но перемешанный
//   const makeRandomColor = () => {
//     return [randInt(360), 100, randInt(20) + 40];
//   }

//   const getDistance = (coord2, i) => {
//     let coord1 = [Math.floor(props.i / 9), (props.i % 9)];
//     return [Math.abs(coord1[0] - coord2[0]) + Math.abs(coord1[1] - coord2[1]), i];
//   }

//   // useEffect(() => {
//   //   console.log("added");
//   //   printShop();
//   // }, [added, setAdded]);

//   // useEffect(() => {
//   //   props.shops.map((e) => {
//   //     setDistMap([...distMap, getDistance([Math.floor(e[0] / 9), (e[0] % 9)], e[0])]);
//   //   });
//   // }, [props.addShop]);

//   // useEffect(() => {
//   //   printAll();
//   // }, [distMap, setDistMap]);

//   return (
//     <span
//     // onMouseEnter={() => setStatus(true)} 
//     // onMouseLeave={() => setStatus(false)}
//     >
//       <Button id={"btn" + props.i} type="button" style={{ width: "60px", margin: "3px", background: color }} onClick={() => handleClick()}>
//         <span style={{ mixBlendMode: "difference" }}>{/* реверс цвета */}
//           {props.e}
//         </span>
//       </Button>
//       <Popover isOpen={status} target={"btn" + props.i} trigger="legacy">
//         <PopoverHeader>Quieres poner mercado aqui?</PopoverHeader>
//         <PopoverBody>
//           <div>Poblacion:{props.e}</div>
//           <div>Index de zona:{props.e}</div>
//           <Button onClick={() => { props.addShop(props.i, makeRandomColor()); setStatus(false); setAdded(true) }}>Si</Button>
//         </PopoverBody>
//       </Popover>
//     </span>
//   )
// }

function Cell(props) {
  const [status, setStatus] = useState(false);
  const handleClick = () => {
    setStatus(!status);
  }
  return (
    <span
    // onMouseEnter={() => setStatus(true)} 
    // onMouseLeave={() => setStatus(false)}
    >
      <Button id={"btn" + props.i} type="button"
        style={{ width: "60px", margin: "3px", background: "hsl(" + props.color[0] + "," + props.color[1] + "%," + props.color[2] + "%" + ")" }}
        onClick={() => handleClick()}
      >
        <span style={{ mixBlendMode: "difference" }}>{/* реверс цвета */}
          {props.value}
        </span>
      </Button>
      <Popover isOpen={status} target={"btn" + props.i} trigger="legacy">
        <PopoverHeader>Quieres poner mercado aqui?</PopoverHeader>
        <PopoverBody>
          <div>Poblacion:{props.value}</div>
          <div>Index de zona:{props.value}</div>
          <Button onClick={() => { props.addShop(props.i); setStatus(false) }}>Si</Button>
        </PopoverBody>
      </Popover>
    </span>
  )
}
class App extends Component {
  constructor(props) {
    super(props);
    this.addShop = this.addShop.bind(this);
    this.createCells = this.createCells.bind(this);
    this.state = {
      poblacion: [0, 5, 4, 2, 9, 8, 0, 8, 8, 1, 7, 21, 23, 44, 5, 3, 4, 0, 2, 6, 32, 22, 33, 8, 4, 2, 8, 1, 2, 43, 4, 56, 65, 34, 11, 8, 2, 22, 32, 3, 42, 62, 43, 21, 0, 2, 2, 23, 34, 64, 24, 42, 15, 7, 0, 2, 36, 43, 61, 26, 64, 12, 0, 1, 2, 15, 43, 34, 2, 12, 2, 3, 1, 0, 12, 3, 0, 0, 21, 2, 2],
      shops: {},
      cells: {}
    };
  }
  componentDidMount() {
    this.createCells();
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  createCells() {
    //cells->[i]:[color,value,closest,isShop]
    // closest-> index,color,dist
    let cells;
    this.state.poblacion.map((e, i) => {
      cells = { ...cells, [i]: [[0, 0, 70], e, [], false] }
    });
    this.setState({ cells: { ...cells } });
  }

  addShop(i) {
    //shop->[i]:[color,underControl]
    let color = this.makeRandomColor();
    this.setState({ shops: { ...this.state.shops, [i]: color } });
  }

  checkInShops(i) {
    return this.state.shops[i] == undefined ? false : true;
  }

  getValuesCells(i) {
    if (this.state.cells[i] != undefined) {
      return this.state.cells[i];
    }
    return [[0, 0, 70], -1];
  }
  getValuesShops(i) {
    if (this.state.shops[i] != undefined) {
      return this.state.shops[i];
    }
    return [[0, 0, 70]];
  }
  mixColorsRGB(color1, color2, saturation = 0, brightness = 50) {
    let h = parseInt(Math.floor((color1[0] + color2[0]) / 2));
    let s = parseInt(Math.floor((color1[1] + color2[1]) / 2));
    let l = parseInt(Math.floor((color1[2] + color2[2]) / 2));
    if (s < saturation) {
      s = saturation;
    }
    if (l > brightness) {
      l = brightness;
    }
    return ("hsl(" + h + "," + s + "%," + l + "%" + ")");
  }

  randInt(multi) {
    return Math.floor(Math.random() * multi);
  }

  //добавить шаг со смещением
  //таблица цветов
  //алг для hue, остальное в рандом
  //таблица с hue, но перемешанный
  makeRandomColor() {
    return [this.randInt(360), 100, this.randInt(20) + 40];
  }

  shopCell(e, i) {
    const isShop = this.checkInShops(i);
    if (isShop) {
      return (
        <Cell addShop={(i) => this.addShop(i)} color={this.getValuesShops(i)} value={"shop"} i={i}></Cell>
      )
    } else {
      return (
        <Cell addShop={(i) => this.addShop(i)} color={this.getValuesCells(i)[0]} value={e} i={i}></Cell>
      )
    }
  }
  render() {
    console.log("rerender");
    return (
      <div>
        <Button onClick={() => this.addShop(1)}>add shop1</Button>
        <Button onClick={() => this.addShop(8)}>add shop8</Button>
        {/* <Button onClick={() => console.log(this.checkInShops(5))}>show if in shops</Button> */}

        {
          Object.keys(this.state.cells).map((i) => (
            <>
              {i % 9 == 0 ? <br /> : null}
              {this.shopCell(this.state.cells[i][1], i)}
            </>
          ))
        }
      </div>
    )
  }
}

export default App;