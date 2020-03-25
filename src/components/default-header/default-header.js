import React from "react";
import "../default-header/default-header.css";

class DefaultHeader extends React.Component {
  render() {
    return (
      <div id="divHeader" runat="server" className="defaultheader">
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
} 

export default DefaultHeader;