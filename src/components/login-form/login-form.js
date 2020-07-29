import React from "react";
import "../login-form/login-form.css";
import "moment/moment";
import { withRouter } from 'react-router-dom' 
//import UserService from '../../_services/user-service'

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { username: '', password: '', corporationid: '', errorMessage: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this._userSevice = new UserService;
  }

  async handleSubmit(e) {
    e.preventDefault();
    await this.login(this.state.username, this.state.password, this.state.corporationid);
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
 };

  async login(myUsername, myPassword, myCorporationId) {
    await fetch('/api/v1/Authorize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username: myUsername, password: myPassword, corporationId: myCorporationId}),
    })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem('token', data.accessToken);
      this.getUserIdAndCorpIdFomJwtToken(data.accessToken);
      this.getUserData(localStorage.getItem('userid'));
    })
    .catch((error) => {
      console.error('Error:', error);
      this.setState({errorMessage: 'Login failed'});
    });
  }

  async getUserData(userId) {
    //this._userSevice.getCurrentUser(userId);
    await fetch(`/api/v1/User/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem('user', JSON.stringify(data));
      this.props.history.push('/default');
    })
    .catch((error) => {
      console.error('Error:', error);
      this.setState({errorMessage: error.message});
    });
  }

  getUserIdAndCorpIdFomJwtToken(token) {
    var jwt = require("jsonwebtoken");
    var decode = jwt.decode(token);
    var ids = decode.sub.split('|');

    localStorage.setItem('userid', ids[0]);
    localStorage.setItem('corporationid', ids[1]);
  }

  render() {
    return (
      <div className="wrap loginFields">
        <div id="login">
          <div id="LoginHeader">Communicator Login</div>
          <React.Fragment>
            <form onSubmit={this.handleSubmit}>
              <div className="loginEntry">
                <input name="txtBxUserName" type="text" id="txtBxUserName" name="username" value={this.state.username}
                onChange={this.handleChange} className="textEntry" placeholder="Login Name"></input>
                <input name="txtBxPassword" id="txtBxPassword" name="password" value={this.state.password}
                onChange={this.handleChange} className="textEntry" type="password" placeholder="Password"></input>
                <input name="txtBxCompanyId" type="text" id="txtBxCompanyId" name="corporationid" value={this.state.corporationid}
                onChange={this.handleChange} className="textEntry" placeholder="Company ID"></input>
              </div>
              <input type="submit" name="btnLoginButton" value="Log In" id="btnLoginButton" />
              {this.state.errorMessage && <h3 className="error"> { this.state.errorMessage } </h3>}
            </form>
          </React.Fragment>
        </div>
        <br/>
        <div id="ssl">
            <p>TLS Enabled</p>
        </div>
      </div>
    )
  }
} 

export default withRouter(LoginForm);