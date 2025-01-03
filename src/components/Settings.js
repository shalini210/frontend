import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
  });

  const [generalSettings, setGeneralSettings] = useState({
    timezone: 'GMT',
    language: 'English',
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    securityQuestions: false,
  });

  const [theme, setTheme] = useState({
    darkMode: false,
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleNotificationsChange = (e) => {
    const { name, checked } = e.target;
    setNotifications({ ...notifications, [name]: checked });
  };

  const handleGeneralSettingsChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings({ ...generalSettings, [name]: value });
  };

  const handleSecuritySettingsChange = (e) => {
    const { name, checked } = e.target;
    setSecuritySettings({ ...securitySettings, [name]: checked });
  };

  const handleThemeChange = (e) => {
    const { name, checked } = e.target;
    setTheme({ ...theme, [name]: checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile Updated:', profile);
    console.log('Notifications Updated:', notifications);
    console.log('General Settings Updated:', generalSettings);
    console.log('Security Settings Updated:', securitySettings);
    console.log('Theme Settings Updated:', theme);
  };

  return (
    <div className="settings">
      <h1>Welcome to Your CRM Settings</h1>
      <p className="settings-intro">
        Personalize your CRM experience to match your unique business needs. Customize everything from notifications to security settings, ensuring that your CRM adapts to your workflow, team, and organizational goals.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="settings-section">
          <h2>Your Profile</h2>
          <p className="settings-description">
            Tailor your personal information and preferences. Set your profile details to ensure the CRM works for you and your team.
          </p>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
            placeholder="Name"
            className="settings-input"
          />
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleProfileChange}
            placeholder="Email"
            className="settings-input"
          />
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleProfileChange}
            placeholder="Password"
            className="settings-input"
          />
        </div>

        <div className="settings-section">
          <h2>Notification Preferences</h2>
          <p className="settings-description">
            Stay on top of important updates. Choose how you receive notifications to match your communication preferences.
          </p>
          <label className="settings-label">
            <input
              type="checkbox"
              name="emailNotifications"
              checked={notifications.emailNotifications}
              onChange={handleNotificationsChange}
            />
            Email Notifications
          </label>
          <label className="settings-label">
            <input
              type="checkbox"
              name="smsNotifications"
              checked={notifications.smsNotifications}
              onChange={handleNotificationsChange}
            />
            SMS Notifications
          </label>
        </div>

        <div className="settings-section">
          <h2>General Settings</h2>
          <p className="settings-description">
            Configure the fundamentals of your CRM to align with your business location and preferred language.
          </p>
          <label className="settings-label">
            Timezone:
            <select
              name="timezone"
              value={generalSettings.timezone}
              onChange={handleGeneralSettingsChange}
              className="settings-select"
            >
              <option value="GMT">GMT</option>
              <option value="EST">EST</option>
              <option value="PST">PST</option>
              <option value="IST">IST</option>
            </select>
          </label>

          <label className="settings-label">
            Language:
            <select
              name="language"
              value={generalSettings.language}
              onChange={handleGeneralSettingsChange}
              className="settings-select"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
            </select>
          </label>
        </div>

        <div className="settings-section">
          <h2>Enhanced Security Settings</h2>
          <p className="settings-description">
            Your security is a top priority. Ensure your account is protected with advanced security features.
          </p>
          <label className="settings-label">
            <input
              type="checkbox"
              name="twoFactorAuth"
              checked={securitySettings.twoFactorAuth}
              onChange={handleSecuritySettingsChange}
            />
            Enable Two-Factor Authentication
          </label>
          <label className="settings-label">
            <input
              type="checkbox"
              name="securityQuestions"
              checked={securitySettings.securityQuestions}
              onChange={handleSecuritySettingsChange}
            />
            Enable Security Questions
          </label>
        </div>

        <div className="settings-section">
          <h2>Visual Preferences</h2>
          <p className="settings-description">
            Customize your CRM's appearance to create a comfortable and efficient environment for your team.
          </p>
          <label className="settings-label">
            <input
              type="checkbox"
              name="darkMode"
              checked={theme.darkMode}
              onChange={handleThemeChange}
            />
            Enable Dark Mode
          </label>
        </div>

        <button type="submit" className="settings-button">Save Changes</button>
      </form>

      <div className="settings-footer">
        <p>
          <strong>Ready to scale your CRM?</strong> Customize your settings to match your business needs, and watch how our CRM grows with you.
        </p>
        <p>
          If you need assistance, our support team is always here to help. Contact us anytime!
        </p>
      </div>
    </div>
  );
};

export default Settings;
