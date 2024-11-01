import { motion } from 'framer-motion';
import './App.css';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const videoRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Video started playing
            console.log("Video started playing successfully");
          })
          .catch(error => {
            // Auto-play was prevented
            console.log("Video autoplay failed:", error);
            // You might want to show a play button here
          });
      }
    }
  }, []);

  useEffect(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('error', (e) => {
        console.error('Error loading video:', e);
      });
      
      video.addEventListener('loadeddata', () => {
        console.log('Video loaded successfully');
      });
    }
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setIsMenuOpen(false);
      setTimeout(() => {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 300);
    }
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-blue-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-950/50 transition-colors duration-300">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/40 z-10"></div>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ position: 'fixed', right: 0, bottom: 0, minWidth: '100%', minHeight: '100%' }}
        >
          <source src={`${process.env.PUBLIC_URL}/bg.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <header className="fixed w-full bg-white/30 dark:bg-gray-900/30 backdrop-blur-md z-10 transition-colors duration-300">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-900 dark:bg-white"></div>
              <span className="font-medium dark:text-white">SHUBHAM</span>
            </div>
            
            <div className="flex items-center gap-2 md:hidden">
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800"
              >
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </motion.button>
              
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 flex items-center justify-center"
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </motion.button>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <motion.button 
                onClick={() => scrollToSection('skills')} 
                className="font-medium dark:text-white hover:bg-black hover:text-white px-3 py-1.5 rounded-full transition-all"
                whileHover={{ y: -2 }}
              >
                Skills
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('projects')} 
                className="font-medium dark:text-white hover:bg-black hover:text-white px-3 py-1.5 rounded-full transition-all"
                whileHover={{ y: -2 }}
              >
                Projects
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('experience')} 
                className="font-medium dark:text-white hover:bg-black hover:text-white px-3 py-1.5 rounded-full transition-all"
                whileHover={{ y: -2 }}
              >
                Experience
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('education')} 
                className="font-medium dark:text-white hover:bg-black hover:text-white px-3 py-1.5 rounded-full transition-all"
                whileHover={{ y: -2 }}
              >
                Education
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('achievements')} 
                className="font-medium dark:text-white hover:bg-black hover:text-white px-3 py-1.5 rounded-full transition-all"
                whileHover={{ y: -2 }}
              >
                Achievements
              </motion.button>
              <motion.a 
                href="mailto:shubhampp8001@gmail.com"
                className="bg-primary text-white px-4 py-2 rounded-full font-medium"
                whileHover={{ scale: 1.02 }}
              >
                Hire Me!
              </motion.a>
            </div>
          </div>

          <motion.div
            initial={false}
            animate={{
              height: isMenuOpen ? 'auto' : 0,
              opacity: isMenuOpen ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className={`md:hidden overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg mt-4 rounded-2xl`}
          >
            <div className="py-4 px-2 space-y-2">
              <motion.button 
                onClick={() => scrollToSection('skills')}
                className="w-full text-left font-medium dark:text-white hover:bg-black hover:text-white px-4 py-2 rounded-xl transition-all"
                whileHover={{ x: 10 }}
              >
                Skills
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('projects')}
                className="w-full text-left font-medium dark:text-white hover:bg-black hover:text-white px-4 py-2 rounded-xl transition-all"
                whileHover={{ x: 10 }}
              >
                Projects
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('experience')}
                className="w-full text-left font-medium dark:text-white hover:bg-black hover:text-white px-4 py-2 rounded-xl transition-all"
                whileHover={{ x: 10 }}
              >
                Experience
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('education')}
                className="w-full text-left font-medium dark:text-white hover:bg-black hover:text-white px-4 py-2 rounded-xl transition-all"
                whileHover={{ x: 10 }}
              >
                Education
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('achievements')}
                className="w-full text-left font-medium dark:text-white hover:bg-black hover:text-white px-4 py-2 rounded-xl transition-all"
                whileHover={{ x: 10 }}
              >
                Achievements
              </motion.button>
              <motion.a 
                href="mailto:shubhampp8001@gmail.com"
                className="block w-full text-center bg-primary text-white px-4 py-2 rounded-xl font-medium mt-4"
                whileHover={{ scale: 1.02 }}
              >
                Hire Me!
              </motion.a>
            </div>
          </motion.div>
        </nav>
      </header>

      <main className="container mx-auto px-4 pt-32 md:pt-40 relative z-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8 text-center md:text-left"
          >
            <div className="space-y-4">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300">
                Available for Work
              </span>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight dark:text-white transition-colors duration-300">
                Hi, I'm <span className="text-primary">Shubham</span> Kumar
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-600 dark:text-gray-300">
                Frontend Developer & UI/UX Designer
              </h2>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl transition-colors duration-300">
              A passionate developer focused on creating intuitive and beautiful web experiences. Currently pursuing B.Tech in Information Technology at GTBIT.
            </p>

            <div className="flex items-center gap-6">
              <motion.a 
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                }}
                className="bg-black text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 hover:bg-black/90 transition-all duration-300"
              >
                Let's Talk 
                <span className="text-xl">→</span>
              </motion.a>
              <div className="flex gap-4">
                <motion.a 
                  href="https://github.com/ShubhamPP04" 
                  target="_blank"
                  whileHover={{ y: -2 }}
                  className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </motion.a>
                <motion.a 
                  href="https://www.linkedin.com/in/shubham-kumar-48420b249/" 
                  target="_blank"
                  whileHover={{ y: -2 }}
                  className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative flex justify-end"
          >
            <div className="w-[500px] h-[500px] rounded-full overflow-hidden relative shadow-2xl">
              <img 
                src={`${process.env.PUBLIC_URL}/profile.png`}
                alt="Shubham Kumar"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  console.error('Image failed to load');
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-32"
          id="skills"
        >
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">Skills & Technologies</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Programming Languages</h3>
                  <div className="text-2xl text-gray-400 dark:text-gray-500">⌨️</div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {['C++', 'C', 'Java', 'JavaScript', 'Python'].map((skill, index) => (
                    <span key={index} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Web Development</h3>
                  <div className="text-2xl text-gray-400 dark:text-gray-500">🌐</div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {['HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'Bootstrap'].map((skill, index) => (
                    <span key={index} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Databases</h3>
                  <div className="text-2xl text-gray-400 dark:text-gray-500">💾</div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {['MySQL', 'MongoDB'].map((skill, index) => (
                    <span key={index} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Tools & Platforms</h3>
                  <div className="text-2xl text-gray-400 dark:text-gray-500">🛠️</div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {['Git', 'VS Code', 'GitHub'].map((skill, index) => (
                    <span key={index} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-32"
          id="projects"
        >
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <motion.a 
              href="https://nonu-doc.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="project-card group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">DocuCollect</h3>
                    <a 
                      href="https://github.com/ShubhamPP04/DocuCollect"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Document Storage Website</p>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">Next.js 13</span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">Supabase</span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">Tailwind CSS</span>
                  </div>
                </div>
                <div className="text-2xl text-gray-400 dark:text-gray-500 transform group-hover:translate-x-2 transition-transform">→</div>
              </div>
              <div className="mt-4 h-64 rounded-xl overflow-hidden">
                <img 
                  src={`${process.env.PUBLIC_URL}/1.png`}
                  alt="DocuCollect Project"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.a>

            <motion.a 
              href="https://cropc.org/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="project-card group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">CROPC Website</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Weather Alerts & Forecasting</p>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">React</span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">APIs</span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">Bootstrap</span>
                  </div>
                </div>
                <div className="text-2xl text-gray-400 dark:text-gray-500 transform group-hover:translate-x-2 transition-transform">→</div>
              </div>
              <div className="mt-4 h-64 rounded-xl overflow-hidden">
                <img 
                  src={`${process.env.PUBLIC_URL}/2.png`}
                  alt="CROPC Website"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.a>

            <motion.a 
              href="https://job-portal-eight-eosin.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              className="project-card group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Job Portal</h3>
                    <a 
                      href="https://github.com/ShubhamPP04/job-portal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">AI-Powered Job Platform</p>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">React</span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">AI</span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">Node.js</span>
                  </div>
                </div>
                <div className="text-2xl text-gray-400 dark:text-gray-500 transform group-hover:translate-x-2 transition-transform">→</div>
              </div>
              <div className="mt-4 h-64 rounded-xl overflow-hidden">
                <img 
                  src={`${process.env.PUBLIC_URL}/3.png`}
                  alt="Job Portal Project"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-32"
          id="education"
        >
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-16 max-w-7xl mx-auto">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">B.Tech in Information Technology</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Guru Tegh Bahadur Institute of Technology (GTBIT)</p>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">2021-2025</span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">CGPA: 91.3%</span>
                  </div>
                </div>
                <div className="text-2xl text-gray-400 dark:text-gray-500 transform group-hover:translate-x-2 transition-transform">🎓</div>
              </div>
              <div className="mt-4 h-48 rounded-xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-blue-400 to-indigo-500 transform group-hover:scale-105 transition-transform duration-500"></div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">CBSE Class XII</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">The Lawrence Public School, New Delhi</p>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">2019</span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">Aggregate: 83.8%</span>
                  </div>
                </div>
                <div className="text-2xl text-gray-400 dark:text-gray-500 transform group-hover:translate-x-2 transition-transform">🎓</div>
              </div>
              <div className="mt-4 h-48 rounded-xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-purple-400 to-pink-500 transform group-hover:scale-105 transition-transform duration-500"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-32"
          id="experience"
        >
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-16 max-w-7xl mx-auto">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Frontend Developer Intern</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Worked on multiple client projects at XYZ Tech</p>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">React.js</span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">2023</span>
                  </div>
                </div>
                <div className="text-2xl text-gray-400 dark:text-gray-500 transform group-hover:translate-x-2 transition-transform">💼</div>
              </div>
              <div className="mt-4 h-48 rounded-xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-blue-400 to-indigo-500 transform group-hover:scale-105 transition-transform duration-500"></div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">UI/UX Design Intern</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Designed user interfaces for mobile applications</p>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">Figma</span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">2022</span>
                  </div>
                </div>
                <div className="text-2xl text-gray-400 dark:text-gray-500 transform group-hover:translate-x-2 transition-transform">🎨</div>
              </div>
              <div className="mt-4 h-48 rounded-xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-purple-400 to-pink-500 transform group-hover:scale-105 transition-transform duration-500"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-32"
          id="achievements"
        >
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-16 max-w-7xl mx-auto">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">1st Position in KIMO's-Edge</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Outperformed 150 participants from GTBIT</p>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">Competition</span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">2023</span>
                  </div>
                </div>
                <div className="text-2xl text-gray-400 dark:text-gray-500 transform group-hover:translate-x-2 transition-transform">🥇</div>
              </div>
              <div className="mt-4 h-48 rounded-xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-yellow-400 to-orange-500 transform group-hover:scale-105 transition-transform duration-500"></div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">1st Position in Devathon</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Organized by IEEE GTBIT in collaboration with IEEE IIIT-Delhi</p>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">Competition</span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">2023</span>
                  </div>
                </div>
                <div className="text-2xl text-gray-400 dark:text-gray-500 transform group-hover:translate-x-2 transition-transform">🥇</div>
              </div>
              <div className="mt-4 h-48 rounded-xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-green-400 to-teal-500 transform group-hover:scale-105 transition-transform duration-500"></div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">3rd Position in Designathon</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Organized by IEEE GTBIT in collaboration with IEEE IIIT-Delhi</p>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">Competition</span>
                    <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">2023</span>
                  </div>
                </div>
                <div className="text-2xl text-gray-400 dark:text-gray-500 transform group-hover:translate-x-2 transition-transform">🥉</div>
              </div>
              <div className="mt-4 h-48 rounded-xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-r from-pink-400 to-red-500 transform group-hover:scale-105 transition-transform duration-500"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-32"
          id="contact"
        >
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">Get In Touch</h2>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div className="space-y-6 p-6 md:p-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input 
                    type="text" 
                    placeholder="Your name" 
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-700/50 border-0 text-gray-900 dark:text-white placeholder-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input 
                    type="email" 
                    placeholder="your@email.com" 
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-700/50 border-0 text-gray-900 dark:text-white placeholder-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <textarea 
                    placeholder="What would you like to say?" 
                    rows="6" 
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-gray-700/50 border-0 text-gray-900 dark:text-white placeholder-gray-500"
                  ></textarea>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>

        <footer className="mt-32 pb-16 relative bg-transparent">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-8 mb-16">
              <p className="text-gray-900 dark:text-gray-100 text-lg font-medium">
                Have a project in mind?
              </p>
              <h2 className="text-5xl md:text-[120px] leading-none font-bold text-gray-100 dark:text-gray-800">
                LET'S TALK
              </h2>
            </div>

            <div className="flex flex-col items-center gap-6 mt-16">
              <div className="flex flex-wrap justify-center gap-4">
                <motion.a
                  href="https://github.com/ShubhamPP04"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-black hover:border-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/shubham-kumar-48420b249/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-black hover:border-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </motion.a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
