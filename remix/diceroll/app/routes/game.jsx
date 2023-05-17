import styles from "../assets/css/global.css";
import { useLoaderData } from "@remix-run/react";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export async function loader() {
  const data = (await fetch("http://localhost:5000/getrandomnumbers")).json();
  return data;
}

export default function Game() {
  const data = useLoaderData();
  const randomNumber1 = data.rNum1;
  const randomNumber2 = data.rNum2;

  let winner = 0;
  if (randomNumber1 > randomNumber2) {
    winner = 1;
  } else {
    winner = 2;
  }

  async function handleSubmit(e) {
    e.preventDefault();

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
          <h1>Player 1 rolled: {randomNumber1}</h1>
          <h2>Player 2 rolled: {randomNumber2}</h2>
          <h1>Player {winner} won!</h1>
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
  );
}
