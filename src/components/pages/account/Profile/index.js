import "../styles.css";

const Profile = () => {
  return (
    <div className="page-content">
      <h1>My Profile</h1>
      <div className="profile-section">
        <h2>Personal Information</h2>
        <div className="info-grid">
          <div className="info-item">
            <label>Full Name</label>
            <p>John Doe</p>
          </div>
          <div className="info-item">
            <label>Email</label>
            <p>john.doe@example.com</p>
          </div>
          <div className="info-item">
            <label>Phone</label>
            <p>+1 (555) 123-4567</p>
          </div>
          <div className="info-item">
            <label>Member Since</label>
            <p>January 15, 2023</p>
          </div>
        </div>
        <button className="btn-edit">Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
