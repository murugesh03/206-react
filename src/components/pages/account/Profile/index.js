import { useSelector } from "react-redux";

import {
  useGetProfileQuery,
  useUpdateProfileMutation
} from "../../../../redux/api/user";
import "../styles.css";

const Profile = () => {
  // Get userId from Redux auth state
  const userId = useSelector((state) => state.auth?.user?.id);

  // RTK Query - NEW APPROACH
  const {
    data: profileData,
    isLoading,
    error
  } = useGetProfileQuery(userId, { skip: !userId });
  const [updateProfileMutation] = useUpdateProfileMutation();

  // DEPRECATED: Hard-coded profile data (kept for reference)
  // const profile = {
  //   fullName: "John Doe",
  //   email: "john.doe@example.com",
  //   phone: "+1 (555) 123-4567",
  //   memberSince: "January 15, 2023"
  // };

  const profile = profileData || {
    fullName: "Loading...",
    email: "Loading...",
    phone: "Loading...",
    memberSince: "Loading..."
  };

  const handleEditProfile = async () => {
    try {
      // RTK Query - NEW APPROACH
      await updateProfileMutation({
        userId,
        profileData: {
          fullName: profile.fullName,
          phone: profile.phone
        }
      }).unwrap();
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="page-content">
      <h1>My Profile</h1>

      {isLoading && <p>Loading profile...</p>}
      {error && (
        <p style={{ color: "red" }}>Error loading profile: {error.message}</p>
      )}

      <div className="profile-section">
        <h2>Personal Information</h2>
        <div className="info-grid">
          <div className="info-item">
            <label>Full Name</label>
            <p>{profile.fullName}</p>
          </div>
          <div className="info-item">
            <label>Email</label>
            <p>{profile.email}</p>
          </div>
          <div className="info-item">
            <label>Phone</label>
            <p>{profile.phone}</p>
          </div>
          <div className="info-item">
            <label>Member Since</label>
            <p>{profile.memberSince}</p>
          </div>
        </div>
        <button className="btn-edit" onClick={handleEditProfile}>
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
