import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const SEND_CONTACT_URL = "https://functions.poehali.dev/5609270c-9c62-459e-8954-5d2450edd2e5";

const WITCH_IMAGE = "https://cdn.poehali.dev/projects/1db90b4f-4da9-46db-b7a8-b9e52f254c29/bucket/c95c476b-dcef-4726-8772-2358ef8d7eba.jpg";
const RITUAL_IMAGE = "https://cdn.poehali.dev/projects/1db90b4f-4da9-46db-b7a8-b9e52f254c29/files/338504ab-d023-4c84-b996-81aa6ad736b5.jpg";
const POTIONS_IMAGE = "https://cdn.poehali.dev/projects/1db90b4f-4da9-46db-b7a8-b9e52f254c29/files/9c213743-93e8-4542-a060-a526d45661e0.jpg";

const NAV_ITEMS = [
  { label: "О ведьме", href: "#about" },
  { label: "Услуги", href: "#services" },
  { label: "Галерея", href: "#gallery" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Связь", href: "#contact" },
];

const SERVICES = [
  {
    icon: "💞",
    title: "Любовная магия / Привязка",
    desc: "Возвращение любимого человека, привлечение новой любви, укрепление отношений, снятие любовных зависимостей.",
    price: "от 17 000 ₽",
  },
  {
    icon: "🌿",
    title: "Магия процветания",
    desc: "Усиление финансового потока, привлечение удачи в бизнесе, устранение денежных блоков на пути к достатку.",
    price: "от 9 000 ₽",
  },
  {
    icon: "🛡️",
    title: "Защита и очищение",
    desc: "Обряды защиты от негатива, порчи и сглаза. Энергетическая чистка пространства и тела.",
    price: "от 50 000 ₽",
  },
  {
    icon: "🔮",
    title: "Работа с кармой",
    desc: "Исцеление родовых проблем, гармонизация судьбы, раскрытие внутреннего потенциала.",
    price: "от 15 000 ₽",
  },
  {
    icon: "🌙",
    title: "Ритуалы на желание",
    desc: "Индивидуальная работа с вашей энергией для достижения конкретных целей и исполнения желаний.",
    price: "от 12 000 ₽",
  },
  {
    icon: "🃏",
    title: "Расклад / Консультация",
    desc: "Глубокий разбор вашей ситуации, диагностика энергетического поля и расклад карт судьбы.",
    price: "от 6 000 ₽",
  },
  {
    icon: "🕯️",
    title: "Спасение / Экстренная помощь",
    desc: "Работа в критических ситуациях — снятие сильного негатива, экстренное вмешательство в судьбу. Бесплатно не работаю — у каждого спасения есть своя цена.",
    price: "от 69 000 ₽",
  },
];

const GALLERY = [
  { img: RITUAL_IMAGE, title: "Ритуал новолуния", tag: "Ритуал" },
  { img: POTIONS_IMAGE, title: "Алхимическая лаборатория", tag: "Зелья" },
  { img: WITCH_IMAGE, title: "Мастер тёмных искусств", tag: "Портрет" },
];

const REVIEWS = [
  {
    name: "Анастасия В.",
    city: "Москва",
    text: "Морана помогла мне вернуть утраченную любовь. Через две недели после ритуала он сам написал первым. Не верила в это, пока не произошло.",
    stars: 5,
  },
  {
    name: "Татьяна М.",
    city: "Санкт-Петербург",
    text: "Обратилась по поводу неудач в карьере. Диагностика выявила порчу. После снятия — всё встало на своё место. Спасибо за серьёзный подход.",
    stars: 5,
  },
  {
    name: "Виктория К.",
    city: "Екатеринбург",
    text: "Амулет защиты сработал — чувствую его силу. Полгода ношу, несколько тревожных ситуаций разрешились сами собой.",
    stars: 5,
  },
];

function Candle({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="w-0.5 h-3 relative">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-2 rounded-full animate-flicker"
          style={{
            background: "radial-gradient(ellipse, #ffd97d 0%, #ff9a3c 40%, #ff4500 70%, transparent 100%)",
            filter: "blur(1px)",
          }}
        />
      </div>
      <div
        className="w-2 rounded-t-sm"
        style={{
          height: "40px",
          background: "linear-gradient(to bottom, #2a2218, #1a150e)",
          borderTop: "1px solid #c9a84c22",
        }}
      />
    </div>
  );
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: "var(--witch-gold)" }}>✦</span>
      ))}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [formName, setFormName] = useState("");
  const [formContact, setFormContact] = useState("");
  const [formQuestion, setFormQuestion] = useState("");
  const [formSending, setFormSending] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = async () => {
    if (!formName.trim() || !formContact.trim()) return;
    setFormSending(true);
    setFormStatus("idle");
    try {
      const res = await fetch(SEND_CONTACT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formName, contact: formContact, question: formQuestion }),
      });
      if (res.ok) {
        setFormStatus("success");
        setFormName("");
        setFormContact("");
        setFormQuestion("");
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    } finally {
      setFormSending(false);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--witch-black)", color: "var(--witch-parchment)", fontFamily: "'Cormorant Garamond', serif" }}
    >
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: "linear-gradient(to bottom, rgba(10,8,5,0.98), transparent)",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
        }}
      >
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.85rem", letterSpacing: "0.35em", color: "var(--witch-gold)" }}>
          МОРАНА
        </div>
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              style={{ fontFamily: "'Cinzel', serif", fontSize: "0.7rem", letterSpacing: "0.2em", color: "var(--witch-smoke)", background: "none", border: "none", cursor: "pointer", transition: "color 0.3s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--witch-gold)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--witch-smoke)")}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          className="md:hidden"
          style={{ color: "var(--witch-gold)", background: "none", border: "none", cursor: "pointer" }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "X" : "Menu"} size={20} />
        </button>
      </nav>

      {menuOpen && (
        <div
          className="fixed top-14 left-0 right-0 z-40 py-6 flex flex-col items-center gap-5"
          style={{ background: "rgba(10,8,5,0.98)", borderBottom: "1px solid rgba(201,168,76,0.15)" }}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              style={{ fontFamily: "'Cinzel', serif", fontSize: "0.85rem", letterSpacing: "0.2em", color: "var(--witch-parchment)", background: "none", border: "none", cursor: "pointer" }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(139,26,26,0.12) 0%, transparent 70%), radial-gradient(ellipse 100% 100% at 50% 0%, rgba(201,168,76,0.04) 0%, transparent 50%), var(--witch-black)",
        }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${WITCH_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
            filter: "grayscale(60%) contrast(1.2)",
          }}
        />

        <div className="absolute top-24 left-8 text-xs tracking-widest opacity-20" style={{ fontFamily: "'Cinzel', serif", color: "var(--witch-gold)" }}>
          ᚹ ᛟ ᛞ ᚢ
        </div>
        <div className="absolute top-24 right-8 text-xs tracking-widest opacity-20" style={{ fontFamily: "'Cinzel', serif", color: "var(--witch-gold)" }}>
          ᚾ ᚨ ᚱ ᚠ
        </div>

        <div className="absolute bottom-32 left-16 opacity-60"><Candle /></div>
        <div className="absolute bottom-28 left-24 opacity-40"><Candle /></div>
        <div className="absolute bottom-32 right-16 opacity-60"><Candle /></div>
        <div className="absolute bottom-28 right-24 opacity-40"><Candle /></div>

        <div
          className="relative z-10 text-center px-6"
          style={{ transition: "opacity 1s, transform 1s", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
        >
          <div className="runic-divider mb-8 max-w-xs mx-auto">
            <span>✦ МИР ПЕРЕМЕН ✦</span>
          </div>

          <h1
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(2.2rem, 9vw, 7rem)",
              fontWeight: 900,
              color: "var(--witch-parchment)",
              textShadow: "0 0 60px rgba(201,168,76,0.3), 0 0 120px rgba(139,26,26,0.2)",
              letterSpacing: "0.08em",
              lineHeight: 1,
              marginBottom: "1rem",
            }}
          >
            ВЕДЬМА МОРАНА
          </h1>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(0.9rem, 2.5vw, 1.3rem)",
              color: "var(--witch-gold)",
              letterSpacing: "0.35em",
              marginBottom: "1.25rem",
            }}
          >
            Посвящённая ведьма · Эзотерика · Трансформация судьбы
          </p>

          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "var(--witch-smoke)",
              maxWidth: "580px",
              margin: "0 auto 3rem",
              lineHeight: 1.9,
            }}
          >
            Добро пожаловать в пространство трансформации. Здесь, среди завес тайны
            и древней мудрости, рождаются изменения, способные перевернуть вашу жизнь.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => scrollTo("#contact")}
              style={{
                padding: "0.75rem 2.5rem",
                fontFamily: "'Cinzel', serif",
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                background: "var(--witch-gold)",
                color: "var(--witch-black)",
                border: "1px solid var(--witch-gold)",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = "var(--witch-gold)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "var(--witch-gold)";
                (e.currentTarget as HTMLElement).style.color = "var(--witch-black)";
              }}
            >
              ЗАПРОСИТЬ КОНСУЛЬТАЦИЮ
            </button>
            <button
              onClick={() => scrollTo("#services")}
              style={{
                padding: "0.75rem 2.5rem",
                fontFamily: "'Cinzel', serif",
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                background: "transparent",
                color: "var(--witch-parchment)",
                border: "1px solid rgba(201,168,76,0.3)",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.8)";
                (e.currentTarget as HTMLElement).style.color = "var(--witch-gold)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.3)";
                (e.currentTarget as HTMLElement).style.color = "var(--witch-parchment)";
              }}
            >
              УСЛУГИ
            </button>
          </div>
        </div>

        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float"
          style={{ color: "var(--witch-gold)", opacity: 0.4 }}
        >
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.65rem", letterSpacing: "0.3em" }}>ВНИЗ</span>
          <Icon name="ChevronDown" size={16} />
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="py-28 px-6 relative overflow-hidden"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 0% 50%, rgba(139,26,26,0.08) 0%, transparent 60%), var(--witch-charcoal)",
        }}
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative overflow-hidden" style={{ border: "1px solid rgba(201,168,76,0.2)" }}>
              <img
                src={WITCH_IMAGE}
                alt="Морана"
                className="w-full object-cover"
                style={{ height: "500px", filter: "grayscale(30%) contrast(1.1) sepia(20%)", objectFit: "cover" }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,8,5,0.7) 0%, transparent 50%)" }} />
            </div>
            <div className="absolute -top-2 -left-2 w-8 h-8" style={{ borderTop: "2px solid var(--witch-gold)", borderLeft: "2px solid var(--witch-gold)" }} />
            <div className="absolute -top-2 -right-2 w-8 h-8" style={{ borderTop: "2px solid var(--witch-gold)", borderRight: "2px solid var(--witch-gold)" }} />
            <div className="absolute -bottom-2 -left-2 w-8 h-8" style={{ borderBottom: "2px solid var(--witch-gold)", borderLeft: "2px solid var(--witch-gold)" }} />
            <div className="absolute -bottom-2 -right-2 w-8 h-8" style={{ borderBottom: "2px solid var(--witch-gold)", borderRight: "2px solid var(--witch-gold)" }} />
          </div>

          <div>
            <div className="runic-divider mb-6 max-w-xs"><span>О ВЕДЬМЕ</span></div>
            <h2
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 700,
                color: "var(--witch-parchment)",
                lineHeight: 1.2,
                marginBottom: "1.5rem",
              }}
            >
              Загляните в мир<br />перемен с Ведьмой Ольгой
            </h2>
            <div style={{ fontSize: "1.1rem", color: "var(--witch-smoke)", lineHeight: 1.9 }} className="space-y-4">
              <p>Вы ищете решение там, где традиционные методы оказались бессильны? Возможно, пришло время обратиться к силам, выходящим за рамки привычного.</p>
              <p>
                Я работаю с{" "}
                <span style={{ color: "var(--witch-parchment)" }}>божеством тёмного мира</span> —
                это даёт моей практике особую силу и глубину, недоступную большинству.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              {[
                { title: "Опыт и знания", desc: "Годы изучения эзотерических практик, глубокое понимание человеческой души." },
                { title: "Индивидуальный подход", desc: "Каждая ситуация уникальна. Работаю на внимании к деталям вашей жизни." },
                { title: "Эффективность и честность", desc: "Я работаю дорого, потому что моя магия сильна и действенна." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <span style={{ color: "var(--witch-gold)", marginTop: "4px", flexShrink: 0 }}>✦</span>
                  <div>
                    <span style={{ fontFamily: "'Cinzel', serif", fontSize: "0.78rem", letterSpacing: "0.05em", color: "var(--witch-parchment)" }}>{item.title}: </span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", color: "var(--witch-smoke)", lineHeight: 1.6 }}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6 mt-10">
              {[
                { num: "10+", label: "Лет практики" },
                { num: "500+", label: "Клиентов" },
                { num: "100%", label: "Конфиденциально" },
              ].map(({ num, label }) => (
                <div key={label} className="text-center" style={{ borderTop: "1px solid rgba(201,168,76,0.2)", paddingTop: "1rem" }}>
                  <div style={{ fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: "1.5rem", color: "var(--witch-gold)" }}>{num}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.85rem", color: "var(--witch-smoke)", marginTop: "0.25rem" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-28 px-6" style={{ backgroundColor: "var(--witch-black)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="runic-divider mb-6 max-w-xs mx-auto"><span>ТЁМНЫЕ ПРАКТИКИ</span></div>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: "var(--witch-parchment)" }}>Услуги</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="p-7 cursor-default"
                style={{ background: "var(--witch-charcoal)", border: "1px solid rgba(201,168,76,0.12)", transition: "all 0.4s" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.4)";
                  (e.currentTarget as HTMLElement).style.background = "var(--witch-dark)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.12)";
                  (e.currentTarget as HTMLElement).style.background = "var(--witch-charcoal)";
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Cinzel', serif", fontWeight: 600, fontSize: "0.9rem", letterSpacing: "0.05em", color: "var(--witch-parchment)", marginBottom: "0.75rem" }}>{s.title}</h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "var(--witch-smoke)", lineHeight: 1.7, marginBottom: "1.25rem" }}>{s.desc}</p>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.85rem", fontWeight: 600, color: "var(--witch-gold)" }}>{s.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section
        id="gallery"
        className="py-28 px-6"
        style={{ background: "radial-gradient(ellipse 60% 80% at 100% 50%, rgba(139,26,26,0.1) 0%, transparent 60%), var(--witch-charcoal)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="runic-divider mb-6 max-w-xs mx-auto"><span>ХРОНИКИ ТЬМЫ</span></div>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: "var(--witch-parchment)" }}>Галерея</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GALLERY.map((item, i) => (
              <div
                key={i}
                className="relative overflow-hidden cursor-pointer"
                style={{ border: "1px solid rgba(201,168,76,0.12)", aspectRatio: "3/4" }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  style={{ filter: "grayscale(20%) sepia(10%) contrast(1.1)", transition: "transform 0.7s, filter 0.5s" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
                    (e.currentTarget as HTMLElement).style.filter = "grayscale(0%) sepia(5%) contrast(1.1)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                    (e.currentTarget as HTMLElement).style.filter = "grayscale(20%) sepia(10%) contrast(1.1)";
                  }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,8,5,0.9) 0%, rgba(10,8,5,0.2) 50%, transparent 100%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.65rem", letterSpacing: "0.3em", color: "var(--witch-gold)", marginBottom: "0.25rem" }}>{item.tag}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "var(--witch-parchment)" }}>{item.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-28 px-6" style={{ backgroundColor: "var(--witch-black)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="runic-divider mb-6 max-w-xs mx-auto"><span>СВИДЕТЕЛЬСТВА</span></div>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: "var(--witch-parchment)" }}>Отзывы</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="p-7" style={{ background: "var(--witch-charcoal)", border: "1px solid rgba(201,168,76,0.12)" }}>
                <StarRating count={r.stars} />
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1rem", color: "var(--witch-smoke)", lineHeight: 1.8, margin: "1.25rem 0" }}>
                  «{r.text}»
                </p>
                <div style={{ borderTop: "1px solid rgba(201,168,76,0.15)", paddingTop: "1rem" }}>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: "0.8rem", fontWeight: 600, color: "var(--witch-parchment)" }}>{r.name}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", color: "var(--witch-smoke)", marginTop: "0.2rem" }}>{r.city}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="py-28 px-6 relative overflow-hidden"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(139,26,26,0.15) 0%, transparent 70%), var(--witch-charcoal)" }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <div className="runic-divider mb-6 max-w-xs mx-auto"><span>СВЯЗЬ С ТЁМНОЙ</span></div>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: "var(--witch-parchment)", marginBottom: "1rem" }}>
            Обратиться к ведьме
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.15rem", color: "var(--witch-smoke)", marginBottom: "3rem" }}>
            Опишите вашу ситуацию. Я отвечаю в течение суток.
          </p>

          <form className="space-y-4 text-left" onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label style={{ fontFamily: "'Cinzel', serif", fontSize: "0.65rem", letterSpacing: "0.3em", color: "var(--witch-gold)", display: "block", marginBottom: "0.5rem" }}>ИМЯ</label>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  className="w-full outline-none transition-all duration-300"
                  style={{ padding: "0.75rem 1rem", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", background: "var(--witch-dark)", border: "1px solid rgba(201,168,76,0.2)", color: "var(--witch-parchment)" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.6)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)")}
                />
              </div>
              <div>
                <label style={{ fontFamily: "'Cinzel', serif", fontSize: "0.65rem", letterSpacing: "0.3em", color: "var(--witch-gold)", display: "block", marginBottom: "0.5rem" }}>ТЕЛЕФОН / EMAIL</label>
                <input
                  type="text"
                  placeholder="Как с вами связаться"
                  value={formContact}
                  onChange={e => setFormContact(e.target.value)}
                  className="w-full outline-none transition-all duration-300"
                  style={{ padding: "0.75rem 1rem", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", background: "var(--witch-dark)", border: "1px solid rgba(201,168,76,0.2)", color: "var(--witch-parchment)" }}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.6)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)")}
                />
              </div>
            </div>
            <div>
              <label style={{ fontFamily: "'Cinzel', serif", fontSize: "0.65rem", letterSpacing: "0.3em", color: "var(--witch-gold)", display: "block", marginBottom: "0.5rem" }}>ВАШ ВОПРОС</label>
              <textarea
                rows={5}
                placeholder="Опишите вашу ситуацию..."
                value={formQuestion}
                onChange={e => setFormQuestion(e.target.value)}
                className="w-full outline-none transition-all duration-300 resize-none"
                style={{ padding: "0.75rem 1rem", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", background: "var(--witch-dark)", border: "1px solid rgba(201,168,76,0.2)", color: "var(--witch-parchment)" }}
                onFocus={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.6)")}
                onBlur={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.2)")}
              />
            </div>

            {formStatus === "success" && (
              <div style={{ padding: "0.75rem 1rem", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.4)", color: "var(--witch-gold)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", textAlign: "center" }}>
                Ваше обращение отправлено. Отвечу в течение суток.
              </div>
            )}
            {formStatus === "error" && (
              <div style={{ padding: "0.75rem 1rem", background: "rgba(139,26,26,0.2)", border: "1px solid rgba(139,26,26,0.5)", color: "#e88", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", textAlign: "center" }}>
                Ошибка отправки. Попробуйте написать напрямую в Telegram.
              </div>
            )}

            <button
              type="submit"
              disabled={formSending || !formName.trim() || !formContact.trim()}
              className="w-full transition-all duration-300"
              style={{
                padding: "1rem",
                fontFamily: "'Cinzel', serif",
                fontSize: "0.75rem",
                letterSpacing: "0.25em",
                background: "var(--witch-gold)",
                color: "var(--witch-black)",
                border: "1px solid var(--witch-gold)",
                cursor: formSending ? "wait" : "pointer",
                opacity: (!formName.trim() || !formContact.trim()) ? 0.6 : 1,
              }}
              onMouseEnter={e => {
                if (!formSending) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "var(--witch-gold)";
                }
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "var(--witch-gold)";
                (e.currentTarget as HTMLElement).style.color = "var(--witch-black)";
              }}
            >
              {formSending ? "ОТПРАВЛЯЮ..." : "ОТПРАВИТЬ ОБРАЩЕНИЕ"}
            </button>
          </form>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-14"
            style={{ borderTop: "1px solid rgba(201,168,76,0.15)", paddingTop: "2rem" }}
          >
            {[
              { icon: "Phone", label: "+7 (925) 188-53-63" },
              { icon: "Mail", label: "olgazajceva332@gmail.com" },
              { icon: "MessageCircle", label: "Telegram: @Afelia6661" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2" style={{ color: "var(--witch-smoke)" }}>
                <Icon name={icon} size={14} />
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="py-10 px-6 text-center"
        style={{ background: "var(--witch-black)", borderTop: "1px solid rgba(201,168,76,0.1)" }}
      >
        <div style={{ fontFamily: "'Cinzel', serif", fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.4em", color: "var(--witch-gold)", marginBottom: "0.5rem" }}>
          МОРАНА
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "0.95rem", color: "var(--witch-smoke)" }}>
          Тёмные искусства · Ритуалы · Магические практики
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.8rem", marginTop: "1rem", opacity: 0.4, color: "var(--witch-smoke)" }}>
          © 2024 Морана. Все обряды совершаются в рамках традиционных практик.
        </div>
      </footer>
    </div>
  );
}