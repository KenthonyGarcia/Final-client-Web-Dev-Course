/*==================================================
CampusView.js
The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link, useHistory } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus} = props;
  const history = useHistory();
  
  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <img src={campus.imageUrl} alt={campus.name} height = "400px"/>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <button onClick={() => {history.push(`/campus/${campus.id}/edit`);}}>Edit Campus Info</button>
      { campus.students.length === 0 ? (<p>No students listed for {campus.name}</p> ) : (
        campus.students.map( student => {
          let name = student.firstname + " " + student.lastname;
          return (
            <div key={student.id}>
              <p> Students enrolled in {campus.name}</p>
              <Link to={`/student/${student.id}`}>
               <h2>{name}</h2>
              </Link>             
            </div>
          );
        })
      )}
    </div>
  );
};

export default CampusView;