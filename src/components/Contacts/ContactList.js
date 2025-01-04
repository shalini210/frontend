import React, { useState, useEffect } from 'react';
import './ContactList.css';
import axios from 'axios';
import { API_URL } from '../../config';
const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]); // For storing filtered contacts
  const [isEditing, setIsEditing] = useState(false);
  const [currentContact, setCurrentContact] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    notes: '',
    type: 'lead', // Default type
    leadScore: '', // Default empty
    lastInteraction: '',
  });
  const [sortOption, setSortOption] = useState('name'); // Default sorting by name
  const [searchTerm, setSearchTerm] = useState(''); // For storing the search term

  // Fetch contacts from the API
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        let url = API_URL+'/api/contacts'
        const response = await axios.get(url);
        setContacts(response.data);
        setFilteredContacts(response.data); // Initially set the filtered contacts to all contacts
      } catch (error) {
        console.error('Failed to fetch contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  // Sort contacts based on the selected option
  const sortContacts = (contacts, criteria) => {
    const sorted = [...contacts];
    switch (criteria) {
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'email':
        return sorted.sort((a, b) => a.email.localeCompare(b.email));
      case 'type':
        return sorted.sort((a, b) => a.type.localeCompare(b.type));
      case 'company':
        return sorted.sort((a, b) => a.company.localeCompare(b.company)); // Sort by company
      default:
        return sorted;
    }
  };

  // Update sorted contacts when sortOption or contacts change
  useEffect(() => {
    setFilteredContacts((prevContacts) => sortContacts(prevContacts, sortOption));
  }, [sortOption]);

  // Filter contacts based on the search term
  useEffect(() => {
    const searchContacts = () => {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const filtered = contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(lowercasedSearchTerm) ||
          contact.email.toLowerCase().includes(lowercasedSearchTerm) ||
          contact.company.toLowerCase().includes(lowercasedSearchTerm)
      );
      setFilteredContacts(filtered);
    };

    searchContacts();
  }, [searchTerm, contacts]); // Re-run filtering when searchTerm or contacts change

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCurrentContact((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission to add or update contact
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentContact._id) {
        // Update existing contact
        const response = await axios.put(
          `${API_URL}/api/contacts/${currentContact._id}`,
          currentContact
        );
        setContacts((prev) =>
          prev.map((contact) => (contact._id === response.data._id ? response.data : contact))
        );
        setFilteredContacts((prev) =>
          prev.map((contact) => (contact._id === response.data._id ? response.data : contact))
        );
      } else {
        // Add new contact
        const response = await axios.post(`${API_URL}/api/contacts`, currentContact);
        setContacts((prev) => [...prev, response.data]);
        setFilteredContacts((prev) => [...prev, response.data]);
      }
      setIsEditing(false);
      setCurrentContact({
        name: '',
        email: '',
        phone: '',
        company: '',
        position: '',
        notes: '',
        type: 'lead',
        leadScore: '',
        lastInteraction: '',
      });
    } catch (error) {
      console.error('Failed to save contact:', error);
    }
  };

  // Handle adding a new contact
  const handleAddContact = () => {
    setCurrentContact({
      name: '',
      email: '',
      phone: '',
      company: '',
      position: '',
      notes: '',
      type: 'lead',
      leadScore: '',
      lastInteraction: '',
    });
    setIsEditing(true);
  };

  // Handle clicking a contact to edit
  const handleContactClick = (contact) => {
    setCurrentContact(contact);
    setIsEditing(true);
  };

  // Handle deleting a contact
  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await axios.delete(`${API_URL}/api/contacts/${id}`);
        setContacts((prev) => prev.filter((contact) => contact._id !== id));
        setFilteredContacts((prev) => prev.filter((contact) => contact._id !== id));
      } catch (error) {
        console.error('Failed to delete contact:', error);
      }
    }
  };

  return (
    <div className="contact-list">
      <h1>Contact List</h1>
      <button onClick={handleAddContact} className="add-contact-button">Add Contact</button>

      {/* Search Bar */}
      <div className="search-sort-container">
        <div>
          <label htmlFor="search">Search Contacts:</label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
          />
        </div>

        {/* Sorting Options */}
        <div>
          <label htmlFor="sort">Sort by:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="type">Type</option>
            <option value="company">Company</option> {/* Add company to the sort options */}
          </select>
        </div>
      </div>

      {isEditing ? (
        <div className="contact-form">
          <h2>{currentContact._id ? 'Contact Details' : 'Add Contact'}</h2>
          <form onSubmit={handleFormSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={currentContact.name}
                onChange={handleFormChange}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={currentContact.email}
                onChange={handleFormChange}
                required
              />
            </label>
            <label>
              Phone:
              <input
                type="text"
                name="phone"
                value={currentContact.phone}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Company:
              <input
                type="text"
                name="company"
                value={currentContact.company}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Type:
              <select
                name="type"
                value={currentContact.type}
                onChange={handleFormChange}
                required
              >
                <option value="lead">Lead</option>
                <option value="contact">Contact</option>
              </select>
            </label>
            <label>
              Position:
              <input
                type="text"
                name="position"
                value={currentContact.position}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Notes:
              <textarea
                name="notes"
                value={currentContact.notes}
                onChange={handleFormChange}
              />
            </label>
            <label>
              Lead Score:
              <input
                type="number"
                name="leadScore"
                value={currentContact.leadScore}
                onChange={handleFormChange}
                min="0"
                max="100"
              />
            </label>
            <label>
              Last Interaction:
              <input
                type="date"
                name="lastInteraction"
                value={currentContact.lastInteraction?.slice(0, 10)} // Format the date
                onChange={handleFormChange}
              />
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        </div>
      ) : (
        <>
          {filteredContacts.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Company</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredContacts.map((contact) => (
                  <tr key={contact._id}>
                    <td onClick={() => handleContactClick(contact)}>{contact.name}</td>
                    
                    {/* Make email clickable */}
                    <td onClick={() => handleContactClick(contact)}>
                      <a href={`mailto:${contact.email}`}>{contact.email}</a>
                    </td>
                    
                    <td onClick={() => handleContactClick(contact)}>{contact.phone}</td>
                    <td onClick={() => handleContactClick(contact)}>{contact.company}</td>
                    <td onClick={() => handleContactClick(contact)}>{contact.type}</td>
                    <td>
                      <button onClick={() => handleDeleteContact(contact._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No contacts found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default ContactList;
