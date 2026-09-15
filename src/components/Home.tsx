import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Language } from "../types";
import { translations } from "../translations";
import { Briefcase, ArrowRight, UserCheck, ShieldCheck, MapPin, Phone, Mail, Award, CheckCircle } from "lucide-react";

import destKuwait from "@/assets/dest-kuwait.jpg";
import destSaudi from "@/assets/dest-saudi.jpg";
import destJordan from "@/assets/dest-jordan.jpg";
import about1_1 from "@/assets/about-us-1.jpeg";
import about1_2 from "@/assets/about-us-1-2.jpeg";
import about1_3 from "@/assets/about-us-1-3.jpeg";
import about1_4 from "@/assets/about-us-1-4.jpeg";
import about2_1 from "@/assets/about-us-2.jpeg";
import about2_2 from "@/assets/about-us-2-2.jpeg";
import about2_3 from "@/assets/about-us-2-3.jpeg";
import about2_4 from "@/assets/about-us-2-4.jpeg";
import ourValues from "@/assets/our-values.jpeg";
import contactPortrait from "@/assets/get-in-touch.jpeg";

interface HomeProps {
  language: Language;
  onNavigate: (page: "home" | "partner" | "apply") => void;
}

const values = [
  { n: "01", title: "Integrity & Transparency", titleAm: "ታማኝነት እና ግልጽነት", titleAr: "النزاهة والشفافية", body: "Clear terms, honest expectations, and no hidden fees — for workers and employers alike.", bodyAm: "ግልጽ የስራ ውል፣ ታማኝ አገልግሎት እና ምንም አይነት የተደበቀ ክፍያ የሌለበት — ለሰራተኞችም ሆነ ለቀጣሪዎች።", bodyAr: "شروط واضحة، توقعات صادقة، ولا توجد رسوم خفية — للعمال وأرباب العمل على حد سواء." },
  { n: "02", title: "Professional Service", titleAm: "ራሱን የቻለ ሙያዊ አገልግሎት", titleAr: "خدمة مهنية متكاملة", body: "A trained team guides every placement from first interview to safe arrival overseas.", bodyAm: "የሰለጠነ የቅጥር መሪ ቡድን ከመጀመሪያው ቃለ መጠይቅ ጀምሮ እስካስተማማኝ መዳረሻ ሀገር ድረስ ይመራል።", bodyAr: "فريق مدرب يوجه كل عملية استقدام من المقابلة الأولى وحتى الوصول الآمن في الخارج." },
  { n: "03", title: "Respect for Workers", body: "Dignified treatment, fair contracts, and continued support throughout the employment term.", titleAm: "ለሰራተኞች ክብር", titleAr: "احترام كرامة وحقوق العمال", bodyAm: "ክብር ያለው አያያዝ፣ ሚዛናዊ የጋራ ስምምነት ኮንትራት እና በስራ ዘመን በሙሉ ቀጣይነት ያለው ምርጥ ድጋፍ።", bodyAr: "معاملة كريمة وعادلة، عقود عمل عادلة، ودعم مستمر طوال فترة عقد العمل والتوظيف." },
  { n: "04", title: "Legal & Ethical Recruitment", body: "Fully licensed in Ethiopia and compliant with destination-country labor regulations.", titleAm: "ህጋዊ እና ስነ-ምግባራዊ ምልመላ", titleAr: "الاستقدام القانوني والأخلاقي", bodyAm: "በኢትዮጵያ ስራና ማህበራዊ ጉዳይ ሙሉ ፍቃድ ያለው እና የመዳረሻ አገሮችን ህግጋት የተከተለ።", bodyAr: "مرخص بالكامل في إثيوبيا ومتوافق تمامًا مع لوائح قوانين العمل في دول المقصد والخليج." },
  { n: "05", title: "Commitment to Excellence", body: "We measure success by long-term placements and the satisfaction of both sides.", titleAm: "ለምርጥ ውጤት መትጋት", titleAr: "الالتزام بالتميز والجودة", bodyAm: "ስኬታችንን የምንለካው በሰራተኞቻችን የረጅም ጊዜ ስኬታማነት እና በሁለቱም ወገን መደሰት ነው።", bodyAr: "نقيس نجاحنا باستمرار التوظيف طويل الأمد والرضا والموثوقية من كلا الطرفين." },
];

const destinations = [
  { 
    country: "Saudi Arabia", 
    city: "Dammam", 
    img: destSaudi,
    blurb: "Long-standing partnerships with vetted households across the Kingdom.",
    blurbAm: "በመላው የሳውዲ አረቢያ ግዛት ከተረጋገጡ ቤተሰቦች ጋር የቆየ ጠንካራ አጋርነት አለን።",
    blurbAr: "شراكات طويلة الأمد وعلاقات ممتازة مع عائلات موثوقة في جميع أنحاء المملكة العربية السعودية.",
    cities: ["Dammam"],
    citiesAm: ["ዳማም"],
    citiesAr: ["الدمام"],
    flightTime: "Approx. 3 hours, 15 minutes",
    flightTimeAm: "ወደ 3 ሰዓት ከ 15 ደቂቃ ያህል",
    flightTimeAr: "حوالي ٣ ساعات و ١٥ دقيقة",
    relationship: "Established over a decade of direct, secure cooperation with top accredited offices.",
    relationshipAm: "ከፍተኛ እውቅና ካላቸው የስራ ቅጥር ቢሮዎች ጋር ከአስር አመት በላይ የታመነ ቀጥታ ስምምነት።",
    relationshipAr: "علاقة استراتيجية مباشرة مع كبرى مكاتب الاستقدام المعتمدة لأكثر من 10 سنوات.",
    turnaround: "15 - 25 Days",
    turnaroundAm: "15 - 25 ቀናት",
    turnaroundAr: "١٥ - ٢٥ يوماً"
  },
  { 
    country: "Kuwait", 
    city: "Kuwait City", 
    img: destKuwait,
    blurb: "Established placement pipeline with families seeking experienced domestic staff.",
    blurbAm: "ልምድ ያላቸውን የቤት ውስጥ ሰራተኞች ከሚፈልጉ ታማኝ ቤተሰቦች ጋር የተመሰረተ የስራ ትስስር።",
    blurbAr: "مسار توظيف متكامل ومنظم لدى عائلات كويتية تبحث عن كوادر متميزة وخبيرة.",
    cities: ["Kuwait City"],
    citiesAm: ["ኩዌት ሲቲ"],
    citiesAr: ["مدينة الكويت"],
    flightTime: "Approx. 4 hours, 10 minutes",
    flightTimeAm: "ወደ 4 ሰዓት ከ 10 ደቂቃ ያህል",
    flightTimeAr: "حوالي ٤ ساعات و ١٠ دقائق",
    relationship: "Direct recruitment partnership ensuring verified safety standards and supportive welfare.",
    relationshipAm: "የሰራተኞቻችንን መብትና ደህንነት የሚያረጋግጥ ቀጥተኛ የስራ ውል ስምምነት።",
    relationshipAr: "شراكة استقدام مباشرة تضمن معايير أمان عالية ورعاية مستمرة وشاملة.",
    turnaround: "20 - 30 Days",
    turnaroundAm: "20 - 30 ቀናት",
    turnaroundAr: "٢٠ - ٣٠ يوماً"
  },
  { 
    country: "Jordan", 
    city: "Amman", 
    img: destJordan,
    blurb: "Trusted employers across Jordan welcoming qualified caregivers and housemaids.",
    blurbAm: "ለሰለጠኑ ተንከባካቢዎች እና የቤት ሠራተኞች ሞቅ ያለ አቀባበል የሚያደርጉ ታማኝ ቀጣሪዎች በዮርዳኖስ።",
    blurbAr: "مجموعة واسعة من أصحاب العمل الموثوقين في الأردن ممن يرحبون بالخادمات ومقدمات الرعاية.",
    cities: ["Amman"],
    citiesAm: ["አማን"],
    citiesAr: ["عمان"],
    flightTime: "Approx. 3 hours, 45 minutes",
    flightTimeAm: "ወደ 3 ሰዓት ከ 45 ደቂቃ ያህል",
    flightTimeAr: "حوالي ٣ ساعات و ٤٥ دقيقة",
    relationship: "Close ties with Jordanian recruitment boards supporting robust worker welfare programs.",
    relationshipAm: "የሰራተኞቻችንን ደህንነት ለመጠበቅ ከዮርዳኖስ የቅጥር ማህበራት ጋር የተመሰረተ የቅርብ ትብብር።",
    relationshipAr: "شراكة متميزة مع الجمعيات والجهات الرسمية بالأردن لدعم حقوق ورعاية الكوادر الإثيوبية.",
    turnaround: "15 - 28 Days",
    turnaroundAm: "15 - 28 ቀናት",
    turnaroundAr: "١٥ - ٢٨ يوماً"
  }
];

const services = [
  ["Housemaids", "Trained for full household upkeep and family routines."],
  ["Cleaners", "Detail-oriented staff for residential and small-office cleaning."],
  ["Cooks", "Familiar with Ethiopian, Middle Eastern, and continental cuisine."],
  ["Nannies", "Patient, caring childminders with childcare experience."],
  ["Caregivers", "Compassionate elderly and special-needs support staff."],
] as const;

interface SlideshowImageProps {
  local: string;
  fallback?: string;
  alt: string;
  className?: string;
  onImageError?: () => void;
}

function SlideshowImage({
  local,
  fallback,
  alt,
  className,
  onImageError,
}: SlideshowImageProps) {
  const [imgSrc, setImgSrc] = useState(local);

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={() => {
        if (fallback && imgSrc !== fallback) {
          setImgSrc(fallback);
        } else if (onImageError) {
          onImageError();
        }
      }}
      referrerPolicy="no-referrer"
      className={className}
      loading="lazy"
    />
  );
}

interface FadingSlideshowProps {
  images: { local: string; fallback?: string }[];
  alt: string;
  className?: string;
  interval?: number;
}

function FadingSlideshow({
  images,
  alt,
  className = "w-full h-full object-cover",
  interval = 4000,
}: FadingSlideshowProps) {
  const [index, setIndex] = useState(0);
  const [sources, setSources] = useState<string[]>(() => images.map((img) => img.local));

  useEffect(() => {
    setSources(images.map((img) => img.local));
  }, [images]);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  const handleImageError = (errIdx: number) => {
    const fallback = images[errIdx]?.fallback;
    if (fallback && sources[errIdx] !== fallback) {
      setSources((prev) => {
        const next = [...prev];
        next[errIdx] = fallback;
        return next;
      });
    }
  };

  const currentSrc = sources[index] || images[index]?.local;

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`${index}-${currentSrc}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={currentSrc}
            alt={`${alt} - Slide ${index + 1}`}
            className={className}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => handleImageError(index)}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Home({ language, onNavigate }: HomeProps) {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);
  const t = translations[language];

  // Images with referrerPolicy constraint
  const about1Url = about1_1;
  const about2Url = about2_1;
  const ourValuesUrl = ourValues;
  const contactPortraitUrl = contactPortrait;

  const testimonials = [
    { role: t.role1, text: t.testimonial1 },
    { role: t.role2, text: t.testimonial2 },
    { role: t.role3, text: t.testimonial3 },
    { role: t.role4, text: t.testimonial4 },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="space-y-0">
      {/* Hero */}
      <section className="relative min-h-[620px] lg:min-h-[700px] flex items-center justify-center overflow-hidden px-6 py-24 md:py-32 lg:px-12 bg-brand-navy">
        {/* Background Image with Navy Blue Tint Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2400&q=85"
            alt="Metropolitan city lights at night"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = destSaudi;
            }}
            className="h-full w-full object-cover object-center filter brightness-90 contrast-105"
            loading="eager"
            referrerPolicy="no-referrer"
          />
          {/* Deep Navy Blue Tint Overlay Layers (50% more transparent) */}
          <div className="absolute inset-0 bg-[#0A1424]/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1523]/40 via-[#0E1A2C]/45 to-[#09111D]/50" />
        </div>

        {/* Decorative Architectural Corner Accents */}
        <div className="pointer-events-none absolute inset-4 sm:inset-6 md:inset-8 z-10">
          <span className="absolute top-0 left-0 h-6 w-6 sm:h-8 sm:w-8 border-t border-l border-brand-gold/40" />
          <span className="absolute top-0 right-0 h-6 w-6 sm:h-8 sm:w-8 border-t border-r border-brand-gold/40" />
          <span className="absolute bottom-0 left-0 h-6 w-6 sm:h-8 sm:w-8 border-b border-l border-brand-gold/40" />
          <span className="absolute bottom-0 right-0 h-6 w-6 sm:h-8 sm:w-8 border-b border-r border-brand-gold/40" />
        </div>

        {/* Centered Content */}
        <div className="relative z-20 mx-auto max-w-4xl text-center flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center space-y-6 sm:space-y-8"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/35 bg-brand-navy/65 px-4 sm:px-5 py-1.5 backdrop-blur-md text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] text-brand-gold/90 shadow-sm">
              <Award className="size-3.5 shrink-0 text-brand-gold" />
              <span>{t.heroBadge || "Ministry License Approved & Certified"}</span>
            </div>
            
            {/* Title */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-white max-w-3xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
              {t.heroTitle}
            </h1>
            
            {/* Subhead & Paragraph */}
            <div className="max-w-2xl space-y-3">
              <p className="font-serif italic font-semibold text-brand-gold text-base sm:text-lg md:text-xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                {t.heroSub}
              </p>
              <p className="font-sans text-sm sm:text-base md:text-lg leading-relaxed text-brand-cream/90 font-normal drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
                {t.heroText}
              </p>
            </div>
            
            {/* Centered Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  onNavigate("partner");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-gold px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-navy shadow-md transition-all hover:bg-[#d4b06d] active:scale-95 cursor-pointer"
              >
                <span>{t.partnerBtn}</span>
                <ArrowRight className="size-3.5" />
              </button>
              <button
                onClick={() => {
                  onNavigate("apply");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-[#b89555] sm:bg-brand-gold/90 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-navy shadow-md transition-all hover:bg-brand-gold active:scale-95 cursor-pointer"
              >
                {t.applyBtn}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Placements strip */}
      <section className="border-y border-brand-border bg-card/30 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <p className="mb-8 text-center text-[10px] font-bold uppercase tracking-[0.4em] text-brand-navy/40">
            {t.stripLabel}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-24">
            {["Saudi Arabia", "Kuwait", "Jordan"].map((b, i) => (
              <div key={b} className="flex items-center gap-3 font-display text-xl font-light tracking-wide text-brand-navy/80">
                <span className="text-sm font-semibold text-brand-gold">0{i+1}.</span>
                <span>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-24 px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between border-b border-brand-border pb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-gold">
                LEGALLY LICENSED RECRUITMENT
              </span>
              <h2 className="mt-2 text-4xl lg:text-5xl font-display">{t.aboutTitle}</h2>
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold/80 block">
              {t.aboutSub}
            </span>
          </div>

          <div className="grid items-start gap-12 lg:gap-16 lg:grid-cols-2">
            <div className="flex flex-col gap-10 lg:gap-12">
              <div className="space-y-6 text-lg leading-relaxed text-brand-navy/75">
                <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:text-brand-gold">
                  {t.aboutP1}
                </p>
                <p>{t.aboutP2}</p>
              </div>
              <div className="relative overflow-hidden aspect-[960/1280] w-full group">
                <FadingSlideshow
                  images={[
                    { local: about2_1, fallback: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=960&q=80" },
                    { local: about2_2, fallback: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=960&q=80" },
                    { local: about2_3, fallback: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=960&q=80" },
                    { local: about2_4, fallback: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=960&q=80" }
                  ]}
                  alt="Care and attention to household detail and placement guidance"
                  className="aspect-[960/1280] w-full object-cover transition-transform duration-700 group-hover:scale-102"
                />
              </div>
            </div>
            <div className="flex flex-col gap-10 lg:gap-12">
              <div className="relative overflow-hidden aspect-[905/700] w-full group">
                <FadingSlideshow
                  images={[
                    { local: about1_1, fallback: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=905&q=80" },
                    { local: about1_2, fallback: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=905&q=80" },
                    { local: about1_3, fallback: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=905&q=80" },
                    { local: about1_4, fallback: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=905&q=80" }
                  ]}
                  alt="TK Agency professional placements candidate checking documentation"
                  className="aspect-[905/700] w-full object-cover transition-transform duration-700 group-hover:scale-102"
                />
              </div>
              
              <ul className="divide-y divide-brand-border border-y border-brand-border">
                {services.map(([tKey]) => {
                  let title = "";
                  let desc = "";
                  if (tKey === "Housemaids") { title = t.serviceHousemaids; desc = t.serviceHousemaidsDesc; }
                  else if (tKey === "Cleaners") { title = t.serviceCleaners; desc = t.serviceCleanersDesc; }
                  else if (tKey === "Cooks") { title = t.serviceCooks; desc = t.serviceCooksDesc; }
                  else if (tKey === "Nannies") { title = t.serviceNannies; desc = t.serviceNanniesDesc; }
                  else if (tKey === "Caregivers") { title = t.serviceCaregivers; desc = t.serviceCaregiversDesc; }
                  else { title = tKey; desc = ""; }
                  
                  return (
                    <li key={tKey} className="group flex items-center justify-between gap-6 py-5 hover:bg-card/20 px-3 transition-colors">
                      <div>
                        <h3 className="text-xl font-display tracking-tight text-brand-navy transition-all group-hover:text-brand-navy/80">{title}</h3>
                        <p className="mt-1 text-sm text-brand-navy/60">{desc}</p>
                      </div>
                      <span className="text-brand-gold translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">→</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values + Vision (dark band) */}
      <section id="values" className="scroll-mt-24 bg-brand-navy px-6 py-24 text-brand-cream lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <div className="lg:sticky lg:top-28 space-y-10">
              <div className="overflow-hidden aspect-[4/3] w-full relative">
                <SlideshowImage
                  local={ourValues}
                  fallback="https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80"
                  alt="Candidate interviews and secure processing at TK Employment Agency"
                  className="aspect-[4/3] w-full object-cover transition-all duration-700 hover:scale-[1.01]"
                />
              </div>
              <div className="border-l-2 border-brand-gold pl-6 space-y-3">
                <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">
                  {t.visionTitle}
                </span>
                <p className="text-lg leading-relaxed text-brand-cream/80">
                  {t.visionText}
                </p>
              </div>
            </div>
            
            <div className="lg:pl-12">
              <h2 className="mb-12 text-4xl lg:text-6xl leading-tight font-display text-brand-cream">
                {t.valuesTitle}{" "}
                <span className="text-brand-gold italic block md:inline font-serif">{t.valuesTitleSpan}</span>
              </h2>
              <div className="space-y-10">
                {values.map((p) => {
                  // Determine title and body based on language
                  let displayTitle = p.title;
                  let displayBody = p.body;
                  if (language === "am") {
                    displayTitle = p.titleAm;
                    displayBody = p.bodyAm;
                  } else if (language === "ar") {
                    displayTitle = p.titleAr;
                    displayBody = p.bodyAr;
                  }
                  return (
                    <div key={p.n} className="flex gap-6 border-b border-brand-border/10 pb-8 last:border-b-0">
                      <span className="font-display text-4xl font-extralight text-brand-gold/30">{p.n}</span>
                      <div className="space-y-1.5">
                        <h4 className="font-sans text-lg font-medium text-brand-cream">{displayTitle}</h4>
                        <p className="text-base leading-relaxed text-brand-cream/60">{displayBody}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-card/15 px-6 py-24 lg:px-12 border-b border-brand-border">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 border-b border-brand-border pb-8 text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">
              CLIENT & WORKER SATISFACTION
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl">{t.testimonialsTitle}</h2>
            <p className="mt-4 text-base sm:text-lg text-brand-navy/70">
              {t.testimonialsSub}
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden min-h-[250px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <div className="border border-brand-border p-8 md:p-12 bg-white shadow-md relative">
                    <span className="absolute top-4 right-6 font-serif text-6xl text-brand-gold/15 select-none font-bold">“</span>
                    <p className="text-lg md:text-xl text-brand-navy/85 leading-relaxed mb-8 italic">
                      “{testimonials[testimonialIndex].text}”
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-brand-border/50 pt-6">
                      <div>
                        <p className="text-xs md:text-sm text-brand-navy/55">{testimonials[testimonialIndex].role}</p>
                      </div>
                      <div className="inline-flex self-start sm:self-center items-center gap-1.5 rounded-full bg-brand-gold/10 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-gold border border-brand-gold/20">
                        <CheckCircle className="size-3.5" />
                        <span>{t.verified}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="mt-8 flex justify-center gap-2.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === testimonialIndex ? "bg-brand-navy w-8" : "bg-brand-border hover:bg-brand-gold"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section id="destinations" className="scroll-mt-24 px-6 py-24 lg:px-12 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 grid gap-8 border-b border-brand-border pb-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">
                OFFICIAL WORK DESTINATIONS
              </span>
              <h2 className="mt-2 text-4xl lg:text-5xl font-display">{t.destTitle}</h2>
            </div>
            <p className="text-lg leading-relaxed text-brand-navy/70 lg:col-span-7">
              {t.destText}
            </p>
          </div>

          <div className={`grid gap-px bg-brand-border border border-brand-border transition-all duration-700 ${
            expandedCountry ? "lg:grid-cols-4" : "lg:grid-cols-3"
          }`}>
            {destinations.map((d) => {
              // Extract translation blurb
              let displayBlurb = d.blurb;
              if (language === "am") displayBlurb = d.blurbAm;
              else if (language === "ar") displayBlurb = d.blurbAr;
              
              const isExpanded = expandedCountry === d.country;

              return (
                <motion.article 
                  layout
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  key={d.country} 
                  className={`group bg-brand-cream p-1 flex flex-col ${
                    isExpanded ? "lg:col-span-2 lg:flex-row" : "lg:col-span-1"
                  }`}
                >
                  <motion.div 
                    layout
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className={`overflow-hidden relative cursor-pointer shrink-0 ${
                      isExpanded ? "lg:w-[45%] h-full" : "w-full"
                    }`}
                    onClick={() => setExpandedCountry(isExpanded ? null : d.country)}
                  >
                    <motion.img
                      layout
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      src={d.img}
                      alt={`${d.country} metropolitan skyline`}
                      width={768}
                      height={1024}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className={`w-full object-cover transition-transform duration-700 ${
                        isExpanded ? "aspect-auto h-full min-h-[350px] lg:min-h-[480px]" : "aspect-[4/5]"
                      } filter grayscale group-hover:grayscale-0 group-hover:scale-102`}
                    />
                    <div className="absolute top-4 left-4 bg-brand-navy/90 text-brand-cream border border-brand-gold/30 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider select-none">
                      {t.activePlacements}
                    </div>
                  </motion.div>

                  <motion.div 
                    layout
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="p-8 flex flex-col justify-between flex-1"
                  >
                    <div className="cursor-pointer" onClick={() => setExpandedCountry(isExpanded ? null : d.country)}>
                      <span className="mb-3 block text-[10px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                        LICENSED PIPELINE
                      </span>
                      <h3 className="mb-2 text-2xl font-display group-hover:text-brand-gold transition-colors">{d.country}</h3>
                      <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-brand-navy/40">
                        {d.city}
                      </p>
                      <p className="text-sm leading-relaxed text-brand-navy/65">{displayBlurb}</p>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -15 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="mt-6 pt-6 border-t border-brand-border/40 space-y-5 text-xs overflow-hidden"
                          >
                            <div className="space-y-1.5">
                              <span className="block font-sans text-[9px] font-bold uppercase tracking-wider text-brand-navy/40">
                                {t.citiesLabel}
                              </span>
                              <div className="flex flex-wrap gap-1.5 pt-0.5">
                                {(language === "am" ? d.citiesAm : language === "ar" ? d.citiesAr : d.cities).map((city) => (
                                  <span key={city} className="bg-white/70 border border-brand-border px-2 py-0.5 text-[10px] font-medium text-brand-navy/75 rounded animate-fade-in">
                                    {city}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <span className="block font-sans text-[9px] font-bold uppercase tracking-wider text-brand-navy/40">
                                  {t.flightDurationLabel}
                                </span>
                                <p className="font-semibold text-brand-navy/85">
                                  {language === "am" ? d.flightTimeAm : language === "ar" ? d.flightTimeAr : d.flightTime}
                                </p>
                              </div>
                              <div className="space-y-1">
                                <span className="block font-sans text-[9px] font-bold uppercase tracking-wider text-brand-navy/40">
                                  {t.turnaroundLabel}
                                </span>
                                <p className="font-semibold text-brand-navy/85">
                                  {language === "am" ? d.turnaroundAm : language === "ar" ? d.turnaroundAr : d.turnaround}
                                </p>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <span className="block font-sans text-[9px] font-bold uppercase tracking-wider text-brand-navy/40">
                                {t.relationshipLabel}
                              </span>
                              <p className="leading-relaxed text-brand-navy/70">
                                {language === "am" ? d.relationshipAm : language === "ar" ? d.relationshipAr : d.relationship}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Location */}
      <section id="location" className="scroll-mt-24 border-t border-brand-border px-6 py-24 lg:px-12 bg-brand-cream">
        <div className="mx-auto max-w-7xl font-sans">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
                {t.locationLabel}
              </span>
              <h2 className="text-4xl leading-tight lg:text-5xl font-display text-brand-navy">{t.locationTitle}</h2>
              <address className="not-italic text-lg leading-relaxed text-brand-navy/70 space-y-1">
                {t.locationAddress.split("\n").map((line: string, i: number) => (
                  <p key={i}>{line}</p>
                ))}
              </address>
              <div className="pt-4">
                <a
                  href="https://maps.app.goo.gl/b2yQFi5Fn9NRPD616"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex border-2 border-brand-navy px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-navy transition-all hover:bg-brand-navy hover:text-brand-cream active:scale-95"
                >
                  {t.directionsBtn}
                </a>
              </div>
            </div>
            
            <div className="lg:col-span-7">
              <div className="overflow-hidden">
                <iframe
                  title="TK Private Employment Agency office location in Addis Ababa Pawe Building"
                  src="https://maps.google.com/maps?q=Pawe+Building+Enkulal+Fabrika+Addis+Ababa&output=embed"
                  className="aspect-[4/3] w-full border border-brand-border grayscale hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contacts Panel */}
      <section id="contact" className="scroll-mt-24 border-t border-brand-border bg-brand-navy px-6 py-24 text-brand-cream lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-b border-brand-cream/15 pb-10">
            <div>
              <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
                {t.contactLabel}
              </span>
              <h2 className="text-4xl leading-tight lg:text-6xl font-display text-brand-cream">
                {t.contactTitle}
              </h2>
            </div>
            <div className="hidden lg:block shrink-0">
              <img
                src={contactPortraitUrl}
                alt="TK Foreign Employment Agency office direct representative"
                loading="lazy"
                sizes="144px"
                referrerPolicy="no-referrer"
                className="size-36 rounded-full object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>
          </div>
          <div className="grid gap-8 sm:gap-12 lg:grid-cols-3">
            <a href="tel:+251911460406" className="group block border-t border-brand-cream/15 pt-6 transition-colors hover:border-brand-gold">
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">
                <Phone className="size-3 text-brand-gold" />
                <span>{t.contactPrimary}</span>
              </span>
              <p className="mt-4 font-display text-3xl group-hover:text-brand-gold hover:italic transition-all duration-300">+251 911 460 406</p>
            </a>
            <a href="tel:+251944100707" className="group block border-t border-brand-cream/15 pt-6 transition-colors hover:border-brand-gold">
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">
                <Phone className="size-3 text-brand-gold" />
                <span>{t.contactSecondary}</span>
              </span>
              <p className="mt-4 font-display text-3xl group-hover:text-brand-gold hover:italic transition-all duration-300">+251 944 100 707</p>
            </a>
            <a href="mailto:tkagent2@gmail.com" className="group block border-t border-brand-cream/15 pt-6 transition-colors hover:border-brand-gold">
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold">
                <Mail className="size-3 text-brand-gold" />
                <span>{t.contactEmail}</span>
              </span>
              <p className="mt-4 break-all font-display text-3xl group-hover:text-brand-gold hover:italic transition-all duration-300">tkagent2@gmail.com</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
