# গজঘন্টা অনলাইন — সুপার ফাস্ট ফাইবার ব্রডব্যান্ড (Gajaghanta Online)

গজঘন্টা অনলাইন হলো দ্রুতগতির ফাইবার ব্রডব্যান্ড সার্ভিসের একটি পূর্ণাঙ্গ ওয়েবসাইট। হোম এবং কর্পোরেট ইন্টারনেট, প্যাকেজ, পেমেন্ট, রেজিস্ট্রেশন এবং যোগাযোগ—সবকিছুই বাংলায়, মোবাইল-ফার্স্ট ডিজাইনে এবং SEO-বান্ধব ভাবে তৈরি।

> Keywords: গজঘন্টা অনলাইন, ফাইবার ইন্টারনেট, ব্রডব্যান্ড, ওয়াই‑ফাই, ইন্টারনেট প্যাকেজ, রংপুর, গজঘণ্টা বাজার, ISP Bangladesh

---

## লাইভ ডেমো
- শীঘ্রই প্রকাশিত হবে (GitHub Pages/Custom Domain)

## মূল বৈশিষ্ট্য
- **মোবাইল‑ফার্স্ট রেসপনসিভ** — সকল স্ক্রীন (মোবাইল/ট্যাব/ডেস্কটপ) সাপোর্টেড
- **বাংলা UI/UX** — সমগ্র সাইট বাংলায়, উন্নত টাইপোগ্রাফি
- **দ্রুত লোডিং** — Lazy loading, ছোট অ্যাসেট, কন্ডিশনাল লোডিং
- **SEO‑রেডি** — Canonical, Open Graph, Twitter Card, Robots, Sitemap (to‑do)
- **অ্যাক্সেসিবিলিটি** — ALT টেক্সট, কন্ট্রাস্ট, কীবোর্ড‑ফ্রেন্ডলি নেভিগেশন
- **পার্টিয়াল টেমপ্লেট** — `header`, `footer`, `head` শেয়ার্ড পার্টস
- **লোকাল আইকন ফন্ট** — Font Awesome 6 Free/Brands (লোকাল ওয়েবফন্ট)

## সাইটের পেজসমূহ
- `index.html` — হোম
- `About/index.html` — সম্পর্কে
- `Service/index.html` — সার্ভিস
- `Packages/index.html` — প্যাকেজ
- `Payment/index.html` — পেমেন্ট
- `Register/index.html` — রেজিস্ট্রেশন
- `Contact/index.html` — যোগাযোগ

শেয়ার্ড পার্টস:
- `assets/header/head.html` — SEO ট্যাগ + CSS includes
- `assets/header/header.html` — হেডার/নেভিগেশন
- `assets/header/footer.html` — ফুটার

গ্লোবাল স্টাইল/স্ক্রিপ্ট:
- `assets/css/style.css` — কাস্টম UI, রেসপনসিভ, থিম ভ্যারিয়েবল
- `assets/js/Script.js` — প্রিলোডার, পার্টিয়াল লোড, ক্যাননিক্যাল/OG URL, Lazy load

## টেক স্ট্যাক
- HTML5, CSS3, JavaScript (Vanilla)
- Font Awesome 6 (লোকাল)
- কিছু ভেন্ডর লাইব্রেরি (bootstrap, wow, swiper ইত্যাদি) — প্রয়োজন অনুসারে লোড

## লোকালি রান করার নিয়ম
1. একটি লাইটওয়েট HTTP সার্ভার ব্যবহার করুন (Live Server/Node/Python):
   - VS Code Live Server এক্সটেনশন দিয়ে রুট ফোল্ডার ওপেন করে Go Live
   - অথবা
     ```bash
     # Python 3
     python -m http.server 8080
     ```
2. ব্রাউজারে খুলুন: `http://localhost:8080/`

> নোট: সরাসরি file:// দিয়ে খোলালে পার্টিয়াল লোডিং (fetch) ব্লক হতে পারে।

## ডিপ্লয় (GitHub Pages)
1. রেপো Settings → Pages → Deploy from branch → `main` → `/ (root)` নির্বাচন করুন
2. Base URL/Canonical সঠিক রাখতে কাস্টম ডোমেইন ব্যবহার করুন

## SEO চেকলিস্ট
- **Meta title/description**: `assets/header/head.html` এ সেট করা আছে
- **Canonical URL**: `assets/js/Script.js` রানটাইমে সেট করে
- **Open Graph/Twitter**: `head.html` এ প্রি‑কনফিগার্ড
- **Robots/Sitemap**: রুটে `robots.txt` ও `sitemap.xml` যোগ করার পরামর্শ
- **কনটেন্ট**: প্রত্যেক পেজে ইউনিক টাইটেল/হেডিং/কন্টেন্ট রাখুন
- **Performance**: ইমেজ `loading="lazy"` এবং `decoding="async"` ব্যবহার হচ্ছে
- **Accessibility**: সব ইমেজে অর্থবহ `alt` দিন; লিঙ্ক‑নামে প্রসঙ্গ যুক্ত করুন

### প্রস্তাবিত `robots.txt`
```txt
User-agent: *
Allow: /
Sitemap: https://YOUR-DOMAIN/sitemap.xml
```

### প্রস্তাবিত `sitemap.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://YOUR-DOMAIN/</loc></url>
  <url><loc>https://YOUR-DOMAIN/About/</loc></url>
  <url><loc>https://YOUR-DOMAIN/Service/</loc></url>
  <url><loc>https://YOUR-DOMAIN/Packages/</loc></url>
  <url><loc>https://YOUR-DOMAIN/Payment/</loc></url>
  <url><loc>https://YOUR-DOMAIN/Register/</loc></url>
  <url><loc>https://YOUR-DOMAIN/Contact/</loc></url>
  <lastmod>$DATE</lastmod>
</urlset>
```

## পারফরম্যান্স টিপস
- বড় ইমেজগুলিকে উপযুক্ত সাইজে এক্সপোর্ট করুন (WebP/AVIF হলে ভালো)
- অনব্যবহৃত ভেন্ডর CSS/JS সরিয়ে দিন অথবা পেজ‑ভিত্তিক লোড করুন
- CSS/JS মিনিফাই/কম্প্রেস করুন (GitHub Actions/Build step)

## কন্ট্রিবিউশন
PR/Issue স্বাগত। বাংলা‑প্রথম অভিজ্ঞতা ধরে রেখে উন্নয়ন করুন।

## লাইসেন্স
এই ওয়েবসাইটের কোড ওপেন সোর্স (যদি আপনি একটি লাইসেন্স নির্বাচন করেন—MIT/BSD/Apache)।

## যোগাযোগ
- ইমেইল: `gajaghantaonline@gmail.com`
- ফোন: `+880 1988 084009`, `+880 9638 268644`

---

> এই README সার্চ‑ইঞ্জিন ফ্রেন্ডলি হেডিং, কীওয়ার্ড, অভ্যন্তরীণ লিংক এবং প্রাসঙ্গিক কনটেন্ট বজায় রেখে লেখা হয়েছে—যাতে GitHub/Google‑এ প্রকল্পটি সহজে খুঁজে পাওয়া যায়।
