import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setSearchField, requestRobots } from '../actions';

import Tilt from 'react-tilt';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import Face from '../components/Logo/pngwing.com.png';
import {Nav, Navbar, NavDropdown, MenuItem,  Tabs, Form, Button,  FormControl} from 'react-bootstrap';

import './App.css';

// parameter state comes from index.js provider store state(rootReducers)
const mapStateToProps = (state) => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending
  }
}

// dispatch the DOM changes to call an action. note mapStateToProps returns object, mapDispatchToProps returns function
// the function returns an object then uses connect to change the data from redecers.
const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

class App extends Component {
  componentDidMount() {
    this.props.onRequestRobots();
  }

  render() {
    const { robots, searchField, onSearchChange, isPending } = this.props;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
    return (
      <div className='tc'>
        <div className="ma4 mt0 tc" >
          <div className='ma4 mt0 tc' style={{marginTop: '15px'}}>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 45 }} style={{ height: 150, width: 150 }} >
              <div className="Tilt-inner pa3"> <img style={{paddingTop: '5px'}}alt='logo' src={Face}/> </div>
            </Tilt>
          </div>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={onSearchChange}/>
        </div>
        <Scroll>
          { isPending ? <h1>Loading</h1> :
            <ErrorBoundry>
              <CardList robots={filteredRobots} />
            </ErrorBoundry>
          }
        </Scroll>
        
      </div>
    );
  }
}

// action done from mapDispatchToProps will channge state from mapStateToProps
export default connect(mapStateToProps, mapDispatchToProps)(App)