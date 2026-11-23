/**
 * ORMAFEST 2026 - API Passport (Google Apps Script)
 *
 * Melayani 3 permintaan untuk website:
 *   ?action=leaderboard          -> top 3 maba/miba dengan kunjungan booth terbanyak
 *   ?action=fair&nim=...         -> jumlah booth OrmaFair yang sudah dikunjungi satu NIM
 *   ?action=explore&nim=...      -> ormawa dan sesi OrmaExplore milik satu NIM
 *
 * CARA PASANG
 * 1. Buka Google Spreadsheet yang berisi respons Google Form, lalu Extensions > Apps Script.
 * 2. Tempel seluruh kode ini, lalu sesuaikan bagian KONFIGURASI (nama sheet dan judul kolom).
 * 3. Deploy > New deployment > Web app.
 *    Execute as: Me   |   Who has access: Anyone
 * 4. Salin URL web app (berakhiran /exec) ke konstanta API di script.js website.
 * 5. Setiap mengubah kode, buat deployment baru (Manage deployments > Edit > New version).
 */

// ================== KONFIGURASI ==================
const SHEET_ID = '';                       // kosongkan bila script dibuka dari dalam spreadsheet
const SHEET_FAIR = 'Presensi OrmaFair';    // sheet respons form presensi booth
const SHEET_EXPLORE = 'Pilihan OrmaExplore'; // sheet hasil pembagian ormawa OrmaExplore
const TOTAL_BOOTH = 53;
const MASK_LEADERBOARD = false;            // true = nama di leaderboard disamarkan (Ra*** Wi****)

// Judul kolom HARUS sama persis dengan baris pertama sheet (judul pertanyaan Google Form).
const FAIR_COLS = { time: 'Timestamp', nim: 'NIM', nama: 'Nama', booth: 'Kode Booth' };
// OrmaExplore: satu baris = satu ormawa pilihan seorang maba/miba (4 baris per NIM).
const EXPLORE_COLS = { nim: 'NIM', nama: 'Nama', kategori: 'Kategori', ormawa: 'Ormawa', sesi: 'Sesi' };
// =================================================

function doGet(e) {
  const p = (e && e.parameter) || {};
  let out;
  try {
    if (p.action === 'leaderboard') out = leaderboard();
    else if (p.action === 'fair') out = fairByNim(p.nim);
    else if (p.action === 'explore') out = exploreByNim(p.nim);
    else out = { status: 'error', message: 'action tidak dikenal' };
  } catch (err) {
    out = { status: 'error', message: String(err) };
  }
  return ContentService.createTextOutput(JSON.stringify(out))
    .setMimeType(ContentService.MimeType.JSON);
}

function rows_(name, cols) {
  const ss = SHEET_ID ? SpreadsheetApp.openById(SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(name);
  if (!sh) throw new Error('Sheet tidak ditemukan: ' + name);
  const v = sh.getDataRange().getValues();
  const head = v.shift().map(String);
  const idx = {};
  Object.keys(cols).forEach(function (k) {
    idx[k] = head.indexOf(cols[k]);
    if (idx[k] < 0 && k !== 'time') throw new Error('Kolom tidak ditemukan: ' + cols[k]);
  });
  return v.map(function (r) {
    const o = {};
    Object.keys(idx).forEach(function (k) { o[k] = idx[k] < 0 ? '' : r[idx[k]]; });
    return o;
  });
}

const nimKey_ = function (x) { return String(x).replace(/\D/g, ''); };

function mask_(name) {
  return String(name).split(' ').map(function (w) {
    return w.slice(0, 2) + new Array(Math.max(1, w.length - 2) + 1).join('*');
  }).join(' ');
}

// Hitung booth unik per NIM (satu booth hanya dihitung sekali), di-cache 30 detik.
function visits_() {
  const cache = CacheService.getScriptCache();
  const hit = cache.get('visits');
  if (hit) return JSON.parse(hit);
  const map = {};
  rows_(SHEET_FAIR, FAIR_COLS).forEach(function (r) {
    const n = nimKey_(r.nim), b = String(r.booth).trim().toUpperCase();
    if (!n || !b) return;
    const m = map[n] || (map[n] = {
      nama: String(r.nama).trim(), b: {}, t: 0
    });
    if (!m.b[b]) { m.b[b] = 1; m.t = new Date(r.time).getTime() || 0; }
  });
  const list = Object.keys(map).map(function (n) {
    return { n: n, nama: map[n].nama, c: Object.keys(map[n].b).length, t: map[n].t };
  });
  try { cache.put('visits', JSON.stringify(list), 30); } catch (e) {}
  return list;
}

// Urutan: kunjungan terbanyak; bila seri, yang lebih dulu mencapai jumlah itu menang.
function sorted_() {
  return visits_().sort(function (a, b) { return b.c - a.c || a.t - b.t; });
}

function leaderboard() {
  const l = sorted_();
  const f = function (o) { return { nama: MASK_LEADERBOARD ? mask_(o.nama) : o.nama, jumlah: o.c }; };
  return { status: 'ok', top: l.slice(0, 3).map(f), updated: new Date().toISOString() };
}

function fairByNim(nim) {
  const n = nimKey_(nim);
  if (!n) return { status: 'notfound' };
  const o = visits_().filter(function (x) { return x.n === n; })[0];
  if (!o) return { status: 'notfound' };
  return { status: 'ok', nama: mask_(o.nama), visited: o.c, total: TOTAL_BOOTH };
}

function exploreByNim(nim) {
  const n = nimKey_(nim);
  if (!n) return { status: 'notfound' };
  const mine = rows_(SHEET_EXPLORE, EXPLORE_COLS).filter(function (r) { return nimKey_(r.nim) === n; });
  if (!mine.length) return { status: 'notfound' };
  return {
    status: 'ok',
    nama: mask_(mine[0].nama),
    pilihan: mine.map(function (r) {
      return {
        kategori: String(r.kategori).trim(),
        ormawa: String(r.ormawa).trim(),
        sesi: Number(String(r.sesi).replace(/\D/g, '')) || 0
      };
    })
  };
}
