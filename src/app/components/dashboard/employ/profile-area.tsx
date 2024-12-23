"use client";
import React, { useEffect, useState } from "react";
import DashboardHeader from "../candidate/dashboard-header";
import { useStateContext } from "@/context";
import { useActiveAccount } from "thirdweb/react";
import { useRouter } from "next/navigation";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const categories = [
  "Account",
  "Finance",
  "Marketing",
  "Technology",
  "Education",
  "Healthcare",
  "Retail",
  "Hospitality",
  "Manufacturing",
  "Real Estate",
  "Transportation",
  "Other"
];

const EmployProfileArea = ({ setIsOpenSidebar }: IProps) => {
  const { getUserDetails, updateEmployerDetails } = useStateContext();
  const [employer, setEmployer] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const account = useActiveAccount();
  const router = useRouter();

  // Form states
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [foundedDate, setFoundedDate] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const convertUnixToDate = (unixTimestamp: number) => {
    // Create a Date object using the Unix timestamp (in milliseconds)
    const date = new Date(unixTimestamp * 1000);

    // Extract year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");

    // Format as YYYY-MM-DD
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (!account?.address) {
      router.push("/");
    }
  }, [account, router]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!account?.address) return;

      setLoading(true);
      try {
        const userDetails = await getUserDetails(account.address);
        if (userDetails) {
          setEmployer(userDetails);
          const { company_details } = userDetails;
          const formattedDate = convertUnixToDate(
            company_details?.founded_date
          );
          // Populate form fields with user data
          setCompanyName(userDetails?.company_name || "");
          setEmail(userDetails?.email || "");
          setWebsite(company_details?.website || "");
          setFoundedDate(formattedDate || "");
          setCompanySize(company_details?.company_size || "");
          setCategory(company_details?.category || "");
          setAbout(company_details?.about || "");
          setTwitter(company_details?.twitter || "");
          setLinkedin(company_details?.linkedin || "");
        }
      } catch (err) {
        console.error("Failed to fetch user details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [account]);

  const saveDateAsUnix = (dateString: string) => {
    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Convert the date to Unix format (seconds since epoch)
    const unixTimestamp = Math.floor(date.getTime() / 1000);

    return unixTimestamp;
  };

  const handleSave = async () => {
    // Validation
    if (!companyName.trim()) {
      alert("Company Name is required.");
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("A valid email is required.");
      return;
    }
    if (!website.trim() || !/^https?:\/\/.+/.test(website)) {
      alert("A valid website URL is required.");
      return;
    }
    if (!foundedDate.trim()) {
      alert("Founded Date is required.");
      return;
    }
    if (
      !companySize.trim() ||
      isNaN(Number(companySize)) ||
      Number(companySize) <= 0
    ) {
      alert("Company Size is required.");
      return;
    }
    if (!category.trim()) {
      alert("Industry is required.");
      return;
    }

    const foundedUnixDate = saveDateAsUnix(foundedDate);

    const body = {
      company_details: {
        name: companyName,
        email,
        website,
        founded_date: foundedUnixDate,
        company_size: companySize,
        category,
        about,
        twitter,
        linkedin
      }
    };

    try {
      setLoading(true);
      const response = await updateEmployerDetails(body);
      if (response) {
        setTxHash(response);
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />

        <h2 className="main-title mb-20">Profile</h2>

        <div className="card-box card-box-employer border-20">
          <div className="dash-input-wrapper mb-30">
            <label htmlFor="">Company Name*</label>
            <input
              type="text"
              placeholder="John Doe"
              defaultValue={employer?.company_name}
              disabled
            />
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Work Email*</label>
                <input
                  type="email"
                  placeholder="companyinc@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Website*</label>
                <input
                  type="text"
                  placeholder="http://somename.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Founded Date*</label>
                <input
                  type="date"
                  value={foundedDate}
                  onChange={(e) => setFoundedDate(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Company Size*</label>
                <input
                  type="text"
                  placeholder="700"
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">Industry*</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="form-select"
                >
                  <option value="">Select Industry</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="dash-input-wrapper mb-30">
                <label htmlFor="">One sentence summary of your product</label>
                <input
                  type="text"
                  placeholder="700"
                  defaultValue={employer?.company_description}
                  disabled
                  // onChange={(e) => setCompanySize(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="dash-input-wrapper">
            <label htmlFor="">About Company</label>
            <textarea
              className="size-lg"
              placeholder="Brief description of your company."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="card-box card-box-employer border-20 mt-40">
          <h4 className="dash-title-three">Social Media</h4>
          <div className="dash-input-wrapper mb-20">
            <label htmlFor="">Twitter</label>
            <input
              type="text"
              placeholder="https://twitter.com/"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
          </div>
          <div className="dash-input-wrapper mb-20">
            <label htmlFor="">LinkedIn</label>
            <input
              type="text"
              placeholder="https://linkedin.com/"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </div>
        </div>
        {error && <div className="subname-error mt-20">{error}</div>}

        {txHash && <div className="success-text mt-20">Details Updated.</div>}

        {loading && (
          <div className="loading-text mt-20">
            Processing your transaction...
          </div>
        )}
        <div className="button-group d-inline-flex align-items-center mt-20">
          <button className="dash-btn-two tran3s me-3" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployProfileArea;
