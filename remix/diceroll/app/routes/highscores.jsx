import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import styles from "../assets/css/global.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export async function loader() {
  const topUsers = await fetch("http://localhost:5000/topusers").then((res) =>
    res.json()
  );
  return json(topUsers);
}

export default function HighScores() {
  const topUsers = useLoaderData();

  return (
    <div>
      <ul>
        {topUsers.map((user) => {
          return (
            <li key={user.userID}>
              <p>
                {user.userName}: {user.timesWon}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
