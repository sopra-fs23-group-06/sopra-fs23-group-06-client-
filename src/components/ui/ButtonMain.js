import "styles/ui/MainButton.scss";
//import trophyIcon from "styles/images/trophyIcon.svg";
import trophyIcon from "styles/images/trophy.png";


export const ButtonPurpleMain = props => (
  <button
    {...props}
    style={{width: props.width, ...props.style}}
    className={`button-purple-main ${props.className}`}>
    {props.children}
  </button>
);

export const ButtonWhiteMain = props => (
    <button
        {...props}
        style={{width: props.width, ...props.style}}
        className={`button-white-main ${props.className}`}>
      {props.children}
    </button>
);

export const ButtonPurpleLobby = props => (
    <button
        {...props}
        style={{width: props.width, ...props.style}}
        className={`button-purple-lobby ${props.className}`}>
        {props.children}
    </button>
);

export const ButtonWhiteLobby = props => (
    <button
        {...props}
        style={{width: props.width, ...props.style}}
        className={`button-white-lobby ${props.className}`}>
        {props.children}
    </button>
);

export const ButtonPurpleList = props => (
    <button
        {...props}
        style={{width: props.width, ...props.style}}
        className={`button-purple-list ${props.className}`}>
        {props.children}
    </button>
);

export const ButtonWhiteList = props => (
    <button
        {...props}
        style={{width: props.width, ...props.style}}
        className={`button-white-list ${props.className}`}>
        {props.children}
    </button>
);

export const ButtonKick = props => (
    <button
        {...props}
        style={{width: props.width, ...props.style}}
        className={`button-kick ${props.className}`}>
        {props.children}
    </button>
);

export const ButtonScoreboard = props => (
    <button
      {...props}
      style={{ position: "absolute", top: 0, right: 10 }}
      className="button-scoreboard"
    >
      <img className="icon" src={trophyIcon} alt="Trophy Icon" />
    </button>
  );

export const ButtonRules = props => (
    <button
        {...props}
        style={{width: props.width, ...props.style}}
        className={`button-rules ${props.className}`}>
        {props.children}
    </button>
);