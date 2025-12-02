/**
 * DOA HARIAN TOOL v2.0 - ilmualam.com
 * Tested & Working
 */
(function() {
    'use strict';

    // Database
    const DUAS = [
        {id:1,cat:'pagi',title:'Doa Bangun Tidur',ar:'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',rumi:'Alhamdu lillahil-ladzi ahyaanaa ba\'da maa amaatanaa wa ilaihin-nusyuur',maksud:'Segala puji bagi Allah yang menghidupkan kami selepas mematikan kami.',hadis:'Bukhari 6312, Muslim 2711',kata:['bangun','tidur','pagi']},
        {id:2,cat:'pagi',title:'Doa Pagi',ar:'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا وَرِزْقًا طَيِّبًا وَعَمَلًا مُتَقَبَّلًا',rumi:'Allahumma inni as-aluka ilman naafian wa rizqan thayyiban wa amalan mutaqabbalan',maksud:'Ya Allah, aku mohon ilmu bermanfaat, rezeki baik, amalan diterima.',hadis:'Ibnu Majah 925',kata:['pagi','ilmu','rezeki']},
        {id:3,cat:'makan',title:'Bismillah',ar:'بِسْمِ اللَّهِ',rumi:'Bismillah',maksud:'Dengan nama Allah.',hadis:'Bukhari 5376, Muslim 2017',kata:['makan','sebelum']},
        {id:4,cat:'makan',title:'Doa Selepas Makan',ar:'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',rumi:'Alhamdu lillahil-ladzi athaamanaa wa saqaanaa wa jajalanaa muslimiin',maksud:'Segala puji bagi Allah yang memberi makan, minum, jadikan kami Muslim.',hadis:'Abu Daud 3850',kata:['makan','selepas']},
        {id:5,cat:'tandas',title:'Doa Masuk Tandas',ar:'بِسْمِ اللَّهِ اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',rumi:'Bismillah, Allahumma inni auudzu bika minal khubutsi wal khabaits',maksud:'Ya Allah, aku berlindung dari syaitan.',hadis:'Bukhari 142, Muslim 375',kata:['tandas','toilet']},
        {id:6,cat:'tandas',title:'Doa Keluar Tandas',ar:'غُفْرَانَكَ',rumi:'Ghufraanak',maksud:'Aku mohon pengampunan-Mu.',hadis:'Abu Daud 30',kata:['tandas','keluar']},
        {id:7,cat:'rumah',title:'Doa Keluar Rumah',ar:'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ',rumi:'Bismillah, tawakkaltu alallah',maksud:'Dengan nama Allah, aku bertawakkal pada Allah.',hadis:'Abu Daud 5095',kata:['keluar','rumah']},
        {id:8,cat:'rumah',title:'Doa Masuk Rumah',ar:'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلَجِ',rumi:'Allahumma inni asaluka khairal mawlaj',maksud:'Ya Allah, aku mohon kebaikan tempat masuk.',hadis:'Abu Daud 5096',kata:['masuk','rumah']},
        {id:9,cat:'masjid',title:'Doa Masuk Masjid',ar:'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',rumi:'Allahummaftah lii abwaaba rahmatik',maksud:'Ya Allah, bukakan pintu rahmat-Mu.',hadis:'Muslim 713',kata:['masjid','masuk']},
        {id:10,cat:'masjid',title:'Doa Keluar Masjid',ar:'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ',rumi:'Allahumma innii asaluka min fadhlika',maksud:'Ya Allah, aku mohon kurnia-Mu.',hadis:'Muslim 713',kata:['masjid','keluar']},
        {id:11,cat:'tidur',title:'Doa Tidur',ar:'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',rumi:'Bismika Allahumma amuutu wa ahyaa',maksud:'Dengan nama-Mu ya Allah aku mati dan hidup.',hadis:'Bukhari 6314',kata:['tidur','malam']},
        {id:12,cat:'kenderaan',title:'Doa Naik Kenderaan',ar:'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا',rumi:'Subhaanal ladzi sakhkhara lanaa haadzaa',maksud:'Maha Suci yang tundukkan kenderaan ini.',hadis:'Abu Daud 2602',kata:['kereta','naik']},
        {id:13,cat:'lindung',title:'Doa Perlindungan',ar:'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ',rumi:'Auudzu bi kalimaatil laahit taammaati',maksud:'Aku berlindung dengan kalimah Allah yang sempurna.',hadis:'Muslim 2708',kata:['lindung','bahaya']},
        {id:14,cat:'belajar',title:'Doa Belajar',ar:'اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي',rumi:'Allahummanfanii bimaa allamtanii',maksud:'Ya Allah, berilah manfaat dengan ilmu yang diajar.',hadis:'Ibnu Majah 251',kata:['belajar','ilmu']},
        {id:15,cat:'sakit',title:'Doa Sakit',ar:'اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ',rumi:'Allahumma Rabban naas, adzhhibil bas',maksud:'Ya Allah Tuhan manusia, hilangkan penyakit.',hadis:'Bukhari 5743',kata:['sakit','sembuh']}
    ];

    const CATS = {
        pagi:{n:'Pagi',i:'🌅',c:'#FF6B6B'},
        makan:{n:'Makanan',i:'🍽️',c:'#4ECDC4'},
        tandas:{n:'Tandas',i:'🚿',c:'#95E1D3'},
        rumah:{n:'Rumah',i:'🏠',c:'#FFD93D'},
        masjid:{n:'Masjid',i:'🕌',c:'#6BCB77'},
        tidur:{n:'Tidur',i:'🛌',c:'#A8E6CF'},
        kenderaan:{n:'Kenderaan',i:'🚗',c:'#FFDAC1'},
        lindung:{n:'Lindung',i:'🛡️',c:'#C7CEEA'},
        belajar:{n:'Belajar',i:'📚',c:'#FFB6B9'},
        sakit:{n:'Sakit',i:'💊',c:'#FAE3D9'}
    };

    // State
    let state = {
        bookmarks: JSON.parse(localStorage.getItem('duaBookmarks') || '[]'),
        progress: JSON.parse(localStorage.getItem('duaProgress') || '{}'),
        filter: 'all',
        search: ''
    };

    function saveBookmarks() {
        localStorage.setItem('duaBookmarks', JSON.stringify(state.bookmarks));
    }

    function saveProgress() {
        localStorage.setItem('duaProgress', JSON.stringify(state.progress));
    }

    function getStats() {
        const total = DUAS.length;
        const learned = Object.keys(state.progress).filter(k => state.progress[k]).length;
        const bookmarked = state.bookmarks.length;
        const pct = Math.round((learned/total)*100);
        return {total, learned, bookmarked, pct};
    }

    function getFiltered() {
        let result = DUAS;
        
        if (state.filter !== 'all' && state.filter !== 'bookmarks') {
            result = result.filter(d => d.cat === state.filter);
        }
        
        if (state.filter === 'bookmarks') {
            result = result.filter(d => state.bookmarks.includes(d.id));
        }
        
        if (state.search) {
            const q = state.search.toLowerCase();
            result = result.filter(d => 
                d.title.toLowerCase().includes(q) ||
                d.rumi.toLowerCase().includes(q) ||
                d.kata.some(k => k.includes(q))
            );
        }
        
        return result;
    }

    function renderCard(d) {
        const cat = CATS[d.cat];
        const isB = state.bookmarks.includes(d.id);
        const isL = state.progress[d.id];
        
        return `
<div style="background:white;border:2px solid #e9ecef;border-left:5px solid ${cat.c};border-radius:12px;padding:0.5rem;margin-bottom:1.5rem;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
    <div style="display:flex;justify-content:space-between;margin-bottom:1rem">
        <div>
            <span style="background:${cat.c};color:white;padding:0.3rem 0.8rem;border-radius:15px;font-size:0.85rem;font-weight:600">${cat.i} ${cat.n}</span>
            <h3 style="margin:0.5rem 0;color:#2d3748;font-size:1.2rem">${d.title}</h3>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:0.6rem;padding:8px 14px">
            <button onclick="toggleBookmark(${d.id})" style="background:${isB?'#ffd700':'#ecfdf5'};border:none;padding:0.5rem 0.5rem;border-radius:5px;cursor:pointer;font-size:1.3rem">${isB?'⭐':'☆'}</button>
            <button onclick="markLearned(${d.id})" style="background:${isL?'#0c3803':'#ecfdf5'};color:${isL?'white':'#0c3803'};border:none;padding:0.5rem 0.5rem;border-radius:5px;cursor:pointer;font-size:0.9rem;font-weight:500">${isL?'✓':'Tanda'}</button>
        </div>
    </div>
    <div style="background:#faf9f7;padding:1.5rem;border-radius:8px;margin-bottom:1rem;text-align:right;direction:rtl">
        <p style="font-family:'Amiri';font-size:2.5rem;line-height:1.5;color:#0c3808;margin:0">${d.ar}</p>
    </div>
    <div style="background:#e8f5e9;padding:1rem;border-radius:8px;margin-bottom:1rem">
        <p style="font-size:1.1rem;font-style:italic;color:#1a5a1a;margin:0"><strong>Rumi:</strong> ${d.rumi}</p>
    </div>
    <p style="color:#4a5568;margin-bottom:1rem"><strong>Maksud:</strong> ${d.maksud}</p>
    <div style="background:#fff3cd;padding:0.8rem 1rem;border-radius:8px">
        <p style="margin:0;font-size:0.9rem;color:#856404;font-weight:600">📚 ${d.hadis}</p>
    </div>
</div>`;
    }

    function render() {
        const stats = getStats();
        const filtered = getFiltered();
        
        const html = `
<div style="font-family:'Inter'">
    <div style="background:linear-gradient(135deg,#249749,#0c3803);padding:2rem;border-radius:12px 12px 0 0;color:white">
        <h2 style="margin:0 0 1rem 0">🤲 Tool Doa Harian</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(100px,1fr));gap:1rem">
            <div style="background:rgba(255,255,255,0.2);padding:1rem;border-radius:8px;text-align:center">
                <div style="font-size:2rem;font-weight:700">${stats.total}</div>
                <div style="font-size:0.9rem;opacity:0.9">Total</div>
            </div>
            <div style="background:rgba(255,255,255,0.2);padding:1rem;border-radius:8px;text-align:center">
                <div style="font-size:2rem;font-weight:700">${stats.learned}</div>
                <div style="font-size:0.9rem;opacity:0.9">Belajar</div>
            </div>
            <div style="background:rgba(255,255,255,0.2);padding:1rem;border-radius:8px;text-align:center">
                <div style="font-size:2rem;font-weight:700">${stats.bookmarked}</div>
                <div style="font-size:0.9rem;opacity:0.9">Simpan</div>
            </div>
            <div style="background:rgba(255,255,255,0.2);padding:1rem;border-radius:8px;text-align:center">
                <div style="font-size:2rem;font-weight:700">${stats.pct}%</div>
                <div style="font-size:0.9rem;opacity:0.9">Progress</div>
            </div>
        </div>
    </div>
    
    <div style="background:#f8f9fa;padding:1.5rem;border-bottom:2px solid #e9ecef">
        <input type="text" id="duaSearch" placeholder="🔍 Cari doa..." style="width:100%;padding:0.8rem 1rem;border:2px solid #dee2e6;border-radius:8px;font-size:1rem;margin-bottom:1rem" />
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap">
            <button onclick="filterDuas('all')" class="fbtn" data-f="all" style="padding:0.5rem 1rem;border:2px solid #249749;background:#249749;color:white;border-radius:20px;cursor:pointer;font-weight:600">Semua</button>
            ${Object.entries(CATS).map(([k,v])=>`<button onclick="filterDuas('${k}')" class="fbtn" data-f="${k}" style="padding:0.5rem 1rem;border:2px solid ${v.c};background:white;color:${v.c};border-radius:20px;cursor:pointer;font-weight:600">${v.i} ${v.n}</button>`).join('')}
            <button onclick="filterDuas('bookmarks')" class="fbtn" data-f="bookmarks" style="padding:0.5rem 1rem;border:2px solid #0c3803;background:#F0FFF4;color:#249749;border-radius:20px;cursor:pointer;font-weight:600">⭐ Save</button>
        </div>
    </div>
    
    <div style="padding:0.5rem;background:white">
        ${filtered.length ? filtered.map(renderCard).join('') : '<p style="text-align:center;padding:3rem;color:#6c757d">Tiada doa dijumpai</p>'}
    </div>
</div>`;
        
        document.getElementById('duaToolContainer').innerHTML = html;
        
        const searchInput = document.getElementById('duaSearch');
        if (searchInput) {
            searchInput.value = state.search;
            searchInput.addEventListener('input', function(e) {
                state.search = e.target.value;
                render();
            });
        }
    }

    window.filterDuas = function(f) {
        state.filter = f;
        document.querySelectorAll('.fbtn').forEach(b => {
            const isActive = b.dataset.f === f;
            let color = '#249749';
            if (f === 'bookmarks') color = '#ff6b6b';
            else if (f !== 'all' && CATS[f]) color = CATS[f].c;
            
            b.style.background = isActive ? color : 'white';
            b.style.color = isActive ? 'white' : color;
        });
        render();
    };

    window.toggleBookmark = function(id) {
        const idx = state.bookmarks.indexOf(id);
        if (idx > -1) {
            state.bookmarks.splice(idx, 1);
        } else {
            state.bookmarks.push(id);
        }
        saveBookmarks();
        render();
    };

    window.markLearned = function(id) {
        state.progress[id] = !state.progress[id];
        saveProgress();
        render();
    };

    // Init
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', render);
    } else {
        render();
    }
    
    console.log('✅ Doa Tool Loaded - 15 duas ready');
})();
