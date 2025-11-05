import React, { useState, useEffect } from 'react';
import { Menu, X, Check, Mail, Play, Shield, Zap, Brain, Activity, TrendingUp, Users, Award, ArrowRight, Star } from 'lucide-react';
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

    console.log('Sending emails...');
    
    // Send welcome email to user
    const userResponse = await emailjs.send(
      serviceID, 
      templateID, 
      userTemplateParams, 
      publicKey
    );
    
    console.log('User email sent:', userResponse);

    // Send notification to admin
    const adminResponse = await emailjs.send(
      serviceID, 
      adminTemplateID, 
      adminTemplateParams, 
      publicKey
    );

    console.log('Admin email sent:', adminResponse);

    if (userResponse.status === 200 && adminResponse.status === 200) {
      setSubmitStatus('success');
      alert(`Thank you ${name}! Check your email for confirmation.`);
      setEmail('');
      setName('');
    } else {
      throw new Error('EmailJS error');
    }
  } catch (error) {
    console.error("EmailJS Error:", error);
    if (error?.text) console.log("Error details:", error.text);
    setSubmitStatus('error');
    alert('Oops! Something went wrong. Please try again.');
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

        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-25px); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
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
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-16 items-center">
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
              <a href="#contact" className="group px-12 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-lg font-bold rounded-full shadow-2xl shadow-blue-500/40 hover:shadow-3xl hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 btn-shine flex items-center justify-center gap-3 no-underline">
                Join Waitlist
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" strokeWidth={3} />
              </a>
              <button className="group px-12 py-5 bg-slate-800/80 backdrop-blur-sm border-2 border-slate-600 text-gray-200 text-lg font-bold rounded-full shadow-xl hover:bg-slate-700/80 hover:border-cyan-400 transition-all duration-300 flex items-center justify-center gap-3">
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

          <div className="relative z-10 h-[700px] flex items-center justify-center">
            <div 
              className="product-3d relative w-full max-w-lg"
              style={{ 
                transform: `perspective(1500px) rotateY(${productRotation}deg) rotateX(${Math.sin(productRotation / 80) * 15}deg) scale(${productScale})`
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse"></div>
              </div>
              
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-[3rem] p-16 shadow-[0_60px_120px_rgba(0,0,0,0.5)] border border-slate-700/50">
                <div className="aspect-square bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 rounded-[2.5rem] flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
                  <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-cyan-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                  </div>
                  
                  <div className="relative z-10 mb-10">
                    <div className="w-40 h-40 bg-white/25 backdrop-blur-md rounded-[2rem] flex items-center justify-center border-4 border-white/40 shadow-2xl">
                      <Activity className="w-24 h-24 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                  
                  <div className="text-9xl font-black text-white tracking-tight mb-6">R1</div>
                  <div className="text-white/90 text-lg tracking-[0.4em] uppercase font-bold">Relief Band</div>
                </div>
              </div>

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
      <section id="benefits" className="py-32 px-6 lg:px-8 bg-gradient-to-br from-slate-800 via-purple-900/20 to-slate-800 relative overflow-hidden">
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
      <section id="contact" className="py-32 px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 relative overflow-hidden">
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
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" strokeWidth={2.5} />
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
