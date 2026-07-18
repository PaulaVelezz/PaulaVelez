import { motion } from "framer-motion";
import PROFILE from "/Perfil_2026.png";

const ProfileIdentityCard = () => {
  const visualVariants = {
    rest: {},
    hover: {},
  };

  const initialsVariants = {
    rest: {
      opacity: 1,
      scale: 1,
    },
    hover: {
      opacity: 0,
      scale: 0.9,
    },
  };

  const imageVariants = {
    rest: {
      opacity: 0,
      scale: 0.9,
      filter: "blur(8px)",
    },
    hover: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="
      group
      relative
      w-full
      max-w-[400px]
      rounded-[32px]
      border
      border-white/10
      bg-[#0d0d0f]
      overflow-hidden
      shadow-2xl
      "
    >
      {/* glow */}
      <div
        className="
        absolute
        inset-0
        opacity-70
        pointer-events-none
      "
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(163,230,53,.08), transparent 55%)",
        }}
      />

      {/* subtle grid */}
      <div
        className="
        absolute
        inset-0
        opacity-[0.03]
        pointer-events-none
      "
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
        }}
      />

      {/* HEADER */}

      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <span className="font-space text-[11px] tracking-[.35em] uppercase text-white/40">
          // PROFILE
        </span>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-pulse" />

          <span className="font-space uppercase tracking-widest text-[10px] text-[#A3E635]">
            Available
          </span>
        </div>
      </div>

      {/* VISUAL */}

      <motion.div
        className="relative h-[360px] overflow-hidden"
        variants={visualVariants}
        initial="rest"
        animate="rest"
        whileHover="hover"
      >
        {/* Initials */}

        <motion.div
          variants={initialsVariants}
          transition={{ duration: 0.45 }}
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            z-20
            pointer-events-none
            "
        >
          <span
            className="
            font-korium
            text-[180px]
            leading-none
            text-white
            select-none
        "
          >
            PV
          </span>
          {/* Reveal CORNER */}
          <div className="absolute bottom-0 right-0 z-30 w-30 h-24 pointer-events-none">
            <div
              className="
                absolute bottom-0 right-0 w-full h-full rounded-br-[32px]
                bg-gradient-to-tl from-white/20 to-transparent
                [clip-path:polygon(100%_100%,0_100%,100%_0)]
                transition-transform duration-500
                group-hover:scale-110
              "
            />
            <div className="flex flex-row items-center gap-2 absolute bottom-3 right-3 text-[8px] tracking-[0.25em] text-white/60 font-space uppercase">
              <span>REVEAL</span>
              <span className="text-[#A3E635] text-sm">↗</span>
            </div>
          </div>
        </motion.div>

        {/* Photo */}

        <motion.img
          src={PROFILE}
          alt="Paula Velez"
          variants={imageVariants}
          transition={{ duration: 0.45 }}
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            rounded-b-[32px]
            "
        />
      </motion.div>

      {/* INFO */}

      <div className="divide-y divide-white/10">
        <Info label="name" value="Paula Velez" />

        <Info label="role" value="Frontend & Creative Developer" />

        <Info label="based" value="Córdoba, Argentina · Remote" />

        <div className="flex justify-between px-6 py-4">
          <span className="font-space text-white/35">status</span>

          <span className="text-[#A3E635] font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A3E635] animate-pulse" />
            Open to work
          </span>
        </div>
      </div>
    </motion.div>
  );
};

function Info({ label, value }) {
  return (
    <div className="flex justify-between px-6 py-4">
      <span className="font-space text-white/35 lowercase">{label}</span>

      <span className="font-medium text-right text-white">{value}</span>
    </div>
  );
}

export default ProfileIdentityCard;
