import * as React from 'react';
import { ITreeViewData } from './ITreeViewData';

export enum TreeNodeState {
    Toggle,
    Expand,
    Collapse,
}
export interface State {
    viewData: ITreeViewData[],
    viewSelected: number[],
}
export interface Props {
    data: ITreeViewData[],
    collapseAll?: boolean,
    expandAll?: boolean,
    selectedId: number[],
    onSelect?(node: ITreeViewData): void,
}

class TreeView extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            viewData: this.props.data,
            viewSelected: this.props.selectedId,
        };
    }
    render() {
        const {
            collapseAll = false,
            expandAll = false,
            onSelect = this.handleNodeClick,
        } = this.props;
        let collapseEle = null;
        if (collapseAll) {
            collapseEle = <li><a onClick={this.handleCollapse}>Collapse All</a></li>;
        }
        let expandedEle = null;
        if (expandAll) {
            expandedEle = <li><a onClick={this.handleExpand}>Expand All</a></li>;
        }
        function createNode(data: ITreeViewData, viewSelected: number[]): any {
            let className = '';
            if (data.expanded) {
                className += 'expanded';
            }
            if (data.icon) {
                className += ' icon';
            }
            if (viewSelected.some((x: number) => x === data.id)) {
                className += ' selected';
            }
            const childData = data.children as ITreeViewData[];
            let childrenNode = null;
            childrenNode = childData.map(function(i) {
                return (<ul key={i.id}>{createNode(i, viewSelected)}</ul>);
            });
            const nodeHtml = <li key={data.id} id={data.id.toString()} className={className}><a id={data.id.toString()} onClick={onSelect.bind(this, data)}>{data.display}</a>{childrenNode}</li>;
            return nodeHtml;
        }
        const selectedNode = this.state.viewSelected;
        const liNode = this.state.viewData.map(function(i) {
            return (createNode(i, selectedNode));
        });
        return (
            <div>
                <div>
                    <ul>
                        {collapseEle}
                        {expandedEle}
                        <li><a onClick={this.handleToggle}>Toggle All</a></li>
                    </ul>
                </div>
                <div>
                    <ul>
                        {liNode}
                    </ul>
                </div>
            </div>
        );
    }
    private handleNodeClick = (node: ITreeViewData): void => {
        const selectedNode = this.state.viewSelected;
        if (selectedNode.some((x) => x === node.id)) {
            const index = selectedNode.indexOf(node.id, 0);
            if (index > -1) {
                selectedNode.splice(index, 1);
            }
            this.setState({ ['viewSelected']: selectedNode });
        } else {
            selectedNode.push(node.id);
            this.setState({ ['viewSelected']: selectedNode });
        }
        const treeData = this.state.viewData;
        treeData.map(function(i) {
            findNode(i, node);
        });
        this.setState({ ['viewData']: treeData });
        return;
    }
    private handleCollapse = () => {
        const treeData = this.state.viewData;
        treeData.map(function(i) {
            changeNode(i, TreeNodeState.Collapse);
        });
        this.setState({ ['viewData']: treeData });
        return;
    }
    private handleExpand = () => {
        const treeData = this.state.viewData;
        treeData.map(function(i) {
            changeNode(i, TreeNodeState.Expand);
        });
        this.setState({ ['viewData']: treeData });
        return;
    }
    private handleToggle = () => {
        const treeData = this.state.viewData;
        treeData.map(function(i) {
            changeNode(i, TreeNodeState.Toggle);
        });
        this.setState({ ['viewData']: treeData });
        return;
    }
}
function findNode(data: ITreeViewData, node: ITreeViewData) {
    if (data.id === node.id) {
        data.expanded = !node.expanded;
    } else {
        const childData = data.children as ITreeViewData[];
        childData.map(function(i) {
            findNode(i, node);
        });
    }
};
function changeNode(data: ITreeViewData, nodeState: TreeNodeState) {
    switch (nodeState) {
        case TreeNodeState.Collapse:
            data.expanded = false;
            break;
        case TreeNodeState.Expand:
            data.expanded = true;
            break;
        case TreeNodeState.Toggle:
            data.expanded = !data.expanded;
            break;
        default:
            data.expanded = !data.expanded;
            break;
    }
    const childData = data.children as ITreeViewData[];
    childData.map(function(i) {
        changeNode(i, nodeState);
    });
};
export default TreeView;
