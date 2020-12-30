import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// actions
import { getStudentList } from "../../actions/student";

// function
import { hourFormat, minuteFormat } from "../../utils/timeFormat";

// custom styles
import styles from "./styles.scss";
import getSemester from "../../utils/getSemester";

@withRouter
@connect((state) => ({
  student_list: state.student.student_list,
  data: state,
}))
class StudentList extends Component {
  componentDidMount() {
    this.handleStudentList();
  }

  render() {
    const { student_list = [] } = this.props;

    return (
      <table className={styles.student_list_table}>
        <thead>
          <tr>
            <th>班級</th>
            <th>姓名</th>
            <th>學號</th>
            <th>需服務時數</th>
            <th>已服務時數</th>
            <th>剩餘服務時數</th>
            <th>功能</th>
          </tr>
        </thead>
        <tbody>
          {student_list.map((item, key) => {
            return (
              <tr key={key}>
                <td>{item.class_name}</td>
                <td>{item.student_name}</td>
                <td>{item.student_no}</td>
                <td>
                  {hourFormat(item.total_minutes)}時{minuteFormat(item.total_minutes)}分
                </td>
                <td>
                  {hourFormat(item.working_minutes)}時{minuteFormat(item.working_minutes)}分
                </td>
                <td>
                  {hourFormat(item.remaining_minutes)}時{minuteFormat(item.remaining_minutes)}分
                </td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  handleStudentList = async () => {
    const { dispatch } = this.props;
    await getStudentList(dispatch);
  };
}

StudentList.propTypes = {
  semester: PropTypes.string,
};

StudentList.defaultProps = {
  semester: getSemester(),
};

export default StudentList;
