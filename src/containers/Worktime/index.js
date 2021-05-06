import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// actions
import { getWorktimeList } from "../../actions/worktime";
import { getStudentDetail } from "../../actions/student";

// functions
import { hourFormat, minuteFormat } from "../../utils/timeFormat";

// custom components
import WorktimeList from "./WorktimeList";
import Modal, { WorktimeEditorModal, StudentEditorModal } from "../../components/Modal";

// custom styles
import styles from "./styles.scss";

@withRouter
@connect()
class Worktime extends Component {
  componentDidMount() {
    this.handleStudentDetail();
    this.handleWorktimeList();
  }

  state = {
    semester: "",
    class_name: "",
    student_name: "",
    student_no: "",
    total_minutes: 0,
    working_minutes: 0,
    remaining_minutes: 0,
    visible: false,
    modal_params: {},
  };

  render() {
    const {
      class_name,
      student_name,
      student_no,
      total_minutes,
      working_minutes,
      remaining_minutes,
      visible,
      modal_params,
    } = this.state;

    return (
      <div>
        <table className={styles.worktime_table_list}>
          <thead>
            <tr>
              <th>班級</th>
              <th>姓名</th>
              <th>學號</th>
              <th>需服務時數</th>
              <th>已服務時數</th>
              <th>剩餘服務時數</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{class_name}</td>
              <td>{student_name}</td>
              <td>{student_no}</td>
              <td>
                {hourFormat(total_minutes)}時{minuteFormat(total_minutes)}分
              </td>
              <td>
                {hourFormat(working_minutes)}時{minuteFormat(working_minutes)}分
              </td>
              <td>
                {hourFormat(remaining_minutes)}時{minuteFormat(remaining_minutes)}分
              </td>
            </tr>
          </tbody>
        </table>

        <div className={styles["table-func"]}>
          <button className="btn btn-cancel" onClick={this.handleGoBack}>
            返回學生列表
          </button>
          <button type="button" className="btn btn-submit" onClick={this.handleEditStudentModal}>
            修改學生資料
          </button>
          <button type="button" className="btn btn-submit" onClick={this.handleNewWorkTimeModal}>
            新增時數
          </button>
          <button type="button" className="btn btn-submit" onClick={this.handleWorktimeList}>
            更新列表
          </button>
        </div>

        <WorktimeList {...this.state} onCloseModal={this.handleCloseModal} />

        {visible === "editStudent" && (
          <Modal title="編輯學生資料" onClose={this.handleCloseModal}>
            <StudentEditorModal {...modal_params} onClose={this.handleCloseModal} />
          </Modal>
        )}

        {visible === "new" && (
          <Modal title="新增時數" onClose={this.handleCloseModal}>
            <WorktimeEditorModal {...modal_params} onClose={this.handleCloseModal} />
          </Modal>
        )}
      </div>
    );
  }

  // go back
  handleGoBack = async () => {
    const { history } = this.props;

    history.push("/");
  };

  // 取得學生詳細資料
  handleStudentDetail = async () => {
    const { dispatch, match } = this.props;
    const { student_no, semester } = match.params;

    const student_detail = await getStudentDetail(dispatch, { student_no, semester });

    this.setState({ ...student_detail });
  };

  // 取得服務時數列表
  handleWorktimeList = async () => {
    const { dispatch, match } = this.props;
    const { student_no, semester } = match.params;

    await getWorktimeList(dispatch, { student_no, semester });
  };

  // 開啟修改學生詳細資料Modal
  handleEditStudentModal = async (data) => {
    const { dispatch } = this.props;
    const { semester, student_no } = this.state;

    const modal_params = await getStudentDetail(dispatch, { student_no, semester });

    this.setState({ visible: "editStudent", modal_params });
  };

  // 開啟新增時數modal
  handleNewWorkTimeModal = async () => {
    const {
      semester,
      class_name,
      student_name,
      student_no,
      total_minutes,
      working_minutes,
      remaining_minutes,
    } = this.state;
    let modal_params = {};

    modal_params = {
      semester,
      class_name,
      student_name,
      student_no,
      total_minutes,
      working_minutes,
      remaining_minutes,
      className: styles.worktime_table_list,
    };
    this.setState({ visible: "new", modal_params });
  };

  handleCloseModal = () => {
    this.setState({ visible: false, modal_params: {} });

    this.handleStudentDetail();
    this.handleWorktimeList();
  };
}

export default Worktime;
