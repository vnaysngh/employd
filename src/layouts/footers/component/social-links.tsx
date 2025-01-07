import Link from "next/link";
import React from "react";

const SocialLinks = () => {
  return (
    <>
      <li>
        <Link href="https://t.me/+7dACcvcchmE0ZjI1" target="_blank">
          <i className="bi bi-telegram"></i>
        </Link>
      </li>
      <li>
        <Link href="https://x.com/employd_xyz" target="_blank">
          <i className="bi bi-twitter"></i>
        </Link>
      </li>
    </>
  );
};

export default SocialLinks;
