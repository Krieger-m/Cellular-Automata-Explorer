import styles from "./styles/page.module.css";
import Link from "next/link";
import { Rules } from "@/lib/automata-rules";
import { Spacing } from "@/_components/Spacing";

export default function Home() {
  return (
    <div className={styles.page}>
      <h2>
        A curated collection of cellular automata
        <br />
        with unique behaviors and visual patterns.
      </h2>
      <Spacing height={2} />

      <p>
        Cellular automata are simple rule‑based systems that create surprisingly
        complex patterns.
        <br />
        Below you’ll find a growing library of automata, each with its own
        personality, dynamics, and visual style.
        <br />
        <br />
        Click any rule to explore how it evolves.
      </p>
      <Spacing height={4} />

      <div className={styles.cardsDiv} >
      {Object.entries(Rules).map(([key, rule]) => (
          <div key={key} className={styles.singleCardsDiv}>
            <Link  href={`/${key}`} >
              {rule.name}
            </Link>
          </div>
      ))}
      </div>
      <Spacing height={2} />
    </div>
  );
}
