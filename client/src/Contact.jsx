import React, { useState } from "react";
import { sendContact } from "./Requests";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    try {
      const res = await sendContact({ name, email, message });
      console.log(res);
      if (res && res.messageId) {
        setStatus("Your message has been sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("There was an error sending your message.");
      }
    } catch (error) {
      setStatus("There was an error sending your message.");
    }
  };

  return (
    <>
      <form className="p-6 max-w-xl space-y-4 w-full" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Your name"
          className="w-full border p-2"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          name="email"
          type="email"
          placeholder="Your email"
          className="w-full border p-2"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          name="message"
          placeholder="Message"
          className="w-full border p-2 h-32"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="border px-4 py-2">Send</button>
      </form>
      {status && <div className="mt-2 text-center text-sm">{status}</div>}
    </>
  );
}

export default Contact;
