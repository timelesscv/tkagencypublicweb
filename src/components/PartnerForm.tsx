import logo from "@/assets/logo.png";
import { Language } from "../types";
import { translations } from "../translations";
import { ArrowLeft } from "lucide-react";

interface PartnerFormProps {
  language: Language;
  onNavigate: (page: "home" | "partner" | "apply") => void;
  onLanguageChange?: (lang: Language) => void;
}

export default function PartnerForm({ language, onNavigate, onLanguageChange }: PartnerFormProps) {
  const t = translations[language] || translations.en;
  const isRtl = language === "ar";

  const handleGoHome = () => {
    onNavigate("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-navy font-sans">
      <nav className="sticky top-0 z-50 w-full border-b border-brand-border bg-brand-cream/85 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12">
          <button onClick={handleGoHome} className="flex items-center gap-2.5 cursor-pointer text-left">
            <img src={logo} alt="TK Agency logo" className="size-9 object-contain" />
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
              {t.partnerBadge}
            </span>
            <h1 className="mb-8 text-5xl leading-[1.05] lg:text-6xl font-display text-brand-navy">
              {t.partnerMainTitle} <span className="italic">{t.partnerMainTitleSpan}</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-brand-navy/70">
              {t.partnerMainDesc}
            </p>
          </div>

          <div className="mb-12 border border-brand-border bg-white p-8 lg:p-10 shadow-sm">
            <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">
              {t.partnerGmTitle}
            </span>
            <p className="mt-3 font-display text-3xl lg:text-4xl text-brand-navy">{t.partnerGmName}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-brand-navy/50 font-semibold">
              {t.partnerAgencySub}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <a href="tel:+251911460406" className="group block border-t border-brand-navy/15 pt-6 transition-colors hover:border-brand-gold">
              <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">{t.contactPrimary}</span>
              <p className="mt-4 font-display text-2xl group-hover:italic text-brand-navy transition-all duration-300">+251 911 460 406</p>
            </a>
            <a href="tel:+251944100707" className="group block border-t border-brand-navy/15 pt-6 transition-colors hover:border-brand-gold">
              <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">{t.contactSecondary}</span>
              <p className="mt-4 font-display text-2xl group-hover:italic text-brand-navy transition-all duration-300">+251 944 100 707</p>
            </a>
            <a href="mailto:tkagent2@gmail.com" className="group block border-t border-brand-navy/15 pt-6 transition-colors hover:border-brand-gold">
              <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">{t.contactEmail}</span>
              <p className="mt-4 break-all font-display text-2xl group-hover:italic text-brand-navy transition-all duration-300">tkagent2@gmail.com</p>
            </a>
          </div>

          <div className="mt-16 border-t border-brand-border pt-10">
            <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">
              {t.officeAddressTitle}
            </span>
            <address className="not-italic text-lg leading-relaxed text-brand-navy/70 space-y-1">
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
            <iframe
              title="TK Agency office location in Addis Ababa Pawe Building"
              src="https://maps.google.com/maps?q=Pawe+Building+Enkulal+Fabrika+Addis+Ababa&output=embed"
              className="mt-8 aspect-[16/9] w-full border border-brand-border grayscale"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
