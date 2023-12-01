// разбирёмся нахуй или нет
//в этом файле попытки разобраться с элементами и компонентами, созданием текста и логических операторов
function App() {
  //проверяет поле в элементе choose и выдаёт разные результаты при разных значениях
  let result;
  if (choose.show == "user") {
    result = <ShowInfoUser />;
  } else {
    result = <MyButton />;
  }
  return <div>{result}</div>;
}
//компоненты
function MyButton() {
  return <button>My first button</button>;
}
function ShowInfoUser() {
  return (
    <div>
      <p>This is user element</p>
      <p>{user.name}</p>
      <img src={user.imageUrl}></img>
    </div>
  );
}
function SomeHTML() {
  return (
    <div className="awesome" style={{ border: "1px solid red" }}>
      <label htmlFor="name">Enter your name: </label>
      <input type="text" id="name" />
    </div>
  );
}
//элементы
const user = {
  name: "Hedy Lamarr",
  imageUrl: "https://i.imgur.com/yXOvdOSs.jpg",
  imageSize: 90,
};
const choose = {
  show: "button",
};
export default App;
