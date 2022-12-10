/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
const StudentView = (props) => {
  const { student } = props;

  // Render a single Student view 
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <h3>{student.campus.name}</h3>
      <p>Email: {student.email}</p>
      <p>{student.imageUrl}</p>
      <p>GPA: {student.gpa}</p>
      {student.campus ? (<link to={'/student/${student.campus.id}'}>{student.campus.name}</link>) : (<p>No campus listed</p>)
      }
    
      <link to={'/student'}>Return to Students</link>
    </div>
  );

};

export default StudentView;