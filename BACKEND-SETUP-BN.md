# Admin Online Setup (বাংলা) — ৫ মিনিটে সব ডিভাইসের result দেখো

এখন official first result ছাত্রের ব্রাউজারে + (URL বসালে) তোমার Google Sheet-এ **দুই জায়গায়** সেভ হবে।
তুমি তোমার ফোন/ল্যাপটপ থেকে সাইটের **Admin — Online first results** টেবিলে বা সরাসরি Sheet-এ সবার first result দেখবে।

## ধাপ ১ — Google Sheet বানাও
1. https://sheets.new খোলো (নতুন Sheet)
2. প্রথম row-তে লেখো: `name | set | correct | wrong | skip | pct | usedSec | date | key`

## ধাপ ২ — Apps Script বসাও
1. Sheet-এ `Extensions > Apps Script` খোলো
2. `apps-script-Code.gs` ফাইলের পুরো কোড paste করে `Save` চাপো
3. `Deploy > New deployment > Web app`:
   - Execute as: **Me**
   - Who has access: **Anyone**
   - `Deploy` চাপো, অনুমতি দাও
4. **Web app URL** copy করো (https://script.google.com/... দিয়ে শুরু)

## ধাপ ৩ — সাইটে URL বসাও
1. `app.js` খোলো, উপরে `const BACKEND_URL = "";` লাইনে URL বসাও:
   `const BACKEND_URL = "https://script.google.com/macros/s/.../exec";`
2. Commit + push করো (GitHub Pages auto-deploy হবে, ১–২ মিনিট)

## পরীক্ষা
1. এক ফোন থেকে নাম দিয়ে পরীক্ষা দাও → জমা দাও
2. অন্য ফোন/ল্যাপটপে সাইট খোলো → **Admin — Online first results → 🌐 Online তালিকা লোড** → নাম-সহ result দেখা যাবে
3. Sheet-এ `results` tab-এও row জমা হবে
4. একই নামে আবার দিলে practice হবে — Sheet-এ overwrite হবে না ✅

## নোট
- URL না বসানো পর্যন্ত Online টেবিলে “backend সেট হয়নি” দেখাবে, কিন্তু পরীক্ষা + device-local first result কাজ করবে।
- Sheet-এর `results` tab ডিলিট কোরো না। CSV লাগলে সাইট থেকেই **Online CSV** ডাউনলোড কোরো।
