//сохраняем инфу при перезагрузке страницы https://react.dev/learn#updating-the-screen
//ипортируем useState
import { useState } from "react";

//основной компонент, в который могу пихать сколько угодно чего угодно, но в одном теге
function go() {
  return (
    <div>
      <Mabutton />
      <Mabutton />
    </div>
  );
}
//компонент-кнопка со счётчиком
function Mabutton() {
  function countNext() {
    setcount(count + 1);
  }
  const [count, setcount] = useState(0);
  return <button onClick={countNext}>Clicked here {count} times</button>;
}
export default go;
