import styles from "../assets/css/global.css";
import { useState } from "react";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function Game() {
  const [playersPushedButton, setPlayersPushedButton] = useState(false);
  const [randomNumber1, setRandomNumber1] = useState(0);
  const [randomNumber2, setRandomNumber2] = useState(0);

  //FIX THIS! too many re renders
  setRandomNumber1(Math.floor(Math.random() * 6) + 1);
  setRandomNumber2(Math.floor(Math.random() * 6) + 1);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(
      JSON.stringify({ userName: document.getElementById("playerName").value })
    );

    await fetch("http://localhost:5000/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        userName: document.getElementById("playerName").value,
      }),
    });
    location.href = "/success";
  }

  return (
    <div className="game">
      {playersPushedButton ? (
        <div>
          <h1>Waiting for both players to push their button...</h1>
        </div>
      ) : (
        <div>
          <h1>Player 1 rolled: {randomNumber1}</h1>
          <h2>Player 2 rolled: {randomNumber2}</h2>
          <h1>Player ? won!</h1>
          <h2>
            The winner is?{" "}
            <form onSubmit={handleSubmit}>
              <input
                id="playerName"
                type="text"
                placeholder="Your name"
              ></input>
              <input type="submit" value="Submit"></input>
            </form>
          </h2>
        </div>
      )}
    </div>
  );
}
