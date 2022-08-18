import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";
function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <Link href="/">
          <a>About Us</a>
        </Link>
        <Link href="/">
          <a>Privacy Policy</a>
        </Link>
        <Link href="/">
          <a>Disclaimer</a>
        </Link>
        <Link href="/">
          <a>Contact Us</a>
        </Link>
      </div>
      <p>Copyright &copy; 2022 | MRKPAY.COM | All Rights Are Reserved</p>
    </div>
  );
}

export default Footer;
