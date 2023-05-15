import { Link } from "@remix-run/react"
import globalStyles from "../assets/css/global.css";

export function links() {
  return [{ rel: "stylesheet", href: globalStyles }];
}

export const meta = () => {
  return [{ title: "Diceroll - Bouwen Alossery" }];
};

export default function Index() {
  return (
    <div>
      <Link to="/game">Start Playing</Link>
      <Link to="/highscores">High Scores</Link>
    </div>
  );
}
