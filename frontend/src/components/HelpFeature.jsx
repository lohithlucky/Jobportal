import React, { useState } from "react";
import { HelpCircle, MessageCircle, Phone, X, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const HelpFeature = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[200]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className="mb-6 w-80 bg-white border border-gray-100 shadow-2xl rounded-[2.5rem] overflow-hidden origin-bottom-right"
          >
            {/* Header */}
            <div className="bg-[#6A38C2] p-8 text-white">
              <h3 className="text-xl font-black uppercase tracking-tighter leading-none mb-1">Help & Support</h3>
              <p className="text-xs font-bold text-indigo-100 uppercase tracking-widest opacity-80">How can we help today?</p>
            </div>
            
            {/* Content */}
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <a href="mailto:support@jobfinder.com" className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-indigo-50 hover:text-[#6A38C2] transition-all group">
                  <Mail className="h-5 w-5 text-gray-400 group-hover:text-indigo-500" />
                  <span className="text-sm font-bold">Email Support</span>
                </a>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-indigo-50 hover:text-[#6A38C2] transition-all group cursor-pointer">
                  <Phone className="h-5 w-5 text-gray-400 group-hover:text-indigo-500" />
                  <span className="text-sm font-bold">Priority Call Support</span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-emerald-50 hover:text-emerald-600 transition-all group cursor-pointer">
                  <MessageCircle className="h-5 w-5 text-gray-400 group-hover:text-emerald-500" />
                  <span className="text-sm font-bold">Live Chat Support</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest text-center">Available 24/7 for you</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#6A38C2] rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-95 transition-all shadow-indigo-200 group relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="closeIcon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div key="helpIcon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <HelpCircle size={28} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Glow */}
        {!isOpen && (
          <span className="absolute -inset-1 bg-indigo-500 rounded-full blur-md opacity-20 animate-pulse"></span>
        )}
      </button>
    </div>
  );
};

export default HelpFeature;
