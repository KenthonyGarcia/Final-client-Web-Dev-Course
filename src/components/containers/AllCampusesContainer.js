/*==================================================
AllCampusesContainer.js
It renders the all campuses view page. 
It also contains Thunk.
================================================== */
import Header from './Header';
import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchAllCampusesThunk } from "../../store/thunks";
import { AllCampusesView } from "../views";

class AllCampusesContainer extends Component {
  // Get all campuses data from back-end database
  componentDidMount() {
    console.log(this.props);
    this.props.fetchAllCampuses();
  }

  // Render All Campuses view by passing all campuses data as props to the component
  render() {
    return (
      <div>
        <Header />
        <AllCampusesView
          allCampuses={this.props.allCampuses}
        />
      </div>
    );
  }
}

// The following 2 parts construct the "connect" function used by AllCampusesContainer to connect to Redux Store.  
// 1. Passing Redux Thunk (action creator) as props to the "connect" function
// The "mapDispatch" is to call the specific Thunk to dispatch its action.
const mapDispatch = (dispatch) => {
  return {
    fetchAllCampuses: () => dispatch(fetchAllCampusesThunk()),
  };
};
// 2. Passing Redux State as props to the "connect" function
// The "mapState" is called when the Store State changes. 
// It returns an object of "allCampuses" data that AllStudentsContainer needs.
const mapState = (state) => {
  return {
    allCampuses: state.allCampuses,
  };
};

// Type check props;
AllCampusesContainer.propTypes = {
  allCampuses: PropTypes.array.isRequired,
  fetchAllCampuses: PropTypes.func.isRequired,
};

// Export store-connected container by default
// AllCampusesContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(AllCampusesContainer);