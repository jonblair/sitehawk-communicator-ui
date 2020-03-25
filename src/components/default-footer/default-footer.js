import React from "react";
import "../default-footer/default-footer.css";

class DefaultFooter extends React.Component {

  constructor(props) {
    super(props);

    this.footerLogo_Click = this.footerLogo_Click.bind(this);
  }

    footerLogo_Click() {
    window.open('https://sphera.com/', 'mywindow');
  }

  render() {
    return (
        <div className="footer footerFixed">
            <span className="version">v1.0.0</span>
            <span className="copyright" id="copyrightYear">© 1993 - 2020 Sphera Solutions, Inc. All Rights Reserved.</span>
            <a target="_blank" rel="noopener noreferrer" href={require("../../_public/PrivacyStatement.htm")} className="footerLnk privacyStatement">Privacy Statement</a>
            <div className="footerLogo" onClick={this.footerLogo_Click}>
                <img className="footerLogoImg" src={require("../../images/SpheraCommunicatorFooter.png")} alt="Sphera footer logo" />
            </div>
        </div>
    )
  }
} 

export default DefaultFooter;