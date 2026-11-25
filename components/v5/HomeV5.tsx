/* eslint-disable @next/next/no-img-element */
import { assetPath as a } from "@/lib/assetPath";
import { pic, picAt } from "@/lib/pic";
import Fx from "./Fx";
import MotionV5 from "./MotionV5";

/* Rendered widths for responsive photos (phones get the 480/800 files). */
const SZ_CARD = "(max-width: 900px) 82vw, 320px";
const SZ_AUC = "(max-width: 900px) 92vw, 560px";
const SZ_THUMB = "(max-width: 900px) 45vw, 200px";
const SZ_FRAME = "(max-width: 900px) 82vw, 440px";
const SZ_BIG = "(max-width: 900px) 92vw, 720px";
const SZ_VCARD = "(max-width: 900px) 82vw, 400px";

const MSG = "https://m.me/ToyzoonaLaguna";
const FB_PAGE = "https://www.facebook.com/ToyzoonaLaguna";
const FB_GROUP = "https://www.facebook.com/groups/642834551000763";
// Both open turn-by-turn directions from the visitor's current location (the app on phones), not just the pin.
const WAZE = "https://www.waze.com/ul?place=ChIJ0Q6so0xjvTMRpNhw8A4Mxeo&ll=14.25324%2C121.12974&navigate=yes";
const MAPS = "https://www.google.com/maps/dir/?api=1&destination=Toyzoona+Importer,+Gatcahalian+Subdivision,+Brgy.+Banay+2,+Cabuyao,+Laguna";
const WA = "https://wa.me/639293781462";
const YT_FEATURE = "https://www.youtube.com/watch?v=eAGbGMUIzhY";
const YT_GMA = "https://www.youtube.com/watch?v=xCed6-vE4Ko";
const YT_OPENING = "https://www.youtube.com/watch?v=AMQq10BFM_U"; // warehouse grand opening
const FB_REEL = "https://www.facebook.com/reel/2064629281014506/";
const FB_VIDEO = "https://www.facebook.com/ToyzoonaLaguna/videos/7153440271404393/";
const fbEmbed = (href: string, w: number) => `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(href)}&show_text=0&width=${w}&autoplay=1`;
const ytEmbed = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&autoplay=1`;
const STAR_POST = "https://www.facebook.com/PhilippineSTAR/posts/pfbid0vDA7WywnMQrir75SeeJAMSqHE7fmWNawG82k2HSZgN4VK6BnmXwREjtNrGGZLohUl";
// The STAR post is a square 1080 x 1080 image. MotionV5 loads it at the box's real width so Facebook shows all of it.
const STAR_EMBED = `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(STAR_POST)}&show_text=false&width=500`;
const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

const EMAIL = "official.toyzoonaimporter@gmail.com";

/* flat sunburst behind the hero crate, same idea as the burst behind the logo */
const RAYS = (() => {
  const cx = 690, cy = 560, R = 1900, n = 32;
  let d = "";
  for (let i = 0; i < n; i += 2) {
    const a1 = (i / n) * Math.PI * 2, a2 = ((i + 1) / n) * Math.PI * 2;
    d += `M${cx} ${cy}L${(cx + R * Math.cos(a1)).toFixed(1)} ${(cy + R * Math.sin(a1)).toFixed(1)}L${(cx + R * Math.cos(a2)).toFixed(1)} ${(cy + R * Math.sin(a2)).toFixed(1)}Z`;
  }
  return d;
})();

/* toys from the client's own flat illustrations, placed in the 1536 x 1024 hero scene (percent of the scene) */
const HERO_TOYS: { id: string; src: string; l: number; t: number; w: number; r?: number; inCrate?: boolean }[] = [
  { id: "tRocket", src: "rocket", l: 34.51, t: 37.5, w: 9.38, r: -14, inCrate: true },
  { id: "tRobot", src: "robot", l: 39.84, t: 36.52, w: 13.15, inCrate: true },
  { id: "tDrum", src: "drum", l: 46.55, t: 45.12, w: 10.94, r: 8, inCrate: true },
];
const GROUND_TOYS: typeof HERO_TOYS = [
  { id: "tTrain", src: "train", l: 19.53, t: 82.8, w: 9.77 },
  { id: "tBall", src: "ball", l: 58.92, t: 80.08, w: 7.68 },
];

const BRANDS = [
  ["barbie", "Barbie"], ["lego", "LEGO"], ["bluey", "Bluey"], ["disney", "Disney"], ["hot-wheels", "Hot Wheels"], ["marvel", "Marvel"],
  ["fisher-price", "Fisher-Price"], ["paw-patrol", "Paw Patrol"], ["vtech", "VTech"], ["nerf", "Nerf"], ["cocomelon", "Cocomelon"],
  ["little-tikes", "Little Tikes"], ["peppa-pig", "Peppa Pig"], ["blippi", "Blippi"], ["chicco", "Chicco"], ["lamaze", "Lamaze"],
] as const;

const Spark = ({ r, y, style }: { r?: boolean; y?: boolean; style?: React.CSSProperties }) => (
  <svg className={`spark${r ? " r" : ""}${y ? " y" : ""}`} style={style} aria-hidden="true">
    <use href="#spk" />
  </svg>
);

const Head = ({ title, sub }: { title: string; sub?: string }) => (
  <div className="shead">
    <div className="row">
      <Spark />
      <h2>{title}</h2>
      <Spark r />
    </div>
    {sub && <p>{sub}</p>}
  </div>
);

const Stars = () => (
  <div className="stars" aria-label="5 out of 5 stars">
    {[0, 1, 2, 3, 4].map((i) => (
      <svg key={i} aria-hidden="true">
        <use href="#star" />
      </svg>
    ))}
  </div>
);

const FEATS = [
  { ic: "ic-scale", t: ["Sold by", "the Kilo"], s: "Pay by weight, not per piece." },
  { ic: "ic-flags", t: ["UK & China", "Imports"], s: "UK preloved. China brand-new." },
  { ic: "ic-truck", t: ["Nationwide", "Shipping"], s: "Quoted by weight and destination." },
  { ic: "ic-warehouse", t: ["Cabuyao", "Warehouse"], s: "Brgy. Banay 2, Laguna." },
];

const SHELVES = [
  { c: "c1", img: "/v5/ph/stock-01.webp", alt: "Mixed toy bins at the warehouse", t: "Mixed Toy Bins", p: "Boxes of figures, cars, dolls and blocks. Dig in and build your mix." },
  { c: "c2", img: "/v5/ph/filinvest.webp", alt: "Bulk toy stock on long tables", t: "Bulk Stock", p: "Table after table of fresh arrivals for resellers buying in volume." },
  { c: "c3", img: "/v5/ph/kids.webp", alt: "Kids' playsets on shelves", t: "Playsets", p: "Kitchens, activity tables and ride-ons. The big, bright pieces." },
  { c: "c4", img: "/v5/ph/stock-05.webp", alt: "Rows of warehouse shelves", t: "Warehouse Shelves", p: "Aisles of boxed and loose toys, restocked with every container." },
];

const WHO = [
  { b: "var(--pBlueB)", img: "/v5/ph/toy-8.webp", alt: "Shelves of preloved toys", t: "Resellers", p: "Volume at real margins. Restock your shop with a fresh mix from every delivery." },
  { b: "var(--pPinkB)", img: "/v5/ph/auction-3.webp", alt: "Toyzoona team packing orders", t: "Live Sellers", p: "Varied, eye-catching stock that sells on stream, packed and ready to ship." },
  { b: "var(--pYellowB)", img: "/v5/ph/toy-5.webp", alt: "Boxes of plush toys", t: "Parents & Gift Buyers", p: "Fill a playroom or a whole gift list for a fraction of mall prices." },
  { b: "var(--pGreenB)", img: "/v5/ph/toyfair-3.webp", alt: "Crowd at a Toyzoona toy fair", t: "Event Organizers", p: "Party favors and giveaways for any crowd size, sourced in one trip." },
];

const REVIEWS = [
  { q: "Sobrang sulit ng per-kilo model! I’ve been sourcing from Toyzoona every Saturday and my customers love the variety.", i: "MR", bg: "var(--pBlue)", n: "Maricel R.", r: "Reseller · Laguna" },
  { q: "Legit ang Toyzoona! Fresh arrivals, great prices, mabilis mag-reply.", i: "JB", bg: "var(--pPink)", n: "Jay B.", r: "Live Seller · Batangas" },
  { q: "Binili ko sa toyfair nila tapos nakuha ko sobrang dami for the price. The kids loved it. Going back for Christmas gifts for sure.", i: "RM", bg: "var(--pYellow)", n: "Rowena M.", r: "Parent & Gift Buyer" },
  { q: "I do corporate giveaway sourcing and Toyzoona has been my go-to for event toys. Fair kilo pricing, and they accommodate large orders.", i: "AT", bg: "var(--pGreen)", n: "Arnell T.", r: "Bulk Buyer · Manila" },
];

const FAQS = [
  ["What is the toys-per-kilo model?", "Instead of buying individual toys at retail price, you buy toys by weight. You choose a mix from our available stock, it gets weighed, and you pay the per-kilo rate. More toys for less money, perfect for resellers, bulk buyers, event organizers and parents shopping for variety."],
  ["How does the Saturday auction work?", "Every Saturday at around 11:00 AM at our Cabuyao, Laguna warehouse. Buyers can view, sort and bid on toy lots, and the per-kilo rate is usually most competitive during auctions. Check the Toyzoona Laguna Facebook page for schedules and previews."],
  ["Can I buy without coming in person?", "Yes. We sell live on Facebook and TikTok Monday through Saturday, 9:00 AM to 6:30 PM. Watch the stream, request your picks, and we pack and ship them anywhere in the Philippines. For direct orders, message the Toyzoona Laguna Facebook page or email official.toyzoonaimporter@gmail.com."],
  ["How much is shipping?", "We ship to all provinces. Shipping is paid by the buyer and calculated from the weight of your haul and your destination. We work with trusted couriers so your order arrives safely."],
  ["Is Toyzoona a legitimate business?", "Yes. We’ve been featured on Gud Morning Kapatid, covered by the Philippine STAR, and joined major toy fairs at Dasma Arena, Filinvest Tent and Metrotent Pasig. Thousands of verified buyers are in our Facebook community, and all media coverage is public for you to check."],
];

type Thumb = { img: string; t: string; href: string };
// Every thumb opens the full video on YouTube/Facebook (the clips were cut from these).
const THUMBS: Thumb[] = [
  { img: "/v5/media/shelves.jpg", t: "Fresh shelves tour", href: `${YT_OPENING}&t=2s` },
  { img: "/v5/media/rush.jpg", t: "Saturday rush", href: `${YT_FEATURE}&t=15s` },
  { img: "/v5/ph/tv-3.webp", t: "Marc Logan feature on TV5", href: YT_FEATURE },
  { img: "/v5/ph/arena-9300.webp", t: "Featured Facebook reel", href: FB_REEL },
  { img: "/v5/media/warehouse-wide.jpg", t: "Warehouse walkthrough", href: YT_OPENING },
];

const RIBBON: { t: string; ic?: string }[] = [
  { t: "One rate per kilo", ic: "ic-scale" },
  { t: "UK preloved & China brand-new", ic: "ic-flags" },
  { t: "Saturday auction at 11 AM" },
  { t: "Ships to every province", ic: "ic-truck" },
  { t: "Live selling Mon to Sat" },
  { t: "Walk-ins welcome in Cabuyao", ic: "ic-warehouse" },
  { t: "8,000+ buyers in our Facebook group" },
];

const STATS = [
  { n: 8000, suf: "+", l: "buyers in our Facebook group", b: "var(--pBlueB)" },
  { n: 2, suf: "", l: "national TV features, TV5 and GMA", b: "var(--pYellowB)" },
  { n: 3, suf: "", l: "arena toy fairs and counting", b: "var(--pPinkB)" },
  { n: 6, suf: " days", l: "of live selling every week", b: "var(--pGreenB)" },
];

const VIDEOS = [
  { yt: true, src: "YouTube · TV5", t: "Featured on TV5", p: "Mga Kwento Mo Marc Logan visits Toyzoona Importer and the toys-per-kilo warehouse.", img: "/v5/ph/yt-eAGbGMUIzhY.webp", embed: ytEmbed("eAGbGMUIzhY"), href: YT_FEATURE },
  { yt: true, src: "YouTube · GMA", t: "Featured on Unang Hirit", p: "GMA’s morning show features Toyzoona Importer and our Cabuyao warehouse.", img: "/v5/ph/yt-xCed6-vE4Ko.webp", embed: ytEmbed("xCed6-vE4Ko"), href: YT_GMA },
  { yt: false, src: "Facebook · Toyzoona Laguna", t: "From Our Facebook Page", p: "Official video from the Toyzoona Laguna page, where every restock gets posted first.", img: "/v5/ph/stock-05.webp", embed: fbEmbed(FB_VIDEO, 720), href: FB_VIDEO },
];

const FbIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#1877F2" /><path d="M13.4 19.5v-6.1h2.1l.3-2.4h-2.4V9.5c0-.7.2-1.2 1.2-1.2h1.3V6.2c-.2 0-1-.1-1.9-.1-1.9 0-3.2 1.2-3.2 3.3V11H8.7v2.4h2.1v6.1z" fill="#fff" /></svg>
);
const YtIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="1" y="4.5" width="22" height="15" rx="4.5" fill="#FF0033" /><path d="M10 9v6l5.2-3z" fill="#fff" /></svg>
);
const PaperIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="4" width="16" height="16" rx="2.5" fill="#12215F" /><path d="M18.5 8h2a1 1 0 0 1 1 1v8.5a2.5 2.5 0 0 1-5 0" fill="#46557F" /><path d="M6 8h9M6 11.5h9M6 15h5.5" stroke="#FFD02A" strokeWidth="1.8" strokeLinecap="round" /></svg>
);

export default function HomeV5() {
  return (
    <div className="tz5" id="tz5">
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <symbol id="spk" viewBox="0 0 46 46"><path d="M15 33 4 37" /><path d="M19 22 9 13" /><path d="M29 17 30 4" /></symbol>
          <symbol id="tri" viewBox="0 0 16 16"><path d="M3 1.5v13l11-6.5z" fill="#12215F" /></symbol>
          <symbol id="heart" viewBox="0 0 32 30"><path d="M16 29S1 19.6 1 9.6C1 4.8 4.7 1 9.3 1c2.8 0 5.2 1.4 6.7 3.6C17.5 2.4 19.9 1 22.7 1 27.3 1 31 4.8 31 9.6 31 19.6 16 29 16 29z" fill="#FF3B5C" stroke="#fff" strokeWidth="2" /></symbol>
          <symbol id="glint" viewBox="0 0 40 40"><path d="M20 0C21.5 13 27 18.5 40 20 27 21.5 21.5 27 20 40 18.5 27 13 21.5 0 20 13 18.5 18.5 13 20 0Z" /></symbol>
          <symbol id="star" viewBox="0 0 20 20"><path d="M10 1.2l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L10 15l-5.4 2.9 1.1-6.1L1.2 7.6l6.1-.8z" fill="#FFC21A" stroke="#E9A100" strokeWidth=".8" strokeLinejoin="round" /></symbol>
        </defs>
      </svg>

      {/* ================= FLOATING BAR (appears once you scroll) ================= */}
      <div className="float" id="float">
        <a className="fl-logo" href="#top" aria-label="Back to top">
          <img src={a("/v5/img/logo-640.webp")} alt="Toyzoona Importer" width={640} height={347} />
        </a>
        <nav className="fl-links" aria-label="Sections">
          <a href="#shelves">Toy Shelves</a>
          <a href="#how">How to Buy</a>
          <a href="#auction">Auction</a>
          <a href="#videos">Videos</a>
          <a href="#visit">Visit Us</a>
        </nav>
        <a className="flive" id="flive" href={FB_PAGE} {...ext}><i /><span id="fliveT">Live Mon to Sat, 9 AM</span></a>
        <a className="fcd" id="fcd" href="#auction" aria-label="Time until the next Saturday auction">
          <span className="lb" id="fcdL">Saturday auction in</span>
          <span className="tm">
            <span><b data-cd="d">0</b><small>d</small></span>
            <span><b data-cd="h">00</b><small>h</small></span>
            <span><b data-cd="m">00</b><small>m</small></span>
            <span><b data-cd="s">00</b><small>s</small></span>
          </span>
        </a>
        <a className="btn btn-y" href={MSG} {...ext} aria-label="Message Toyzoona">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3C6.5 3 2.5 6.8 2.5 11.5c0 2.6 1.3 4.9 3.4 6.4V21l3.1-1.7c.9.3 1.9.4 3 .4 5.5 0 9.5-3.8 9.5-8.2S17.5 3 12 3z" fill="#12215F" /><circle cx="8" cy="11.6" r="1.3" fill="#FFD02A" /><circle cx="12" cy="11.6" r="1.3" fill="#FFD02A" /><circle cx="16" cy="11.6" r="1.3" fill="#FFD02A" /></svg>
          <span className="lg">Message Us</span>
        </a>
        <i className="fprog" id="fprog" />
      </div>

      {/* ================= HEADER ================= */}
      <header className="hdr" id="top">
        <Fx rays={[{ x: "62%", y: "-60%", size: "1600px", o: 0.12 }]} glints={[{ x: "47%", y: "30%", size: 12, o: 0.7 }, { x: "83%", y: "62%", size: 9, o: 0.6 }]} />
        <nav className="nav">
          <a className="logo" href="#top" aria-label="Toyzoona Importer home">
            <img src={a("/v5/img/logo-640.webp")} alt="Toyzoona Importer" width={640} height={347} />
          </a>
          <span className="vr" />
          <div className="links">
            <a href="#shelves">Toy Shelves</a>
            <a href="#how">How to Buy</a>
            <a href="#auction">Auction</a>
            <a href="#videos">Videos</a>
            <a href={a("/blog/")}>Blog</a>
            <a href="#visit">Visit Us</a>
          </div>
          <a className="btn btn-y" href={MSG} {...ext}>Message Us</a>
        </nav>
        <div className="wave" />
      </header>

      {/* ================= HERO ================= */}
      <section className="hero" id="hero">
        <div className="art" id="art">
          <div className="scene" id="scene">
            {/* back: sky, sunburst, hills, warehouse, ground */}
            <svg className="bg" viewBox="0 0 1536 1024" preserveAspectRatio="none" role="img" aria-label="A wooden crate of toys on a blue platform scale outside the Toyzoona warehouse, with a teddy bear and the yellow delivery truck">
              <rect width="1536" height="1024" fill="#A6DBFF" />
              <path d={RAYS} fill="#B9E4FF" />
              <path d="M0 772Q190 702 400 744T820 730T1240 710T1536 728V1024H0Z" fill="#C3EAAE" />
              <rect x="930" y="372" width="640" height="440" fill="#1758C2" />
              <rect x="930" y="372" width="640" height="426" fill="#3D8BF2" />
              <path d="M896 394L1240 234L1584 394Z" fill="#C42A22" />
              <path d="M896 382L1240 222L1584 382Z" fill="#E8392F" />
              <rect x="958" y="428" width="84" height="64" rx="10" fill="#BFE6FF" />
              <rect x="958" y="456" width="84" height="6" fill="#3D8BF2" />
              <rect x="1086" y="512" width="340" height="300" fill="#C7D6EA" />
              <rect x="1096" y="520" width="320" height="292" fill="#DCE6F2" />
              {Array.from({ length: 10 }, (_, i) => <rect key={i} x="1096" y={540 + i * 27} width="320" height="5" fill="#B5C4D8" />)}
              <rect y="806" width="1536" height="218" fill="#F4E2BF" />
              <rect y="806" width="1536" height="12" fill="#E8CF9F" />
              <ellipse cx="1229" cy="898" rx="190" ry="17" fill="#12215F" opacity=".1" />
            </svg>
            <img className="lay" id="hTruck" src={a("/v5/flat/truck.svg")} alt="" style={{ left: "0.65%", top: "58.2%", width: "30.6%" }} />
            {/* the platform scale and the back of the crate */}
            <svg className="bg" viewBox="0 0 1536 1024" preserveAspectRatio="none" aria-hidden="true">
              <ellipse cx="688" cy="986" rx="290" ry="20" fill="#12215F" opacity=".12" />
              <rect x="498" y="952" width="54" height="30" rx="8" fill="#12215F" />
              <rect x="824" y="952" width="54" height="30" rx="8" fill="#12215F" />
              <rect x="468" y="820" width="440" height="148" rx="30" fill="#1758C2" />
              <rect x="468" y="806" width="440" height="140" rx="30" fill="#1F6FE5" />
              <rect x="490" y="816" width="396" height="8" rx="4" fill="#fff" opacity=".25" />
              <rect x="650" y="786" width="76" height="26" fill="#1758C2" />
              <rect x="420" y="776" width="536" height="22" rx="11" fill="#B5C4D8" />
              <rect x="420" y="766" width="536" height="22" rx="11" fill="#DCE6F2" />
              <rect x="546" y="829" width="285" height="85" rx="16" fill="#12215F" />
              <path d="M573 841H805Q814 841 815 850L817 892Q817 901 808 901H569Q560 901 560 892L563 850Q564 841 573 841Z" fill="#1A2029" />
              <circle cx="864" cy="852" r="13" fill="#FFD02A" />
              <circle cx="864" cy="888" r="13" fill="#E8392F" />
              <circle cx="512" cy="870" r="8" fill="#62E36B" />
              <rect x="515" y="556" width="346" height="44" rx="6" fill="#A9652A" />
              <rect x="505" y="550" width="366" height="14" rx="6" fill="#CC8338" />
            </svg>
            {HERO_TOYS.map((t) => (
              <img key={t.id} className="lay drop in" id={t.id} src={a(`/v5/toys/t-${t.src}.webp`)} alt="" style={{ left: `${t.l}%`, top: `${t.t}%`, width: `${t.w}%`, rotate: t.r ? `${t.r}deg` : undefined }} />
            ))}
            {/* crate front, in front of the toys */}
            <svg className="bg" viewBox="0 0 1536 1024" preserveAspectRatio="none" aria-hidden="true">
              <rect x="505" y="594" width="366" height="180" rx="10" fill="#CC8338" />
              <rect x="505" y="590" width="366" height="178" rx="10" fill="#E9A253" />
              <rect x="505" y="648" width="366" height="7" fill="#CC8338" />
              <rect x="505" y="708" width="366" height="7" fill="#CC8338" />
              <rect x="505" y="590" width="36" height="178" rx="9" fill="#D98F42" />
              <rect x="835" y="590" width="36" height="178" rx="9" fill="#D98F42" />
              <rect x="497" y="580" width="382" height="24" rx="9" fill="#F3B567" />
              <g fill="#A9652A"><circle cx="523" cy="626" r="4.5" /><circle cx="853" cy="626" r="4.5" /><circle cx="523" cy="742" r="4.5" /><circle cx="853" cy="742" r="4.5" /></g>
              <path d="M700 676h92l18 22-18 22h-92z" fill="#E8392F" />
              <circle cx="714" cy="698" r="6" fill="#fff" />
              <text x="732" y="707" fontFamily="Nunito,sans-serif" fontWeight="900" fontSize="25" fill="#fff">1 KG</text>
            </svg>
            {GROUND_TOYS.map((t) => (
              <img key={t.id} className="lay drop" id={t.id} src={a(`/v5/toys/t-${t.src}.webp`)} alt="" style={{ left: `${t.l}%`, top: `${t.t}%`, width: `${t.w}%` }} />
            ))}
            <svg className="lcdsvg" viewBox="0 0 1536 1024" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1F262F" /><stop offset=".55" stopColor="#151A21" /><stop offset="1" stopColor="#0F1318" /></linearGradient>
                <filter id="lglow" x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur stdDeviation="2.4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
              </defs>
              <g id="lcdOn" opacity="0">
                <path d="M573 841H805Q814 841 815 850L817 892Q817 901 808 901H569Q560 901 560 892L563 850Q564 841 573 841Z" fill="url(#glass)" />
                <path d="M574 844H804" stroke="#fff" strokeOpacity=".08" strokeWidth="2" />
                <g transform="matrix(1 0 -.14 1 121.8 0)">
                  <g id="segGhost" fill="#FFD83A" opacity=".07" />
                  <g id="segLit" fill="#FFE04A" filter="url(#lglow)" />
                  <text id="lcdKg" x="766" y="889" fontFamily="Nunito,sans-serif" fontWeight="900" fontSize="19" fill="#FFE04A" opacity=".12" filter="url(#lglow)">kg</text>
                </g>
                <circle id="lcdStable" cx="590" cy="857" r="4.2" fill="#62E36B" opacity=".12" filter="url(#lglow)" />
                <text x="579" y="893" fontFamily="Nunito,sans-serif" fontWeight="900" fontSize="7.5" fill="#9AA6B8" opacity=".55" letterSpacing=".6">NET</text>
              </g>
            </svg>
            <a className="lay" id="hot" role="button" aria-label="Weigh the crate again" />
            <a className="lay" id="hBear" role="button" aria-label="Wave back at the bear"><img src={a("/v5/toys/t-bear.webp")} alt="" /></a>
          </div>
          <div className="lay" id="hCloud"><img src={a("/v5/flat/cloud.svg")} alt="" /></div>
          <div className="lay" id="hCloud2"><img src={a("/v5/flat/cloud.svg")} alt="" /></div>
          <div className="lay star" id="hS1"><img src={a("/v5/flat/star.svg")} alt="" /></div>
          <div className="lay star" id="hS2"><img src={a("/v5/flat/star.svg")} alt="" /></div>
          <div className="lay star" id="hS3"><img src={a("/v5/flat/star.svg")} alt="" /></div>
          <div className="glint" id="glint"><svg><use href="#glint" /></svg></div>
        </div>

        <div className="panel">
          <div className="fill">
            <Fx
              rays={[{ x: "8%", y: "-8%", size: "1500px", o: 0.42, warm: true }]}
              glints={[{ x: "6%", y: "16%", size: 14, c: "#FFC94A", o: 0.8 }, { x: "54%", y: "11%", size: 10, c: "#FFC94A", o: 0.7 }, { x: "70%", y: "76%", size: 12, c: "#8EC2FF", o: 0.7 }]}
            />
          </div>
          <div className="copy">
            <h1>
              <span className="l"><span>Big Toy Hauls.</span></span>
              <span className="l l2"><span>By the Kilo.</span></span>
            </h1>
            <p className="lede">Shop UK preloved and brand-new toys from China. Build a mixed haul for your shop, live sale, party, or playroom.</p>
            <div className="ctas">
              <a className="btn btn-y" href={MSG} {...ext}>Ask for Today’s Stock</a>
              <a className="btn btn-o" href="#how">See How to Buy</a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURE BAR ================= */}
      <section className="feats">
        <div className="wr">
          <Spark />
          <div className="bar">
            {FEATS.map((f) => (
              <div className="feat" key={f.ic}>
                <span className="icw"><img className="ic" src={a(`/v5/flat/${f.ic}.svg`)} alt="" /></span>
                <div>
                  <b>{f.t[0]}<br />{f.t[1]}</b>
                  <small>{f.s}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BRANDS ================= */}
      <section className="brands" aria-labelledby="brandsT">
        <div className="wr bhead">
          <h2 id="brandsT">Brands you’ll find in our hauls</h2>
          <p>Brands change with every container. Message us to ask what’s in today.</p>
        </div>
        <div className="bmq">
          <div className="btrk">
            {[0, 1].map((copy) => (
              <div className="bset" key={copy} aria-hidden={copy === 1 ? true : undefined}>
                {BRANDS.map(([f, n]) => (
                  <span className="bl" key={f}>
                    <img src={a(`/v5/brands/${f}.webp`)} alt={copy === 0 ? n : ""} decoding="async" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SHELVES ================= */}
      <section className="shelves" id="shelves">
        <Fx
          rays={[{ x: "50%", y: "0%", size: "2200px", o: 0.32, warm: true }]}
          glows={[{ x: "12%", y: "70%", size: "520px", c: "rgba(211,233,252,.8)" }, { x: "90%", y: "40%", size: "560px", c: "rgba(252,220,236,.6)" }, { x: "50%", y: "4%", size: "900px", c: "rgba(255,255,255,.9)" }]}
          bokeh={[{ x: "6%", y: "22%", size: 26, o: 0.9 }, { x: "94%", y: "16%", size: 34, o: 0.9 }, { x: "88%", y: "86%", size: 22, o: 0.8 }, { x: "3%", y: "84%", size: 40, o: 0.8 }]}
          glints={[{ x: "17%", y: "12%", size: 16, c: "#FFC94A" }, { x: "82%", y: "9%", size: 12, c: "#8EC2FF" }, { x: "96%", y: "62%", size: 14, c: "#FFC94A" }]}
        />
        <div className="wr">
          <Head title="Explore the Toy Shelves" sub="Stock changes with every delivery. Message us for photos of what’s available today." />
          <div className="shelfs">
            {SHELVES.map((s) => (
              <article className={`shelf ${s.c}`} key={s.t}>
                <div className="ph"><img {...pic(s.img, SZ_CARD)} alt={s.alt} loading="lazy" decoding="async" /></div>
                <h3>{s.t}</h3>
                <p>{s.p}</p>
              </article>
            ))}
          </div>
          <div className="center">
            <Spark />
            <a className="btn btn-y" href={MSG} {...ext}>Ask About Current Stock</a>
            <Spark r />
          </div>
        </div>
        <div className="ribbon" id="ribbon" aria-label="Toyzoona at a glance">
          <div className="trk">
            {[0, 1].map((copy) => (
              <div key={copy} style={{ display: "flex" }} aria-hidden={copy === 1 ? true : undefined}>
                {RIBBON.map((r) => (
                  <span className="it" key={r.t}>
                    {r.ic ? <img src={a(`/v5/flat/${r.ic}.svg`)} alt="" /> : null}
                    {r.t}
                    <svg aria-hidden="true"><use href="#star" /></svg>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW + AUCTION ================= */}
      <div className="band-sky">
        <div className="wave top" />
        <Fx
          rays={[{ x: "50%", y: "0%", size: "2600px", o: 0.5 }, { x: "50%", y: "62%", size: "1800px", o: 0.28 }]}
          glows={[{ x: "50%", y: "8%", size: "1100px", c: "rgba(255,255,255,.85)" }, { x: "8%", y: "55%", size: "600px", c: "rgba(255,255,255,.6)" }, { x: "94%", y: "70%", size: "600px", c: "rgba(255,240,190,.55)" }]}
          dots={{ x: "50%", y: "0%", o: 0.65 }}
          bokeh={[{ x: "4%", y: "8%", size: 30 }, { x: "95%", y: "12%", size: 44 }, { x: "91%", y: "48%", size: 24 }, { x: "2%", y: "66%", size: 36 }, { x: "60%", y: "52%", size: 18 }]}
          glints={[{ x: "13%", y: "5%", size: 18 }, { x: "86%", y: "4%", size: 14 }, { x: "97%", y: "33%", size: 16 }, { x: "4%", y: "40%", size: 12 }, { x: "48%", y: "57%", size: 14 }, { x: "7%", y: "92%", size: 16 }]}
        />
        <div className="cloud" data-cloud="1" style={{ left: "-2%", top: "3%", ["--w" as string]: "240px" }} aria-hidden="true"><img src={a("/v5/flat/cloud.svg")} alt="" /></div>
        <div className="cloud" data-cloud="2" style={{ right: "-1%", top: "30%", ["--w" as string]: "200px" }} aria-hidden="true"><img src={a("/v5/flat/cloud.svg")} alt="" /></div>
        <div className="cloud" data-cloud="3" style={{ left: "3%", top: "60%", ["--w" as string]: "170px", opacity: 0.75 }} aria-hidden="true"><img src={a("/v5/flat/cloud.svg")} alt="" /></div>

        <section className="how" id="how">
          <div className="wr">
            <Head title="How Buying by the Kilo Works" />
            <div className="steps">
              <div className="step">
                <div className="vis"><span className="num">1</span><Spark style={{ left: "8%", top: "12%" }} /><img id="stBox" className="mix" src={a("/v5/toys/t-line-a.webp")} alt="A mix of toys: teddy bear, ball, rocket, robot, train and drum" /></div>
                <h3>Pick Your Mix</h3><p className="sub">Browse the available toys.</p>
                <p className="more">Fill your basket with any mix you like: plush, cars, dolls, blocks and playsets, preloved or brand-new.</p>
              </div>
              <div className="step">
                <div className="vis"><span className="num">2</span><Spark style={{ left: "10%", top: "26%" }} /><div id="stScale" className="combo"><img className="sc" src={a("/v5/flat/scale.svg")} alt="Blue platform scale reading 8.50 kg" /><img className="on" src={a("/v5/toys/t-bear.webp")} alt="" /><img className="on2" src={a("/v5/toys/t-ball.webp")} alt="" /></div></div>
                <h3>Weigh Your Haul</h3><p className="sub">Your total is based on the weight.</p>
                <p className="more">We weigh your picks right in front of you. One per-kilo rate, no pricing toy by toy.</p>
              </div>
              <div className="step">
                <div className="vis"><span className="num">3</span><Spark r style={{ right: "4%", top: "8%" }} /><img id="stTruck" src={a("/v5/flat/truck.svg")} alt="Toyzoona delivery truck" /></div>
                <h3>Take It Home</h3><p className="sub">Pick up in Cabuyao or ask about shipping.</p>
                <p className="more">Carry it out the same day, or we pack it and ship it to any province in the Philippines.</p>
              </div>
            </div>
            <div className="why">
              <div className="kg">1 kg<small>ONE RATE</small></div>
              <div>
                <h3>Why buy by the kilo?</h3>
                <p>Instead of paying retail for every piece, you pay <b>one rate per kilo</b> for whatever mix you choose. More toys for less money, which is why <b>resellers, live sellers, event organizers and parents</b> buy this way. If you usually buy more than 5 to 10 toys at a time, the per-kilo model works in your favor.</p>
              </div>
              <a className="btn btn-b" href={MSG} {...ext}>Ask for Today’s Rate <span className="chev">›</span></a>
            </div>
          </div>
        </section>

        <section className="auc" id="auction">
          <div className="wr">
            <div className="acard">
              <div className="slides" id="slides">
                <img {...pic("/v5/ph/auction-2.webp", SZ_AUC)} alt="Buyers seated at the Saturday toy auction in the Toyzoona warehouse" />
                <img {...pic("/v5/ph/auction-1.webp", SZ_AUC)} alt="Saturday auction crowd at the warehouse" loading="lazy" decoding="async" />
                <img {...pic("/v5/ph/auction-4.webp", SZ_AUC)} alt="Toy lots stacked for the auction" loading="lazy" decoding="async" />
                <span className="tag">Saturday auction · Cabuyao warehouse</span>
              </div>
              <div>
                <h2>Saturday<br />Toy Auction</h2>
                <span className="when">Saturdays at 11 AM PHT</span>
                <p className="lede">Browse mixed toy lots and bid<br />in person at our Cabuyao warehouse.</p>
                <ul className="alist">
                  <li>Come early to see the lots before bidding starts.</li>
                  <li>Mixed lots at the best per-kilo prices of the week.</li>
                  <li>Schedules and previews post first in our Facebook group.</li>
                </ul>
                <div className="cd" id="cd" aria-live="polite">
                  <span className="lbl">Next auction in</span>
                  <span className="u"><b data-cd="d">0</b><small>DAYS</small></span>
                  <span className="u"><b data-cd="h">00</b><small>HRS</small></span>
                  <span className="u"><b data-cd="m">00</b><small>MIN</small></span>
                  <span className="u"><b data-cd="s">00</b><small>SEC</small></span>
                </div>
                <a className="btn btn-y" href={FB_GROUP} {...ext}>See Auction Updates <span className="chev">›</span></a>
              </div>
              <div className="abear">
                <div className="bang" id="bang"><i /><i /></div>
                <div id="aBear" className="gbear" role="img" aria-label="Teddy bear with an auction gavel"><img src={a("/v5/toys/t-bear.webp")} alt="" loading="lazy" decoding="async" /><img className="gavel" src={a("/v5/flat/gavel.svg")} alt="" loading="lazy" decoding="async" /></div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ================= WAYS ================= */}
      <section className="ways">
        <div className="wave top rev" />
        <Fx
          rays={[{ x: "12%", y: "10%", size: "2000px", o: 0.1 }]}
          glows={[{ x: "88%", y: "90%", size: "700px", c: "rgba(90,170,255,.45)" }]}
          bokeh={[{ x: "30%", y: "12%", size: 46, o: 0.22 }, { x: "70%", y: "8%", size: 28, o: 0.25 }, { x: "96%", y: "30%", size: 60, o: 0.16 }, { x: "50%", y: "88%", size: 34, o: 0.2 }]}
          glints={[{ x: "24%", y: "18%", size: 14, c: "#FFE27A" }, { x: "97%", y: "12%", size: 12 }, { x: "46%", y: "92%", size: 12, c: "#FFE27A" }]}
          dots={{ x: "10%", y: "20%", o: 0.12 }}
        />
        <div className="wr grid">
          <div>
            <h2><Spark y />Pick Your<br />Way to Buy</h2>
            <p className="intro">Shop from home, walk the warehouse floor, or get first look at every delivery. Same stock, same per-kilo deal.</p>
          </div>
          <div className="way">
            <div className="circ toy" id="cLive"><img src={a("/v5/toys/t-robot.webp")} alt="Toy robot on a live selling stream" loading="lazy" decoding="async" /><span className="onair"><i />LIVE</span></div>
            <h3>Live Selling</h3><p className="sub">Shop on Facebook or TikTok.</p>
            <p className="more">Mon to Sat, 9 AM to 6:30 PM. Watch, call your picks in the comments, and we ship nationwide.</p>
            <a className="tlink" href={FB_PAGE} {...ext}>Watch us live ›</a>
          </div>
          <div className="way">
            <div className="circ"><div className="vid"><video src={a("/v5/media/warehouse-wide.mp4")} poster={picAt("/v5/media/warehouse-wide.jpg", 480)} muted loop playsInline preload="none" data-auto="" /></div></div>
            <h3>Warehouse Walk-In</h3><p className="sub">Browse and weigh your picks in person.</p>
            <p className="more">See the full inventory first-hand, choose exactly what you want, and pay after weighing.</p>
            <a className="tlink" href={WAZE} {...ext}>Get directions in Waze ›</a>
          </div>
          <div className="way">
            <a className="circ toy wide" id="cFb" href={FB_GROUP} {...ext} aria-label="Join the Toyzoona Facebook group">
              <img src={a("/v5/toys/t-line-d.webp")} alt="" loading="lazy" decoding="async" />
              <svg className="thumbup" viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 10.5h3.6v10H2.5zM8 20.5V10.4l4.6-7.1c.4-.6 1.2-.8 1.8-.4.9.5 1.3 1.6 1 2.6L14.6 9h5.1c1.2 0 2.1 1.1 1.9 2.3l-1.3 7.4c-.2 1-1 1.8-2 1.8z" fill="#fff" /></svg>
            </a>
            <h3>Facebook Group</h3><p className="sub">Get stock previews and auction updates.</p>
            <p className="more">8,000+ members get early previews, live selling links and direct order access.</p>
            <a className="tlink" href={FB_GROUP} {...ext}>Join the group ›</a>
          </div>
        </div>
        <div className="wave bot rev" />
      </section>

      {/* ================= WATCH ================= */}
      <section className="watch">
        <Fx
          rays={[{ x: "62%", y: "0%", size: "2400px", o: 0.45 }]}
          glows={[{ x: "62%", y: "10%", size: "900px", c: "rgba(255,255,255,.8)" }, { x: "12%", y: "60%", size: "600px", c: "rgba(255,255,255,.55)" }]}
          bokeh={[{ x: "52%", y: "70%", size: 24 }, { x: "96%", y: "8%", size: 36 }, { x: "40%", y: "12%", size: 20 }]}
          glints={[{ x: "45%", y: "14%", size: 16, c: "#FFC94A" }, { x: "98%", y: "48%", size: 14 }, { x: "34%", y: "64%", size: 12 }]}
        />
        <div className="wr">
          <div className="wgrid">
            <div className="phone" id="phone">
              <Spark />
              <div className="device">
                <div className="screen">
                  <video id="pv" src={a("/v5/media/shelves.mp4")} poster={picAt("/v5/media/shelves.jpg", 1200)} muted loop playsInline preload="none" />
                  <span className="live"><i />LIVE</span>
                  <button className="play" id="pplay" aria-label="Play"><svg viewBox="0 0 16 16"><path d="M3 1.5v13l11-6.5z" fill="#fff" /></svg></button>
                  <span className="sname" id="sname">Fresh shelves tour</span>
                </div>
              </div>
            </div>
            <div className="wh">
              <h2>Watch the <br />Latest <br />Toy Hauls</h2>
              <svg className="swoosh" viewBox="0 0 200 50" aria-hidden="true"><path d="M6 22C60 12 120 10 190 14" /><path d="M40 40C80 34 120 33 150 34" /></svg>
              <p>New stock lands every week. See it on the floor before you message us.</p>
            </div>
            <div className="restock">
              <div className="hd"><img id="rBox" src={a("/v5/flat/crate.svg")} alt="" loading="lazy" decoding="async" /><h3>Restocking<br />Your Shop?</h3></div>
              <p>Ask about mixed stock for your<br />store, live sale, or event giveaways.</p>
              <a className="btn btn-b" href={MSG} {...ext}>Message Toyzoona <span className="chev">›</span></a>
            </div>
          </div>
          <div className="thumbs" id="thumbs">
            {THUMBS.map((t) => (
              <a key={t.t} className="thumb" href={t.href} {...ext} aria-label={`Watch: ${t.t}`}>
                <img {...pic(t.img, SZ_THUMB)} alt="" loading="lazy" decoding="async" />
                <span className="pb"><svg><use href="#tri" /></svg></span>
                <span className="tt">{t.t}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHO ================= */}
      <section className="who">
        <div className="wave top" />
        <Fx
          rays={[{ x: "50%", y: "0%", size: "2000px", o: 0.28, warm: true }]}
          glows={[{ x: "50%", y: "0%", size: "900px", c: "rgba(255,255,255,.9)" }, { x: "96%", y: "60%", size: "500px", c: "rgba(217,245,214,.7)" }]}
          glints={[{ x: "16%", y: "10%", size: 14, c: "#FFC94A" }, { x: "86%", y: "14%", size: 12, c: "#F6B3D6" }]}
        />
        <div className="wr">
          <Head title="Built for Every Kind of Buyer" sub="Whether you sell toys, stream them, or wrap them, buying by the kilo stretches every peso further." />
          <div className="wcards">
            {WHO.map((w) => (
              <article className="wcard" key={w.t} style={{ ["--b" as string]: w.b }}>
                <div className="ph"><img {...pic(w.img, SZ_CARD)} alt={w.alt} loading="lazy" decoding="async" /></div>
                <div className="tx"><h3>{w.t}</h3><p>{w.p}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= IN ACTION ================= */}
      <section className="action">
        <Fx glows={[{ x: "4%", y: "40%", size: "520px", c: "rgba(211,233,252,.7)" }, { x: "98%", y: "70%", size: "520px", c: "rgba(255,241,184,.8)" }]} glints={[{ x: "50%", y: "6%", size: 14, c: "#FFC94A" }]} />
        <div className="wr">
          <Head title="See Toyzoona in Action" sub="From the warehouse floor to national TV and toy fairs." />
          <div className="pics">
            <a className="pic" href={YT_FEATURE} {...ext}>
              <div className="frame"><div className="ph"><img {...pic("/v5/ph/tv-2.webp", SZ_FRAME)} alt="Toyzoona toys on the Gud Morning Kapatid set" loading="lazy" decoding="async" /></div><div className="cap y">Featured on<br />Gud Morning Kapatid</div></div>
              <p>Our toys-per-kilo story on one of the country’s biggest morning shows, and covered by the Philippine STAR. Watch the full segment.</p>
            </a>
            <span className="sep" />
            <a className="pic" href={FB_PAGE} {...ext}>
              <div className="frame"><div className="ph"><img {...pic("/v5/ph/metrotent.webp", SZ_FRAME)} alt="Crowd at a Toyzoona toy fair" loading="lazy" decoding="async" /></div><div className="cap b">Toy Fair<br />Highlights</div></div>
              <p>Real crowds, real tables, real hauls at some of the biggest toy fairs in the south.</p>
              <div className="venues"><span>Dasma Arena</span><span>Filinvest Tent</span><span>Metrotent Pasig</span></div>
            </a>
          </div>
        </div>
      </section>

      {/* ================= FEATURED VIDEOS ================= */}
      <section className="media" id="videos">
        <Fx
          rays={[{ x: "50%", y: "0%", size: "1800px", o: 0.26, warm: true }]}
          glows={[{ x: "50%", y: "2%", size: "900px", c: "rgba(255,255,255,.9)" }, { x: "4%", y: "70%", size: "520px", c: "rgba(211,233,252,.7)" }, { x: "97%", y: "40%", size: "520px", c: "rgba(252,220,236,.6)" }]}
          glints={[{ x: "10%", y: "6%", size: 16, c: "#FFC94A" }, { x: "90%", y: "9%", size: 14, c: "#8EC2FF" }, { x: "97%", y: "80%", size: 12, c: "#FFC94A" }]}
        />
        <div className="wr">
          <Head title="Watch Toyzoona on TV and Online" sub="National TV, the Philippine STAR and our most-shared clips. Watch them before you message us." />
          <div className="stats">
            {STATS.map((s) => (
              <div className="stat" key={s.l} style={{ ["--b" as string]: s.b }}>
                <b data-count={s.n} data-suffix={s.suf}>{s.n.toLocaleString("en-US")}{s.suf}</b>
                <span>{s.l}</span>
              </div>
            ))}
          </div>

          <div className="mgrid">
            <article className="vcard big">
              <div className="vsrc"><FbIcon />Facebook Reel · Featured clip</div>
              <a className="vf" href={FB_REEL} {...ext} data-embed={fbEmbed(FB_REEL, 900)} aria-label="Play the featured Facebook reel">
                <img {...pic("/v5/ph/auction-1.webp", SZ_BIG)} alt="" loading="lazy" decoding="async" />
                <span className="pbig"><svg viewBox="0 0 16 16"><path d="M3 1.5v13l11-6.5z" /></svg></span>
                <span className="cap2">The reel buyers keep sharing</span>
              </a>
              <div className="vb">
                <h3>Featured Facebook Reel</h3>
                <p>Real stock and real buyers, straight from our page. This is the clip that brings new resellers to the warehouse.</p>
                <a className="tlink" href={FB_REEL} {...ext}>Open on Facebook ›</a>
              </div>
            </article>

            <article className="vcard press">
              <div className="vsrc"><PaperIcon />Press feature</div>
              <div className="pv stpost" id="starPv">
                <iframe
                  data-src={STAR_EMBED}
                  title="Philippine STAR post about Toyzoona Importer"
                  loading="lazy"
                  scrolling="no"
                  allow="clipboard-write; encrypted-media; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
              <div className="vb">
                <h3>Highlighted by the Philippine STAR</h3>
                <p>A second public reference beside our TV features, posted on the STAR’s own Facebook page.</p>
                <a className="tlink" href={STAR_POST} {...ext}>Open on Facebook ›</a>
              </div>
            </article>
          </div>

          <div className="mrow">
            {VIDEOS.map((v) => (
              <article className="vcard" key={v.t}>
                <div className="vsrc">{v.yt ? <YtIcon /> : <FbIcon />}{v.src}</div>
                <a className="vf" href={v.href} {...ext} data-embed={v.embed} aria-label={`Play: ${v.t}`}>
                  <img {...pic(v.img, SZ_VCARD)} alt="" loading="lazy" decoding="async" />
                  <span className="pbig"><svg viewBox="0 0 16 16"><path d="M3 1.5v13l11-6.5z" /></svg></span>
                </a>
                <div className="vb">
                  <h3>{v.t}</h3>
                  <p>{v.p}</p>
                  <a className="tlink" href={v.href} {...ext}>{v.yt ? "Watch on YouTube ›" : "Open on Facebook ›"}</a>
                </div>
              </article>
            ))}
          </div>

          <p className="mnote">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z" fill="#1F6FE5" /><path d="m8.5 12 2.4 2.4L15.8 9.5" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Every feature here is public. Watch it, share it, and check it before you buy.
          </p>
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <section className="reviews">
        <div className="wave top" />
        <Fx
          rays={[{ x: "50%", y: "0%", size: "2400px", o: 0.45 }]}
          glows={[{ x: "50%", y: "4%", size: "1000px", c: "rgba(255,255,255,.85)" }]}
          dots={{ x: "50%", y: "0%", o: 0.6 }}
          bokeh={[{ x: "5%", y: "20%", size: 34 }, { x: "93%", y: "26%", size: 26 }, { x: "90%", y: "86%", size: 40 }]}
          glints={[{ x: "12%", y: "10%", size: 16 }, { x: "88%", y: "8%", size: 14, c: "#FFE27A" }, { x: "3%", y: "78%", size: 12 }]}
        />
        <div className="wr">
          <Head title="Buyers Keep Coming Back" sub="Resellers, live sellers and parents on what a per-kilo haul gets them." />
          <div className="rgrid">
            {REVIEWS.map((r) => (
              <div className="rcol" key={r.n}>
                <div className="rv"><span className="qq" aria-hidden="true">”</span><Stars /><blockquote>“{r.q}”</blockquote></div>
                <div className="who2"><span className="av" style={{ background: r.bg }}>{r.i}</span><div><b>{r.n}</b><small>{r.r}</small></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="faq">
        <Fx rays={[{ x: "50%", y: "0%", size: "1800px", o: 0.22, warm: true }]} glows={[{ x: "50%", y: "0%", size: "800px", c: "rgba(255,255,255,.9)" }]} glints={[{ x: "8%", y: "12%", size: 14, c: "#FFC94A" }, { x: "93%", y: "40%", size: 12, c: "#8EC2FF" }]} />
        <div className="wr">
          <Head title="Before Your First Haul" />
          <div className="qbar">
            <div className="q"><span className="qm">?</span><div><h3>Do you ship<br />nationwide?</h3><p>Yes. Ask for a quote based on weight and destination.</p></div></div>
            <div className="q"><span className="qm">?</span><div><h3>Are all toys<br />brand-new?</h3><p>UK stock is preloved.<br />China stock is brand-new.</p></div></div>
            <div className="q"><span className="qm">?</span><div><h3>Can I visit the<br />warehouse?</h3><p>Yes. Walk-ins are welcome Monday through Saturday.</p></div></div>
          </div>
          <div className="more-q">
            {FAQS.map(([q, ans]) => (
              <details className="acc" key={q}>
                <summary>{q}<span className="pm" /></summary>
                <div className="ans">{ans}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="foot" id="visit">
        <div className="wave top" />
        <img className="ftruck" id="ftruck" src={a("/v5/flat/truck.svg")} alt="" aria-hidden="true" loading="lazy" decoding="async" />
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
            <a className="btn btn-w" href={MSG} {...ext}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3C6.5 3 2.5 6.8 2.5 11.5c0 2.6 1.3 4.9 3.4 6.4V21l3.1-1.7c.9.3 1.9.4 3 .4 5.5 0 9.5-3.8 9.5-8.2S17.5 3 12 3z" fill="#fff" /><circle cx="8" cy="11.6" r="1.3" fill="#1F6BE0" /><circle cx="12" cy="11.6" r="1.3" fill="#1F6BE0" /><circle cx="16" cy="11.6" r="1.3" fill="#1F6BE0" /></svg>Message Us</a>
          </div>
        </div>
        <div className="fbase">
          <div className="wr">
            <span>Gatcahalian Subdivision, Brgy. Banay 2, Cabuyao, Laguna · WhatsApp / Viber <a href={WA} {...ext}>+63 929 378 1462</a> · <a href={`mailto:${EMAIL}`}>{EMAIL}</a></span>
            <nav><a href="#shelves">Toy Shelves</a><a href="#how">How to Buy</a><a href="#auction">Auction</a><a href="#videos">Videos</a><a href={a("/blog/")}>Blog</a><a href="#visit">Visit Us</a></nav>
            <div className="soc">
              <a href={FB_PAGE} {...ext} aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M24 12.07C24 5.44 18.63.07 12 .07S0 5.44 0 12.07c0 5.99 4.39 10.95 10.13 11.85v-8.38H7.08v-3.47h3.05V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95h-1.52c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.38C19.61 23.03 24 18.06 24 12.07z" /></svg></a>
              <a href="https://www.youtube.com/@ToyzoonaImporter" {...ext} aria-label="YouTube"><svg viewBox="0 0 24 24"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12z" /></svg></a><a href="https://www.tiktok.com/@toyzoonaimporter" {...ext} aria-label="TikTok"><svg viewBox="0 0 24 24"><path d="M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg></a><a href="https://www.linkedin.com/company/toyzoona-importer" {...ext} aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" /></svg></a>
              <a href={WA} {...ext} aria-label="WhatsApp"><svg viewBox="0 0 24 24"><path d="M12 .5A11.4 11.4 0 0 0 2.2 17.7L.6 23.5l6-1.6A11.4 11.4 0 1 0 12 .5zm0 20.8a9.4 9.4 0 0 1-4.8-1.3l-.3-.2-3.6.9 1-3.5-.2-.4A9.4 9.4 0 1 1 12 21.3zm5.2-7c-.3-.1-1.7-.8-2-.9s-.5-.1-.7.1-.8.9-.9 1.1-.3.2-.6.1a7.7 7.7 0 0 1-3.8-3.3c-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 0 0-.8.4 3.4 3.4 0 0 0-1 2.5 5.9 5.9 0 0 0 1.2 3.1 13.4 13.4 0 0 0 5.2 4.6c1.9.8 2.7.9 3.6.7a3.1 3.1 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.1-.3-.2-.6-.3z" /></svg></a>
            </div>
            <span>© 2026 Toyzoona Importer</span>
          </div>
        </div>
      </footer>

      <MotionV5 />
    </div>
  );
}
