"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Technology stack data with logos and names
const technologies = [
  {
    name: 'React JS',
    logo: '/react.webp',
  },
  {
    name: 'Next JS',
    logo: '/nextJs.webp',
  },
  {
    name: 'TypeScript',
    logo: '/typescript.webp',
  },
  {
    name: 'JavaScript',
    logo: '/javascript.webp',
  },
  {
    name: 'Node JS',
    logo: '/nodeJs.webp',
  },
  {
    name: 'Tailwind CSS',
    logo: '/tailwind.webp',
  },
  {
    name: 'MongoDB',
    logo: '/mongoDB.webp',
  },
  {
    name: 'Supabase',
    logo: '/supabase.webp',
  },
  {
    name: 'Prisma',
    logo: '/prisma.webp',
  },
  {
    name: 'PostgreSQL',
    logo: '/postgres.webp',
  },
  {
    name:"Open AI",
    logo:'/openAI.webp'
  }
];

const TechStackSection = () => {
  const techStackRef = useRef<HTMLElement>(null);

  return (
    <section ref={techStackRef} id="tech-stack" className="py-20 relative px-4 bg-[#1b1b1f] border-t border-[#2e2e32]">
      <div className="container mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold text-white inline-block relative">
            Tech Stack
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-gradient-to-r from-[#bd34fe] to-[#41d1ff] rounded-full" />
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="flex flex-col items-center p-6 rounded-2xl bg-[#242424] border border-[#3c3f44] shadow-lg transition-all text-zinc-300 hover:text-white hover:border-[#bd34fe]/50 hover:bg-[#2e2e32] group hover:shadow-[0_0_20px_rgba(189,52,254,0.1)]"
            >
              <div className="w-16 h-16 relative mb-4 flex items-center justify-center p-3 rounded-xl bg-[#1b1b1f] group-hover:bg-[#1b1b1f] border border-[#3c3f44] transition-colors">
                <Image
                  src={tech.logo}
                  alt={tech.name}
                  width={64}
                  height={64}
                  className="object-contain max-h-12 drop-shadow-md brightness-90 group-hover:brightness-110 transition-all opacity-80 group-hover:opacity-100"
                />
              </div>
              <span className="text-sm font-bold tracking-wide text-center">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;