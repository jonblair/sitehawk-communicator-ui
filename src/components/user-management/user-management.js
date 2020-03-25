import React from "react";
import ReactDOM from 'react-dom';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { ExcelExport, ExcelExportColumn } from '@progress/kendo-react-excel-export';

import "../user-management/user-management.css";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../../styles/ledgers/ledgers.css";
import '../../../node_modules/@progress/kendo-theme-bootstrap/dist/all.css';

class UserManagement extends React.Component {
  _exporter;

  constructor(props) {
    super(props);

    this.state = {
        users: [],
        skip: 0,
        take: 25,
      };
  }

  export = () => {
      console.log(this._exporter);
      this._exporter.save();
  }

  componentDidMount() {
    this.getUsers(233, this.state.page, this.state.size);
  }

  pageChange = (event) => {
    this.setState({
        skip: event.page.skip,
        take: event.page.take
    });
  }

  async getUsers(facilityId, pageIndex, pageSize) {
    await fetch(`/api/v1/Facility/${facilityId}/Users`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        users: data,
      });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  render() {

    function UserStatus(props) {
        if (props.status) {
          return "Active";
        }

        return "Inactive";
      }

    return (
        <div className="content">
        <div id="userManagementHeader" className="ledgerTitle">User Management</div>
        <br/>
        <div style={{marginBottom: "10px"}}>
          <button className="k-button" title="export to excel" onClick={this.export}>Export to Excel</button>
            <ExcelExport
              data={this.state.users}
              fileName="Users.xlsx"
              ref={(exporter) => { 
                this._exporter = exporter; }}>
              <ExcelExportColumn field="lastName" title="Last Name" width={300} />
              <ExcelExportColumn field="firstName" title="First Name" width={300} />
              <ExcelExportColumn field="userName" title="User Name" width={300} />
              <ExcelExportColumn field="userType.name" title="User Type" width={300} />
            </ExcelExport>
        </div>
        <div>
            <Grid
                style={{ height: "430px" }}
                data={this.state.users.slice(this.state.skip, this.state.take + this.state.skip)} 
                skip={this.state.skip}
                take={this.state.take}
                total={this.state.users.length}
                pageable={true}
                onPageChange={this.pageChange}
                >
                <Column field="lastName" title="Last Name" width="300px" />
                <Column field="firstName" title="First Name" width="300px" />
                <Column field="userName" title="User Name" />
                <Column field="userType.name" title="User Type" />
                <Column
                    field="status" title="Status" width="150px"
                    cell={props => (
                        <td>
                            <UserStatus status={props.dataItem[props.field]}/>
                        </td>
                    )}
                />
            </Grid>
        </div>  
        </div>
    )
  }
} 

export default UserManagement;