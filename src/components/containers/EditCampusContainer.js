/*==================================================
EditCampusContainer.js
The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from "./Header";
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditCampusView from '../views/EditCampusView';
import { editCampusThunk, fetchCampusThunk} from '../../store/thunks';

class EditCampusContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          campus: this.props.campus,
          campusId: this.props.match.params.id,
          redirect: false, 
          redirectId: null,
        };
    }

    componentDidMount() {
        //getting campus ID from url
        this.props.fetchCampus(this.props.match.params.id);
    }

    //change state values based on user input
    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();
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

        componentWillUnmount() {
            this.setState({redirect: false, redirectId: null});
        }
        //Rendering new campus form
        render() {
            if(this.state.redirect) {
              return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
            }
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

      const mapState = (state) => {
        return {
          campus: state.campus,
        };
      };

      const mapDispatch = (dispatch) => {
        return({
            fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
            editCampus: (campus) => dispatch(editCampusThunk(campus)),
        })
    }

    export default connect(mapState, mapDispatch)(EditCampusContainer);