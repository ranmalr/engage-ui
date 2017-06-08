import * as React from 'react';
import { ITreeViewData } from './ITreeViewData';
export interface Props {
    data: ITreeViewData[],
    collapseAll?: boolean,
    expandAll?: boolean,
    selectedId?: number[],
    onSelect?(node: ITreeViewData): void,
}

class TreeView extends React.Component<Props, {}> {
    constructor(props: any) {
        super(props);
    }
    render() {
        const {
            data,
            collapseAll = false,
            expandAll = false,
        } = this.props;
        let collapseEle = null;
        if (collapseAll) {
            collapseEle = <li><a onClick={this.handleCollapse}>Collapse All</a></li>;
        }
        let expandedEle = null;
        if (expandAll) {
            expandedEle = <li><a onClick={this.handleExpand}>Expand All</a></li>;
        }
        let liNode = null;
        data.map(function(i) {
            liNode = this.createNode(i);
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

    private createNode = (data: ITreeViewData) => {
        const liItem = <a onClick={this.handleNodeClick(data)}>{data.display}</a>;
        let className = '';
        if (data.expanded) {
            className += 'expanded';
        }
        if (data.icon) {
            className += 'icon';
        }
        if (this.props.selectedId.some((x) => x === data.id)) {
            className += 'selected';
        }
        const nodeHtml = <li key={data.id} id={data.id.toString()} className={className}>{liItem}</li>;
        return nodeHtml;
    }

    private handleNodeClick = (node: ITreeViewData): any => {
        alert(node);
        return;
    }
    private handleCollapse = () => {
        return;
    }
    private handleExpand = () => {
        return;
    }
    private handleToggle = () => {
        return;
    }
}

export default TreeView;
