import React, { useState, useEffect } from 'react';
import logo from './img/logo.png';
import { GraduationCap, Calculator, Globe, MessageCircle, CheckCircle, ArrowRight, Mail, Phone, User, BookOpen, MapPin, Award, TrendingUp, Users, Clock, Star, Shield, Zap, Target } from 'lucide-react';

// CONFIGURATION CONSTANTS
const CONFIG = {
  email: {
    recipient: "custormercare@rprogroup.net",
    cc: "admin@rprogroup.com",
    serviceId: "service_ptzp7rd",
    templateId: "template_rjb0396",
    publicKey: "3PD5AyCly9DCyS4u1"
  },
  tawk: {
    propertyId: "68e39551914f071953b2ca10",
    widgetId: "1j6sfuhnq"
  }
};

const DEGREE_CLASSIFICATION = {
  'First Class': { 
    min: 4.50, 
    max: 5.00, 
    equivalent: '3.60 - 4.00',
    description: 'First Class Honors'
  },
  'Second Class Upper': { 
    min: 3.50, 
    max: 4.49, 
    equivalent: '2.80 - 3.59',
    description: 'Second Class Upper (2:1)'
  },
  'Second Class Lower': { 
    min: 2.40, 
    max: 3.49, 
    equivalent: '1.90 - 2.79',
    description: 'Second Class Lower (2:2)'
  },
  'Third Class': { 
    min: 1.50, 
    max: 2.39, 
    equivalent: '1.20 - 1.89',
    description: 'Third Class'
  },
  'Pass': { 
    min: 1.00, 
    max: 1.49, 
    equivalent: '1.00 - 1.19',
    description: 'Pass'
  },
  'Fail': { 
    min: 0.00, 
    max: 0.99, 
    equivalent: '0.00 - 0.99',
    description: 'Fail'
  }
};

const PROGRAM_ELIGIBILITY = {
  'Canada': {
    'Direct Master\'s Degrees': { min: 3.5, desc: 'Full graduate degree programs at top universities (1-2 years)' },
    'Direct PhD Pathways': { min: 4.5, desc: 'Research-focused doctoral programs with funding opportunities (4-6 years)' },
    'Graduate Certificates/Diplomas': { min: 2.4, desc: 'Professional development programs (8-12 months)' },
    'Postgraduate Diplomas': { min: 1.5, desc: 'Advanced diploma programs for career advancement (1 year)' },
    'Pathway Programs': { min: 1.0, desc: 'Preparation for further graduate studies (1 year)' }
  },
  'UK': {
    'Direct Master\'s Degrees': { min: 3.5, desc: 'Taught and research programs at top universities (1 year)' },
    'Pre-Master\'s Pathway': { min: 2.4, desc: 'Preparation programs for Master\'s entry (6-9 months)' },
    'Pathway Programs': { min: 1.5, desc: 'Pre-Master\'s and foundation programs (9-12 months)' },
    'Graduate Entry Foundation': { min: 1.0, desc: 'One-year foundational studies program (1 year)' }
  },
  'USA': {
    'Direct Master\'s Degrees': { min: 3.5, desc: 'Graduate programs at top-ranked universities (2 years)' },
    'Direct PhD Pathways': { min: 4.5, desc: 'Fully-funded doctoral programs with stipends (5-6 years)' },
    'Master\'s Programs': { min: 2.4, desc: 'Graduate degrees with pathway options (2 years)' },
    'Bridge/Pathway Programs': { min: 1.5, desc: 'Academic preparation for graduate studies (1-2 years)' }
  },
  'Australia': {
    'Direct Master\'s Degrees': { min: 3.5, desc: 'Coursework and research programs at top universities (1.5-2 years)' },
    'Direct Master\'s': { min: 2.4, desc: 'Graduate programs with work experience consideration (1.5-2 years)' },
    'Postgraduate Diplomas': { min: 1.5, desc: 'Career-focused qualification programs (1 year)' },
    'Graduate Certificates': { min: 1.0, desc: 'Short-term specialized programs (6 months)' }
  },
  'Europe': {
    'Direct Master\'s Degrees': { min: 3.5, desc: 'English-taught programs across European universities (2 years)' },
    'Direct Master\'s': { min: 2.4, desc: 'Programs considering overall profile (2 years)' },
    'Pre-Master\'s Programs': { min: 2.4, desc: 'Foundation pathways to Master\'s (1 year)' },
    'Foundation Programs': { min: 1.5, desc: 'Preparation for Master\'s studies (1 year)' },
    'Postgraduate Certificates': { min: 1.0, desc: 'Professional qualification programs (1 year)' }
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

// UTILITY FUNCTIONS
const normalizeGPA = (cgpa, maxScale) => {
  return (parseFloat(cgpa) / parseFloat(maxScale)) * 5.0;
};

const getDegreeClass = (normalizedCgpa) => {
  for (const [degreeClass, range] of Object.entries(DEGREE_CLASSIFICATION)) {
    if (normalizedCgpa >= range.min && normalizedCgpa <= range.max) {
      return {
        class: degreeClass,
        description: range.description,
        equivalent: range.equivalent
      };
    }
  }
  return {
    class: 'Fail',
    description: 'Fail',
    equivalent: '0.00 - 0.99'
  };
};

const getEligiblePrograms = (normalizedCgpa, country) => {
  const countryPrograms = PROGRAM_ELIGIBILITY[country];
  const eligible = [];
  const degreeClass = getDegreeClass(normalizedCgpa);

  Object.entries(countryPrograms).forEach(([program, data]) => {
    if (normalizedCgpa >= data.min) {
      eligible.push({ 
        program, 
        ...data,
        degreeClass: degreeClass.class
      });
    }
  });

  return {
    programs: eligible.sort((a, b) => b.min - a.min),
    degreeClass: degreeClass
  };
};

// EMAILJS SERVICE FUNCTION
const sendEmailNotification = async (data) => {
  try {
    if (!window.emailjs) {
      console.error('EmailJS not loaded yet');
      return false;
    }

    const eligibleProgramsText = data.eligible.programs.length > 0 
      ? data.eligible.programs.map((p, index) => 
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
      degree_class: data.eligible.degreeClass.description,
      equivalent_scale: data.eligible.degreeClass.equivalent,
      destination: data.country,
      eligible_programs: eligibleProgramsText,
      total_eligible: data.eligible.programs.length,
      timestamp: data.timestamp,
      message: `New student eligibility check completed for ${data.studentInfo.fullName}.`,
      subject: `R-Pro ScholarTrack - Eligibility Results for ${data.studentInfo.fullName}`
    };

    const response = await window.emailjs.send(
      CONFIG.email.serviceId,
      CONFIG.email.templateId,
      templateParams
    );
    
    console.log('Email sent successfully:', response);
    return true;
    
  } catch (error) {
    console.error('EmailJS failed to send:', error);
    return false;
  }
};

// COMPONENT: Input Field
const InputField = ({ label, type = "text", value, onChange, placeholder, required = false, icon: Icon, disabled = false }) => (
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-2">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${disabled ? 'text-slate-300' : 'text-slate-400'}`}>
          <Icon className="w-5 h-5" />
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all outline-none text-sm md:text-base ${
          disabled 
            ? 'border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed' 
            : 'border-slate-200 hover:border-slate-300'
        }`}
        placeholder={placeholder}
      />
    </div>
  </div>
);

// COMPONENT: Select Field
const SelectField = ({ label, value, onChange, options, required = false, icon: Icon, disabled = false }) => (
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-2">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <div className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-10 ${
          disabled ? 'text-slate-300' : 'text-slate-400'
        }`}>
          <Icon className="w-5 h-5" />
        </div>
      )}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full ${Icon ? 'pl-11' : 'pl-4'} pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all outline-none appearance-none text-sm md:text-base ${
          disabled 
            ? 'border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed' 
            : 'border-slate-200 hover:border-slate-300 bg-white'
        }`}
      >
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  </div>
);

// COMPONENT: Feature Card
const FeatureCard = ({ icon: Icon, title, description, gradient }) => (
  <div className={`bg-gradient-to-br ${gradient} rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}>
    <div className="bg-white/20 backdrop-blur-sm rounded-lg md:rounded-xl p-2 md:p-3 w-fit mb-3 md:mb-4">
      <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
    </div>
    <h3 className="text-lg md:text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-white/90 text-xs md:text-sm leading-relaxed">{description}</p>
  </div>
);

// COMPONENT: Stat Card
const StatCard = ({ number, label, icon: Icon }) => (
  <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
    <Icon className="w-8 h-8 md:w-10 md:h-10 text-indigo-600 mb-2 md:mb-3" />
    <div className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">{number}</div>
    <div className="text-xs md:text-sm text-slate-600 font-medium">{label}</div>
  </div>
);

// COMPONENT: Testimonial Card
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

// MAIN COMPONENT
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

  const isPersonalInfoComplete = 
    studentInfo.fullName.trim() !== '' && 
    studentInfo.email.trim() !== '' && 
    studentInfo.phone.trim() !== '' && 
    studentInfo.currentLevel !== '' && 
    studentInfo.fieldOfStudy.trim() !== '';

  useEffect(() => {
    const loadEmailJS = async () => {
      if (!window.emailjs) {
        try {
          const emailJSModule = await import('@emailjs/browser');
          window.emailjs = emailJSModule;
          
          if (CONFIG.email.publicKey) {
            window.emailjs.init(CONFIG.email.publicKey);
            console.log('EmailJS initialized successfully');
          }
        } catch (error) {
          console.error('Failed to load EmailJS:', error);
        }
      }
    };

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
  }, []);

  const handleCalculate = async () => {
    if (!cgpa || !country) {
      alert('Please enter your CGPA and select a country');
      return;
    }

    if (!isPersonalInfoComplete) {
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
      <header className="bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-5 flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <img src={logo} alt="logo" className="w-5 md:w-6 md:h-6 object-contain"/>
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

        {activeTab === 'home' && (
          <div className="space-y-8 md:space-y-12">
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {STATS.map((stat, idx) => (
                <StatCard key={idx} {...stat} />
              ))}
            </div>

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

            <div>
              <div className="text-center mb-6 md:mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Popular Study Destinations</h3>
                <p className="text-sm md:text-base text-slate-600">Explore thousands of programs across top destinations</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
                {DESTINATIONS.map((dest, idx) => (
                  <div key={idx} className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-center">
                    <div className="text-4xl mb-3">{dest.flag}</div>
                    <div className="font-bold text-slate-800 mb-1 text-sm md:text-base">{dest.country}</div>
                    <div className="text-xs md:text-sm text-indigo-600 font-semibold mb-2">{dest.programs} Programs</div>
                    <div className="inline-block bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-2 md:px-3 py-1 rounded-full text-xs font-medium">
                      {dest.popular}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-center mb-6 md:mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">What Our Students Say</h3>
                <p className="text-sm md:text-base text-slate-600">Success stories from students we've helped</p>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {TESTIMONIALS.map((testimonial, idx) => (
                  <TestimonialCard key={idx} {...testimonial} />
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-10 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4">Ready to Start Your Journey?</h3>
              <p className="text-indigo-100 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base">
                Join thousands of successful students who have achieved their dreams of studying abroad with R-Pro.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <button
                  onClick={() => setActiveTab('calculator')}
                  className="bg-white text-indigo-600 px-6 md:px-8 py-3 md:py-4 rounded-xl hover:shadow-2xl transition-all font-semibold flex items-center justify-center space-x-2 hover:-translate-y-1 text-sm md:text-base"
                >
                  <Calculator className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Check Eligibility Now</span>
                </button>
                <button
                  onClick={openChat}
                  className="bg-white/10 backdrop-blur-sm text-white border-2 border-white px-6 md:px-8 py-3 md:py-4 rounded-xl hover:bg-white/20 transition-all font-semibold flex items-center justify-center space-x-2 text-sm md:text-base"
                >
                  <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Talk to Counselor</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-10">
              <div className="text-center mb-6 md:mb-8">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Calculator className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">Check Your Eligibility</h2>
                <p className="text-sm md:text-base text-slate-600">Enter your details to discover programs you qualify for</p>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 md:p-5 border border-indigo-100">
                  <h3 className="font-bold text-slate-800 mb-3 flex items-center text-sm md:text-base">
                    <User className="w-5 h-5 mr-2 text-indigo-600" />
                    Personal Information
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField
                      label="Full Name"
                      value={studentInfo.fullName}
                      onChange={(e) => setStudentInfo({...studentInfo, fullName: e.target.value})}
                      placeholder="Enter your full name"
                      required
                      icon={User}
                    />
                    <InputField
                      label="Email Address"
                      type="email"
                      value={studentInfo.email}
                      onChange={(e) => setStudentInfo({...studentInfo, email: e.target.value})}
                      placeholder="your.email@example.com"
                      required
                      icon={Mail}
                    />
                    <InputField
                      label="Phone Number"
                      type="tel"
                      value={studentInfo.phone}
                      onChange={(e) => setStudentInfo({...studentInfo, phone: e.target.value})}
                      placeholder="+234 XXX XXX XXXX"
                      required
                      icon={Phone}
                    />
                    <SelectField
                      label="Current Level"
                      value={studentInfo.currentLevel}
                      onChange={(e) => setStudentInfo({...studentInfo, currentLevel: e.target.value})}
                      required
                      icon={GraduationCap}
                      options={[
                        { value: '', label: 'Select your level' },
                        { value: 'Undergraduate (Final Year)', label: 'Undergraduate (Final Year)' },
                        { value: 'Bachelor\'s Degree Graduate', label: 'Bachelor\'s Degree Graduate' },
                        { value: 'Master\'s Degree Graduate', label: 'Master\'s Degree Graduate' },
                        { value: 'Other', label: 'Other' }
                      ]}
                    />
                    <div className="sm:col-span-2">
                      <InputField
                        label="Field of Study"
                        value={studentInfo.fieldOfStudy}
                        onChange={(e) => setStudentInfo({...studentInfo, fieldOfStudy: e.target.value})}
                        placeholder="e.g., Computer Science, Business Administration"
                        required
                        icon={BookOpen}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 md:p-5 border border-blue-100">
                  <h3 className="font-bold text-slate-800 mb-3 flex items-center text-sm md:text-base">
                    <Calculator className="w-5 h-5 mr-2 text-indigo-600" />
                    Academic Information
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <InputField
                      label="Your CGPA"
                      type="number"
                      step="0.01"
                      value={cgpa}
                      onChange={(e) => setCgpa(e.target.value)}
                      placeholder="e.g., 3.50"
                      required
                      disabled={!isPersonalInfoComplete}
                    />
                    <SelectField
                      label="Grading Scale"
                      value={maxCgpa}
                      onChange={(e) => setMaxCgpa(e.target.value)}
                      required
                      disabled={!isPersonalInfoComplete}
                      options={[
                        { value: '4.0', label: '4.0 Scale (US Standard)' },
                        { value: '5.0', label: '5.0 Scale (Nigerian Standard)' },
                        { value: '7.0', label: '7.0 Scale' },
                        { value: '10.0', label: '10.0 Scale' }
                      ]}
                    />
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 md:p-5 border border-purple-100">
                  <h3 className="font-bold text-slate-800 mb-3 flex items-center text-sm md:text-base">
                    <Globe className="w-5 h-5 mr-2 text-indigo-600" />
                    Preferred Destination
                  </h3>
                  <SelectField
                    label="Study Destination"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    icon={MapPin}
                    disabled={!isPersonalInfoComplete}
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

                {!isPersonalInfoComplete && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start space-x-3">
                    <div className="text-amber-600 mt-0.5">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-amber-800">Complete Personal Information Required</p>
                      <p className="text-xs text-amber-700 mt-1">Please fill in all personal information fields above before entering your academic details.</p>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleCalculate}
                  disabled={isLoading || !cgpa || !country || !isPersonalInfoComplete}
                  className={`w-full py-4 md:py-5 rounded-xl font-bold text-base md:text-lg transition-all flex items-center justify-center space-x-3 ${
                    isLoading || !cgpa || !country || !isPersonalInfoComplete
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-2xl hover:-translate-y-1'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Calculating...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 md:w-6 md:h-6" />
                      <span>Calculate My Eligibility</span>
                    </>
                  )}
                </button>

                <div className="text-center text-xs md:text-sm text-slate-500">
                  By submitting, you agree to receive guidance from R-Pro education consultants
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'results' && results && (
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8 text-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl md:text-3xl font-bold">Your Eligibility Results</h2>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-3 md:px-4 py-2">
                  <div className="text-xs md:text-sm text-indigo-200">Normalized CGPA</div>
                  <div className="text-xl md:text-2xl font-bold">{results.normalizedCgpa}/5.0</div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-indigo-200 text-xs md:text-sm mb-1">Original CGPA</div>
                  <div className="text-xl md:text-2xl font-bold">{results.cgpa}/{results.gradingScale}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-indigo-200 text-xs md:text-sm mb-1">Degree Classification</div>
                  <div className="text-lg md:text-xl font-bold">{results.eligible.degreeClass.description}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-indigo-200 text-xs md:text-sm mb-1">Destination</div>
                  <div className="text-lg md:text-xl font-bold">{results.country}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-indigo-200 text-xs md:text-sm mb-1">Eligible Programs</div>
                  <div className="text-xl md:text-2xl font-bold">{results.eligible.programs.length}</div>
                </div>
              </div>
            </div>

            {results.eligible.programs.length > 0 ? (
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 flex items-center">
                  <CheckCircle className="w-6 h-6 md:w-7 md:h-7 text-green-600 mr-3" />
                  Programs You Qualify For
                </h3>
                <div className="space-y-4">
                  {results.eligible.programs.map((program, idx) => (
                    <div key={idx} className="border-2 border-slate-200 rounded-xl p-4 md:p-5 hover:border-indigo-300 hover:shadow-lg transition-all">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-base md:text-lg font-bold text-slate-800 flex-1">{program.program}</h4>
                        <span className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold ml-2">
                          Eligible ✓
                        </span>
                      </div>
                      <p className="text-sm md:text-base text-slate-600 mb-3">{program.desc}</p>
                      <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-slate-500">
                        <span className="flex items-center">
                          <Award className="w-4 h-4 mr-1 text-indigo-600" />
                          Min CGPA: {program.min}/5.0
                        </span>
                        <span>•</span>
                        <span>Your CGPA: {results.normalizedCgpa}/5.0</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-8 text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3">Alternative Pathways Available</h3>
                <p className="text-sm md:text-base text-slate-600 mb-6 max-w-2xl mx-auto">
                  While you may not meet the direct entry requirements, we have alternative pathway programs 
                  and foundation courses that can help you achieve your study abroad goals.
                </p>
                <button
                  onClick={openChat}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold inline-flex items-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Speak with a Counselor</span>
                </button>
              </div>
            )}

            <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-2xl md:rounded-3xl shadow-2xl p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Next Steps</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-5">
                  <div className="flex items-start space-x-3">
                    <div className="bg-indigo-500 rounded-lg p-2 mt-1">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1 text-sm md:text-base">Consult with Experts</h4>
                      <p className="text-indigo-200 text-xs md:text-sm">Speak with our counselors for personalized guidance</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-5">
                  <div className="flex items-start space-x-3">
                    <div className="bg-purple-500 rounded-lg p-2 mt-1">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1 text-sm md:text-base">Prepare Documents</h4>
                      <p className="text-indigo-200 text-xs md:text-sm">Get your transcripts and documents ready</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-5">
                  <div className="flex items-start space-x-3">
                    <div className="bg-pink-500 rounded-lg p-2 mt-1">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1 text-sm md:text-base">Select Universities</h4>
                      <p className="text-indigo-200 text-xs md:text-sm">Choose programs that match your profile</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-5">
                  <div className="flex items-start space-x-3">
                    <div className="bg-cyan-500 rounded-lg p-2 mt-1">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1 text-sm md:text-base">Apply & Get Visa</h4>
                      <p className="text-indigo-200 text-xs md:text-sm">We handle applications and visa processing</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={openChat}
                  className="flex-1 bg-white text-indigo-600 px-6 py-3 md:py-4 rounded-xl hover:shadow-2xl transition-all font-semibold flex items-center justify-center space-x-2 text-sm md:text-base"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Book Free Consultation</span>
                </button>
                <button
                  onClick={() => setActiveTab('calculator')}
                  className="flex-1 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-6 py-3 md:py-4 rounded-xl hover:bg-white/20 transition-all font-semibold text-sm md:text-base"
                >
                  Check Another Destination
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="bg-slate-900 text-white mt-12 md:mt-16 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
             <div className="flex items-center gap-3">
              <img 
              src={logo} 
              alt="R-Pro ScholarTrack Logo" 
              className="w-8 h-8 md:w-10 md:h-10 object-contain"
               />

              <div className="flex flex-col">
              <h4 className="font-bold text-base md:text-lg text-white mb-1">
               R-Pro ScholarTrack
              </h4>
              <p className="text-slate-400 text-xs md:text-sm">
              Your trusted partner for international education opportunities.
              </p>
              </div>
              </div>
            <div>
              <h4 className="font-bold mb-4 text-sm md:text-base">Contact</h4>
              <div className="space-y-2 text-xs md:text-sm text-slate-400">
                <p className="flex items-center"><Mail className="w-4 h-4 mr-2" /> {CONFIG.email.recipient}</p>
                <p className="flex items-center"><Phone className="w-4 h-4 mr-2" /> +(234) 0903 663 0650</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm md:text-base">Quick Links</h4>
              <div className="space-y-2 text-xs md:text-sm text-slate-400">
                <button onClick={() => setActiveTab('home')} className="block hover:text-white">Home</button>
                <button onClick={() => setActiveTab('calculator')} className="block hover:text-white">Eligibility Check</button>
                <button onClick={openChat} className="block hover:text-white">Contact Us</button>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm md:text-base">Destinations</h4>
              <div className="space-y-2 text-xs md:text-sm text-slate-400">
                <p>Canada</p>
                <p>United Kingdom</p>
                <p>United States</p>
                <p>Australia</p>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 text-center text-xs md:text-sm text-slate-400">
            <p> &copy; 2025 <a href="https://www.rproabroadconsult.com/" class="text-blue-500 hover:underline">R-Pro ScholarTrack</a>. All rights reserved.</p>

          </div>
        </div>
      </footer>
    </div>
  );
}