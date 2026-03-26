import { useState } from "react";
import "./App.css";
import TabList from "./02-tab-list";

export default function App2() {
  //   const [activeTab, setActiveTab] = useState("A");

  const tabList = [
    {
      id: "A",
      label: "Tab A",
      component: ComponentA,
    },
    {
      id: "B",
      label: "Tab B",
      component: ComponentB,
    },
    {
      id: "C",
      label: "Tab C",
      component: ComponentC,
    },
    {
      id: "D",
      label: "Tab D",
      component: ComponentD,
    },
  ];
  return (
    <div>
      <TabList tabs={tabList} />
    </div>
  );
}

function ComponentA() {
  return <div>Component A</div>;
}

function ComponentB() {
  return <div>Component B</div>;
}

function ComponentC() {
  return <div>Component C</div>;
}

function ComponentD() {
  return <div>Component D</div>;
}
