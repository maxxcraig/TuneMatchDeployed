import React, { Component } from "react";
import HomePage from "./HomePage";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";

export default class App extends Component {
    render() {
        return ( 
            <div id="gradient" style={{ width: "100%", minHeight: "100vh" }}>
                <HomePage />
            </div>
        );
    }
}
