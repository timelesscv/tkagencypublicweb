import logo from "@/assets/logo.png";
import { Language } from "../types";
import { translations } from "../translations";
import { ArrowLeft } from "lucide-react";

interface ApplyFormProps {
  language: Language;
  onNavigate: (page: "home" | "partner" | "apply") => void;
  onLanguageChange?: (lang: Language) => void;
  logoSrc?: string;
}

export default function ApplyForm({ language, onNavigate, onLanguageChange, logoSrc }: ApplyFormProps) {
  const t = translations[language] || translations.en;
  const isRtl = language === "ar";
  const displayLogo = logoSrc || logo;

  const handleGoHome = () => {
    onNavigate("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-navy font-sans">
      <nav className="sticky top-0 z-50 w-full border-b border-brand-border bg-brand-cream/85 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12">
          <button onClick={handleGoHome} className="flex items-center gap-2.5 cursor-pointer text-left">
            <img src={displayLogo} alt="TK Agency logo" className="size-9 object-contain" />
            <span 
              className="font-display text-xl tracking-tight font-bold bg-gradient-to-r from-[#012756] to-[#063160] bg-clip-text text-transparent inline-block"
              style={{
                background: "linear-gradient(to right, #012756 0%, #063160 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              TK Agency
            </span>
          </button>

          <div className="flex items-center gap-4">
            {onLanguageChange && (
              <div className="flex gap-0.5 rounded-full border border-brand-border bg-white/50 p-1">
                {(["en", "am", "ar"] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => onLanguageChange(lang)}
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
            )}

            <button
              onClick={handleGoHome}
              className="inline-flex items-center gap-2 border border-brand-navy px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-brand-navy hover:text-brand-cream cursor-pointer"
            >
              <ArrowLeft className={`size-3.5 ${isRtl ? "rotate-180" : ""}`} />
              <span>{t.backHomeBtn || "Home"}</span>
            </button>
          </div>
        </div>
      </nav>

      <section className="px-6 py-20 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-4xl animate-fade-in">
          <div className="mb-16">
            <span className="mb-6 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold font-sans">
              {t.applyBadge}
            </span>
            <h1 className="mb-8 text-5xl leading-[1.05] lg:text-6xl font-display text-brand-navy">
              {t.applyMainTitle} <span className="italic">{t.applyMainTitleSpan}</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-brand-navy/70">
              {t.applyMainDesc}
            </p>
          </div>

          <div className="mb-10 border-l-4 border-brand-gold bg-white p-8 lg:p-10 shadow-sm border border-y border-r border-brand-border animate-fade-in">
            <p className="text-lg leading-relaxed text-brand-navy/80">
              <strong className="font-semibold text-brand-navy">{t.applyNoticeTitle}</strong>{" "}
              {t.applyNoticeBody}
            </p>
          </div>

          <div className="grid gap-12 border-t border-brand-border pt-10 lg:grid-cols-2">
            <div>
              <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">
                {t.officeAddressTitle}
              </span>
              <address className="not-italic text-lg leading-relaxed text-brand-navy/75 space-y-1">
                {t.locationAddress.split("\n").map((line: string, i: number) => (
                  <p key={i}>{line}</p>
                ))}
              </address>
              <a
                href="https://maps.app.goo.gl/b2yQFi5Fn9NRPD616"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block border border-brand-navy px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-brand-navy hover:text-brand-cream cursor-pointer"
              >
                {t.directionsBtn}
              </a>
            </div>
            <div>
              <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">
                {t.officeContactTitle}
              </span>
              <ul className="space-y-3 text-lg text-brand-navy/75">
                <li><a href="tel:+251911460406" className="hover:text-brand-gold transition-colors">+251 911 460 406</a></li>
                <li><a href="tel:+251944100707" className="hover:text-brand-gold transition-colors">+251 944 100 707</a></li>
                <li><a href="mailto:tkagent2@gmail.com" className="break-all hover:text-brand-gold transition-colors">tkagent2@gmail.com</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-16">
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">
              {t.officeMapTitle}
            </span>
            <iframe
              title="TK Agency office location in Addis Ababa Pawe Building"
              src="https://maps.google.com/maps?q=Pawe+Building+Enkulal+Fabrika+Addis+Ababa&output=embed"
              className="aspect-[16/9] w-full border border-brand-border grayscale"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
