import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const NotFoundPage = () => {
  const flickerRef = useRef(null);

  useEffect(() => {
    // Randomised flicker timing so it never feels looped
    const randomiseFlicker = () => {
      const el = document.getElementById("nf-numeral");
      if (!el) return;
      const delay = 3000 + Math.random() * 6000;
      setTimeout(() => {
        el.style.opacity = "0.78";
        setTimeout(() => {
          el.style.opacity = "1";
          setTimeout(() => {
            el.style.opacity = "0.88";
            setTimeout(() => { el.style.opacity = "1"; randomiseFlicker(); }, 80);
          }, 60);
        }, 50);
      }, delay);
    };
    randomiseFlicker();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Special+Elite&family=VT323&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap');

        @keyframes nf-scanroll {
          from { background-position: 0 0; }
          to   { background-position: 0 100px; }
        }
        @keyframes nf-lineroll {
          from { top: -2px; }
          to   { top: 100vh; }
        }
        @keyframes nf-glowpulse {
          from { opacity: .7;  transform: translate(-50%,-55%) scale(1);    }
          to   { opacity: 1;   transform: translate(-50%,-55%) scale(1.09); }
        }
        @keyframes nf-numglow {
          from { filter: blur(22px); opacity: .8; }
          to   { filter: blur(34px); opacity: 1;  }
        }
        @keyframes nf-fadeup {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes nf-blink {
          0%,85%,100% { opacity: 1;    }
          90%          { opacity: .12; }
        }

        /* Shine sweep on primary button */
        .nf-btn-amber::before {
          content: '';
          position: absolute; inset: 0;
          width: 45%; height: 100%;
          background: linear-gradient(105deg, transparent 20%, rgba(255,240,150,.28) 50%, transparent 80%);
          transform: translateX(-120%);
          pointer-events: none;
        }
        .nf-btn-amber:hover::before {
          transform: translateX(200%);
          transition: transform .55s ease;
        }
        .nf-btn-amber:hover {
          background: #e09a10 !important;
          box-shadow: 0 0 38px rgba(220,160,20,.48), inset 0 1px 0 rgba(255,220,100,.4) !important;
          transform: translateY(-2px) !important;
        }
        .nf-btn-amber:active { transform: scale(.97) !important; }

        .nf-btn-ghost:hover {
          color: rgba(230,180,60,.92) !important;
          border-color: rgba(200,150,40,.52) !important;
          background: rgba(180,100,10,.09) !important;
          transform: translateY(-2px) !important;
        }
        .nf-btn-ghost:active { transform: scale(.97) !important; }
      `}</style>

      {/* ── Root ── */}
      <div style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        background: "#0e0900",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        fontFamily: "'Courier Prime', monospace",
      }}>

        {/* Base warm radial */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 90% 80% at 50% 50%, #1c1100 0%, #0e0900 100%)",
        }} />

        {/* Amber phosphor glow orb */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: 640, height: 420,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(255,155,15,.06) 0%, transparent 70%)",
          pointerEvents: "none",
          animation: "nf-glowpulse 4.5s ease-in-out infinite alternate",
        }} />

        {/* Film grain */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 4, opacity: .052,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }} />

        {/* CRT scanlines */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 5,
          background: "repeating-linear-gradient(0deg, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,.17) 2px, rgba(0,0,0,.17) 4px)",
          animation: "nf-scanroll 8s linear infinite",
        }} />

        {/* Rolling scan beam */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: 2,
          background: "rgba(255,190,60,.055)",
          pointerEvents: "none", zIndex: 6,
          animation: "nf-lineroll 6.5s linear infinite",
        }} />

        {/* Heavy vignette */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", zIndex: 3,
          background: "radial-gradient(ellipse 72% 68% at 50% 50%, transparent 35%, rgba(0,0,0,.9) 100%)",
        }} />

        {/* Hairline horizontal rules */}
        {[{ top: 66 }, { bottom: 52 }].map((pos, i) => (
          <div key={i} style={{
            position: "absolute", left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg, transparent, rgba(210,145,35,.16) 20%, rgba(210,145,35,.16) 80%, transparent)",
            pointerEvents: "none", zIndex: 7, ...pos,
          }} />
        ))}

        {/* Corner brackets */}
        {[
          { top: 18, left: 18,   borderTop: "1px solid #b87c18", borderLeft:  "1px solid #b87c18" },
          { top: 18, right: 18,  borderTop: "1px solid #b87c18", borderRight: "1px solid #b87c18" },
          { bottom: 18, left: 18,  borderBottom: "1px solid #b87c18", borderLeft:  "1px solid #b87c18" },
          { bottom: 18, right: 18, borderBottom: "1px solid #b87c18", borderRight: "1px solid #b87c18" },
        ].map((s, i) => (
          <div key={i} style={{ position: "absolute", width: 22, height: 22, opacity: .22, pointerEvents: "none", zIndex: 8, ...s }} />
        ))}

        {/* Side text watermarks */}
        {[
          { left: 16,  text: "SYSTEM · ERROR · OUTPUT", transform: "translateY(-50%)" },
          { right: 16, text: "TERMINAL · v1.0 · 1974",  transform: "translateY(-50%) rotate(180deg)" },
        ].map(({ text, ...pos }, i) => (
          <div key={i} style={{
            position: "absolute", top: "50%",
            fontFamily: "'VT323', monospace",
            fontSize: 12, letterSpacing: "0.2em",
            color: "rgba(180,110,20,.16)",
            pointerEvents: "none", zIndex: 8,
            writingMode: "vertical-rl",
            ...pos,
          }}>{text}</div>
        ))}

        {/* ── Main content ── */}
        <div style={{
          position: "relative", zIndex: 10,
          textAlign: "center",
          display: "flex", flexDirection: "column", alignItems: "center",
          padding: "40px 24px",
          animation: "nf-fadeup 1.4s cubic-bezier(.22,1,.36,1) both",
        }}>

          {/* Session label */}
          <div style={{
            fontFamily: "'Courier Prime', monospace",
            fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase",
            color: "rgba(210,150,40,.42)",
            marginBottom: 36,
            animation: "nf-fadeup 1.4s .1s both",
          }}>
            ■&nbsp;&nbsp;Terminal session &middot; Error output &middot; 1974
          </div>

          {/* 404 — VT323 phosphor */}
          <div style={{ position: "relative", lineHeight: 1, marginBottom: 6 }}>
            {/* Bloom glow */}
            <div style={{
              position: "absolute", inset: 0,
              fontFamily: "'VT323', monospace",
              fontSize: "clamp(160px,20vw,280px)",
              color: "rgba(255,180,40,.1)",
              filter: "blur(28px)",
              pointerEvents: "none", userSelect: "none",
              animation: "nf-numglow 3.5s ease-in-out infinite alternate",
            }}>404</div>

            {/* Foreground */}
            <div
              id="nf-numeral"
              style={{
                position: "relative",
                fontFamily: "'VT323', monospace",
                fontSize: "clamp(160px,20vw,280px)",
                color: "#e0921c",
                textShadow: [
                  "0 0 18px rgba(255,180,40,.55)",
                  "0 0 55px rgba(255,140,10,.28)",
                  "0 0 110px rgba(240,90,0,.12)",
                ].join(","),
                userSelect: "none",
                letterSpacing: "0.04em",
                transition: "opacity .05s linear",
              }}
            >404</div>
          </div>

          {/* Typewriter rule */}
          <div style={{
            width: "100%", height: 1.5,
            background: "linear-gradient(90deg, transparent, rgba(210,138,18,.48) 15%, rgba(255,180,40,.32) 50%, rgba(210,138,18,.48) 85%, transparent)",
            margin: "2px 0 32px",
            animation: "nf-fadeup 1.4s .25s both",
          }} />

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Special Elite', cursive",
            fontSize: "clamp(19px,2.5vw,30px)",
            color: "rgba(238,198,115,.88)",
            letterSpacing: "0.06em",
            lineHeight: 1.3,
            marginBottom: 18,
            textShadow: "0 0 28px rgba(255,175,40,.18)",
            animation: "nf-fadeup 1.4s .38s both",
          }}>
            Page not found, stranger.
          </h1>

          {/* Body copy */}
          <p style={{
            fontFamily: "'Courier Prime', monospace",
            fontSize: "clamp(10px,1.05vw,12px)",
            color: "rgba(195,148,55,.46)",
            letterSpacing: "0.14em",
            lineHeight: 2,
            maxWidth: 380,
            textTransform: "uppercase",
            animation: "nf-fadeup 1.4s .5s both",
          }}>
            The document you seek<br />
            has been lost to the archive.<br />
            Like dust on a forgotten shelf.
          </p>

          {/* Dash separator */}
          <div style={{
            fontFamily: "'VT323', monospace",
            fontSize: 18,
            color: "rgba(175,112,22,.28)",
            letterSpacing: "0.12em",
            margin: "22px 0",
            animation: "nf-fadeup 1.4s .58s both",
          }}>- - - - - - - - - - - - - - - - - -</div>

          {/* Buttons */}
          <div style={{
            display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center",
            animation: "nf-fadeup 1.4s .72s both",
          }}>
            {/* Primary — amber */}
            <Link
              to="/dashboard"
              className="nf-btn-amber"
              style={{
                display: "flex", alignItems: "center", gap: 10,
                fontFamily: "'Courier Prime', monospace",
                fontSize: 12, fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "#0e0900",
                background: "#c8870e",
                padding: "13px 30px",
                borderRadius: 0,
                border: "none",
                cursor: "pointer", textDecoration: "none",
                position: "relative", overflow: "hidden",
                transition: "all .35s cubic-bezier(.22,1,.36,1)",
                boxShadow: "0 0 22px rgba(200,135,14,.32), inset 0 1px 0 rgba(255,220,100,.28)",
              }}
            >
              &#9654;&nbsp; Return to base
            </Link>

            {/* Secondary — ghost */}
            <Link
              to="/"
              className="nf-btn-ghost"
              style={{
                display: "flex", alignItems: "center", gap: 10,
                fontFamily: "'Courier Prime', monospace",
                fontSize: 12, fontWeight: 400,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "rgba(198,138,40,.58)",
                background: "transparent",
                padding: "12px 26px",
                border: "1px solid rgba(178,118,28,.24)",
                borderRadius: 0,
                cursor: "pointer", textDecoration: "none",
                transition: "all .35s cubic-bezier(.22,1,.36,1)",
              }}
            >
              &#8592;&nbsp; Go back
            </Link>
          </div>
        </div>

        {/* ── Status bar ── */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 28px",
          borderTop: "1px solid rgba(178,118,28,.1)",
          pointerEvents: "none", zIndex: 9,
          animation: "nf-fadeup 2s 1.1s both",
        }}>
          {[
            { text: "ERR_404 · DOCUMENT_NOT_FOUND", dot: false },
            { text: "SYSTEM ONLINE", dot: true },
            { text: "MEM: 48K · OK", dot: false },
          ].map(({ text, dot }, i) => (
            <div key={i} style={{
              fontFamily: "'VT323', monospace",
              fontSize: 14, letterSpacing: "0.16em",
              color: "rgba(175,112,22,.28)",
              display: "flex", alignItems: "center", gap: 7,
            }}>
              {dot && (
                <span style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "#4ecf80",
                  boxShadow: "0 0 8px rgba(78,207,128,.6)",
                  display: "inline-block",
                  animation: "nf-blink 2.2s ease-in-out infinite",
                }} />
              )}
              {text}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;