import Link from "next/link";
import React from "react";

const CandidateBio = ({ user }: { user: any }) => {
  return (
    <ul className="style-none">
      {/*  <li>
        <span>Location: </span>
        <div>Spain, Barcelona </div>
      </li>
      <li>
        <span>Age: </span>
        <div>28</div>
      </li> */}
      <li>
        <span>Email: </span>
        <div>
          <a href="mailto:me@support.com">{user?.email}</a>
        </div>
      </li>
      {/*  <li>
        <span>Qualification: </span>
        <div>Master Degree</div>
      </li> */}
      {/*  <li>
        <span>Gender: </span>
        <div>Male</div>
      </li> */}
      {/*  <li>
        <span>Expected Salary: </span>
        <div>$3k-$4k/month</div>
      </li> */}
      <li>
        <span>Social:</span>
        <div>
          <Link href={user?.socials?.twitter} className="me-3" target="_blank">
            <i className="bi bi-twitter"></i>
          </Link>
          <Link href={user?.socials?.linkedIn} className="me-3" target="_blank">
            <i className="bi bi-linkedin"></i>
          </Link>
        </div>
      </li>
    </ul>
  );
};

export default CandidateBio;
