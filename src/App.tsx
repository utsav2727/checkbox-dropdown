import { useState } from "react";
import "./styles.css";
import { CheckBoxProps, NumberBooleanMap, TreeNode } from "./interfaces/interfaces";

const data: TreeNode[] = [
  {
    id: 1,
    name: "Fruits",
    childrens: [
      {
        id: 2,
        name: "Apple",
        childrens: [
          { id: 3, name: "Red", childrens: [] },
          { id: 4, name: "Green", childrens: [] },
          { id: 5, name: "Yellow", childrens: [] },
        ],
      },
      {
        id: 6,
        name: "Bananas",
        childrens: [
          { id: 7, name: "Yellow", childrens: [] },
          { id: 8, name: "Green", childrens: [] },
        ],
      },
    ],
  },
  {
    id: 9,
    name: "Vegetables",
    childrens: [
      {
        id: 10,
        name: "Potatos",
        childrens: [
          { id: 11, name: "Red", childrens: [] },
          { id: 12, name: "Green", childrens: [] },
          { id: 13, name: "Yellow", childrens: [] },
        ],
      },
      {
        id: 14,
        name: "Brocoli",
        childrens: [
          { id: 15, name: "Yellow", childrens: [] },
          { id: 16, name: "Green", childrens: [] },
        ],
      },
    ],
  },
];

const CheckBoxs = ({ data, counter = -1, checked, setChecked, fullData }: CheckBoxProps) => {
  counter = counter + 1;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, node: TreeNode, fullData: TreeNode[]) => {
    setChecked((prev) => {
      let updated = { ...prev, [node.id]: e.target.checked };

      //update all the below childrens if childrens exits.
      let updateChildrens = (node: TreeNode) => {
        if (node.childrens && node.childrens.length > 0) {
          node.childrens.forEach((child) => {
            updated = { ...updated, [child.id]: e.target.checked };
            updateChildrens(child);
          });
        }
      };

      updateChildrens(node);

      const traverseTree = (nodes: TreeNode[]) => {
        for (let node of nodes) {
          traverseTree(node.childrens);
          //after traverse all the children
          checkNodeChild(node);
        }
      };

      const checkNodeChild = (node: TreeNode) => {
        console.log("node", node);
        if (node.childrens.length > 0) {
          let isChecked = true;
          for (let child of node.childrens) {
            isChecked = isChecked && updated[child.id];
          }
          if (isChecked == true) {
            updated = { ...updated, [node.id]: true };
          } else {
            updated = { ...updated, [node.id]: false };
          }
        }
      };

      traverseTree(fullData);
      return updated;
    });
  };

  console.log("checked ", checked);

  return (
    <div className={counter === 0 ? "" : "parent"}>
      {data.map((item) => (
        <div key={item.id}>
          <input
            type="checkbox"
            checked={checked[item.id] || false}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, item, fullData)}
          />
          <span>{item.name}</span>
          {item.childrens && (
            <CheckBoxs
              data={item.childrens}
              counter={counter}
              checked={checked}
              setChecked={setChecked}
              fullData={fullData}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [checked, setChecked] = useState<NumberBooleanMap>({});

  return (
    <div className="App">
      <h1>Hello Utsav </h1>
      <CheckBoxs
        data={data}
        checked={checked}
        setChecked={setChecked}
        fullData={data}
      />
    </div>
  );
}
