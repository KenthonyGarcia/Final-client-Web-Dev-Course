/*==================================================
EditCampusContainer.js
The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditCampusView from '../views/EditCampusView';
import { editCampusThunk, fetchCampusThunk} from '../../store/thunks';

class EditCampusContainer extends Component {
    // Initialize state
    constructor(props){
        super(props);
        this.state = {
            campus: this.props.campus,
            campusId: this.props.match.params.id,
            redirect: false, 
            redirectId: null,
        };
    }
    // Get campus data from back-end database
    componentDidMount() {
        //getting campus ID from url
        this.props.fetchCampus(this.props.match.params.id);
    }

    // Capture input data when it is entered
    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }
    // Take action after user click the submit button
    handleSubmit = async event => {
        event.preventDefault(); // Prevent browser reload/refresh after submit.
        let campus = {
            name: this.state.name,
            imageUrl: this.state.imageUrl,
            address: this.state.address,
            description: this.state.description,
            id: this.state.campusId
        };
        await this.props.editCampus(campus);

        this.setState({
            name: "", 
            imageUrl: "", 
            address: "",
            description: "", 
            redirect: true, 
            redirectId: this.state.campusId
          });
        }

    // Unmount when the component is being removed from the DOM:
    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});
    }
    //Rendering new campus form
    render() {
        // Redirect to new campus's page after submit
        if(this.state.redirect) {
            return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
        }
        // Display the input form via the corresponding View component
        return (
            <div>
            <Header />
            <EditCampusView 
                campus = {this.state}
                handleChange = {this.handleChange} 
                handleSubmit={this.handleSubmit}      
            />
            </div>
        );
    }
}
    
// The following 2 input arguments are passed to the "connect" function used by "EditCampusContainer" component to connect to Redux Store.
// 1. The "mapState" argument specifies the data from Redux Store that the component needs.
// The "mapState" is called when the Store State changes, and it returns a data object of "campus".
const mapState = (state) => {
    return {
        campus: state.campus,
    };
};

// The following input argument is passed to the "connect" function used by "EditCampusContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
        editCampus: (campus) => dispatch(editCampusThunk(campus)),
    })
}

// Export store-connected container by default
// EditStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditCampusContainer);