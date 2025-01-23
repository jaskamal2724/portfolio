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
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";


export default function Page() {

  const projects = [
    {
      title: "Get me a coffee",
      description: "A personal portfolio built with React, TypeScript, and Tailwind CSS.",
      technologies: ["React", "TypeScript", "Tailwind"],
      image: "/portfolio.svg",
      link: "https://imgs.search.brave.com/OsD3fj5NxCxoYh6ACc-nz6pDG06fQhAqtVX5y-lltTk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5saWNkbi5jb20v/ZG1zL2ltYWdlL0Q0/RDEyQVFGUUVZdDJT/ZjR2bmcvYXJ0aWNs/ZS1jb3Zlcl9pbWFn/ZS1zaHJpbmtfNzIw/XzEyODAvMC8xNzAx/NzA0ODg5NjMwP2U9/MjE0NzQ4MzY0NyZ2/PWJldGEmdD04OU1X/cF9pb0ZFX2JlS2Qx/akx1M0wwcWFzbldW/cDJEUnIweTlHTGxI/ZHR3.jpeg",
    },
    {
      title: "Image_commerce",
      description: "A full-stack e-commerce platform with cart and payment integration.",
      technologies: ["Next.js", "Node.js", "MongoDB"],
      image: "/ecommerce.svg",
      link: "https://imgs.search.brave.com/zQhGz50WGpIa82DTIuZR1wQ4VugQW_eBqDd8IDep7wg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS82/NDYyNjU1ZTZmMTgx/MWFhYmU4MGQ4YmQv/NjY0Zjc1MmY3ZWQ2/MDY0MzBjZTRmOWEz/X1RvcCUyMDEwJTIw/aW1hZ2UlMjBtYW5h/Z2VycyUyMHRvJTIw/bmV2ZXIlMjBydW4l/MjBvdXQlMjBvZiUy/MHN0b3JhZ2UlMjBz/cGFjZS0yLnBuZw",
    },
    {
      title: "Chatify",
      description: "A real-time chat application with WebSocket integration.",
      technologies: ["React", "WebSockets", "Tailwind"],
      image: "/chat.svg",
      link: "https://imgs.search.brave.com/JjlI6fcgOV4FsSKwUHWqDxi0SfIp5qMmgtTqO-FsniA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE5/MTk2NzMzOS92ZWN0/b3IvaGFuZC1ob2xk/aW5nLXBob25lLXdp/dGgtc2hvcnQtbWVz/c2FnZXMtaWNvbnMt/YW5kLWVtb3RpY29u/cy1jaGF0dGluZy13/aXRoLWZyaWVuZHMt/YW5kLXNlbmRpbmcu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PUUtb3R1bkNibzVY/M0VwZ0VBYnF6VWt4/bF9uS0loRGlnZU5a/d0JrRTNWSVU9",
    },
  ];

  const [activeSection, setActiveSection] = useState("home");
  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (sectionRef: React.RefObject<HTMLElement | null>) => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = [homeRef, aboutRef, projectsRef, skillsRef, contactRef];
    sections.forEach((section) => {
      if (section.current) {
        observer.observe(section.current);
      }
    });

    return () => {
      sections.forEach((section) => {
        if (section.current) {
          observer.unobserve(section.current);
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white dark selection:bg-purple-500/30">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            Portfolio
          </span>

          {/* Hamburger Menu */}
          <button
            className="block md:hidden text-white/70 hover:text-purple-400 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6" /> // Icon for closing the menu
            ) : (
              <Menu className="w-6 h-6" /> // Icon for opening the menu
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { name: "Home", ref: homeRef },
              { name: "About", ref: aboutRef },
              { name: "Projects", ref: projectsRef },
              { name: "Skills", ref: skillsRef },
              { name: "Contact", ref: contactRef },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.ref)}
                className={`text-lg transition-colors hover:text-purple-400 ${
                  activeSection === item.name.toLowerCase()
                    ? "text-purple-400"
                    : "text-white/70"
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Resume Button */}
          <Link href="https://drive.google.com/file/d/1SaaDqPpkLF3b9lV9eff8enM_FmrVfKqZ/view?usp=sharing">
            <Button
              variant="outline"
              className="hidden md:block border-purple-500/50 hover:border-purple-500 text-lg"
            >
            Resume
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <div className="md:hidden mt-2 bg-black/80 border-t border-white/10 rounded-lg p-4">
            <nav className="flex flex-col gap-4">
              {[
                { name: "Home", ref: homeRef },
                { name: "About", ref: aboutRef },
                { name: "Projects", ref: projectsRef },
                { name: "Skills", ref: skillsRef },
                { name: "Contact", ref: contactRef },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    scrollToSection(item.ref);
                    setMenuOpen(false); // Close the menu after clicking
                  }}
                  className={`text-lg transition-colors hover:text-purple-400 ${
                    activeSection === item.name.toLowerCase()
                      ? "text-purple-400"
                      : "text-white/70"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
            <Link href="https://drive.google.com/file/d/1SaaDqPpkLF3b9lV9eff8enM_FmrVfKqZ/view?usp=sharing">
              <Button
                variant="outline"
                className="mt-4 w-full border-purple-500/50 hover:border-purple-500 text-lg"
              >
                Resume
              </Button>
            </Link>
          </div>
        )}
      </div>
      </header>

      {/* Hero Section */}
      <section
        ref={homeRef}
        id="home"
        className="relative pt-32 pb-20 overflow-hidden"
      >
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                  Creative
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    Developer & Designer
                  </span>
                </h1>
                <p className="text-lg text-white/70 max-w-2xl">
                  I craft responsive websites where technology meets creativity.
                  Building digital experiences that inspire and connect with
                  people.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Get in Touch
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-500/50 hover:border-purple-500"
                >
                  View Projects
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-6">
                {[
                  { Icon: GithubIcon, url: "https://github.com/jaskamal2724" },
                  { Icon: Twitter, url: "https://x.com/Jassi_2724" },
                  {
                    Icon: Linkedin,
                    url: "https://www.linkedin.com/in/jaskamal-singh-9a9039259/",
                  },
                  { Icon: Mail, url: "jaskamalsingh7872@gmail.com" },
                ].map(({ Icon, url }, index) => (
                  // <Button
                  //   key={index}
                  //   variant="ghost"
                  //   size="sm"
                  //   className="rounded-full hover:text-purple-400 hover:bg-purple-400/10 font-bold"
                  // >
                  <Link key={index} href={url} rel="noopener noreferrer">
                    <Icon className="w-5 h-5 text-white/70 hover:text-purple-400 transition-colors" />
                  </Link>
                  // </Button>
                ))}
              </div>
            </div>
            <div className="relative lg:h-[600px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl" />
              <Card className="relative bg-black/50 border-white/10 p-8 backdrop-blur-xl">
                <code className="text-sm font-mono space-y-4 block">
                  <p className="text-purple-400">const</p>
                  <p className="pl-4">
                    <span className="text-pink-400">developer</span> = {"{"}
                  </p>
                  <p className="pl-8">
                    name:{" "}
                    <span className="text-green-400">
                      &apos;JASKAMAL SINGH&apos;
                    </span>
                    ,
                  </p>
                  <p className="pl-8">
                    skills: [
                    <span className="text-yellow-400">&apos;Web&apos;</span>,{" "}
                    <span className="text-yellow-400">&apos;UI/UX&apos;</span>,{" "}
                    <span className="text-yellow-400">&apos;Mobile&apos;</span>
                    ],
                  </p>
                  <p className="pl-8">
                    isAvailable: <span className="text-blue-400">true</span>
                  </p>
                  <p className="pl-4">{"}"}</p>
                </code>
              </Card>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-purple-400" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} id="about" className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
              About Me
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-lg text-white/80 leading-relaxed">
                I&apos;m a{" "}
                <span className="font-semibold text-purple-400">
                  passionate developer and designer
                </span>{" "}
                with a keen eye for creating{" "}
                <span className="italic">
                  beautiful, functional, and user-centered digital experiences
                </span>
                . With a background in both front-end and back-end development,
                I bring a{" "}
                <span className="underline decoration-pink-500 decoration-2 underline-offset-4">
                  holistic approach
                </span>{" "}
                to every project I work on.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                When I&apos;m not coding or pushing pixels, you&apos;ll find me:
              </p>
              <ul className="list-none space-y-2 pl-6">
                {[
                  "Exploring new technologies",
                  "Contributing to open-source projects",
                  "Sharing knowledge through blog posts",
                  "Engaging in community events",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center text-white/70 hover:text-white transition-colors"
                  >
                    <span className="text-purple-400 mr-2">&#8227;</span> {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl" />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src="https://i.pinimg.com/736x/ba/5f/15/ba5f15d18e3c04880822f655cb2f25d6.jpg"
                  alt="Profile picture"
                  width={400}
                  height={400}
                  className="rounded-lg relative z-10 shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((item, index) => (
              <Card
                key={index}
                className="group bg-black/50 border-white/10 overflow-hidden hover:border-purple-500/50 transition-colors"
              >
                <div className="relative aspect-video">
                  <Image
                    src={item.link}
                    alt={`Project ${index + 1}`}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:text-purple-400"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-white/70">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech,index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="border-purple-500/50 text-purple-400"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} id="skills" className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">Skills & Expertise</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Code2,
                title: "Frontend Development",
                skills: ["React", "Next.js", "TypeScript","Javascript"],
              },
              {
                icon: Cpu,
                title: "Backend Development",
                skills: ["Node.js", "Mongo Db", "Prisma","Express"],
              },
              {
                icon: Palette,
                title: "UI/UX Design",
                skills: ["Figma", "Framer Motion", "Canva"],
              },
              {
                icon: Globe,
                title: "Other Skills",
                skills: ["AWS", "Git", "Github"],
              },
            ].map((category, index) => (
              <Card
                key={index}
                className="bg-black/50 border-white/10 p-6 hover:border-purple-500/50 transition-colors"
              >
                <category.icon className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-lg font-semibold mb-4">{category.title}</h3>
                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <li key={skill} className="text-white/70 text-sm">
                      {skill}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact" className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold text-purple-400">Get in Touch</h2>
            <p className="text-lg text-white/80">
              Interested in working together or just want to say hello? Feel
              free to reach out, and I’ll get back to you as soon as possible!
            </p>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() =>
                (window.location.href = "mailto:jaskamalsingh7872@gmail.com")
              }
            >
              Contact Me
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/70 text-sm">
              © {new Date().getFullYear()} Jaskamal Singh. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {[
                { Icon: GithubIcon, url: "https://github.com/jaskamal2724" },
                { Icon: Twitter, url: "https://x.com/Jassi_2724" },
                {
                  Icon: Linkedin,
                  url: "https://www.linkedin.com/in/jaskamal-singh-9a9039259/",
                },
                { Icon: Mail, url: "jaskamalsingh7872@gmail.com" },
              ].map(({Icon,url}, index) => (
                // <Button
                //   key={index}
                //   variant="ghost"
                //   size="icon"
                //   className="rounded-full hover:text-purple-400 hover:bg-purple-400/10"
                // >
                <Link key={index} href={url} rel="noopener noreferrer">
                  <Icon className="w-5 h-5 text-white/70 hover:text-purple-400 transition-colors" />
                </Link>
                // </Button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
