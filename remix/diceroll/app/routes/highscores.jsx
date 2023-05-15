import styles from "../assets/css/global.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

async function getHighscores() {
  const topUsers = await fetch("http://localhost:5000/topusers").then((res) => res.json());
  return topUsers;
}

//TODO: Fix this up, error 500, react: objects are not valid
export default async function HighScores() {
    const topUsers = await getHighscores();
    console.log(topUsers);
    return <div></div>;
}