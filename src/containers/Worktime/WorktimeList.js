import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import zhTW from "moment/locale/zh-tw";

// functions
import { hourFormat, minuteFormat } from "../../utils/timeFormat";

// styles
import styles from "./styles.scss";

moment.locale("zh-tw", zhTW);

@connect((state) => ({
  worktime_list: state.worktime.worktime_list,
}))
class WorktimeList extends Component {
  render() {
    const { worktime_list } = this.props;

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
                        onClick={() => this.handleDeleteModal({ id: item.id })}
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
      </div>
    );
  }

  // 編輯
  handleEditModal = (params) => {
    console.log(params);
  };

  handleDeleteModal = (params) => {
    console.log(params);
  };
}

WorktimeList.propTypes = {};

export default WorktimeList;
