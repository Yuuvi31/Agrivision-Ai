// Curated botanical leaf sample images with realistic visual leaf rendering
export const SAMPLE_LEAVES = [
  {
    id: 'sample-tomato-early-blight',
    name: 'Tomato Leaf (Early Blight)',
    nameHi: 'टमाटर की पत्ती (अगेती झुलसा रोग)',
    nameHinglish: 'Tamatar ki Patti (Early Blight Rog)',
    status: 'unhealthy',
    crop: 'Tomato (Solanum lycopersicum)',
    disease: 'Early Blight (Alternaria solani)',
    diseaseHi: 'अगेती झुलसा (अल्टरनेरिया सोलेनी)',
    diseaseHinglish: 'Early Blight Fungus Rog',
    confidence: 96,
    severity: 'Moderate (मध्यम)',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80',
    description: 'Concentric brown ring spots (target-like patterns) visible on lower foliage, progressing toward yellowing edges.',
    recommendations: {
      en: {
        diagnosisSummary: 'Early Blight is a common fungal disease causing concentric brown ring lesions ("target board" pattern) bordered by yellow halos.',
        immediateAction: [
          'Prune all infected lower leaves immediately using disinfected shears.',
          'Dispose of pruned leaves away from the field or burn them; DO NOT compost infected foliage.',
          'Avoid overhead sprinkler watering to keep leaves dry.'
        ],
        organicSolution: [
          'Spray cold-pressed Neem Oil (5ml per liter of water) with a few drops of mild liquid soap every 5-7 days.',
          'Apply copper-based organic fungicides (Bordeaux mixture 1%) or Bacillus subtilis bio-spray.',
          'Spray diluted sour buttermilk (chaas) solution (1:10 ratio) as a traditional anti-fungal barrier.'
        ],
        chemicalSolution: [
          'For commercial severity, apply Mancozeb 75% WP @ 2.5g/liter or Chlorothalonil 75% WP @ 2g/liter.',
          'Alternatively, spray Azoxystrobin 23% SC @ 1ml/liter in severe outbreaks.',
          'Always spray early morning or late evening with protective gear.'
        ],
        wateringAndSoil: [
          'Water only at the plant base / root zone using drip irrigation.',
          'Add a 2-3 inch dry straw or wood chip mulch layer around stems to stop fungal spores splashing from soil.',
          'Ensure the soil is well-draining; avoid standing water around tomato roots.'
        ],
        preventionTips: [
          'Practice 2-3 year crop rotation with non-solanaceous crops (avoid planting after potato or eggplant).',
          'Maintain 24-30 inch plant spacing for maximum sunlight penetration and air airflow.',
          'Select certified blight-resistant tomato varieties for upcoming planting seasons.'
        ]
      },
      hi: {
        diagnosisSummary: 'अल्टरनेरिया सोलेनी फफूंद के कारण अगेती झुलसा रोग हुआ है। इसमें पत्तियों पर गोल भूरे छल्ले जैसे धब्बे (टारगेट बोर्ड) बन जाते हैं और किनारों पर पीलापन आ जाता है।',
        immediateAction: [
          'रोगग्रस्त निचली पत्तियों को तुरंत साफ़ कैंची या ब्लेड से काटकर अलग करें।',
          'काटी गई पत्तियों को खेत से दूर ले जाकर गहरा दबाएं या जला दें; खाद के गड्ढे में न डालें।',
          'पत्तियों पर ऊपर से पानी का छिड़काव बिल्कुल बंद करें ताकि फंगस आगे न फैले।'
        ],
        organicSolution: [
          '5 मिली शुद्ध नीम का तेल प्रति लीटर पानी में 2 बूंद शैम्पू मिलाकर हर 5-7 दिन पर छिड़कें।',
          'खट्टी छाछ (मट्ठा) को 10 गुना पानी में मिलाकर पत्तियों पर छिड़कना एक कारगर देसी कवकनाशी है।',
          'ट्राइकोडर्मा विरिडी (Trichoderma viride) 5 ग्राम प्रति लीटर पानी का जैविक छिड़काव करें।'
        ],
        chemicalSolution: [
          'रोग के तेज प्रकोप पर मैंकोजेब 75% WP (Mancozeb) 2.5 ग्राम प्रति लीटर पानी में मिलाकर छिड़कें।',
          'या एज़ोक्सीस्ट्रोबिन 23% SC (Azoxystrobin) 1 मिली प्रति लीटर का छिड़काव करें।',
          'छिड़काव हमेशा सुबह या शाम को करें और सुरक्षा मास्क का उपयोग करें।'
        ],
        wateringAndSoil: [
          'ड्रिप द्वारा या सीधे पौधे की जड़ में पानी दें; फव्वारे से सिंचाई न करें।',
          'पौधों के तने के चारों ओर 2-3 इंच सूखी घास या पुआल की मल्चिंग करें जिससे मिट्टी के कीटाणु पत्तियों पर न उछलें।',
          'खेत में जलभराव न होने दें, जलनिकासी की उचित व्यवस्था रखें।'
        ],
        preventionTips: [
          'फसल चक्र अपनाएं: टमाटर के बाद 2 साल तक आलू या बैंगन न लगाएं।',
          'पौधों के बीच उचित दूरी (60 सेमी) रखें ताकि हवा व धूप का संचार ठीक बना रहे।',
          'अगली बुवाई के लिए झुलसा-रोधी उन्नत बीजों का ही चुनाव करें।'
        ]
      },
      hinglish: {
        diagnosisSummary: 'Tamatar ki patti par Early Blight (Ageti Jhulsa) fungus ka asar hai. Isme gol bhoore rings jaise daagh bante hain aur patti peeli padne lagti hai.',
        immediateAction: [
          'Jitni bhi bimaar ya sukhi pattiya niche dikhein, unhe turant clean cutter se kaat kar hata dein.',
          'Kati hui pattiyon ko khet se door phenkein ya mitti me daba dein, compost pit me bilkul na daalein.',
          'Pattiyon ke upar seedha paani mat daalein, pattiya sukhi rehni chahiye.'
        ],
        organicSolution: [
          '1 litre paani me 5ml pure Neem Tel + 2 boond mild liquid soap milakar har 5 se 7 din me spray karein.',
          'Khatti Chhaachh (buttermilk) ko 1:10 paani me ghol kar spray karein, yeh bahut badiya desi antifungal hai.',
          'Trichoderma bio-fungicide 5 gram per litre ka organic spray sham ke waqt karein.'
        ],
        chemicalSolution: [
          'Agar bimari zyada fail rahi ho to Mancozeb 75% WP @ 2.5g per litre paani me milakar spray karein.',
          'Ya Saaf (Carbendazim + Mancozeb) 2 gram per litre paani me ghol kar spray karein.',
          'Hamesha subah dhoop aane se pehle ya sham ko spray karein.'
        ],
        wateringAndSoil: [
          'Drip irrigation se paani dein ya seedha jado (roots) me dalein.',
          'Tamatar ke ped ke charo taraf sukhi ghaas ya straw ki 2-3 inch mulch bicha dein taaki mitti ke spores pattiyon par na uchelein.',
          'Gamle ya khet me paani rukna nahi chahiye, well-drained mitti banayein.'
        ],
        preventionTips: [
          'Crop rotation karein: Tamatar ke baad Aloo ya Baingan turant usi jagah na lagayein.',
          'Poudho ke beech 2 se 2.5 foot ki doori rakhein taaki achi dhoop aur taaza hawa lage.',
          'Next time certified disease-resistant seeds ka use karein.'
        ]
      }
    }
  },
  {
    id: 'sample-healthy-apple',
    name: 'Apple Leaf (Healthy & Vibrant)',
    nameHi: 'सेब की पत्ती (पूर्णतः स्वस्थ व हरी)',
    nameHinglish: 'Seb ki Patti (Ekdum Healthy)',
    status: 'healthy',
    crop: 'Apple (Malus domestica)',
    disease: 'None (Healthy Plant)',
    diseaseHi: 'कोई रोग नहीं (स्वस्थ पत्ता)',
    diseaseHinglish: 'Koi Bimari Nahi (Healthy Leaf)',
    confidence: 99,
    severity: 'None (कोई खतरा नहीं)',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80',
    description: 'Deep green chlorophyll pigmentation, smooth veins, crisp leaf margins, zero fungal spots or insect damage.',
    recommendations: {
      en: {
        diagnosisSummary: 'Great news! Your leaf exhibits excellent health, rich chlorophyll density, and clean cellular structure with no signs of fungal or bacterial infection.',
        immediateAction: [
          'No curative action required! Keep maintaining current care routines.',
          'Perform routine weekly inspection of undersides of leaves for tiny mites or early aphids.',
          'Remove dust occasionally by gentle morning misting.'
        ],
        organicSolution: [
          'Apply monthly seaweed extract liquid tonic (2ml/L) to strengthen plant cell walls.',
          'Spray preventive light neem cake solution or bio-fertilizers once a month to boost immunity.',
          'Use vermicompost around root drip line for steady micro-nutrient availability.'
        ],
        chemicalSolution: [
          'No chemical fungicides or insecticides needed right now.',
          'Avoid prophylactic pesticide sprays to protect beneficial pollinator bees and predatory insects.'
        ],
        wateringAndSoil: [
          'Continue balanced watering: keep soil consistently moist but never soggy.',
          'Maintain a soil pH between 6.0 and 7.0 for optimal nutrient absorption.',
          'Apply organic compost once every season.'
        ],
        preventionTips: [
          'Ensure regular pruning during dormancy to encourage open tree canopy architecture.',
          'Clean fallen autumn leaves around orchard base to eliminate overwintering spores.',
          'Monitor seasonal weather changes (especially high humidity followed by warm days).'
        ]
      },
      hi: {
        diagnosisSummary: 'बधाई हो! आपकी पौधे की पत्ती पूरी तरह स्वस्थ, हरी-भरी और तंदुरुस्त है। इसमें किसी भी तरह के फंगल या कीट प्रकोप का कोई लक्षण नहीं है।',
        immediateAction: [
          'पौधा स्वस्थ है, किसी दवा की आवश्यकता नहीं है। वर्तमान देखभाल जारी रखें।',
          'सप्ताह में एक बार पत्तियों की निचली सतह की जांच करते रहें ताकि माहू (एफिड्स) का समय रहते पता चल सके।',
          'पत्तियों पर जमी धूल को समय-समय पर साफ रखें।'
        ],
        organicSolution: [
          'पौधे की रोग प्रतिरोधक क्षमता बढ़ाने हेतु महीने में एक बार समुद्री घास (Seaweed liquid) का 2 मिली/लीटर छिड़काव करें।',
          'जड़ों में केंचुआ खाद (वर्मीकम्पोस्ट) नियमित अंतराल पर डालें।',
          'प्रतिरोधक उपाय के रूप में महीने में एक बार हल्का नीम अर्क का छिड़काव पर्याप्त है।'
        ],
        chemicalSolution: [
          'किसी भी रासायनिक कीटनाशक या फफूंदनाशक की आवश्यकता नहीं है।',
          'अनावश्यक दवाओं का छिड़काव न करें ताकि मित्र कीट और मधुमक्खियां सुरक्षित रहें।'
        ],
        wateringAndSoil: [
          'संतुलित नमी बनाए रखें; पानी तभी दें जब ऊपरी 1-2 इंच मिट्टी सूख जाए।',
          'मिट्टी में जैविक कार्बन की मात्रा बनाए रखने के लिए गोबर की सड़ी खाद का उपयोग करें।',
          'जड़ों के पास जलभराव न होने दें।'
        ],
        preventionTips: [
          'पेड़ की कटाई-छंटाई सही मौसम में करें ताकि सभी शाखाओं तक सूर्य का प्रकाश पहुंचे।',
          'पेड़ के नीचे गिरी पुरानी सूखी पत्तियों को समय-समय पर साफ करें।',
          'फसल में पोषक तत्वों का संतुलन बनाए रखें।'
        ]
      },
      hinglish: {
        diagnosisSummary: 'Bahut badhiya! Patti ekdum healthy aur mast green hai. Isme kisi bhi tarah ke keede, fungus ya daagh-dhabbe ka koi sign nahi hai.',
        immediateAction: [
          'Koi dawa ya spray karne ki zaroorat nahi hai! Bas regular dekhbhal continue rakhein.',
          'Hafte me ek baar patti ke niche ki side check kar lein taaki chote keede na panap sakein.',
          'Normal sunlight aur fresh air milte rehne dein.'
        ],
        organicSolution: [
          'Plant ki immunity badhane ke liye mahine me ek baar Seaweed tonic (2ml/L) ya Vermicompost daalein.',
          'Halki Neem Khali (Neem cake powder) mitti me milayein taaki fungal protection bani rahe.',
          'Jado me achi sadi hui Gobar ki khaad (FYM) daalein.'
        ],
        chemicalSolution: [
          'Filhaal kisi bhi chemical dawa ya fungicide ki bilkul zaroorat nahi hai.',
          'Faaltu spray se bachein taaki kisan ke dost keede (honeybees) surakshit rahein.'
        ],
        wateringAndSoil: [
          'Regular watering rakhein: Jab mitti upar se thodi dry lage tabhi paani dein, overwatering se bachein.',
          'Mitti me drainage acha hona chahiye taaki jado me sadan na aaye.',
          'Gamle ya bed ki gudaai (aeration) mahine me ek baar karein.'
        ],
        preventionTips: [
          'Dhoop proper aani chahiye, poudhe ko ghutan me na rakhein.',
          'Purani sukhi pattiya zameen par girti rahein to unhe saaf karte rahein.',
          'Mausam badalne par (jaise baarish ke baad) thoda extra dhyan dein.'
        ]
      }
    }
  },
  {
    id: 'sample-potato-late-blight',
    name: 'Potato Leaf (Late Blight)',
    nameHi: 'आलू की पत्ती (पछेती झुलसा रोग)',
    nameHinglish: 'Aloo ki Patti (Late Blight Fungal Rog)',
    status: 'unhealthy',
    crop: 'Potato (Solanum tuberosum)',
    disease: 'Late Blight (Phytophthora infestans)',
    diseaseHi: 'पछेती झुलसा (फाइटोफ्थोरा इन्फेस्टन्स)',
    diseaseHinglish: 'Late Blight Rog',
    confidence: 94,
    severity: 'High (गंभीर)',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    description: 'Irregular water-soaked dark lesions spreading rapidly across foliage with pale green margin and white mold on undersides during humid weather.',
    recommendations: {
      en: {
        diagnosisSummary: 'Phytophthora infestans water mold causes aggressive Late Blight, which can devastate foliage and potato tubers within days if unchecked.',
        immediateAction: [
          'Cut away severely affected leaf branches immediately and seal them in plastic bags for disposal.',
          'Cease all evening sprinkler irrigation immediately to arrest mold sporulation.',
          'Hill up soil around potato roots to protect emerging tubers from washed-down spores.'
        ],
        organicSolution: [
          'Spray Bordeaux mixture (1%) or Copper oxychloride (COC 50% WP @ 3g/L) across the entire crop canopy.',
          'Apply fermented bio-enzymes or garlic-chili extract as a deterrent.',
          'Introduce Trichoderma harzianum soil drenching.'
        ],
        chemicalSolution: [
          'Spray systemic fungicides: Metalaxyl 8% + Mancozeb 64% WP (e.g. Ridomil Gold) @ 2.5g/L water.',
          'Alternatively, spray Cymoxanil 8% + Mancozeb 64% WP @ 2.5g/L.',
          'Repeat spray after 7-10 days if cloudy or foggy weather persists.'
        ],
        wateringAndSoil: [
          'Irrigate in the early morning only so leaf canopies dry rapidly under sunlight.',
          'Provide elevated ridges and furrows to prevent water stagnation in fields.',
          'Inspect tubers during harvest to ensure no infected tubers go into storage.'
        ],
        preventionTips: [
          'Always plant certified, disease-free seed tubers.',
          'Destroy cull piles of discarded potatoes near the field before the planting season.',
          'Choose tolerant potato varieties like Kufri Chipsona or Kufri Pukhraj in endemic zones.'
        ]
      },
      hi: {
        diagnosisSummary: 'फाइटोफ्थोरा इन्फेस्टन्स फंगस के कारण पछेती झुलसा रोग लगा है। यह रोग ठंडे और नम मौसम में तेजी से फैलता है और पत्तियों पर पानी जैसे भीगे काले-भूरे धब्बे बनाता है।',
        immediateAction: [
          'प्रभावित टहनियों और पत्तियों को तुरंत काटकर नष्ट करें।',
          'शाम के समय सिंचाई पूरी तरह बंद करें।',
          'पौधों की जड़ों पर मिट्टी चढ़ाएं (कान चढ़ाना) ताकि रोग के जीवाणु जमीन में आलू के कंदों तक न पहुंच सकें।'
        ],
        organicSolution: [
          'कॉपर ऑक्सीक्लोराइड 50% WP (3 ग्राम प्रति लीटर) या बोर्डो मिश्रण (1%) का तुरंत छिड़काव करें।',
          'लहसुन और नीम की पत्तियों का काढ़ा बनाकर छिड़कें।',
          'जड़ों में ट्राइकोडर्मा हरजिएनम की जैविक खाद का प्रयोग करें।'
        ],
        chemicalSolution: [
          'मेटालेक्सिल 8% + मैंकोजेब 64% WP (रिडोमिल गोल्ड) 2.5 ग्राम प्रति लीटर पानी में मिलाकर छिड़कें।',
          'या साइमोक्सानिल + मैंकोजेब 2.5 ग्राम प्रति लीटर का छिड़काव करें।',
          'बादल या कोहरा छाए रहने पर 7-10 दिन बाद दोबारा स्प्रे करें।'
        ],
        wateringAndSoil: [
          'सिंचाई केवल सुबह के समय करें ताकि दिन की धूप में पत्तियां जल्दी सूख जाएं।',
          'खेत में जलभराव न होने दें; मेड़ों की ऊंचाई सही रखें।',
          'आलू की खुदाई के बाद सड़े हुए आलुओं को स्वस्थ कंदों से अलग रखें।'
        ],
        preventionTips: [
          'हमेशा प्रमाणित व रोगमुक्त बीज कंदों का ही प्रयोग करें।',
          'खेत के किनारे फेंके गए पुराने आलुओं के ढेरों को नष्ट करें।',
          'क्षेत्र के अनुसार रोग-प्रतिरोधी किस्मों (जैसे कुफरी चिप्सोना आदि) की बुवाई करें।'
        ]
      },
      hinglish: {
        diagnosisSummary: 'Aloo par Late Blight (Pacheti Jhulsa) ka attack hua hai. Yeh fungus thande aur nami wale mausam me tezi se failta hai aur patti par kaale-bhoore geelapan wale daagh banata hai.',
        immediateAction: [
          'Infected daal aur pattiya turant kaat kar khet se door baha dein ya mitti me daba dein.',
          'Sham ko paani dena band karein, patti par nami bilkul na thehre.',
          'Mitti chadhayein (earthing up) taaki zameen ke andar aaloo ke kando tak bimari na pahuche.'
        ],
        organicSolution: [
          'Copper Oxychloride (COC 50%) 3 gram per litre paani me milakar spray karein.',
          'Neem oil 5ml + gaumutra/chaas ka desi ghol बनाकर chhidkaav karein.',
          'Trichoderma bio-fungicide ko mitti me drench karein.'
        ],
        chemicalSolution: [
          'Metalaxyl + Mancozeb (Ridomil Gold) 2.5 gram per litre paani me ghol kar acche se spray karein.',
          'Ya Cymoxanil + Mancozeb mixture ka spray karein.',
          'Agar kohra ya badal bane rahein to 8-10 din baad repeat karein.'
        ],
        wateringAndSoil: [
          'Paani sirf subah ke waqt dein taaki dhoop me pattiya jaldi sukh jayein.',
          'Khet me drainage acha rakhein, medh (ridge) thodi unchi banayein.',
          'Harvest ke waqt kharaab aaloo alag chhat lein.'
        ],
        preventionTips: [
          'Certified aur beemar-mukt seed tubers ka hi use karein.',
          'Khet ke aas-paas purane aaloo ke dher na rehne dein.',
          'Kufri resistant varieties chun-kar bo-ein.'
        ]
      }
    }
  },
  {
    id: 'sample-healthy-rice',
    name: 'Rice Leaf (Paddy - Healthy)',
    nameHi: 'धान की पत्ती (पूर्णतः स्वस्थ व हरी)',
    nameHinglish: 'Dhaan ki Patti (Healthy Paddy)',
    status: 'healthy',
    crop: 'Rice / Paddy (Oryza sativa)',
    disease: 'None (Healthy Crop)',
    diseaseHi: 'कोई रोग नहीं (स्वस्थ धान)',
    diseaseHinglish: 'Koi Rog Nahi (Swasth Dhaan)',
    confidence: 98,
    severity: 'None (उत्तम स्वास्थ्य)',
    image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=800&q=80',
    description: 'Slender vibrant green blades, healthy photosynthetic surface area, free of blast lesions, bacterial streak, or stem borer marks.',
    recommendations: {
      en: {
        diagnosisSummary: 'Excellent! Your paddy foliage is robust, demonstrating vigorous vegetative health, good chlorophyll reserves, and zero symptom of Rice Blast or Sheath Blight.',
        immediateAction: [
          'No curative action required! Keep maintaining current water depth and nutrient schedules.',
          'Monitor lower tillers near water line weekly for early sheath discolorations.'
        ],
        organicSolution: [
          'Apply Azospirillum and Phosphobacteria bio-fertilizers to sustain root health and nitrogen fixation.',
          'Foliar spray of Panchagavya (3%) or Jeevamrut to boost natural plant vigor.',
          'Keep bird perches (T-shaped bamboo sticks) in field to naturally control caterpillar pests.'
        ],
        chemicalSolution: [
          'No pesticide application needed.',
          'Avoid excess urea/nitrogen application which can invite secondary fungal attacks.'
        ],
        wateringAndSoil: [
          'Maintain alternate wetting and drying (AWD) water management to optimize root oxygenation.',
          'Ensure balanced potassium (potash) fertilization to strengthen stem tensile strength against lodging.'
        ],
        preventionTips: [
          'Keep paddy bunds clean and weed-free as weeds harbor blast and leafhopper vectors.',
          'Follow recommended plant spacing (20x15 cm) for optimal tillering and sun penetration.'
        ]
      },
      hi: {
        diagnosisSummary: 'बहुत बढ़िया! आपकी धान की फसल पूरी तरह हरी-भरी और स्वस्थ है। इसमें ब्लास्ट (झोंका) या शीथ ब्लाइट का कोई प्रकोप नहीं है।',
        immediateAction: [
          'फसल उत्तम स्थिति में है। किसी दवा की आवश्यकता नहीं है।',
          'पानी की सतह के पास निचले कल्ले (टिलर्स) पर नजर रखें ताकि किसी बदलाव का समय रहते पता चले।'
        ],
        organicSolution: [
          'जीवामृत या पंचगव्य (3%) का छिड़काव फसल को और पुष्ट बनाएगा।',
          'खेत में टी-आकार की पक्षी खूंटियां लगाएं ताकि पक्षी हानिकारक सुंडियों को प्राकृतिक रूप से खा सकें।',
          'नीम की खली का खाद के रूप में प्रयोग जारी रखें।'
        ],
        chemicalSolution: [
          'किसी रासायनिक कीटनाशक की आवश्यकता नहीं है।',
          'यूरिया का जरूरत से ज्यादा प्रयोग न करें, अधिक यूरिया से फसल में बीमारी लगने का खतरा बढ़ता है।'
        ],
        wateringAndSoil: [
          'खेत में पानी का स्तर 2-3 सेमी नियंत्रित रखें और बीच-बीच में हल्का सुखाएं (AWD तकनीक)।',
          'पोटाश खाद का संतुलित प्रयोग करें ताकि तना मजबूत रहे और फसल गिरे नहीं।'
        ],
        preventionTips: [
          'खेत की मेड़ों को घास-फूस और खरपतवार से मुक्त रखें।',
          'पौधों के बीच पर्याप्त दूरी रखें ताकि धूप और हवा हर पौधे तक पहुंचे।'
        ]
      },
      hinglish: {
        diagnosisSummary: 'Shandar! Dhaan ki patti bilkul tandurust aur lush green hai. Isme Blast ya Sheath Blight ka koi sanket nahi hai.',
        immediateAction: [
          'Koi dawai spray karne ki zaroorat nahi hai. Jo care abhi kar rahe hain wahi chalne dein.',
          'Paani ke paas niche wale kalle (tillers) ko hafte me ek baar check karte rahein.'
        ],
        organicSolution: [
          'Panchagavya (3%) ya Jeevamrut ka spray karein taaki poudhe me aur jaan aaye.',
          'Khet me T-shape bamboo sticks lagayein taaki chidiya baith kar keede kha sakein.',
          'Root health ke liye bio-fertilizers ka use maintain karein.'
        ],
        chemicalSolution: [
          'Abhi koi pesticide ya chemical mat daalein.',
          'Zaroorat se zyada Urea na daalein, extra urea se patti komal ho jaati hai aur bimari jaldi lagti hai.'
        ],
        wateringAndSoil: [
          'Paani ka level manage karein (AWD - Alternate Wetting & Drying method best hai).',
          'MOP (Potash) ka balanced dose dein taaki podha majboot rahe aur gire na.'
        ],
        preventionTips: [
          'Mendho (bunds) par kachra aur ghaas-phoos saaf rakhein.',
          'Sahi doori par row planting follow karein.'
        ]
      }
    }
  },
  {
    id: 'sample-corn-rust',
    name: 'Corn / Maize Leaf (Common Rust)',
    nameHi: 'मक्के की पत्ती (भूरा रतुआ रोग)',
    nameHinglish: 'Makka ki Patti (Rust Rog)',
    status: 'unhealthy',
    crop: 'Corn / Maize (Zea mays)',
    disease: 'Common Rust (Puccinia sorghi)',
    diseaseHi: 'कॉमन रस्ट / भूरा गेरुई (पक्सिनिया सोरघाई)',
    diseaseHinglish: 'Corn Rust Fungal Rog',
    confidence: 93,
    severity: 'Moderate (मध्यम)',
    image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80',
    description: 'Golden-brown to cinnamon colored pustules scattered across both upper and lower leaf surfaces.',
    recommendations: {
      en: {
        diagnosisSummary: 'Puccinia sorghi fungus causes Common Rust, forming powdery reddish-brown pustules on corn leaves that rupture epidermal tissue and hinder grain fill.',
        immediateAction: [
          'Scout the field to determine infection thresholds: check if pustules are spreading to upper leaves.',
          'Strip and destroy heavily infested bottom leaves in small garden plots.'
        ],
        organicSolution: [
          'Apply wettable sulfur @ 2g/liter of water at initial symptom appearance.',
          'Spray bio-control agent Trichoderma viride or Pseudomonas fluorescens.',
          'Neem oil spray (0.5%) can suppress spore germination.'
        ],
        chemicalSolution: [
          'Spray Propiconazole 25% EC @ 1ml/liter or Tebuconazole 25.9% EC @ 1ml/liter.',
          'Alternatively apply Mancozeb 75% WP @ 2g/liter.',
          'Spray before tassel emergence for maximum yield protection.'
        ],
        wateringAndSoil: [
          'Avoid overhead sprinkler irrigation that keeps leaves wet for prolonged hours.',
          'Ensure adequate potassium and balanced nitrogen to fortify cell wall defenses.'
        ],
        preventionTips: [
          'Plant rust-resistant certified hybrid maize varieties.',
          'Avoid excessively high plant densities in humid micro-climates.'
        ]
      },
      hi: {
        diagnosisSummary: 'मक्के में पक्सिनिया सोरघाई कवक द्वारा रतुआ (रस्ट) रोग लगा है। पत्तियों पर भूरे-लाल रंग के उभरे हुए दाने (पुस्ट्यूल) बन जाते हैं जो पाउडर जैसा पदार्थ छोड़ते हैं।',
        immediateAction: [
          'खेत में जाकर देखें कि क्या रोग ऊपरी पत्तियों तक फैल रहा है।',
          'अत्यधिक प्रभावित पुरानी निचली पत्तियों को तोड़कर खेत से दूर नष्ट करें।'
        ],
        organicSolution: [
          'घुलनशील सल्फर (Wettable Sulphur 80% WP) 2 ग्राम प्रति लीटर पानी में मिलाकर छिड़कें।',
          'स्यूडोमोनास फ्लोरेसेंस (Pseudomonas fluorescens) 5 ग्राम प्रति लीटर का छिड़काव करें।',
          'नीम तेल का नियमित छिड़काव फंगल बीजाणुओं को पनपने से रोकता है।'
        ],
        chemicalSolution: [
          'प्रोपिकोनाज़ोल 25% EC (टिल्ट) 1 मिली प्रति लीटर पानी में मिलाकर छिड़कें।',
          'या टेबुकोनाज़ोल 25.9% EC 1 मिली प्रति लीटर का छिड़काव करें।',
          'भुट्टा निकलने से पहले छिड़काव करने पर पैदावार सुरक्षित रहती है।'
        ],
        wateringAndSoil: [
          'पत्तियों पर पानी का छिड़काव न करें; क्यारियों में पानी दें।',
          'संतुलित पोटाश दें जिससे पौधे की रोग से लड़ने की क्षमता बढ़ती है।'
        ],
        preventionTips: [
          'रस्ट-प्रतिरोधी उन्नत हाइब्रिड मक्का बीजों की ही बुवाई करें।',
          'पौधों को बहुत घना न लगाएं ताकि हवा का संचार बना रहे।'
        ]
      },
      hinglish: {
        diagnosisSummary: 'Makka ki patti par Common Rust (Ratuwa Rog) ka fungus laga hai. Patti ke dono taraf lal-bhoore rang ke powder jaise dane ban jaate hain.',
        immediateAction: [
          'Check karein ki bimari upar wali taaza pattiyo tak to nahi pahunch rahi.',
          'Zyada kharab ho chuki nichli pattiya tod kar khet se bahar mitti me dafan karein.'
        ],
        organicSolution: [
          'Wettable Sulphur (Ghulansheel Gandhak) 2 gram per litre paani me ghol kar spray karein.',
          'Neem tel 5ml/litre ka spray fungal spores ko aage failne se rokega.',
          'Pseudomonas bio-agent ka spray subah ke time karein.'
        ],
        chemicalSolution: [
          'Propiconazole 25% EC (Tilt) 1ml per litre paani me milakar spray karein.',
          'Ya Tebuconazole 1ml/L ka spray karein.',
          'Bhutta aane se pehle spray karna sabse faydemand rehta hai.'
        ],
        wateringAndSoil: [
          'Sprinkler se pani na dein taaki patti geeli na rahe.',
          'Potash (K) ka sahi dose dein, isse patti majboot banti hai.'
        ],
        preventionTips: [
          'Disease-resistant maize hybrid seeds hi lagayein.',
          'Poudhe bahut paas-paas na lagayein, thoda space rakhein.'
        ]
      }
    }
  }
];
