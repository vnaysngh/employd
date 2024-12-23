"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import avatar from "@/assets/dashboard/images/avatar_02.jpg";
import search from "@/assets/dashboard/images/icon/icon_16.svg";
import DashboardHeader from "./dashboard-header";
import supabase, { supabase_storage } from "@/supabase";
import { useActiveAccount } from "thirdweb/react";
import { useStateContext } from "@/context";

// props type
type IProps = {
  setIsOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};
const DashboardProfileArea = ({ setIsOpenSidebar }: IProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any>(null);
  const { isUserRegistered, updateUserDetails } = useStateContext();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedIn, setLinkedIin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isUserRegistered) {
      const { name, bio, socials } = isUserRegistered;
      setName(name);
      setBio(bio);
      setLinkedIin(socials?.linkedIn);
      setTwitter(socials?.twitter);
    }
  }, [isUserRegistered]);

  const account = useActiveAccount();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file)); // Show a preview of the image
    }
  };

  const handleUpdateUserDetails = async () => {
    if (name.trim() === "") {
      alert("name is required");
      return;
    }
    setLoading(true);
    const body = {
      name,
      bio,
      socials: {
        linkedIn,
        twitter
      }
    };
    try {
      const response = await updateUserDetails({
        body,
        address: account?.address
      });
      if (response) alert("Profile Updated");
    } catch (error) {
      console.error("Failed to call API:", error);
    } finally {
      setLoading(false);
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
        {/* header start */}
        <DashboardHeader setIsOpenSidebar={setIsOpenSidebar} />
        {/* header end */}

        <h2 className="main-title mb-20">My Profile</h2>

        <div className="experience-card card-box border-20">
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
            <label htmlFor="">Full Name*</label>
            <input
              type="text"
              placeholder="Md James Brower"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="dash-input-wrapper">
            <label htmlFor="">Bio</label>
            <textarea
              className="size-lg"
              placeholder="Write something interesting about you...."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="experience-card card-box border-20 mt-40">
          <h4 className="dash-title-three">Social Media</h4>

          <div className="dash-input-wrapper mb-20">
            <label htmlFor="">LinkedIn</label>
            <input
              type="text"
              placeholder="#"
              value={linkedIn}
              onChange={(e) => setLinkedIin(e.target.value)}
            />
          </div>
          <div className="dash-input-wrapper mb-20">
            <label htmlFor="">Twitter</label>
            <input
              type="text"
              placeholder="#"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
          </div>
        </div>

        <div className="button-group d-inline-flex align-items-center mt-30">
          <button
            className="dash-btn-two tran3s d-flex align-items-center gap-2"
            onClick={handleUpdateUserDetails}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfileArea;
