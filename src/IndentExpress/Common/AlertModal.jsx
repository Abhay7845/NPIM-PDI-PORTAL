import React from "react";

const AlertModal = (props) => {
  const Capital = (word) => {
    if (word === "danger") {
      word = "Sorry";
    } else if (word === "success") {
      word = "Congratulations";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <>
      {/* <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button> */}
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              {props.alert && (
                <div
                  className={`alert alert-${props.alert.type} fade show`}
                  role="alert"
                >
                  <strong>{Capital(props.alert.type)}! </strong>
                  {props.alert.msg}
                </div>
              )}
            </div>
            <div className="d-flex justify-content-end mx-2 my-2">
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlertModal;
