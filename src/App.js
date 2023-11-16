//
import "./index.css";

function Logo() {
  return <h1>far away</h1>;
}
function Form() {
  return (
    <div className="add-form">
      <h3>what do u need for your trip?</h3>
    </div>
  );
}
function PackingList() {
  return <div className="list">PackingList</div>;
}
function Stats() {
  return (
    <footer className="stats">
      <p>Stats</p>
    </footer>
  );
}

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

export default App;
