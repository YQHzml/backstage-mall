import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Anime from "./components/anime";
function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Anime />
    </DndProvider>
  );
}

export default App;
