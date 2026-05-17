const cbseClassesData = {
  8: {
    "Science": {
      icon: "flask-conical",
      color: "bg-green-500",
      books: [
        { id: "cbse_8_sci", title: "Learning by doing (Hindi Version)", linkPrefix: "https://cbseacademic.nic.in/web_material/doc/6_Learning_by_Doing_Class_VIII.pdf", chapters: [] }
      ]
    },
    "Life Skills": {
      icon: "heart-handshake",
      color: "bg-pink-500",
      books: [
        { id: "cbse_8_life", title: "Life Skills - Teacher's Manual", linkPrefix: "https://cbseacademic.nic.in/web_material/doc/2014/9_Life%20Skills_Class_VIII.pdf", chapters: [] }
      ]
    }
  },
  9: {
    "Sanskrit": {
      icon: "scroll",
      color: "bg-amber-700",
      books: [
        { id: "cbse_9_sk", title: "Manika Abhyas Pustika", linkPrefix: "https://cbseacademic.nic.in/web_material/Manuals/Manika_Class_09.pdf", chapters: [] },
        { id: "cbse_9_sk_m", title: "Communicative Sanskrit Manika", linkPrefix: "https://cbseacademic.nic.in/web_material/publication/Sanskrit-Manika_2022-IX.pdf", chapters: [] }
      ]
    },
    "English": {
      icon: "book-open",
      color: "bg-purple-500",
      books: [
        { 
          id: "cbse_9_en_lr", 
          title: "Literature Reader", 
          linkPrefix: "https://www.cbse.gov.in/publications/interact_in_english_lit_ix/", 
          fullBook: "https://cbseacademic.nic.in/web_material/publication/English-Literature_2022-IX.pdf",
          importantLinks: [
              { name: "Annexure", url: "https://www.cbse.gov.in/publications/interact_in_english_lit_ix/ANNEXURE.PDF", icon: "paperclip", color: "link-btn-gray" }
          ],
          chapters: [
            { name: "F.1 How I Taught My Grandmother to Read", pdf: "UNIT-1.PDF" },
            { name: "F.2 A Dog Named Duke", pdf: "UNIT-2.PDF" },
            { name: "F.3 The Man Who Knew Too Much", pdf: "UNIT-3.PDF" },
            { name: "F.4 Keeping It from Harold", pdf: "UNIT-4.PDF" },
            { name: "F.5 Best Seller", pdf: "UNIT-5.PDF" },
            { name: "P.1 The Brook", pdf: "UNIT-6.PDF" },
            { name: "P.2 The Road Not Taken", pdf: "UNIT-7.PDF" },
            { name: "P.3 The Solitary Reaper", pdf: "UNIT-8.PDF" },
            { name: "P.4 The Seven Ages", pdf: "UNIT-9.PDF" },
            { name: "P.5 Oh, I Wish I'd Looked After Me Teeth", pdf: "UNIT-10.PDF" },
            { name: "P.6 Song of The Rain", pdf: "UNIT-11.PDF" },
            { name: "D.1 Villa for Sale", pdf: "UNIT-12.PDF" },
            { name: "D.2 The Bishop's Candlesticks", pdf: "UNIT-13.PDF" }
          ] 
        },
        { id: "cbse_9_en_mcb", title: "Main Course Book", linkPrefix: "https://cbseacademic.nic.in/web_material/publication/English-MCB_2022-IX.pdf", chapters: [] },
        { id: "cbse_9_en_wb", title: "WorkBook", linkPrefix: "https://cbseacademic.nic.in/web_material/publication/English-WorkBook_2022-IX.pdf", chapters: [] }
      ]
    },
    "Arabic": {
      icon: "languages",
      color: "bg-orange-600",
      books: [
        { id: "cbse_9_ar", title: "Arabic Text Book", linkPrefix: "https://cbseacademic.nic.in/web_material/publication/Arabic_IX_2023.pdf", chapters: [] }
      ]
    },
    "French": {
      icon: "languages",
      color: "bg-blue-600",
      books: [
        { id: "cbse_9_fr", title: "Entre Jeunes", linkPrefix: "https://cbseacademic.nic.in/web_material/doc/languages/1_French_Entre_Jeunes_Book.pdf", chapters: [] }
      ]
    },
    "Mathematics": {
      icon: "calculator",
      color: "bg-red-500",
      books: [
        { id: "cbse_9_math_lab", title: "Maths Lab Guidelines", linkPrefix: "https://cbseacademic.nic.in/web_material/doc/2014/8_Maths%20lab%20in%20schools%20ix.pdf", chapters: [] }
      ]
    },
    "Information & Comm. Tech.": {
      icon: "monitor",
      color: "bg-gray-700",
      books: [
        { id: "cbse_9_ict_2", title: "ICT Full Text Book (Part 2)", linkPrefix: "https://cbseacademic.nic.in/web_material/doc/2014/11_ICT-IX.pdf.pdf", chapters: [] }
      ]
    }
  },
  10: {
    "Sanskrit": {
      icon: "scroll",
      color: "bg-amber-700",
      books: [
        { id: "cbse_10_sk_ab", title: "Manika Abhyas Pustika", linkPrefix: "https://cbseacademic.nic.in/web_material/Manuals/ManikaAbhyasPustika10-2025.pdf", chapters: [] },
        { id: "cbse_10_sk_m", title: "Sanskrit Manika", linkPrefix: "https://cbseacademic.nic.in/web_material/publication/Sanskrit_Manika_10_2023.pdf", chapters: [] }
      ]
    },
    "English": {
      icon: "book-open",
      color: "bg-purple-500",
      books: [
        { id: "cbse_10_en_lr", title: "Literature Reader", linkPrefix: "https://cbseacademic.nic.in/web_material/publication/LitratureReader_ClassX_2023.pdf", chapters: [] },
        { id: "cbse_10_en_mcb", title: "Main Course Book", linkPrefix: "https://cbseacademic.nic.in/web_material/publication/MainCourseBook_ClassX_2023.pdf", chapters: [] },
        { id: "cbse_10_en_wb", title: "WorkBook", linkPrefix: "https://cbseacademic.nic.in/web_material/publication/WorkBook_ClassX_2023.pdf", chapters: [] },
        { id: "cbse_10_en_helen", title: "The Story of My Life (Helen Keller)", linkPrefix: "https://cbseacademic.nic.in/web_material/doc/The%20Story%20of%20My%20Life,%20by%20Helen%20Keller.pdf", chapters: [] },
        { id: "cbse_10_en_diary", title: "The Diary of a Young Girl", linkPrefix: "https://cbseacademic.nic.in/web_material/doc/novels/3_The%20Diary%20of%20a%20Young%20Girl.pdf", chapters: [] }
      ]
    },
    "French": {
      icon: "languages",
      color: "bg-blue-600",
      books: [
        { id: "cbse_10_fr", title: "Entre Jeunes", linkPrefix: "https://cbseacademic.nic.in/web_material/doc/languages/Entre_Jeunes_class%20X.pdf", chapters: [] }
      ]
    },
    "Information & Comm. Tech.": {
      icon: "monitor",
      color: "bg-gray-700",
      books: [
        { id: "cbse_10_ict", title: "Information and Comm. Technology", linkPrefix: "https://cbseacademic.nic.in/web_material/doc/2014/12_ICT-X.pdf", chapters: [] }
      ]
    }
  },
  11: {
    "Library & Info Science": {
      icon: "book-copy",
      color: "bg-teal-600",
      books: [
        { id: "cbse_11_lib", title: "Library & Information Science", linkPrefix: "https://cbseacademic.nic.in/web_material/publication/library_science-XI_2022.pdf", chapters: [] }
      ]
    },
    "Legal Studies": {
      icon: "scale",
      color: "bg-rose-600",
      books: [
        { id: "cbse_11_legal", title: "Legal Studies", linkPrefix: "https://cbseacademic.nic.in/web_material/publication/Legal_Studies_Book_v8_XI.pdf", chapters: [] }
      ]
    },
    "Entrepreneurship": {
      icon: "briefcase",
      color: "bg-indigo-600",
      books: [
        { id: "cbse_11_ent", title: "Entrepreneurship", linkPrefix: "https://cbseacademic.nic.in/web_material/Circulars/2013/48_Enterpreneurship.pdf", chapters: [] }
      ]
    },
    "Fashion Studies": {
      icon: "scissors",
      color: "bg-pink-500",
      books: [
        { id: "cbse_11_fashion", title: "Fashion Studies - Textbook", linkPrefix: "https://cbseacademic.nic.in/web_material/doc/2014/13_Fashion_Studies_Textbook_XI.pdf", chapters: [] }
      ]
    },
    "Geospatial Technology": {
      icon: "map",
      color: "bg-emerald-600",
      books: [
        { id: "cbse_11_geo", title: "Geospatial Technology", linkPrefix: "https://cbseacademic.nic.in/web_material/doc/2014/6_Geospatial%20Technology%20(Class%20XI).pdf", chapters: [] }
      ]
    },
    "National Cadet Corps": {
      icon: "shield-check",
      color: "bg-slate-700",
      books: [
        { id: "cbse_11_ncc", title: "National Cadet Corps (NCC)", linkPrefix: "https://cbseacademic.nic.in/web_material/doc/2014/10_National_Cadet_Corps_Class_XI.pdf", chapters: [] }
      ]
    },
    "English": {
      icon: "book-open",
      color: "bg-purple-500",
      books: [
        { id: "cbse_11_en_func1", title: "Functional English: Language Skills", linkPrefix: "https://cbseacademic.nic.in/web_material/doc/Language_Skills_Books_Unit-1&2.pdf", chapters: [] },
        { id: "cbse_11_en_func2", title: "Functional English: Literature Reader", linkPrefix: "https://cbseacademic.nic.in/web_material/doc/Literature_Reader-Functional%20English_U1&U2.pdf", chapters: [] },
        { id: "cbse_11_en_canter", title: "The Canterville Ghost", linkPrefix: "https://cbseacademic.nic.in/web_material/doc/The%20Canterville%20Ghost,%20by%20Oscar%20Wilde.pdf", chapters: [] },
        { id: "cbse_11_en_slavery", title: "Up from Slavery", linkPrefix: "https://cbseacademic.nic.in/web_material/doc/Up%20from%20Slavery_%20An%20Autobiography,%20by%20Booker%20T.pdf", chapters: [] }
      ]
    },
    "Computer Science": {
      icon: "monitor",
      color: "bg-gray-700",
      books: [
        { id: "cbse_11_cs", title: "Computer Science (Python)", linkPrefix: "https://cbseacademic.nic.in/web_material/doc/cs/1_Computer-Science-Python-Book-Class-XI.pdf", chapters: [] }
      ]
    }
  },
  12: {
    "Business Studies": {
      icon: "briefcase",
      color: "bg-indigo-600",
      books: [
        { id: "cbse_12_bs", title: "Business Studies: Chapter 10", linkPrefix: "https://cbseacademic.nic.in/web_material/publication/BusinessStudiesXII_Chapter10_2023.pdf", chapters: [] }
      ]
    },
    "Library & Info Science": {
      icon: "book-copy",
      color: "bg-teal-600",
      books: [
        { id: "cbse_12_lib", title: "Library & Information Science", linkPrefix: "https://cbseacademic.nic.in/web_material/publication/library_science-XII_2022.pdf", chapters: [] }
      ]
    },
    "Biotechnology": {
      icon: "microscope",
      color: "bg-cyan-600",
      books: [
        { id: "cbse_12_bio", title: "Biotechnology", linkPrefix: "https://cbseacademic.nic.in/web_material/doc/2015/New_Biotechnology%20(Class%20XII).pdf", chapters: [] }
      ]
    },
    "Entrepreneurship": {
      icon: "zap",
      color: "bg-amber-600",
      books: [
        { id: "cbse_12_ent", title: "Entrepreneurship", linkPrefix: "https://cbseacademic.nic.in/web_material/Circulars/2014/18_Enterpreneurship_Book.pdf", chapters: [] }
      ]
    },
    "Legal Studies": {
      icon: "scale",
      color: "bg-rose-600",
      books: [
        { id: "cbse_12_legal", title: "Legal Studies", linkPrefix: "https://cbseacademic.nic.in/web_material/publication/LegalStudies_XII_2023.pdf", chapters: [] }
      ]
    },
    "Engineering Graphics": {
      icon: "pen-tool",
      color: "bg-zinc-600",
      books: [
        { id: "cbse_12_eng_graph", title: "Engineering Graphics", linkPrefix: "https://cbseacademic.nic.in/web_material/doc/Engineering_Graphics_ClassXII.pdf", chapters: [] }
      ]
    },
    "Geospatial Technology": {
      icon: "map",
      color: "bg-emerald-600",
      books: [
        { id: "cbse_12_geo", title: "Geospatial Technology", linkPrefix: "https://cbseacademic.nic.in/web_material/doc/2014/7_Geospatial%20Technology%20Text%20Book%20(Class-XII).pdf", chapters: [] }
      ]
    },
    "Economics": {
      icon: "trending-up",
      color: "bg-blue-600",
      books: [
        { id: "cbse_12_eco_micro_en", title: "Introductory Microeconomics (En)", linkPrefix: "https://cbseacademic.nic.in/web_material/doc/supmaterial/1_1_English_A.pdf", chapters: [] },
        { id: "cbse_12_eco_micro_hi", title: "Introductory Microeconomics (Hi)", linkPrefix: "https://cbseacademic.nic.in/web_material/doc/supmaterial/2_1_Hindi_A.pdf", chapters: [] },
        { id: "cbse_12_eco_macro_en", title: "Introductory Macroeconomics (En)", linkPrefix: "https://cbseacademic.nic.in/web_material/doc/supmaterial/3_2_English_B.pdf", chapters: [] },
        { id: "cbse_12_eco_macro_hi", title: "Introductory Macroeconomics (Hi)", linkPrefix: "https://cbseacademic.nic.in/web_material/doc/supmaterial/4_2_Hindi_B.pdf", chapters: [] }
      ]
    },
    "Computer Science": {
      icon: "monitor",
      color: "bg-gray-700",
      books: [
        { id: "cbse_12_cs", title: "Computer Science (Python)", linkPrefix: "https://cbseacademic.nic.in/web_material/doc/cs/2_Computer_Science_Python_ClassXII.pdf", chapters: [] }
      ]
    },
    "English": {
      icon: "book-open",
      color: "bg-purple-500",
      books: [
        { id: "cbse_12_en_silas", title: "Silas Marner", linkPrefix: "https://cbseacademic.nic.in/web_material/doc/novels/1_Silas%20Marner,%20by%20George%20Eliot%20-%20Class%20-%20XII.pdf", chapters: [] },
        { id: "cbse_12_en_invisible", title: "The Invisible Man", linkPrefix: "https://cbseacademic.nic.in/web_material/doc/novels/2_The%20Invisible%20Man,%20by%20H.%20G%20-%20Class%20-%20XII.pdf", chapters: [] },
        { id: "cbse_12_en_skills", title: "Language Skills Book", linkPrefix: "https://cbseacademic.nic.in/web_material/doc/english/2_Language_Skill_Book.pdf", chapters: [] },
        { id: "cbse_12_en_lit", title: "Literature Reader", linkPrefix: "https://cbseacademic.nic.in/web_material/doc/english/3_Literature_Reader.pdf", chapters: [] }
      ]
    }
  }
};
