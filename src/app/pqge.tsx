import React, { useState } from 'react';

// Inline component definitions to avoid import issues
const Card = ({ children, className = "", ...props }: any) => (
  <div className={`rounded-lg border bg-white text-gray-900 shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "", ...props }: any) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "", ...props }: any) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

const CardContent = ({ children, className = "", ...props }: any) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const Input = ({ className = "", ...props }: any) => (
  <input
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

// Define the valid types for the variant and size props
type ButtonVariant = "default" | "outline";
type ButtonSize = "default" | "sm";

const Button = ({ children, className = "", variant = "default", size = "default", ...props }: { children: React.ReactNode, className?: string, variant?: ButtonVariant, size?: ButtonSize, [key: string]: any }) => {
  const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variantClasses: Record<ButtonVariant, string> = {
    default: "bg-green-600 text-white hover:bg-green-700",
    outline: "border border-gray-300 bg-white hover:bg-gray-50 hover:text-gray-900",
  };
  const sizeClasses: Record<ButtonSize, string> = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Inline SVG icons to avoid lucide-react import issues
const Search = ({ className = "", ...props }: any) => (
  <svg className={`w-5 h-5 ${className}`} {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>
);

const BookOpen = ({ className = "", ...props }: any) => (
  <svg className={`w-8 h-8 ${className}`} {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);

const Heart = ({ className = "", ...props }: any) => (
  <svg className={`w-8 h-8 ${className}`} {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

interface Dua {
  id: number;
  arabic: string;
  transliteration: string;
  malay: string;
  category: string;
  source: string;
  wordByWord: Array<{
    arabic: string;
    meaning: string;
  }>;
}

const DuaApp: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [hoveredDua, setHoveredDua] = useState<number | null>(null);
  const [hoveredWord, setHoveredWord] = useState<{duaId: number, wordIndex: number} | null>(null);

  const duas: Dua[] = [
    {
      id: 1,
      arabic: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
      transliteration: "Allahumma a'inni 'ala zikrika wa shukrika wa husni 'ibadatik",
      malay: "Ya Allah, tolonglah aku untuk mengingat-Mu, bersyukur kepada-Mu, dan beribadah dengan baik kepada-Mu.",
      category: "Ibadah",
      source: "Abu Dawud",
      wordByWord: [
        { arabic: "اللَّهُمَّ", meaning: "Ya Allah" },
        { arabic: "أَعِنِّي", meaning: "tolonglah aku" },
        { arabic: "عَلَى", meaning: "atas/untuk" },
        { arabic: "ذِكْرِكَ", meaning: "mengingat-Mu" },
        { arabic: "وَشُكْرِكَ", meaning: "dan bersyukur kepada-Mu" },
        { arabic: "وَحُسْنِ", meaning: "dan kebaikan" },
        { arabic: "عِبَادَتِكَ", meaning: "ibadah kepada-Mu" }
      ]
    },
    {
      id: 2,
      arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
      transliteration: "Rabbana atina fi'd-dunya hasanatan wa fi'l-akhirati hasanatan wa qina 'azab an-nar",
      malay: "Ya Tuhan kami, berilah kami kebaikan di dunia dan kebaikan di akhirat, dan peliharalah kami dari azab neraka.",
      category: "Am",
      source: "Al-Quran 2:201",
      wordByWord: [
        { arabic: "رَبَّنَا", meaning: "Ya Tuhan kami" },
        { arabic: "آتِنَا", meaning: "berilah kami" },
        { arabic: "فِي", meaning: "di/dalam" },
        { arabic: "الدُّنْيَا", meaning: "dunia" },
        { arabic: "حَسَنَةً", meaning: "kebaikan" },
        { arabic: "وَفِي", meaning: "dan di" },
        { arabic: "الآخِرَةِ", meaning: "akhirat" },
        { arabic: "حَسَنَةً", meaning: "kebaikan" },
        { arabic: "وَقِنَا", meaning: "dan peliharalah kami" },
        { arabic: "عَذَابَ", meaning: "azab" },
        { arabic: "النَّارِ", meaning: "neraka" }
      ]
    },
    {
      id: 3,
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالآخِرَةِ",
      transliteration: "Allahumma inni as'aluka'l-'afiyah fi'd-dunya wa'l-akhirah",
      malay: "Ya Allah, sesungguhnya aku memohon kepada-Mu kesejahteraan di dunia dan akhirat.",
      category: "Kesihatan",
      source: "Ibn Majah",
      wordByWord: [
        { arabic: "اللَّهُمَّ", meaning: "Ya Allah" },
        { arabic: "إِنِّي", meaning: "sesungguhnya aku" },
        { arabic: "أَسْأَلُكَ", meaning: "memohon kepada-Mu" },
        { arabic: "الْعَافِيَةَ", meaning: "kesejahteraan" },
        { arabic: "فِي", meaning: "di/dalam" },
        { arabic: "الدُّنْيَا", meaning: "dunia" },
        { arabic: "وَالآخِرَةِ", meaning: "dan akhirat" }
      ]
    },
    {
      id: 4,
      arabic: "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي",
      transliteration: "Rabbi ishrah li sadri wa yassir li amri",
      malay: "Ya Tuhanku, lapangkanlah dadaku dan mudahkanlah urusanku.",
      category: "Kemudahan",
      source: "Al-Quran 20:25-26",
      wordByWord: [
        { arabic: "رَبِّ", meaning: "Ya Tuhanku" },
        { arabic: "اشْرَحْ", meaning: "lapangkanlah" },
        { arabic: "لِي", meaning: "untukku" },
        { arabic: "صَدْرِي", meaning: "dadaku" },
        { arabic: "وَيَسِّرْ", meaning: "dan mudahkanlah" },
        { arabic: "لِي", meaning: "untukku" },
        { arabic: "أَمْرِي", meaning: "urusanku" }
      ]
    },
    {
      id: 5,
      arabic: "اللَّهُمَّ بَارِكْ لَنَا فِي مَا رَزَقْتَنَا",
      transliteration: "Allahumma barik lana fi ma razaqtana",
      malay: "Ya Allah, berkahilah kami dalam apa yang telah Engkau berikan kepada kami.",
      category: "Rezeki",
      source: "Abu Dawud",
      wordByWord: []
    },
    {
      id: 6,
      arabic: "رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا",
      transliteration: "Rabbana ighfir lana zunubana wa israfana fi amrina",
      malay: "Ya Tuhan kami, ampunilah dosa-dosa kami dan sikap berlebihan kami dalam urusan kami.",
      category: "Pengampunan",
      source: "Al-Quran 3:147",
      wordByWord: []
    },
    {
      id: 7,
      arabic: "اللَّهُمَّ أَصْلِحْ لِي دِينِي وَدُنْيَايَ وَآخِرَتِي",
      transliteration: "Allahumma aslih li dini wa dunyaya wa akhirati",
      malay: "Ya Allah, perbaikilah bagiku agama, dunia, dan akhiratku.",
      category: "Am",
      source: "Muslim",
      wordByWord: []
    },
    {
      id: 8,
      arabic: "رَبِّ زِدْنِي عِلْمًا",
      transliteration: "Rabbi zidni 'ilman",
      malay: "Ya Tuhanku, tambahkanlah ilmu kepadaku.",
      category: "Ilmu",
      source: "Al-Quran 20:114",
      wordByWord: [
        { arabic: "رَبِّ", meaning: "Ya Tuhanku" },
        { arabic: "زِدْنِي", meaning: "tambahkanlah kepadaku" },
        { arabic: "عِلْمًا", meaning: "ilmu" }
      ]
    },
    {
      id: 9,
      arabic: "اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ",
      transliteration: "Allahumma ihdini fiman hadayta",
      malay: "Ya Allah, berilah aku hidayah sebagaimana Engkau memberi hidayah kepada orang lain.",
      category: "Hidayah",
      source: "Abu Dawud",
      wordByWord: []
    },
    {
      id: 10,
      arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ",
      transliteration: "Rabbana hab lana min azwajina wa zurriyyatina qurrata a'yun",
      malay: "Ya Tuhan kami, anugerahkanlah kepada kami dari isteri-isteri dan keturunan kami sebagai penyejuk mata.",
      category: "Keluarga",
      source: "Al-Quran 25:74",
      wordByWord: []
    },
    {
      id: 11,
      arabic: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنَ الْخَيْرِ كُلِّهِ",
      transliteration: "Allahumma inni as'aluka min al-khayri kullihi",
      malay: "Ya Allah, sesungguhnya aku memohon kepada-Mu dari segala kebaikan.",
      category: "Am",
      source: "Abu Dawud",
      wordByWord: []
    },
    {
      id: 12,
      arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
      transliteration: "Hasbunallahu wa ni'mal wakeel",
      malay: "Cukuplah Allah bagi kami dan Dia sebaik-baik pelindung.",
      category: "Perlindungan",
      source: "Al-Quran 3:173",
      wordByWord: [
        { arabic: "حَسْبُنَا", meaning: "cukuplah bagi kami" },
        { arabic: "اللَّهُ", meaning: "Allah" },
        { arabic: "وَنِعْمَ", meaning: "dan sebaik-baik" },
        { arabic: "الْوَكِيلُ", meaning: "pelindung" }
      ]
    },
    {
      id: 13,
      arabic: "رَبِّ أَعُوذُ بِكَ مِنْ هَمَزَاتِ الشَّيَاطِينِ",
      transliteration: "Rabbi a'udhu bika min hamazat ash-shayatin",
      malay: "Ya Tuhanku, aku berlindung kepada-Mu dari bisikan-bisikan syaitan.",
      category: "Perlindungan",
      source: "Al-Quran 23:97",
      wordByWord: []
    },
    {
      id: 14,
      arabic: "اللَّهُمَّ أَنْتَ رَبِّي لا إِلَهَ إِلا أَنْتَ",
      transliteration: "Allahumma anta rabbi la ilaha illa ant",
      malay: "Ya Allah, Engkaulah Tuhanku, tiada tuhan selain Engkau.",
      category: "Tauhid",
      source: "Bukhari",
      wordByWord: []
    },
    {
      id: 15,
      arabic: "رَبَّنَا لا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا",
      transliteration: "Rabbana la tuzigh qulubana ba'da idh hadaytana",
      malay: "Ya Tuhan kami, janganlah Engkau sesatkan hati kami setelah Engkau memberi kami hidayah.",
      category: "Hidayah",
      source: "Al-Quran 3:8",
      wordByWord: []
    },
    {
      id: 16,
      arabic: "اللَّهُمَّ اكْفِنِي بِحَلالِكَ عَنْ حَرَامِكَ",
      transliteration: "Allahumma ikfini bi halalika 'an haramik",
      malay: "Ya Allah, cukupkanlah aku dengan yang halal dari-Mu daripada yang haram.",
      category: "Rezeki",
      source: "Tirmizi",
      wordByWord: []
    },
    {
      id: 17,
      arabic: "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلاةِ وَمِنْ ذُرِّيَّتِي",
      transliteration: "Rabbi ij'alni muqeem as-salati wa min zurriyyati",
      malay: "Ya Tuhanku, jadikanlah aku orang yang mendirikan solat dan demikian juga keturunanku.",
      category: "Ibadah",
      source: "Al-Quran 14:40",
      wordByWord: []
    },
    {
      id: 18,
      arabic: "اللَّهُمَّ أَحْسِنْ خُلُقِي وَخَلْقِي",
      transliteration: "Allahumma ahsin khuluqi wa khalqi",
      malay: "Ya Allah, perbaikilah akhlak dan penciptaanku.",
      category: "Akhlak",
      source: "Ahmad",
      wordByWord: []
    },
    {
      id: 19,
      arabic: "رَبَّنَا آتِنَا رَحْمَةً مِنْ عِنْدِكَ",
      transliteration: "Rabbana atina rahmatan min 'indik",
      malay: "Ya Tuhan kami, berilah kami rahmat dari sisi-Mu.",
      category: "Rahmat",
      source: "Al-Quran 18:10",
      wordByWord: []
    },
    {
      id: 20,
      arabic: "اللَّهُمَّ طَهِّرْ قَلْبِي مِنَ النِّفَاقِ",
      transliteration: "Allahumma tahhir qalbi min an-nifaq",
    malay: "Ya Allah, sucikanlah hatiku dari sifat munafik.",
      category: "Pembersihan",
      source: "Ahmad",
      wordByWord: []
    },
    {
      id: 21,
      arabic: "رَبِّ لا تَذَرْنِي فَرْدًا وَأَنْتَ خَيْرُ الْوَارِثِينَ",
      transliteration: "Rabbi la tazarni fardan wa anta khayr al-warithin",
      malay: "Ya Tuhanku, janganlah Engkau biarkan aku sendirian, dan Engkaulah sebaik-baik pewaris.",
      category: "Keturunan",
      source: "Al-Quran 21:89",
      wordByWord: []
    },
    {
      id: 22,
      arabic: "اللَّهُمَّ أَعِنِّي وَلا تُعِنْ عَلَيَّ",
      transliteration: "Allahumma a'inni wa la tu'in 'alayy",
      malay: "Ya Allah, tolonglah aku dan janganlah Engkau menolong orang lain untuk menentangku.",
      category: "Pertolongan",
      source: "Tirmizi",
      wordByWord: []
    },
    {
      id: 23,
      arabic: "رَبَّنَا اصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ",
      transliteration: "Rabbana isrif 'anna 'azab jahannam",
      malay: "Ya Tuhan kami, palingkanlah dari kami azab neraka jahannam.",
      category: "Perlindungan",
      source: "Al-Quran 25:65",
      wordByWord: []
    },
    {
      id: 24,
      arabic: "اللَّهُمَّ بَلِّغْنِي رَمَضَانَ",
      transliteration: "Allahumma ballighni Ramadan",
      malay: "Ya Allah, sampaikanlah aku ke bulan Ramadan.",
      category: "Masa",
      source: "Latif al-Ma'arif",
      wordByWord: []
    },
    {
      id: 25,
      arabic: "رَبِّ أَدْخِلْنِي مُدْخَلَ صِدْقٍ",
      transliteration: "Rabbi adkhilni mudkhala sidq",
      malay: "Ya Tuhanku, masukkanlah aku dengan jalan masuk yang benar.",
      category: "Kebenaran",
      source: "Al-Quran 17:80",
      wordByWord: []
    },
    {
      id: 26,
      arabic: "اللَّهُمَّ اجْعَلْ عَمَلِي خَالِصًا لِوَجْهِكَ",
      transliteration: "Allahumma ij'al 'amali khalisan li wajhik",
      malay: "Ya Allah, jadikanlah amalanku ikhlas kerana wajah-Mu.",
      category: "Ikhlas",
      source: "Ibn Majah",
      wordByWord: []
    },
    {
      id: 27,
      arabic: "رَبَّنَا وَلا تُحَمِّلْنَا مَا لا طَاقَةَ لَنَا بِهِ",
      transliteration: "Rabbana wa la tuhammilna ma la taqata lana bih",
      malay: "Ya Tuhan kami, dan janganlah Engkau bebankan kepada kami apa yang tidak mampu kami pikul.",
      category: "Kemudahan",
      source: "Al-Quran 2:286",
      wordByWord: []
    },
    {
      id: 28,
      arabic: "اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ",
      transliteration: "Allahumma ij'alni min at-tawwabin",
      malay: "Ya Allah, jadikanlah aku dari golongan orang-orang yang bertaubat.",
      category: "Taubat",
      source: "Tirmizi",
      wordByWord: []
    },
    {
      id: 29,
      arabic: "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ",
      transliteration: "Rabbi awzi'ni an ashkura ni'matak",
      malay: "Ya Tuhanku, ilhamkanlah aku untuk bersyukur atas nikmat-Mu.",
      category: "Syukur",
      source: "Al-Quran 27:19",
      wordByWord: []
    },
    {
      id: 30,
      arabic: "اللَّهُمَّ أَحْيِنِي مِسْكِينًا وَأَمِتْنِي مِسْكِينًا",
      transliteration: "Allahumma ahyini miskinan wa amitni miskinan",
      malay: "Ya Allah, hidupkanlah aku dalam keadaan miskin dan matikanlah aku dalam keadaan miskin.",
      category: "Tawadhu",
      source: "Tirmizi",
      wordByWord: []
    },
    {
      id: 31,
      arabic: "رَبَّنَا لا تَجْعَلْنَا فِتْنَةً لِلَّذِينَ كَفَرُوا",
      transliteration: "Rabbana la taj'alna fitnatan lillazina kafaru",
      malay: "Ya Tuhan kami, janganlah Engkau jadikan kami fitnah bagi orang-orang yang kafir.",
      category: "Perlindungan",
      source: "Al-Quran 60:5",
      wordByWord: []
    },
    {
      id: 32,
      arabic: "اللَّهُمَّ زَيِّنِّي بِالْعِلْمِ وَأَكْرِمْنِي بِالْحِلْمِ",
      transliteration: "Allahumma zayyinni bil-'ilmi wa akrimni bil-hilm",
      malay: "Ya Allah, hiasikanlah aku dengan ilmu dan muliakanlah aku dengan kesabaran.",
      category: "Ilmu",
      source: "Dailami",
      wordByWord: []
    },
    {
      id: 33,
      arabic: "رَبِّ اجْعَلْ هَذَا الْبَلَدَ آمِنًا",
      transliteration: "Rabbi ij'al hadhal-balada aminan",
      malay: "Ya Tuhanku, jadikanlah negeri ini aman.",
      category: "Negara",
      source: "Al-Quran 2:126",
      wordByWord: []
    },
    {
      id: 34,
      arabic: "اللَّهُمَّ أَرِنِي الْحَقَّ حَقًّا وَارْزُقْنِي اتِّبَاعَهُ",
      transliteration: "Allahumma arini'l-haqqa haqqan warzuqni itba'ah",
      malay: "Ya Allah, tunjukkanlah kepadaku kebenaran sebagai kebenaran dan berikanlah aku taufiq untuk mengikutinya.",
      category: "Kebenaran",
      source: "Dailami",
      wordByWord: []
    },
    {
      id: 35,
      arabic: "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا",
      transliteration: "Rabbana afrigh 'alayna sabran",
      malay: "Ya Tuhan kami, limpahkanlah atas kami kesabaran.",
      category: "Sabar",
      source: "Al-Quran 2:250",
      wordByWord: []
    },
    {
      id: 36,
      arabic: "اللَّهُمَّ اجْعَلْ خَيْرَ عُمُرِي آخِرَهُ",
      transliteration: "Allahumma ij'al khayra 'umuri akhirah",
      malay: "Ya Allah, jadikanlah yang terbaik dari umurku adalah akhirnya.",
      category: "Akhir Hayat",
      source: "Hakim",
      wordByWord: []
    },
    {
      id: 37,
      arabic: "رَبِّ أَعُوذُ بِكَ مِنْ زَوَالِ نِعْمَتِكَ",
      transliteration: "Rabbi a'udhu bika min zawal ni'matik",
      malay: "Ya Tuhanku, aku berlindung kepada-Mu dari hilangnya nikmat-Mu.",
      category: "Perlindungan",
      source: "Muslim",
      wordByWord: []
    },
    {
      id: 38,
      arabic: "اللَّهُمَّ أَلْهِمْنِي رُشْدِي",
      transliteration: "Allahumma alhimni rushdi",
      malay: "Ya Allah, ilhamkanlah kepadaku jalan yang benar.",
      category: "Hidayah",
      source: "Abu Dawud",
      wordByWord: []
    },
    {
      id: 39,
      arabic: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ",
      transliteration: "Rabbana taqabbal minna innaka anta's-samee' ul-'aleem",
      malay: "Ya Tuhan kami, terimalah daripada kami, sesungguhnya Engkaulah Yang Maha Mendengar lagi Maha Mengetahui.",
      category: "Penerimaan",
      source: "Al-Quran 2:127",
      wordByWord: []
    },
    {
      id: 40,
      arabic: "اللَّهُمَّ أَعِنِّي عَلَى حُسْنِ الْخَاتِمَةِ",
      transliteration: "Allahumma a'inni 'ala husn il-khatimah",
      malay: "Ya Allah, tolonglah aku untuk mendapat akhir yang baik.",
      category: "Akhir Hayat",
      source: "Dailami",
      wordByWord: []
    }
  ];

  // Add empty wordByWord arrays for duas that don't have them defined
  duas.forEach(dua => {
    if (!dua.wordByWord) {
      dua.wordByWord = [];
    }
  });

  const categories = ['Semua', ...Array.from(new Set(duas.map(dua => dua.category)))];

  const filteredDuas = duas.filter(dua => {
    const matchesSearch = dua.arabic.includes(searchTerm) || 
                         dua.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dua.malay.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || dua.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="w-8 h-8" />
              <h1 className="text-4xl font-bold">40 Doa Pilihan</h1>
              <Heart className="w-8 h-8" />
            </div>
            <p className="text-xl text-green-100">Kumpulan doa-doa mustajab dengan makna dalam Bahasa Melayu</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <Input
              type="text"
              placeholder="Cari doa (Arab, transliterasi, atau Melayu)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg border-2 border-green-200 focus:border-green-400"
            />
          </div>
          <div className="md:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 text-lg border-2 border-green-200 rounded-md focus:border-green-400 bg-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-4 bg-white px-6 py-3 rounded-full shadow-md">
            <span className="text-lg text-gray-600">
              Menunjukkan <span className="font-bold text-green-600">{filteredDuas.length}</span> daripada <span className="font-bold">{duas.length}</span> doa
            </span>
          </div>
        </div>

        {/* Dua Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDuas.map((dua) => (
            <Card 
              key={dua.id} 
              className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500 relative group"
              onMouseEnter={() => setHoveredDua(dua.id)}
              onMouseLeave={() => setHoveredDua(null)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-green-700">
                    Doa {dua.id}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {dua.category}
                    </span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {dua.source}
                    </span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Arabic Text */}
                <div className="text-right p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-100" dir="rtl">
                  <div className="text-2xl font-arabic leading-relaxed text-green-800 relative" style={{ fontFamily: 'Amiri, serif', direction: 'rtl' }}>
                    {dua.wordByWord.length > 0 ? (
                      dua.wordByWord.map((word, index) => (
                        <span
                          key={index}
                          className="cursor-pointer hover:bg-green-200 hover:bg-opacity-50 rounded px-1 relative inline-block"
                          onMouseEnter={() => setHoveredWord({ duaId: dua.id, wordIndex: index })}
                          onMouseLeave={() => setHoveredWord(null)}
                        >
                          {word.arabic}
                          {hoveredWord?.duaId === dua.id && hoveredWord?.wordIndex === index && (
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-sm px-2 py-1 rounded whitespace-nowrap z-20 font-sans">
                              {word.meaning}
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
                            </div>
                          )}
                          {index < dua.wordByWord.length - 1 && ' '}
                        </span>
                      ))
                    ) : (
                      dua.arabic
                    )}
                  </div>
                </div>
                
                {/* Transliteration */}
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-sm font-medium text-blue-700 mb-1">Transliterasi:</p>
                  <p className="text-lg italic text-blue-800 leading-relaxed">
                    {dua.transliteration}
                  </p>
                </div>
                
                {/* Malay Translation */}
                <div className="p-4 bg-white border-2 border-green-200 rounded-lg relative">
                  <p className="text-sm font-medium text-green-700 mb-2">Maksud:</p>
                  <p className="text-lg text-gray-800 leading-relaxed">
                    {dua.malay}
                  </p>
                  
                  {/* Tooltip */}
                  {hoveredDua === dua.id && (
                    <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded shadow-lg z-10">
                      Klik untuk salin
                    </div>
                  )}
                </div>
              </CardContent>
              
              {/* Copy Button */}
              <div className="absolute bottom-4 right-4">
                <Button
                  size="sm"
                  variant="outline"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 border-green-300 text-green-700 hover:bg-green-50"
                  onClick={() => {
                    const text = `${dua.arabic}\n\n${dua.transliteration}\n\n${dua.malay}`;
                    navigator.clipboard.writeText(text);
                  }}
                >
                  Salin Doa
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredDuas.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🤲</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Tiada doa dijumpai
            </h3>
            <p className="text-gray-500">
              Cuba cari dengan kata kunci yang berbeza atau tukar kategori
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg mb-2">
            "Dan apabila hamba-hamba-Ku bertanya kepadamu tentang Aku, maka (jawablah), bahawasanya Aku adalah dekat. Aku mengabulkan permohonan orang yang berdoa apabila ia memohon kepada-Ku."
          </p>
          <p className="text-green-200">
            - Al-Quran, Surah Al-Baqarah: 186
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DuaApp;