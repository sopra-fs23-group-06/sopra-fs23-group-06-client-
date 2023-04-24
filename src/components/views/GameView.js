import React, { useState } from 'react';
import 'styles/views/GameView.scss';
import BaseContainer from "components/ui/BaseContainer";
import PlayerHand from 'components/ui/PlayerHand';
import OtherPlayers from 'components/ui/OtherPlayers';
import MakeBid from 'components/ui/MakeBid';
import { api } from "../../helpers/api";
import PlayedCardsStack from 'components/ui/PlayedCardsStack';
import User from "../../models/User";
import {JitsiMeeting} from "@jitsi/react-sdk";




const GameView = props => {
  //seperate player from other players while considering the order

  //DATA JUST FOR TEST PURPOSE

  const otherPlayers = [
    { name: 'Player 2', bid: '0/1' },
    { name: 'Player 3', bid: '0/0' },
    { name: 'Player 4', bid: '0/1' },
    { name: 'Player 5', bid: '0/1' },
    { name: 'Player 6', bid: '0/0' },

  ];
  const playerHand = ['black/Black1', 'special/Skull_King', 'red/Red1', 'special/Escape', 'special/Scary_Mary', 'black/Black11', 'red/Red9', 'special/Badeye_Joe'];
  const playedCards = ['black/Black6', 'red/Red7', 'yellow/Yellow13'];
  const roundNumber = 8;
  const [bid, setBid] = useState("");
  const [tricks, setTricks] = useState("")
  const [showPopup, setShowPopup] = useState(true);


  const handleConfirm = async (bid) => {
    const user = new User();
    user.id = localStorage.getItem("userId");
    user.bid = bid;
    const response =await api.put(`/games/${localStorage.getItem("lobbyCode")}/bidHandler`, user);
    const bidIsSet = new User(response.data)
    setBid(bidIsSet.bid);
    setTricks(0)
    setShowPopup(false);

    // Send bid to server

  };

  /*const handleOpenPopup = () => {
    setShowPopup(true);
  };*/

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  function divider() {
    if (showPopup){return ""}
    return "/";
  }

  function getGame() { //identifies lobby based on URL
    const url = window.location.pathname
    const split = url.split("/")
    return split[split.length - 1]
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
          roomName = { "SkullKingLobby" + getGame() }
          getIFrameRef = { node => {node.style.height = '50px'; node.style.width = '50px';}}
      />
      <PlayedCardsStack cards={playedCards} />
      <PlayerHand cards={playerHand} bid={tricks+divider()+bid} />
      <OtherPlayers players={otherPlayers} />
      {showPopup && (
        <MakeBid roundNumber={roundNumber} onClose={handleClosePopup} onSubmit={handleConfirm} />
      )}
    </BaseContainer>
  );
};

export default GameView;