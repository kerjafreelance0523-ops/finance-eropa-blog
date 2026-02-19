# Pengecekan Paket Deprecated – tailwind-nextjs-starter-blog

**Tanggal:** 2025-02-19  
**Sumber:** Context7 + web search  
**Lokasi clone:** `sites/europa/tailwind-nextjs-starter-blog/`

---

## Status Repo

- **Clone:** Berhasil dari `https://github.com/timlrx/tailwind-nextjs-starter-blog`
- **Versi template:** 2.4.0 (README: v2.4.0 Latest Mar 31, 2025)
- **Stack:** Next.js 15, React 19, Tailwind CSS v4, Contentlayer2, MDX

---

## Ringkasan Paket

| Paket | Versi di package.json | Status | Catatan |
|-------|------------------------|--------|---------|
| **contentlayer2** | 0.5.8 | ✅ OK | Fork maintained (timlrx); pengganti Contentlayer yang sudah tidak aktif. Bukan deprecated. |
| **next-contentlayer2** | 0.5.8 | ✅ OK | Satu ekosistem dengan contentlayer2. |
| **next** | 15.5.12 | ✅ OK | Terbaru. |
| **react** / **react-dom** | 19.2.4 | ✅ OK | Terbaru. |
| **tailwindcss** | ^4.1.18 | ✅ OK | Tailwind v4. |
| **@tailwindcss/postcss** | ^4.1.18 | ✅ OK | Wajib untuk Tailwind v4. |
| **@tailwindcss/forms** | ^0.5.11 | ✅ OK | Masih dipakai di v4 (bukan built-in). |
| **@tailwindcss/typography** | ^0.5.19 | ✅ OK | Masih dipakai di v4 (bukan built-in). |
| **next-themes** | ^0.4.6 | ✅ OK | Sudah ada perbaikan kompatibilitas React 19 (children prop). |
| **rehype-prism-plus** | ^2.0.2 | ✅ OK | Aktif, v2.0.0+ (Jan 2024). |
| **pliny** | 0.4.1 | ⚠️ Perhatian | Bukan deprecated; pernah ada isu ESM/next script. Dari author yang sama (timlrx); template ini menggunakannya. |
| **gray-matter** | ^4.0.3 | ✅ OK | Umum dipakai, tidak deprecated. |
| **remark** / **rehype** (unified) | various | ✅ OK | Ecosystem aktif. |

---

## Yang Bukan Deprecated

- **Contentlayer asli** sudah tidak aktif; repo ini pakai **contentlayer2** (fork maintained) — tidak perlu ganti.
- **@tailwindcss/forms** dan **@tailwindcss/typography** di v4 tetap plugin terpisah (belum built-in), masih didukung.
- **next-themes** kompatibel React 19 setelah perbaikan types.
- **rehype-prism-plus** masih dirawat (termasuk oleh timlrx).

---

## Rekomendasi

1. **Tidak ada paket deprecated yang wajib diganti.** Stack sudah modern (Next 15, React 19, Tailwind v4, Contentlayer2).
2. **Pliny:** Jika nanti ada error terkait ESM/next (mis. `next/script`, `next/dynamic`), cek issue di [timlrx/pliny](https://github.com/timlrx/pliny); biasanya sudah ada workaround atau fix.
3. **Lockfile:** Setelah clone, jalankan install dengan package manager yang dipakai di repo:
   - `yarn` (disarankan, ada `"packageManager": "yarn@3.6.1"`).
   - Atau `pnpm install` hanya setelah mengubah/ menghapus `packageManager` di `package.json` jika ingin pakai pnpm.

---

## Lokasi Folder (Europa)

```
blog/finance/sites/europa/
├── tailwind-nextjs-starter-blog/   ← clone ini (isi penuh repo)
│   ├── app/
│   ├── components/
│   ├── contentlayer.config.ts
│   ├── data/
│   ├── package.json
│   └── ...
└── (folder lain di europa jika ada)
```

---

*Dibuat oleh pengecekan otomatis (Context7 + web search).*
