// App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [editedContactIndex, setEditedContactIndex] = useState(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [relation, setRelation] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleAddContactClick = () => {
    setIsAddingContact(true);
    setIsEditingContact(false);
    clearForm();
  };

  const handleEditContactClick = (index) => {
    setIsAddingContact(true);
    setIsEditingContact(true);
    setEditedContactIndex(index);
    const contact = contacts[index];
    setName(contact.name);
    setAddress(contact.address);
    setRelation(contact.relation);
    setPhone(contact.phone);
    setEmail(contact.email);
  };

  const handleCancelClick = () => {
    setIsAddingContact(false);
    setIsEditingContact(false);
    clearForm();
  };

  const addContact = (e) => {
    e.preventDefault();
    const newContact = {
      name,
      address,
      relation,
      phone,
      email
    };

    if (isEditingContact) {
      const updatedContacts = [...contacts];
      updatedContacts[editedContactIndex] = newContact;
      setContacts(updatedContacts);
    } else {
      setContacts([...contacts, newContact]);
    }

    clearForm();
    setIsAddingContact(false);
    setIsEditingContact(false);
  };

  const confirmDeleteContact = (index) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      deleteContact(index);
    }
  };

  const deleteContact = (index) => {
    const updatedContacts = [...contacts];
    updatedContacts.splice(index, 1);
    setContacts(updatedContacts);
  };

  const clearForm = () => {
    setName('');
    setAddress('');
    setRelation('');
    setPhone('');
    setEmail('');
  };

  return (
    <div className="App">
      <header>
        <h1>Contact Management App</h1>
        {!isAddingContact && (
          <button onClick={handleAddContactClick}>Add Contact</button>
        )}
      </header>
      {isAddingContact ? (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCancelClick}>
              &times;
            </span>
            <form className="contact-form" onSubmit={addContact}>
              <h2>{isEditingContact ? 'Edit Contact' : 'Add Contact'}</h2>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Relation"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div>
                <button type="submit">
                  {isEditingContact ? 'Save Changes' : 'Save'}
                </button>
                <button type="button" onClick={handleCancelClick}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="contact-list">
          {contacts.map((contact, index) => (
            <div key={index} className="contact-card">
              <h3>{contact.name}</h3>
              <p>
                <strong>Address:</strong> {contact.address}
              </p>
              <p>
                <strong>Relation:</strong> {contact.relation}
              </p>
              <p>
                <strong>Phone:</strong> {contact.phone}
              </p>
              <p>
                <strong>Email:</strong> {contact.email}
              </p>
              <div className="contact-actions">
                <button onClick={() => handleEditContactClick(index)}>
                  Edit
                </button>
                <button onClick={() => confirmDeleteContact(index)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
