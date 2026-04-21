import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  FaRocket, FaCode, FaMobile, FaCloud, 
  FaGithub, FaTwitter, FaLinkedin, FaInstagram,
  FaArrowRight, FaStar, FaHeart, FaBolt,
  FaShieldAlt, FaGlobe, FaChartLine, FaUsers
} from 'react-icons/fa';

const App = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero opacity={opacity} scale={scale} />
      <Features />
      <Stats />
      <Services />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-xl shadow-2xl' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
          >
            TechFlow
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {['Accueil', 'Services', 'À propos', 'Contact'].map((item, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all"
          >
            Commencer
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 space-y-4"
            >
              {['Accueil', 'Services', 'À propos', 'Contact'].map((item) => (
                <a key={item} href="#" className="block text-gray-300 hover:text-white py-2">
                  {item}
                </a>
              ))}
              <button className="w-full px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold">
                Commencer
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

const Hero = ({ opacity, scale }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] animate-pulse delay-700" />
      </div>

      <motion.div 
        style={{ opacity, scale }}
        className="container mx-auto px-6 text-center relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6"
        >
          <span className="text-purple-400 text-sm">✨ La révolution digitale commence ici</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Transformez vos idées
          </span>
          <br />
          <span className="text-white">en réalité numérique</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl mx-auto"
        >
          Créez des expériences web exceptionnelles avec nos solutions innovantes.
          Design moderne, performance optimale et résultats garantis.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-purple-500/50 transition-all"
          >
            Commencer maintenant
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-purple-500 rounded-full text-purple-400 font-semibold hover:bg-purple-500/10 transition-all"
          >
            Voir la démo
          </motion.button>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="absolute top-20 right-20 hidden lg:block"
        >
          <FaRocket className="text-4xl text-purple-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};

const Features = () => {
  const features = [
    { icon: FaBolt, title: "Ultra Rapide", desc: "Performance optimisée pour une expérience fluide", color: "from-yellow-400 to-orange-500" },
    { icon: FaShieldAlt, title: "Sécurisé", desc: "Protection avancée de vos données", color: "from-green-400 to-emerald-500" },
    { icon: FaGlobe, title: "Global", desc: "Accessible partout dans le monde", color: "from-blue-400 to-cyan-500" },
    { icon: FaChartLine, title: "Scalable", desc: "Grandit avec votre entreprise", color: "from-purple-400 to-pink-500" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Fonctionnalités
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Découvrez pourquoi des milliers d'entreprises nous font confiance
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="text-2xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { value: "500+", label: "Projets réalisés", icon: FaCode },
    { value: "98%", label: "Clients satisfaits", icon: FaStar },
    { value: "24/7", label: "Support disponible", icon: FaHeart },
    { value: "50+", label: "Experts dédiés", icon: FaUsers },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20" />
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <stat.icon className="text-4xl text-purple-400 mx-auto mb-4" />
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-4xl md:text-5xl font-bold text-white mb-2"
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    { title: "Développement Web", desc: "Sites et applications web sur mesure", icon: FaCode, price: "À partir de 2999€" },
    { title: "Applications Mobile", desc: "iOS & Android natives", icon: FaMobile, price: "À partir de 3999€" },
    { title: "Cloud Solutions", desc: "Infrastructure scalable", icon: FaCloud, price: "Sur devis" },
    { title: "AI & Machine Learning", desc: "Solutions intelligentes", icon: FaRocket, price: "Sur devis" },
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Nos Services
            </span>
          </h2>
          <p className="text-gray-400 text-lg">Des solutions adaptées à vos besoins</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, rotateY: 90 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-center border border-gray-700 hover:border-purple-500 transition-all duration-300"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <service.icon className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
              <p className="text-gray-400 mb-4">{service.desc}</p>
              <p className="text-purple-400 font-semibold">{service.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    { name: "Sophie Martin", role: "CEO, TechStart", text: "Une équipe exceptionnelle ! Notre site a vu son trafic augmenter de 300%.", rating: 5 },
    { name: "Thomas Dubois", role: "Directeur Marketing", text: "Le meilleur investissement que nous ayons fait. Support réactif et résultats au rendez-vous.", rating: 5 },
    { name: "Julie Bernard", role: "Fondatrice", text: "Ils ont transformé notre vision en réalité. Un travail remarquable !", rating: 5 },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Ce qu'ils disent
            </span>
          </h2>
          <p className="text-gray-400">Ils nous ont fait confiance et témoignent</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
              <div>
                <p className="text-white font-semibold">{testimonial.name}</p>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Prêt à transformer votre projet ?
          </h2>
          <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
            Rejoignez les entreprises qui innovent avec nous. Obtenez un devis gratuit en 24h.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold hover:shadow-xl transition-all"
          >
            Obtenir un devis gratuit
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
              TechFlow
            </h3>
            <p className="text-gray-400">Innovation & Excellence digitale</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Accueil</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Légal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Mentions légales</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Confidentialité</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">CGV</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Suivez-nous</h4>
            <div className="flex space-x-4">
              <motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-400 hover:text-white">
                <FaGithub size={24} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-400 hover:text-white">
                <FaTwitter size={24} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-400 hover:text-white">
                <FaLinkedin size={24} />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1 }} href="#" className="text-gray-400 hover:text-white">
                <FaInstagram size={24} />
              </motion.a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500">© 2024 TechFlow. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default App;