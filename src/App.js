import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Check, Mail, Facebook, Twitter, Instagram, Linkedin, Play, Shield, Zap, Brain, Activity, TrendingUp, Users, Award, ArrowRight, Star } from 'lucide-react';

export default function ReliefSyncLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [productRotation, setProductRotation] = useState(0);
  const [productScale, setProductScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);
      
      // 3D Product rotation based on scroll
      const rotation = scrollPosition * 0.65;
      setProductRotation(rotation);
      
      // Product scale animation
      const scale = 1 + (Math.sin(scrollPosition / 300) * 0.1);
      setProductScale(scale);
      
      // Fade in sections
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

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you! We'll contact you at ${email}`);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-25px); }
        }

        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }

        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
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

        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-rotate-slow {
          animation: rotate-slow 30s linear infinite;
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
                <Activity className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-bold text-white">
                Relief<span className="gradient-text">Sync</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-12">
              <a href="#features" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-medium">
                Features
              </a>
              <a href="#technology" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-medium">
                Technology
              </a>
              <a href="#pricing" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-medium">
                Pricing
              </a>
              <a href="#contact" className="text-gray-300 hover:text-cyan-400 transition-all duration-300 font-medium">
                Contact
              </a>
            </div>

            <button className="hidden md:block px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-full shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 btn-shine">
              Pre-Order Now
            </button>

            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-slate-800/95 backdrop-blur-xl border-t border-slate-700/50 shadow-lg">
            <div className="px-6 py-6 space-y-4">
              <a href="#features" className="block text-gray-300 hover:text-cyan-400 font-medium py-2">Features</a>
              <a href="#technology" className="block text-gray-300 hover:text-cyan-400 font-medium py-2">Technology</a>
              <a href="#pricing" className="block text-gray-300 hover:text-cyan-400 font-medium py-2">Pricing</a>
              <a href="#contact" className="block text-gray-300 hover:text-cyan-400 font-medium py-2">Contact</a>
              <button className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-full shadow-lg">
                Pre-Order Now
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full blur-3xl opacity-15"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 z-10">
            <div className="inline-flex items-center gap-3 px-5 py-3 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full shadow-lg">
              <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-cyan-400 uppercase tracking-wide">Launching February 2026</span>
            </div>
            
            <h1 className="text-7xl lg:text-8xl font-extrabold leading-tight text-white">
              Smart Relief.
              <br />
              <span className="gradient-text">Real Results.</span>
            </h1>

            <p className="text-2xl text-gray-300 leading-relaxed max-w-xl font-medium">
              Experience revolutionary headache relief with the R1 Band — combining massage, vibration, heat, and cooling in one intelligent device.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 pt-6">
              <button className="group px-12 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-lg font-bold rounded-full shadow-2xl shadow-blue-500/40 hover:shadow-3xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 btn-shine flex items-center justify-center gap-3">
                Join Waitlist
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" strokeWidth={3} />
              </button>
              <button className="group px-12 py-5 bg-slate-800/80 backdrop-blur-sm border-2 border-slate-600 text-gray-200 text-lg font-bold rounded-full shadow-xl hover:bg-slate-700/80 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 flex items-center justify-center gap-3">
                <Play className="w-6 h-6" strokeWidth={3} />
                Watch Demo
              </button>
            </div>

            <div className="flex items-center gap-10 pt-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-2xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-cyan-400" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">FDA Registered</div>
                  <div className="text-xs text-gray-400">Clinically Approved</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-2xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-cyan-400" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">98% Success</div>
                  <div className="text-xs text-gray-400">Proven Results</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Rotating 3D Product */}
          <div className="relative z-10 h-[700px] flex items-center justify-center lg:sticky lg:top-24">
            <div 
              className="product-3d relative w-full max-w-lg"
              style={{ 
                transform: `perspective(1500px) rotateY(${productRotation}deg) rotateX(${Math.sin(productRotation / 80) * 15}deg) scale(${productScale})`
              }}
            >
              {/* Glow Rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse"></div>
              </div>
              
              {/* Main Product Card */}
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-[3rem] p-16 shadow-[0_60px_120px_rgba(0,0,0,0.5)] border border-slate-700/50">
                {/* Product Display */}
                <div className="aspect-square bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 rounded-[2.5rem] flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
                  {/* Animated Orbs Inside */}
                  <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-cyan-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                  </div>
                  
                  {/* Icon */}
                  <div className="relative z-10 mb-10">
                    <div className="w-40 h-40 bg-white/25 backdrop-blur-md rounded-[2rem] flex items-center justify-center border-4 border-white/40 shadow-2xl">
                      <Activity className="w-24 h-24 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  
                  {/* Text */}
                  <div className="text-9xl font-black text-white tracking-tight mb-6">R1</div>
                  <div className="text-white/90 text-lg tracking-[0.4em] uppercase font-bold">Relief Band</div>
                </div>
              </div>

              {/* Floating Stats - Enhanced */}
              <div className="absolute -top-8 -right-8 bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-[1.5rem] px-8 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.4)] animate-float">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-4xl font-black gradient-text">98%</span>
                </div>
                <div className="text-xs text-gray-400 font-bold uppercase tracking-wide">Success Rate</div>
              </div>
              
              <div className="absolute -bottom-8 -left-8 bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-[1.5rem] px-8 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.4)] animate-float" style={{ animationDelay: '1s' }}>
                <div className="text-4xl font-black gradient-text mb-1">15min</div>
                <div className="text-xs text-gray-400 font-bold uppercase tracking-wide">Avg Relief Time</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
          <div className="text-sm text-gray-400 font-bold uppercase tracking-widest">Scroll to Discover</div>
          <div className="w-1 h-20 bg-gradient-to-b from-cyan-400 via-blue-500 to-transparent rounded-full"></div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 px-6 lg:px-8 bg-gradient-to-br from-slate-800 via-blue-900/20 to-slate-800 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-300 to-purple-300 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-300 to-blue-300 rounded-full blur-3xl opacity-20"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 fade-in-section">
            <div className="inline-block px-6 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-cyan-400 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
              Transformation Guaranteed
            </div>
            <h2 className="text-6xl font-black text-white mb-6">
              Experience <span className="gradient-text">Real Change</span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto font-medium">
              Within 30 days, you'll notice dramatic improvements in your quality of life
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                number: '01',
                title: '70% Fewer Episodes',
                desc: 'Advanced pattern recognition learns your triggers and prevents headaches before they start',
                icon: <TrendingUp className="w-12 h-12" strokeWidth={2.5} />,
                gradient: 'from-blue-500 to-blue-600'
              },
              {
                number: '02',
                title: 'Personalized AI Relief',
                desc: 'Machine learning adapts therapy intensity and mode selection based on your unique response',
                icon: <Brain className="w-12 h-12" strokeWidth={2.5} />,
                gradient: 'from-cyan-500 to-cyan-600'
              },
              {
                number: '03',
                title: 'Drug-Free Freedom',
                desc: 'Reclaim focus, productivity, and peace of mind without medication side effects',
                icon: <Shield className="w-12 h-12" strokeWidth={2.5} />,
                gradient: 'from-blue-600 to-cyan-500'
              }
            ].map((item, idx) => (
              <div key={idx} className="fade-in-section card-hover" style={{ transitionDelay: `${idx * 100}ms` }}>
                <div className="bg-slate-800/60 backdrop-blur-xl rounded-[2rem] p-10 h-full border border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgb(37,99,235,0.15)] transition-all duration-500">
                  <div className="text-7xl font-black text-gradient-to-r from-gray-200 to-gray-300 mb-6">{item.number}</div>
                  <div className={`w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30`}>
                    {React.cloneElement(item.icon, { className: 'w-10 h-10 text-white', strokeWidth: 2.5 })}
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-lg font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900 relative">
        {/* Mesh Pattern Overlay */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #2563eb 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 fade-in-section">
            <div className="inline-block px-6 py-2 bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/30 text-cyan-400 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
              Four Therapies, One Device
            </div>
            <h2 className="text-6xl font-black text-white mb-6">
              The <span className="gradient-text">R1 Band</span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto font-medium">
              Clinically-proven relief methods unified in one elegant system
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="w-10 h-10" strokeWidth={2.5} />,
                title: 'Precision Massage',
                desc: 'Targeted pressure points release deep muscular tension',
                color: 'from-blue-500 to-blue-600',
                bgColor: 'bg-blue-100'
              },
              {
                icon: <Activity className="w-10 h-10" strokeWidth={2.5} />,
                title: 'Smart Vibration',
                desc: 'Rhythmic pulses calm overactive nerve pathways',
                color: 'from-cyan-500 to-cyan-600',
                bgColor: 'bg-cyan-100'
              },
              {
                icon: <TrendingUp className="w-10 h-10" strokeWidth={2.5} />,
                title: 'Thermal Therapy',
                desc: 'Controlled heat increases circulation and relaxation',
                color: 'from-orange-500 to-red-500',
                bgColor: 'bg-orange-100'
              },
              {
                icon: <Shield className="w-10 h-10" strokeWidth={2.5} />,
                title: 'Cryotherapy',
                desc: 'Precision cooling reduces inflammation instantly',
                color: 'from-blue-400 to-cyan-400',
                bgColor: 'bg-blue-50'
              }
            ].map((feature, idx) => (
              <div key={idx} className="fade-in-section card-hover" style={{ transitionDelay: `${idx * 100}ms` }}>
                <div className="bg-slate-800/60 backdrop-blur-xl rounded-[2rem] p-8 h-full border border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgb(37,99,235,0.15)] transition-all duration-500">
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-${feature.color.split(' ')[1].split('-')[0]}-500/40`}>
                    {React.cloneElement(feature.icon, { className: 'w-12 h-12 text-white', strokeWidth: 2.5 })}
                  </div>
                  <h3 className="text-xl font-black text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed font-medium">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-32 px-6 lg:px-8 bg-gradient-to-br from-slate-800 via-purple-900/20 to-slate-900 relative overflow-hidden">
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 right-20 w-64 h-64 border-4 border-blue-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 border-4 border-purple-200 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 fade-in-section">
            <div className="inline-block px-6 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-cyan-400 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
              AI-Powered Intelligence
            </div>
            <h2 className="text-6xl font-black text-white mb-6">
              Gets <span className="gradient-text">Smarter</span> Every Day
            </h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto font-medium">
              Advanced biofeedback and machine learning create truly personalized relief
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {[
              {
                icon: <Brain className="w-14 h-14" strokeWidth={2.5} />,
                title: 'Biometric Learning',
                desc: 'Monitors heart rate variability, skin temperature, and muscle tension to understand your unique stress response patterns',
                stat: '15+',
                statLabel: 'Biomarkers'
              },
              {
                icon: <TrendingUp className="w-14 h-14" strokeWidth={2.5} />,
                title: 'Pattern Recognition',
                desc: 'Analyzes lifestyle data to identify triggers and predict episodes before symptoms appear',
                stat: '10K+',
                statLabel: 'Data Points'
              },
              {
                icon: <Zap className="w-14 h-14" strokeWidth={2.5} />,
                title: 'Adaptive Therapy',
                desc: 'Real-time adjustments to all therapy modes based on continuous biofeedback and historical effectiveness',
                stat: '4',
                statLabel: 'Therapy Modes'
              }
            ].map((item, idx) => (
              <div key={idx} className="fade-in-section card-hover" style={{ transitionDelay: `${idx * 100}ms` }}>
                <div className="bg-slate-800/60 backdrop-blur-xl rounded-[2rem] p-10 h-full border border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgb(37,99,235,0.15)] transition-all duration-500">
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/40">
                      {React.cloneElement(item.icon, { className: 'w-12 h-12 text-white', strokeWidth: 2.5 })}
                    </div>
                    <div className="text-right">
                      <div className="text-5xl font-black gradient-text mb-1">{item.stat}</div>
                      <div className="text-xs text-gray-400 font-bold uppercase">{item.statLabel}</div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-lg font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Row */}
          <div className="grid md:grid-cols-4 gap-6 mt-16 fade-in-section">
            {[
              { value: '98.7%', label: 'Accuracy' },
              { value: '<200ms', label: 'Response' },
              { value: '256-bit', label: 'Encryption' },
              { value: 'HIPAA', label: 'Compliant' }
            ].map((stat, idx) => (
              <div key={idx} className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-6 text-center border border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_15px_40px_rgb(37,99,235,0.12)] transition-all duration-300">
                <div className="text-4xl font-black gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-gray-300 font-bold uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-800 relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 fade-in-section">
            <div className="inline-block px-6 py-2 bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/30 text-cyan-400 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
              Clinical Validation
            </div>
            <h2 className="text-6xl font-black text-white mb-6">
              Trusted by <span className="gradient-text">Experts</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {[
              {
                name: 'Dr. Sarah Chen, MD',
                role: 'Neurologist, Stanford Medical',
                quote: 'ReliefSync represents a paradigm shift in non-invasive headache management. The biofeedback integration sets a new clinical standard.',
                initials: 'SC',
                rating: 5
              },
              {
                name: 'Michael Torres',
                role: 'Tech Entrepreneur',
                quote: 'After 10 years of chronic migraines, this is the first device that truly works. The AI learns your patterns - it\'s remarkable.',
                initials: 'MT',
                rating: 5
              },
              {
                name: 'Dr. James Liu, PhD',
                role: 'Pain Research, Johns Hopkins',
                quote: 'Clinical trials show 72% reduction in episode frequency. The multi-modal approach with ML creates unprecedented precision.',
                initials: 'JL',
                rating: 5
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="fade-in-section card-hover" style={{ transitionDelay: `${idx * 100}ms` }}>
                <div className="bg-slate-800/60 backdrop-blur-xl rounded-[2rem] p-10 h-full border border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_20px_60px_rgb(37,99,235,0.15)] transition-all duration-500">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl shadow-blue-500/30">
                      {testimonial.initials}
                    </div>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-800 text-lg leading-relaxed mb-6 font-medium italic">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-black text-white text-lg">{testimonial.name}</div>
                    <div className="text-sm text-gray-400 font-medium">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="grid md:grid-cols-5 gap-6 mt-16 fade-in-section">
            {[
              { label: 'FDA Registered', icon: <Check className="w-6 h-6" strokeWidth={3} /> },
              { label: 'ISO Certified', icon: <Check className="w-6 h-6" strokeWidth={3} /> },
              { label: '12+ Clinical Trials', icon: <Award className="w-6 h-6" strokeWidth={3} /> },
              { label: 'Patent Pending', icon: <Shield className="w-6 h-6" strokeWidth={3} /> },
              { label: 'Made in USA', icon: <Check className="w-6 h-6" strokeWidth={3} /> }
            ].map((badge, idx) => (
              <div key={idx} className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-5 text-center border border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_15px_40px_rgb(37,99,235,0.12)] transition-all duration-300">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3 text-blue-600">
                  {badge.icon}
                </div>
                <div className="text-xs text-gray-300 font-bold uppercase tracking-wide">{badge.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900 relative overflow-hidden">
        {/* Radial Gradient Overlays */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl opacity-20"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 fade-in-section">
            <div className="inline-block px-6 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-cyan-400 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
              Limited Early Access
            </div>
            <h2 className="text-6xl font-black text-white mb-6">
              Reserve <span className="gradient-text">Your Spot</span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto font-medium">
              Save up to 40% with early bird pricing
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {[
              {
                name: 'Essential',
                price: '$299',
                originalPrice: '$499',
                savings: 'Save $200',
                features: [
                  'R1 Band (All Therapies)',
                  'Mobile Companion App',
                  'Basic Analytics Dashboard',
                  'Email Support',
                  '30-Day Money-Back',
                  '1-Year Warranty'
                ],
                popular: false
              },
              {
                name: 'Professional',
                price: '$449',
                originalPrice: '$749',
                savings: 'Save $300',
                features: [
                  'R1 Band (All Therapies)',
                  'Mobile App (Premium)',
                  'Advanced AI Insights',
                  'Priority Support 24/7',
                  '60-Day Extended Trial',
                  'Premium Carrying Case',
                  '2-Year Warranty'
                ],
                popular: true
              },
              {
                name: 'Complete',
                price: '$649',
                originalPrice: '$1099',
                savings: 'Save $450',
                features: [
                  'R1 Band (All Therapies)',
                  'Lifetime App Updates',
                  'Priority AI Training',
                  'Concierge Support',
                  '90-Day Extended Trial',
                  'Premium Accessories',
                  '3-Year Warranty',
                  'Annual Refresh Program'
                ],
                popular: false
              }
            ].map((plan, idx) => (
              <div 
                key={idx} 
                className={`fade-in-section card-hover ${plan.popular ? 'lg:scale-110 lg:-mt-8' : ''}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className={`relative rounded-[2rem] p-10 h-full border-4 ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-blue-600 to-cyan-500 border-blue-400 shadow-2xl shadow-blue-500/40' 
                    : 'bg-white border-gray-200 shadow-xl'
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full text-sm font-black uppercase tracking-wide shadow-lg">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="mb-8">
                    <div className={`text-sm font-black uppercase tracking-wide mb-3 ${plan.popular ? 'text-white/80' : 'text-blue-600'}`}>
                      {plan.savings}
                    </div>
                    <h3 className={`text-3xl font-black mb-3 ${plan.popular ? 'text-white' : 'text-white'}`}>
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className={`text-6xl font-black ${plan.popular ? 'text-white' : 'gradient-text'}`}>
                        {plan.price}
                      </span>
                      <span className={`text-2xl line-through ${plan.popular ? 'text-white/60' : 'text-gray-400'}`}>
                        {plan.originalPrice}
                      </span>
                    </div>
                    <div className={`text-sm font-bold ${plan.popular ? 'text-white/80' : 'text-gray-400'}`}>
                      One-time payment
                    </div>
                  </div>

                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start gap-3">
                        <Check className={`w-6 h-6 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-blue-600'}`} strokeWidth={3} />
                        <span className={`font-medium ${plan.popular ? 'text-white' : 'text-gray-300'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full py-5 rounded-full font-black text-lg uppercase tracking-wide transition-all duration-300 shadow-xl ${
                    plan.popular 
                      ? 'bg-white text-blue-600 hover:bg-gray-100 hover:shadow-2xl' 
                      : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-2xl hover:shadow-blue-500/40'
                  } btn-shine transform hover:scale-105`}>
                    Reserve {plan.name}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section id="contact" className="py-32 px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #2563eb 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-br from-blue-600 to-cyan-500 rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-500/40">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-300 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative p-16 text-center">
              <div className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-bold uppercase tracking-wide mb-8">
                Limited Availability
              </div>
              <h2 className="text-6xl font-black text-white mb-6">
                Join 15,000+ People
              </h2>
              <p className="text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-medium">
                Get exclusive early access and save 30% when we launch in February 2026
              </p>

              <form onSubmit={handleWaitlistSubmit} className="max-w-xl mx-auto mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-8 py-5 bg-white/95 backdrop-blur-sm border-2 border-white rounded-full text-white placeholder-gray-500 font-medium focus:outline-none focus:border-white focus:shadow-2xl transition-all text-lg"
                  />
                  <button 
                    type="submit" 
                    className="px-12 py-5 bg-gray-900 text-white rounded-full font-black text-lg uppercase tracking-wide hover:bg-gray-800 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 btn-shine whitespace-nowrap"
                  >
                    Join Now
                  </button>
                </div>
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
                  <span>Priority Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Activity className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-2xl font-bold text-white">
                  Relief<span className="gradient-text">Sync</span>
                </span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed font-medium">
                Pioneering drug-free headache relief through intelligent, adaptive technology.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                  <a 
                    key={idx}
                    href="#" 
                    className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-all duration-300 group"
                  >
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" strokeWidth={2} />
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                title: 'Product',
                links: ['Features', 'Technology', 'Specs', 'Pricing', 'FAQ']
              },
              {
                title: 'Company',
                links: ['About', 'Research', 'Press', 'Careers', 'Contact']
              },
              {
                title: 'Support',
                links: ['Help Center', 'Shipping', 'Returns', 'Warranty', 'Privacy']
              }
            ].map((column, idx) => (
              <div key={idx}>
                <h4 className="text-white font-black mb-4 uppercase tracking-wide text-sm">{column.title}</h4>
                <ul className="space-y-3">
                  {column.links.map((link, lidx) => (
                    <li key={lidx}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors font-medium text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-500 font-medium">
                © 2026 ReliefSync Inc. All rights reserved.
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <a href="mailto:support@reliefsync.com" className="text-sm text-gray-400 hover:text-white transition-colors font-medium">
                  support@reliefsync.com
                </a>
              </div>
              <div className="flex gap-6 text-sm font-medium">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}