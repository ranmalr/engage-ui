import * as React from 'react';
import { ITreeViewData } from './ITreeViewData';

export interface State {
    viewData: ITreeViewData[],
}
export interface Props {
    data: ITreeViewData[],
    collapseAll?: boolean,
    expandAll?: boolean,
    selectedId: number[],
    onSelect?(node: ITreeViewData): any,
}

class TreeView extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            viewData: this.props.data,
        };
    }
    render() {
        const {
            data,
            collapseAll = false,
            expandAll = false,
            selectedId,
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
        function createNode(data: ITreeViewData): any {
            const liItem = <a id={data.id.toString()} onClick={onSelect.bind(data)}>{data.display}</a>;
            let className = '';
            if (data.expanded) {
                className += 'expanded';
            }
            if (data.icon) {
                className += 'icon';
            }
            if (selectedId.some((x: number) => x === data.id)) {
                className += 'selected';
            }
            const nodeHtml = <li key={data.id} id={data.id.toString()} className={className}>{liItem}</li>;
            return nodeHtml;
        }
        let liNode = null;
        data.map(function(i) {
            liNode = createNode(i);
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
    private handleNodeClick = (node: ITreeViewData): any => {
        alert('r');
        return;
    }
    private handleCollapse = () => {
        alert('r');
        return;
    }
    private handleExpand = () => {
        alert('r');
        return;
    }
    private handleToggle = () => {
        alert('r');
        return;
    }
}

export default TreeView;
