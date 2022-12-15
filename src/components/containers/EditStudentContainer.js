/*==================================================
EditStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditStudentView from '../views/EditStudentView';
import { fetchStudentThunk, editStudentThunk } from '../../store/thunks';

class EditStudentContainer extends Component {
    // Initialize state
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            imageUrl: "",
            email: "",
            campusId: null,
            gpa: null,
            redirect: false,
            redirectId: null,
        };
    }

    // Get student data from back-end database
    componentDidMount() {
        //getting student ID from url
        this.props.fetchStudent(this.props.match.params.id);
    }

    // Capture input data when it is entered
    handleChange = (event) => {
        this.setState({
        [event.target.name]: event.target.value,
        });
    };

  // Take action after user click the submit button
  handleSubmit = async (event) => {
    event.preventDefault(); // Prevent browser reload/refresh after submit.

    let student = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        imageUrl: this.state.imageUrl,
        gpa: this.state.gpa,
        campusId: this.state.campusId,
        id: this.state.studentId
    };

    // Edit new student in back-end database
    let editedStudent = await this.props.editStudent(student);
    console.log(editedStudent);

    // Update state, and trigger redirect to show the new student
    this.setState({
        firstname: "", 
        lastname: "", 
        imageUrl: "",
        email: "",
        gpa: "",
        campusId: null, 
        redirect: true, 
        redirectId: this.state.studentId
      });
    }

    // Unmount when the component is being removed from the DOM:
    componentWillUnmount() {
        this.setState({ redirect: false, redirectId: null });
    }

    // Render new student input form
    render() {
        // Redirect to new student's page after submit
        if (this.state.redirect) {
        return <Redirect to={`/student/${this.state.redirectId}`} />;
        }

        // Display the input form via the corresponding View component
        return (
        <div>
            <Header />
            <EditStudentView
            student={this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            />
        </div>
        );
    }
}


// The following 2 input arguments are passed to the "connect" function used by "EditStudentContainer" component to connect to Redux Store.
// 1. The "mapState" argument specifies the data from Redux Store that the component needs.
// The "mapState" is called when the Store State changes, and it returns a data object of "student".
const mapState = (state) => {
        return {
        student: state.student,
    };
};

// The following input argument is passed to the "connect" function used by "EditStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
return {
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    editStudent: (student) => dispatch(editStudentThunk(student)),
};
};

// Export store-connected container by default
// EditStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditStudentContainer);