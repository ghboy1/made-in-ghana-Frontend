/**
 * Comprehensive Ghana Quiz Data
 * Contains structured quiz questions across multiple categories
 */

const ghanaQuizData = {
  cooking: [
    {
      id: 'cook-1',
      question: 'What is the national dish of Ghana?',
      options: ['Banku with Tilapia', 'Jollof Rice', 'Fufu with Light Soup'],
      answer: 1,
      explanation: 'Jollof Rice is considered Ghana\'s national dish, popular at celebrations and everyday meals.'
    },
    {
      id: 'cook-2',
      question: 'Which leaf is used in Palaver sauce?',
      options: ['Kontomire (Cocoyam leaves)', 'Bitter leaf', 'Spinach'],
      answer: 0,
      explanation: 'Kontomire (cocoyam leaves) is the main ingredient in Palaver sauce, also known as Kontomire stew.'
    },
    {
      id: 'cook-3',
      question: 'What is the main ingredient in Banku?',
      options: ['Cassava', 'Corn dough', 'Rice flour'],
      answer: 1,
      explanation: 'Banku is made primarily from fermented corn dough, often mixed with cassava dough.'
    },
    {
      id: 'cook-4',
      question: 'Which Ghanaian food is made from fermented corn?',
      options: ['Kenkey', 'Waakye', 'Red Red'],
      answer: 0,
      explanation: 'Kenkey is made from fermented corn dough, wrapped in corn husks or banana leaves and steamed.'
    },
    {
      id: 'cook-5',
      question: 'What is Shito?',
      options: ['A type of bread', 'A hot pepper sauce', 'A dessert'],
      answer: 1,
      explanation: 'Shito is a spicy Ghanaian pepper sauce made with fish or shrimp, peppers, and spices.'
    },
    // Add remaining cooking questions...
  ],
  
  crafts: [
    {
      id: 'craft-1',
      question: 'Which ethnic group is most associated with Kente cloth?',
      options: ['Ga', 'Ewe', 'Ashanti'],
      answer: 2,
      explanation: 'The Ashanti (Asante) people are most known for creating Kente cloth, though the Ewe also produce their own variety.'
    },
    {
      id: 'craft-2',
      question: 'What material is traditionally used to make Bolga baskets?',
      options: ['Palm leaves', 'Elephant grass', 'Jute'],
      answer: 1,
      explanation: 'Bolga baskets are made from elephant grass and are named after Bolgatanga in northern Ghana.'
    },
    {
      id: 'craft-3',
      question: 'What is Adinkra cloth traditionally used for?',
      options: ['Everyday wear', 'Ceremonial occasions', 'Fishing'],
      answer: 1,
      explanation: 'Adinkra cloth, with its symbolic patterns, is traditionally worn for ceremonial occasions like funerals and festivals.'
    },
    {
      id: 'craft-4',
      question: 'Which region is known for brass casting?',
      options: ['Volta Region', 'Northern Region', 'Ashanti Region'],
      answer: 0,
      explanation: 'The Volta Region, particularly around Kpando, is known for its traditional brass casting crafts.'
    },
    {
      id: 'craft-5',
      question: 'What color is most commonly associated with funeral cloth in Ghana?',
      options: ['White', 'Red', 'Black/Red combinations'],
      answer: 2,
      explanation: 'Black and red combinations are traditional funeral colors in Ghana, particularly in Akan culture.'
    },
    // Add remaining craft questions...
  ],
  
  language: [
    {
      id: 'lang-1',
      question: 'How do you say "welcome" in Twi?',
      options: ['Medaase', 'Akwaaba', 'Yɛbɛhyia bio'],
      answer: 1,
      explanation: 'Akwaaba is the Twi word for welcome, and is used widely across Ghana.'
    },
    {
      id: 'q3-1',
      question: 'What does the Twi greeting "Maakye" mean in English?',
      options: ['Good morning', 'Good afternoon', 'Good evening', 'Hello'],
      answer: 0,
      explanation: 'Maakye is the Twi greeting used in the morning, equivalent to "Good morning" in English.'
    },
    {
      id: 'q3-2',
      question: 'What does the Twi phrase "Maaha" mean in English?',
      options: ['Good night', 'Good morning', 'Good afternoon', 'Goodbye'],
      answer: 2
    },
    {
      id: 'q3-3',
      question: 'What is the English meaning of the Twi phrase "Maadwo"?',
      options: ['Good morning', 'Good evening', 'Good afternoon', 'Good night'],
      answer: 1
    },
    {
      id: 'q3-4',
      question: 'What is the Twi phrase for "How are you?"',
      options: ['Ɛte sɛn?', 'Akwaaba', 'Medase', 'Yɛfrɛ wo'],
      answer: 0
    },
    {
      id: 'q3-5',
      question: 'What is the meaning of the Akan word "Akwaaba"?',
      options: ['Welcome', 'Thank you', 'Goodbye', 'Congratulations'],
      answer: 0
    },
    {
      id: 'q3-6',
      question: 'What is the Twi phrase for "thank you"?',
      options: ['Meda wo ase (Medaase)', 'Akwaaba', 'Da yie', 'Agya'],
      answer: 0
    },
    {
      id: 'q3-7',
      question: 'What is the Twi word for "Yes"?',
      options: ['Aane', 'Dabi', 'Daabi', 'Dabiɛ'],
      answer: 0
    },
    {
      id: 'q3-8',
      question: 'What is the Twi word for "No"?',
      options: ['Dabi', 'Aane', 'Dabiɛ', 'Daabi'],
      answer: 0
    },
    {
      id: 'q3-9',
      question: 'How do you say "please" in Twi?',
      options: ['Medaase', 'Mepa wo kyɛw', 'Akwaaba', 'Nante yie'],
      answer: 1
    },
    {
      id: 'q3-10',
      question: 'According to Akan naming tradition, a male born on Friday is commonly named:',
      options: ['Kwabena', 'Kwaku', 'Yaw', 'Kofi'],
      answer: 3
    },
    // Add remaining language questions...
  ],
  
  technology: [
    {
      id: 'tech-1',
      question: 'What percentage of Ghanaians have access to the internet?',
      options: ['Around 20%', 'Around 50%', 'Around 70%'],
      answer: 1,
      explanation: 'As of recent data, approximately 50% of Ghanaians have access to the internet, primarily through mobile devices.'
    },
    {
      id: 'tech-2',
      question: 'Which mobile money service was first introduced in Ghana?',
      options: ['AirtelTigo Money', 'MTN Mobile Money', 'Vodafone Cash'],
      answer: 1,
      explanation: 'MTN Mobile Money was the first mobile money service introduced in Ghana in 2009.'
    },
    {
      id: 'tech-3',
      question: 'What is the name of Ghana\'s tech hub in Accra?',
      options: ['Tech Village', 'MEST', 'Kumasi Hive'],
      answer: 1,
      explanation: 'MEST (Meltwater Entrepreneurial School of Technology) is a prominent tech hub and incubator in Accra.'
    },
    {
      id: 'tech-4',
      question: 'Which government initiative aims to digitize Ghana\'s economy?',
      options: ['Digital Ghana', 'Ghana Beyond Aid', 'Ghana Digital Agenda'],
      answer: 2,
      explanation: 'The Ghana Digital Agenda is the government initiative focused on digitizing the economy and public services.'
    },
    {
      id: 'tech-5',
      question: 'What is the Ghana Innovation Hub?',
      options: ['A government ministry', 'A tech incubator and co-working space', 'A university department'],
      answer: 1,
      explanation: 'The Ghana Innovation Hub is a tech incubator and co-working space supporting startups and innovation.'
    },
    // Add remaining technology questions...
  ],
  
  proverbs: [
    {
      id: 'prov-1',
      question: 'Complete this Ghanaian proverb: "Knowledge is like a _____"',
      options: ['garden', 'baobab tree', 'deep ocean'],
      answer: 1,
      explanation: 'The complete proverb is "Knowledge is like a baobab tree; no one individual can embrace it." This emphasizes that knowledge is vast and requires collective effort.'
    },
    {
      id: 'prov-2',
      question: 'What does the proverb "The elder who sits at home and allows the young to make mistakes is not worthy of the title elder" teach?',
      options: ['Respect for age', 'Importance of guidance', 'Value of experience'],
      answer: 1,
      explanation: 'This proverb emphasizes the responsibility of elders to guide younger generations and prevent them from making avoidable mistakes.'
    },
    {
      id: 'prov-3',
      question: 'Complete the proverb: "When the ___ falls, all the little birds pick it up."',
      options: ['Fruit', 'Rain', 'Seed'],
      answer: 0,
      explanation: 'The complete proverb is "When the fruit falls, all the little birds pick it up," meaning when someone powerful falls from grace, many people take advantage.'
    },
    {
      id: 'prov-4',
      question: 'What is the meaning of "If you want to go fast, go alone. If you want to go far, go together"?',
      options: ['Independence is more efficient', 'Collaboration achieves greater long-term success', 'Travel advice for Ghana'],
      answer: 1,
      explanation: 'This proverb teaches that while working alone might be quicker initially, collaboration and teamwork lead to greater and more sustainable success.'
    },
    {
      id: 'prov-5',
      question: 'What does the proverb "The river that forgets its source will dry up" teach?',
      options: ['Environmental conservation', 'Remembering one\'s roots and origins', 'Water management'],
      answer: 1,
      explanation: 'This proverb emphasizes the importance of remembering and honoring one\'s origins, heritage, and those who helped you along your journey.'
    },
    {
      id: 'prov-6',
      question: 'What is the meaning of the Akan proverb "Okoto nwo anomaa" (The crab does not give birth to a bird)?',
      options: ['Children inherit their parents\' traits', 'Some things are impossible', 'Everyone has unique talents'],
      answer: 0,
      explanation: 'This proverb teaches that children often inherit the traits, characteristics, and behaviors of their parents - similar to "the apple doesn\'t fall far from the tree."'
    },
    {
      id: 'prov-7',
      question: 'The Akan proverb "Ti koro nko agyina" translates to:',
      options: ['Knowledge is power', 'One head cannot hold council', 'The wise learn from others'],
      answer: 1,
      explanation: 'This proverb means "One head cannot hold council" - similar to "two heads are better than one," emphasizing the importance of collaboration and diverse perspectives.'
    },
    {
      id: 'prov-8',
      question: 'What lesson does the Akan proverb "Anomaa antu a, obua da" (If a bird does not fly, it will go hungry) teach?',
      options: ['The importance of preparing for the future', 'One must take action to succeed', 'Food is necessary for survival'],
      answer: 1,
      explanation: 'This proverb emphasizes that one must take initiative and action to succeed in life - without effort, one cannot expect results or rewards.'
    },
    {
      id: 'prov-9',
      question: 'The Akan proverb "Agya bi wu a, agya bi te ase" means:',
      options: ['Life is a cycle of birth and death', 'When one father dies, another lives', 'Elders should be respected'],
      answer: 1,
      explanation: 'This proverb teaches that support systems continue even after loss - when one mentor or supporter is gone, others will still be there to provide guidance and support.'
    },
    {
      id: 'prov-10',
      question: 'What does the Akan proverb "Obi nkyere akwadaa Nyame" (Nobody teaches a child about God) suggest?',
      options: ['Religion must be taught early', 'Some knowledge is innate', 'Children are naturally curious'],
      answer: 1,
      explanation: 'This proverb suggests that some awareness and knowledge are innate or intuitive - children naturally sense certain fundamental truths without being explicitly taught.'
    },
    {
      id: 'prov-11',
      question: 'The Akan saying "Woforo dua pa a na yepia wo" teaches:',
      options: ['Success comes from hard work', 'Community supports those with good intentions', 'Climbing trees is dangerous'],
      answer: 1,
      explanation: 'The proverb means "If you climb a good tree, the community will support you" - suggesting that people will support those whose endeavors are worthy and beneficial.'
    },
    {
      id: 'prov-12',
      question: 'What perspective does the Ewe proverb "Though the earth is solid, the chameleon makes cautious steps on it" offer?',
      options: ['Caution is unnecessary', 'Even in seemingly safe situations, proceed with care', 'Earth is the strongest element'],
      answer: 1,
      explanation: 'This proverb advises prudence and careful consideration even when the path seems secure - wisdom lies in thoughtful progress rather than hasty action.'
    },
    {
      id: 'prov-13',
      question: 'The Ewe proverb "A fish is in water but does not know the importance of water" teaches about:',
      options: ['The ignorance of fish', 'Taking things for granted', 'The importance of water conservation'],
      answer: 1,
      explanation: 'This proverb highlights how we often fail to appreciate the essential elements in our lives until they are absent - we take for granted what sustains us.'
    },
    {
      id: 'prov-14',
      question: 'What lesson does the Dagbani proverb "However nice the elbow may be, it cannot remove dirt from the eye" teach?',
      options: ['Personal limitations', 'Proper tool for each task', 'Importance of cleanliness'],
      answer: 1,
      explanation: 'This proverb teaches that regardless of qualities or capabilities, some things are simply not suited for certain tasks - we need the right approach for each situation.'
    },
    {
      id: 'prov-15',
      question: 'The Dagbani saying "An old man sitting on the ground sees what a child cannot see even if he climbs a tree" refers to:',
      options: ['Physical strength versus wisdom', 'Height advantages', 'Respecting elders'],
      answer: 0,
      explanation: 'This proverb contrasts physical advantage (height/youth) with the superior advantage of wisdom and experience - emphasizing that wisdom often sees farther than mere physical perspective.'
    },
    {
      id: 'prov-16',
      question: 'What does the Ghanaian proverb "Do not look where you fell but where you slipped" teach?',
      options: ['Focus on the future, not the past', 'Address the cause, not just the effect', 'Be careful where you walk'],
      answer: 1,
      explanation: 'This proverb advises that to solve problems effectively, one must identify and address the root cause rather than merely dealing with the consequences.'
    },
    {
      id: 'prov-17',
      question: 'The meaning of "Two men in a burning house must not stop to argue" is:',
      options: ['Arguments are pointless', 'In emergencies, action takes priority over discussion', 'Fires are dangerous'],
      answer: 1,
      explanation: 'This proverb emphasizes that in urgent situations, taking immediate action is more important than debating or arguing - practical response should take precedence.'
    },
    {
      id: 'prov-18',
      question: 'What wisdom does "One tree cannot become a forest" impart?',
      options: ['Forests require diversity', 'Individual effort has limits', 'Trees grow slowly'],
      answer: 1,
      explanation: 'This proverb teaches that significant achievements often require collective effort - no matter how great an individual is, they cannot accomplish alone what a community can achieve together.'
    },
    {
      id: 'prov-19',
      question: 'The Akan proverb "Sɛ wo werɛ fi na wosankofa a, yɛnkyi" is the origin of which important concept?',
      options: ['Ubuntu', 'Sankofa', 'Harambee'],
      answer: 1,
      explanation: 'This proverb, meaning "It is not taboo to go back for what you forgot," is the origin of the concept of Sankofa - the wisdom of learning from the past to build a successful future.'
    },
    {
      id: 'prov-20',
      question: 'What does the Akan saying "Onipa yɛ de" (Human being is sweet) teach?',
      options: ['Cannibalism', 'The value of human life', 'People are naturally kind'],
      answer: 1,
      explanation: 'This proverb expresses that human beings are precious and valuable - emphasizing the inherent worth and importance of people and encouraging compassion and humanity.'
    }
  ]
};

export default ghanaQuizData;