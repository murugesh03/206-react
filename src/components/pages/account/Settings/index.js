import { useState } from "react";
import { useSelector } from "react-redux";
import { useUpdateSettingsMutation } from "../../../../redux/api/user";
import "../styles.css";

const Settings = () => {
  // Get userId from Redux auth state
  const userId = useSelector((state) => state.auth?.user?.id);

  // RTK Query - NEW APPROACH
  const [updateSettingsMutation, { isLoading: isUpdatingSettings }] =
    useUpdateSettingsMutation();

  // DEPRECATED: Old local state (kept for reference)
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: false,
    newsletter: true
  });

  const handleToggle = async (key) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key]
    };
    setSettings(newSettings);

    // RTK Query - NEW APPROACH using useUpdateSettingsMutation
    try {
      if (userId) {
        await updateSettingsMutation({
          userId,
          settings: newSettings
        }).unwrap();
        console.log("Settings updated successfully");
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      // Revert on error
      setSettings(settings);
    }
  };

  const handleSaveSettings = async () => {
    try {
      // RTK Query - NEW APPROACH
      if (userId) {
        await updateSettingsMutation({
          userId,
          settings
        }).unwrap();
        console.log("All settings saved successfully");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
    }
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

      <button
        className="btn-save-settings"
        onClick={handleSaveSettings}
        disabled={isUpdatingSettings}
      >
        {isUpdatingSettings ? "Saving..." : "Save Settings"}
      </button>
    </div>
  );
};

export default Settings;
