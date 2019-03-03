# remark-terms

This [remark] plugin parses customizable markdown for indicating special terms and phrases. 

## Default Syntax

Special terms are marked with 1 or 2 curly braces `{}`. 

```markdown
{term one}
{{term two}}
```

results in:

```html
<span class="term-1">term one</span>
<span class="term-2">term two</span>
```

Terms will be parsed in most places, including headers: `# Header with a {term}` renders as `<h1>Header with a <span class="term-1">term</span></h1>`

Nested terms will also be parsed: `{I am a special phrase with a {{nested}} term.}` renders as `<p><span class="term-1">I am a special phrase with a <span class="term-2">nested</span> term.</span></p>`

## Installation

```bash
npm install remark-terms
```

## Usage

Dependencies:

```javascript
const unified = require('unified')
const remarkParse = require('remark-parse')
const remarkTerms = require('remark-terms')
const stringify = require('rehype-stringify')
const remark2rehype = require('remark-rehype')
```

Usage:

```javascript
unified()
  .use(remarkParse)
  .use(remarkTerms)
  .use(remark2rehype)
  .use(stringify)
```

## Options

Options can be supplied to `remark-terms` as an `[]` of `Configurations`:

```javascript
var processor = unified()
   .use(markdown)
   .use(terms, [{
      open: '{',
      close: '}',
      element: 'span',
      class: 'term-1'
   }, {
      open: '{{',
      close: '}}',
      element: 'span',
      class: 'term-2'
   }])
   .use(remark2rehype)
   .use(html)
```

### `Configurations`

Configures a particular special term. 

#### `open`

*Required*

A string that marks the start of a term. 

#### `close`

*Required*

A string that marks the end of a special term.

#### `element`

*Optional, default is `span`*

The name of an html element as a string. This can be anything, but a [flow content] will probably work the best.

#### `class`

*Optional, default is none*

The optional name of a class to place on the element.

## License

[MIT][license] © [Dan Behlings][nevenall]

<!-- Definitions -->

[license]: https://github.com/Nevenall/remark-terms/blob/master/LICENSE

[nevenall]: https://github.com/nevenall

[npm]: https://www.npmjs.com/package/remark-terms

[remark]: https://github.com/remarkjs/remark

[flow content]: https://www.w3.org/TR/2011/WD-html5-20110525/content-models.html#flow-content-0