# My mood
[![](https://flat.badgen.net/badge/install%20on/Android?icon=googleplay&color=green)](https://play.google.com/store/apps/details?id=me.gmartigny.mymood)

Minimal random emotion app

Created to make use of [Hexbot](https://noopschallenge.com/challenges/hexbot).

## How it works

 1. Listen for shaking using accelerometer
 2. Fetch a color from the Noop
 3. Parse color into HSL
 4. Use hue to select emotion according to an [emotion wheel](https://user-images.githubusercontent.com/2543511/59355627-9be18580-8d27-11e9-84f2-3bd17707ff1d.png)
 5. Use saturation for intensity according to a [random study](https://www.aclweb.org/anthology/R15-1071)
 6. Display the result

## License

[MIT](license)
