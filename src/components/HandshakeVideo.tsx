import { motion } from "framer-motion";

interface HandshakeVideoProps {
  className?: string;
  overlayClassName?: string;
}

export default function HandshakeVideo({
  className = "",
  overlayClassName = "",
}: HandshakeVideoProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/animations/handshake.mp4" type="video/mp4" />
      </motion.video>

      {/* Brand tint + vignette for readability */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-navy-950/92 via-navy-900/78 to-navy-950/92 ${overlayClassName}`}
      />
      <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-navy-950/50" />
    </div>
  );
}
