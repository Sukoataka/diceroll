import styles from "../assets/css/global.css";
import { useLoaderData } from "@remix-run/react";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

const url = "http://192.168.20.150:4000";

export async function loader() {
  const data = (await fetch(`${url}/getrandomnumbers`)).json();
  return data;
}

export default function Game() {
  const data = useLoaderData();
  const randomNumber1 = data.rNum1;
  const randomNumber2 = data.rNum2;

  fetch(`http://192.168.20.150:5000/leds/${randomNumber1}/${randomNumber2}`);

  let winner = 0;
  if (randomNumber1 > randomNumber2) {
    winner = 1;
  } else {
    winner = 2;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch(`${url}/addUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        userName: document.getElementById("playerName").value,
      }),
    });
    location.href = "/";
  }

  return (
    <div className="game">
      <h1>Speler {winner} is gewonnen!</h1>
      <h2>Speler 1 rolde: {randomNumber1} ogen</h2>
      <h2>Speler 2 rolde: {randomNumber2} ogen</h2>
      <h1>
        De winnaar is?
        <form onSubmit={handleSubmit}>
          <input id="playerName" type="text" placeholder="Jouw naam"></input>
          <input type="submit" value="Doorgaan"></input>
        </form>
      </h1>
    </div>
  );
}
