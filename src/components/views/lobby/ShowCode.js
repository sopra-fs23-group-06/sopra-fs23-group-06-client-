import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import 'styles/views/Lobby.scss';
import BaseContainer from "components/ui/BaseContainer";
import HeaderLobby from "components/views/lobby/HeaderLobby";
import PropTypes from "prop-types";
import {ButtonPurpleLobby, ButtonRules} from "../../ui/ButtonMain";
import {JitsiMeeting} from "@jitsi/react-sdk";
import RuleBook from "../../ui/RuleBook";

const FormField = props => {


    return (
        <div className="lobby field">
            <label className="lobby label">
                {props.label}
            </label>
            <input
                className="lobby input"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.number,
    onChange: PropTypes.func
};
const ShowCode = () => {
    const history = useHistory();
    const lobbyCode = getLobby();
    const [rulesOpen, setRulesOpen] = useState(false)

    function getLobby() { //identifies lobby based on URL
        const url = window.location.pathname
        const split = url.split("/")
        return split[split.length-2]
    }


    function goToLobby() { //go to lobby view
        history.push('/host/lobby/'+lobbyCode)
    }

    function openRules() {
        setRulesOpen(true)
    }

    function closeRules() {
        setRulesOpen(false)
    }

    return (

    <BaseContainer>
        <JitsiMeeting
            configOverwrite = {{
                startWithAudioMuted: false,
                hiddenPremeetingButtons: ['microphone'],
                prejoinPageEnabled: false,
                startAudioOnly: false,
                startWithVideoMuted: true,
                toolbarButtons: ['microphone']
            }}
            interfaceConfigOverwrite = {{
                SHOW_JITSI_WATERMARK: false,
                SHOW_WATERMARK_FOR_GUESTS: false,
                SHOW_BRAND_WATERMARK: false,
                SHOW_CHROME_EXTENSION_BANNER: false,
                TOOLBAR_ALWAYS_VISIBLE: true
            }}
            userInfo = {{
                displayName: localStorage.getItem("username")
            }}
            roomName = { "SkullKingLobby" + getLobby() }
            getIFrameRef = { node => {node.style.height = '50px'; node.style.width = '50px';}}
        />
      <HeaderLobby/>
          <div className="lobby container">
              <div className="lobby form">
                  <div className= "lobby label">
                      Lobby Code:
                  </div>
              <div className= "lobby code">
                  {lobbyCode}
              </div>
                  <div className="lobby button-container1">
                  <ButtonPurpleLobby
                      width="75%"
                      onClick={() => goToLobby()}
                      >
                      View Lobby
                  </ButtonPurpleLobby>
                  </div>
              </div>
          </div>
        <ButtonRules
            className= "bottom"
            onClick={ ()=>{openRules()}}
        >Game Rules
        </ButtonRules>
        {rulesOpen && (
            <RuleBook onClick={closeRules} />
        )}
    </BaseContainer>
  );
};


export default ShowCode;
