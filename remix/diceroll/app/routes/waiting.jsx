import { useState } from "react";
import styles from "../assets/css/global.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export default function Waiting() {
  const [btn1Clicked, setBtn1Clicked] = useState(false);
  const [btn2Clicked, setBtn2Clicked] = useState(false);

  

  return (
    <div className="waitpage">
      <button className={btn1Clicked ? "waiting clicked" : "waiting"} onClick={() => setBtn1Clicked(true)}>Speler 1</button>
      <button className={btn2Clicked ? "waiting clicked" : "waiting"} onClick={() => setBtn2Clicked(true)}>Speler 2</button>
      {btn1Clicked && btn2Clicked ? location.href = "/game" : null}
    </div>
  );
}
