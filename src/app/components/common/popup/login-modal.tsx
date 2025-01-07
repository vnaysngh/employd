import React from "react";
import Image from "next/image";
import Link from "next/link";

const LoginModal = () => {
  return (
    <div
      className="modal fade"
      id="loginModal"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen modal-dialog-centered">
        <div className="container">
          <div className="user-data-form modal-content">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <div className="text-center">
              <h2>Get Started</h2>
              <p>Choose how you'd like to continue</p>
            </div>
            <div className="form-wrapper m-auto w-100">
              <div className="row">
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn-eleven fw-500 tran3s d-block mt-20 w-50 w-sm-100 m-auto"
                  >
                    Login
                  </button>
                </div>
              </div>
              <div className="d-flex align-items-center mt-30 mb-10">
                <div className="line"></div>
                <span className="pe-3 ps-3">OR</span>
                <div className="line"></div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <a
                    href="#"
                    className="social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10"
                  >
                    <div className="sign-up-buttons text-center">
                      <h3>Sign up as Talent</h3>
                      <div>Get verified & explore opportunities</div>
                    </div>
                  </a>
                </div>
                <div className="col-md-6">
                  <a
                    href="#"
                    className="social-use-btn d-flex align-items-center justify-content-center tran3s w-100 mt-10"
                  >
                    <div className="sign-up-buttons text-center">
                      <h3>Sign up as Employer</h3>
                      <div>Verify profiles & hire with trust</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
