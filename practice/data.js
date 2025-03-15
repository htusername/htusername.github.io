// Practice data - conversations with prepositions (beginner level)
const allPracticeData = [
    // Original 10 sentences
    {
        lineA: "The book is {{blank}} the table.",
        lineB: "Yes, I can see it.",
        options: ["at", "on", "in"],
        correct: "on"
    },
    {
        lineA: "My cat sleeps {{blank}} the bed.",
        lineB: "That's cute. I like cats.",
        options: ["on", "at", "to"],
        correct: "on"
    },
    {
        lineA: "I live {{blank}} a small house.",
        lineB: "Is it near the park?",
        options: ["on", "at", "in"],
        correct: "in"
    },
    {
        lineA: "I go to school {{blank}} bus.",
        lineB: "I walk to school.",
        options: ["with", "by", "on"],
        correct: "by"
    },
    {
        lineA: "What do you have {{blank}} your bag?",
        lineB: "I have my lunch and some books.",
        options: ["in", "on", "at"],
        correct: "in"
    },
    {
        lineA: "Let's meet {{blank}} 2 o'clock.",
        lineB: "OK. I'll be there.",
        options: ["in", "at", "on"],
        correct: "at"
    },
    {
        lineA: "The store is {{blank}} Main Street.",
        lineB: "Thank you. I'll find it.",
        options: ["on", "in", "at"],
        correct: "on"
    },
    {
        lineA: "I'm learning English {{blank}} school.",
        lineB: "Me too! It's fun.",
        options: ["at", "on", "to"],
        correct: "at"
    },
    {
        lineA: "I put sugar {{blank}} my coffee.",
        lineB: "I like tea better than coffee.",
        options: ["on", "in", "with"],
        correct: "in"
    },
    {
        lineA: "She's waiting {{blank}} you outside.",
        lineB: "Thanks, I'll go now.",
        options: ["for", "to", "at"],
        correct: "for"
    },
    
    // 60 new sentence pairs
    {
        lineA: "We're going {{blank}} vacation next week.",
        lineB: "That sounds fun!",
        options: ["on", "in", "at"],
        correct: "on"
    },
    {
        lineA: "The restaurant is {{blank}} the corner.",
        lineB: "Let's go there for lunch.",
        options: ["on", "at", "in"],
        correct: "on"
    },
    {
        lineA: "I always drink water {{blank}} meals.",
        lineB: "That's healthy.",
        options: ["with", "at", "in"],
        correct: "with"
    },
    {
        lineA: "The movie starts {{blank}} 7:30 PM.",
        lineB: "We should leave soon.",
        options: ["on", "in", "at"],
        correct: "at"
    },
    {
        lineA: "She's very good {{blank}} math.",
        lineB: "Yes, she always gets high scores.",
        options: ["at", "with", "in"],
        correct: "at"
    },
    {
        lineA: "I'm looking {{blank}} my keys.",
        lineB: "Did you check your pocket?",
        options: ["for", "at", "to"],
        correct: "for"
    },
    {
        lineA: "The children are playing {{blank}} the garden.",
        lineB: "They look happy.",
        options: ["in", "on", "at"],
        correct: "in"
    },
    {
        lineA: "We eat dinner {{blank}} 6:30 every day.",
        lineB: "That's early.",
        options: ["in", "on", "at"],
        correct: "at"
    },
    {
        lineA: "There's milk {{blank}} the refrigerator.",
        lineB: "Good, I need some for breakfast.",
        options: ["on", "in", "at"],
        correct: "in"
    },
    {
        lineA: "My birthday is {{blank}} May.",
        lineB: "I'll remember to send you a card.",
        options: ["on", "in", "at"],
        correct: "in"
    },
    {
        lineA: "The pharmacy is {{blank}} the hospital.",
        lineB: "Is it open now?",
        options: ["next to", "between", "across from"],
        correct: "next to"
    },
    {
        lineA: "I usually go to bed {{blank}} 10 PM.",
        lineB: "That's a good time.",
        options: ["on", "in", "at"],
        correct: "at"
    },
    {
        lineA: "Do you work {{blank}} Saturdays?",
        lineB: "No, I only work Monday to Friday.",
        options: ["in", "on", "at"],
        correct: "on"
    },
    {
        lineA: "She's afraid {{blank}} spiders.",
        lineB: "Many people are.",
        options: ["of", "for", "with"],
        correct: "of"
    },
    {
        lineA: "The bank is {{blank}} the post office and the library.",
        lineB: "I need to go there today.",
        options: ["next to", "between", "across from"],
        correct: "between"
    },
    {
        lineA: "My office is {{blank}} the fifth floor.",
        lineB: "Do you take the elevator?",
        options: ["on", "in", "at"],
        correct: "on"
    },
    {
        lineA: "We arrived {{blank}} the airport at 10 PM.",
        lineB: "Was the flight on time?",
        options: ["to", "at", "in"],
        correct: "at"
    },
    {
        lineA: "She's allergic {{blank}} peanuts.",
        lineB: "That can be dangerous.",
        options: ["to", "of", "for"],
        correct: "to"
    },
    {
        lineA: "I'm interested {{blank}} learning Spanish.",
        lineB: "Spanish is a useful language.",
        options: ["in", "for", "about"],
        correct: "in"
    },
    {
        lineA: "The supermarket is {{blank}} from our house.",
        lineB: "Is it within walking distance?",
        options: ["far", "away", "distant"],
        correct: "far"
    },
    {
        lineA: "I listen {{blank}} music every day.",
        lineB: "What kind of music do you like?",
        options: ["to", "at", "for"],
        correct: "to"
    },
    {
        lineA: "She's married {{blank}} a doctor.",
        lineB: "They make a nice couple.",
        options: ["with", "to", "for"],
        correct: "to"
    },
    {
        lineA: "The bank is {{blank}} from the post office.",
        lineB: "I need to go to both places.",
        options: ["next to", "between", "across"],
        correct: "across"
    },
    {
        lineA: "I'm tired {{blank}} studying.",
        lineB: "Take a short break.",
        options: ["of", "from", "with"],
        correct: "of"
    },
    {
        lineA: "We're leaving {{blank}} Friday morning.",
        lineB: "Have a safe trip!",
        options: ["in", "on", "at"],
        correct: "on"
    },
    {
        lineA: "The dog is sleeping {{blank}} the floor.",
        lineB: "He looks comfortable.",
        options: ["in", "on", "at"],
        correct: "on"
    },
    {
        lineA: "I need to talk {{blank}} you.",
        lineB: "Is something wrong?",
        options: ["to", "with", "at"],
        correct: "to"
    },
    {
        lineA: "Please write {{blank}} a pen, not a pencil.",
        lineB: "I only have a pencil right now.",
        options: ["with", "in", "by"],
        correct: "with"
    },
    {
        lineA: "The car is parked {{blank}} the garage.",
        lineB: "At least it's not raining.",
        options: ["on", "in", "at"],
        correct: "in"
    },
    {
        lineA: "I'm excited {{blank}} the party tonight.",
        lineB: "Me too! It will be fun.",
        options: ["for", "about", "on"],
        correct: "about"
    },
    {
        lineA: "She's very good {{blank}} playing the piano.",
        lineB: "Yes, she practices every day.",
        options: ["at", "in", "with"],
        correct: "at"
    },
    {
        lineA: "I'm thinking {{blank}} buying a new car.",
        lineB: "What kind of car do you want?",
        options: ["about", "of", "for"],
        correct: "about"
    },
    {
        lineA: "We walked {{blank}} the park yesterday.",
        lineB: "Was the weather nice?",
        options: ["on", "to", "in"],
        correct: "in"
    },
    {
        lineA: "The movie is based {{blank}} a true story.",
        lineB: "Those are often the best movies.",
        options: ["on", "from", "with"],
        correct: "on"
    },
    {
        lineA: "I'm worried {{blank}} my exam tomorrow.",
        lineB: "You'll do fine if you studied.",
        options: ["about", "for", "of"],
        correct: "about"
    },
    {
        lineA: "They live {{blank}} Japan.",
        lineB: "Have you visited them there?",
        options: ["on", "at", "in"],
        correct: "in"
    },
    {
        lineA: "I usually eat lunch {{blank}} noon.",
        lineB: "That's a good time for lunch.",
        options: ["on", "in", "at"],
        correct: "at"
    },
    {
        lineA: "She arrived {{blank}} home late last night.",
        lineB: "Did she have a long day at work?",
        options: ["to", "at", "in"],
        correct: "at"
    },
    {
        lineA: "We're meeting {{blank}} the library.",
        lineB: "I'll see you there at 3:00.",
        options: ["on", "at", "in"],
        correct: "at"
    },
    {
        lineA: "This present is {{blank}} you.",
        lineB: "Thank you! That's so kind.",
        options: ["for", "to", "at"],
        correct: "for"
    },
    {
        lineA: "She's waiting {{blank}} the bus stop.",
        lineB: "The bus should arrive soon.",
        options: ["in", "on", "at"],
        correct: "at"
    },
    {
        lineA: "I put my phone {{blank}} my pocket.",
        lineB: "Make sure you don't lose it.",
        options: ["on", "at", "in"],
        correct: "in"
    },
    {
        lineA: "The cat is hiding {{blank}} the couch.",
        lineB: "She always hides there.",
        options: ["below", "under", "beneath"],
        correct: "under"
    },
    {
        lineA: "We need to be at the airport {{blank}} 6:00 AM.",
        lineB: "That's very early!",
        options: ["in", "on", "at"],
        correct: "at"
    },
    {
        lineA: "He's flying {{blank}} New York tomorrow.",
        lineB: "Is it for business or vacation?",
        options: ["to", "at", "in"],
        correct: "to"
    },
    {
        lineA: "I bought this gift {{blank}} my mother.",
        lineB: "She'll love it.",
        options: ["for", "to", "at"],
        correct: "for"
    },
    {
        lineA: "The keys are {{blank}} the table.",
        lineB: "I've been looking for them.",
        options: ["on", "in", "at"],
        correct: "on"
    },
    {
        lineA: "We're having dinner {{blank}} a restaurant tonight.",
        lineB: "Which restaurant are you going to?",
        options: ["on", "at", "in"],
        correct: "at"
    },
    {
        lineA: "She's standing {{blank}} the door.",
        lineB: "Should I let her in?",
        options: ["at", "in", "on"],
        correct: "at"
    },
    {
        lineA: "I need to be {{blank}} work by 8:00 AM.",
        lineB: "Do you have a long commute?",
        options: ["on", "at", "in"],
        correct: "at"
    },
    {
        lineA: "The book is {{blank}} English.",
        lineB: "Is it difficult to read?",
        options: ["in", "on", "at"],
        correct: "in"
    },
    {
        lineA: "I'll see you {{blank}} Monday.",
        lineB: "What time should we meet?",
        options: ["at", "on", "in"],
        correct: "on"
    },
    {
        lineA: "The picture is {{blank}} the wall.",
        lineB: "It looks nice there.",
        options: ["in", "on", "at"],
        correct: "on"
    },
    {
        lineA: "She's waiting {{blank}} her friend.",
        lineB: "Her friend is usually late.",
        options: ["to", "for", "at"],
        correct: "for"
    },
    {
        lineA: "I usually go to the gym {{blank}} the morning.",
        lineB: "That's a healthy habit.",
        options: ["on", "at", "in"],
        correct: "in"
    },
    {
        lineA: "We're leaving {{blank}} vacation tomorrow.",
        lineB: "Where are you going?",
        options: ["to", "for", "on"],
        correct: "for"
    },
    {
        lineA: "She's afraid {{blank}} the dark.",
        lineB: "Many children are afraid of the dark.",
        options: ["from", "of", "with"],
        correct: "of"
    },
    {
        lineA: "My birthday is {{blank}} July 15.",
        lineB: "I'll remember to send you a card.",
        options: ["in", "at", "on"],
        correct: "on"
    },
    {
        lineA: "The shoes are {{blank}} the closet.",
        lineB: "I was looking for them.",
        options: ["at", "in", "on"],
        correct: "in"
    },
    {
        lineA: "I'm going {{blank}} work now.",
        lineB: "Have a good day!",
        options: ["at", "to", "in"],
        correct: "to"
    },
    {
        lineA: "We're meeting {{blank}} 3:30 PM.",
        lineB: "I'll be there on time.",
        options: ["in", "on", "at"],
        correct: "at"
    },
    {
        lineA: "She's good {{blank}} cooking.",
        lineB: "Yes, her food is delicious.",
        options: ["at", "in", "with"],
        correct: "at"
    },
    {
        lineA: "The museum is {{blank}} from the hotel.",
        lineB: "Can we walk there?",
        options: ["far", "away", "distant"],
        correct: "far"
    },
    {
        lineA: "I live {{blank}} 123 Main Street.",
        lineB: "Is that near downtown?",
        options: ["on", "at", "in"],
        correct: "at"
    },
    {
        lineA: "We have a meeting {{blank}} Friday.",
        lineB: "What time is the meeting?",
        options: ["in", "on", "at"],
        correct: "on"
    },
    {
        lineA: "She's sitting {{blank}} the chair.",
        lineB: "Is she comfortable?",
        options: ["in", "on", "at"],
        correct: "on"
    },
    {
        lineA: "I'm interested {{blank}} history.",
        lineB: "History is fascinating.",
        options: ["in", "at", "for"],
        correct: "in"
    },
    {
        lineA: "The dog is {{blank}} the bed.",
        lineB: "He looks comfortable.",
        options: ["on", "in", "at"],
        correct: "on"
    }
];

// Randomly select 10 questions each time
function getRandomQuestions(totalQuestions) {
    // Make a copy of the full data array
    const allQuestions = [...allPracticeData];
    
    // Shuffle the array
    for (let i = allQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
    }
    
    // Return the first n questions
    return allQuestions.slice(0, totalQuestions);
}

// Get 10 random questions
const practiceData = getRandomQuestions(10);
