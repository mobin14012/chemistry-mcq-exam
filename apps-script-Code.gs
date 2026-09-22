/*************************************************
 * SSC Chemistry MCQ — Online first-result backend
 * Google Sheet + Apps Script (FREE, 5-minute setup)
 *
 * 1. https://sheets.new দিয়ে নতুন Google Sheet খোলো
 *    প্রথম row-তে header লেখো:
 *    name | set | correct | wrong | skip | pct | usedSec | date | key
 * 2. Extensions > Apps Script > এই পুরো ফাইল paste করো > Save
 * 3. Deploy > New deployment > type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    - Deploy > Web app URL copy করো
 * 4. app.js-এ const BACKEND_URL = "এখানে-URL-বসাও" করে push করো
 *
 * Rule enforced here too: only FIRST result per (name+set) is kept.
 *************************************************/

const SHEET_NAME = "results"; // তোমার sheet/tab এর নাম (না থাকলে auto তৈরি হবে)

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(["name", "set", "correct", "wrong", "skip", "pct", "usedSec", "date", "key"]);
  }
  if (sh.getLastRow() === 0) sh.appendRow(["name", "set", "correct", "wrong", "skip", "pct", "usedSec", "date", "key"]);
  return sh;
}

function norm_(s) { return String(s || "").trim().toLowerCase(); }

function doPost(e) {
  try {
    const b = JSON.parse(e.postData.contents || "{}");
    if (b.action !== "save") return out_({ ok: false, error: "bad-action" });
    const name = String(b.name || "নাম ছাড়া").slice(0, 60);
    const set = Number(b.set) || 0;
    const key = "set" + set + "__" + norm_(name);
    const sh = getSheet_();
    // first-result rule: same key already exists -> do NOT overwrite
    const vals = sh.getDataRange().getValues();
    for (let i = 1; i < vals.length; i++) {
      if (String(vals[i][8] || "") === key) {
        return out_({ ok: true, saved: false, reason: "already-exists" });
      }
    }
    sh.appendRow([
      name, set,
      Number(b.correct) || 0, Number(b.wrong) || 0, Number(b.skip) || 0,
      Number(b.pct) || 0, Number(b.usedSec) || 0,
      String(b.date || new Date().toISOString()), key
    ]);
    return out_({ ok: true, saved: true });
  } catch (err) {
    return out_({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  try {
    const sh = getSheet_();
    const vals = sh.getDataRange().getValues();
    const rows = [];
    for (let i = 1; i < vals.length; i++) {
      const r = vals[i];
      if (!r[0] && !r[8]) continue;
      rows.push({ name: r[0], set: r[1], correct: r[2], wrong: r[3], skip: r[4], pct: r[5], usedSec: r[6], date: r[7] });
    }
    return out_({ ok: true, rows: rows });
  } catch (err) {
    return out_({ ok: false, error: String(err) });
  }
}

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
