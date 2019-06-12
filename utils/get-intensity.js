const intensity = [
    "a little", "almost", "slightly", "somewhat", "fairly", "pretty", "quite",
    "", "perfectly", "awfully", "very", "highly", "completely", "absolutely", "extremely",
];

export default (saturation) => {
    return intensity[Math.floor(saturation * intensity.length)];
}
