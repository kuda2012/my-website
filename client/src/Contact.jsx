function Contact() {
  return (
    <form
      className="p-6 max-w-xl space-y-4 w-full"
      method="POST"
      action="/api/contact"
    >
      <input
        name="name"
        placeholder="Your name"
        className="w-full border p-2"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Your email"
        className="w-full border p-2"
        required
      />
      <textarea
        name="message"
        placeholder="Message"
        className="w-full border p-2 h-32"
        required
      />
      <button className="border px-4 py-2">Send</button>
    </form>
  );
}

export default Contact;
