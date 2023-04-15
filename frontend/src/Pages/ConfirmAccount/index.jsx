import "../../Styles/confirmForgetReset.css";

const ConfirmAccount = () => {
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
              <h1>Just one more step...</h1>
              <p>
                Thanks for signing up! We just need to verify your email address
                to complete your account setup. Check your email and click on
                the verification link to get started.
              </p>
              <p>You may need to check your spam or junk folder.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmAccount;
