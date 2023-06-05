import './App.css';
import contacts from '../src/contacts.json';
import { useState } from 'react';

function App() {
  const updatedContacts = contacts.slice(0, 5);
  const [contactList, setContactList] = useState(updatedContacts);

  const hasOscar = contact => {
    if (contact.wonOscar) {
      return <div>🏆</div>;
    }
  };
  const hasEmmy = contact => {
    if (contact.wonEmmy) {
      return <div>🏆</div>;
    }
  };

  const sortContactsByName = () => {
    const sortedContacts = contactList.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    setContactList([...sortedContacts]);
  };

  const sortContactsByPopularity = () => {
    const sortedContacts = contactList.sort((a, b) => {
      return b.popularity - a.popularity;
    });

    setContactList([...sortedContacts]);
  };

  const deleteActor = actorId => {
    const filteredContacts = contactList.filter(actor => {
      return actorId !== actor.id;
    });

    setContactList(filteredContacts);
  };

  return (
    <div className="App">
      <h2>IronContacts</h2>
      <div className="buttons">
        <button>Add Random Contact</button>
        <button onClick={sortContactsByPopularity}>Sort by Popularity</button>
        <button onClick={sortContactsByName}>Sort by Name</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
          </tr>
        </thead>
        <tbody>
          {contactList.map(contact => (
            <tr key={contact.id}>
              <td>
                <img
                  style={{ maxHeight: '200px' }}
                  src={contact.pictureUrl}
                  alt={contact.name}
                />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity}</td>
              <td>{hasOscar(contact)}</td>
              <td>{hasEmmy(contact)}</td>
              <button onClick={() => deleteActor(contact.id)}>
                Delete this actor
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
