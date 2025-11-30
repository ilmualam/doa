/**
 * HIMPUNAN DOA HARIAN - Interactive Tool v2.0
 * ilmualam.com - Domain Protected
 */
(function() {
    'use strict';
    
    // Domain Protection
    const ALLOWED = ['ilmualam.com','blogger.com','localhost'];
    if (!ALLOWED.some(d => window.location.hostname.includes(d))) {
        document.getElementById('duaToolContainer').innerHTML = 
            '<div style="padding:2rem;background:#fff3cd;border:2px solid #856404;border-radius:8px;text-align:center;">' +
            '<h3 style="color:#856404;">⚠️ Tool ini hanya untuk www.ilmualam.com</h3></div>';
        return;
    }

    // Dua Database (50+ structure, 15 included)
    const DUAS = [
        {id:1,cat:'pagi',title:'Doa Bangun Tidur',ar:'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',rum:'Alhamdu lillahil-ladzi ahyaanaa ba\'da maa amaatanaa wa ilaihin-nusyuur',mean:'Segala puji bagi Allah yang menghidupkan kami selepas mematikan kami, dan kepada-Nya kami dibangkitkan.',ref:'Bukhari 6312, Muslim 2711',kw:['bangun','tidur','pagi']},
        {id:2,cat:'pagi',title:'Doa Pagi',ar:'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا',rum:'Allahumma inni as-aluka \'ilman naafi\'an wa rizqan thayyiban wa \'amalan mutaqabbalan',mean:'Ya Allah, aku mohon ilmu bermanfaat, rezeki baik, amalan diterima.',ref:'Ibnu Majah 925',kw:['pagi','ilmu','rezeki']},
        {id:3,cat:'makan',title:'Bismillah',ar:'بِسْمِ اللَّهِ',rum:'Bismillah',mean:'Dengan nama Allah.',ref:'Bukhari 5376, Muslim 2017',kw:['makan','bismillah']},
        {id:4,cat:'makan',title:'Doa Selepas Makan',ar:'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',rum:'Alhamdu lillahil-ladzi ath\'amanaa wa saqaanaa wa ja\'alanaa muslimiin',mean:'Segala puji bagi Allah yang memberi makan, minum, jadikan kami Muslim.',ref:'Abu Daud 3850',kw:['makan','syukur']},
        {id:5,cat:'tandas',title:'Doa Masuk Tandas',ar:'بِسْمِ اللَّهِ اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',rum:'Bismillah, Allahumma inni a\'uudzu bika minal-khubutsi wal-khabaa-its',mean:'Dengan nama Allah. Ya Allah, aku berlindung dari syaitan jantan dan betina.',ref:'Bukhari 142, Muslim 375',kw:['tandas','toilet','wc']},
        {id:6,cat:'tandas',title:'Doa Keluar Tandas',ar:'غُفْرَانَكَ',rum:'Ghufraanak',mean:'Aku mohon pengampunan-Mu.',ref:'Abu Daud 30, Tirmidzi 7',kw:['tandas','keluar']},
        {id:7,cat:'rumah',title:'Doa Keluar Rumah',ar:'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',rum:'Bismillah, tawakkaltu \'alallah, wa laa hawla wa laa quwwata illaa billah',mean:'Dengan nama Allah, aku bertawakkal pada Allah, tiada daya dan kekuatan melainkan dengan Allah.',ref:'Abu Daud 5095, Tirmidzi 3426',kw:['keluar','rumah']},
        {id:8,cat:'rumah',title:'Doa Masuk Rumah',ar:'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلَجِ وَخَيْرَ الْمَخْرَجِ',rum:'Allahumma inni as-aluka khairal-mawlaji wa khairal-makhraji',mean:'Ya Allah, aku mohon kebaikan tempat masuk dan keluar.',ref:'Abu Daud 5096',kw:['masuk','rumah']},
        {id:9,cat:'masjid',title:'Doa Masuk Masjid',ar:'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',rum:'Allahummaf-tah lii abwaaba rahmatik',mean:'Ya Allah, bukakan pintu-pintu rahmat-Mu.',ref:'Muslim 713',kw:['masjid','masuk']},
        {id:10,cat:'masjid',title:'Doa Keluar Masjid',ar:'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ',rum:'Allahumma innii as-aluka min fadhlika',mean:'Ya Allah, aku mohon kurnia-Mu.',ref:'Muslim 713',kw:['masjid','keluar']},
        {id:11,cat:'tidur',title:'Doa Sebelum Tidur',ar:'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',rum:'Bismika Allahumma amuutu wa ahyaa',mean:'Dengan nama-Mu ya Allah aku mati dan hidup.',ref:'Bukhari 6314',kw:['tidur','malam']},
        {id:12,cat:'kenderaan',title:'Doa Naik Kenderaan',ar:'بِسْمِ اللَّهِ سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا',rum:'Bismillah, Subhaanal-ladzi sakhkhara lanaa haadzaa',mean:'Dengan nama Allah. Maha Suci yang menundukkan kenderaan ini untuk kami.',ref:'Abu Daud 2602',kw:['kereta','kenderaan','naik']},
        {id:13,cat:'perlindungan',title:'Doa Perlindungan',ar:'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',rum:'A\'uudzu bi kalimaatil-laahit-taammaati min syarri maa khalaq',mean:'Aku berlindung dengan kalimah Allah yang sempurna dari kejahatan makhluk.',ref:'Muslim 2708',kw:['perlindungan','bahaya']},
        {id:14,cat:'belajar',title:'Doa Sebelum Belajar',ar:'اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي',rum:'Allahummanfa\'nii bimaa \'allamtanii',mean:'Ya Allah, berilah manfaat dengan apa yang Engkau ajarkan.',ref:'Ibnu Majah 251',kw:['belajar','ilmu']},
        {id:15,cat:'sakit',title:'Doa Ketika Sakit',ar:'اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ',rum:'Allahumma Rabban-naas, adzhhibil-ba\'s',mean:'Ya Allah Tuhan manusia, hilangkan penyakit.',ref:'Bukhari 5743, Muslim 2191',kw:['sakit','sembuh']}
    ];

    const CAT = {
        pagi:{n:'Pagi & Petang',i:'🌅',c:'#FF6B6B'},
        makan:{n:'Makanan',i:'🍽️',c:'#4ECDC4'},
        tandas:{n:'Tandas',i:'🚿',c:'#95E1D3'},
        rumah:{n:'Rumah',i:'🏠',c:'#FFD93D'},
        masjid:{n:'Masjid',i:'🕌',c:'#6BCB77'},
        tidur:{n:'Tidur',i:'🛌',c:'#A8E6CF'},
        kenderaan:{n:'Kenderaan',i:'🚗',c:'#FFDAC1'},
        perlindungan:{n:'Perlindungan',i:'🛡️',c:'#C7CEEA'},
        belajar:{n:'Belajar',i:'📚',c:'#FFB6B9'},
        sakit:{n:'Kesihatan',i:'💊',c:'#FAE3D9'}
    };

    // State
    class State {
        constructor() {
            this.bookmarks = JSON.parse(localStorage.getItem('duaBookmarks')||'[]');
            this.progress = JSON.parse(localStorage.getItem('duaProgress')||'{}');
            this.filter = 'all';
            this.search = '';
        }
        toggleBookmark(id) {
            const i = this.bookmarks.indexOf(id);
            i>-1 ? this.bookmarks.splice(i,1) : this.bookmarks.push(id);
            localStorage.setItem('duaBookmarks',JSON.stringify(this.bookmarks));
        }
        markLearned(id) {
            this.progress[id] = {learned:true, time:new Date().toISOString()};
            localStorage.setItem('duaProgress',JSON.stringify(this.progress));
        }
        stats() {
            return {
                total: DUAS.length,
                learned: Object.keys(this.progress).filter(k=>this.progress[k].learned).length,
                bookmarked: this.bookmarks.length
            };
        }
    }
    const state = new State();

    // Render
    function render() {
        const stats = state.stats();
        const pct = Math.round((stats.learned/stats.total)*100);
        
        let filtered = DUAS;
        if (state.filter!=='all' && state.filter!=='bookmarks') {
            filtered = DUAS.filter(d => d.cat===state.filter);
        }
        if (state.filter==='bookmarks') {
            filtered = DUAS.filter(d => state.bookmarks.includes(d.id));
        }
        if (state.search) {
            const q = state.search.toLowerCase();
            filtered = filtered.filter(d => 
                d.title.toLowerCase().includes(q) || 
                d.rum.toLowerCase().includes(q) ||
                d.kw.some(k => k.includes(q))
            );
        }

        const html = `
<div class="dua-tool" style="font-family:system-ui,-apple-system,sans-serif;">
    <div style="background:linear-gradient(135deg,#667eea,#764ba2);padding:2rem;border-radius:12px 12px 0 0;color:#fff;">
        <h2 style="margin:0 0 1rem 0;">🤲 Tool Doa Harian Interaktif</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:1rem;">
            <div style="background:rgba(255,255,255,.2);padding:1rem;border-radius:8px;text-align:center;">
                <div style="font-size:2rem;font-weight:700;">${stats.total}</div>
                <div style="font-size:.9rem;opacity:.9;">Jumlah Doa</div>
            </div>
            <div style="background:rgba(255,255,255,.2);padding:1rem;border-radius:8px;text-align:center;">
                <div style="font-size:2rem;font-weight:700;">${stats.learned}</div>
                <div style="font-size:.9rem;opacity:.9;">Dipelajari</div>
            </div>
            <div style="background:rgba(255,255,255,.2);padding:1rem;border-radius:8px;text-align:center;">
                <div style="font-size:2rem;font-weight:700;">${stats.bookmarked}</div>
                <div style="font-size:.9rem;opacity:.9;">Bookmark</div>
            </div>
            <div style="background:rgba(255,255,255,.2);padding:1rem;border-radius:8px;text-align:center;">
                <div style="font-size:2rem;font-weight:700;">${pct}%</div>
                <div style="font-size:.9rem;opacity:.9;">Progress</div>
            </div>
        </div>
    </div>
    
    <div style="background:#f8f9fa;padding:1.5rem;border-bottom:2px solid #e9ecef;">
        <input type="text" id="duaSearch" placeholder="🔍 Cari doa..." 
            style="width:100%;padding:.8rem 1rem;border:2px solid #dee2e6;border-radius:8px;font-size:1rem;margin-bottom:1rem;"/>
        <div style="display:flex;gap:.5rem;flex-wrap:wrap;">
            <button onclick="filterDuas('all')" class="fbtn" data-f="all" 
                style="padding:.5rem 1rem;border:2px solid #249749;background:#249749;color:#fff;border-radius:20px;cursor:pointer;font-weight:600;">
                Semua
            </button>
            ${Object.entries(CAT).map(([k,v])=>`
                <button onclick="filterDuas('${k}')" class="fbtn" data-f="${k}"
                    style="padding:.5rem 1rem;border:2px solid ${v.c};background:#fff;color:${v.c};border-radius:20px;cursor:pointer;font-weight:600;">
                    ${v.i} ${v.n}
                </button>
            `).join('')}
            <button onclick="filterDuas('bookmarks')" class="fbtn" data-f="bookmarks"
                style="padding:.5rem 1rem;border:2px solid #ff6b6b;background:#fff;color:#ff6b6b;border-radius:20px;cursor:pointer;font-weight:600;">
                ⭐ Bookmark
            </button>
        </div>
    </div>
    
    <div id="duaCards" style="padding:1.5rem;background:#fff;">
        ${filtered.length ? filtered.map(renderCard).join('') : '<p style="text-align:center;padding:3rem;color:#6c757d;">Tiada doa dijumpai</p>'}
    </div>
</div>`;
        
        document.getElementById('duaToolContainer').innerHTML = html;
        document.getElementById('duaSearch').addEventListener('input', e => {
            state.search = e.target.value;
            render();
        });
    }

    function renderCard(d) {
        const cat = CAT[d.cat];
        const isB = state.bookmarks.includes(d.id);
        const isL = state.progress[d.id]?.learned;
        
        return `
<div style="background:#fff;border:2px solid #e9ecef;border-left:5px solid ${cat.c};border-radius:12px;padding:1.5rem;margin-bottom:1.5rem;box-shadow:0 2px 8px rgba(0,0,0,.08);">
    <div style="display:flex;justify-content:space-between;margin-bottom:1rem;">
        <div>
            <span style="background:${cat.c};color:#fff;padding:.3rem .8rem;border-radius:15px;font-size:.85rem;font-weight:600;">
                ${cat.i} ${cat.n}
            </span>
            <h3 style="margin:.5rem 0;color:#2d3748;font-size:1.2rem;">${d.title}</h3>
        </div>
        <div style="display:flex;gap:.5rem;">
            <button onclick="toggleBookmark(${d.id})" 
                style="background:${isB?'#ffd700':'#f8f9fa'};border:none;padding:.5rem .8rem;border-radius:8px;cursor:pointer;font-size:1.3rem;">
                ${isB?'⭐':'☆'}
            </button>
            <button onclick="markLearned(${d.id})"
                style="background:${isL?'#10b981':'#f8f9fa'};color:${isL?'#fff':'#6c757d'};border:none;padding:.5rem .8rem;border-radius:8px;cursor:pointer;font-size:.9rem;font-weight:600;">
                ${isL?'✓':'Mark'}
            </button>
        </div>
    </div>
    <div style="background:#faf9f7;padding:1.5rem;border-radius:8px;margin-bottom:1rem;text-align:right;direction:rtl;">
        <p style="font-size:1.8rem;line-height:2.5;color:#0c3808;font-family:'Traditional Arabic',serif;margin:0;">${d.ar}</p>
    </div>
    <div style="background:#e8f5e9;padding:1rem;border-radius:8px;margin-bottom:1rem;">
        <p style="font-size:1.1rem;font-style:italic;color:#1a5a1a;margin:0;"><strong>Rumi:</strong> ${d.rum}</p>
    </div>
    <p style="color:#4a5568;margin-bottom:1rem;"><strong>Maksud:</strong> ${d.mean}</p>
    <div style="background:#fff3cd;padding:.8rem 1rem;border-radius:8px;">
        <p style="margin:0;font-size:.9rem;color:#856404;font-weight:600;">📚 ${d.ref}</p>
    </div>
</div>`;
    }

    // Global functions
    window.filterDuas = function(f) {
        state.filter = f;
        document.querySelectorAll('.fbtn').forEach(b => {
            const isActive = b.dataset.f === f;
            const color = f==='all'?'#249749':(f==='bookmarks'?'#ff6b6b':CAT[f]?.c||'#666');
            b.style.background = isActive ? color : '#fff';
            b.style.color = isActive ? '#fff' : color;
        });
        render();
    };

    window.toggleBookmark = function(id) {
        state.toggleBookmark(id);
        render();
    };

    window.markLearned = function(id) {
        state.markLearned(id);
        render();
    };

    // Init
    if (document.readyState==='loading') {
        document.addEventListener('DOMContentLoaded', render);
    } else {
        render();
    }
})();
