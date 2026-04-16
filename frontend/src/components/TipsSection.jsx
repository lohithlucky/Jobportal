import React from "react";
import { BookOpen, Sparkles, Target, Zap } from "lucide-react";
import { motion } from "framer-motion";

const tips = [
  {
    icon: <Sparkles className="w-10 h-10 text-indigo-500" />,
    title: "Optimized Resume",
    description: "Tailor your CV with keywords directly from the job description for a 40% higher chance of ATS success.",
    color: "bg-indigo-50"
  },
  {
    icon: <Zap className="w-10 h-10 text-amber-500" />,
    title: "Quick Response",
    description: "Companies appreciate faster responses. Try to reply to interview invites within 12 hours for a serious impression.",
    color: "bg-amber-50"
  },
  {
    icon: <Target className="w-10 h-10 text-emerald-500" />,
    title: "Project Portfolio",
    description: "A live GitHub or Behance link is worth a thousand bullet points. Show them what you've actually built.",
    color: "bg-emerald-50"
  },
  {
    icon: <BookOpen className="w-10 h-10 text-rose-500" />,
    title: "Continuous Learning",
    description: "Highlight your certifications in MERN stack or Data Science to stay relevant in the fast-evolving tech world.",
    color: "bg-rose-50"
  }
];

const TipsSection = () => {
  return (
    <div className="py-24 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter uppercase leading-none">
            Pro Career <span className="text-[#6A38C2]">Tips</span>
          </h1>
          <p className="text-gray-500 font-bold max-w-xl mx-auto text-sm uppercase tracking-widest">
            Level up your job seeking game with these expert insights
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {tips.map((tip, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 group"
            >
              <div className={`${tip.color} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {tip.icon}
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">{tip.title}</h3>
              <p className="text-sm text-gray-500 font-bold leading-relaxed">{tip.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TipsSection;
