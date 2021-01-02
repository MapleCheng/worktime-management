import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// actions
import { getWorktimeList } from "../../actions/worktime";

// functions
import { hourFormat, minuteFormat } from "../../utils/timeFormat";

// custom components
import WorktimeList from "./WorktimeList";

// custom styles
import styles from "./styles.scss";
import { getStudentDetail } from "../../actions/student";

@withRouter
@connect()
class Worktime extends Component {
  componentDidMount() {
    this.handleStudentDetail();
    this.handleWorktimeList();
  }

  state = {
    id: 0,
    class_name: "",
    student_name: "",
    student_no: "",
    total_minutes: 0,
    working_minutes: 0,
    remaining_minutes: 0,
  };

  render() {
    const { class_name, student_name, student_no, total_minutes, working_minutes, remaining_minutes } = this.state;

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
          <button type="button" className="btn btn-submit" onClick={this.handleWorktimeList}>
            更新列表
          </button>
        </div>

        <WorktimeList />
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
}

export default Worktime;
