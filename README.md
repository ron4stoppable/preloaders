# SVG Preloaders

This repo contains a small collection of standard preloaders in svg. Do take a peek inside the JS & CSS file.

View them all [here](https://ron4stoppable.github.io/preloaders/)

### The backstory

While implementing a toggle class feature for some project, it struck me that rather than using JS, I can offload the toggle styling directly to CSS render by using `input` element of **checkbox** type which maintains state and has `:checked` pseudo class already. Depending on the checkbox state sibling elements can be applied styles.
```
#checkbox{
  ... /* some style properties */
}
#checkbox:checked{
  ... /* some other style properties */
}
```
To make it attractive I directly added image to `input::before` pseudo element (and not on label) without giving it a second thought, and all was working file, unless we had to test it on Firefox.

The image added to `input::before` was not visible in Firefox, after much tweaking, going through stackoverflow & blog articles, I finally discovered that `input` does not have `::before` or `::after` in Firefox because `input` is not a container element as defined in the [specification](https://www.w3.org/TR/CSS21/generate.html#before-after-content), Chrome supports because it does not follow the specification (or bug?).

I did added the "_feature_" to this repo since it works in Chrome :)
