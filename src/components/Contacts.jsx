import React, { useContext, useState } from "react";
import { ContactsDataContext } from "../context/postContext";
import { Link } from "react-router-dom";

const Contacts = () => {
  const [contacts, setContacts] = useContext(ContactsDataContext);
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 6;

  if (!Array.isArray(contacts)) {
    return <p>No contacts available.</p>;
  }

  const deleteHandler = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));
  };

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

  const totalPages = Math.ceil(contacts.length / contactsPerPage);

  return (
    <div className="contact w-[30%] m-auto px-5 py-3">
      {currentContacts.map((contact, index) => (
        <div
          key={index}
          className="flex gap-2 justify-between items-center pr-8 p-2 mb-2 bg-zinc-100 rounded-[50px]"
        >
          <div className="flex gap-4">
            <img
              className="w-[50px] h-[50px] rounded-full object-cover object-center"
              src={
                contact.imageUrl ||
                "https://png.pngtree.com/png-vector/20220529/ourmid/pngtree-user-icons-profile-and-avatar-icons-graphic-contact-avatar-vector-png-image_45820998.jpg"
              }
              alt={contact.name}
            />
            <div>
              <h1 className="text-sm font-semibold">{contact.name}</h1>
              <h2 className="text-xs">{contact.phone}</h2>
              <h4 className="text-xs">{contact.email}</h4>
            </div>
          </div>
          <div>
            <Link to={`/edit/${contact.id}`}>
              <i className="ri-pencil-fill text-xl"></i>
            </Link>
            <button onClick={() => deleteHandler(contact.id)}>
              <i className="ri-delete-bin-line text-xl ml-3"></i>
            </button>
          </div>
        </div>
      ))}
      <div className="pagination flex justify-between mx-4 mt-12">
        <button
          onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-100 font-semibold rounded-md cursor-pointer hover:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-100 font-semibold rounded-md cursor-pointer hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Contacts;
