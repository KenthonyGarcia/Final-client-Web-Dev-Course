/*==================================================
AllStudentsContainer.js
It renders the all students view page. 
It also contains Thunk.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import { 
  fetchAllStudentsThunk,
  deleteStudentThunk
} from '../../store/thunks';

import AllStudentsView from '../views/AllStudentsView';

class AllStudentsContainer extends Component {
  // Get all students data from back-end database
  componentDidMount() {
    this.props.fetchAllStudents();
  }

  // Render All Students view by passing all students data as props to the component
  render(){
    return(
      <div>
        <Header />
        <AllStudentsView 
          students={this.props.allStudents}
          deleteStudent={this.props.deleteStudent}   
        />
      </div>
    )
  }
}

// The following 2 parts construct the "connect" function used by AllStudentsContainer to connect to Redux Store.  
// 1. Passing Redux Thunk (action creator) as props to the "connect" function
// The "mapDispatch" is to call the specific Thunk to dispatch its action.
const mapDispatch = (dispatch) => {
  return {
    fetchAllStudents: () => dispatch(fetchAllStudentsThunk()),
    deleteStudent: (studentId) => dispatch(deleteStudentThunk(studentId)),
  };
};
// 2. Passing Redux State as props to the "connect" function
// The "mapState" is called when the Store State changes. 
// It returns an object of "allStudents" data that AllStudentsContainer needs.
const mapState = (state) => {
  return {
    allStudents: state.allStudents,
  };
};

// Export store-connected container by default
// AllStudentsContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default withRouter(connect(mapState, mapDispatch)(AllStudentsContainer));