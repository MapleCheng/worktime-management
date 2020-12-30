const clickModal = (event, modalCool, notHide, toggle) => {
  if (modalCool) {
    let input = event.target;
    let { className, tagName } = input;
    try {
      while (tagName !== "BODY" && className.split(" ")[0] !== notHide) {
        try {
          ({ className, tagName } = input);
        } catch (e) {
          input = event.target;
        }
        input = input.parentNode;
      }
      if (tagName === "BODY") {
        toggle();
      }
    } catch (err) {
      return;
    }
  }
};

export default clickModal;
