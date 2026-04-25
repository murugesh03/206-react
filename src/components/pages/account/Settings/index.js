import { useState } from "react";
import "../styles.css";

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: false,
    newsletter: true
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="page-content">
      <h1>Account Settings</h1>

      <div className="settings-section">
        <h2>Notifications</h2>
        <div className="setting-item">
          <div className="setting-label">
            <h3>Email Notifications</h3>
            <p>Receive order updates and promotions via email</p>
          </div>
          <input
            type="checkbox"
            checked={settings.emailNotifications}
            onChange={() => handleToggle("emailNotifications")}
          />
        </div>

        <div className="setting-item">
          <div className="setting-label">
            <h3>SMS Notifications</h3>
            <p>Receive order updates via SMS</p>
          </div>
          <input
            type="checkbox"
            checked={settings.smsNotifications}
            onChange={() => handleToggle("smsNotifications")}
          />
        </div>

        <div className="setting-item">
          <div className="setting-label">
            <h3>Newsletter</h3>
            <p>Receive weekly newsletter with deals and updates</p>
          </div>
          <input
            type="checkbox"
            checked={settings.newsletter}
            onChange={() => handleToggle("newsletter")}
          />
        </div>
      </div>

      <div className="settings-section">
        <h2>Security</h2>
        <div className="setting-item">
          <div className="setting-label">
            <h3>Two-Factor Authentication</h3>
            <p>Add extra security to your account</p>
          </div>
          <input
            type="checkbox"
            checked={settings.twoFactorAuth}
            onChange={() => handleToggle("twoFactorAuth")}
          />
        </div>
        <button className="btn-change-password">Change Password</button>
      </div>

      <div className="settings-section danger-zone">
        <h2>Danger Zone</h2>
        <button className="btn-delete-account">Delete Account</button>
      </div>

      <button className="btn-save-settings">Save Settings</button>
    </div>
  );
};

export default Settings;
