import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Language } from "./types";
import { translations } from "./translations";
import Home from "./components/Home";
import PartnerForm from "./components/PartnerForm";
import ApplyForm from "./components/ApplyForm";
import { Briefcase, Menu, X, Landmark, ClipboardCheck, ArrowUpCircle } from "lucide-react";
import logo from "@/assets/logo.png";

export default function App() {
  const [language, setLanguage] = useState<Language>("en");
  const [page, setPage] = useState<"home" | "partner" | "apply">("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = translations[language];

  // Safe navigation anchor scroller
  const handleNavigate = (targetPage: "home" | "partner" | "apply") => {
    setPage(targetPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavAnchor = (id: string) => {
    setMobileMenuOpen(false);
    if (page !== "home") {
      setPage("home");
      window.scrollTo({ top: 0, behavior: "smooth" });
      // Allow react rendering turnaround
      setTimeout(() => {
        const elem = document.getElementById(id);
        elem?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      const elem = document.getElementById(id);
      elem?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isRtl = language === "ar";
  const textDirection = isRtl ? "rtl" : "ltr";

  return (
    <div dir={textDirection} className="min-h-screen bg-brand-cream text-brand-navy selection:bg-brand-gold/30 selection:text-brand-navy">
      
      {/* Header / Navigation Panel */}
      {page === "home" && (
        <nav className="sticky top-0 z-50 w-full border-b border-brand-border bg-brand-cream/90 backdrop-blur-md">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12 font-sans">
            
            <button 
              onClick={() => { setPage("home"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center gap-2.5 group text-left cursor-pointer"
            >
              <img src={logo} alt="TK Agency logo" className="size-9 object-contain" />
              <span 
                className="font-display text-xl font-bold tracking-tight bg-gradient-to-r from-[#012756] to-[#063160] bg-clip-text text-transparent inline-block"
                style={{
                  background: "linear-gradient(to right, #012756 0%, #063160 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                TK Agency
              </span>
            </button>

            {/* Desktop Anchor Navigation */}
            <div className="hidden items-center gap-8 text-xs font-bold uppercase tracking-[0.2em] lg:flex">
              <button onClick={() => handleNavAnchor("about")} className="transition-colors hover:text-brand-gold cursor-pointer">{t.navAbout}</button>
              <button onClick={() => handleNavAnchor("destinations")} className="transition-colors hover:text-brand-gold cursor-pointer">{t.navDestinations}</button>
              <button onClick={() => handleNavAnchor("values")} className="transition-colors hover:text-brand-gold cursor-pointer">{t.navValues}</button>
              <button onClick={() => handleNavAnchor("location")} className="transition-colors hover:text-brand-gold cursor-pointer">{t.navLocation}</button>
              
              <button 
                onClick={() => handleNavAnchor("contact")}
                className="bg-brand-navy px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-cream transition-all hover:bg-brand-gold cursor-pointer"
              >
                {t.navContact}
              </button>
            </div>

            <div className="flex items-center gap-4">
              
              {/* Language Toggle */}
              <div className="flex gap-0.5 rounded-full border border-brand-border bg-white/50 p-1">
                {(["en", "am", "ar"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      language === lang 
                        ? "bg-brand-navy text-brand-cream" 
                        : "text-brand-navy/60 hover:text-brand-navy"
                    }`}
                  >
                    {lang === "en" ? "EN" : lang === "am" ? "አማ" : "ع"}
                  </button>
                ))}
              </div>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex lg:hidden h-10 w-10 items-center justify-center rounded-full hover:bg-card/40 text-brand-navy cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
              </button>
            </div>
          </div>

          {/* Mobile slide drawer */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden border-t border-brand-border bg-brand-cream w-full px-6 py-6 space-y-4 font-sans"
              >
                <div className="grid gap-4 text-xs font-bold uppercase tracking-wider text-brand-navy/80">
                  <button onClick={() => handleNavAnchor("about")} className="text-left py-2 hover:text-brand-gold">{t.navAbout}</button>
                  <button onClick={() => handleNavAnchor("destinations")} className="text-left py-2 hover:text-brand-gold">{t.navDestinations}</button>
                  <button onClick={() => handleNavAnchor("values")} className="text-left py-2 hover:text-brand-gold">{t.navValues}</button>
                  <button onClick={() => handleNavAnchor("location")} className="text-left py-2 hover:text-brand-gold">{t.navLocation}</button>
                  
                  <button 
                    onClick={() => { setPage("partner"); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="text-left py-2 flex items-center gap-2 hover:text-brand-gold pt-2 border-t border-brand-border/40"
                  >
                    <ClipboardCheck className="size-4 text-brand-gold" />
                    <span>{t.partnerBtn}</span>
                  </button>

                  <button 
                    onClick={() => { setPage("apply"); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className="text-left py-2 flex items-center gap-2 hover:text-brand-gold"
                  >
                    <Briefcase className="size-4 text-brand-gold" />
                    <span>{t.applyBtn}</span>
                  </button>

                  <button 
                    onClick={() => handleNavAnchor("contact")}
                    className="w-full bg-brand-navy py-3 px-4 text-brand-cream text-center uppercase tracking-widest mt-2 block"
                  >
                    {t.navContact}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      )}

      {/* Main Container Pages Switcher */}
      <main>
        <AnimatePresence mode="wait">
          {page === "home" && (
            <motion.div
              key="homePage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Home language={language} onNavigate={handleNavigate} />
            </motion.div>
          )}

          {page === "partner" && (
            <motion.div
              key="partnerPage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PartnerForm 
                language={language} 
                onNavigate={handleNavigate} 
                onLanguageChange={setLanguage}
              />
            </motion.div>
          )}

          {page === "apply" && (
            <motion.div
              key="applyPage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ApplyForm 
                language={language} 
                onNavigate={handleNavigate} 
                onLanguageChange={setLanguage}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Block */}
      <footer className="border-t border-brand-border bg-brand-cream px-6 py-20 lg:px-12 font-sans text-brand-navy">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-4">
            
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-2.5">
                <img src={logo} alt="TK Agency logo" className="h-8 object-contain" />
                <span 
                  className="font-display text-lg font-bold tracking-tight bg-gradient-to-r from-[#012756] to-[#063160] bg-clip-text text-transparent inline-block"
                  style={{
                    background: "linear-gradient(to right, #012756 0%, #063160 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  TK Agency
                </span>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-brand-navy/60">
                {t.footerText}
              </p>
            </div>

            <div>
              <h5 className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">{t.footerServices}</h5>
              <ul className="space-y-3 text-sm text-brand-navy/70">
                <li>{t.serviceHousemaids}</li>
                <li>{t.serviceCleaners}</li>
                <li>{t.serviceCooks}</li>
                <li>{t.serviceNannies}</li>
                <li>{t.serviceCaregivers}</li>
              </ul>
            </div>

            <div>
              <h5 className="mb-6 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">{t.footerOffice}</h5>
              <ul className="space-y-3 text-sm text-brand-navy/70 leading-relaxed font-mono">
                <li>Pawe Building, 6th Floor</li>
                <li>Enkulal Fabrika, Addis Ababa</li>
                <li>Ethiopia</li>
                <li className="pt-3 font-semibold"><a href="tel:+251911460406" className="hover:text-brand-gold transition-colors">+251 911 460 406</a></li>
                <li className="font-sans"><a href="mailto:tkagent2@gmail.com" className="hover:text-brand-gold transition-colors text-sm">tkagent2@gmail.com</a></li>
              </ul>
            </div>

          </div>

          <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-brand-border pt-12 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-navy/40 lg:flex-row">
            <p>{t.footerCopyright}</p>
            <div className="flex gap-8">
              <button onClick={() => handleNavAnchor("about")} className="hover:text-brand-navy cursor-pointer">{t.footerAbout}</button>
              <button onClick={() => handleNavAnchor("destinations")} className="hover:text-brand-navy cursor-pointer">{t.footerDestinations}</button>
              <button onClick={() => handleNavAnchor("contact")} className="hover:text-brand-navy cursor-pointer">{t.footerContact}</button>
            </div>
          </div>

          <div className="mt-8 flex justify-center lg:justify-start text-[8px] sm:text-[9px] tracking-[0.3em] uppercase font-mono text-brand-navy/25">
            <span>Made by <span className="font-semibold text-brand-navy/40">P1xel Tech</span> &bull; <a href="mailto:nathanasrat3@gmail.com" className="hover:text-brand-gold transition-all duration-300 lowercase tracking-normal">nathanasrat3@gmail.com</a></span>
          </div>
        </div>
      </footer>

      {/* Back to top smooth trigger button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-40 bg-brand-navy text-brand-gold p-2.5 rounded-full shadow-lg border border-brand-border/10 cursor-pointer hover:bg-brand-gold hover:text-brand-navy transition-all"
            aria-label="Back to Top"
          >
            <ArrowUpCircle className="size-6" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
