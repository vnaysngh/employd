import { useEffect, useRef, useState } from "react";
import Loader from "@/app/loading";
import { CopyToClipboard } from "react-copy-to-clipboard";

const InviteEmployer = ({
  employer,
  onClose
}: {
  employer: any;
  onClose?: () => void;
}) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      onClose &&
      popupRef.current &&
      !popupRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleCopyLink = () => {
    setCopied(true);
    // alert("Invite link copied to clipboard!");
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="overlay">
      <div className={`popup-container`} ref={popupRef}>
        <h2 className="popup-title text-start">Share Invite Link</h2>
        <div className="subtitle">
          Invite {employer?.company_name} to Join the Platform
        </div>
        <div className="invite-section">
          <div className="invite-link-container">
            <div className="invite-link mb-15">
              {`https://employd.xyz/invite?attestationId=${employer.id}&referrer=${employer.seekerAddress}`}
            </div>
          </div>
          <CopyToClipboard
            text={`https://employd.xyz/invite?attestationId=${employer.id}&referrer=${employer.seekerAddress}`}
            onCopy={handleCopyLink}
          >
            <button
              className="tx-btn mb-0 d-flex align-items-center gap-1"
              disabled={copied}
            >
              Copy {copied && <i className="bi bi-check-lg"></i>}
            </button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
};

export default InviteEmployer;
