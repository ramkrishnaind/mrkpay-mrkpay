import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";
function Footer() {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.links} md:flex-row`}>
        <Link href="/">
          <a className="py-3 md:py-0 text-[.8rem] md:text-base">About Us</a>
        </Link>
        <Link href="/">
          <a className="py-3 md:py-0 text-[.8rem] md:text-base">
            Privacy Policy
          </a>
        </Link>
        <Link href="/">
          <a className="py-3 md:py-0 text-[.8rem] md:text-base">Disclaimer</a>
        </Link>
        <Link href="/">
          <a className="py-3 md:py-0 text-[.8rem] md:text-base">Contact Us</a>
        </Link>
      </div>
      <p className="text-[.8rem] md:text-base">
        Copyright &copy; 2022 | MRKPAY.COM | All Rights Are Reserved
      </p>
    </div>
  );
}

export default Footer;
