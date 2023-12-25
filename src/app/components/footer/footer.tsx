// components/Footer.tsx
import styles from "./footer.module.scss"; // Adjust the path based on your project structure

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>&copy; 2023 SCMS | By Mushfiqur Rahman Abir</p>
      </div>
    </footer>
  );
};

export default Footer;
