import './App.css';
import contacts from '../src/contacts.json';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const updatedContacts = contacts.slice(0, 5);
  const [contactList, setContactList] = useState(updatedContacts);
  const [activeFilter, setActiveFilter] = useState('');

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

  const addNewRandomContact = () => {
    const remainingContacts = contacts.filter(
      contact => !contactList.includes(contact)
    );

    if (remainingContacts.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingContacts.length);
      const randomContact = remainingContacts[randomIndex];

      setContactList(prevContacts => [...prevContacts, randomContact]);
    }
  };

  const sortContactsByName = () => {
    const sortedContacts = contactList.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });

    setContactList([...sortedContacts]);
    setActiveFilter('Name');
  };

  const sortContactsByPopularity = () => {
    const sortedContacts = contactList.sort((a, b) => {
      return b.popularity - a.popularity;
    });

    setContactList([...sortedContacts]);
    setActiveFilter('Popularity');
  };

  const deleteActor = actorId => {
    const filteredContacts = contactList.filter(actor => {
      return actorId !== actor.id;
    });

    setContactList(filteredContacts);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="col">
          <h2 className="display-1 font-weight-bold text-center">
            IronContacts
          </h2>
          <br />
          <div className="buttons btn-lg ">
            <button
              className="btn btn-secondary btn-lg"
              onClick={addNewRandomContact}
            >
              Add Random Contact
            </button>
            <button
              className="btn btn-warning btn-lg"
              onClick={sortContactsByName}
            >
              Sort by Name ↓
            </button>
            <button
              className="btn btn-warning btn-lg"
              onClick={sortContactsByPopularity}
            >
              Sort by Popularity ↓
            </button>
          </div>
          <br />
        </div>
        <table className="table table-striped table-hover text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th className="col align-middle">Picture</th>
              <th className="col align-middle">
                <href type="button" onClick={sortContactsByName}>
                  Name {activeFilter === 'Name' && '↓'}
                </href>
              </th>
              <th className="col align-middle">
                <href type="button" onClick={sortContactsByPopularity}>
                  Popularity {activeFilter === 'Popularity' && '↓'}
                </href>
              </th>
              <th className="col align-middle">Won Oscar</th>
              <th className="col align-middle">Won Emmy</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {contactList.map(contact => (
              <tr key={contact.id}>
                <td>
                  <img
                    style={{ maxHeight: '200px' }}
                    src={contact.pictureUrl}
                    alt={contact.name}
                  />
                </td>
                <td>
                  {' '}
                  <strong> {contact.name} </strong>{' '}
                </td>
                <td>{contact.popularity}</td>
                <td>{hasOscar(contact)}</td>
                <td>{hasEmmy(contact)}</td>
                <td className="align-middle">
                  <button
                    className="btn btn-warning"
                    onClick={() => deleteActor(contact.id)}
                  >
                    Delete this actor
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
