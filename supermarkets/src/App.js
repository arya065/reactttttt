import React, { Component, useState, useEffect } from "react";
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
// https://reactstrap.github.io/?path=/docs/components-popover--update

function ShopInfo(props) {
  return (
    <li>
      index:{props.i}
      <br />
      pobalacion:{props.value[1]}
    </li>
  )
}

function ShopsInfo(props) {
  const showShops = () => {
    if (Object.keys(props.shops).length >= 1) {
      return (
        <div>
          <p>Lista tiendas</p>
          <ul>
            {
              Object.keys(props.shops).map((i) => (
                <ShopInfo i={i} value={props.shops[i]} />
              ))
            }
          </ul>
        </div>
      )
    } else {
      return (
        <p>No hay tiendas</p>
      )
    }
  }
  return (
    <div>
      {showShops()}
    </div>
  )
}

function Cell(props) {
  const [status, setStatus] = useState(false);
  const makeBackground = () => {
    if (props.color[0] instanceof Array) {
      let res = "linear-gradient(45deg,";
      props.color.map((e) => {
        res += "hsl(" + e[0][0] + "," + parseInt(e[0][1] - 30) + "%," + parseInt(e[0][2] + 20) + "%" + "),";
      });
      res = res.slice(0, res.length - 1);
      res += ")";
      return res;
    } else {
      return "hsl(" + props.color[0] + "," + props.color[1] + "%," + props.color[2] + "%" + ")";
    }
  };
  //usememo чтобы не обновлять лишний раз

  const handleClick = () => {
    setStatus(!status);
  }

  return (
    <span
    // onMouseEnter={() => setStatus(true)} 
    // onMouseLeave={() => setStatus(false)}
    >
      <Button
        id={"btn" + props.i}
        type="button"
        style={{ width: "60px", margin: "3px", background: makeBackground() }}
        onClick={() => handleClick()}
      >
        <span style={{ mixBlendMode: "difference" }}>{/* reverse of color of text*/}
          {props.value}
        </span>
      </Button>
      <Popover isOpen={status} target={"btn" + props.i} trigger="legacy">
        <PopoverHeader>Quieres poner mercado aqui?</PopoverHeader>
        <PopoverBody>
          <div>Poblacion:{props.value}</div>
          <div>Index de zona:{props.value}</div>
          <Button onClick={() => { props.addShop(props.i); setStatus(false) }}>
            Si
          </Button>
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
    // console.log(this.state.shops);
  }

  createCells() {//parse cells
    //cells->[i]:[color,value,closest,isShop]
    //closest-> index,color,dist
    let cells;
    this.state.poblacion.map((e, i) => {
      cells = { ...cells, [i]: [[0, 0, 85], e, [], false] }
    });
    this.setState({ cells: { ...cells } });
  }

  updateCells() {
    let tmp = this.state.cells;

    Object.keys(this.state.cells).map((i) => {
      let shortest = this.getShortest(i);
      let population = this.getPopulationCells(i);
      let color = [];
      let shops = this.state.shops;
      if (shortest != undefined) {//only for cells without shop
        tmp[i][2] = shortest;
        if (shortest[1].length > 1) {//for several closest
          shortest[1].map(e => {
            this.setPopulationShops(e, population / shortest.length);//divide population between several shops
            color.push([this.getColorShops(e)]);
            tmp[i][0] = color;
          });
        } else {//for one closest
          this.setPopulationShops(shortest[1][0], population);
          color = this.getColorShops(shortest[1][0]);
          tmp[i][0] = [color[0], color[1] - 30, color[2] + 30]
        }
      } else {//for shops only
        this.setPopulationShops(i, population);
      }
    });

    this.setState({ cells: tmp });
  }

  addShop(i) {//add to shops list
    //shop->[i]:[color,underControl]
    let color = this.makeRandomColor();
    this.setState({ shops: { ...this.state.shops, [i]: [color, 0] } }, () => {
      //set to 0 population all shops
      Object.keys(this.state.shops).map((i) => {
        this.setPopulationShops(i)
      })
      //chng isShop to true
      let tmp = this.state.cells;
      tmp[i][3] = true;
      tmp[i][2] = [];
      this.setState({ cells: tmp }, () => {
        this.updateCells()
      });
    });
  }

  checkInShops(i) {//check if exist in shops list
    return this.state.shops[i] == undefined ? false : true;
  }

  getColorCells(i) {
    if (this.state.cells[i] != undefined) {
      return this.state.cells[i];
    }
    return [[0, 0, 85], -1];
  }
  getPopulationCells(i) {
    if (this.state.cells[i] != undefined) {
      return this.state.cells[i][1];
    }
    return 0;
  }
  getColorShops(i) {
    if (this.state.shops[i] != undefined) {
      return this.state.shops[i][0];
    }
    return [[0, 0, 85]];
  }
  setPopulationShops(i, value = -1) {
    if (this.state.shops[i] != undefined) {
      let tmp = this.state.shops;
      if (value == -1) {
        tmp[i][1] = 0;
        this.setState({ shops: tmp })
      } else {
        tmp[i][1] += value;
        this.setState({ shops: tmp })
      }
    }
  }

  mixColorsHSL(color1, color2, saturation = 50, brightness = 60) {
    let h = parseInt(Math.floor((color1[0] + color2[0]) / 2));
    let s = parseInt(Math.floor((color1[1] + color2[1]) / 2));
    let l = parseInt(Math.floor((color1[2] + color2[2]) / 2));
    if (s < saturation) {
      s = saturation;
    }
    if (l > brightness) {
      l = brightness;
    }
    return [h, s, l];
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

  shopCell(e, i) {//render shop cell or normal cell
    const isShop = this.checkInShops(i);
    let color;
    if (isShop) {
      color = this.getColorShops(i);
    } else {
      color = this.getColorCells(i)[0];
    }
    return (
      <Cell addShop={(i) => this.addShop(i)} updateCells={() => this.updateCells()} color={color} value={e} i={i} />
    )
  }


  getShortest(i) {
    if (Object.keys(this.state.shops).length !== 0 && !this.state.cells[i][3]) {
      let closest = [Infinity, -1];
      Object.keys(this.state.shops).map((ind) => {
        let dist = this.getDistance(i, ind);
        if (dist[0] < closest[0]) {
          closest = [dist[0], [ind]];
        } else if (dist[0] == closest[0]) {
          closest[1].push(ind);
        }
      });

      return closest;
    }
    return undefined;
  }

  getDistance(i, ind) {//distance between 2 cells
    let coord1 = [Math.floor(i / 9), (i % 9)];
    let coord2 = [Math.floor(ind / 9), (ind % 9)];
    return [Math.abs(coord1[0] - coord2[0]) + Math.abs(coord1[1] - coord2[1]), ind];
  }

  render() {
    console.log("rerender");
    return (
      <div>
        {
          Object.keys(this.state.cells).map((i) => (
            <>
              {i % 9 == 0 ? <br /> : null}
              {this.shopCell(this.state.cells[i][1], i)}
            </>
          ))
        }
        <ShopsInfo shops={this.state.shops} />
      </div>
    )
  }
}

export default App;