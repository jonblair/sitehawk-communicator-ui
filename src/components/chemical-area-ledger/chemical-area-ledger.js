import React from "react";
import { TreeView, processTreeViewItems, handleTreeViewCheckChange, 
    moveTreeViewItem, TreeViewDragAnalyzer, TreeViewDragClue } from '@progress/kendo-react-treeview'
import { SegmentedControl } from 'segmented-control-react';
import '@progress/kendo-react-animation'

import "../chemical-area-ledger/chemical-area-ledger.css";
import "../../styles/ledgers/ledgers.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"


class ChemicalAreaLedger extends React.Component {
  constructor(props) {
    super(props);

    const segments = [
      { name: 'Tiles' },
      { name: 'TreeView' }
    ];

    this.state = {
      chemicalAreas: [],
      chemicalAreasHierarchy: [],
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
      var myTreeViewChemicalAreas = [];
      data.forEach(myChemicalArea => {
        myChemicalArea.name = myChemicalArea.name + ' - ' + myChemicalArea.type.location;

        if (myChemicalArea.parentChemicalAreaId === 0) {
          myChemicalArea.items = data.filter(function(item) {
            return item.parentChemicalAreaId === myChemicalArea.id;
          });

          myTreeViewChemicalAreas.push(myChemicalArea);
        }
      });


      this.setState({
        chemicalAreas: data,
        chemicalAreaTreeView: myTreeViewChemicalAreas,
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
                  <p className="card-text">Use: {myChemicalArea.areaOfUse.areaOfUse}</p>
                </div>
              </div>
            ))}
        </div>
      )
    }


    function ChemicalAreaTreeView(props) {
      function onExpandChange(event) {
        event.item.expanded = !event.item.expanded;
      }
      return (
        <TreeView
            data={props.treeViewData}
            textField="name"
            expandIcons={true}
            onExpandChange={onExpandChange}
        />
      )
    }

    function loadChemicalAreaView(props) {
      switch(parseInt(props.selected)) {
        case 0: 
          return <ChemicalAreaCards chemicalAreas={props.chemicalAreas} />;
          break;
        case 1:
          return <ChemicalAreaTreeView treeViewData={props.chemicalAreaTreeView} />;
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
        <SegmentedControl
            segments={this.state.segments}
            selected={parseInt(this.state.selected)} 
            variant="base"
            onChangeSegment={this.handleChange}           
        />    
        <br/>
        <div>
        {loadChemicalAreaView(this.state)}
        </div>  
        </div>
    )
  }
} 

export default ChemicalAreaLedger;