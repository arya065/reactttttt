//сохраняем инфу при перезагрузке страницы https://react.dev/learn#updating-the-screen
//ипортируем useState
import { useState } from "react";


//кнопки делятся данными о нажатии
//вернее кнопки передают информацию в GO, а затем синхронизируются
function Go() {
  const [count, setcount] = useState(0);

  function countNext() {
    setcount(count + 1);
  }
  return (
    <div>
      <Mabutton count={count} countNext={countNext} />
      <Mabutton count={count} countNext={countNext} />
    </div>
  );
}
//компонент-кнопка со счётчиком
function Mabutton({ count, countNext }) {
  return <button onClick={countNext}>Clicked here {count} times</button>;
}
export default Go;
