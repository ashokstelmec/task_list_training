import Header from "./components/Header";
import Content from "./components/Content";
import AppProvider from "./context";
import "./App.css";

const App = () => {
  return (
    <AppProvider>
      <div className="App">
        <Header />
        <Content />
      </div>
    </AppProvider>
  );
};

export default App;