import React from "react";
import {Toaster} from "react-hot-toast";
import MainLayout from "./Components/MainLayout";
import TaskMain from "./Components/TaskMain"

const App = () => {
  return (
    <>
      <MainLayout>
        <TaskMain />
      </MainLayout>
      <Toaster />
    </>
  );
};


export default App;
