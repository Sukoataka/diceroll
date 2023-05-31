import { useLoaderData, Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import styles from "../assets/css/global.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

const url = "http://10.10.1.81:4000";

export async function loader() {
  const topUsers = await fetch(`${url}/topusers`).then((res) =>
    res.json()
  );
  return json(topUsers);
}

export default function HighScores() {
  const topUsers = useLoaderData();

  return (
    <div className="highscorepage">
      <h1 className="right">Beste spelers</h1>
      <ul>
        {topUsers.map((user) => {
          return (
            <li key={user.userID}>
              <h3>
                {user.userName}: {user.timesWon}
              </h3>
            </li>
          );
        })}
      </ul>
      <Link className="right" to="/">Terug</Link>
    </div>
  );
}
