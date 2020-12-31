import React, { Component } from "react";
import { connect } from "react-redux";

// actions
import { getSemesterList } from "../../actions/semester";
import { getStudentList } from "../../actions/student";
import Modal, { StudentEditorModal } from "../../components/Modal";

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

  state = {
    newVisible: false,
  };

  render() {
    const { semester, semester_list } = this.props;
    const { newVisible } = this.state;

    return (
      <div>
        {/* header function */}
        <div className={styles["table-func"]}>
          <button type="button" className="btn btn-submit" onClick={this.handleNewModal}>
            新增學生
          </button>

          <button type="button" className="btn btn-submit" onClick={() => this.handleStudentList()}>
            更新列表
          </button>

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

        {newVisible && (
          <Modal title="編輯學生資料" onClose={this.handleCloseModal}>
            <StudentEditorModal onClose={this.handleCloseModal} />
          </Modal>
        )}
      </div>
    );
  }

  // 開啟新增學生Modal
  handleNewModal = async () => {
    this.setState({ newVisible: true });
  };

  // 關閉Modal
  handleCloseModal = () => {
    this.setState({ newVisible: false });
  };

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
