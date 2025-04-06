export interface TreeNode {
    id: number,
    name: string,
    childrens: TreeNode[]
}

export interface NumberBooleanMap {
    [key: number]: boolean
}

export interface CheckBoxProps {
    data: TreeNode[],
    counter?: number,
    checked: NumberBooleanMap,
    setChecked: React.Dispatch<React.SetStateAction<NumberBooleanMap>>,
    fullData: TreeNode[]
}