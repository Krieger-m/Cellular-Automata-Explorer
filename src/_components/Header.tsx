import Image from "next/image";
import styles from "./styles/components.module.css";
import icon from "../app/icon.png";
import Link from "next/link";

export function Header() {
  return (
    <>
      <nav className={styles.header}>
        <Link href="/">
          <Image
            src={icon.src}
            alt="icon"
            width="50"
            height="50"
            style={{ borderRadius: 25 }}
          />
        </Link>{" "}
        <h1>Cellular Automata Explorer</h1>
      </nav>
    </>
  );
}
