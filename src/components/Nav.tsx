import Link from "next/link";
import styles from "./Nav.module.css";

const LINKS = [
  { href: "/", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
];

export default function Nav({ active = "Portfolio" }: { active?: string }) {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        ruochen.wu
      </Link>
      <div className={styles.links}>
        {LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={link.label === active ? styles.active : undefined}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
