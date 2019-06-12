const emoji = {
    // Fear
    fearful: "😨", scream: "😱", anxious: "😰", anguish: "😧",
    // Love
    inLove: "😍", embarrassed: "😳", hug: "🤗", kiss: "😚",
    // Joy
    beaming: "😁", smile: "🙂", joy: "😊", relief: "😌", happy: "😋",
    // Surprise
    astonished: "😲", surprise: "😯", awe: "😮", concern: "😦",
    // Sadness
    cry: "😢", bigCry: "😭", pleading: "🥺", frown: "☹️", worry: "😟", hurt: "🤕",
    // Anger
    swear: "🤬", pouting: "😡", angry: "😠", contempt: "😤",
};

const mood = (name, emoji) => ({name, emoji});

const moods = [
    // Fear
    mood("Panicked", emoji.scream), mood("Helpless", emoji.anguish), mood("Frightened", emoji.fearful),
    // Love
    mood("Satisfied", emoji.relief), mood("Relieved", emoji.relief), mood("Compassionate", emoji.kiss), mood("Caring", emoji.smile), mood("Infatuated", emoji.inLove), mood("Passionate", emoji.inLove), mood("Attracted", emoji.inLove), mood("Sentimental", emoji.hug), mood("Fond", emoji.hug), mood("Romantic", emoji.kiss),
    // Joy
    mood("Enchanted", emoji.joy), mood("Jubilant", emoji.happy), mood("Euphoric", emoji.beaming), mood("Zealous", emoji.smile), mood("Excited", emoji.beaming), mood("Hopeful", emoji.smile), mood("Eager", emoji.beaming), mood("Triumphant", emoji.beaming), mood("Blissful", emoji.relief), mood("Jovial", emoji.joy), mood("Delighted", emoji.joy), mood("Amused", emoji.joy), mood("Satisfied", emoji.smile), mood("Pleased", emoji.smile),
    // Surprise
    mood("Touched", emoji.surprise), mood("Astounded", emoji.astonished), mood("Speechless", emoji.awe), mood("Awe-struck", emoji.awe), mood("Astonished", emoji.astonished), mood("Perplexed", emoji.concern), mood("Disillusioned", emoji.concern), mood("Shocked", emoji.surprise),
    // Sadness
    mood("Powerless", emoji.worry), mood("Grievous", emoji.bigCry), mood("Lonely", emoji.pleading), mood("Isolated", emoji.pleading), mood("Guilty", emoji.worry), mood("Regretful", emoji.pleading), mood("Displeased", emoji.frown), mood("Dismayed", emoji.frown), mood("Sorrowful", emoji.cry), mood("Depressed", emoji.cry), mood("Hurt", emoji.hurt),
    // Anger
    mood("Angry", emoji.angry), mood("Revolted", emoji.pouting), mood("Contempt", emoji.contempt), mood("Jealous", emoji.pouting), mood("Resentful", emoji.contempt), mood("Aggravated", emoji.angry), mood("Annoyed", emoji.contempt), mood("Frustrated", emoji.swear), mood("Agitated", emoji.swear), mood("Hostile", emoji.swear), mood("Hateful", emoji.pouting),
    // Fear
    mood("Dreadful", emoji.anxious), mood("Mortified", emoji.fearful), mood("Anxious", emoji.anxious), mood("Worried", emoji.anxious), mood("Inadequate", emoji.anguish), mood("Inferior", emoji.anguish), mood("Hysterical", emoji.scream),
];

export default (hue) => {
    return moods[Math.floor(hue * moods.length)];
};
