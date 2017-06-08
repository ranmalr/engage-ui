export interface ITreeViewData {
    id: number,
    display: string,
    expanded: boolean,
    children?: ITreeViewData[],
    icon: string,
}
