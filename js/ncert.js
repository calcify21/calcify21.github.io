// --- NCERT CLASSES 9-12 ENGLISH MEDIUM DATA ---
      const allClassesData = {};

      // ==================== CLASS 9 ====================
      allClassesData[9] = {
        Mathematics: {
          icon: "calculator",
          color: "bg-red-500",
          books: [
            {
              id: "Maths",
              title: "Mathematics (Textbook)",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/iemh1",
              chapters: [
                { name: "1. Number Systems", pdf: "01.pdf" },
                { name: "2. Polynomials", pdf: "02.pdf" },
                { name: "3. Coordinate Geometry", pdf: "03.pdf" },
                { name: "4. Linear Equations in Two Variables", pdf: "04.pdf" },
                { name: "5. Introduction to Euclid's Geometry", pdf: "05.pdf" },
                { name: "6. Lines and Angles", pdf: "06.pdf" },
                { name: "7. Triangles", pdf: "07.pdf" },
                { name: "8. Quadrilaterals", pdf: "08.pdf" },
                { name: "9. Circles", pdf: "09.pdf" },
                { name: "10. Heron's Formula", pdf: "10.pdf" },
                { name: "11. Surface Areas and Volumes", pdf: "11.pdf" },
                { name: "12. Statistics", pdf: "12.pdf" },
              ],
            },
          ],
        },
        Science: {
          icon: "flask-conical",
          color: "bg-green-500",
          books: [
            {
              id: "Science",
              title: "Science (Textbook)",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/iesc1",
              chapters: [
                { name: "1. Matter in Our Surroundings", pdf: "01.pdf" },
                { name: "2. Is Matter Around Us Pure", pdf: "02.pdf" },
                { name: "3. Atoms and Molecules", pdf: "03.pdf" },
                { name: "4. Structure of the Atom", pdf: "04.pdf" },
                { name: "5. The Fundamental Unit of Life", pdf: "05.pdf" },
                { name: "6. Tissues", pdf: "06.pdf" },
                { name: "7. Motion", pdf: "07.pdf" },
                { name: "8. Force and Laws of Motion", pdf: "08.pdf" },
                { name: "9. Gravitation", pdf: "09.pdf" },
                { name: "10. Work and Energy", pdf: "10.pdf" },
                { name: "11. Sound", pdf: "11.pdf" },
                { name: "12. Improvement in Food Resources", pdf: "12.pdf" },
              ],
            },
          ],
        },
        English: {
          icon: "book-open",
          color: "bg-purple-500",
          books: [
            {
              id: "Beehive",
              title: "English: Beehive (Main Course Book)",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/iebe1",
              chapters: [
                { name: "1. The Fun They Had", pdf: "01.pdf" },
                { name: "2. The Sound of Music", pdf: "02.pdf" },
                { name: "3. The Little Girl", pdf: "03.pdf" },
                { name: "4. A Truly Beautiful Mind", pdf: "04.pdf" },
                { name: "5. The Snake and the Mirror", pdf: "05.pdf" },
                { name: "6. My Childhood", pdf: "06.pdf" },
                { name: "7. Reach for the Top", pdf: "07.pdf" },
                { name: "8. Kathmandu ", pdf: "08.pdf" },
                { name: "9. If I Were You", pdf: "09.pdf" },
              ],
            },
            {
              id: "Moments",
              title: "English: Moments (Supplementary Reader)",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/iemo1",
              chapters: [
                { name: "1. The Lost Child", pdf: "01.pdf" },
                { name: "2. The Adventures of Toto", pdf: "02.pdf" },
                { name: "3. Iswaran the Storyteller", pdf: "03.pdf" },
                { name: "4. In the Kingdom of Fools", pdf: "04.pdf" },
                { name: "5. The Happy Prince", pdf: "05.pdf" },
                { name: "6. Weathering the Storm in Ersama", pdf: "06.pdf" },
                { name: "7. The Last Leaf", pdf: "07.pdf" },
                { name: "8. A House Is Not a Home", pdf: "08.pdf" },
                { name: "9. The Beggar", pdf: "09.pdf" },
              ],
            },
            {
              id: "WordsExpressions",
              title: "English: Words and Expressions - I (Workbook)",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/iewe1",
              chapters: [
                { name: "1. Unit 1", pdf: "01.pdf" },
                { name: "2. Unit 2", pdf: "02.pdf" },
                { name: "3. Unit 3", pdf: "03.pdf" },
                { name: "4. Unit 4", pdf: "04.pdf" },
                { name: "5. Unit 5", pdf: "05.pdf" },
                { name: "6. Unit 6", pdf: "06.pdf" },
                { name: "7. Unit 7", pdf: "07.pdf" },
                { name: "8. Unit 8", pdf: "08.pdf" },
                { name: "9. Unit 9", pdf: "09.pdf" },
              ],
            },
          ],
        },
        "Social Science (SST)": {
          icon: "globe",
          color: "bg-yellow-500",
          books: [
            {
              id: "History",
              title: "History: India and the Contemporary World - I",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/iess3",
              chapters: [
                { name: "1. The French Revolution", pdf: "01.pdf" },
                {
                  name: "2. Socialism in Europe and the Russian Revolution",
                  pdf: "02.pdf",
                },
                { name: "3. Nazism and the Rise of Hitler", pdf: "03.pdf" },
                { name: "4. Forest Society and Colonialism", pdf: "04.pdf" },
                { name: "5. Pastoralists in the Modern World", pdf: "05.pdf" },
              ],
            },
            {
              id: "Geography",
              title: "Geography: Contemporary India - I",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/iess1",
              chapters: [
                { name: "1. India - Size and Location", pdf: "01.pdf" },
                { name: "2. Physical Features of India", pdf: "02.pdf" },
                { name: "3. Drainage", pdf: "03.pdf" },
                { name: "4. Climate", pdf: "04.pdf" },
                { name: "5. Natural Vegetation and Wildlife", pdf: "05.pdf" },
                { name: "6. Population", pdf: "06.pdf" },
              ],
            },
            {
              id: "Civics",
              title: "Political Science (Civics): Democratic Politics - I",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/iess4",
              chapters: [
                { name: "1. What is Democracy? Why Democracy?", pdf: "01.pdf" },
                { name: "2. Constitutional Design", pdf: "02.pdf" },
                { name: "3. Electoral Politics", pdf: "03.pdf" },
                { name: "4. Working of Institutions", pdf: "04.pdf" },
                { name: "5. Democratic Rights", pdf: "05.pdf" },
              ],
            },
            {
              id: "Economics",
              title: "Economics: Economics",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/iess2",
              chapters: [
                { name: "1. The Story of Village Palampur", pdf: "01.pdf" },
                { name: "2. People as Resource", pdf: "02.pdf" },
                { name: "3. Poverty as a Challenge", pdf: "03.pdf" },
                { name: "4. Food Security in India", pdf: "04.pdf" },
              ],
            },
          ],
        },
        "Information & Comm. Tech.": {
          icon: "monitor",
          color: "bg-blue-600",
          books: [
            {
              id: "ICT",
              title: "Information and Communication Technology (ICT)",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/iict1",
              chapters: [
                { name: "1. Introduction to ICT", pdf: "01.pdf" },
                { name: "2. Creating Textual Communication", pdf: "02.pdf" },
                { name: "3. Creating Visual Communication ", pdf: "03.pdf" },
                {
                  name: "4. Creating Audio‑Video Communication",
                  pdf: "04.pdf",
                },
                { name: "5. Presenting Ideas", pdf: "05.pdf" },
                { name: "6. Getting Connected: Internet", pdf: "06.pdf" },
                {
                  name: "7. Safety and Security in the Cyber World ",
                  pdf: "07.pdf",
                },
                { name: "8. Fun with Logic", pdf: "08.pdf" },
              ],
            },
          ],
        },

        "Health & Physical Education": {
          icon: "heart-pulse",
          color: "bg-pink-600",
          books: [
            {
              id: "HPE",
              title: "Health and Physical Education",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/iehp1",
              chapters: [
                { name: "1. Health and Diseases", pdf: "01.pdf" },
                { name: "2. Growing up with Confidence", pdf: "02.pdf" },
                { name: "3. Physical Education", pdf: "03.pdf" },
                { name: "4. Physical Fitness", pdf: "04.pdf" },
                { name: "5. Sports Training", pdf: "05.pdf" },
                { name: "6. Individual Sports", pdf: "06.pdf" },
                { name: "7. Team Games", pdf: "07.pdf" },
                { name: "8. Ethics in Sports", pdf: "08.pdf" },
                {
                  name: "9. Personality Development through Yoga",
                  pdf: "09.pdf",
                },
                { name: "10. Waste Management", pdf: "10.pdf" },
                { name: "11. Diet for Healthy Living", pdf: "11.pdf" },
                { name: "12. First Aid and Safety", pdf: "12.pdf" },
                { name: "13. Social Health", pdf: "13.pdf" },
                {
                  name: "14. Adolescent Friendly Health Services",
                  pdf: "14.pdf",
                },
              ],
            },
          ],
        },

        Hindi: {
          icon: "feather",
          color: "bg-orange-500",
          books: [
            {
              id: "Kshitij",
              title: "क्षितिज",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/ihks1",
              // CUSTOM CHAPTERS
              chapters: [
                { name: "1. दो बैलों की कथा", pdf: "01.pdf" },
                { name: "2. ल्हासा की ओर", pdf: "02.pdf" },
                { name: "3. उपभोक्तावाद की संस्कृति", pdf: "03.pdf" },
                { name: "4. साँवले सपनों की याद", pdf: "04.pdf" },
                { name: "5. प्रेमचंद के फटे जूते", pdf: "05.pdf" },
                { name: "6. मेरे बचपन के दिन", pdf: "06.pdf" },
                { name: "7. साखियाँ एवं सबद", pdf: "07.pdf" },
                { name: "8. वाख", pdf: "08.pdf" },
                { name: "9. सवैये", pdf: "09.pdf" },
                { name: "10. कैदी और कोकिला", pdf: "10.pdf" },
                { name: "11. ग्राम श्री", pdf: "11.pdf" },
                { name: "12. मेघ आए", pdf: "12.pdf" },
                { name: "13. बच्चे काम पर जा रहे हैं", pdf: "13.pdf" },
              ],
            },
            {
              id: "Sprash",
              title: "स्पर्श",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/ihsp1",
              // CUSTOM CHAPTERS (Sprash)
              chapters: [
                { name: "1. दुःख का अधिकार", pdf: "01.pdf" },
                { name: "2. एवरेस्ट : मेरी शिखर यात्रा", pdf: "02.pdf" },
                { name: "3. तुम कब जाओगे, अतिथि", pdf: "03.pdf" },
                {
                  name: "4. वैज्ञानिक चेतना के वाहक चंद्रशेखर वेंकट रामन्",
                  pdf: "04.pdf",
                },
                { name: "5. शुक्रतारे के समान", pdf: "05.pdf" },
                { name: "6. पद", pdf: "06.pdf" },
                { name: "7. दोहे", pdf: "07.pdf" },
                { name: "8. गीत-अगीत", pdf: "08.pdf" },
                { name: "9. अग्नि पथ", pdf: "09.pdf" },
                {
                  name: "10. नए इलाके में... / खुशबू रचते हैं हाथ",
                  pdf: "10.pdf",
                },
              ],
            },
            {
              id: "Kritika",
              title: "कृतिका",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/ihkr1",
              // CUSTOM CHAPTERS (Kritika)
              chapters: [
                { name: "1. इस जल प्रलय में", pdf: "01.pdf" },
                { name: "2. मेरे संग की औरतें", pdf: "02.pdf" },
                { name: "3. रीढ़ की हड्डी", pdf: "03.pdf" },
              ],
            },
            {
              id: "Sanchayan",
              title: "संचयन",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/ihsa1",
              // CUSTOM CHAPTERS (Sanchayan)
              chapters: [
                { name: "1. गिल्लू", pdf: "01.pdf" },
                { name: "2. स्मृति", pdf: "02.pdf" },
                { name: "3. कल्लू कुम्हार की उनाकोटी", pdf: "03.pdf" },
                { name: "4. मेरा छोटा-सा निजी पुस्तकालय", pdf: "04.pdf" },
              ],
            },
          ],
        },
        Sanskrit: {
          icon: "scroll",
          color: "bg-amber-700",
          books: [
            {
              id: "Shemushi",
              title: "शेमुषी (प्रथमो भागः)",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/ihsh1",
              // CUSTOM CHAPTERS (10 confirmed chapters)
              chapters: [
                { name: "1. भारतीवसन्तगीतिः", pdf: "01.pdf" },
                { name: "2. स्वर्णकाकः", pdf: "02.pdf" },
                { name: "3. गोदोहनम्", pdf: "03.pdf" },
                { name: "4. सूक्तिमौक्तिकम्", pdf: "04.pdf" },
                { name: "5. भ्रान्तो बालः", pdf: "05.pdf" },
                { name: "6. लौहतुला", pdf: "06.pdf" },
                { name: "7. सिकतासेतुः", pdf: "07.pdf" },
                { name: "8. जटायोः शौर्यम्", pdf: "08.pdf" },
                { name: "9. पर्यावरणम्", pdf: "09.pdf" },
                { name: "10. वाङ्मनःप्राणस्वरूपम्", pdf: "10.pdf" },
              ],
            },
            {
              id: "Vyakaranavithi",
              title: "व्याकरणवीथिः",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/jhva1",
              // 12 chapters only
              chapters: [
                { name: "1. वर्ण विचार", pdf: "01.pdf" },
                { name: "2. संज्ञा एवं परिभाषा प्रकरण", pdf: "02.pdf" },
                { name: "3. सन्धि", pdf: "03.pdf" },
                { name: "4. शब्दरूप सामान्य परिचय", pdf: "04.pdf" },
                { name: "5. धातुरूप सामान्य परिचय", pdf: "05.pdf" },
                { name: "6. उपसर्ग", pdf: "06.pdf" },
                { name: "7. अव्यय", pdf: "07.pdf" },
                { name: "8. प्रत्यय", pdf: "08.pdf" },
                { name: "9. समास परिचय", pdf: "09.pdf" },
                { name: "10. कारक और विभक्ति", pdf: "10.pdf" },
                { name: "11. वाच्य परिवर्तन", pdf: "11.pdf" },
                { name: "12. रचना प्रयोग", pdf: "12.pdf" },
              ],
            },
            {
              id: "AbhyaswaanBhav",
              title: "अभ्यासवान् भव",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/isab1",
              // 12 chapters only
              chapters: [
                { name: "1. अपठितावबोधनम्", pdf: "01.pdf" },
                { name: "2. पत्रम्", pdf: "02.pdf" },
                { name: "3. चित्रवर्णनम्", pdf: "03.pdf" },
                { name: "4. संवादानुच्छेदलेखनम्", pdf: "04.pdf" },
                { name: "5. रचनानुवादः", pdf: "05.pdf" },
                { name: "6. कारकोपपदविभक्तिः", pdf: "06.pdf" },
                { name: "7. सन्धिः", pdf: "07.pdf" },
                { name: "8. उपसर्गाव्ययप्रत्ययाः", pdf: "08.pdf" },
                { name: "9. समासाः", pdf: "09.pdf" },
                { name: "10. शब्दरूपाणि", pdf: "10.pdf" },
                { name: "11. धातुरूपाणि", pdf: "11.pdf" },
                { name: "12. वर्णविचारः", pdf: "12.pdf" },
              ],
            },
          ],
        },
      };

      // ==================== CLASS 10 ====================
      allClassesData[10] = {
        Mathematics: {
          icon: "calculator",
          color: "bg-red-500",
          books: [
            {
              id: "Maths10",
              title: "Mathematics",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/jemh1",
              chapters: [
                { name: "1. Real Numbers", pdf: "01.pdf" },
                { name: "2. Polynomials", pdf: "02.pdf" },
                {
                  name: "3. Pair of Linear Equations in Two Variables",
                  pdf: "03.pdf",
                },
                { name: "4. Quadratic Equations", pdf: "04.pdf" },
                { name: "5. Arithmetic Progressions", pdf: "05.pdf" },
                { name: "6. Triangles", pdf: "06.pdf" },
                { name: "7. Coordinate Geometry", pdf: "07.pdf" },
                { name: "8. Introduction to Trigonometry", pdf: "08.pdf" },
                { name: "9. Some Applications of Trigonometry", pdf: "09.pdf" },
                { name: "10. Circles", pdf: "10.pdf" },
                { name: "11. Areas Related to Circles", pdf: "11.pdf" },
                { name: "12. Surface Areas and Volumes", pdf: "12.pdf" },
                { name: "13. Statistics", pdf: "13.pdf" },
                { name: "14. Probability", pdf: "14.pdf" },
              ],
            },
          ],
        },
        Science: {
          icon: "flask-conical",
          color: "bg-green-500",
          books: [
            {
              id: "Science10",
              title: "Science",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/jesc1",
              chapters: [
                { name: "1. Chemical Reactions and Equations", pdf: "01.pdf" },
                { name: "2. Acids, Bases and Salts", pdf: "02.pdf" },
                { name: "3. Metals and Non-metals", pdf: "03.pdf" },
                { name: "4. Carbon and its Compounds", pdf: "04.pdf" },
                { name: "5. Life Processes", pdf: "05.pdf" },
                { name: "6. Control and Coordination", pdf: "06.pdf" },
                { name: "7. How do Organisms Reproduce", pdf: "07.pdf" },
                { name: "8. Heredity", pdf: "08.pdf" },
                { name: "9. Light – Reflection and Refraction", pdf: "09.pdf" },
                {
                  name: "10. The Human Eye and the Colourful World",
                  pdf: "10.pdf",
                },
                { name: "11. Electricity", pdf: "11.pdf" },
                {
                  name: "12. Magnetic Effects of Electric Current",
                  pdf: "12.pdf",
                },
                { name: "13. Our Environment", pdf: "13.pdf" },
              ],
            },
          ],
        },
        English: {
          icon: "book-open",
          color: "bg-purple-500",
          books: [
            {
              id: "FirstFlight",
              title: "First Flight",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/jeff1",
              chapters: [
                { name: "1. A Letter to God", pdf: "01.pdf" },
                {
                  name: "2. Nelson Mandela: Long Walk to Freedom",
                  pdf: "02.pdf",
                },
                { name: "3. Two Stories about Flying", pdf: "03.pdf" },
                { name: "4. From the Diary of Anne Frank", pdf: "04.pdf" },
                { name: "5. The Hundred Dresses – I", pdf: "05.pdf" },
                { name: "6. The Hundred Dresses – II", pdf: "06.pdf" },
                { name: "7. Glimpses of India", pdf: "07.pdf" },
                { name: "8. Mijbil the Otter", pdf: "08.pdf" },
                { name: "9. Madam Rides the Bus", pdf: "09.pdf" },
              ],
            },
            {
              id: "Footprints",
              title: "Footprints without Feet (Supplementary)",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/jefp1",
              chapters: [
                { name: "1. A Triumph of Surgery", pdf: "01.pdf" },
                { name: "2. The Thief's Story", pdf: "02.pdf" },
                { name: "3. The Midnight Visitor", pdf: "03.pdf" },
                { name: "4. A Question of Trust", pdf: "04.pdf" },
                { name: "5. Footprints without Feet", pdf: "05.pdf" },
                { name: "6. The Making of a Scientist", pdf: "06.pdf" },
                { name: "7. The Necklace", pdf: "07.pdf" },
                { name: "8. The Hack Driver", pdf: "08.pdf" },
                { name: "9. Bholi", pdf: "09.pdf" },
              ],
            },
            {
              id: "WordsExp2",
              title: "Words and Expressions - II",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/jewe2",
              chapters: [
                { name: "1. Unit 1", pdf: "01.pdf" },
                { name: "2. Unit 2", pdf: "02.pdf" },
                { name: "3. Unit 3", pdf: "03.pdf" },
                { name: "4. Unit 4", pdf: "04.pdf" },
                { name: "5. Unit 5", pdf: "05.pdf" },
                { name: "6. Unit 6", pdf: "06.pdf" },
                { name: "7. Unit 7", pdf: "07.pdf" },
                { name: "8. Unit 8", pdf: "08.pdf" },
                { name: "9. Unit 9", pdf: "09.pdf" },
              ],
            },
          ],
        },
        "Social Science (SST)": {
          icon: "globe",
          color: "bg-yellow-500",
          books: [
            {
              id: "History10",
              title: "History: India and the Contemporary World - II",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/jess3",
              chapters: [
                { name: "1. The Rise of Nationalism in Europe", pdf: "01.pdf" },
                { name: "2. Nationalism in India", pdf: "02.pdf" },
                { name: "3. The Making of a Global World", pdf: "03.pdf" },
                { name: "4. The Age of Industrialisation", pdf: "04.pdf" },
                {
                  name: "5. Print Culture and the Modern World",
                  pdf: "05.pdf",
                },
              ],
            },
            {
              id: "Geo10",
              title: "Geography: Contemporary India - II",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/jess1",
              chapters: [
                { name: "1. Resources and Development", pdf: "01.pdf" },
                { name: "2. Forest and Wildlife Resources", pdf: "02.pdf" },
                { name: "3. Water Resources", pdf: "03.pdf" },
                { name: "4. Agriculture", pdf: "04.pdf" },
                { name: "5. Minerals and Energy Resources", pdf: "05.pdf" },
                { name: "6. Manufacturing Industries", pdf: "06.pdf" },
                { name: "7. Lifelines of National Economy", pdf: "07.pdf" },
              ],
            },
            {
              id: "Civics10",
              title: "Political Science: Democratic Politics - II",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/jess4",
              chapters: [
                { name: "1. Power Sharing", pdf: "01.pdf" },
                { name: "2. Federalism", pdf: "02.pdf" },
                { name: "3. Democracy and Diversity", pdf: "03.pdf" },
                { name: "4. Gender, Religion and Caste", pdf: "04.pdf" },
                { name: "5. Popular Struggles and Movements", pdf: "05.pdf" },
              ],
            },
            {
              id: "Eco10",
              title: "Economics: Understanding Economic Development",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/jess2",
              chapters: [
                { name: "1. Development", pdf: "01.pdf" },
                { name: "2. Sectors of the Indian Economy", pdf: "02.pdf" },
                { name: "3. Money and Credit", pdf: "03.pdf" },
                {
                  name: "4. Globalisation and the Indian Economy",
                  pdf: "04.pdf",
                },
                { name: "5. Consumer Rights", pdf: "05.pdf" },
              ],
            },
          ],
        },
        Hindi: {
          icon: "feather",
          color: "bg-orange-500",
          books: [
            {
              id: "Kshitij2",
              title: "क्षितिज (भाग 2)",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/jhks1",
              chapters: [
                { name: "1. सूरदास", pdf: "01.pdf" },
                { name: "2. तुलसीदास", pdf: "02.pdf" },
                { name: "3. देव", pdf: "03.pdf" },
                { name: "4. जयशंकर प्रसाद", pdf: "04.pdf" },
                { name: "5. सूर्यकान्त त्रिपाठी 'निराला'", pdf: "05.pdf" },
                { name: "6. नागार्जुन", pdf: "06.pdf" },
                { name: "7. गिरिजाकुमार माथुर", pdf: "07.pdf" },
                { name: "8. ऋतुराज", pdf: "08.pdf" },
                { name: "9. मंगलेश डबराल", pdf: "09.pdf" },
                { name: "10. स्वयं प्रकाश", pdf: "10.pdf" },
                { name: "11. रामवृक्ष बेनीपुरी", pdf: "11.pdf" },
                { name: "12. यशपाल", pdf: "12.pdf" },
              ],
            },
            {
              id: "Sparsh2",
              title: "स्पर्श (भाग 2)",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/jhsp1",
              chapters: [
                { name: "1. पद", pdf: "01.pdf" },
                { name: "2. मीरा", pdf: "02.pdf" },
                { name: "3. बिहारी", pdf: "03.pdf" },
                { name: "4. मैथिलीशरण गुप्त", pdf: "04.pdf" },
                { name: "5. सुमित्रानंदन पंत", pdf: "05.pdf" },
                { name: "6. वीरेन डंगवाल", pdf: "06.pdf" },
                { name: "7. कैफ़ी आज़मी", pdf: "07.pdf" },
                { name: "8. रवींद्रनाथ ठाकुर", pdf: "08.pdf" },
                { name: "9. प्रेमचंद", pdf: "09.pdf" },
                { name: "10. सीताराम सेकसरिया", pdf: "10.pdf" },
                { name: "11. मन्नू भंडारी", pdf: "11.pdf" },
                { name: "12. महावीर प्रसाद द्विवेदी", pdf: "12.pdf" },
                { name: "13. सर्वेश्वर दयाल सक्सेना", pdf: "13.pdf" },
                { name: "14. रवींद्र केलेकर", pdf: "14.pdf" },
              ],
            },
            {
              id: "Sanchayan2",
              title: "संचयन (भाग 2)",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/jhsy1",
              chapters: [
                { name: "1. हरिहर काका", pdf: "01.pdf" },
                { name: "2. सपनों के-से दिन", pdf: "02.pdf" },
                { name: "3. टोपी शुक्ला", pdf: "03.pdf" },
              ],
            },
            {
              id: "Kritika2",
              title: "कृतिका (भाग 2)",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/jhkr1",
              chapters: [
                { name: "1. माता का अँचल", pdf: "01.pdf" },
                { name: "2. जॉर्ज पंचम की नाक", pdf: "02.pdf" },
                { name: "3. साना-साना हाथ जोड़ि", pdf: "03.pdf" },
              ],
            },
          ],
        },
        Sanskrit: {
          icon: "scroll",
          color: "bg-amber-700",
          books: [
            {
              id: "Shemushi2",
              title: "शेमुषी (द्वितीयो भागः)",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/jhsk1",
              chapters: [
                { name: "1. शुचिपर्यावरणम्", pdf: "01.pdf" },
                { name: "2. बुद्धिर्बलवती सदा", pdf: "02.pdf" },
                { name: "3. व्यायामः सर्वदा पथ्यः", pdf: "03.pdf" },
                { name: "4. शिशुलालनम्", pdf: "04.pdf" },
                { name: "5. जननी तुल्यवत्सला", pdf: "05.pdf" },
                { name: "6. सुभाषितानि", pdf: "06.pdf" },
                { name: "7. सौहार्दं प्रकृतेः शोभा", pdf: "07.pdf" },
                { name: "8. विचित्रः साक्षी", pdf: "08.pdf" },
                { name: "9. सूक्तयः", pdf: "09.pdf" },
                { name: "10. अनयोक्त्यः", pdf: "10.pdf" },
              ],
            },
            {
              id: "Vyakaranavithi10",
              title: "व्याकरणवीथिः",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/jhva1",
              chapters: [
                { name: "1. वर्ण विचार", pdf: "01.pdf" },
                { name: "2. संज्ञा एवं परिभाषा प्रकरण", pdf: "02.pdf" },
                { name: "3. सन्धि", pdf: "03.pdf" },
                { name: "4. शब्दरूप सामान्य परिचय", pdf: "04.pdf" },
                { name: "5. धातुरूप सामान्य परिचय", pdf: "05.pdf" },
                { name: "6. उपसर्ग", pdf: "06.pdf" },
                { name: "7. अव्यय", pdf: "07.pdf" },
                { name: "8. प्रत्यय", pdf: "08.pdf" },
                { name: "9. समास परिचय", pdf: "09.pdf" },
                { name: "10. कारक और विभक्ति", pdf: "10.pdf" },
                { name: "11. वाच्य परिवर्तन", pdf: "11.pdf" },
                { name: "12. रचना प्रयोग", pdf: "12.pdf" },
              ],
            },
          ],
        },
      };

      // ==================== CLASS 11 ====================
      allClassesData[11] = {
        Physics: {
          icon: "atom",
          color: "bg-blue-700",
          books: [
            {
              id: "Phy11P1",
              title: "Physics Part-I",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/keph1",
              chapters: [
                { name: "1. Physical World", pdf: "01.pdf" },
                { name: "2. Units and Measurements", pdf: "02.pdf" },
                { name: "3. Motion in a Straight Line", pdf: "03.pdf" },
                { name: "4. Motion in a Plane", pdf: "04.pdf" },
                { name: "5. Laws of Motion", pdf: "05.pdf" },
                { name: "6. Work, Energy and Power", pdf: "06.pdf" },
                {
                  name: "7. System of Particles and Rotational Motion",
                  pdf: "07.pdf",
                },
              ],
            },
            {
              id: "Phy11P2",
              title: "Physics Part-II",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/keph2",
              chapters: [
                { name: "8. Gravitation", pdf: "01.pdf" },
                { name: "9. Mechanical Properties of Solids", pdf: "02.pdf" },
                { name: "10. Mechanical Properties of Fluids", pdf: "03.pdf" },
                { name: "11. Thermal Properties of Matter", pdf: "04.pdf" },
                { name: "12. Thermodynamics", pdf: "05.pdf" },
                { name: "13. Kinetic Theory", pdf: "06.pdf" },
                { name: "14. Oscillations", pdf: "07.pdf" },
              ],
            },
          ],
        },
        Chemistry: {
          icon: "flask-conical",
          color: "bg-green-600",
          books: [
            {
              id: "Chem11P1",
              title: "Chemistry Part-I",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/kech1",
              chapters: [
                { name: "1. Some Basic Concepts of Chemistry", pdf: "01.pdf" },
                { name: "2. Structure of Atom", pdf: "02.pdf" },
                { name: "3. Classification of Elements", pdf: "03.pdf" },
                {
                  name: "4. Chemical Bonding and Molecular Structure",
                  pdf: "04.pdf",
                },
                { name: "5. Thermodynamics", pdf: "05.pdf" },
                { name: "6. Equilibrium", pdf: "06.pdf" },
              ],
            },
            {
              id: "Chem11P2",
              title: "Chemistry Part-II",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/kech2",
              chapters: [
                { name: "7. Redox Reactions", pdf: "01.pdf" },
                { name: "8. Organic Chemistry", pdf: "02.pdf" },
                { name: "9. Hydrocarbons", pdf: "03.pdf" },
              ],
            },
          ],
        },
        Mathematics: {
          icon: "calculator",
          color: "bg-red-500",
          books: [
            {
              id: "Maths11",
              title: "Mathematics",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/kemh1",
              chapters: [
                { name: "1. Sets", pdf: "01.pdf" },
                { name: "2. Relations and Functions", pdf: "02.pdf" },
                { name: "3. Trigonometric Functions", pdf: "03.pdf" },
                {
                  name: "4. Complex Numbers and Quadratic Equations",
                  pdf: "04.pdf",
                },
                { name: "5. Linear Inequalities", pdf: "05.pdf" },
                { name: "6. Permutations and Combinations", pdf: "06.pdf" },
                { name: "7. Binomial Theorem", pdf: "07.pdf" },
                { name: "8. Sequences and Series", pdf: "08.pdf" },
                { name: "9. Straight Lines", pdf: "09.pdf" },
                { name: "10. Conic Sections", pdf: "10.pdf" },
                {
                  name: "11. Introduction to Three Dimensional Geometry",
                  pdf: "11.pdf",
                },
                { name: "12. Limits and Derivatives", pdf: "12.pdf" },
                { name: "13. Statistics", pdf: "13.pdf" },
                { name: "14. Probability", pdf: "14.pdf" },
              ],
            },
          ],
        },
        Biology: {
          icon: "leaf",
          color: "bg-emerald-600",
          books: [
            {
              id: "Bio11",
              title: "Biology",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/kebo1",
              chapters: [
                { name: "1. The Living World", pdf: "01.pdf" },
                { name: "2. Biological Classification", pdf: "02.pdf" },
                { name: "3. Plant Kingdom", pdf: "03.pdf" },
                { name: "4. Animal Kingdom", pdf: "04.pdf" },
                { name: "5. Morphology of Flowering Plants", pdf: "05.pdf" },
                { name: "6. Anatomy of Flowering Plants", pdf: "06.pdf" },
                {
                  name: "7. Structural Organisation in Animals",
                  pdf: "07.pdf",
                },
                { name: "8. Cell: The Unit of Life", pdf: "08.pdf" },
                { name: "9. Biomolecules", pdf: "09.pdf" },
                { name: "10. Cell Cycle and Cell Division", pdf: "10.pdf" },
                { name: "11. Photosynthesis in Higher Plants", pdf: "11.pdf" },
                { name: "12. Respiration in Plants", pdf: "12.pdf" },
                { name: "13. Plant Growth and Development", pdf: "13.pdf" },
                { name: "14. Breathing and Exchange of Gases", pdf: "14.pdf" },
                { name: "15. Body Fluids and Circulation", pdf: "15.pdf" },
                {
                  name: "16. Excretory Products and their Elimination",
                  pdf: "16.pdf",
                },
                { name: "17. Locomotion and Movement", pdf: "17.pdf" },
                { name: "18. Neural Control and Coordination", pdf: "18.pdf" },
                {
                  name: "19. Chemical Coordination and Integration",
                  pdf: "19.pdf",
                },
              ],
            },
          ],
        },
        English: {
          icon: "book-open",
          color: "bg-purple-500",
          books: [
            {
              id: "Hornbill",
              title: "Hornbill",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/kehb1",
              chapters: [
                { name: "1. The Portrait of a Lady", pdf: "01.pdf" },
                { name: "2. We're Not Afraid to Die", pdf: "02.pdf" },
                { name: "3. Discovering Tut", pdf: "03.pdf" },
                { name: "4. Landscape of the Soul", pdf: "04.pdf" },
                { name: "5. The Ailing Planet", pdf: "05.pdf" },
                { name: "6. The Browning Version", pdf: "06.pdf" },
                { name: "7. The Adventure", pdf: "07.pdf" },
                { name: "8. Silk Road", pdf: "08.pdf" },
                { name: "9. Poem: A Photograph", pdf: "09.pdf" },
                { name: "10. Poem: The Laburnum Top", pdf: "10.pdf" },
                { name: "11. Poem: The Voice of the Rain", pdf: "11.pdf" },
                { name: "12. Poem: Childhood", pdf: "12.pdf" },
                { name: "13. Poem: Father to Son", pdf: "13.pdf" },
                { name: "14. Poem: Miscellany", pdf: "14.pdf" },
              ],
            },
            {
              id: "Snapshots",
              title: "Snapshots (Supplementary)",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/kesp1",
              chapters: [
                {
                  name: "1. The Summer of the Beautiful White Horse",
                  pdf: "01.pdf",
                },
                { name: "2. The Address", pdf: "02.pdf" },
                { name: "3. Ranga's Marriage", pdf: "03.pdf" },
                { name: "4. Albert Einstein at School", pdf: "04.pdf" },
                { name: "5. Mother's Day", pdf: "05.pdf" },
              ],
            },
          ],
        },
        Accountancy: {
          icon: "indian-rupee",
          color: "bg-teal-600",
          books: [
            {
              id: "Acc11P1",
              title: "Financial Accounting - I",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/keac1",
              chapters: [
                { name: "1. Introduction to Accounting", pdf: "01.pdf" },
                { name: "2. Theory Base of Accounting", pdf: "02.pdf" },
                { name: "3. Recording of Transactions - I", pdf: "03.pdf" },
                { name: "4. Recording of Transactions - II", pdf: "04.pdf" },
                { name: "5. Bank Reconciliation Statement", pdf: "05.pdf" },
                {
                  name: "6. Trial Balance and Rectification of Errors",
                  pdf: "06.pdf",
                },
                {
                  name: "7. Depreciation, Provisions and Reserves",
                  pdf: "07.pdf",
                },
              ],
            },
            {
              id: "Acc11P2",
              title: "Accountancy - II",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/keac2",
              chapters: [
                { name: "1. Financial Statements", pdf: "01.pdf" },
                { name: "2. Financial Statements - II", pdf: "02.pdf" },
              ],
            },
          ],
        },
        "Business Studies": {
          icon: "briefcase",
          color: "bg-indigo-600",
          books: [
            {
              id: "BS11",
              title: "Business Studies",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/kebs1",
              chapters: [
                { name: "1. Business, Trade and Commerce", pdf: "01.pdf" },
                { name: "2. Forms of Business Organisation", pdf: "02.pdf" },
                {
                  name: "3. Private, Public and Global Enterprises",
                  pdf: "03.pdf",
                },
                { name: "4. Business Services", pdf: "04.pdf" },
                { name: "5. Emerging Modes of Business", pdf: "05.pdf" },
                {
                  name: "6. Social Responsibilities of Business",
                  pdf: "06.pdf",
                },
                { name: "7. Formation of a Company", pdf: "07.pdf" },
                { name: "8. Sources of Business Finance", pdf: "08.pdf" },
                { name: "9. Small Business", pdf: "09.pdf" },
                { name: "10. Internal Trade", pdf: "10.pdf" },
                { name: "11. International Business", pdf: "11.pdf" },
              ],
            },
          ],
        },
        Economics: {
          icon: "trending-up",
          color: "bg-cyan-600",
          books: [
            {
              id: "IndianEco11",
              title: "Indian Economic Development",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/keec1",
              chapters: [
                {
                  name: "1. Indian Economy on the Eve of Independence",
                  pdf: "01.pdf",
                },
                { name: "2. Indian Economy 1950-1990", pdf: "02.pdf" },
                {
                  name: "3. Liberalisation, Privatisation and Globalisation",
                  pdf: "03.pdf",
                },
                { name: "4. Poverty", pdf: "04.pdf" },
                { name: "5. Human Capital Formation in India", pdf: "05.pdf" },
                { name: "6. Rural Development", pdf: "06.pdf" },
                { name: "7. Employment", pdf: "07.pdf" },
                { name: "8. Infrastructure", pdf: "08.pdf" },
              ],
            },
            {
              id: "Stats11",
              title: "Statistics for Economics",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/kest1",
              chapters: [
                { name: "1. Introduction", pdf: "01.pdf" },
                { name: "2. Collection of Data", pdf: "02.pdf" },
                { name: "3. Organisation of Data", pdf: "03.pdf" },
                { name: "4. Presentation of Data", pdf: "04.pdf" },
                { name: "5. Measures of Central Tendency", pdf: "05.pdf" },
                { name: "6. Measures of Dispersion", pdf: "06.pdf" },
                { name: "7. Correlation", pdf: "07.pdf" },
                { name: "8. Index Numbers", pdf: "08.pdf" },
              ],
            },
          ],
        },
        History: {
          icon: "landmark",
          color: "bg-yellow-600",
          books: [
            {
              id: "History11",
              title: "Themes in World History",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/kehs1",
              chapters: [
                { name: "1. From the Beginning of Time", pdf: "01.pdf" },
                { name: "2. Writing and City Life", pdf: "02.pdf" },
                { name: "3. An Empire Across Three Continents", pdf: "03.pdf" },
                { name: "4. The Central Islamic Lands", pdf: "04.pdf" },
                { name: "5. Nomadic Empires", pdf: "05.pdf" },
                { name: "6. The Three Orders", pdf: "06.pdf" },
                { name: "7. Changing Cultural Traditions", pdf: "07.pdf" },
              ],
            },
          ],
        },
        "Political Science": {
          icon: "scale",
          color: "bg-rose-600",
          books: [
            {
              id: "PolTheory11",
              title: "Political Theory",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/keps1",
              chapters: [
                { name: "1. Political Theory: An Introduction", pdf: "01.pdf" },
                { name: "2. Freedom", pdf: "02.pdf" },
                { name: "3. Equality", pdf: "03.pdf" },
                { name: "4. Social Justice", pdf: "04.pdf" },
                { name: "5. Rights", pdf: "05.pdf" },
                { name: "6. Citizenship", pdf: "06.pdf" },
                { name: "7. Nationalism", pdf: "07.pdf" },
                { name: "8. Secularism", pdf: "08.pdf" },
              ],
            },
            {
              id: "IndConst11",
              title: "Indian Constitution at Work",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/keps2",
              chapters: [
                { name: "1. Constitution: Why and How?", pdf: "01.pdf" },
                { name: "2. Rights in the Indian Constitution", pdf: "02.pdf" },
                { name: "3. Election and Representation", pdf: "03.pdf" },
                { name: "4. Executive", pdf: "04.pdf" },
                { name: "5. Legislature", pdf: "05.pdf" },
                { name: "6. Judiciary", pdf: "06.pdf" },
                { name: "7. Federalism", pdf: "07.pdf" },
                { name: "8. Local Governments", pdf: "08.pdf" },
                { name: "9. Constitution as a Living Document", pdf: "09.pdf" },
                {
                  name: "10. The Philosophy of the Constitution",
                  pdf: "10.pdf",
                },
              ],
            },
          ],
        },
        Geography: {
          icon: "globe",
          color: "bg-lime-600",
          books: [
            {
              id: "PhyGeo11",
              title: "Fundamentals of Physical Geography",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/kegy2",
              chapters: [
                { name: "1. Geography as a Discipline", pdf: "01.pdf" },
                {
                  name: "2. The Origin and Evolution of the Earth",
                  pdf: "02.pdf",
                },
                { name: "3. Interior of the Earth", pdf: "03.pdf" },
                {
                  name: "4. Distribution of Oceans and Continents",
                  pdf: "04.pdf",
                },
                { name: "5. Minerals and Rocks", pdf: "05.pdf" },
                { name: "6. Geomorphic Processes", pdf: "06.pdf" },
                { name: "7. Landforms and their Evolution", pdf: "07.pdf" },
                {
                  name: "8. Composition and Structure of Atmosphere",
                  pdf: "08.pdf",
                },
                { name: "9. Solar Radiation, Heat Balance", pdf: "09.pdf" },
                {
                  name: "10. Atmospheric Circulation and Weather Systems",
                  pdf: "10.pdf",
                },
                { name: "11. Water in the Atmosphere", pdf: "11.pdf" },
                { name: "12. World Climate and Climate Change", pdf: "12.pdf" },
                { name: "13. Water (Oceans)", pdf: "13.pdf" },
                { name: "14. Movements of Ocean Water", pdf: "14.pdf" },
              ],
            },
            {
              id: "IndPhyEnv11",
              title: "India - Physical Environment",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/kegy1",
              chapters: [
                { name: "1. India – Location", pdf: "01.pdf" },
                { name: "2. Structure and Physiography", pdf: "02.pdf" },
                { name: "3. Drainage System", pdf: "03.pdf" },
                { name: "4. Climate", pdf: "04.pdf" },
                { name: "5. Natural Vegetation", pdf: "05.pdf" },
                { name: "6. Soils", pdf: "06.pdf" },
              ],
            },
          ],
        },
        Psychology: {
          icon: "brain",
          color: "bg-pink-500",
          books: [
            {
              id: "Psy11",
              title: "Introduction to Psychology",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/kepy1",
              chapters: [
                { name: "1. What is Psychology?", pdf: "01.pdf" },
                { name: "2. Methods of Enquiry in Psychology", pdf: "02.pdf" },
                { name: "3. The Bases of Human Behaviour", pdf: "03.pdf" },
                { name: "4. Human Development", pdf: "04.pdf" },
                {
                  name: "5. Sensory, Attentional and Perceptual Processes",
                  pdf: "05.pdf",
                },
                { name: "6. Learning", pdf: "06.pdf" },
                { name: "7. Human Memory", pdf: "07.pdf" },
                { name: "8. Thinking", pdf: "08.pdf" },
              ],
            },
          ],
        },
        Sociology: {
          icon: "users",
          color: "bg-violet-600",
          books: [
            {
              id: "IntroSoc11",
              title: "Introducing Sociology",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/kesy1",
              chapters: [
                { name: "1. Sociology and Society", pdf: "01.pdf" },
                { name: "2. Terms, Concepts and their Use", pdf: "02.pdf" },
                { name: "3. Understanding Social Institutions", pdf: "03.pdf" },
                { name: "4. Culture and Socialisation", pdf: "04.pdf" },
                { name: "5. Doing Sociology: Research Methods", pdf: "05.pdf" },
              ],
            },
            {
              id: "UndSoc11",
              title: "Understanding Society",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/kesy2",
              chapters: [
                {
                  name: "1. Social Structure, Stratification and Social Processes",
                  pdf: "01.pdf",
                },
                { name: "2. Social Change and Social Order", pdf: "02.pdf" },
                { name: "3. Environment and Society", pdf: "03.pdf" },
                { name: "4. Introducing Western Sociologists", pdf: "04.pdf" },
                { name: "5. Indian Sociologists", pdf: "05.pdf" },
              ],
            },
          ],
        },
        "Computer Science": {
          icon: "monitor",
          color: "bg-gray-700",
          books: [
            {
              id: "CS11",
              title: "Computer Science",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/kecs1",
              chapters: [
                { name: "1. Computer System", pdf: "01.pdf" },
                {
                  name: "2. Encoding Schemes and Number System",
                  pdf: "02.pdf",
                },
                { name: "3. Emerging Trends", pdf: "03.pdf" },
                { name: "4. Introduction to Problem Solving", pdf: "04.pdf" },
                { name: "5. Getting Started with Python", pdf: "05.pdf" },
                { name: "6. Flow of Control", pdf: "06.pdf" },
                { name: "7. Functions", pdf: "07.pdf" },
                { name: "8. Strings", pdf: "08.pdf" },
                { name: "9. Lists", pdf: "09.pdf" },
                { name: "10. Tuples and Dictionaries", pdf: "10.pdf" },
                { name: "11. Societal Impacts", pdf: "11.pdf" },
              ],
            },
          ],
        },
      };

      // ==================== CLASS 12 ====================
      allClassesData[12] = {
        Physics: {
          icon: "atom",
          color: "bg-blue-700",
          books: [
            {
              id: "Phy12P1",
              title: "Physics Part-I",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/leph1",
              chapters: [
                { name: "1. Electric Charges and Fields", pdf: "01.pdf" },
                {
                  name: "2. Electrostatic Potential and Capacitance",
                  pdf: "02.pdf",
                },
                { name: "3. Current Electricity", pdf: "03.pdf" },
                { name: "4. Moving Charges and Magnetism", pdf: "04.pdf" },
                { name: "5. Magnetism and Matter", pdf: "05.pdf" },
                { name: "6. Electromagnetic Induction", pdf: "06.pdf" },
                { name: "7. Alternating Current", pdf: "07.pdf" },
                { name: "8. Electromagnetic Waves", pdf: "08.pdf" },
              ],
            },
            {
              id: "Phy12P2",
              title: "Physics Part-II",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/leph2",
              chapters: [
                {
                  name: "9. Ray Optics and Optical Instruments",
                  pdf: "01.pdf",
                },
                { name: "10. Wave Optics", pdf: "02.pdf" },
                {
                  name: "11. Dual Nature of Radiation and Matter",
                  pdf: "03.pdf",
                },
                { name: "12. Atoms", pdf: "04.pdf" },
                { name: "13. Nuclei", pdf: "05.pdf" },
                { name: "14. Semiconductor Electronics", pdf: "06.pdf" },
              ],
            },
          ],
        },
        Chemistry: {
          icon: "flask-conical",
          color: "bg-green-600",
          books: [
            {
              id: "Chem12P1",
              title: "Chemistry Part-I",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/lech1",
              chapters: [
                { name: "1. The Solid State", pdf: "01.pdf" },
                { name: "2. Solutions", pdf: "02.pdf" },
                { name: "3. Electrochemistry", pdf: "03.pdf" },
                { name: "4. Chemical Kinetics", pdf: "04.pdf" },
                { name: "5. Surface Chemistry", pdf: "05.pdf" },
              ],
            },
            {
              id: "Chem12P2",
              title: "Chemistry Part-II",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/lech2",
              chapters: [
                {
                  name: "6. General Principles and Processes of Isolation of Elements",
                  pdf: "01.pdf",
                },
                { name: "7. The p-Block Elements", pdf: "02.pdf" },
                { name: "8. The d- and f-Block Elements", pdf: "03.pdf" },
                { name: "9. Coordination Compounds", pdf: "04.pdf" },
                { name: "10. Haloalkanes and Haloarenes", pdf: "05.pdf" },
              ],
            },
          ],
        },
        Mathematics: {
          icon: "calculator",
          color: "bg-red-500",
          books: [
            {
              id: "Maths12P1",
              title: "Mathematics Part-I",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/lemh1",
              chapters: [
                { name: "1. Relations and Functions", pdf: "01.pdf" },
                { name: "2. Inverse Trigonometric Functions", pdf: "02.pdf" },
                { name: "3. Matrices", pdf: "03.pdf" },
                { name: "4. Determinants", pdf: "04.pdf" },
                { name: "5. Continuity and Differentiability", pdf: "05.pdf" },
                { name: "6. Application of Derivatives", pdf: "06.pdf" },
              ],
            },
            {
              id: "Maths12P2",
              title: "Mathematics Part-II",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/lemh2",
              chapters: [
                { name: "7. Integrals", pdf: "01.pdf" },
                { name: "8. Application of Integrals", pdf: "02.pdf" },
                { name: "9. Differential Equations", pdf: "03.pdf" },
                { name: "10. Vector Algebra", pdf: "04.pdf" },
                { name: "11. Three Dimensional Geometry", pdf: "05.pdf" },
                { name: "12. Linear Programming", pdf: "06.pdf" },
                { name: "13. Probability", pdf: "07.pdf" },
              ],
            },
          ],
        },
        Biology: {
          icon: "leaf",
          color: "bg-emerald-600",
          books: [
            {
              id: "Bio12",
              title: "Biology",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/lebo1",
              chapters: [
                { name: "1. Reproduction in Organisms", pdf: "01.pdf" },
                {
                  name: "2. Sexual Reproduction in Flowering Plants",
                  pdf: "02.pdf",
                },
                { name: "3. Human Reproduction", pdf: "03.pdf" },
                { name: "4. Reproductive Health", pdf: "04.pdf" },
                {
                  name: "5. Principles of Inheritance and Variation",
                  pdf: "05.pdf",
                },
                { name: "6. Molecular Basis of Inheritance", pdf: "06.pdf" },
                { name: "7. Evolution", pdf: "07.pdf" },
                { name: "8. Human Health and Disease", pdf: "08.pdf" },
                {
                  name: "9. Strategies for Enhancement in Food Production",
                  pdf: "09.pdf",
                },
                { name: "10. Microbes in Human Welfare", pdf: "10.pdf" },
                {
                  name: "11. Biotechnology: Principles and Processes",
                  pdf: "11.pdf",
                },
                {
                  name: "12. Biotechnology and its Applications",
                  pdf: "12.pdf",
                },
                { name: "13. Organisms and Populations", pdf: "13.pdf" },
              ],
            },
          ],
        },
        English: {
          icon: "book-open",
          color: "bg-purple-500",
          books: [
            {
              id: "Flamingo",
              title: "Flamingo",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/lefl1",
              chapters: [
                { name: "1. The Last Lesson", pdf: "01.pdf" },
                { name: "2. Lost Spring", pdf: "02.pdf" },
                { name: "3. Deep Water", pdf: "03.pdf" },
                { name: "4. The Rattrap", pdf: "04.pdf" },
                { name: "5. Indigo", pdf: "05.pdf" },
                { name: "6. Poets and Pancakes", pdf: "06.pdf" },
                { name: "7. The Interview", pdf: "07.pdf" },
                { name: "8. Going Places", pdf: "08.pdf" },
                { name: "9. Poem: My Mother at Sixty-six", pdf: "09.pdf" },
                {
                  name: "10. Poem: An Elementary School Classroom",
                  pdf: "10.pdf",
                },
                { name: "11. Poem: Keeping Quiet", pdf: "11.pdf" },
                { name: "12. Poem: A Thing of Beauty", pdf: "12.pdf" },
                { name: "13. Poem: Aunt Jennifer's Tigers", pdf: "13.pdf" },
              ],
            },
            {
              id: "Vistas",
              title: "Vistas (Supplementary)",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/levt1",
              chapters: [
                { name: "1. The Third Level", pdf: "01.pdf" },
                { name: "2. The Tiger King", pdf: "02.pdf" },
                { name: "3. Journey to the End of the Earth", pdf: "03.pdf" },
                { name: "4. The Enemy", pdf: "04.pdf" },
                { name: "5. Should Wizard Hit Mommy?", pdf: "05.pdf" },
                { name: "6. On the Face of It", pdf: "06.pdf" },
              ],
            },
          ],
        },
        Accountancy: {
          icon: "indian-rupee",
          color: "bg-teal-600",
          books: [
            {
              id: "Acc12P1",
              title: "Accountancy Part-I",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/leac1",
              chapters: [
                {
                  name: "1. Accounting for Not-for-Profit Organisation",
                  pdf: "01.pdf",
                },
                {
                  name: "2. Accounting for Partnership: Basic Concepts",
                  pdf: "02.pdf",
                },
                {
                  name: "3. Reconstitution of a Partnership Firm",
                  pdf: "03.pdf",
                },
                { name: "4. Dissolution of Partnership Firm", pdf: "04.pdf" },
              ],
            },
            {
              id: "Acc12P2",
              title: "Accountancy Part-II",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/leac2",
              chapters: [
                { name: "1. Accounting for Share Capital", pdf: "01.pdf" },
                {
                  name: "2. Issue and Redemption of Debentures",
                  pdf: "02.pdf",
                },
                { name: "3. Financial Statements of a Company", pdf: "03.pdf" },
                { name: "4. Analysis of Financial Statements", pdf: "04.pdf" },
                { name: "5. Accounting Ratios", pdf: "05.pdf" },
                { name: "6. Cash Flow Statement", pdf: "06.pdf" },
              ],
            },
          ],
        },
        "Business Studies": {
          icon: "briefcase",
          color: "bg-indigo-600",
          books: [
            {
              id: "BS12P1",
              title: "Business Studies Part-I",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/lebs1",
              chapters: [
                {
                  name: "1. Nature and Significance of Management",
                  pdf: "01.pdf",
                },
                { name: "2. Principles of Management", pdf: "02.pdf" },
                { name: "3. Business Environment", pdf: "03.pdf" },
                { name: "4. Planning", pdf: "04.pdf" },
                { name: "5. Organising", pdf: "05.pdf" },
                { name: "6. Staffing", pdf: "06.pdf" },
                { name: "7. Directing", pdf: "07.pdf" },
                { name: "8. Controlling", pdf: "08.pdf" },
              ],
            },
            {
              id: "BS12P2",
              title: "Business Studies Part-II",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/lebs2",
              chapters: [
                { name: "9. Financial Management", pdf: "01.pdf" },
                { name: "10. Financial Markets", pdf: "02.pdf" },
                { name: "11. Marketing Management", pdf: "03.pdf" },
              ],
            },
          ],
        },
        Economics: {
          icon: "trending-up",
          color: "bg-cyan-600",
          books: [
            {
              id: "Micro12",
              title: "Introductory Microeconomics",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/leec2",
              chapters: [
                { name: "1. Introduction", pdf: "01.pdf" },
                { name: "2. Theory of Consumer Behaviour", pdf: "02.pdf" },
                { name: "3. Production and Costs", pdf: "03.pdf" },
                { name: "4. The Theory of the Firm", pdf: "04.pdf" },
                { name: "5. Market Equilibrium", pdf: "05.pdf" },
              ],
            },
            {
              id: "Macro12",
              title: "Introductory Macroeconomics",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/leec1",
              chapters: [
                { name: "1. Introduction", pdf: "01.pdf" },
                { name: "2. National Income Accounting", pdf: "02.pdf" },
                { name: "3. Money and Banking", pdf: "03.pdf" },
                {
                  name: "4. Determination of Income and Employment",
                  pdf: "04.pdf",
                },
                { name: "5. Government Budget and the Economy", pdf: "05.pdf" },
                { name: "6. Open Economy Macroeconomics", pdf: "06.pdf" },
              ],
            },
          ],
        },
        History: {
          icon: "landmark",
          color: "bg-yellow-600",
          books: [
            {
              id: "History12P1",
              title: "Themes in Indian History - I",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/lehs1",
              chapters: [
                { name: "1. Bricks, Beads and Bones", pdf: "01.pdf" },
                { name: "2. Kings, Farmers and Towns", pdf: "02.pdf" },
                { name: "3. Kinship, Caste and Class", pdf: "03.pdf" },
                { name: "4. Thinkers, Beliefs and Buildings", pdf: "04.pdf" },
              ],
            },
            {
              id: "History12P2",
              title: "Themes in Indian History - II",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/lehs2",
              chapters: [
                { name: "5. Through the Eyes of Travellers", pdf: "01.pdf" },
                { name: "6. Bhakti-Sufi Traditions", pdf: "02.pdf" },
                { name: "7. An Imperial Capital: Vijayanagara", pdf: "03.pdf" },
                { name: "8. Peasants, Zamindars and the State", pdf: "04.pdf" },
              ],
            },
            {
              id: "History12P3",
              title: "Themes in Indian History - III",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/lehs3",
              chapters: [
                { name: "9. Colonialism and the Countryside", pdf: "01.pdf" },
                { name: "10. Rebels and the Raj", pdf: "02.pdf" },
                {
                  name: "11. Mahatma Gandhi and the Nationalist Movement",
                  pdf: "03.pdf",
                },
                { name: "12. Framing the Constitution", pdf: "04.pdf" },
              ],
            },
          ],
        },
        "Political Science": {
          icon: "scale",
          color: "bg-rose-600",
          books: [
            {
              id: "ContemWorld12",
              title: "Contemporary World Politics",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/leps1",
              chapters: [
                { name: "1. The Cold War Era", pdf: "01.pdf" },
                { name: "2. The End of Bipolarity", pdf: "02.pdf" },
                { name: "3. US Hegemony in World Politics", pdf: "03.pdf" },
                { name: "4. Alternative Centres of Power", pdf: "04.pdf" },
                { name: "5. Contemporary South Asia", pdf: "05.pdf" },
                { name: "6. International Organisations", pdf: "06.pdf" },
                {
                  name: "7. Security in the Contemporary World",
                  pdf: "07.pdf",
                },
              ],
            },
            {
              id: "PolIndia12",
              title: "Politics in India Since Independence",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/leps2",
              chapters: [
                { name: "1. Challenges of Nation Building", pdf: "01.pdf" },
                { name: "2. Era of One-Party Dominance", pdf: "02.pdf" },
                { name: "3. Politics of Planned Development", pdf: "03.pdf" },
                { name: "4. India's External Relations", pdf: "04.pdf" },
                {
                  name: "5. Challenges to and Restoration of Congress System",
                  pdf: "05.pdf",
                },
                { name: "6. The Crisis of Democratic Order", pdf: "06.pdf" },
                { name: "7. Rise of Popular Movements", pdf: "07.pdf" },
                { name: "8. Regional Aspirations", pdf: "08.pdf" },
              ],
            },
          ],
        },
        Geography: {
          icon: "globe",
          color: "bg-lime-600",
          books: [
            {
              id: "HumGeo12",
              title: "Fundamentals of Human Geography",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/legy1",
              chapters: [
                { name: "1. Human Geography: Nature and Scope", pdf: "01.pdf" },
                { name: "2. The World Population", pdf: "02.pdf" },
                { name: "3. Population Composition", pdf: "03.pdf" },
                { name: "4. Human Development", pdf: "04.pdf" },
                { name: "5. Primary Activities", pdf: "05.pdf" },
                { name: "6. Secondary Activities", pdf: "06.pdf" },
                {
                  name: "7. Tertiary and Quaternary Activities",
                  pdf: "07.pdf",
                },
                { name: "8. Transport and Communication", pdf: "08.pdf" },
              ],
            },
            {
              id: "IndPplEco12",
              title: "India: People and Economy",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/legy2",
              chapters: [
                {
                  name: "1. Population: Distribution, Density, Growth",
                  pdf: "01.pdf",
                },
                {
                  name: "2. Migration: Types, Causes and Consequences",
                  pdf: "02.pdf",
                },
                { name: "3. Human Development", pdf: "03.pdf" },
                { name: "4. Human Settlements", pdf: "04.pdf" },
                { name: "5. Land Resources and Agriculture", pdf: "05.pdf" },
                { name: "6. Water Resources", pdf: "06.pdf" },
                { name: "7. Mineral and Energy Resources", pdf: "07.pdf" },
                { name: "8. Manufacturing Industries", pdf: "08.pdf" },
                {
                  name: "9. Planning and Sustainable Development",
                  pdf: "09.pdf",
                },
              ],
            },
          ],
        },
        Psychology: {
          icon: "brain",
          color: "bg-pink-500",
          books: [
            {
              id: "Psy12",
              title: "Psychology",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/lepy1",
              chapters: [
                {
                  name: "1. Variations in Psychological Attributes",
                  pdf: "01.pdf",
                },
                { name: "2. Self and Personality", pdf: "02.pdf" },
                { name: "3. Meeting Life Challenges", pdf: "03.pdf" },
                { name: "4. Psychological Disorders", pdf: "04.pdf" },
                { name: "5. Therapeutic Approaches", pdf: "05.pdf" },
                { name: "6. Attitude and Social Cognition", pdf: "06.pdf" },
                {
                  name: "7. Social Influence and Group Processes",
                  pdf: "07.pdf",
                },
              ],
            },
          ],
        },
        Sociology: {
          icon: "users",
          color: "bg-violet-600",
          books: [
            {
              id: "IndSoc12",
              title: "Indian Society",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/lesy1",
              chapters: [
                { name: "1. Introducing Indian Society", pdf: "01.pdf" },
                { name: "2. The Demographic Structure", pdf: "02.pdf" },
                {
                  name: "3. Social Institutions: Continuity and Change",
                  pdf: "03.pdf",
                },
                {
                  name: "4. The Market as a Social Institution",
                  pdf: "04.pdf",
                },
                {
                  name: "5. Patterns of Social Inequality and Exclusion",
                  pdf: "05.pdf",
                },
                {
                  name: "6. The Challenges of Cultural Diversity",
                  pdf: "06.pdf",
                },
                { name: "7. Suggestions for Project Work", pdf: "07.pdf" },
              ],
            },
            {
              id: "SocChange12",
              title: "Social Change and Development in India",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/lesy2",
              chapters: [
                { name: "1. Structural Change", pdf: "01.pdf" },
                { name: "2. Cultural Change", pdf: "02.pdf" },
                { name: "3. The Story of Indian Democracy", pdf: "03.pdf" },
                {
                  name: "4. Change and Development in Rural Society",
                  pdf: "04.pdf",
                },
                {
                  name: "5. Change and Development in Industrial Society",
                  pdf: "05.pdf",
                },
                { name: "6. Globalisation and Social Change", pdf: "06.pdf" },
                { name: "7. Mass Media and Communications", pdf: "07.pdf" },
                { name: "8. Social Movements", pdf: "08.pdf" },
              ],
            },
          ],
        },
        "Computer Science": {
          icon: "monitor",
          color: "bg-gray-700",
          books: [
            {
              id: "CS12",
              title: "Computer Science",
              linkPrefix: "https://ncert.nic.in/textbook/pdf/lecs1",
              chapters: [
                { name: "1. Exception Handling in Python", pdf: "01.pdf" },
                { name: "2. File Handling in Python", pdf: "02.pdf" },
                { name: "3. Stack", pdf: "03.pdf" },
                { name: "4. Queue", pdf: "04.pdf" },
                { name: "5. Sorting", pdf: "05.pdf" },
                { name: "6. Introduction to Database Concepts", pdf: "06.pdf" },
                { name: "7. Structured Query Language", pdf: "07.pdf" },
                { name: "8. Database Concepts and SQL – II", pdf: "08.pdf" },
                { name: "9. Interface Python with SQL", pdf: "09.pdf" },
                { name: "10. Computer Networks", pdf: "10.pdf" },
                { name: "11. Data Communication", pdf: "11.pdf" },
                { name: "12. Security Aspects", pdf: "12.pdf" },
                { name: "13. Project Based Learning", pdf: "13.pdf" },
              ],
            },
          ],
        },
      };

      let currentState = {
        view: "subjects",
        subjectKey: null,
        book: null,
        activeClass: 9,
        board: "NCERT"
      };
      const contentArea = document.getElementById("content-area");

      // --- Utility/Rendering Functions ---

      /** Renders the list of subjects. */
      function renderSubjects() {
        const sourceData = currentState.board === "NCERT" ? allClassesData : cbseClassesData;
        const booksData = sourceData[currentState.activeClass];
        
        if (!booksData) {
            contentArea.innerHTML = `<div class="text-center p-12 text-gray-500 dark:text-gray-400">No books found for Class ${currentState.activeClass} in ${currentState.board}.</div>`;
            return;
        }
        
        let html = '<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">';

        for (const key in booksData) {
          const subject = booksData[key];
          html += `
            <div class="card-subject ${subject.color} text-white p-6 rounded-xl shadow-lg flex items-center space-x-4" 
                onclick="viewSubject('${key}')">
                <i data-lucide="${subject.icon}" class="w-8 h-8"></i>
                <div>
                    <h2 class="text-xl font-bold">${key}</h2>
                    <p class="text-sm opacity-80">${subject.books.length} Book(s) Available</p>
                </div>
            </div>
        `;
        }

        html += "</div>";
        contentArea.innerHTML = html;
        // Initialize Lucide icons after DOM insertion
        lucide.createIcons();
      }

      /** Renders the books and chapters for a selected subject. */
      function renderSubjectDetails(subjectKey) {
        const sourceData = currentState.board === "NCERT" ? allClassesData : cbseClassesData;
        const booksData = sourceData[currentState.activeClass];
        const subject = booksData[subjectKey];
        if (!subject) return;

        // Static links (same for all books)
        const rationalisedLink =
          "https://ncert.nic.in/textbook/pdf/Rationalised.pdf";
        const qrGuideLink = "https://ncert.nic.in/textbook/pdf/instruction.pdf";

        let html = `
        <button onclick="goBack()" class="back-button font-semibold mb-6 flex items-center" style="color: var(--accent);">
            <i data-lucide="arrow-left" class="w-5 h-5 mr-2"></i>
            Back to All Subjects
        </button>
        <h2 class="text-3xl font-bold mb-6" style="color: var(--text-primary);">${subjectKey} Books</h2>
    `;

        subject.books.forEach((book) => {
          if (currentState.board === "NCERT") {
            // NCERT RENDERING LOGIC
            const baseCode = book.linkPrefix.split("/").pop();
            const prelimsLink = `${book.linkPrefix}ps.pdf`;
            const zipDownloadLink = `${book.linkPrefix}dd.zip`;

            html += `
              <div class="ncert-book-card border-l-4 ${subject.color.replace("bg-", "border-")}">
                  <h3 class="text-xl font-bold mb-3" style="color: var(--text-primary);">${book.title}</h3>
                  <p class="mb-4 text-sm" style="color: var(--text-secondary);">
                      Base Code: <code>${baseCode}</code> &nbsp;&bull;&nbsp; 
                      <a href="https://ncert.nic.in/textbook.php?${baseCode}=0-${book.chapters.length}" target="_blank" class="text-blue-500 hover:text-blue-600 underline" title="View on official NCERT website">View on NCERT.nic.in <i data-lucide="external-link" class="w-3 h-3 inline"></i></a>
                  </p>
                  
                  <div class="ncert-important-links-container">
                      <h4 class="text-lg font-semibold mb-3" style="color: var(--text-primary);">Important Links</h4>
                      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
                          
                          <a href="${zipDownloadLink}" class="link-btn link-btn-blue text-sm" target="_blank" title="Download ZIP file for the entire book">
                              <i data-lucide="download" class="w-4 h-4 mr-2"></i> Full Book (ZIP)
                          </a>
                          
                          <a href="${prelimsLink}" class="link-btn link-btn-gray text-sm" target="_blank" title="View the book's preface and introductory content">
                              <i data-lucide="file-text" class="w-4 h-4 mr-2"></i> Prelims PDF
                          </a>
                          
                          ${
                            book.id.startsWith("Maths") || book.id.startsWith("Science")
                              ? `<a href="${book.linkPrefix}an.pdf" class="link-btn ${book.id.startsWith("Maths") ? "link-btn-red" : "link-btn-green"} text-sm" target="_blank" title="View the Answers for the exercises">
                                  <i data-lucide="check-square" class="w-4 h-4 mr-2"></i> Answers
                              </a>`
                              : ""
                          }

                          ${
                            book.id.startsWith("Kritika") || book.id.startsWith("Sanchayan")
                              ? `<a href="${book.linkPrefix}lp.pdf" class="link-btn link-btn-orange text-sm" target="_blank" title="View Lekhak Parichay (Author Introduction)">
                                  <i data-lucide="feather" class="w-4 h-4 mr-2"></i> लेखक परिचय (LP)
                              </a>`
                              : ""
                          }
                          
                          ${
                            book.id.startsWith("Maths")
                              ? `
                              <a href="${book.linkPrefix}a1.pdf" class="link-btn link-btn-red text-sm" target="_blank" title="View Appendix I">
                                  <i data-lucide="book-open-check" class="w-4 h-4 mr-2"></i> Appendix I
                              </a>
                              <a href="${book.linkPrefix}a2.pdf" class="link-btn link-btn-red text-sm" target="_blank" title="View Appendix II">
                                  <i data-lucide="book-open-check" class="w-4 h-4 mr-2"></i> Appendix II
                              </a>
                              `
                              : ""
                          }

                          ${
                            book.id.startsWith("Vyakaranavithi")
                              ? `
                              <a href="${book.linkPrefix}a1.pdf" class="link-btn link-btn-amber text-sm" target="_blank" title="View परिशिष्ट I (शब्दरूपाणि)">
                                  <i data-lucide="book-open-check" class="w-4 h-4 mr-2"></i> परिशिष्ट I
                              </a>
                              <a href="${book.linkPrefix}a2.pdf" class="link-btn link-btn-amber text-sm" target="_blank" title="View परिशिष्ट II (धातुरूपाणि)">
                                  <i data-lucide="book-open-check" class="w-4 h-4 mr-2"></i> परिशिष्ट II
                              </a>
                              `
                              : ""
                          }
                          
                          <a href="${rationalisedLink}" class="link-btn link-btn-gray text-sm" target="_blank" title="View the official document on rationalised content">
                              <i data-lucide="file-check" class="w-4 h-4 mr-2"></i> Rationalised Content
                          </a>
                          
                          <a href="${qrGuideLink}" class="link-btn link-btn-gray text-sm" target="_blank" title="View the guide for using QR codes in NCERT books">
                              <i data-lucide="scan" class="w-4 h-4 mr-2"></i> QR Code Guide
                          </a>

                      </div>
                  </div>
                  
                  <h4 class="text-lg font-semibold mb-3" style="color: var(--text-primary);">Chapter-wise PDF Links</h4>
                  
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          `;

            book.chapters.forEach((chapter) => {
              const fullLink = `${book.linkPrefix}${chapter.pdf}`;
              const displayLink = `${baseCode}${chapter.pdf}`;

              html += `
                  <a href="${fullLink}" target="_blank" title="Link to: ${displayLink}" class="ncert-chapter-link">
                      <span>${chapter.name}</span>
                      <i data-lucide="external-link" class="ncert-chapter-icon"></i>
                  </a>
              `;
            });

            html += `</div></div>`;
          } else {
             // CBSE RENDERING LOGIC
             html += `
              <div class="ncert-book-card border-l-4 ${subject.color.replace("bg-", "border-")}">
                  <h3 class="text-xl font-bold mb-3" style="color: var(--text-primary);">${book.title}</h3>
             `;

             if (book.chapters && book.chapters.length > 0) {
                 html += `
                  <div class="ncert-important-links-container mb-6">
                      <h4 class="text-lg font-semibold mb-3" style="color: var(--text-primary);">Important Links</h4>
                      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
                 `;
                 
                 const fullPdfUrl = book.fullBook || (book.linkPrefix.endsWith('.pdf') ? book.linkPrefix : null);
                 if (fullPdfUrl) {
                     html += `
                          <a href="${fullPdfUrl}" class="link-btn link-btn-blue text-sm" target="_blank" title="View Full Book (PDF)">
                              <i data-lucide="book" class="w-4 h-4 mr-2"></i> Full Book (PDF)
                          </a>
                     `;
                 }

                 if (book.importantLinks) {
                     book.importantLinks.forEach(link => {
                         html += `
                          <a href="${link.url}" class="link-btn ${link.color || 'link-btn-gray'} text-sm" target="_blank" title="View ${link.name}">
                              <i data-lucide="${link.icon || 'file-text'}" class="w-4 h-4 mr-2"></i> ${link.name}
                          </a>
                         `;
                     });
                 }
                 
                 html += `
                      </div>
                  </div>
                 `;

                 html += `
                  <h4 class="text-lg font-semibold mb-3 mt-4" style="color: var(--text-primary);">Chapter-wise PDF Links</h4>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                 `;
                 book.chapters.forEach((chapter) => {
                     let fullLink = chapter.pdf.startsWith("http") ? chapter.pdf : `${book.linkPrefix}${chapter.pdf}`;
                     html += `
                        <a href="${fullLink}" target="_blank" title="View Chapter" class="ncert-chapter-link">
                            <span>${chapter.name}</span>
                            <i data-lucide="external-link" class="ncert-chapter-icon"></i>
                        </a>
                     `;
                 });
                 html += `</div>`;
             } else {
                 html += `
                  <div class="flex items-center mt-4">
                      <a href="${book.linkPrefix}" class="link-btn link-btn-blue w-full sm:w-auto text-sm py-2.5 px-4" target="_blank" title="View Full PDF">
                          <i data-lucide="book-open" class="w-5 h-5 mr-2"></i> View Full Book (PDF)
                      </a>
                  </div>`;
             }
             html += `</div>`;
          }
        });

        contentArea.innerHTML = html;
        lucide.createIcons();
      }

      /** Navigation Functions attached to the global window object */
      window.viewSubject = (subjectKey) => {
        currentState.view = "details";
        currentState.subjectKey = subjectKey;
        renderSubjectDetails(subjectKey);
      };

      window.goBack = () => {
        currentState.view = "subjects";
        currentState.subjectKey = null;
        renderSubjects();
      };

      /** Board Switching Logic **/
      window.setBoard = (boardType) => {
        currentState.board = boardType;
        
        // Update switcher buttons UI
        const btnClassesActive = "switcher-btn switcher-btn-active px-8 py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 focus:outline-none flex items-center";
        const btnClassesInactive = "switcher-btn switcher-btn-inactive px-8 py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 focus:outline-none flex items-center";
        
        document.getElementById('board-btn-ncert').className = (boardType === 'NCERT') ? btnClassesActive : btnClassesInactive;
        document.getElementById('board-btn-cbse').className = (boardType === 'CBSE') ? btnClassesActive : btnClassesInactive;

        // Class 8 logic
        const tab8 = document.getElementById('tab-class-8');
        if (boardType === 'CBSE') {
           tab8.classList.remove('hidden');
        } else {
           tab8.classList.add('hidden');
           // Retract back to class 9 if we're on class 8 and migrating to NCERT
           if (currentState.activeClass === 8) {
               selectClass(9);
               return; // selectClass triggers a reset & render
           }
        }
        
        // Reset view to subjects on board switch
        currentState.view = 'subjects';
        currentState.subjectKey = null;
        renderSubjects();
      };

      /** Class switching */
      window.selectClass = (classNum) => {
        currentState.view = "subjects";
        currentState.subjectKey = null;
        currentState.book = null;
        currentState.activeClass = classNum;
        
        // Update tab styles
        document.querySelectorAll(".class-tab").forEach((btn) => {
          if (parseInt(btn.dataset.class) === classNum) {
            btn.className = "class-tab class-tab-active";
            if (classNum === 8 && currentState.board === 'NCERT') {
               btn.classList.add('hidden'); // Safety measure
            }
          } else {
            btn.className = "class-tab class-tab-inactive";
            if (parseInt(btn.dataset.class) === 8 && currentState.board === 'NCERT') {
               btn.classList.add('hidden'); // Ensure hidden is maintained
            }
          }
        });
        renderSubjects();
      };

      /** Main initialization logic */
      window.onload = function () {
        renderSubjects();
      };