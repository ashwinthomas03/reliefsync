import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Check, Mail, Play, Shield, Award, ArrowRight, ChevronDown } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function ReliefSyncLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [productScale, setProductScale] = useState(1);
  const [productOpacity, setProductOpacity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const heroRef = useRef(null);
  const productRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrollY(scrollPosition);
      
      // Product zoom animation
      if (productRef.current) {
        const productSection = productRef.current;
        const rect = productSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const sectionMiddle = rect.top + rect.height / 2;
        
        // Calculate how centered the product is in the viewport
        const centerOffset = Math.abs(windowHeight / 2 - sectionMiddle);
        const maxOffset = windowHeight;
        const centerProgress = Math.max(0, 1 - centerOffset / maxOffset);
        
        // Zoom in when scrolling down to center (scale from 1 to 2)
        // Then zoom out when scrolling past center (scale from 2 to 1)
        let scale;
        if (rect.top > windowHeight / 2) {
          // Product is below center - scale up as it approaches
          scale = 1 + centerProgress * 1.2;
        } else if (rect.top < -rect.height / 2) {
          // Product is above viewport - scale down
          scale = 1;
        } else {
          // Product is above center - scale down as it moves up
          const exitProgress = Math.max(0, 1 - Math.abs(rect.top) / (windowHeight / 2));
          scale = 1 + exitProgress * 1.2;
        }
        
        setProductScale(scale);
        
        // Fade out as it goes past
        if (rect.top < -rect.height / 2) {
          setProductOpacity(0);
        } else if (rect.top < 0) {
          const fadeProgress = 1 + (rect.top / (rect.height / 2));
          setProductOpacity(fadeProgress);
        } else {
          setProductOpacity(1);
        }
      }
      
      // Intersection Observer for fade-in animations
      const sections = document.querySelectorAll('.fade-in-section');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.85;
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

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <style>{`
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background-color: #ffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .fade-in-section {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                      transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .fade-in-section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .nav-blur {
          backdrop-filter: saturate(180%) blur(20px);
          background-color: rgba(255, 255, 255, 0.72);
        }

        .feature-card {
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .feature-card:hover {
          transform: translateY(-4px);
        }

        .cta-button {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .cta-button:hover {
          transform: scale(1.02);
        }

        .scroll-indicator {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(10px); }
          60% { transform: translateY(5px); }
        }

        @keyframes fadeIn {
          from { 
            opacity: 0;
            transform: translateY(10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }

        .text-gradient {
          background: linear-gradient(90deg, #1d1d1f 0%, #86868b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .text-blue-gradient {
          background: linear-gradient(90deg, #0066CC 0%, #00A3FF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Remove default focus outlines, add custom ones */
        button:focus-visible,
        input:focus-visible {
          outline: 2px solid #0071e3;
          outline-offset: 2px;
        }

        /* Smooth section transitions */
        section {
          scroll-margin-top: 80px;
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrollY > 20 
          ? 'nav-blur border-b border-gray-200' 
          : 'bg-white/80 backdrop-blur-sm'
      }`}>
        <div className="max-w-[980px] mx-auto px-6">
          <div className="flex justify-between items-center h-[52px]">
            <button 
              onClick={() => scrollToSection('hero')}
              className="flex items-center space-x-2 group"
            >
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <img src="/header.png" alt="ReliefSync" className="w-7 h-6" />
              </div>
              <span className="text-[21px] font-semibold text-gray-900">
                ReliefSync
              </span>
            </button>
            
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('overview')} className="text-[12px] text-gray-600 hover:text-gray-900 transition-colors font-normal">
                Overview
              </button>
              <button onClick={() => scrollToSection('technology')} className="text-[12px] text-gray-600 hover:text-gray-900 transition-colors font-normal">
                Technology
              </button>
              <button onClick={() => scrollToSection('benefits')} className="text-[12px] text-gray-600 hover:text-gray-900 transition-colors font-normal">
                Benefits
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-[12px] px-4 py-1.5 bg-[#0071e3] text-white rounded-full hover:bg-[#0077ED] transition-all"
              >
                Pre-order
              </button>
            </div>

            <button 
              className="md:hidden text-gray-900" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200">
            <div className="px-6 py-4 space-y-3">
              <button onClick={() => scrollToSection('overview')} className="block w-full text-left text-gray-600 hover:text-gray-900 py-2 text-[14px]">
                Overview
              </button>
              <button onClick={() => scrollToSection('technology')} className="block w-full text-left text-gray-600 hover:text-gray-900 py-2 text-[14px]">
                Technology
              </button>
              <button onClick={() => scrollToSection('benefits')} className="block w-full text-left text-gray-600 hover:text-gray-900 py-2 text-[14px]">
                Benefits
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="block w-full text-center px-4 py-2.5 bg-[#0071e3] text-white rounded-full hover:bg-[#0077ED] transition-all text-[14px]"
              >
                Pre-order
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="relative h-screen flex items-center justify-center pt-[52px] bg-white overflow-hidden">
        <div className="max-w-[980px] mx-auto px-6 text-center">
          <div className="space-y-6 mb-12">
            <h1 className="text-[56px] md:text-[80px] lg:text-[96px] font-semibold leading-[1.05] tracking-tight text-gray-900">
              Relief that moves
              <br />
              with you
            </h1>
            <h2 className="text-[56px] md:text-[30px] lg:text-[36px] leading-[1.05] tracking-tight text-gray-900">"Sync your Mind, Ease your pain"</h2>
            <p className="text-[21px] md:text-[28px] leading-[1.38] text-gray-600 max-w-[700px] mx-auto font-normal">
              The R1 Band combines four advanced therapies to stop headaches before they start. Available February 2026.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => scrollToSection('contact')}
              className="cta-button px-6 py-3 bg-[#0071e3] text-white rounded-full hover:bg-[#0077ED] text-[17px] font-normal min-w-[140px]"
            >
              Pre-order
            </button>
            <a 
              href="https://www.youtube.com/watch?v=28qjHgzsvXc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cta-button px-6 py-3 text-[#0071e3] hover:underline text-[17px] font-normal flex items-center gap-2 no-underline"
            >
              <Play className="w-4 h-4" fill="currentColor" />
              Watch film
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 scroll-indicator">
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </div>
        </div>
      </section>

      {/* Product Zoom Section */}
      <section ref={productRef} className="relative h-[200vh] bg-white">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <div 
            className="relative mx-auto max-w-[800px] px-6 transition-all duration-300 ease-out"
            style={{ 
              transform: `scale(${productScale})`,
              opacity: productOpacity
            }}
          >
            <img 
              src="/R1.png" 
              alt="R1 Band" 
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* App Showcase Section */}
      <section className="py-32 bg-black text-white">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="text-center mb-20 fade-in-section">
            <h2 className="text-[48px] md:text-[64px] font-semibold leading-[1.08] tracking-tight mb-6">
              Intelligence in
              <br />
              your pocket
            </h2>
            <p className="text-[21px] md:text-[28px] leading-[1.38] text-gray-400 max-w-[700px] mx-auto font-normal">
              The ReliefSync app learns your patterns, predicts episodes, and puts personalized insights at your fingertips.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-[900px] mx-auto">
            {/* App Screenshot 1 - Home/Therapy */}
            <div className="fade-in-section">
              <div className="relative mx-auto max-w-[300px]">
                <img 
                  src="/first.png" 
                  alt="ReliefSync App - Start Therapy" 
                  className="w-full h-auto rounded-[2.5rem] shadow-2xl"
                />
              </div>
              <div className="mt-8 text-center">
                <h3 className="text-[24px] font-semibold mb-3">One-tap relief</h3>
                <p className="text-[17px] text-gray-400 leading-[1.47]">
                  Start your personalized therapy session instantly. Monitor real-time status and track your progress.
                </p>
              </div>
            </div>

            {/* App Screenshot 2 - Insights */}
            <div className="fade-in-section" style={{ transitionDelay: '200ms' }}>
              <div className="relative mx-auto max-w-[300px]">
                <img 
                  src="/second.png" 
                  alt="ReliefSync App - AI Insights" 
                  className="w-full h-auto rounded-[2.5rem] shadow-2xl"
                />
              </div>
              <div className="mt-8 text-center">
                <h3 className="text-[24px] font-semibold mb-3">AI-powered insights</h3>
                <p className="text-[17px] text-gray-400 leading-[1.47]">
                  Predictive risk assessment, pattern detection, and personalized recommendations powered by machine learning.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center fade-in-section" style={{ transitionDelay: '400ms' }}>
            <div className="inline-flex flex-col sm:flex-row items-center gap-6">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-400" />
                <span className="text-[15px] text-gray-300">iOS & Android</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-400" />
                <span className="text-[15px] text-gray-300">Automatic sync</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-400" />
                <span className="text-[15px] text-gray-300">Privacy-first design</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="fade-in-section">
              <div className="text-[56px] font-semibold text-gray-900 mb-2">45M</div>
              <p className="text-[17px] text-gray-600">Americans with chronic headaches</p>
            </div>
            <div className="fade-in-section" style={{ transitionDelay: '100ms' }}>
              <div className="text-[56px] font-semibold text-gray-900 mb-2">70%</div>
              <p className="text-[17px] text-gray-600">Experience fewer episodes in 30 days</p>
            </div>
            <div className="fade-in-section" style={{ transitionDelay: '200ms' }}>
              <div className="text-[56px] font-semibold text-gray-900 mb-2">4</div>
              <p className="text-[17px] text-gray-600">Clinically-proven therapies in one device</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-32 bg-white">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="text-center mb-20 fade-in-section">
            <h2 className="text-[48px] md:text-[64px] font-semibold leading-[1.08] tracking-tight text-gray-900 mb-6">
              Designed for life in motion
            </h2>
            <p className="text-[21px] md:text-[28px] leading-[1.38] text-gray-600 max-w-[800px] mx-auto">
              Whether you're in a tournament, at your desk, or on the go — the R1 Band delivers intelligent, personalized relief.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="fade-in-section feature-card bg-gray-50 rounded-3xl p-12 min-h-[400px] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-[32px] font-semibold text-gray-900 mb-4">Drug-free relief</h3>
                <p className="text-[19px] leading-[1.47] text-gray-600">
                  No side effects. No drowsiness. Just natural, effective therapy that works with your body.
                </p>
              </div>
            </div>

            <div className="fade-in-section feature-card bg-gray-50 rounded-3xl p-12 min-h-[400px] flex flex-col justify-between" style={{ transitionDelay: '100ms' }}>
              <div>
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center mb-6">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-[32px] font-semibold text-gray-900 mb-4">AI-powered personalization</h3>
                <p className="text-[19px] leading-[1.47] text-gray-600">
                  Machine learning adapts to your unique patterns, delivering increasingly effective results over time.
                </p>
              </div>
            </div>
          </div>

          <div className="fade-in-section feature-card bg-gray-50 rounded-3xl p-12" style={{ transitionDelay: '200ms' }}>
            <div className="max-w-[700px]">
              <h3 className="text-[32px] font-semibold text-gray-900 mb-4">Built for gamers and professionals</h3>
              <p className="text-[19px] leading-[1.47] text-gray-600">
                Extended screen time shouldn't mean compromising your health. The R1 Band prevents headaches during marathon sessions, keeping you focused when it matters most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-32 bg-gray-50">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="text-center mb-20 fade-in-section">
            <h2 className="text-[48px] md:text-[64px] font-semibold leading-[1.08] tracking-tight text-gray-900 mb-6">
              Four therapies.<br />One elegant solution.
            </h2>
            <p className="text-[21px] leading-[1.38] text-gray-600 max-w-[700px] mx-auto">
              Each therapy is precisely calibrated and working in harmony to provide comprehensive relief.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Precision massage',
                desc: 'Targeted pressure points release deep muscular tension through gentle, rhythmic compression.',
                delay: '0ms'
              },
              {
                title: 'Smart vibration',
                desc: 'Carefully tuned frequencies calm overactive nerve pathways and promote relaxation.',
                delay: '100ms'
              },
              {
                title: 'Thermal therapy',
                desc: 'Controlled warmth increases circulation and helps muscles relax naturally.',
                delay: '200ms'
              },
              {
                title: 'Precision cooling',
                desc: 'Targeted cryotherapy reduces inflammation and provides immediate, soothing relief.',
                delay: '300ms'
              }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="fade-in-section feature-card bg-white rounded-3xl p-10 border border-gray-200"
                style={{ transitionDelay: item.delay }}
              >
                <h3 className="text-[28px] font-semibold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-[17px] leading-[1.47] text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-32 bg-white">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="text-center mb-20 fade-in-section">
            <h2 className="text-[48px] md:text-[64px] font-semibold leading-[1.08] tracking-tight text-gray-900 mb-6">
              Transform your<br />quality of life
            </h2>
            <p className="text-[21px] leading-[1.38] text-gray-600 max-w-[700px] mx-auto">
              Real results you can measure in just 30 days.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                number: '01',
                title: 'Fewer episodes',
                desc: 'Advanced AI learns your triggers and prevents headaches before they start, giving you back your days.',
                delay: '0ms'
              },
              {
                number: '02',
                title: 'Better focus',
                desc: 'Stay sharp during critical moments without medication side effects or drowsiness.',
                delay: '100ms'
              },
              {
                number: '03',
                title: 'Improved wellbeing',
                desc: 'Reclaim productivity, peace of mind, and freedom from dependency on pain medication.',
                delay: '200ms'
              }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="fade-in-section feature-card bg-gray-50 rounded-3xl p-12"
                style={{ transitionDelay: item.delay }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  <div className="text-[80px] font-semibold text-gray-200 leading-none">
                    {item.number}
                  </div>
                  <div>
                    <h3 className="text-[32px] font-semibold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-[19px] leading-[1.47] text-gray-600">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-order Section */}
      <section id="contact" className="py-32 bg-gray-50">
        <div className="max-w-[700px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-[48px] md:text-[64px] font-semibold leading-[1.08] tracking-tight text-gray-900 mb-6">
              Be among the first
            </h2>
            <p className="text-[21px] leading-[1.38] text-gray-600">
              Join the waitlist for exclusive early access and save 30% at launch.
            </p>
          </div>

          <form onSubmit={handleWaitlistSubmit} className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className="w-full px-6 py-4 bg-white border border-gray-300 rounded-xl text-[17px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0071e3] transition-colors"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full px-6 py-4 bg-white border border-gray-300 rounded-xl text-[17px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#0071e3] transition-colors"
            />
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full cta-button px-6 py-4 bg-[#0071e3] text-white rounded-xl hover:bg-[#0077ED] transition-all text-[17px] font-normal disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Joining...' : 'Join waitlist'}
            </button>

            {submitStatus === 'success' && (
              <div className="animate-fade-in bg-green-50 border border-green-200 rounded-xl px-6 py-4">
                <div className="flex items-center gap-3 text-green-800">
                  <Check className="w-5 h-5" />
                  <p className="text-[15px]">Thank you! Check your email for confirmation.</p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="animate-fade-in bg-red-50 border border-red-200 rounded-xl px-6 py-4">
                <div className="flex items-center gap-3 text-red-800">
                  <X className="w-5 h-5" />
                  <p className="text-[15px]">Something went wrong. Please try again.</p>
                </div>
              </div>
            )}
          </form>

          <div className="flex items-center justify-center gap-8 mt-8 text-[12px] text-gray-500">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>30% early bird discount</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Free shipping</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 px-6">
        <div className="max-w-[980px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-900 rounded-lg flex items-center justify-center">
                <img src="/header.png" alt="ReliefSync" className="w-5 h-4" />
              </div>
              <span>© 2026 ReliefSync Inc.</span>
            </div>
            
            <a href="mailto:support@reliefsync.com" className="hover:text-gray-900 transition-colors flex items-center gap-2">
              <Mail className="w-4 h-4" />
              support@reliefsync.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}