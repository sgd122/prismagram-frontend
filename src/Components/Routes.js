import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Route, Switch, Redirect } from "react-router-dom";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed";
import Explore from "../Routes/Explore";
import Profile from "../Routes/Profile";
import Search from "../Routes/Search";
import PostCard from "../Routes/PostCard";

const Wrapper = styled.div`
  min-height: 500px;
`;

const LoggedInRoutes = () => (
  <Wrapper>
    <Switch>
      <Route exact path="/" component={Feed} />
      <Route path="/explore" component={Explore} />
      <Route path="/search" component={Search} />
      <Route path="/post" component={PostCard} />
      <Route path="/:username" component={Profile} />
      <Redirect from="*" to="/" />
    </Switch>
  </Wrapper>
);

const LoggedOutRoutes = () => (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Redirect from="*" to="/" />
  </Switch>
);

const AppRouter = ({ isLoggedIn }) =>
  isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
