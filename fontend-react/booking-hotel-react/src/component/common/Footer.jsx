import React from "react";

const FooterComponent = () => {
  return (
    <footer>
      <span className="my-footer">
        October Hotel | All Rights Reserved &copy; {new Date().getFullYear()}
      </span>
    </footer>
  );
};

export default FooterComponent;
