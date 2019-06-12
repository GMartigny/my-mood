const moods = [
    "Panicked", "Helpless", "Frightened",
    "Satisfied", "Relieved", "Compassionate", "Caring", "Infatuated", "Passionate", "Attracted", "Sentimental", "Fond", "Romantic",
    "Enchanted", "Jubilant", "Euphoric", "Zealous", "Excited", "Hopeful", "Eager", "Illustrious", "Triumphant", "Blissful", "Jovial", "Delighted", "Amused", "Satisfied", "Pleased",
    "Touched", "Stimulated", "Astounded", "Speechless", "Awe-struck", "Astonished", "Perplexed", "Disillusioned", "Shocked",
    "Powerless", "Grievous", "Lonely", "Isolated", "Guilty", "Regretful", "Displeased", "Dismayed", "Sorrowful", "Depressed", "Hurt", "Angry",
    "Revolted", "Contempt", "Jealous", "Resentful", "Aggravated", "Annoyed", "Frustrated", "Agitated", "Hostile", "Hateful",
    "Dreadful", "Mortified", "Anxious", "Worried", "Inadequate", "Inferior", "Hysterical",
];

export default (hue) => {
    return moods[Math.floor(hue * moods.length)];
};
