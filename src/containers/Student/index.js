import React, { Component } from "react";
import { connect } from "react-redux";

// actions
import { getSemesterList } from "../../actions/semester";
import { getStudentList } from "../../actions/student";

// custom components
import StudentList from "./StudentList";

// styles
import styles from "./styles.scss";

@connect((state) => ({
  semester: state.student.semester,
  semester_list: state.semester.semester_list,
}))
class Student extends Component {
  componentDidMount() {
    this.handleSemesterList();
    this.handleStudentList();
  }

  render() {
    const { semester, semester_list } = this.props;
    return (
      <div>
        {/* header function */}
        <div className={styles["table-func"]}>
          <select
            name="semester"
            value={semester}
            onChange={(e) => {
              this.handleStudentList(e.target.value);
            }}
          >
            {semester_list.map((item, key) => {
              return (
                <option key={key} value={item}>
                  {item}學期
                </option>
              );
            })}
          </select>
        </div>

        {/* list */}
        <StudentList />
      </div>
    );
  }

  // 取得學期列表
  handleSemesterList = async () => {
    const { dispatch } = this.props;

    await getSemesterList(dispatch);
  };

  // 取得學生列表
  handleStudentList = async (semester = this.props.semester) => {
    const { dispatch } = this.props;

    await getStudentList(dispatch, { semester });
  };
}

export default Student;
