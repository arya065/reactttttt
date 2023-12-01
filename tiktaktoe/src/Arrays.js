//пробуем массивы
function Arrays() {
  //перебираем массив и создаём новый с элементами li, у которых будет атрибут key и значение
  //после чего добавляем этот список в ul
  let list = arr.map((e) => <li key={e.atr2}>{e.atr1}</li>);
  return (
    <div>
      <ul>{list}</ul>
    </div>
  );
}
//ini array
const arr = [
  { atr1: "lmao", atr2: 1 },
  { atr1: "lol", atr2: 2 },
  { atr1: "XD", atr2: 3 },
];
export default Arrays;
