import "../assets/css/Landing.css";
import user from "../assets/images/user.jpg";
import WelcomeText from "./Welcome";
import Register from "../pages/Register";
import Login from "../pages/Login";
import SendIcon from "@mui/icons-material/Send";
const MobileHeader = () => {
  return (
    <div className="head">
      <div className="notch"></div>
      <div className="profilebox">
        <div className="left">
          <i className="fa fa-angle-left" aria-hidden="true"></i>
          <div className="profile">
            <img src={user} alt="dp" />
            <div className="pdetail">
              <h3>Ahmed Khalafallah</h3>
              <p>Available to Talk</p>
            </div>
          </div>
        </div>
        <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
      </div>
    </div>
  );
};
const SendBox = () => {
  return (
    <div className="sendbox">
      <input type="text" placeholder="Type a message…" />
      <button className="submit">
        <SendIcon fontSize="10" />
      </button>
    </div>
  );
};

const Attribution = () => {
  return (
    <div className="attribution">
      Challenge by{" "}
      <a
        href="https://www.linkedin.com/in/ahmed-khalafallah/"
        target="_blank"
        rel="noreferrer"
      >
        Ahmed Khalafallah
      </a>
      .<br />
      Coded by{" "}
      <a
        href="https://www.linkedin.com/in/ahmed-khalafallah/"
        target="_blank"
        rel="noreferrer"
      >
        Ahmed Khalafallah
      </a>
      .
    </div>
  );
};

const LandingPage = ({ isWelcome, isRegister, isLogin }) => {
  return (
    <div className="maindiv">
      <div className="mobile">
        <MobileHeader />
        <div className="chatbox"></div>
        <SendBox />
      </div>
      {isWelcome && <WelcomeText />}
      {isRegister && <Register />}
      {isLogin && <Login />}
      <Attribution />
    </div>
  );
};

export default LandingPage;
