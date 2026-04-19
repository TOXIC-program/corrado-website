import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import vwLogo from "@assets/vw_logo.png";
import vwLogoNav from "@assets/image_1776596917406.png";
import corradoFront from "@assets/corrado_front.png";
import corradoRear from "@assets/corrado_rear.png";
import corradoTop from "@assets/corrado_top.png";

const specs = [
  { label: "Engine", value: "2.8L VR6" },
  { label: "Power", value: "178 hp" },
  { label: "Torque", value: "240 Nm" },
  { label: "0–100 kph", value: "6.7 sec" },
  { label: "Top Speed", value: "225 kph" },
  { label: "Cylinders", value: "6 in-line V" },
  { label: "Displacement", value: "2792 cc" },
  { label: "Years", value: "1991–1995" },
];

const features = [
  {
    title: "VR6 Narrow-Angle Engine",
    description:
      "The revolutionary VR6 blended the compactness of an inline-4 with the power of a V6. Its unique 15° narrow-angle design allowed six cylinders to fit in a space typically reserved for four, producing a distinctive and throaty soundtrack unlike anything else on the road.",
  },
  {
    title: "G-Lader Supercharger Heritage",
    description:
      "Before the VR6, the Corrado came with the G60 — a Volkswagen-engineered scroll-type supercharger. This heritage of forced induction engineering informed the Corrado's DNA as a performance machine, always pushing beyond conventional limits.",
  },
  {
    title: "Automatic Rear Spoiler",
    description:
      "One of the Corrado's most iconic features was its electronically-actuated rear spoiler. At 45 mph it automatically deployed to improve high-speed stability and aerodynamic downforce. Below 7 mph it retracted flush into the bodywork — pure automotive theater.",
  },
  {
    title: "Wind-Cheating Aerodynamics",
    description:
      "With a drag coefficient of just 0.32 Cd, the Corrado's wedge-shaped body was sculpted in wind tunnels. Every line, every crease, and the integrated front lip worked together to slice through air with purpose. It remains one of the most aerodynamically efficient cars of its era.",
  },
  {
    title: "Four-Wheel Independent Suspension",
    description:
      "The Corrado used a sophisticated multi-link rear suspension borrowed from the Golf, tuned specifically for performance. Combined with front MacPherson struts, the result was a car that felt planted and responsive, eager to be pushed through corners with confidence.",
  },
  {
    title: "Motorsport-Inspired Brakes",
    description:
      "Ventilated disc brakes at all four corners gave the Corrado VR6 stopping power that matched its acceleration. The system was derived from Volkswagen's motorsport program, providing consistent, fade-resistant performance even during spirited driving.",
  },
];

function TiltCard({
  src,
  alt,
  testId,
  glowColor = "rgba(27,92,229,0.25)",
}: {
  src: string;
  alt: string;
  testId: string;
  glowColor?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const rotateX = useSpring(rawX, { stiffness: 200, damping: 25 });
  const rotateY = useSpring(rawY, { stiffness: 200, damping: 25 });
  const scale = useSpring(hovered ? 1.03 : 1, { stiffness: 300, damping: 28 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      rawX.set((y - 0.5) * -14);
      rawY.set((x - 0.5) * 14);
      glareX.set(x * 100);
      glareY.set(y * 100);
    },
    [rawX, rawY, glareX, glareY]
  );

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    rawX.set(0);
    rawY.set(0);
    glareX.set(50);
    glareY.set(50);
  }, [rawX, rawY, glareX, glareY]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        perspective: 1000,
        cursor: "pointer",
        borderRadius: 16,
        position: "relative",
      }}
      className="w-full"
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-20"
        style={{
          background: `radial-gradient(circle at ${glareX.get()}% ${glareY.get()}%, rgba(255,255,255,0.18) 0%, transparent 60%)`,
          transition: "opacity 0.2s",
          opacity: hovered ? 1 : 0,
          borderRadius: 16,
          mixBlendMode: "overlay",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          borderRadius: 20,
          boxShadow: hovered
            ? `0 40px 100px ${glowColor}, 0 8px 32px rgba(0,0,0,0.18)`
            : `0 20px 60px rgba(0,30,80,0.15)`,
          transition: "box-shadow 0.4s ease",
        }}
      />

      <motion.img
        src={src}
        alt={alt}
        className="w-full rounded-2xl relative z-10 block"
        style={{ objectFit: "cover", display: "block" }}
        data-testid={testId}
      />

      {hovered && (
        <div
          className="absolute bottom-4 left-1/2 pointer-events-none z-30"
          style={{
            transform: "translateX(-50%) translateZ(20px)",
            background: "rgba(0,30,80,0.7)",
            color: "white",
            fontFamily: "'Epilogue', sans-serif",
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            padding: "6px 14px",
            borderRadius: 100,
            backdropFilter: "blur(8px)",
            whiteSpace: "nowrap",
          }}
        >
          {alt}
        </div>
      )}
    </motion.div>
  );
}

function NavBar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
      style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,30,80,0.08)" }}
    >
      <div className="flex items-center gap-3">
        <img
          src={vwLogoNav}
          alt="VW"
          style={{ width: 38, height: 38, objectFit: "cover", borderRadius: "50%", filter: "drop-shadow(0 2px 8px rgba(0,30,80,0.25))" }}
        />
        <span className="font-semibold text-sm tracking-widest uppercase" style={{ color: "#001e50", fontFamily: "'Epilogue', sans-serif", letterSpacing: "0.18em" }}>
          Corrado VR6
        </span>
      </div>
      <div className="flex items-center gap-8">
        {["Heritage", "Engine", "Design", "Specs"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-xs font-medium tracking-widest uppercase transition-colors"
            style={{ color: "#001e50", fontFamily: "'Epilogue', sans-serif", letterSpacing: "0.14em", textDecoration: "none", opacity: 0.7 }}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  );
}

function Layer1Logo() {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "#ffffff" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(27,92,229,0.12) 0%, transparent 70%)",
              transform: "scale(1.8)",
              filter: "blur(30px)",
            }}
          />
          <motion.img
            src={vwLogo}
            alt="Volkswagen Logo"
            className="relative z-10"
            style={{ width: 220, height: 220, objectFit: "contain", filter: "drop-shadow(0 20px 60px rgba(0,30,80,0.18))" }}
            whileHover={{ scale: 1.08, rotate: 5, filter: "drop-shadow(0 30px 80px rgba(27,92,229,0.35))" }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            data-testid="img-vw-logo"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p
            className="text-xs tracking-widest uppercase mb-4"
            style={{ color: "#001e50", fontFamily: "'Epilogue', sans-serif", letterSpacing: "0.3em", opacity: 0.5 }}
          >
            Volkswagen
          </p>
          <h1
            className="text-7xl font-black leading-none"
            style={{ color: "#001e50", fontFamily: "'Epilogue', sans-serif", letterSpacing: "-0.02em" }}
            data-testid="text-main-title"
          >
            CORRADO
          </h1>
          <h2
            className="text-4xl font-light mt-2"
            style={{ color: "#001e50", fontFamily: "'Epilogue', sans-serif", letterSpacing: "0.12em", opacity: 0.6 }}
          >
            VR6
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex flex-col items-center gap-2"
          style={{ color: "#001e50", opacity: 0.4 }}
        >
          <span className="text-xs tracking-widest uppercase" style={{ fontFamily: "'Epilogue', sans-serif", letterSpacing: "0.2em" }}>
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <rect x="6.5" y="0.5" width="3" height="15" rx="1.5" fill="currentColor" opacity="0.5" />
              <path d="M2 14L8 21L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }}
      />
    </section>
  );
}

function Layer2Front() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const textX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [-40, 0, 0, 40]);

  return (
    <section
      ref={ref}
      id="heritage"
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-24"
      style={{ background: "#ffffff" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(0,30,80,0.04) 0%, transparent 70%)",
        }}
      />

      <motion.div style={{ opacity }} className="w-full max-w-7xl mx-auto px-8 flex flex-col items-center gap-16">
        <div className="text-center">
          <motion.p
            style={{ x: textX, color: "#001e50", fontFamily: "'Epilogue', sans-serif", letterSpacing: "0.3em", opacity: 0.45 }}
            className="text-xs tracking-widest uppercase mb-3"
          >
            Layer 02 — Front View
          </motion.p>
          <h2
            className="text-6xl font-black leading-none"
            style={{ color: "#001e50", fontFamily: "'Epilogue', sans-serif", letterSpacing: "-0.02em" }}
            data-testid="text-front-title"
          >
            THE FRONT
          </h2>
          <p
            className="text-xl font-light mt-2"
            style={{ color: "#001e50", fontFamily: "'Epilogue', sans-serif", opacity: 0.5 }}
          >
            Aggression by Design
          </p>
        </div>

        <motion.div style={{ y: imgY, perspective: 1000 }} className="relative w-full max-w-4xl">
          <TiltCard
            src={corradoFront}
            alt="Corrado VR6 — Front View"
            testId="img-corrado-front"
            glowColor="rgba(27,92,229,0.3)"
          />
        </motion.div>

        <div className="w-full max-w-3xl mx-auto text-center">
          <p
            className="text-lg leading-relaxed"
            style={{ color: "#111827", fontFamily: "'Inter', sans-serif", fontWeight: 300, lineHeight: 1.8 }}
            data-testid="text-front-description"
          >
            From the front, the Corrado commands instant respect. Its low, wide stance and razor-sharp hood lines
            communicate intent before a single rev. The integrated front air dam and projector headlights frame
            a face that remains unmistakably purposeful — a sports car born from one of Europe's great engineering houses.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

function Layer3Rear() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      id="design"
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-24"
      style={{ background: "#f8f9fc" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(0,30,80,0.03) 0%, transparent 50%, rgba(27,92,229,0.03) 100%)",
        }}
      />

      <motion.div style={{ opacity }} className="w-full max-w-7xl mx-auto px-8 flex flex-col items-center gap-16">
        <div className="text-center">
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: "#001e50", fontFamily: "'Epilogue', sans-serif", letterSpacing: "0.3em", opacity: 0.45 }}
          >
            Layer 03 — Rear View
          </p>
          <h2
            className="text-6xl font-black leading-none"
            style={{ color: "#001e50", fontFamily: "'Epilogue', sans-serif", letterSpacing: "-0.02em" }}
            data-testid="text-rear-title"
          >
            THE REAR
          </h2>
          <p
            className="text-xl font-light mt-2"
            style={{ color: "#001e50", fontFamily: "'Epilogue', sans-serif", opacity: 0.5 }}
          >
            The Spoiler That Surprised the World
          </p>
        </div>

        <div className="relative w-full max-w-4xl" style={{ perspective: 1000 }}>
          <TiltCard
            src={corradoRear}
            alt="Corrado VR6 — Rear View"
            testId="img-corrado-rear"
            glowColor="rgba(0,30,80,0.25)"
          />
        </div>

        <div className="w-full max-w-3xl mx-auto text-center">
          <p
            className="text-lg leading-relaxed"
            style={{ color: "#111827", fontFamily: "'Inter', sans-serif", fontWeight: 300, lineHeight: 1.8 }}
            data-testid="text-rear-description"
          >
            The rear of the Corrado tells the most dramatic story. At 45 mph, the electric spoiler emerges from its
            flush recess to deliver aerodynamic downforce — then retreats just as silently when speeds drop.
            The wide taillights sweep across the full width of the car, giving it a stance that looks
            planted, purposeful, and unmistakably 1990s European sports car excellence.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

function Layer4Top() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      id="engine"
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-24"
      style={{ background: "#ffffff" }}
    >
      <motion.div style={{ opacity }} className="w-full max-w-7xl mx-auto px-8 flex flex-col items-center gap-16">
        <div className="text-center">
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ color: "#001e50", fontFamily: "'Epilogue', sans-serif", letterSpacing: "0.3em", opacity: 0.45 }}
          >
            Layer 04 — Aerial View
          </p>
          <h2
            className="text-6xl font-black leading-none"
            style={{ color: "#001e50", fontFamily: "'Epilogue', sans-serif", letterSpacing: "-0.02em" }}
            data-testid="text-top-title"
          >
            FROM ABOVE
          </h2>
          <p
            className="text-xl font-light mt-2"
            style={{ color: "#001e50", fontFamily: "'Epilogue', sans-serif", opacity: 0.5 }}
          >
            Sculpture in Sheet Metal
          </p>
        </div>

        <motion.div style={{ y, perspective: 1000 }} className="relative w-full max-w-4xl">
          <TiltCard
            src={corradoTop}
            alt="Corrado VR6 — Aerial View"
            testId="img-corrado-top"
            glowColor="rgba(0,176,240,0.25)"
          />
        </motion.div>

        <div className="w-full max-w-3xl mx-auto text-center">
          <p
            className="text-lg leading-relaxed"
            style={{ color: "#111827", fontFamily: "'Inter', sans-serif", fontWeight: 300, lineHeight: 1.8 }}
            data-testid="text-top-description"
          >
            From above, the Corrado reveals the true mastery of its form. The tapering roofline flows
            from the A-pillars in a single unbroken arc to the tail, giving it the profile of a stretched
            teardrop. Every surface serves the air. Every crease has purpose. Seen from the sky,
            you understand why journalists called it the most beautiful car Volkswagen ever built.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

function SpecsSection() {
  return (
    <section
      id="specs"
      className="py-32 relative overflow-hidden"
      style={{ background: "#001e50" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(27,92,229,0.3) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-6xl mx-auto px-8 relative z-10">
        <div className="text-center mb-20">
          <p
            className="text-xs tracking-widest uppercase mb-4"
            style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Epilogue', sans-serif", letterSpacing: "0.3em" }}
          >
            Technical Data
          </p>
          <h2
            className="text-6xl font-black"
            style={{ color: "#ffffff", fontFamily: "'Epilogue', sans-serif", letterSpacing: "-0.02em" }}
            data-testid="text-specs-title"
          >
            SPECS
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden" }}>
          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ background: "rgba(255,255,255,0.10)" }}
              className="flex flex-col items-center justify-center py-10 px-6 text-center"
              style={{ background: "rgba(255,255,255,0.04)", borderRight: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", cursor: "default", transition: "background 0.2s" }}
              data-testid={`spec-card-${i}`}
            >
              <span
                className="text-3xl font-black mb-2"
                style={{ color: "#ffffff", fontFamily: "'Epilogue', sans-serif" }}
              >
                {spec.value}
              </span>
              <span
                className="text-xs tracking-widest uppercase"
                style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Epilogue', sans-serif", letterSpacing: "0.15em" }}
              >
                {spec.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section
      id="features"
      className="py-32 relative"
      style={{ background: "#f8f9fc" }}
    >
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-20">
          <p
            className="text-xs tracking-widest uppercase mb-4"
            style={{ color: "#001e50", fontFamily: "'Epilogue', sans-serif", letterSpacing: "0.3em", opacity: 0.45 }}
          >
            Engineering Excellence
          </p>
          <h2
            className="text-6xl font-black"
            style={{ color: "#001e50", fontFamily: "'Epilogue', sans-serif", letterSpacing: "-0.02em" }}
            data-testid="text-features-title"
          >
            WHAT MAKES IT
            <br />
            <span style={{ color: "#1b5ce5" }}>LEGENDARY</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, boxShadow: "0 16px 48px rgba(0,30,80,0.14)" }}
              className="rounded-2xl p-8 flex flex-col gap-4"
              style={{ background: "#ffffff", border: "1px solid rgba(0,30,80,0.08)", boxShadow: "0 4px 24px rgba(0,30,80,0.06)", cursor: "default" }}
              data-testid={`feature-card-${i}`}
            >
              <div
                className="w-10 h-1 rounded-full"
                style={{ background: "#1b5ce5" }}
              />
              <h3
                className="text-lg font-bold leading-tight"
                style={{ color: "#001e50", fontFamily: "'Epilogue', sans-serif" }}
              >
                {feature.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "#374151", fontFamily: "'Inter', sans-serif", fontWeight: 300, lineHeight: 1.8 }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeritageBanner() {
  return (
    <section
      className="py-40 relative overflow-hidden flex flex-col items-center justify-center"
      style={{ background: "#ffffff" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(27,92,229,0.05) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs tracking-widest uppercase mb-6"
          style={{ color: "#001e50", fontFamily: "'Epilogue', sans-serif", letterSpacing: "0.3em", opacity: 0.4 }}
        >
          1988 – 1995
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl font-black leading-none mb-8"
          style={{ color: "#001e50", fontFamily: "'Epilogue', sans-serif", letterSpacing: "-0.02em" }}
          data-testid="text-heritage-title"
        >
          A SPORT COUPE
          <br />
          AHEAD OF ITS TIME
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xl leading-relaxed max-w-2xl mx-auto"
          style={{ color: "#374151", fontFamily: "'Inter', sans-serif", fontWeight: 300, lineHeight: 1.8 }}
          data-testid="text-heritage-body"
        >
          The Volkswagen Corrado was Volkswagen's answer to a simple question: what happens when you
          take the world's most advanced four-cylinder platform and push it further than anyone thought
          possible? The result was a car that challenged Porsches, embarrassed hatchbacks, and
          redefined what a "hot Volkswagen" could mean. Produced in just 97,521 units, every Corrado
          that survives today is a piece of automotive history.
        </motion.p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="py-16 border-t"
      style={{ background: "#ffffff", borderColor: "rgba(0,30,80,0.08)" }}
    >
      <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p
            className="text-xs tracking-widest uppercase"
            style={{ color: "#001e50", fontFamily: "'Epilogue', sans-serif", letterSpacing: "0.2em", opacity: 0.5 }}
          >
            Volkswagen Corrado VR6 — 1991–1995
          </p>
          <p
            className="text-xs mt-1"
            style={{ color: "#001e50", fontFamily: "'Inter', sans-serif", opacity: 0.35 }}
          >
            An appreciation of one of Volkswagen's finest achievements.
          </p>
        </div>
        <div
          className="text-xs"
          style={{ color: "#001e50", fontFamily: "'Epilogue', sans-serif", opacity: 0.3, letterSpacing: "0.1em" }}
        >
          Patrick Abou Nasr
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="relative">
      <NavBar />
      <Layer1Logo />
      <Layer2Front />
      <Layer3Rear />
      <Layer4Top />
      <HeritageBanner />
      <SpecsSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
}
