// Sample data structure for the flashcards
const allVerbSets = [
    {
        present: { word: "go", sentence: "I go to school every day." },
        past: { word: "went", sentence: "I went to school yesterday." },
        future: { word: "will go", sentence: "I will go to school tomorrow." }
    },
    {
        present: { word: "eat", sentence: "I eat breakfast at 8 AM." },
        past: { word: "ate", sentence: "I ate breakfast at 8 AM yesterday." },
        future: { word: "will eat", sentence: "I will eat breakfast at 8 AM tomorrow." }
    },
    {
        present: { word: "run", sentence: "I run in the park." },
        past: { word: "ran", sentence: "I ran in the park yesterday." },
        future: { word: "will run", sentence: "I will run in the park tomorrow." }
    },
    {
        present: { word: "write", sentence: "I write in my journal." },
        past: { word: "wrote", sentence: "I wrote in my journal yesterday." },
        future: { word: "will write", sentence: "I will write in my journal tomorrow." }
    },
    {
        present: { word: "read", sentence: "I read books in my free time." },
        past: { word: "read", sentence: "I read books in my free time yesterday." },
        future: { word: "will read", sentence: "I will read books in my free time tomorrow." }
    },
    {
        present: { word: "speak", sentence: "I speak English with my friends." },
        past: { word: "spoke", sentence: "I spoke English with my friends yesterday." },
        future: { word: "will speak", sentence: "I will speak English with my friends tomorrow." }
    },
    {
        present: { word: "drive", sentence: "I drive to work." },
        past: { word: "drove", sentence: "I drove to work yesterday." },
        future: { word: "will drive", sentence: "I will drive to work tomorrow." }
    },
    {
        present: { word: "see", sentence: "I see my family on weekends." },
        past: { word: "saw", sentence: "I saw my family last weekend." },
        future: { word: "will see", sentence: "I will see my family this weekend." }
    },
    {
        present: { word: "make", sentence: "I make dinner every evening." },
        past: { word: "made", sentence: "I made dinner yesterday evening." },
        future: { word: "will make", sentence: "I will make dinner this evening." }
    },
    {
        present: { word: "take", sentence: "I take the bus to school." },
        past: { word: "took", sentence: "I took the bus to school yesterday." },
        future: { word: "will take", sentence: "I will take the bus to school tomorrow." }
    },
    // Additional irregular verbs from the list
    {
        present: { word: "be (am/is/are)", sentence: "I am at home right now." },
        past: { word: "was/were", sentence: "I was at home yesterday." },
        future: { word: "will be", sentence: "I will be at home tomorrow." }
    },
    {
        present: { word: "bring", sentence: "I bring my lunch to work." },
        past: { word: "brought", sentence: "I brought my lunch to work yesterday." },
        future: { word: "will bring", sentence: "I will bring my lunch to work tomorrow." }
    },
    {
        present: { word: "buy", sentence: "I buy groceries on Sundays." },
        past: { word: "bought", sentence: "I bought groceries last Sunday." },
        future: { word: "will buy", sentence: "I will buy groceries this Sunday." }
    },
    {
        present: { word: "come", sentence: "I come home at 6 PM." },
        past: { word: "came", sentence: "I came home at 6 PM yesterday." },
        future: { word: "will come", sentence: "I will come home at 6 PM tomorrow." }
    },
    {
        present: { word: "cut", sentence: "I cut vegetables for dinner." },
        past: { word: "cut", sentence: "I cut vegetables for dinner yesterday." },
        future: { word: "will cut", sentence: "I will cut vegetables for dinner tomorrow." }
    },
    {
        present: { word: "do", sentence: "I do my homework every evening." },
        past: { word: "did", sentence: "I did my homework yesterday evening." },
        future: { word: "will do", sentence: "I will do my homework this evening." }
    },
    {
        present: { word: "drink", sentence: "I drink coffee every morning." },
        past: { word: "drank", sentence: "I drank coffee yesterday morning." },
        future: { word: "will drink", sentence: "I will drink coffee tomorrow morning." }
    },
    {
        present: { word: "fall", sentence: "Leaves fall from trees in autumn." },
        past: { word: "fell", sentence: "Leaves fell from trees last autumn." },
        future: { word: "will fall", sentence: "Leaves will fall from trees next autumn." }
    },
    {
        present: { word: "feel", sentence: "I feel happy when I exercise." },
        past: { word: "felt", sentence: "I felt happy when I exercised yesterday." },
        future: { word: "will feel", sentence: "I will feel happy when I exercise tomorrow." }
    },
    {
        present: { word: "fly", sentence: "Birds fly south for winter." },
        past: { word: "flew", sentence: "Birds flew south last winter." },
        future: { word: "will fly", sentence: "Birds will fly south next winter." }
    },
    {
        present: { word: "get", sentence: "I get good grades in school." },
        past: { word: "got", sentence: "I got good grades in school last year." },
        future: { word: "will get", sentence: "I will get good grades in school this year." }
    },
    {
        present: { word: "give", sentence: "I give presents on birthdays." },
        past: { word: "gave", sentence: "I gave presents on her birthday yesterday." },
        future: { word: "will give", sentence: "I will give presents on his birthday tomorrow." }
    },
    {
        present: { word: "grow", sentence: "Plants grow in my garden." },
        past: { word: "grew", sentence: "Plants grew in my garden last summer." },
        future: { word: "will grow", sentence: "Plants will grow in my garden next summer." }
    },
    {
        present: { word: "have", sentence: "I have a dog as a pet." },
        past: { word: "had", sentence: "I had a dog as a pet when I was young." },
        future: { word: "will have", sentence: "I will have a dog as a pet soon." }
    },
    {
        present: { word: "hear", sentence: "I hear birds singing every morning." },
        past: { word: "heard", sentence: "I heard birds singing yesterday morning." },
        future: { word: "will hear", sentence: "I will hear birds singing tomorrow morning." }
    },
    {
        present: { word: "keep", sentence: "I keep my room clean." },
        past: { word: "kept", sentence: "I kept my room clean all week." },
        future: { word: "will keep", sentence: "I will keep my room clean from now on." }
    },
    {
        present: { word: "lose", sentence: "I always lose my keys." },
        past: { word: "lost", sentence: "I lost my keys yesterday." },
        future: { word: "will lose", sentence: "I probably will lose my keys again." }
    },
    {
        present: { word: "meet", sentence: "I meet my friends on weekends." },
        past: { word: "met", sentence: "I met my friends last weekend." },
        future: { word: "will meet", sentence: "I will meet my friends this weekend." }
    },
    {
        present: { word: "put", sentence: "I put my books on the shelf." },
        past: { word: "put", sentence: "I put my books on the shelf yesterday." },
        future: { word: "will put", sentence: "I will put my books on the shelf tomorrow." }
    },
    {
        present: { word: "quit", sentence: "Some people quit their jobs to travel." },
        past: { word: "quit", sentence: "He quit his job last month to travel." },
        future: { word: "will quit", sentence: "She will quit her job next month to travel." }
    },
    {
        present: { word: "ride", sentence: "I ride my bike to work." },
        past: { word: "rode", sentence: "I rode my bike to work yesterday." },
        future: { word: "will ride", sentence: "I will ride my bike to work tomorrow." }
    },
    {
        present: { word: "sell", sentence: "They sell fresh fruit at this market." },
        past: { word: "sold", sentence: "They sold fresh fruit at this market last year." },
        future: { word: "will sell", sentence: "They will sell fresh fruit at this market next year." }
    },
    {
        present: { word: "set", sentence: "I set the table before dinner." },
        past: { word: "set", sentence: "I set the table before dinner yesterday." },
        future: { word: "will set", sentence: "I will set the table before dinner tomorrow." }
    },
    {
        present: { word: "sit", sentence: "I sit in the front row of class." },
        past: { word: "sat", sentence: "I sat in the front row of class yesterday." },
        future: { word: "will sit", sentence: "I will sit in the front row of class tomorrow." }
    },
    {
        present: { word: "sleep", sentence: "I sleep eight hours every night." },
        past: { word: "slept", sentence: "I slept eight hours last night." },
        future: { word: "will sleep", sentence: "I will sleep eight hours tonight." }
    },
    {
        present: { word: "spend", sentence: "I spend time with my family on weekends." },
        past: { word: "spent", sentence: "I spent time with my family last weekend." },
        future: { word: "will spend", sentence: "I will spend time with my family this weekend." }
    },
    {
        present: { word: "teach", sentence: "I teach English to children." },
        past: { word: "taught", sentence: "I taught English to children last year." },
        future: { word: "will teach", sentence: "I will teach English to children next year." }
    },
    {
        present: { word: "tell", sentence: "I tell stories to my little brother." },
        past: { word: "told", sentence: "I told stories to my little brother yesterday." },
        future: { word: "will tell", sentence: "I will tell stories to my little brother tomorrow." }
    },
    {
        present: { word: "think", sentence: "I think about my future often." },
        past: { word: "thought", sentence: "I thought about my future yesterday." },
        future: { word: "will think", sentence: "I will think about my future tomorrow." }
    },
    {
        present: { word: "wear", sentence: "I wear comfortable shoes to work." },
        past: { word: "wore", sentence: "I wore comfortable shoes to work yesterday." },
        future: { word: "will wear", sentence: "I will wear comfortable shoes to work tomorrow." }
    }
];
