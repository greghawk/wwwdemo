import PropTypes from "prop-types";
import React from "react";
import {hot} from "react-hot-loader";
import TContainer from "./containers/TreeContainer";

class App extends React.Component {
  render() {
    return (
      <TContainer/>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default hot(module)(App);
