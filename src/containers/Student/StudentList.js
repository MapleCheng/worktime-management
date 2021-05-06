import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// actions
import { deleteStudent, getStudentDetail } from "../../actions/student";

// function
import { hourFormat, minuteFormat } from "../../utils/timeFormat";

// custom styles
import styles from "./styles.scss";
import getSemester from "../../utils/getSemester";
import Modal, { DeleteModal, StudentEditorModal } from "../../components/Modal";

@withRouter
@connect((state) => ({
  semester: state.student.semester,
  student_list: state.student.student_list,
  data: state,
}))
class StudentList extends Component {
  state = {
    editorVisible: false,
    deleteVisible: false,
    editModalParams: {},
    deleteModalParams: {},
  };

  render() {
    const { student_list = [] } = this.props;
    const { editorVisible, editModalParams, deleteVisible, deleteModalParams } = this.state;

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
                      onClick={() => this.handleStudentDetail({ student_no: item.student_no })}
                    >
                      查看
                    </button>
                    <button
                      type="button"
                      className="btn btn-submit"
                      onClick={() => this.handleEditModal({ student_no: item.student_no })}
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      className="btn btn-red"
                      onClick={() => this.handleDeleteModal({ id: item.id, student_name: item.student_name })}
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {editorVisible && (
          <Modal title="編輯學生資料" onClose={this.handleCloseModal}>
            <StudentEditorModal {...editModalParams} onClose={this.handleCloseModal} />
          </Modal>
        )}
        {deleteVisible && (
          <Modal title="刪除學生" onClose={this.handleCloseModal}>
            <DeleteModal {...deleteModalParams} onClose={this.handleCloseModal} onDelete={this.handleDelete} />
          </Modal>
        )}
      </>
    );
  }

  handleStudentDetail = async ({ student_no }) => {
    const { history, semester } = this.props;

    history.push(`/student/${semester}/${student_no}`);
  };

  handleEditModal = async (data) => {
    const { dispatch, semester } = this.props;
    const { student_no } = data;
    const res = await getStudentDetail(dispatch, { student_no, semester });

    this.setState({ editorVisible: true, editModalParams: res });
  };
  handleDeleteModal = async (data) => {
    this.setState({
      deleteVisible: true,
      deleteModalParams: {
        ...data,
        description: (
          <>
            <h2 style={{ color: "red", margin: "10px 0" }}>刪除學生將一併刪除本學期服務時數</h2>
            <h2>確定要刪除 "{data.student_name}" 嗎?</h2>
          </>
        ),
      },
    });
  };

  handleCloseModal = () => {
    this.setState({ editorVisible: false, deleteVisible: false });
  };

  handleDelete = async ({ id }) => {
    const { dispatch, semester } = this.props;

    const res = await deleteStudent(dispatch, {
      semester,
      id,
    });

    if (res === 204) {
      this.handleCloseModal();
    }
  };
}

StudentList.propTypes = {
  semester: PropTypes.string,
};

StudentList.defaultProps = {
  semester: getSemester(),
};

export default StudentList;
