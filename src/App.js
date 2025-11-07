import React, { useState, useEffect } from 'react';
import { Menu, X, Check, Mail, Play, Shield, Zap, Brain, Activity, TrendingUp, Users, Award, ArrowRight, Star, Gamepad2, Target, Trophy, Clock } from 'lucide-react';
import emailjs from '@emailjs/browser';


export default function ReliefSyncLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [productRotation, setProductRotation] = useState(0);
  const [productScale, setProductScale] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);
      
      const rotation = scrollPosition * 0.15;
      setProductRotation(rotation);
      
      const scale = 1 + (Math.sin(scrollPosition / 300) * 0.1);
      setProductScale(scale);
      
      const sections = document.querySelectorAll('.fade-in-section');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.75;
        if (isVisible) {
          section.classList.add('is-visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWaitlistSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus('');

  try {
    const serviceID = 'service_xryjuro';
    const templateID = 'template_hlfh53o';
    const adminTemplateID = 'template_m709af9';
    const publicKey = 'JBdFPhB3yNKv7yTnV';

    const userTemplateParams = {
      user_name: name,
      to_email: email,
      social_link: 'https://twitter.com/reliefsync',
      website_link: 'https://ashwinthomas03.github.io/reliefsync/'
    };

    const adminTemplateParams = {
      user_name: name,
      user_email: email,
      signup_date: new Date().toLocaleString()
    };
    
    const userResponse = await emailjs.send(
      serviceID, 
      templateID, 
      userTemplateParams, 
      publicKey
    );

    const adminResponse = await emailjs.send(
      serviceID, 
      adminTemplateID, 
      adminTemplateParams, 
      publicKey
    );

    if (userResponse.status === 200 && adminResponse.status === 200) {
      setSubmitStatus('success');
      setEmail('');
      setName('');
    } else {
      throw new Error('EmailJS error');
    }
  } catch (error) {
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      <style>{`
        html {
          scroll-behavior: smooth;
        }

        /* Fix for iPhone notch and status bar */
        body {
          background-color: #0f172a;
        }

        /* Safe area padding for notch devices */
        @supports(padding: max(0px)) {
          .hero-section-mobile {
            padding-top: max(7rem, env(safe-area-inset-top) + 5rem);
          }
        }

        .fade-in-section {
          opacity: 0;
          transform: translateY(60px);
          transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1), transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .fade-in-section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .gradient-text {
          background: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gaming-gradient-text {
          background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .product-3d {
          transform-style: preserve-3d;
          transition: transform 0.05s ease-out;
        }

        .card-hover {
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-16px) scale(1.02);
          box-shadow: 0 40px 100px rgba(37, 99, 235, 0.15);
        }

        .gaming-card-hover:hover {
          transform: translateY(-16px) scale(1.02);
          box-shadow: 0 40px 100px rgba(139, 92, 246, 0.25);
        }

        .btn-shine {
          position: relative;
          overflow: hidden;
        }

        .btn-shine::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          animation: shine 3s infinite;
        }

        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-25px); }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.4); }
          50% { box-shadow: 0 0 35px rgba(236, 72, 153, 0.6); }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .gaming-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        scrollY > 50 
          ? 'bg-slate-900/95 backdrop-blur-2xl shadow-xl border-b border-slate-700/50' 
          : 'bg-slate-900/80 backdrop-blur-md'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
               <img src="/header.png" alt="ReliefSync Logo" className="w-15 h-11" />
              </div>
              <span className="text-2xl font-bold text-white">
                Relief<span className="gradient-text">Sync</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-12">
              <a href="#gamers" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-medium">
                For Gamers
              </a>
               <a href="#problem" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-medium">
                The Problem
              </a>
              <a href="#solution" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-medium">
                The Solution
              </a>
              
              <a href="#benefits" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-medium">
                Benefits
              </a>
              <a href="#contact" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-medium">
                Get Started
              </a>
            </div>

            <a href="#contact" className="hidden md:block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-full shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 btn-shine no-underline">
              Join Waitlist
            </a>

            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-slate-800/95 backdrop-blur-xl border-t border-slate-700/50 shadow-lg">
            <div className="px-6 py-6 space-y-4">
              <a href="#gamers" className="block text-gray-300 hover:text-cyan-400 font-medium py-2">For Gamers</a>
              <a href="#problem" className="block text-gray-300 hover:text-cyan-400 font-medium py-2">The Problem</a>
              <a href="#solution" className="block text-gray-300 hover:text-cyan-400 font-medium py-2">The Solution</a>
              <a href="#benefits" className="block text-gray-300 hover:text-cyan-400 font-medium py-2">Benefits</a>
              <a href="#contact" className="block text-gray-300 hover:text-cyan-400 font-medium py-2">Get Started</a>
              <a href="#contact" className="block w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-full shadow-lg text-center no-underline">
                Join Waitlist
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero-section-mobile relative min-h-[85vh] md:min-h-screen flex items-center pt-28 md:pt-24 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-8 md:py-20 grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          
          {/* Product Image - Shows FIRST on mobile, SECOND on desktop */}
          <div className="relative z-10 h-[350px] md:h-[700px] flex items-center justify-center order-1 lg:order-2">
            <div 
              className="product-3d relative w-full max-w-lg"
              style={{ 
                transform: `perspective(1500px) rotateY(${productRotation}deg) rotateX(${Math.sin(productRotation / 80) * 15}deg) scale(${productScale})`
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse"></div>
              </div>
              
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 shadow-[0_60px_120px_rgba(0,0,0,0.5)] border border-slate-700/50">
                <div className="aspect-square bg-gradient-to-br from-blue-700 via-blue-800 to-cyan-600 rounded-[1.5rem] md:rounded-[2.5rem] flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
                  <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-cyan-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                  </div>
                  <div className="relative z-20 mb-10">
                    <div className="w-500 h-600">
                      <img src="R1.png" alt="ReliefSync logo"/>
                    </div>
                  </div>
                </div>
              </div>            
            </div>
          </div>

          {/* Text Content - Shows SECOND on mobile, FIRST on desktop */}
          <div className="space-y-4 md:space-y-8 z-10 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-5 py-2 md:py-3 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full shadow-lg">
              <div className="w-2 md:w-2.5 h-2 md:h-2.5 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-xs md:text-sm font-bold text-cyan-400 uppercase tracking-wide">Launching February 2026</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight text-white">
              Smart Relief.
              <br />
              <span className="gradient-text">Real Results.</span>
            </h1>

            <p className="text-lg md:text-2xl text-gray-300 leading-relaxed max-w-xl font-medium">
              Experience revolutionary headache relief with the R1 Band — combining massage, vibration, heat, and cooling in one intelligent device.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-5 pt-4 md:pt-6">
              <a href="#contact" className="group px-8 md:px-12 py-4 md:py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-base md:text-lg font-bold rounded-full shadow-2xl shadow-blue-500/40 hover:shadow-3xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 btn-shine flex items-center justify-center gap-3 no-underline">
                Join Waitlist
                <ArrowRight className="w-5 md:w-6 h-5 md:h-6 group-hover:translate-x-2 transition-transform" strokeWidth={3} />
              </a>
              <button className="group px-8 md:px-12 py-4 md:py-5 bg-slate-800/80 backdrop-blur-sm border-2 border-slate-600 text-gray-200 text-base md:text-lg font-bold rounded-full shadow-xl hover:bg-slate-700/80 hover:border-cyan-400 transition-all duration-300 flex items-center justify-center gap-2">
                <Play className="w-5 h-5" strokeWidth={3} />
                <span className="hidden sm:inline">Watch Demo</span>
                <span className="sm:hidden">Demo</span>
              </button>
            </div>

            <div className="flex items-center gap-6 md:gap-10 pt-4 md:pt-8">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-10 md:w-12 h-10 md:h-12 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-xl md:rounded-2xl flex items-center justify-center">
                  <Shield className="w-5 md:w-6 h-5 md:h-6 text-cyan-400" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-xs md:text-sm font-bold text-white">Clinically Approved</div>
                  <div className="text-xs text-gray-400">Tested & Safe</div>
                </div>
              </div>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-10 md:w-12 h-10 md:h-12 bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-xl md:rounded-2xl flex items-center justify-center">
                  <Award className="w-5 md:w-6 h-5 md:h-6 text-cyan-400" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-xs md:text-sm font-bold text-white">98% Success</div>
                  <div className="text-xs text-gray-400">Proven Results</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOR GAMERS SECTION */}
      <section id="gamers" className="py-32 px-6 lg:px-8 bg-gradient-to-br from-slate-800 via-purple-900/20 to-slate-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full blur-3xl opacity-10"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20 fade-in-section">
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-purple-500/20 backdrop-blur-sm border border-purple-400/40 text-purple-400 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
              <Gamepad2 className="w-4 h-4" strokeWidth={2.5} />
              Built for Performance
            </div>
            <h2 className="text-6xl font-black text-white mb-6">
              <span className="gaming-gradient-text">Gamers & Esports Athletes:</span>
              <br />
              Stay in the Zone
            </h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto font-medium">
              Extended screen time shouldn't mean sacrificing your health. The R1 Band keeps you focused during those crucial marathon sessions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 mb-16">
            <div className="fade-in-section gaming-card-hover">
              <div className="bg-slate-800/60 backdrop-blur-xl rounded-[2rem] p-10 h-full border border-purple-500/30 shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgba(139,92,246,0.3)] transition-all duration-500">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg gaming-glow">
                  <Target className="w-10 h-10" strokeWidth={2.5} />
                </div>
                <h3 className="text-3xl font-black text-white mb-4">The Gaming Challenge</h3>
                <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
                  <p className="flex items-start gap-3">
                    <span className="text-purple-400 font-bold min-w-fit">73%</span>
                    <span>of gamers experience headaches from extended screen time</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-purple-400 font-bold min-w-fit">40%</span>
                    <span>performance drop during headache episodes</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-purple-400 font-bold min-w-fit">5+ hours</span>
                    <span>of gaming time lost weekly to headache disruptions</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="fade-in-section gaming-card-hover" style={{ transitionDelay: '100ms' }}>
              <div className="bg-slate-800/60 backdrop-blur-xl rounded-[2rem] p-10 h-full border border-purple-500/30 shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgba(139,92,246,0.3)] transition-all duration-500">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg gaming-glow" style={{ animationDelay: '0.5s' }}>
                  <Trophy className="w-10 h-10" strokeWidth={2.5} />
                </div>
                <h3 className="text-3xl font-black text-white mb-4">Peak Performance Mode</h3>
                <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
                  <p className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" strokeWidth={2.5} />
                    <span>Instant relief without leaving your setup</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" strokeWidth={2.5} />
                    <span>Zero drowsiness or side effects during tournaments</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" strokeWidth={2.5} />
                    <span>AI learns your gaming schedule for preventive care</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" strokeWidth={2.5} />
                    <span>Maintains focus during critical moments</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="fade-in-section" style={{ transitionDelay: '200ms' }}>
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-[2rem] p-12 border border-purple-400/30 shadow-2xl text-center">
              <div className="flex items-center justify-center gap-4 mb-6">
                <Clock className="w-12 h-12 text-purple-400" strokeWidth={2.5} />
                <h3 className="text-4xl font-black text-white">Marathon Session Ready</h3>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Whether you're streaming for hours, competing in tournaments, or grinding ranked matches, the R1 Band ensures headaches won't interrupt your flow. Stay comfortable, stay competitive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section id="problem" className="py-32 px-6 lg:px-8 bg-gradient-to-br from-slate-800 via-blue-900/20 to-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-500 to-orange-500 rounded-full blur-3xl opacity-10"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20 fade-in-section">
            <div className="inline-block px-6 py-2 bg-red-500/20 backdrop-blur-sm border border-red-400/30 text-red-400 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
              The Problem
            </div>
            <h2 className="text-6xl font-black text-white mb-6">
              Headaches <span className="gradient-text">Shouldn't Control</span> Your Life
            </h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto font-medium">
              45 million Americans suffer from chronic headaches, losing productivity, focus, and quality of life every single day.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                stat: '45M',
                label: 'Americans with chronic headaches',
                impact: 'Lost work hours daily',
                icon: <Users className="w-12 h-12" strokeWidth={2.5} />
              },
              {
                stat: '60%',
                label: 'Experience work disruption',
                impact: 'Reduced productivity & focus',
                icon: <TrendingUp className="w-12 h-12" strokeWidth={2.5} />
              },
              {
                stat: '70%',
                label: 'Report poor sleep quality',
                impact: 'Chronic fatigue & stress',
                icon: <Brain className="w-12 h-12" strokeWidth={2.5} />
              }
            ].map((item, idx) => (
              <div key={idx} className="fade-in-section card-hover" style={{ transitionDelay: `${idx * 100}ms` }}>
                <div className="bg-slate-800/60 backdrop-blur-xl rounded-[2rem] p-10 h-full border border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgba(239,68,68,0.3)] transition-all duration-500">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-red-500/30">
                    {item.icon}
                  </div>
                  <div className="text-5xl font-black gradient-text mb-2">{item.stat}</div>
                  <h3 className="text-xl font-black text-white mb-3">{item.label}</h3>
                  <p className="text-gray-400 leading-relaxed font-medium">{item.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE SOLUTION */}
      <section id="solution" className="py-32 px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900 relative">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #3b82f6 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20 fade-in-section">
            <div className="inline-block px-6 py-2 bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/30 text-cyan-400 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
              The Solution
            </div>
            <h2 className="text-6xl font-black text-white mb-6">
              Four Therapies. <span className="gradient-text">One Device.</span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto font-medium">
              The R1 Band combines clinically-proven relief methods into one intelligent, drug-free solution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="w-10 h-10" strokeWidth={2.5} />,
                title: 'Precision Massage',
                desc: 'Targeted pressure points release deep muscular tension instantly',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: <Activity className="w-10 h-10" strokeWidth={2.5} />,
                title: 'Smart Vibration',
                desc: 'Rhythmic pulses calm overactive nerve pathways naturally',
                color: 'from-cyan-500 to-cyan-600'
              },
              {
                icon: <TrendingUp className="w-10 h-10" strokeWidth={2.5} />,
                title: 'Thermal Therapy',
                desc: 'Controlled heat increases circulation and promotes relaxation',
                color: 'from-orange-500 to-red-500'
              },
              {
                icon: <Shield className="w-10 h-10" strokeWidth={2.5} />,
                title: 'Cryotherapy',
                desc: 'Precision cooling reduces inflammation and provides instant relief',
                color: 'from-blue-400 to-cyan-400'
              }
            ].map((feature, idx) => (
              <div key={idx} className="fade-in-section card-hover" style={{ transitionDelay: `${idx * 100}ms` }}>
                <div className="bg-slate-800/60 backdrop-blur-xl rounded-[2rem] p-8 h-full border border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgba(59,130,246,0.3)] transition-all duration-500">
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-xl`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-black text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed font-medium">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* THE BENEFITS */}
      <section id="benefits" className="py-32 px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full blur-3xl opacity-10"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20 fade-in-section">
            <div className="inline-block px-6 py-2 bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-green-400 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
              The Benefits
            </div>
            <h2 className="text-6xl font-black text-white mb-6">
              Transform Your <span className="gradient-text">Quality of Life</span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto font-medium">
              Experience real, measurable improvements in just 30 days
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                number: '01',
                title: '70% Fewer Episodes',
                desc: 'Advanced AI learns your triggers and prevents headaches before they start, giving you back your days',
                icon: <TrendingUp className="w-12 h-12" strokeWidth={2.5} />,
                gradient: 'from-green-500 to-emerald-600'
              },
              {
                number: '02',
                title: 'Personalized Relief',
                desc: 'Machine learning adapts therapy to your unique patterns, delivering increasingly effective results',
                icon: <Brain className="w-12 h-12" strokeWidth={2.5} />,
                gradient: 'from-blue-500 to-cyan-600'
              },
              {
                number: '03',
                title: 'Drug-Free Freedom',
                desc: 'Reclaim focus, productivity, and peace of mind without medication side effects or dependencies',
                icon: <Shield className="w-12 h-12" strokeWidth={2.5} />,
                gradient: 'from-purple-500 to-pink-600'
              }
            ].map((item, idx) => (
              <div key={idx} className="fade-in-section card-hover" style={{ transitionDelay: `${idx * 100}ms` }}>
                <div className="bg-slate-800/60 backdrop-blur-xl rounded-[2rem] p-10 h-full border border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgba(34,197,94,0.3)] transition-all duration-500">
                  <div className="text-7xl font-black text-slate-700/50 mb-6">{item.number}</div>
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-lg font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section id="contact" className="py-32 px-6 lg:px-8 bg-gradient-to-br from-slate-800 via-blue-900/20 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="max-w-5xl mx-auto relative">
          <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-500/40">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-300 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative p-16 text-center">
              <div className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-bold uppercase tracking-wide mb-8">
                Limited Early Access
              </div>
              <h2 className="text-6xl font-black text-white mb-6">
                Ready to Live Headache-Free?
              </h2>
              <p className="text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-medium">
                Join 15,000+ people on the waitlist. Get exclusive early access and save 30% when we launch in February 2026.
              </p>

              <form onSubmit={handleWaitlistSubmit} className="max-w-xl mx-auto mb-8 space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="w-full px-8 py-5 bg-white/95 backdrop-blur-sm border-2 border-white rounded-full text-gray-900 placeholder-gray-500 font-medium focus:outline-none focus:border-white focus:shadow-2xl transition-all text-lg"
                />
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-1 px-8 py-5 bg-white/95 backdrop-blur-sm border-2 border-white rounded-full text-gray-900 placeholder-gray-500 font-medium focus:outline-none focus:border-white focus:shadow-2xl transition-all text-lg"
                  />
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="px-12 py-5 bg-slate-900 text-white rounded-full font-black text-lg uppercase tracking-wide hover:bg-slate-800 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 btn-shine whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Join Waitlist'}
                  </button>
                </div>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div className="bg-green-500/20 backdrop-blur-sm border-2 border-green-400 rounded-2xl px-6 py-4 mt-4 animate-fade-in">
                    <div className="flex items-center gap-3 justify-center">
                      <Check className="w-6 h-6 text-green-400" strokeWidth={3} />
                      <p className="text-white font-bold text-lg">
                        Thank you! Check your email for confirmation.
                      </p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div className="bg-red-500/20 backdrop-blur-sm border-2 border-red-400 rounded-2xl px-6 py-4 mt-4 animate-fade-in">
                    <div className="flex items-center gap-3 justify-center">
                      <X className="w-6 h-6 text-red-400" strokeWidth={3} />
                      <p className="text-white font-bold text-lg">
                        Oops! Something went wrong. Please try again.
                      </p>
                    </div>
                  </div>
                )}
              </form>

              <div className="flex items-center justify-center gap-8 text-white/90 font-medium flex-wrap">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5" strokeWidth={3} />
                  <span>30% Early Bird Discount</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5" strokeWidth={3} />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5" strokeWidth={3} />
                  <span>30-Day Money Back</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-gray-400 py-12 px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                <img src="/header.png" alt="ReliefSync Logo" className="w-12 h-10" />
              </div>
              <span className="text-xl font-bold text-white">
                Relief<span className="gradient-text">Sync</span>
              </span>
            </div>
            
            <p className="text-sm text-gray-500">
              © 2026 ReliefSync Inc. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
              <a href="mailto:support@reliefsync.com" className="text-sm hover:text-cyan-400 transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4" />
                support@reliefsync.com
              </a>  
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}