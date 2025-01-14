import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ContactsDataContext } from "../context/postContext";

const Edit = () => {
  const { id } = useParams();
  const [contacts, setContacts] = useContext(ContactsDataContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const contact = contacts.find(contact => contact.id === id);
    if (contact) {
      setName(contact.name);
      setEmail(contact.email);
      setPhone(contact.phone);
      setImageUrl(contact.imageUrl);  // Existing image URL
    }
  }, [id, contacts]);

  const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'contact_images');  // Cloudinary upload preset

    const response = await fetch('https://api.cloudinary.com/v1_1/dqes9r6ka/image/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data.secure_url;  // Cloudinary image URL
  };

  const saveContactsToLocalStorage = (contacts) => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let url = imageUrl; // Default to existing URL
    if (image) {
      url = await uploadImageToCloudinary(image);
    }
    const updatedContact = { id, name, email, phone, imageUrl: url };
    const updatedContacts = contacts.map(contact => 
      contact.id === id ? updatedContact : contact
    );
    setContacts(updatedContacts);
    saveContactsToLocalStorage(updatedContacts);
    navigate("/");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center gap-5">
      <form onSubmit={submitHandler} className="w-[25%] flex flex-col gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-zinc-100 px-3 py-2 rounded"
          type="text"
          placeholder="Name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-zinc-100 px-3 py-2 rounded"
          type="text"
          placeholder="Email"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="bg-zinc-100 px-3 py-2 rounded"
          type="text"
          placeholder="Phone"
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="bg-zinc-100 px-3 py-2 rounded"
        />
        <button className="bg-zinc-100 px-3 py-2 rounded" type="submit">
          Update Contact
        </button>
      </form>
    </div>
  );
}

export default Edit;
