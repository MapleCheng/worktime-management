import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// actions
import { getStudentDetail, getStudentList } from "../../actions/student";

// function
import { hourFormat, minuteFormat } from "../../utils/timeFormat";

// custom styles
import styles from "./styles.scss";
import getSemester from "../../utils/getSemester";
import Modal, { StudentEditorModal } from "../../components/Modal";

@withRouter
@connect((state) => ({
  semester: state.student.semester,
  student_list: state.student.student_list,
  data: state,
}))
class StudentList extends Component {
  componentDidMount() {
    this.handleStudentList();
  }

  state = {
    visible: false,
    student_detail: {},
  };

  render() {
    const { student_list = [], semester } = this.props;
    const { visible, student_detail } = this.state;

    return (
      <>
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
                  <td>
                    <button
                      type="button"
                      className="btn btn-submit"
                      onClick={() => this.handleEditStudent({ student_no: item.student_no, semester })}
                    >
                      編輯
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {visible && (
          <Modal title="編輯學生資料" onClose={this.handleCloseModal} footer={false}>
            <StudentEditorModal {...student_detail} onClose={this.handleCloseModal} />
          </Modal>
        )}
      </>
    );
  }

  handleStudentList = async () => {
    const { dispatch } = this.props;
    await getStudentList(dispatch);
  };

  handleEditStudent = async (data) => {
    const { dispatch } = this.props;
    const { student_no, semester } = data;
    const res = await getStudentDetail(dispatch, { student_no, semester });

    this.setState({ visible: true, student_detail: res });
  };

  handleCloseModal = () => {
    this.setState({ visible: false });
  };
}

StudentList.propTypes = {
  semester: PropTypes.string,
};

StudentList.defaultProps = {
  semester: getSemester(),
};

export default StudentList;
