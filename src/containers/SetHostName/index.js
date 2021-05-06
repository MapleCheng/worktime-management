import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import styles from "./styles.scss";

// custom params
import { getHostName } from "../../utils/HostName";

const defHostName = getHostName();

@withRouter
class SetHostName extends Component {
  state = {
    hostname: getHostName(),
    password: "",
    auth: false,
  };

  render() {
    const { auth, hostname, password } = this.state;
    if (auth) {
      return (
        <form className={styles.container} onSubmit={this.handleSubmit}>
          <h2 style={{ margin: 0 }}>伺服器IP設定</h2>
          <label style={{ width: 300, padding: "20px 0" }}>
            <input
              name="hostname"
              value={hostname}
              placeholder="伺服器IP"
              onChange={this.handleInput}
              autoComplete="off"
            />
          </label>

          <div style={{ width: 300, display: "flex", justifyContent: "space-evenly" }}>
            <button type="submit" className="btn btn-submit">
              設定
            </button>

            {defHostName !== "" && (
              <button type="button" className="btn btn-cancel" onClick={this.handleCancel}>
                取消
              </button>
            )}
          </div>
        </form>
      );
    } else {
      return (
        <form className={styles.container} onSubmit={this.handleAuth}>
          <h2 style={{ margin: 0 }}>身分驗證</h2>
          <label style={{ width: 300, padding: "20px 0" }}>
            <input
              name="password"
              type="password"
              value={password}
              placeholder="請輸入系統密碼"
              onChange={this.handleInput}
              autoComplete="off"
            />
          </label>

          <div style={{ width: 300, display: "flex", justifyContent: "space-evenly" }}>
            <button type="submit" className="btn btn-submit">
              驗證
            </button>
            {defHostName !== "" && (
              <button type="button" className="btn btn-cancel" onClick={this.handleCancel}>
                返回
              </button>
            )}
          </div>
        </form>
      );
    }
  }

  handleInput = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleCancel = () => {
    const { history } = this.props;

    if (getHostName() !== "") {
      history.push("/");
    }
  };

  handleAuth = (e) => {
    e.preventDefault();

    const { password } = this.state;

    if (password === "work5223") {
      this.setState({ auth: true });
    } else {
      this.setState({ auth: false, password: "" });
      alert("密碼錯誤");
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("hostname", this.state.hostname);

    const { history } = this.props;

    history.push("/");
    history.go(0);
  };
}

SetHostName.propTypes = {};

export default SetHostName;
