import React, { Component } from "react";
import PropTypes from "prop-types";

// custom components
import styles from "./styles.scss";

import _StudentEditorModal from "./StudentEditorModal";
import _DeleteModal from "./DeleteModal";
import _ExtendStudentModal from "./ExtendStudentModal";
import _WorktimeEditorModal from "./WorktimeEditorModal";

export const StudentEditorModal = _StudentEditorModal;
export const DeleteModal = _DeleteModal;
export const ExtendStudentModal = _ExtendStudentModal;
export const WorktimeEditorModal = _WorktimeEditorModal;

class Modal extends Component {
  state = {
    visible: this.props.visible,
  };
  render() {
    const { title, footer } = this.props;
    const { visible } = this.state;

    return (
      <div
        className={`${styles.modal}${visible ? "" : ` ${styles.hide}`}`}
        onClick={this.handleClickModal}
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <h3>{title}</h3>
            <i className="fas fa-times" onClick={this.handleCloseModal}></i>
          </div>
          <div className={styles.main}>{this.props.children}</div>
          {footer && (
            <div className={styles.footer}>
              {footer.map((item) => {
                if (item === "ok") {
                  return (
                    <button type="button" className="btn btn-submit" key="ok">
                      完成
                    </button>
                  );
                } else if (item === "cancel") {
                  return (
                    <button
                      type="button"
                      className="btn btn-cancel"
                      key="cancel"
                      onClick={this.handleCloseModal}
                    >
                      關閉
                    </button>
                  );
                } else {
                  return item;
                }
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  handleClickModal = (e) => {
    if (e.target.className === styles.modal) {
      this.handleCloseModal();
    }
  };

  handleCloseModal = () => {
    const { onClose } = this.props;

    this.setState({ visible: false });

    setTimeout(onClose, 300);
  };
}

Modal.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool,
  onFinish: PropTypes.func,
  onClose: PropTypes.func,
};

Modal.defaultProps = {
  title: "",
  visible: true,
  onFinish: () => {},
  onClose: () => {},
  footer: false,
};

export default Modal;
