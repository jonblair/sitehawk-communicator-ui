import React from "react";
import { TreeView, processTreeViewItems, handleTreeViewCheckChange, 
    moveTreeViewItem, TreeViewDragAnalyzer, TreeViewDragClue } from '@progress/kendo-react-treeview'
import { SegmentedControl } from 'segmented-control-react';
import '@progress/kendo-react-animation'
import $ from "jquery"; 

import "../chemical-area-ledger/chemical-area-ledger.css";
import "../../styles/ledgers/ledgers.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../../styles/font-awesome.css";


class ChemicalAreaLedger extends React.Component {
  constructor(props) {
    super(props);

    const segments = [
      { name: 'Tiles' },
      { name: 'TreeView' }
    ];

    this.state = {
      chemicalAreas: [],
      segments: segments,
      selected: 0
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (index) => {
    this.setState({selected: `${parseInt(index)}`});
  }

  componentDidMount() {
    this.getChemicalAreas(233, 1, 100);
    
  }

  async getChemicalAreas(facilityId, pageIndex, pageSize) {
    await fetch(`/api/v1/Facility/${facilityId}/ChemicalAreas?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        chemicalAreas: data,
      })
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  render() {
    function ChemicalAreaCards(props) {
      return (
        <div>
            {props.chemicalAreas.map((myChemicalArea, index) => (
              <div key={index} className="card">
                <div className="card-body">
                  <h5 className="card-title">{myChemicalArea.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{myChemicalArea.description}</h6>
                  <p className="card-text">Area Of Use: {myChemicalArea.areaOfUse.areaOfUse}</p>
                </div>
              </div>
            ))}
        </div>
      )
    }


    function ChemicalAreaTreeView(props) {
      var myTreeViewChemicalAreas = [];
      myTreeViewChemicalAreas = unflatten(props.treeViewData);

      function unflatten(arr) {
        var tree = [],
            mappedArr = {},
            arrElem,
            mappedElem;
  
        for(var i = 0, len = arr.length; i < len; i++) {
          arrElem = arr[i];
          mappedArr[arrElem.id] = arrElem;
          mappedArr[arrElem.id]['items'] = [];
        }
  
        for (var id in mappedArr) {
          if (mappedArr.hasOwnProperty(id)) {
            mappedElem = mappedArr[id];
            mappedElem.name = mappedElem.name + ' - ' + mappedElem.type.location;

            if (mappedElem.parentChemicalAreaId !== 0) {
              if (mappedArr[mappedElem['parentChemicalAreaId']] !== undefined) {
                mappedArr[mappedElem['parentChemicalAreaId']]['items'].push(mappedElem);
              }
            }
            else {
              tree.push(mappedElem);
            }

            tree.sort((a, b) => a.name.localeCompare(b.name))
          }
        }

        return tree;
      }

      function onExpandChange(event) {
        event.item.expanded = !event.item.expanded;
      }

      function ChemicalAreaItem(props) {
        if (props.item.isArchived) {
          return <span className='archived' key='0'>{props.item.name} <i className="fa fa-archive" aria-hidden="true" title="Archived" style={{display: "inline"}}></i></span>
        }
        else {
          return <span key='0'>{props.item.name}</span>;
        }
      }

      return (
        <TreeView
          data={myTreeViewChemicalAreas}
          textField="name"
          expandIcons={true}
          onExpandChange={onExpandChange}
          itemRender={props => (
            <ChemicalAreaItem item={props.item}/>
          )}
        />
      )
    }

    function loadChemicalAreaView(props) {
      switch(parseInt(props.selected)) {
        case 0: 
          return <ChemicalAreaCards chemicalAreas={props.chemicalAreas} />;
          break;
        case 1:
          return <ChemicalAreaTreeView treeViewData={props.chemicalAreas} />;
          break;
        default:
          return <ChemicalAreaCards chemicalAreas={props.chemicalAreas} />;
          break;
      }
    }
    
    return (
        <div className="content">
        <div id="chemicalAreaLedgerHeader" className="ledgerTitle">Chemical Area Ledger</div>
        <br/>
        <SegmentedControl segments={this.state.segments} selected={parseInt(this.state.selected)} variant="base" onChangeSegment={this.handleChange}/>    
        <br/>
        <div>
          {loadChemicalAreaView(this.state)}
        </div>  
        </div>
    )
  }
} 

export default ChemicalAreaLedger;