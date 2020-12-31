import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import styles from "./styles.scss";

const DescriptionStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

class DeleteModal extends Component {
  render() {
    const { description, onClose } = this.props;
    return (
      <>
        <DescriptionStyled>{description}</DescriptionStyled>

        <div className={styles.footer}>
          <button type="button" className="btn btn-cancel" onClick={onClose}>
            關閉
          </button>
          <button type="button" className="btn btn-red" onClick={this.handleDelete}>
            刪除
          </button>
        </div>
      </>
    );
  }

  handleDelete = () => {
    const { onDelete, id } = this.props;

    onDelete({ id });
  };
}

DeleteModal.propTypes = {
  onDelete: PropTypes.func,
  onClose: PropTypes.func,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

DeleteModal.defaultProps = {
  onDelete: () => {},
  onClose: () => {},
};

export default DeleteModal;
