import Link from "next/link";
import Logo from "./Logo";
import styles from "./Nav.module.css";

const LINKS = [
  { href: "/", label: "Portfolio" },
  { href: "/about", label: "About" },
];

const RESUME_URL =
  "https://drive.google.com/file/d/19c-5to9HqjLQBd3r6vBzh1wz7jB_bamF/view?usp=sharing";

export default function Nav({ active = "Portfolio" }: { active?: string }) {
  return (
    <nav className={styles.nav}>
      {/* Mark and wordmark are one target, so the whole thing goes home. */}
      <Link href="/" className={styles.logo}>
        <Logo size={32} />
        <span>ruochen.wu</span>
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
        <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
          Resume
        </a>
      </div>
    </nav>
  );
}
