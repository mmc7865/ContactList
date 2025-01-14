import React, { createContext, useState, useEffect } from "react";

export const ContactsDataContext = createContext();

const PostContext = (props) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  return (
    <ContactsDataContext.Provider value={[contacts, setContacts]}>
      {props.children}
    </ContactsDataContext.Provider>
  );
};

export default PostContext;
