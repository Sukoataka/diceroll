import { Links } from "@remix-run/react";
import styles from "../assets/css/global.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta = () => {
  return [{ title: "Diceroll - Bouwen Alossery" }];
};

export default function Index() {
  return (
    <div>
      <button>Start Playing</button>
      <button>High Scores</button>
    </div>
  );
}
