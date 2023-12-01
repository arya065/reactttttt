//трогаем ивенты https://react.dev/learn#responding-to-events
function Events() {
  function press() {
    alert("he touched me!");
  }
  return <button onClick={press}>Click here!</button>;
}
export default Events;
