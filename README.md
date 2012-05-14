# Peek-A-Boo

Peek-A-Boo is a jQuery plugin to show and hide captions over another element
upon hover.

- jQuery support: 1.4+

### Documentation

Peek-A-Boo uses the following settings:

* `caption` - A string to use as the selector for finding captions, default
`.peekaboo`
* `delay` - A number representing the number of milliseconds before hiding a
caption after mouseover, default `500`
* `padding` - A string or number representing the amount of padding to add to
the caption and its overlay, default `0`
* `opacity` - A number indicating the opacity of the overlay, default `0.4`
* `speedOut` - A string or number determining the speed at which the overlay
will hide, default `normal`
* `speedOver` - A string or number determining the speed at which the overlay
will appear, default 'fast'
* `wrapperClass` - A string to use as the class name for the overlay, default
`peekaboo-wrapper`

### Usage

`.peekaboo()`

Load up Peek-A-Boo using the default settings.

`.peekaboo(selector)`

* `selector` - A string to use as the selector for finding captions.

`.peekaboo(settings)`

* `settings` - A map of options (documented above) to pass to the function.

### Examples

For examples, see https://github.com/dirn/Peek-A-Boo

### Contributing to Peek-A-Boo

Contributions and pull requests are welcome and encouraged. Please follow these
guidelines when submitting changes:

1. Make all changes to the CoffeeScript file. Do **not** change the JavaScript
directly.
2. Use `npm install -d` to install the correct dependencies.
3. Use `cake build` or `cake watch` to generate the JavaScript file and
minified version.
4. Do **not** change the VERSION file.
5. Submit the pull request through GitHub.
