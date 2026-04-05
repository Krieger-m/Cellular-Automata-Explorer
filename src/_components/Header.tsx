import styles from './styles/components.module.css'

export function Header() {
  return (
    <>
      <nav className={styles.header} >
        <h1>Cellular Automata Explorer</h1>
      </nav>
    </>
  );
}
