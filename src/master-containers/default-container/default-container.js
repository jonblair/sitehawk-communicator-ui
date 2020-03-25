import React from "react";
import {withRouter} from 'react-router-dom';

import "../default-container/default-container.css";
import DefaultHeader from "../../components/default-header/default-header";
import DefaultFooter from "../../components/default-footer/default-footer";
import CommunicatorNavigation from "../../components/navigation/navigation";
import DefaultWelcome from "../../components/default-welcome/default-welcome";
import ChemicalAreaLedger from "../../components/chemical-area-ledger/chemical-area-ledger";
import UserManagement from "../../components/user-management/user-management"

export default function DefaultContainer(props) {
  
  function loadBodyComponent() {
    switch(props.location.pathname) {
      case '/default': 
        return <DefaultWelcome />;
        break;
      case '/chemical-area-ledger':
        return <ChemicalAreaLedger />;
        break;
      case '/user-management':
        return <UserManagement />
        break;
      default:
        return <DefaultWelcome />;
        break;
    }
  }

  return (
    <div>
    <div><DefaultHeader /></div>

    <div><CommunicatorNavigation /></div>
    
    <div className="bodyComponent">
    {
      loadBodyComponent()
    }
    </div>

    <div><DefaultFooter /></div>
    </div>
  );
}