# GameMod Hub

Aplikasi desktop pengelola mod game (Electron + React + TypeScript). Implementasi asli dengan nama,
kode, dan aset sendiri; tidak memakai kode, aset, atau server pihak ketiga.

Halaman: Login lokal, Home, My games, Library (cari + filter genre), halaman Game (daftar mod,
toggle/slider, Enable/Disable all), Customize (tema, aksen, daftar ringkas), Settings (bahasa id/en,
notifikasi, tray, reset), dan Overlay (`#/overlay`).

Mod bersifat **simulasi**: hanya menyimpan status di komputer Anda dan tidak menyentuh game apa pun.

## Menjalankan
```
npm install
npm run dev        # web, http://localhost:5173
npm test           # 9 tes
npm run electron   # build + jalankan jendela Electron
```
