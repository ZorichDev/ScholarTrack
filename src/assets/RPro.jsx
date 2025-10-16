import React, { useState, useEffect } from 'react';
import logo from './img/logo.png';
import { GraduationCap, Calculator, Globe, MessageCircle, CheckCircle, ArrowRight, Mail, Phone, User, BookOpen, MapPin, Award, TrendingUp, Users, Clock, Star, Shield, Zap, Target } from 'lucide-react';

// CONFIGURATION CONSTANTS
// ============================================
const CONFIG = {
  email: {
    recipient: "francis1chinazor@gmail.com",
    cc: "hilda.chijioke@rprogroup.com,admin@rprogroup.com",
    serviceId: "service_ptzp7rd",
    templateId: "template_rjb0396",
    publicKey: "3PD5AyCly9DCyS4u1" // Make sure this is your actual public key
  },
  tawk: {
    propertyId: "68e39551914f071953b2ca10",
    widgetId: "1j6sfuhnq"
  }
};

const PROGRAM_ELIGIBILITY = {
  'Canada': {
    'Masters': { min: 3.0, desc: 'Graduate degree programs (1-2 years)' },
    'Postgraduate Diploma': { min: 2.5, desc: 'Professional certification programs (1 year)' },
    'Graduate Certificate': { min: 2.3, desc: 'Specialized skill programs (8-12 months)' },
    'Pre-Masters': { min: 2.0, desc: 'Pathway programs to Masters' }
  },
  'UK': {
    'Masters': { min: 3.0, desc: 'Graduate degree programs (1 year)' },
    'Postgraduate Diploma': { min: 2.5, desc: 'Professional qualification (9-12 months)' },
    'Graduate Certificate': { min: 2.3, desc: 'Short professional courses (6-9 months)' },
    'Pre-Masters': { min: 2.0, desc: 'Foundation to Masters programs' }
  },
  'USA': {
    'Masters': { min: 3.0, desc: 'Graduate degree programs (2 years)' },
    'Graduate Certificate': { min: 2.5, desc: 'Professional development programs (1 year)' },
    'Pre-Masters': { min: 2.2, desc: 'Pathway programs to graduate study' }
  },
  'Australia': {
    'Masters': { min: 2.8, desc: 'Graduate degree programs (1.5-2 years)' },
    'Postgraduate Diploma': { min: 2.5, desc: 'Professional programs (1 year)' },
    'Graduate Certificate': { min: 2.3, desc: 'Specialized courses (6 months)' },
    'Pre-Masters': { min: 2.0, desc: 'Pathway to Masters programs' }
  },
  'Europe': {
    'Masters': { min: 2.8, desc: 'Graduate programs across European universities' },
    'Postgraduate Diploma': { min: 2.4, desc: 'Professional qualifications' },
    'Graduate Certificate': { min: 2.2, desc: 'Short-term specialized programs' }
  }
};

const STATS = [
  { number: '5,000+', label: 'Students Placed', icon: Users },
  { number: '50+', label: 'Partner Universities', icon: GraduationCap },
  { number: '98%', label: 'Visa Success Rate', icon: TrendingUp },
  { number: '15+', label: 'Years Experience', icon: Award }
];

const TESTIMONIALS = [
  {
    name: 'Adebayo Johnson',
    program: 'Masters in Computer Science, Canada',
    text: 'R-Pro made my dream of studying in Canada a reality. Their guidance was invaluable throughout the entire process.',
    rating: 5
  },
  {
    name: 'Chioma Okafor',
    program: 'MBA, United Kingdom',
    text: 'Professional, knowledgeable, and always available. I got admission to my top choice university thanks to R-Pro!',
    rating: 5
  },
  {
    name: 'Emmanuel Nwosu',
    program: 'Data Science, Australia',
    text: 'The eligibility checker helped me understand my options clearly. The team went above and beyond to help with my application.',
    rating: 5
  }
];

const SERVICES = [
  {
    icon: Target,
    title: 'University Selection',
    desc: 'We help you choose the best universities that match your academic profile and career goals.',
    gradient: 'from-indigo-500 to-blue-500'
  },
  {
    icon: BookOpen,
    title: 'Application Support',
    desc: 'Complete assistance with application documents, essays, and submission processes.',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Shield,
    title: 'Visa Guidance',
    desc: 'Expert support for visa applications with our proven 98% success rate.',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Globe,
    title: 'Pre-Departure Briefing',
    desc: 'Comprehensive orientation on accommodation, travel, and settling into your new country.',
    gradient: 'from-violet-500 to-purple-500'
  },
  {
    icon: Zap,
    title: 'Scholarship Assistance',
    desc: 'Identification and application support for scholarships and financial aid opportunities.',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    icon: Clock,
    title: 'Fast Processing',
    desc: 'Quick turnaround times with regular updates throughout your application journey.',
    gradient: 'from-cyan-500 to-blue-500'
  }
];

const DESTINATIONS = [
  { country: 'Canada', programs: '1,200+', flag: '🇨🇦', popular: 'Most Popular' },
  { country: 'United Kingdom', programs: '800+', flag: '🇬🇧', popular: 'Top Choice' },
  { country: 'United States', programs: '1,500+', flag: '🇺🇸', popular: 'Premium' },
  { country: 'Australia', programs: '600+', flag: '🇦🇺', popular: 'Emerging' },
  { country: 'Europe', programs: '900+', flag: '🇪🇺', popular: 'Affordable' }
];

// ============================================
// UTILITY FUNCTIONS
// ============================================
const normalizeGPA = (cgpa, maxScale) => {
  return (parseFloat(cgpa) / parseFloat(maxScale)) * 5.0;
};

const getEligiblePrograms = (normalizedCgpa, country) => {
  const countryPrograms = PROGRAM_ELIGIBILITY[country];
  const eligible = [];

  Object.entries(countryPrograms).forEach(([program, data]) => {
    if (normalizedCgpa >= data.min) {
      eligible.push({ program, ...data });
    }
  });

  return eligible.sort((a, b) => b.min - a.min);
};

// ============================================
// EMAILJS SERVICE FUNCTION
// ============================================
const sendEmailNotification = async (data) => {
  try {
    // Check if emailjs is available
    if (!window.emailjs) {
      console.error('EmailJS not loaded yet');
      return false;
    }

    // Prepare the email content
    const eligibleProgramsText = data.eligible.length > 0 
      ? data.eligible.map((p, index) => 
          `${index + 1}. ${p.program} - ${p.desc} (Min CGPA: ${p.min}/5.0)`
        ).join('\n')
      : 'No eligible programs found. Student needs counseling for alternative pathways.';

    const templateParams = {
      to_email: CONFIG.email.recipient,
      cc_email: CONFIG.email.cc,
      student_name: data.studentInfo.fullName,
      student_email: data.studentInfo.email,
      student_phone: data.studentInfo.phone || 'Not provided',
      current_level: data.studentInfo.currentLevel || 'Not provided',
      field_of_study: data.studentInfo.fieldOfStudy || 'Not provided',
      original_cgpa: data.cgpa,
      grading_scale: data.gradingScale,
      normalized_cgpa: data.normalizedCgpa,
      destination: data.country,
      eligible_programs: eligibleProgramsText,
      total_eligible: data.eligible.length,
      timestamp: data.timestamp,
      message: `New student eligibility check completed for ${data.studentInfo.fullName}.`,
      subject: `R-Pro ScholarTrack - Eligibility Results for ${data.studentInfo.fullName}`
    };

    console.log('Sending email with params:', templateParams);

    // Send email using EmailJS
    const response = await window.emailjs.send(
      CONFIG.email.serviceId,
      CONFIG.email.templateId,
      templateParams
    );
    
    console.log('Email sent successfully:', response);
    return true;
    
  } catch (error) {
    console.error('EmailJS failed to send:', error);
    
    // Log detailed error information
    if (error.text) {
      console.error('EmailJS error details:', error.text);
    }
    
    return false;
  }
};

// ============================================
// COMPONENT: Input Field
// ============================================
const InputField = ({ label, type = "text", value, onChange, placeholder, required = false, icon: Icon }) => (
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-2">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all outline-none text-sm md:text-base`}
        placeholder={placeholder}
      />
    </div>
  </div>
);

// ============================================
// COMPONENT: Select Field
// ============================================
const SelectField = ({ label, value, onChange, options, required = false, icon: Icon }) => (
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-2">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10">
          <Icon className="w-5 h-5" />
        </div>
      )}
      <select
        value={value}
        onChange={onChange}
        className={`w-full ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all outline-none appearance-none bg-white text-sm md:text-base`}
      >
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  </div>
);

// ============================================
// COMPONENT: Feature Card
// ============================================
const FeatureCard = ({ icon: Icon, title, description, gradient }) => (
  <div className={`bg-gradient-to-br ${gradient} rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}>
    <div className="bg-white/20 backdrop-blur-sm rounded-lg md:rounded-xl p-2 md:p-3 w-fit mb-3 md:mb-4">
      <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
    </div>
    <h3 className="text-lg md:text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-white/90 text-xs md:text-sm leading-relaxed">{description}</p>
  </div>
);

// ============================================
// COMPONENT: Stat Card
// ============================================
const StatCard = ({ number, label, icon: Icon }) => (
  <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
    <Icon className="w-8 h-8 md:w-10 md:h-10 text-indigo-600 mb-2 md:mb-3" />
    <div className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">{number}</div>
    <div className="text-xs md:text-sm text-slate-600 font-medium">{label}</div>
  </div>
);

// ============================================
// COMPONENT: Testimonial Card
// ============================================
const TestimonialCard = ({ name, program, text, rating }) => (
  <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all">
    <div className="flex mb-3">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400" />
      ))}
    </div>
    <p className="text-slate-700 mb-4 italic text-sm md:text-base">"{text}"</p>
    <div className="border-t border-slate-200 pt-4">
      <div className="font-bold text-slate-800 text-sm md:text-base">{name}</div>
      <div className="text-xs md:text-sm text-indigo-600">{program}</div>
    </div>
  </div>
);

// ============================================
// MAIN COMPONENT
// ============================================
export default function ScholarTrack() {
  const [activeTab, setActiveTab] = useState('home');
  const [cgpa, setCgpa] = useState('');
  const [maxCgpa, setMaxCgpa] = useState('5.0');
  const [country, setCountry] = useState('');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [studentInfo, setStudentInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    currentLevel: '',
    fieldOfStudy: ''
  });

  useEffect(() => {
    // Load EmailJS script
    const loadEmailJS = async () => {
      if (!window.emailjs) {
        try {
          // Import EmailJS directly as a module
          const emailJSModule = await import('@emailjs/browser');
          window.emailjs = emailJSModule;
          
          if (CONFIG.email.publicKey && CONFIG.email.publicKey !== 'YOUR_PUBLIC_KEY') {
            window.emailjs.init(CONFIG.email.publicKey);
            console.log('EmailJS initialized successfully');
          }
        } catch (error) {
          console.error('Failed to load EmailJS:', error);
        }
      }
    };

    // Load Tawk.to script
    const loadTawkTo = () => {
      if (!window.Tawk_API) {
        const tawkScript = document.createElement('script');
        tawkScript.async = true;
        tawkScript.src = `https://embed.tawk.to/${CONFIG.tawk.propertyId}/${CONFIG.tawk.widgetId}`;
        tawkScript.charset = 'UTF-8';
        tawkScript.setAttribute('crossorigin', '*');
        document.body.appendChild(tawkScript);
      }
    };

    loadEmailJS();
    loadTawkTo();

    return () => {
      // Cleanup if needed
    };
  }, []);

  const handleCalculate = async () => {
    if (!cgpa || !country) {
      alert('Please enter your CGPA and select a country');
      return;
    }

    if (!studentInfo.fullName || !studentInfo.email || !studentInfo.phone) {
      alert('Please fill in all required personal information');
      return;
    }

    setIsLoading(true);

    try {
      const normalizedCgpa = normalizeGPA(cgpa, maxCgpa);
      const eligible = getEligiblePrograms(normalizedCgpa, country);

      const resultData = {
        cgpa: parseFloat(cgpa),
        normalizedCgpa: normalizedCgpa.toFixed(2),
        country,
        eligible,
        studentInfo,
        gradingScale: maxCgpa,
        timestamp: new Date().toLocaleString()
      };

      setResults(resultData);
      setActiveTab('results');
      
      // Send email notification
      await sendNotification(resultData);
    } catch (error) {
      console.error('Error calculating eligibility:', error);
      alert('An error occurred while calculating your eligibility. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const sendNotification = async (data) => {
    try {
      const emailSent = await sendEmailNotification(data);
      
      if (emailSent) {
        alert('🎉 Your results have been sent to our team! We will contact you within 24 hours.');
      } else {
        alert('✅ Results calculated! If you don\'t hear from us within 24 hours, please contact us directly.');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('✅ Results calculated! Our team will review your information shortly.');
    }
  };

  const openChat = () => {
    if (window.Tawk_API) {
      window.Tawk_API.maximize();
    } else {
      alert('Chat is loading, please wait a moment.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-5 flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br rounded-xl flex items-center justify-center shadow-lg">
              <img src={logo} alt="Logo" className="w-10 h-10 md:w-11 md:h-11 text-white" />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-bold text-white">R-Pro ScholarTrack</h1>
              <p className="text-xs text-indigo-300 hidden sm:block">Your Path to Global Education</p>
            </div>
          </div>
          <button
            onClick={openChat}
            className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 md:px-5 py-2 md:py-2.5 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl text-sm md:text-base"
          >
            <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
            <span className="font-medium hidden sm:inline">Chat Support</span>
            <span className="font-medium sm:hidden">Chat</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* Navigation */}
        <div className="flex space-x-2 mb-6 md:mb-8 bg-white rounded-xl md:rounded-2xl p-1.5 md:p-2 shadow-lg overflow-x-auto">
          {['home', 'calculator', results && 'results'].filter(Boolean).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 min-w-fit py-2.5 md:py-3 px-3 md:px-4 rounded-lg md:rounded-xl font-semibold transition-all text-sm md:text-base whitespace-nowrap ${
                activeTab === tab 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab === 'home' ? 'Home' : tab === 'calculator' ? 'Check Eligibility' : 'My Results'}
            </button>
          ))}
        </div>

        {/* Home Tab */}
        {activeTab === 'home' && (
          <div className="space-y-8 md:space-y-12">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10"></div>
              <div className="relative z-10">
                <div className="inline-block bg-indigo-500/20 text-indigo-300 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4">
                  🎓 Nigeria's Leading Study Abroad Consultancy
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 leading-tight">Welcome to R-Pro ScholarTrack</h2>
                <p className="text-slate-200 text-sm md:text-base lg:text-lg mb-4 md:mb-6 max-w-3xl leading-relaxed">
                  Discover which international programs you qualify for based on your CGPA. Get instant, 
                  accurate eligibility results for study destinations worldwide with our advanced matching system.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4">
                  <button
                    onClick={() => setActiveTab('calculator')}
                    className="bg-white text-indigo-600 px-6 md:px-8 py-3 md:py-4 rounded-xl hover:shadow-2xl transition-all font-semibold flex items-center justify-center space-x-2 md:space-x-3 hover:-translate-y-1 text-sm md:text-base"
                  >
                    <span>Get Started Free</span>
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button
                    onClick={openChat}
                    className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-6 md:px-8 py-3 md:py-4 rounded-xl hover:bg-white/20 transition-all font-semibold text-sm md:text-base"
                  >
                    Talk to an Expert
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {STATS.map((stat, idx) => (
                <StatCard key={idx} {...stat} />
              ))}
            </div>

            {/* Features Section */}
            <div>
              <div className="text-center mb-6 md:mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Why Choose R-Pro ScholarTrack?</h3>
                <p className="text-sm md:text-base text-slate-600">Everything you need to start your study abroad journey</p>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                <FeatureCard
                  icon={Calculator}
                  title="CGPA Calculator"
                  description="Convert your grades from any grading system to standardized CGPA with our intelligent conversion algorithm"
                  gradient="from-indigo-500 to-indigo-600"
                />
                <FeatureCard
                  icon={Globe}
                  title="Global Programs"
                  description="Explore eligibility for top universities in Canada, UK, USA, Australia, and Europe with real-time data"
                  gradient="from-purple-500 to-purple-600"
                />
                <FeatureCard
                  icon={MessageCircle}
                  title="Expert Guidance"
                  description="Get personalized counseling from R-Pro's experienced team of education consultants available 24/7"
                  gradient="from-indigo-600 to-purple-600"
                />
              </div>
            </div>

            {/* Services Section */}
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-10">
              <div className="text-center mb-6 md:mb-10">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Our Comprehensive Services</h3>
                <p className="text-sm md:text-base text-slate-600">End-to-end support for your study abroad journey</p>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {SERVICES.map((service, idx) => (
                  <FeatureCard key={idx} {...service} />
                ))}
              </div>
            </div>

            {/* Destinations Section */}
            <div>
              <div className="text-center mb-6 md:mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Popular Study Destinations</h3>
                <p className="text-sm md:text-base text-slate-600">Explore thousands of programs across top destinations</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
                {DESTINATIONS.map((dest, idx) => (
                  <div key={idx} className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-center">
                    <div className="text-3xl md:text-5xl mb-2 md:mb-3">{dest.flag}</div>
                    <h4 className="font-bold text-sm md:text-base text-slate-800 mb-1">{dest.country}</h4>
                    <p className="text-xl md:text-2xl font-bold text-indigo-600 mb-1">{dest.programs}</p>
                    <p className="text-xs text-slate-500">programs</p>
                    <div className="mt-2 md:mt-3 bg-indigo-50 text-indigo-600 px-2 md:px-3 py-1 rounded-full text-xs font-semibold">
                      {dest.popular}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials Section */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl md:rounded-3xl p-6 md:p-10">
              <div className="text-center mb-6 md:mb-10">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Success Stories</h3>
                <p className="text-sm md:text-base text-slate-600">Hear from students who achieved their dreams with R-Pro</p>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {TESTIMONIALS.map((testimonial, idx) => (
                  <TestimonialCard key={idx} {...testimonial} />
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-2xl md:rounded-3xl p-6 md:p-10 text-center text-white shadow-2xl">
              <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Ready to Start Your Journey?</h3>
              <p className="text-indigo-100 mb-4 md:mb-6 text-sm md:text-base lg:text-lg max-w-2xl mx-auto">
                Join thousands of successful students who have achieved their study abroad dreams with R-Pro. 
                Get your free eligibility assessment now!
              </p>
              <button
                onClick={() => setActiveTab('calculator')}
                className="bg-white text-indigo-600 px-6 md:px-10 py-3 md:py-4 rounded-xl hover:shadow-2xl transition-all font-bold text-base md:text-lg inline-flex items-center space-x-2 md:space-x-3 hover:-translate-y-1"
              >
                <span>Check Your Eligibility Now</span>
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        )}

        {/* Calculator Tab */}
        {activeTab === 'calculator' && (
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-4 md:p-8">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-2 md:mb-3">Check Your Program Eligibility</h2>
              <p className="text-sm md:text-base lg:text-lg text-slate-600">Fill in your details to discover which programs you qualify for</p>
            </div>
            
            <div className="space-y-6 md:space-y-8">
              {/* Personal Info */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-indigo-100">
                <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-4 md:mb-6 flex items-center">
                  <User className="w-5 h-5 md:w-6 md:h-6 text-indigo-600 mr-2" />
                  Personal Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                  <InputField
                    label="Full Name"
                    value={studentInfo.fullName}
                    onChange={(e) => setStudentInfo({...studentInfo, fullName: e.target.value})}
                    placeholder="John Doe"
                    required
                    icon={User}
                  />
                  <InputField
                    label="Email Address"
                    type="email"
                    value={studentInfo.email}
                    onChange={(e) => setStudentInfo({...studentInfo, email: e.target.value})}
                    placeholder="john@example.com"
                    required
                    icon={Mail}
                  />
                  <InputField
                    label="Phone Number"
                    type="tel"
                    value={studentInfo.phone}
                    onChange={(e) => setStudentInfo({...studentInfo, phone: e.target.value})}
                    placeholder="+234 800 000 0000"
                    required
                    icon={Phone}
                  />
                  <SelectField
                    label="Current Education Level"
                    value={studentInfo.currentLevel}
                    onChange={(e) => setStudentInfo({...studentInfo, currentLevel: e.target.value})}
                    icon={GraduationCap}
                    options={[
                      { value: '', label: 'Select level' },
                      { value: "Bachelor's Degree", label: "Bachelor's Degree" },
                      { value: 'HND', label: 'HND' },
                      { value: "Master's Degree", label: "Master's Degree" },
                      { value: 'Other', label: 'Other' }
                    ]}
                  />
                  <div className="md:col-span-2">
                    <InputField
                      label="Field of Study"
                      value={studentInfo.fieldOfStudy}
                      onChange={(e) => setStudentInfo({...studentInfo, fieldOfStudy: e.target.value})}
                      placeholder="e.g., Computer Science, Business Administration"
                      icon={BookOpen}
                    />
                  </div>
                </div>
              </div>

              {/* Academic Info */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-purple-100">
                <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-4 md:mb-6 flex items-center">
                  <Calculator className="w-5 h-5 md:w-6 md:h-6 text-purple-600 mr-2" />
                  Academic Information
                </h3>

                <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                  <InputField
                    label="Your CGPA"
                    type="number"
                    value={cgpa}
                    onChange={(e) => setCgpa(e.target.value)}
                    placeholder="e.g., 3.5"
                    required
                  />
                  <SelectField
                    label="Grading Scale"
                    value={maxCgpa}
                    onChange={(e) => setMaxCgpa(e.target.value)}
                    required
                    options={[
                      { value: '4.0', label: '4.0 Scale (US Standard)' },
                      { value: '5.0', label: '5.0 Scale (Nigerian Standard)' },
                      { value: '7.0', label: '7.0 Scale' },
                      { value: '10.0', label: '10.0 Scale' }
                    ]}
                  />
                </div>
              </div>

              {/* Study Destination */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-indigo-100">
                <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-4 md:mb-6 flex items-center">
                  <Globe className="w-5 h-5 md:w-6 md:h-6 text-indigo-600 mr-2" />
                  Study Destination
                </h3>

                <SelectField
                  label="Preferred Study Destination"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  icon={MapPin}
                  options={[
                    { value: '', label: 'Select a country' },
                    { value: 'Canada', label: '🇨🇦 Canada' },
                    { value: 'UK', label: '🇬🇧 United Kingdom' },
                    { value: 'USA', label: '🇺🇸 United States' },
                    { value: 'Australia', label: '🇦🇺 Australia' },
                    { value: 'Europe', label: '🇪🇺 Europe' }
                  ]}
                />
              </div>

              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                <p className="text-xs md:text-sm text-slate-700">
                  <strong className="text-amber-700">Note:</strong> Your information will be sent to our counseling team for follow-up consultation.
                </p>
              </div>

              <button
                onClick={handleCalculate}
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-4 md:py-5 rounded-xl transition-all font-bold flex items-center justify-center space-x-2 md:space-x-3 text-base md:text-lg shadow-lg hover:shadow-xl ${
                  isLoading 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:from-indigo-600 hover:to-purple-600'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Calculator className="w-5 h-5 md:w-6 md:h-6" />
                    <span>Calculate My Eligibility</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && results && (
          <div className="space-y-4 md:space-y-6">
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-4 md:p-8">
              <div className="text-center mb-6 md:mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full mb-3 md:mb-4">
                  <CheckCircle className="w-7 h-7 md:w-10 md:h-10 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800 mb-2">Your Eligibility Results</h2>
                <p className="text-sm md:text-base text-slate-600">Based on your academic profile and preferences</p>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl md:rounded-2xl p-4 md:p-6 mb-6 md:mb-8 border-2 border-indigo-100">
                <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                  <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-4">
                    <p className="text-xs text-slate-500 mb-1">Student Name</p>
                    <p className="font-bold text-indigo-600 text-sm md:text-base break-words">{results.studentInfo.fullName}</p>
                  </div>
                  <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-4">
                    <p className="text-xs text-slate-500 mb-1">Email Address</p>
                    <p className="font-bold text-indigo-600 text-sm md:text-base break-all">{results.studentInfo.email}</p>
                  </div>
                  <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-4">
                    <p className="text-xs text-slate-500 mb-1">Your CGPA</p>
                    <p className="font-bold text-indigo-600 text-sm md:text-base">{results.cgpa} (on {results.gradingScale} scale)</p>
                  </div>
                  <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-4">
                    <p className="text-xs text-slate-500 mb-1">Normalized CGPA</p>
                    <p className="font-bold text-indigo-600 text-sm md:text-base">{results.normalizedCgpa}/5.0</p>
                  </div>
                  <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-4">
                    <p className="text-xs text-slate-500 mb-1">Study Destination</p>
                    <p className="font-bold text-indigo-600 text-sm md:text-base">{results.country}</p>
                  </div>
                  <div className="bg-white rounded-lg md:rounded-xl p-3 md:p-4">
                    <p className="text-xs text-slate-500 mb-1">Field of Study</p>
                    <p className="font-bold text-indigo-600 text-sm md:text-base">{results.studentInfo.fieldOfStudy || 'Not specified'}</p>
                  </div>
                </div>
                <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-indigo-200 bg-emerald-50 rounded-xl p-3">
                  <p className="text-xs md:text-sm text-emerald-700 font-semibold flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    Results sent to our counseling team - expect contact within 24 hours
                  </p>
                </div>
              </div>

              {results.eligible.length > 0 ? (
                <div className="space-y-4 md:space-y-6">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl md:rounded-2xl p-4 md:p-6 text-white">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">Great News! 🎉</h3>
                    <p className="text-sm md:text-base text-emerald-50">You're eligible for {results.eligible.length} program{results.eligible.length > 1 ? 's' : ''} in {results.country}</p>
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3 md:mb-4">Your Eligible Programs:</h3>
                    <div className="space-y-3 md:space-y-4">
                      {results.eligible.map((prog, idx) => (
                        <div key={idx} className="border-l-4 border-indigo-500 bg-gradient-to-r from-slate-50 to-indigo-50 p-4 md:p-6 rounded-r-xl md:rounded-r-2xl hover:shadow-lg transition-all group">
                          <div className="flex items-start space-x-3 md:space-x-4">
                            <div className="bg-emerald-100 p-2 rounded-xl group-hover:scale-110 transition-transform flex-shrink-0">
                              <CheckCircle className="w-5 h-5 md:w-7 md:h-7 text-emerald-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-lg md:text-xl text-slate-800 mb-2">{prog.program}</h4>
                              <p className="text-sm md:text-base text-slate-600 mb-3">{prog.desc}</p>
                              <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm">
                                <div className="bg-white px-2 md:px-3 py-1 rounded-lg whitespace-nowrap">
                                  <span className="text-slate-500">Minimum CGPA: </span>
                                  <span className="font-bold text-indigo-600">{prog.min}/5.0</span>
                                </div>
                                <div className="bg-emerald-100 text-emerald-700 px-2 md:px-3 py-1 rounded-lg font-semibold whitespace-nowrap">
                                  ✓ Qualified
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-blue-200">
                    <h4 className="font-bold text-base md:text-lg text-slate-800 mb-3 flex items-center">
                      <Award className="w-4 h-4 md:w-5 md:h-5 text-blue-600 mr-2 flex-shrink-0" />
                      What Happens Next?
                    </h4>
                    <ul className="space-y-2 text-sm md:text-base text-slate-700">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2 flex-shrink-0">1.</span>
                        <span>Our counselors will review your profile within 24 hours</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2 flex-shrink-0">2.</span>
                        <span>We'll recommend specific universities and programs tailored to your goals</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2 flex-shrink-0">3.</span>
                        <span>You'll receive guidance on applications, scholarships, and visa processes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2 flex-shrink-0">4.</span>
                        <span>We'll support you through every step until you're settled abroad</span>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 md:space-y-6">
                  <div className="bg-amber-50 border-2 border-amber-200 rounded-xl md:rounded-2xl p-4 md:p-6">
                    <div className="flex items-start space-x-3 md:space-x-4">
                      <div className="bg-amber-100 p-2 md:p-3 rounded-xl flex-shrink-0">
                        <Award className="w-6 h-6 md:w-8 md:h-8 text-amber-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-base md:text-lg text-slate-800 mb-2">Don't Worry - We Have Options!</h4>
                        <p className="text-sm md:text-base text-slate-700 mb-4">
                          Based on your current CGPA, you may not meet the minimum requirements for standard programs in {results.country}. 
                          However, R-Pro specializes in finding alternative pathways for students in your situation.
                        </p>
                        <div className="space-y-2 text-xs md:text-sm text-slate-700">
                          <p className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" />
                            Foundation and pathway programs
                          </p>
                          <p className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" />
                            Universities with flexible entry requirements
                          </p>
                          <p className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" />
                            Professional experience consideration
                          </p>
                          <p className="flex items-center">
                            <CheckCircle className="w-4 h-4 text-emerald-600 mr-2 flex-shrink-0" />
                            Alternative study destinations
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Call to Action */}
              <div className="mt-6 md:mt-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-xl md:rounded-2xl p-6 md:p-8 text-white shadow-2xl">
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">Ready for the Next Step?</h3>
                <p className="mb-4 md:mb-6 text-sm md:text-base text-indigo-100">Book a free consultation with our expert counselors to discuss your options, application strategy, and scholarship opportunities.</p>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
                  <button 
                    onClick={openChat}
                    className="bg-white text-indigo-600 px-4 md:px-6 py-3 md:py-4 rounded-xl hover:shadow-xl transition-all font-semibold flex items-center justify-center space-x-2 hover:-translate-y-1 text-sm md:text-base"
                  >
                    <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                    <span>Live Chat</span>
                  </button>
                  <button
                    onClick={() => window.location.href = "tel:+2349069246577"}
                    className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-4 md:px-6 py-3 md:py-4 rounded-xl hover:bg-white/20 transition-all font-semibold flex items-center justify-center space-x-2 text-sm md:text-base">
                    <Phone className="w-4 h-4 md:w-5 md:h-5" />
                    <span>Schedule Call</span>
                  </button>

                <button
                  onClick={() => window.location.href = "mailto:franzor@yahoo.com"}
                  className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-4 md:px-6 py-3 md:py-4 rounded-xl hover:bg-white/20 transition-all font-semibold flex items-center justify-center space-x-2 text-sm md:text-base sm:col-span-2 md:col-span-1">
                  <Mail className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Email Us</span>
                </button>
                </div>
              </div>

              {/* Download/Print Option */}
              <div className="text-center">
                <button
                    onClick={() => window.print()}
                    className="text-indigo-600 hover:text-indigo-700 font-semibold underline text-sm md:text-base" >
                   Download Results as PDF
                 </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 text-white mt-12 md:mt-16 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-3 md:mb-4">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br rounded-lg flex items-center justify-center">
                    <img src={logo} alt="Logo" className="w-8 h-8 md:w-11 md:h-9 text-white" />
                </div>
                <span className="font-bold text-base md:text-lg">R-Pro ScholarTrack</span>
              </div>
              <p className="text-xs md:text-sm text-slate-300">Empowering students to achieve their global education dreams since 2010.</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-2 md:mb-3 text-sm md:text-base">Quick Links</h4>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-slate-300">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Our Services</a></li>
                <li><a href="#" className="hover:text-white transition">Success Stories</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-2 md:mb-3 text-sm md:text-base">Destinations</h4>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-slate-300">
                <li><a href="#" className="hover:text-white transition">Study in Canada</a></li>
                <li><a href="#" className="hover:text-white transition">Study in UK</a></li>
                <li><a href="#" className="hover:text-white transition">Study in USA</a></li>
                <li><a href="#" className="hover:text-white transition">Study in Australia</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-2 md:mb-3 text-sm md:text-base">Contact Us</h4>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-slate-300">
                <li className="flex items-center">
                  <Mail className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
                  <a href="mailto:info@rprogroup.com" className="hover:text-white transition break-all">info@rprogroup.com</a>
                </li>
                <li className="flex items-center">
                  <Phone className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
                  <a href="tel:+234832248454" className="hover:text-white transition">+234 832 248 454</a>
                </li>
                <li className="flex items-center">
                  <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
                  <span>Lagos, Nigeria</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 pt-4 md:pt-6 text-center">
            <p className="text-xs md:text-sm text-slate-400">© 2025 R-Pro Group. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
}