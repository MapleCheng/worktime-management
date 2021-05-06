import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// function
import { hourFormat, minuteFormat } from "../../utils/timeFormat";
import { extendStudent, getBeforeStudentList } from "../../actions/student";

@withRouter
@connect((state) => ({
  semester: state.student.semester,
  before_student_list: state.student.before_student_list,
}))
class ExtendStudentModal extends Component {
  componentDidMount() {
    this.handleBeforeStudentList();
  }

  render() {
    const { before_student_list, className } = this.props;
    return (
      <div>
        <table className={className}>
          <thead>
            <tr>
              <th>班級</th>
              <th>姓名</th>
              <th>學號</th>
              <th>需服務時數</th>
              <th>已服務時數</th>
              <th>剩餘服務時數</th>
              <th>繼承服務時數</th>
            </tr>
          </thead>
          <tbody>
            {before_student_list.map((item) => {
              return (
                <tr key={item.id}>
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
                      onClick={() => {
                        this.handleExtend({ id: item.id });
                      }}
                    >
                      繼承時數
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  // 取得前學期學生
  handleBeforeStudentList = async () => {
    const { dispatch, semester } = this.props;
    await getBeforeStudentList(dispatch, { semester });
  };

  // 繼承學生
  handleExtend = async ({ id }) => {
    const { dispatch, semester } = this.props;

    await extendStudent(dispatch, { id, semester });

    this.handleBeforeStudentList();
  };
}

ExtendStudentModal.propTypes = {};

export default ExtendStudentModal;
