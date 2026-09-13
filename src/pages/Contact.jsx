import React, { useState } from "react";
const API_ENDPOINT = import.meta.env.VITE_CONTACT_API_ENDPOINT;
export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  async function handle(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    try {
      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok) {
        setSent(true);
        form.reset();
        setTimeout(() => setSent(false), 4000);
      } else {
        throw new Error(data.error || "Failed to send message");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold">Contact</h2>
      <p className="text-gray-400 mt-2">Want to collaborate? Send a message.</p>

      <form onSubmit={handle} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <input required name="name" placeholder="Name" className="glass p-3 rounded-md" />
        <input required name="email" placeholder="Email" type="email" className="glass p-3 rounded-md" />
        <textarea required name="message" placeholder="Message" className="glass p-3 rounded-md md:col-span-2 h-36" />

        <div className="md:col-span-2 flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-primary text-black rounded font-semibold disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
          {sent && <div className="text-sm text-green-400">✅ Message sent successfully</div>}
          {error && <div className="text-sm text-red-400">❌ {error}</div>}
        </div>
      </form>

      <div className="mt-8 text-sm text-gray-400">
        Or reach me at{" "}
        <a href="mailto:feb29deepak@gmail.com" className="text-primary">
          feb29deepak@gmail.com
        </a>
      </div>
    </div>
  );
}
