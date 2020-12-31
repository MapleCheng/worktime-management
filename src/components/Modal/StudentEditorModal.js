import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// actions
import { newStudent, updateStudent } from "../../actions/student";

// function
import getSemester from "../../utils/getSemester";

// styles
import styles from "./styles.scss";

const InputTime = styled.input`
  width: 4rem !important;
  text-align: right;
`;

// 暫存 alert Timeout
let tempAlertTimeOut;

@connect()
class StudentEditorModal extends Component {
  state = {
    class_name: this.props.class_name,
    student_name: this.props.student_name,
    student_no: this.props.student_no,
    total_h: Math.floor(this.props.total_minutes / 60),
    total_m: this.props.total_minutes % 60,
    alert: [],
  };

  componentWillUnmount() {
    if (tempAlertTimeOut) {
      clearTimeout(tempAlertTimeOut);
    }
  }

  render() {
    const { semester, onClose } = this.props;
    const { class_name, student_name, student_no, total_h, total_m, alert } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        {alert}
        <strong>
          民國{semester.split("-")[0]}學年度-第{semester.split("-")[1]}學期{" "}
        </strong>
        <label>
          <strong>班級:</strong>
          <input type="text" name="class_name" value={class_name} onChange={this.handleInputText} />
        </label>
        <label>
          <strong>姓名:</strong>
          <input type="text" name="student_name" value={student_name} onChange={this.handleInputText} />
        </label>
        <label>
          <strong>學號:</strong>
          <input type="text" name="student_no" value={student_no} onChange={this.handleInputText} />
        </label>
        <label>
          <strong>需服務時數:</strong>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <InputTime type="text" name="total_h" value={total_h} onChange={this.handleInputText} />時
            <InputTime type="text" name="total_m" value={total_m} onChange={this.handleInputText} />分
          </div>
        </label>
        <div className={styles.footer}>
          <button type="submit" className="btn-submit" key="ok">
            完成
          </button>
          <button type="button" className="btn-cancel" key="cancel" onClick={onClose}>
            關閉
          </button>
        </div>
      </form>
    );
  }

  // 輸入事件
  handleInputText = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // 送出表單
  handleSubmit = async (e) => {
    e.preventDefault();

    const { id, dispatch, onClose, semester } = this.props;
    const { class_name, student_name, student_no, total_h, total_m } = this.state;

    // 判斷輸入內容
    if (class_name === "" || student_name === "" || student_no === "" || total_h === "" || total_m === "") {
      this.setState({ alert: <p className="alert-red">請勿留空</p> });
      return;
    } else if (student_no.length !== 10) {
      this.setState({ alert: <p className="alert-red">輸入的資料有錯</p> });
      return;
    }

    if (id === 0) {
      // 新增學生
      const res = await newStudent(dispatch, {
        id,
        semester,
        class_name,
        student_name,
        student_no,
        total_h,
        total_m,
      });

      if (res === 201) {
        onClose();
      }
    } else {
      // 修改學生
      const res = await updateStudent(dispatch, {
        id,
        semester,
        class_name,
        student_name,
        student_no,
        total_h,
        total_m,
      });

      if (res === 201) {
        this.setState({ alert: <p className="alert-green">修改成功</p> });
      }

      // 設置 Alert 在5秒後結束提示
      tempAlertTimeOut = setTimeout(() => {
        this.setState({ alert: [] });
      }, 5000);
    }
  };
}

StudentEditorModal.defaultProps = {
  id: 0,
  onClose: () => {},
  student_name: "",
  student_no: "",
  class_name: "",
  semester: getSemester(),
  total_minutes: 0,
};
StudentEditorModal.protoTypes = {
  id: PropTypes.number,
  onClose: PropTypes.func,
  class_name: PropTypes.string,
  student_name: PropTypes.string,
  student_no: PropTypes.string,
  semester: PropTypes.string,
  total_minutes: PropTypes.number,
};
export default StudentEditorModal;
