import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import zhTW from "moment/locale/zh-tw";
import { withRouter } from "react-router-dom";

// custom components
import Modal, { DeleteModal, WorktimeEditorModal } from "../../components/Modal";

// actions
import { deleteWorktime, getWorktimeDetail } from "../../actions/worktime";

// functions
import { hourFormat, minuteFormat } from "../../utils/timeFormat";

// styles
import styles from "./styles.scss";

moment.locale("zh-tw", zhTW);

@withRouter
@connect((state) => ({
  worktime_list: state.worktime.worktime_list,
}))
class WorktimeList extends Component {
  state = {
    visible: false,
    modal_params: {},
  };

  render() {
    const { worktime_list } = this.props;
    const { visible, modal_params } = this.state;

    return (
      <div>
        <table className={styles.worktime_table_list}>
          <thead>
            <tr>
              <th>日期</th>
              <th>星期</th>
              <th>簽到時間</th>
              <th>簽退時間</th>
              <th>服務時數</th>
              <th>功能</th>
            </tr>
          </thead>
          <tbody>
            {worktime_list.map((item, key) => {
              return (
                <tr key={key}>
                  <td>{moment(item.work_date).format("YYYY/MM/DD")}</td>
                  <td>{moment(item.work_date).format("dddd")}</td>
                  <td>{`${hourFormat(item.start_time)} : ${minuteFormat(item.start_time)}`}</td>
                  <td>{`${hourFormat(item.end_time)} : ${minuteFormat(item.end_time)}`}</td>
                  <td>
                    {`${hourFormat(item.end_time - item.start_time)}時`}
                    {`${minuteFormat(item.end_time - item.start_time)}分`}
                  </td>
                  <td>
                    <div className="td-func">
                      <button
                        type="button"
                        className="btn btn-submit"
                        onClick={() => this.handleEditModal({ id: item.id })}
                      >
                        編輯
                      </button>
                      <button
                        type="button"
                        className="btn btn-red"
                        onClick={() =>
                          this.handleDeleteModal({
                            id: item.id,
                            work_date: item.work_date,
                            start_time: item.start_time,
                            end_time: item.end_time,
                          })
                        }
                      >
                        刪除
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {visible === "edit" && (
          <Modal title="編輯時數" onClose={this.handleCloseModal}>
            <WorktimeEditorModal {...modal_params} onClose={this.handleCloseModal} />
          </Modal>
        )}
        {visible === "delete" && (
          <Modal title="刪除時數" onClose={this.handleCloseModal}>
            <DeleteModal
              {...modal_params}
              onClose={this.handleCloseModal}
              onDelete={this.handleDelete}
            />
          </Modal>
        )}
      </div>
    );
  }

  // 編輯modal
  handleEditModal = async (params) => {
    const { dispatch } = this.props;

    const detail = await getWorktimeDetail(dispatch, params);

    const {
      semester,
      class_name,
      student_name,
      student_no,
      total_minutes,
      remaining_minutes,
    } = this.props;

    let modal_params = {
      semester,
      class_name,
      student_name,
      student_no,
      total_minutes,
      remaining_minutes,
      className: styles.worktime_table_list,
      ...detail,
    };

    this.setState({ visible: "edit", modal_params });
  };

  // 刪除modal
  handleDeleteModal = (params) => {
    const { work_date, start_time, end_time } = params;

    let modal_params = {
      ...params,
      description: (
        <>
          <h2 style={{ margin: "5px 0" }}>{`${moment(work_date).format("YYYY/MM/DD")}`}</h2>
          <h3 style={{ margin: "5px 0" }}>
            {hourFormat(start_time)}:{minuteFormat(start_time)}
            {` ~ `}
            {hourFormat(end_time)}:{minuteFormat(end_time)}
          </h3>
          <h2 style={{ color: "red", margin: "10px 0" }}>一經刪除將無法回復</h2>
          <h2 style={{ margin: "5px 0" }}>確定要刪除嗎?</h2>
        </>
      ),
    };

    this.setState({ visible: "delete", modal_params });
  };

  handleCloseModal = () => {
    this.setState({ visible: false });

    this.props.onCloseModal();
  };

  // 刪除學生時數
  handleDelete = async (params) => {
    const { dispatch, match } = this.props;
    const { student_no, semester } = match.params;

    await deleteWorktime(dispatch, { ...params, student_no, semester });

    this.handleCloseModal();
  };
}

WorktimeList.propTypes = {
  onCloseModal: PropTypes.func,
};

export default WorktimeList;
