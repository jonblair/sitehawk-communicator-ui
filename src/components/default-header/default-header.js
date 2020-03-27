import React from "react";
import "../default-header/default-header.css";

class DefaultHeader extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {

    function loadHeader(props) {
      if (props.userType.id === 4)
      {
        return <FacilityAdminHeader />
      }
      else {
        return <CorporationHeader />
      }
    }

    function FacilityAdminHeader() {
      return (
        <div id="divHeader" runat="server" className="defaultHeader">
        <div className="logoSection">
          <div className="logoContainer">
            <img id="logoImg" className="logoImg" src={require("../../images/1002.gif")} alt="Logo" />
          </div>
        </div>
        <div className="otherSection">
        </div>
      </div>
      )
    }

    function CorporationHeader() {
      return (
        <div id="divHeader" runat="server" className="corpHeader">
        <div className="logoSection">
          <div className="logoContainer">
            <img id="logoImg" className="logoImg" src={require("../../images/1002.gif")} alt="Logo" />
          </div>
        </div>
        <div className="otherSection">
        </div>
      </div>
      )
    }

    return (
      <div>
        {loadHeader(JSON.parse(localStorage.getItem('user')))}
      </div>
    )
  }
} 

export default DefaultHeader;