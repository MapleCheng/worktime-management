import React, { Component } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import TimeKeeper from "react-timekeeper";
import moment from "moment";
import zhTW from "moment/locale/zh-tw";
import "react-datepicker/dist/react-datepicker.css";
import zh from "date-fns/locale/zh-TW";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// actions
import { newWorktime, updateWorktime } from "../../actions/worktime";

// functions
import { hourFormat, minuteFormat } from "../../utils/timeFormat";

// styles
import styles from "./styles.scss";

registerLocale("zh", zh);
moment.locale("zh-tw", zhTW);

@withRouter
@connect()
class WorktimeEditorModal extends Component {
  state = {
    showStartTimePicker: false,
    showEndTimePicker: false,
    work_date: new Date(this.props.work_date),
    start_time: `${hourFormat(this.props.start_time)}:${minuteFormat(this.props.start_time)}`,
    end_time: `${hourFormat(this.props.end_time)}:${minuteFormat(this.props.end_time)}`,
    work_time: this.props.work_time,
    worktime_message: `${hourFormat(this.props.work_time)}:${minuteFormat(this.props.work_time)}`,
  };

  render() {
    const {
      work_date,
      start_time,
      end_time,
      showStartTimePicker,
      showEndTimePicker,
      worktime_message,
      work_time,
    } = this.state;
    const {
      semester,
      class_name,
      student_name,
      student_no,
      total_minutes,
      className,
      remaining_minutes,
      work_time: before_work_time,
      onClose,
    } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <table className={className}>
          <thead>
            <tr>
              <th>學期</th>
              <th>班級</th>
              <th>姓名</th>
              <th>學號</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{semester}</td>
              <td>{class_name}</td>
              <td>{student_name}</td>
              <td>{student_no}</td>
            </tr>
          </tbody>
        </table>

        <div className="date-box">
          <div className="date">
            日期:
            <DatePicker
              locale="zh"
              dateFormat="yyyy/MM/dd"
              selected={work_date}
              onChange={(date) => {
                this.setState({
                  work_date: date,
                });
              }}
            />
          </div>
          <div className="week">{moment(work_date).format("dddd")}</div>
        </div>

        <div className="time-box">
          簽到時間
          {showStartTimePicker && (
            <TimeKeeper
              time={start_time}
              onChange={(time) => {
                this.handleSetTime("start_time", time.formatted24);
              }}
              hour24Mode
              switchToMinuteOnHourSelect
              closeOnMinuteSelect
              onDoneClick={this.handleCloseTimePicker}
            />
          )}
          <button type="button" onClick={() => this.handleOpenTimeKeeper("showStartTimePicker")}>
            {start_time}
            <span>
              <i className="far fa-clock"></i>
            </span>
          </button>
        </div>

        <div className="time-box">
          簽退時間
          {showEndTimePicker && (
            <TimeKeeper
              time={end_time}
              onChange={(time) => {
                this.handleSetTime("end_time", time.formatted24);
              }}
              hour24Mode
              switchToMinuteOnHourSelect
              closeOnMinuteSelect
              onDoneClick={this.handleCloseTimePicker}
            />
          )}
          <button type="button" onClick={() => this.handleOpenTimeKeeper("showEndTimePicker")}>
            {end_time}
            <span>
              <i className="far fa-clock"></i>
            </span>
          </button>
        </div>

        <table className={className}>
          <thead>
            <tr>
              <th>總時數</th>
              <th>工作時數</th>
              <th>剩餘時數</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {hourFormat(total_minutes)}時{minuteFormat(total_minutes)}分
              </td>
              <td>{worktime_message}</td>
              <td>
                {hourFormat(remaining_minutes - work_time + before_work_time)}時
                {minuteFormat(remaining_minutes - work_time + before_work_time)}分
              </td>
            </tr>
          </tbody>
        </table>

        <div className={styles.footer}>
          <button type="submit" className="btn btn-submit" key="ok">
            完成
          </button>
          <button type="button" className="btn btn-cancel" key="cancel" onClick={onClose}>
            關閉
          </button>
        </div>
      </form>
    );
  }

  handleSetDate = (date) => {
    this.setState({ work_date: date });
  };

  handleSetTime = (name, value) => {
    this.setState({ [name]: value }, this.handleWorkMinutes);
  };

  // 開啟TimeKeeper
  handleOpenTimeKeeper = (name) => {
    this.setState({
      showStartTimePicker: false,
      showEndTimePicker: false,
    });
    this.setState({
      [name]: !this.state[name],
    });
  };

  // 關閉TimeKeeper
  handleCloseTimePicker = () => {
    this.setState({
      showStartTimePicker: false,
      showEndTimePicker: false,
    });
  };

  // 計算服務時數
  handleWorkMinutes = () => {
    let { start_time, end_time } = this.state;

    let work_time, start_hour, start_minute, end_hour, end_minute, worktime_message;

    // 分離時分
    start_hour = parseInt(start_time.split(":")[0]) || 0;
    start_minute = parseInt(start_time.split(":")[1]) || 0;
    end_hour = parseInt(end_time.split(":")[0]) || 0;
    end_minute = parseInt(end_time.split(":")[1]) || 0;

    // 計算開始/結束時間
    start_time = start_hour * 60 + start_minute;
    end_time = end_hour * 60 + end_minute;

    // 計算工作時數
    work_time = end_time - start_time;

    if (end_time - start_time < 0) {
      worktime_message = "需修改簽退時間";
      work_time = 0;
    } else {
      worktime_message = `${hourFormat(work_time)}時${minuteFormat(work_time)}分`;
    }

    this.setState({
      worktime_message,
      work_time,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { id, semester, student_no, dispatch, onClose } = this.props;
    const { work_date } = this.state;
    let { start_time, end_time } = this.state;
    let start_hour, start_minute, end_hour, end_minute, worktime_message;

    // 分離時分
    start_hour = parseInt(start_time.split(":")[0]) || 0;
    start_minute = parseInt(start_time.split(":")[1]) || 0;
    end_hour = parseInt(end_time.split(":")[0]) || 0;
    end_minute = parseInt(end_time.split(":")[1]) || 0;

    // 計算開始/結束時間
    start_time = start_hour * 60 + start_minute;
    end_time = end_hour * 60 + end_minute;

    if (end_time - start_time < 0) {
      worktime_message = "需修改簽退時間";
      this.setState({ worktime_message });
      return;
    }

    let res;

    if (id === 0) {
      res = await newWorktime(dispatch, {
        semester,
        student_no,
        work_date: moment(work_date).format("YYYY-MM-DD"),
        start_time,
        end_time,
      });
    } else {
      res = await updateWorktime(dispatch, {
        id,
        semester,
        student_no,
        work_date: moment(work_date).format("YYYY-MM-DD"),
        start_time,
        end_time,
      });
    }

    if (res === 201) {
      onClose();
    } else if (res === 409) {
      alert("已有相同時段存在");
    }
  };
}

WorktimeEditorModal.propTypes = {
  id: PropTypes.number,
  semester: PropTypes.string,
  class_name: PropTypes.string,
  student_name: PropTypes.string,
  student_no: PropTypes.string,
  total_minutes: PropTypes.number,
  remaining_minutes: PropTypes.number,
  work_date: PropTypes.any,
  start_time: PropTypes.number,
  end_time: PropTypes.number,
  work_time: PropTypes.number,
};

WorktimeEditorModal.defaultProps = {
  id: 0,
  semester: "",
  class_name: "",
  student_name: "",
  student_no: "",
  total_minutes: 0,
  remaining_minutes: 0,
  work_date: new Date(),
  start_time: parseInt(moment().format("H")) * 60 + parseInt(moment().format("m")),
  end_time: parseInt(moment().format("H")) * 60 + parseInt(moment().format("m")),
  work_time: 0,
};

export default WorktimeEditorModal;
