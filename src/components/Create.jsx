import React, { useContext, useState } from "react";
import { ContactsDataContext } from "../context/postContext";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

const Create = () => {
    const [contacts, setContacts] = useContext(ContactsDataContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const uploadImageToCloudinary = async () => {
        if (image) {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "contact_images");
            formData.append("cloud_name", "dqes9r6ka");
            const response = await fetch(`https://api.cloudinary.com/v1_1/dqes9r6ka/image/upload`, 
            {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            return data.url;
        }
        return "https://png.pngtree.com/png-vector/20220529/ourmid/pngtree-user-icons-profile-and-avatar-icons-graphic-contact-avatar-vector-png-image_45820998.jpg"; 
    };
    
    const saveContactsToLocalStorage = (contacts) => {
        localStorage.setItem("contacts", JSON.stringify(contacts));
    };
    
    const submitHandler = async (e) => {
        e.preventDefault();
        const url = await uploadImageToCloudinary();
        const contact = {id:nanoid(), name, email, phone, imageUrl: url };
        const newContacts = Array.isArray(contacts) ? [...contacts, contact] : [contact];
        setContacts(newContacts);
        saveContactsToLocalStorage(newContacts);
        toast.success("Contact saved");
        setName("");
        setEmail("");
        setPhone("");
        setImage(null);
        navigate("/");
    };

    return (
        <>
            <button className="absolute bg-zinc-200 text-blue-500 font-semibold rounded px-4 py-1" onClick={() => navigate("/")}>Home</button>
            <div className="w-[100%] h-screen flex justify-center items-center gap-5">
                <form onSubmit={submitHandler} className="w-[25%] flex flex-col gap-2">
                    <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-zinc-100 px-3 py-2 rounded"
                        type="text"
                        placeholder="Name"
                    />
                    <input
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-zinc-100 px-3 py-2 rounded"
                        type="text"
                        placeholder="Email"
                    />
                    <input
                        required
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
                        Add Contact
                    </button>
                </form>
            </div>
        </>
    );
};

export default Create;
