"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GithubIcon,
  Twitter,
  Linkedin,
  Mail,
  ChevronDown,
  ExternalLink,
  Code2,
  Palette,
  Cpu,
  Globe,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence} from "framer-motion";
import ContactForm from "@/components/ContactForm";
import { toast, ToastContainer } from "react-toastify";
import TechStackSection from "@/components/TechStack";
import { projects } from "@/lib/data";
import CustomCursor from "@/components/CustomCursor";
import ParticlesBg from "@/components/ParticlesBg";
// import StatCounters from "@/components/StatCounters";
import TiltCard from "@/components/TiltCard";
import { TypewriterWords, ScrambleText } from "@/components/TypewriterEffect";
import AvailabilityPulse from "@/components/AvailabilityPulse";

const ALL_TAGS = ["All", "React", "Next.js", "TypeScript", "Node.js", "MongoDB", "AI", "Tailwind CSS", "Prisma"];

export default function Page() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTag, setActiveTag] = useState("All");

  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const scrollToSection = (sectionRef: React.RefObject<HTMLElement | null>) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.5 },
    );
    const sections = [homeRef, aboutRef, projectsRef, skillsRef, contactRef];
    sections.forEach((s) => s.current && observer.observe(s.current));

    const timer = setTimeout(() => setShowWelcome(false), 1500);
    return () => {
      clearTimeout(timer);
      sections.forEach((s) => s.current && observer.unobserve(s.current));
    };
  }, []);

  const navItems = [
    { name: "Home", ref: homeRef },
    { name: "About", ref: aboutRef },
    { name: "Projects", ref: projectsRef },
    { name: "Skills", ref: skillsRef },
    { name: "Contact", ref: contactRef },
  ];

  const filteredProjects = activeTag === "All"
    ? projects
    : projects.filter((p) => p.technologies.some((t) => t === activeTag));

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} theme="dark" />
      <CustomCursor />

      <div className="min-h-screen bg-[#1b1b1f] text-[#ebebf5] selection:bg-[#bd34fe]/30 selection:text-white relative overflow-x-hidden font-sans">
        
        {/* Canvas Particles */}
        <ParticlesBg />

        {/* Ambient gradient blobs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#bd34fe]/10 blur-[150px] animate-blob" />
          <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] rounded-full bg-[#41d1ff]/10 blur-[150px] animate-blob animation-delay-2000" />
          <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-[#bd34fe]/5 blur-[120px] animate-blob animation-delay-4000" />
        </div>

        {/* Welcome Animation */}
        <AnimatePresence>
          {showWelcome && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="fixed inset-0 flex items-center justify-center z-[100] bg-[#1b1b1f]/95 backdrop-blur-xl"
            >
              <motion.div
                className="flex flex-col items-center bg-[#242424] border border-[#3c3f44] p-10 rounded-3xl shadow-2xl"
                initial={{ y: 40, scale: 0.9 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: -40, opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", damping: 18 }}
              >
                <motion.div
                  animate={{ rotate: [0, -20, 20, -20, 20, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                  className="text-6xl mb-6 origin-bottom-right"
                >
                  👋
                </motion.div>
                <motion.h2
                  className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#bd34fe] to-[#41d1ff] text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Welcome to my Portfolio
                </motion.h2>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Header ── */}
        <header className="fixed top-0 w-full z-50 bg-[#1b1b1f]/80 backdrop-blur-xl border-b border-[#3c3f44] transition-all duration-300">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-20">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-extrabold text-white cursor-pointer tracking-tight hover:text-[#bd34fe] transition-colors"
                onClick={() => scrollToSection(homeRef)}
              >
                Jaskamal Singh
              </motion.span>

              <button
                className="ml-auto block md:hidden text-zinc-400 hover:text-white transition-colors p-2"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>

              <nav className="hidden md:flex items-center gap-8">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.ref)}
                    className={`text-sm font-bold tracking-wide transition-all hover:text-[#bd34fe] relative ${
                      activeSection === item.name.toLowerCase() ? "text-white" : "text-zinc-400"
                    }`}
                  >
                    {item.name}
                    {activeSection === item.name.toLowerCase() && (
                      <motion.div layoutId="activeTab" className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#bd34fe] rounded-full" />
                    )}
                  </motion.button>
                ))}
              </nav>
            </div>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="md:hidden overflow-hidden bg-[#242424]/95 backdrop-blur-2xl border-t border-[#3c3f44] rounded-b-2xl shadow-xl"
                >
                  <nav className="flex flex-col p-6 gap-4">
                    {navItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => scrollToSection(item.ref)}
                        className={`text-lg font-medium text-left px-4 py-3 rounded-xl transition-colors ${
                          activeSection === item.name.toLowerCase()
                            ? "bg-[#3c3f44] text-[#bd34fe]"
                            : "text-zinc-400 hover:bg-[#323232] hover:text-white"
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                    <div className="pt-4 border-t border-[#3c3f44]">
                      <Link href="https://drive.google.com/file/d/1SaaDqPpkLF3b9lV9eff8enM_FmrVfKqZ/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                        <Button className="w-full bg-[#bd34fe] hover:bg-[#a62ce6] text-white border-none rounded-xl py-6 text-lg font-bold">
                          Download Resume
                        </Button>
                      </Link>
                    </div>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* ── Hero ── */}
        <section ref={homeRef} id="home" className="relative pt-40 pb-20 min-h-[90vh] flex items-center justify-center z-10">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <AvailabilityPulse />
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white mt-4">
                    <TypewriterWords /> <br />
                    <ScrambleText text="Developer & Designer" />
                  </h1>
                  <p className="text-lg sm:text-xl text-zinc-400 max-w-xl leading-relaxed font-medium">
                    I craft responsive websites where technology meets creativity. Building digital experiences that inspire and connect with people.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      onClick={() => scrollToSection(contactRef)}
                      className="bg-[#bd34fe] text-white hover:bg-[#a62ce6] px-8 py-6 rounded-full text-lg font-bold shadow-[0_0_20px_rgba(189,52,254,0.3)] border-none"
                    >
                      Get in Touch
                    </Button>
                  </motion.div>
                  <Button
                    onClick={() => scrollToSection(projectsRef)}
                    variant="outline"
                    className="border-[#3c3f44] bg-[#242424] text-white hover:bg-[#3c3f44] px-8 py-6 rounded-full text-lg font-bold transition-all"
                  >
                    View Projects
                  </Button>
                </div>

                <div className="flex items-center gap-6 pt-8">
                  {[
                    { Icon: GithubIcon, url: "https://github.com/jaskamal2724" },
                    { Icon: Twitter, url: "https://x.com/Jassi_2724" },
                    { Icon: Linkedin, url: "https://www.linkedin.com/in/jaskamal-singh-9a9039259/" },
                    { Icon: Mail, url: "mailto:jaskamalsingh7872@gmail.com" },
                  ].map(({ Icon, url }, i) => (
                    <motion.a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5, scale: 1.1 }}
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-[#242424] border border-[#3c3f44] text-zinc-300 hover:text-[#bd34fe] hover:border-[#bd34fe]/50 transition-colors shadow-lg"
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Code card with cursor-blink */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative lg:h-[500px] flex items-center justify-center pt-10 lg:pt-0"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#bd34fe]/30 to-[#41d1ff]/20 blur-[100px] rounded-full opacity-60" />
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-full max-w-md"
                >
                  <TiltCard>
                    <Card className="bg-[#242424]/90 border-[#3c3f44] p-8 rounded-3xl shadow-2xl backdrop-blur-xl overflow-hidden relative">
                      <div className="absolute top-0 left-0 right-0 h-10 bg-[#1b1b1f]/50 border-b border-[#3c3f44] flex items-center px-4 gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="ml-3 text-xs text-zinc-500 font-mono">developer.ts</span>
                      </div>
                      <code className="text-sm sm:text-base font-mono space-y-4 block pt-6">
                        <p className="text-[#bd34fe]">const<span className="text-zinc-300"> developer = {"{"}</span></p>
                        <p className="pl-6">
                          <span className="text-[#41d1ff]">name:</span>{" "}
                          <span className="text-green-400">&apos;JASKAMAL SINGH&apos;</span>,
                        </p>
                        <p className="pl-6 text-zinc-400">
                          skills: [<span className="text-yellow-300">&apos;React&apos;</span>,{" "}
                          <span className="text-yellow-300">&apos;Next.js&apos;</span>,{" "}
                          <span className="text-yellow-300">&apos;UI/UX&apos;</span>],
                        </p>
                        <p className="pl-6">
                          <span className="text-[#41d1ff]">isAvailable:</span>{" "}
                          <span className="text-[#bd34fe]">true</span>
                          <motion.span
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 1.1, repeat: Infinity }}
                            className="text-[#41d1ff] ml-0.5"
                          >
                            |
                          </motion.span>
                        </p>
                        <p className="text-zinc-300">{"}"}</p>
                      </code>
                    </Card>
                  </TiltCard>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <ChevronDown className="w-8 h-8 text-zinc-500 opacity-60" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── Stat Counters ── */}
        {/* <StatCounters /> */}

        {/* ── About ── */}
        <section ref={aboutRef} id="about" className="py-24 relative z-10 border-t border-[#2e2e32] bg-[#1b1b1f]/50">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-white inline-block relative">
                About Me
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-[#41d1ff] rounded-full" />
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-2 lg:order-1"
              >
                <div className="bg-[#242424] border border-[#3c3f44] p-8 sm:p-10 rounded-3xl shadow-xl space-y-6">
                  <p className="text-lg text-zinc-300 leading-relaxed">
                    I&apos;m a <span className="font-bold text-[#bd34fe]">passionate developer and designer</span> with a keen eye for creating{" "}
                    <span className="text-[#41d1ff] font-semibold">beautiful, functional, and user-centered digital experiences</span>.
                  </p>
                  <p className="text-lg text-zinc-400 leading-relaxed">
                    With a background in full-stack development, I bring a holistic approach to every project.
                  </p>
                  <ul className="space-y-4 pt-4">
                    {[
                      "Exploring new design trends & technologies",
                      "Contributing to open-source projects",
                      "Writing technical blog posts",
                      "Building intuitive interfaces",
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -15 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center text-zinc-200 font-medium"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#bd34fe] mr-4 shadow-[0_0_10px_rgba(189,52,254,0.8)]" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2 flex justify-center"
              >
                <div className="relative w-72 h-96 sm:w-96 sm:h-[500px]">
                  <div className="absolute inset-0 border-2 border-[#bd34fe]/50 rounded-[2.5rem] transform translate-x-4 translate-y-4 -z-10" />
                  <Image src="/portfolio.jpg" alt="Profile" fill className="object-cover rounded-[2.5rem] shadow-2xl" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Tech Stack ── */}
        <TechStackSection />

        {/* ── Projects ── */}
        <section ref={projectsRef} id="projects" className="py-24 relative z-10 border-t border-b border-[#2e2e32] bg-[#1b1b1f]/50">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="text-4xl font-extrabold text-white inline-block relative">
                Featured Projects
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-[#bd34fe] rounded-full" />
              </h2>
            </motion.div>

            {/* Tag filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {ALL_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-all ${
                    activeTag === tag
                      ? "bg-[#bd34fe] border-[#bd34fe] text-white shadow-[0_0_12px_rgba(189,52,254,0.4)]"
                      : "border-[#3c3f44] bg-[#242424] text-zinc-400 hover:border-[#bd34fe]/50 hover:text-white"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((item, index) => (
                  <motion.div
                    key={item.title}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.07 }}
                  >
                    <TiltCard>
                      <Card className="group h-full bg-[#242424] border-[#3c3f44] overflow-hidden hover:border-[#bd34fe]/50 transition-all duration-300 rounded-2xl flex flex-col hover:shadow-[0_0_30px_rgba(189,52,254,0.1)]">
                        <div className="relative aspect-[16/10] overflow-hidden bg-[#1b1b1f]">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            unoptimized
                            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1b1b1f] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <Button
                              onClick={() => item.vercel ? window.open(item.vercel, "_blank") : toast.info("Not yet deployed")}
                              className="w-full bg-[#bd34fe] hover:bg-[#a62ce6] text-white border-none font-bold rounded-xl"
                            >
                              View Project <ExternalLink className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        </div>
                        <div className="p-6 sm:p-8 flex flex-col flex-grow">
                          <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                          <p className="text-zinc-400 mb-6 flex-grow leading-relaxed line-clamp-3">{item.description}</p>
                          <div className="flex flex-wrap gap-2 pt-4 border-t border-[#3c3f44]">
                            {item.technologies.map((tech, i) => (
                              <Badge
                                key={i}
                                className="bg-[#3c3f44]/60 text-zinc-300 hover:bg-[#bd34fe]/20 hover:text-[#bd34fe] rounded-lg font-medium cursor-pointer transition-colors border-transparent"
                                onClick={() => setActiveTag(tech)}
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </TiltCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ── Skills ── */}
        <section ref={skillsRef} id="skills" className="py-24 relative z-10 bg-[#1b1b1f]">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-white inline-block relative">
                Skills & Expertise
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-[#41d1ff] rounded-full" />
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Code2, title: "Frontend Development", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
                { icon: Cpu, title: "Backend Development", skills: ["Node.js", "MongoDB", "Prisma", "PostgreSQL"] },
                { icon: Palette, title: "UI/UX Design", skills: ["Figma", "Framer Motion", "Responsive Design", "Accessibility"] },
                { icon: Globe, title: "Other Tools", skills: ["Git & GitHub", "Vercel", "REST APIs", "OpenAI Integrations"] },
              ].map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full bg-[#242424] border-[#3c3f44] hover:border-[#bd34fe]/50 p-8 transition-all rounded-3xl group hover:shadow-[0_0_20px_rgba(189,52,254,0.1)]">
                    <div className="w-14 h-14 rounded-2xl bg-[#1b1b1f] border border-[#3c3f44] text-zinc-300 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:text-[#bd34fe] group-hover:border-[#bd34fe]/50 transition-all duration-300">
                      <category.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">{category.title}</h3>
                    <ul className="space-y-3">
                      {category.skills.map((skill) => (
                        <li key={skill} className="flex items-center text-zinc-400 font-medium group-hover:text-zinc-200 transition-colors">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#41d1ff] mr-3" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section ref={contactRef} id="contact" className="py-24 relative z-10 bg-[#1b1b1f] overflow-hidden border-t border-[#2e2e32]">
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#bd34fe] rounded-full blur-[150px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#41d1ff] rounded-full blur-[150px]" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <Card className="max-w-4xl mx-auto bg-[#242424]/80 backdrop-blur-xl border border-[#3c3f44] rounded-[3rem] p-10 sm:p-16 text-center text-white shadow-2xl overflow-hidden">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-8">
                <div className="inline-flex items-center justify-center p-5 bg-[#1b1b1f] rounded-full border border-[#3c3f44]">
                  <Mail className="w-8 h-8 text-[#41d1ff]" />
                </div>
                <h2 className="text-4xl sm:text-5xl font-extrabold">Let&apos;s build something great.</h2>
                <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                  Interested in working together or just want to chat? Drop me a message.
                </p>
                <div className="pt-6">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      className="bg-[#bd34fe] text-white hover:bg-[#a62ce6] px-10 py-7 rounded-full text-xl font-bold shadow-[0_0_40px_rgba(189,52,254,0.3)] border-none"
                      onClick={() => setIsContactFormOpen(true)}
                    >
                      Say Hello 👋
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </Card>
          </div>

          <AnimatePresence>
            {isContactFormOpen && <ContactForm onClose={() => setIsContactFormOpen(false)} />}
          </AnimatePresence>
        </section>

        {/* ── Footer ── */}
        <footer className="bg-[#1b1b1f] py-12 border-t border-[#2e2e32] relative z-10">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-zinc-500 font-medium tracking-wide">
                © {new Date().getFullYear()} Jaskamal Singh. All rights reserved.
              </p>
              <div className="flex items-center gap-5">
                {[
                  { Icon: GithubIcon, url: "https://github.com/jaskamal2724" },
                  { Icon: Twitter, url: "https://x.com/Jassi_2724" },
                  { Icon: Linkedin, url: "https://www.linkedin.com/in/jaskamal-singh-9a9039259/" },
                  { Icon: Mail, url: "mailto:jaskamalsingh7872@gmail.com" },
                ].map(({ Icon, url }, i) => (
                  <motion.a
                    whileHover={{ y: -3 }}
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[#242424] flex items-center justify-center text-zinc-400 hover:bg-[#3c3f44] hover:text-white transition-all border border-[#3c3f44]"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
