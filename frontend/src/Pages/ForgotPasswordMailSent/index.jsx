import "../../Styles/confirmForgetReset.css";

const ForgotPasswordMailSent = () => {
  return (
    <>
      <div className="ConfirmAccountContainer">
        <div>
          <div id="mailOpeningDiv">
            <img
              width={"100%"}
              src="/mailOpening1.png"
              className="mailOpeningImage"
              alt="mailOpeningImage"
            />
          </div>
          <div className="mailOpeningRightDiv">
            <div className="mailOpeningHeading">
              <h1>Forgot your password?</h1>
              <p>
                Don't worry! We have sent an verification email to your email
                account. You just need to check your email and click on the
                'Reset Password' button to reset you password.
              </p>
              <p>You may need to check your spam or junk folder.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordMailSent;
