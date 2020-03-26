import React from "react";
import $ from "jquery"; 
import { withRouter } from 'react-router-dom' 

import "../navigation/navigation.css";
import "../../styles/font-awesome.css";

class CommunicatorNavigation extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() { 
		this.cbpHorizontalMenu().init();
  }


  cbpHorizontalMenu() {
    var listItems = $("#navigation > ul > li");
    var body = $("body");
    var current = -1;

    function init() {
      listItems.each(function(){
        if (this.classList.contains("submenu")) {
          var menuItems = $(this).children("a");

          menuItems.on("click", open);
          listItems.on("click", function(event) { 
            event.stopPropagation(); 
          });
        }
      });
    }

    function open(event) {
      if( current !== -1 ) {
        listItems.eq(current).removeClass("cbp-hropen");
      }
  
      var item = $(event.currentTarget).parent("li"),
      idx = item.index();
  
      if( current === idx ) {
        item.removeClass("cbp-hropen");
        current = -1;
      }
      else {
        item.addClass("cbp-hropen");
        current = idx;
        body.off("click").on("click", close);
      }
  
      return false;
  
    }

    function close(event) {
      listItems.eq(current).removeClass("cbp-hropen");
      current = -1;
    }


    return {init : init};
  }

  // handleLogout(e) {
  //   // e.preventDefault();
  //   // localStorage.clear();
  //   // this.props.history.push('/login');

  //   console.log('Test');
  // }

  getUserTitleString() {
    var user = JSON.parse(localStorage.getItem("user"));

    return `${user.firstName.trim()} ${user.lastName.trim()} (${user.userName.trim()})`;
  }


  render() 
  {
    return (
      <nav id="navigation" className="navbar navbar-inverse menu-background sht-navbar navbar-fixed-top cbp-hrmenu" style={{borderRadius: "0px", opacity: "0.99"}}>  
        <ul style={{float: "left", marginLeft: "0", paddingLeft: "0"}}>    
          <li>
            <a href="/default" title="Home"><i className="fa fa-home fa-lg" aria-hidden="true"></i></a>
          </li>
          
          
          <li className="submenu">
            <a href="#">Administration<b className="caret-down"></b></a>
            <div className="cbp-hrsub">
              <div className="cbp-hrsub-inner"> 
                <div>
                  <h4>Custom Summary</h4>
                  <ul>
                    <li><a href="#">Chemical Area Administration</a></li>
                    <li><a href="#">Summary Administration</a></li>
                  </ul>
                </div>
                <div>
                  <h4>List/Databases</h4>
                  <ul>
                    <li><a href="#">Banned Chemicals</a></li>
                    <li><a href="#">Material Use</a></li>
                    <li><a href="#">Package/Container Dictionary</a></li>
                    <li><a href="#">Regulations</a></li>
                  </ul>
                </div>
                <div>
                  <h4>My Site</h4>
                  <ul>
                    <li><a href="#">Additional Properties</a></li>
                    <li><a href="#">Facility Identification</a></li>
                    <li><a href="/user-management">Manage Users</a></li>
                    <li><a href="#">Preferences</a></li>
                    <li><a href="#">Print Barcodes</a></li>
                  </ul>
                </div>
                <div>
                </div>
              </div>
            </div>
          </li>
          
          
          <li className="submenu">
            <a href="#">CIT<b className="caret-down"></b></a>
            <div className="cbp-hrsub">
              <div className="cbp-hrsub-inner"> 
                <div>
                  <h4>Chemical Inventory Tracking</h4>
                  <ul>
                    <li><a href="#">CIT Ledger</a></li>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Receive</a></li>
                    <li><a href="#">Transaction</a></li>
                    <li><a href="#">VeriScan</a></li>
                  </ul>
                </div>
                <div>
                </div>
              </div>
            </div>
          </li>


          <li>
            <a href="#">Dashboard</a>
          </li>


          <li className="submenu">
            <a href="#">Ledgers<b className="caret-down"></b></a>
            <div className="cbp-hrsub">
              <div className="cbp-hrsub-inner"> 
                <div>
                  <h4>Facility</h4>
                  <ul>
                    <li><a href="/chemical-area-ledger">Chemical Areas</a></li>
                    <li><a href="#">Consolidation History</a></li>
                    <li><a href="#">In Process/Service Request</a></li>
                    <li><a href="#">Ingredient</a></li>
                    <li><a href="#">Chemical Review</a></li>
                    <li><a href="#">Chemical Review Preindexing Ledger</a></li>
                    <li><a href="#">Regulations</a></li>
                    <li><a href="#">SDS</a></li>
                    <li><a href="#">Vendor</a></li>
                    <li><a href="#">Waste Products</a></li>
                  </ul>
                </div>
                <div>
                </div>
              </div>
            </div>
          </li>

          <li>
            <a href="#">MAPS</a>
          </li>


          <li className="submenu">
            <a href="#">Reports<b className="caret-down"></b></a>
            <div className="cbp-hrsub">
              <div className="cbp-hrsub-inner"> 
                <div>
                  <h4>Adavanced Cross Reference</h4>
                  <ul>
                    <li><a href="#">AAFA RSL Facility List</a></li>
                    <li><a href="#">CLP Annex VI</a></li>
                    <li><a href="#">DHS Chemicals of Interest List</a></li>
                    <li><a href="#">EPCRA 313 - Facility TRI List</a></li>
                    <li><a href="#">Facility HAPs List</a></li>
                    <li><a href="#">German List of Hazardous Substances (Gefahrstoffverordnung)</a></li>
                    <li><a href="#">Material Properties</a></li>
                    <li><a href="#">Regulations List of Lists Cross-Reference</a></li>
                    <li><a href="#">Substances of Very High Concern (SVHC)</a></li>
                  </ul>
                </div>
                <div>
                  <h4>Advanced Quantity</h4>
                  <ul>
                    <li><a href="#">Form R Worksheet</a></li>
                    <li><a href="#">Regulatory Threshold Worksheets</a></li>
                    <li><a href="#">Tier II Wizard</a></li>
                  </ul>
                </div>
                <div>
                  <h4>Standard</h4>
                  <ul>
                    <li><a href="#">Audit</a></li>
                    <li><a href="#">Chemical Areas</a></li>
                    <li><a href="#">CIT</a></li>
                    <li><a href="#">GHS Audit</a></li>
                    <li><a href="#">Ingredient</a></li>
                    <li><a href="#">Locked Sections/Fields</a></li>
                    <li><a href="#">Material</a></li>
                    <li><a href="#">Material Approval</a></li>
                    <li><a href="#">Revision Date</a></li>
                    <li><a href="#">Vendor</a></li>
                  </ul>
                </div>
                <div>
                </div>
              </div>
            </div>
          </li>


          <li className="submenu">
            <a href="#">Search<b className="caret-down"></b></a>
            <div className="cbp-hrsub">
              <div className="cbp-hrsub-inner"> 
                <div>
                  <h4>Search</h4>
                  <ul>
                    <li><a href="#">Advanced Search</a></li>
                    <li><a href="#">Maerial Properties Search</a></li>
                  </ul>
                </div>
                <div>
                </div>
              </div>
            </div>
          </li>

        </ul>
      
        <ul style={{float: "right", marginRight: "0", paddingRight: "0", textAlign: "right"}}>
          <li>
            <a href="#" title={this.getUserTitleString()}><i className="fa fa-user fa-lg fa-menu-white" aria-hidden="true"></i></a>
          </li>

          <li>
            <a href="#" title="Give Us Your Feedback"><i className="fa fa-bullhorn fa-lg fa-menu-white" aria-hidden="true"></i></a>
          </li>

          <li>
            <a href="#" title="Help"><i className="fa fa-question-circle fa-lg" aria-hidden="true"></i></a>
          </li>

          <li>
            <a href="/login" title="Logout"><i className="fa fa-sign-out fa-lg" aria-hidden="true"></i></a>
          </li>
        </ul>
        </nav>
    )
  }


} 

export default withRouter(CommunicatorNavigation);
