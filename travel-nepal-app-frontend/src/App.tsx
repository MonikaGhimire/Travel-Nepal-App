import * as React from 'react';
import './App.scss';
import { LandingPage } from "./Containers/LandingPage/LandingPage";
import { BrowserRouter, Switch, Route, withRouter, RouteComponentProps, matchPath } from 'react-router-dom';
import * as actions from "./global-store/ReduxSaga/Actions/index";
import { connect } from "react-redux";
import { extractToken } from "./global-store/TokenService/TokenService";
import { TokenStorage } from "./global-store/Queries/Utilities/TokenStorage";
import { isTokenExpired } from "./Utility/TokenUtility";
import PageHeader from "./Components/Header/PageHeader";
import { AddDestination } from "./Components/Destination/AddDestination";
import { DestinationDetailsContainer } from "./Containers/DestinationDetails/DestinationDetailsContainer";

export interface IAppProps extends RouteComponentProps {
  onAuthenticateUser?: (token: string) => any;
}
class App extends React.Component<IAppProps> {
  private token = TokenStorage.retrieveToken("access_token");
  componentDidMount() {
    if (this.token && this.props.onAuthenticateUser) {
      if (!isTokenExpired(new Date(extractToken(this.token).exp * 1000))) {
        this.props.onAuthenticateUser(this.token);
      }
    }
  }

  private match = matchPath(this.props.history.location.pathname, {
    path: '/destination-details/:id',
    exact: true,
    strict: false
  })

  render() {
    let routes = (
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={LandingPage} />
          <Route path='/destination-add' exact component={() => <AddDestination history={this.props.history} authToken={this.token} />} />
          <Route path={"/destination-details/:id"} exact={true} component={() => <DestinationDetailsContainer match={this.match} />} />
        </Switch>
      </BrowserRouter>
    );

    return (
      <div className="App">
        <PageHeader history={this.props.history} />
        {routes}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAuthenticateUser: (token: any) => dispatch(actions.authenticateUserSuccess(token)),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(App));
