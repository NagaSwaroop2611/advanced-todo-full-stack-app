import React from "react";
import {Toaster} from "react-hot-toast";
import MainLayout from "./Components/MainLayout";
import TaskMain from "./Components/TaskMain"

const App = () => {
  return <div>
    <MainLayout>
      <TaskMain/>
    </MainLayout>
    <Toaster/>
  </div>;
};

export default App;
