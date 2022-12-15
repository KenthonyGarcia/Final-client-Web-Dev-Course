/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link, useHistory } from "react-router-dom";



const StudentView = (props) => {
  const { student } = props;
  const history = useHistory();

  // Render a single Student view 
  return (
    
    (student ? 
      <div>
        <h1>{student.firstname + " " + student.lastname}</h1>
        <h3>{student.campus ? student.campus.name : <p>Student is not enrolled in a campus</p>}</h3>
        <p>{student.email}</p>
        <img src={student.imageUrl} alt= {student.name} height="200px"/>
        <p>GPA: {student.gpa}</p>
        {student.campus ? (<Link to={`/campus/${student.campus.id}`}>{student.campus.name}</Link>) : (<p>No Campus Listed</p>)}
        <br>
        </br>
        <button onClick={() => {history.push(`/student/${student.id}/edit`);}}>Edit Student Info</button>
      </div> : 
      <div> No students at the moment.</div>
      )
  );

};

export default StudentView;