import { assetPath as a } from "@/lib/assetPath";
import Fx from "./Fx";

// Header and footer from the v5 homepage, for pages outside it (the blog).
// The homepage keeps its own copy in HomeV5 because its links are in-page anchors.

const MSG = "https://m.me/ToyzoonaLaguna";
const FB_PAGE = "https://www.facebook.com/ToyzoonaLaguna";
const MAPS = "https://www.google.com/maps/dir/?api=1&destination=Toyzoona+Importer,+Gatcahalian+Subdivision,+Brgy.+Banay+2,+Cabuyao,+Laguna";
const EMAIL = "official.toyzoonaimporter@gmail.com";
const WA = "https://wa.me/639293781462";
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
const home = (hash: string) => `${a("/")}${hash}`;

const NAV = [
  { href: home("#shelves"), label: "Toy Shelves" },
  { href: home("#how"), label: "How to Buy" },
  { href: home("#auction"), label: "Auction" },
  { href: home("#videos"), label: "Videos" },
  { href: a("/blog/"), label: "Blog" },
  { href: home("#visit"), label: "Visit Us" },
];

/** Shared SVG symbols the section headings use. */
export function SymbolsV5() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <symbol id="spk" viewBox="0 0 46 46"><path d="M15 33 4 37" /><path d="M19 22 9 13" /><path d="M29 17 30 4" /></symbol>
        <symbol id="glint" viewBox="0 0 40 40"><path d="M20 0C21.5 13 27 18.5 40 20 27 21.5 21.5 27 20 40 18.5 27 13 21.5 0 20 13 18.5 18.5 13 20 0Z" /></symbol>
      </defs>
    </svg>
  );
}

export function Spark({ r }: { r?: boolean }) {
  return (
    <svg className={`spark${r ? " r" : ""}`} aria-hidden="true">
      <use href="#spk" />
    </svg>
  );
}

const MsgIcon = ({ c = "#12215F", dot = "#FFD02A" }: { c?: string; dot?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3C6.5 3 2.5 6.8 2.5 11.5c0 2.6 1.3 4.9 3.4 6.4V21l3.1-1.7c.9.3 1.9.4 3 .4 5.5 0 9.5-3.8 9.5-8.2S17.5 3 12 3z" fill={c} /><circle cx="8" cy="11.6" r="1.3" fill={dot} /><circle cx="12" cy="11.6" r="1.3" fill={dot} /><circle cx="16" cy="11.6" r="1.3" fill={dot} /></svg>
);

export function HeaderV5() {
  return (
    <header className="hdr">
      <Fx rays={[{ x: "62%", y: "-60%", size: "1600px", o: 0.12 }]} glints={[{ x: "47%", y: "30%", size: 12, o: 0.7 }, { x: "83%", y: "62%", size: 9, o: 0.6 }]} />
      <nav className="nav">
        <a className="logo" href={a("/")} aria-label="Toyzoona Importer home">
          <img src={a("/v5/img/logo-640.webp")} alt="Toyzoona Importer" width={640} height={347} />
        </a>
        <span className="vr" />
        <div className="links">
          {NAV.map((l) => (
            <a key={l.label} href={l.href} aria-current={l.label === "Blog" ? "page" : undefined}>{l.label}</a>
          ))}
        </div>
        <a className="btn btn-y" href={MSG} {...ext}>Message Us</a>
      </nav>
      <div className="wave" />
    </header>
  );
}

export function FooterV5() {
  return (
    <footer className="foot">
      <div className="wave top" />
      <img className="ftruck" src={a("/v5/flat/truck.svg")} alt="" aria-hidden="true" loading="lazy" decoding="async" />
      <Fx rays={[{ x: "50%", y: "110%", size: "2000px", o: 0.08 }]} glints={[{ x: "30%", y: "18%", size: 12, c: "#FFE27A" }, { x: "72%", y: "12%", size: 10 }]} dots={{ x: "50%", y: "100%", o: 0.1 }} />
      <div className="wr fgrid">
        <img className="flogo" src={a("/v5/img/logo-640.webp")} alt="Toyzoona Importer" width={640} height={347} loading="lazy" decoding="async" />
        <span className="sep" />
        <div>
          <h3>Visit Toyzoona in Cabuyao</h3>
          <div className="finfo">
            <div><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s7-6.2 7-12.2A7 7 0 0 0 5 9.8C5 15.8 12 22 12 22z" fill="#fff" /><circle cx="12" cy="9.6" r="2.7" fill="#1F6BE0" /></svg>Brgy. Banay 2,<br />Cabuyao, Laguna</div>
            <span className="mid" />
            <div><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5" fill="none" stroke="#fff" strokeWidth="2.4" /><path d="M12 6.8V12l3.6 2.2" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" /></svg>Mon to Sat ·<br />9 AM to 6:30 PM</div>
          </div>
          <a className="fmail" href={`mailto:${EMAIL}`}><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="3" fill="#fff" /><path d="m4 7.5 8 5.5 8-5.5" fill="none" stroke="#1F6BE0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>{EMAIL}</a>
        </div>
        <span className="sep" />
        <div className="fbtns">
          <a className="btn btn-y" href={MAPS} {...ext}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.5 2.5 2.8 10.3c-.8.3-.7 1.4.1 1.6l7.4 1.8 1.8 7.4c.2.8 1.3.9 1.6.1z" fill="#12215F" /></svg>Get Directions</a>
          <a className="btn btn-w" href={MSG} {...ext}><MsgIcon c="#fff" dot="#1F6BE0" />Message Us</a>
        </div>
      </div>
      <div className="fbase">
        <div className="wr">
          <span>Gatcahalian Subdivision, Brgy. Banay 2, Cabuyao, Laguna · WhatsApp / Viber <a href={WA} {...ext}>+63 929 378 1462</a> · <a href={`mailto:${EMAIL}`}>{EMAIL}</a></span>
          <nav>{NAV.map((l) => <a key={l.label} href={l.href}>{l.label}</a>)}</nav>
          <div className="soc">
            <a href={FB_PAGE} {...ext} aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M24 12.07C24 5.44 18.63.07 12 .07S0 5.44 0 12.07c0 5.99 4.39 10.95 10.13 11.85v-8.38H7.08v-3.47h3.05V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95h-1.52c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.38C19.61 23.03 24 18.06 24 12.07z" /></svg></a>
            <a href="https://www.youtube.com/@ToyzoonaImporter" {...ext} aria-label="YouTube"><svg viewBox="0 0 24 24"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12z" /></svg></a><a href="https://www.tiktok.com/@toyzoonaimporter" {...ext} aria-label="TikTok"><svg viewBox="0 0 24 24"><path d="M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg></a><a href="https://www.linkedin.com/company/toyzoona-importer" {...ext} aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg></a>
            <a href={WA} {...ext} aria-label="WhatsApp"><svg viewBox="0 0 24 24"><path d="M12 .5A11.4 11.4 0 0 0 2.2 17.7L.6 23.5l6-1.6A11.4 11.4 0 1 0 12 .5zm0 20.8a9.4 9.4 0 0 1-4.8-1.3l-.3-.2-3.6.9 1-3.5-.2-.4A9.4 9.4 0 1 1 12 21.3zm5.2-7c-.3-.1-1.7-.8-2-.9s-.5-.1-.7.1-.8.9-.9 1.1-.3.2-.6.1a7.7 7.7 0 0 1-3.8-3.3c-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.4 13.4 0 0 0 5.2 4.6c1.9.8 2.7.9 3.6.7a3.1 3.1 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.1-.3-.2-.6-.3z" /></svg></a>
          </div>
          <span>© 2026 Toyzoona Importer</span>
        </div>
      </div>
    </footer>
  );
}

/** Page shell: v5 tokens, header, footer. */
export function ShellV5({ children }: { children: React.ReactNode }) {
  return (
    <div className="tz5 tz5-blog">
      <SymbolsV5 />
      <HeaderV5 />
      {children}
      <FooterV5 />
    </div>
  );
}

export { MSG, ext };
