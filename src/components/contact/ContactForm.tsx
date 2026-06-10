import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formsubmit.co/ajax/contact@vegacore.co", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-navy-950/80 border border-blue-400/12 text-white placeholder-slate-600 focus:outline-none focus:border-blue-400/50 transition-colors";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative rounded-2xl border border-blue-400/15 bg-navy-900/70 overflow-hidden"
    >
      <div className="flex items-center gap-2 px-6 py-4 border-b border-blue-400/10 bg-navy-950/50">
        <motion.span
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2.5 h-2.5 rounded-full bg-green-400"
        />
        <span className="font-mono text-xs text-slate-500">contact@vegacore.co — compose</span>
      </div>

      <div className="p-6 sm:p-8">
        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="mx-auto text-green-400 mb-4" size={48} />
            </motion.div>
            <h3 className="font-display text-xl font-bold mb-2">Message Delivered</h3>
            <p className="text-slate-400 text-sm mb-6">
              We'll get back to you as soon as possible.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block font-mono text-xs text-slate-500 mb-2 uppercase tracking-wider">
                  Name
                </label>
                <input type="text" id="name" name="name" required placeholder="Your name" className={inputClass} />
              </div>
              <div>
                <label htmlFor="email" className="block font-mono text-xs text-slate-500 mb-2 uppercase tracking-wider">
                  Email
                </label>
                <input type="email" id="email" name="email" required placeholder="you@company.com" className={inputClass} />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block font-mono text-xs text-slate-500 mb-2 uppercase tracking-wider">
                Subject
              </label>
              <input type="text" id="subject" name="subject" required placeholder="Project inquiry" className={inputClass} />
            </div>

            <div>
              <label htmlFor="message" className="block font-mono text-xs text-slate-500 mb-2 uppercase tracking-wider">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell us about your project..."
                className={`${inputClass} resize-none`}
              />
            </div>

            {status === "error" && (
              <p className="text-red-400 text-sm">
                Something went wrong. Email us at contact@vegacore.co
              </p>
            )}

            <motion.button
              type="submit"
              disabled={status === "loading"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </motion.button>
          </form>
        )}
      </div>
    </motion.div>
  );
}
