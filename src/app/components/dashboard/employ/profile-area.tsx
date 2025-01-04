"use client";
import React, { useEffect, useState } from "react";
import DashboardHeader from "../candidate/dashboard-header";
import { useStateContext } from "@/context";
import { useActiveAccount } from "thirdweb/react";
import Image from "next/image";
import supabase from "@/supabase";

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
  const { getUserDetails, updateEmployerDetails, isUserRegistered } =
    useStateContext();
  const [employer, setEmployer] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const account = useActiveAccount();

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

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any>(null);
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
        setSuccess(response);
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      }
    } catch (err) {
      console.error(err);
      setError(err);
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Show a preview of the image
    }
  };

  const handleDeleteImage = () => {
    setPreview(null);
    setSelectedFile(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    const fileName = `${isUserRegistered.ens_name}`;

    try {
      const { data, error } = await supabase.storage
        .from("employd-images")
        .upload(`public/${fileName}`, selectedFile);

      if (data) {
        const fileUrl = `https://umryooifjtwokxeybbxc.supabase.co/storage/v1/object/public/employd-images/public/${fileName}`;
        const { data, error } = await supabase
          .from("users")
          .update({
            image: fileUrl
          })
          .eq("address", account?.address)
          .select();

        if (data) {
          alert("Image uploaded successfully!");
          setSelectedFile(null);
          setPreview(null);
        }
      } else {
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the image.");
    }
  };

  return (
    <div className="dashboard-body">
      <div className="position-relative">
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />

        <h2 className="main-title mb-20">Profile</h2>

        <div className="card-box card-box-employer border-20">
          <div className="user-avatar-setting d-flex align-items-center mb-30">
            {preview && (
              <Image
                src={preview}
                alt="avatar"
                className="lazy-img user-img"
                width={100}
                height={100}
              />
            )}
            {!selectedFile ? (
              <div className="upload-btn position-relative tran3s me-3">
                <label htmlFor="uploadImg" className="upload-label">
                  Upload new photo
                </label>
                <input
                  type="file"
                  id="uploadImg"
                  name="uploadImg"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
            ) : (
              <div className="position-relative tran3s ms-4 me-3">
                <button
                  className="dash-btn-two upload-image-btn tran3s"
                  onClick={handleUpload}
                  disabled={!selectedFile}
                >
                  Upload
                </button>
              </div>
            )}
            {selectedFile && (
              <button
                className="delete-btn tran3s"
                style={{
                  color: "#e96e6e"
                }}
                onClick={handleDeleteImage}
              >
                Delete
              </button>
            )}
          </div>
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
                  style={{ borderRadius: "8px" }}
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

        {success && <div className="success-text mt-20">Details Updated.</div>}

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
