# remark-terms

This [remark][remark] plugin parses custom Markdown syntax to render words or phrases surrounded by span elements with custom classes.

## Syntax

Terms can be marked with forward slashes or curly braces. 

```markdown
/term type 1/
//term type 2//
{term type 3}
{{term type 4}}
```

This would compile to the following HTML:

```html
<span class="term-1">term type 1</span>
<span class="term-2">term type 2</span>
<span class="term-3">term type 3</span>
<span class="term-4">term type 4</span>
```

Terms can be places in most text including headers:

> `# Header with a /term/` renders as `<h1>Header with a <span class="term-1">term</span></h1>`

## Installation

[npm][npm]:

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

### options.classes

Specify custom classes for terms.

**example**

```javascript
.use(remarkTerms, { classes: {
  singleSlash: "custom-term",
  doubleSlash: "otherclass",
  singleBrace: "game-term",
  doubleBrace: "special-term"
} })
```

## License

[MIT][license] © [Dan Behlings][nevenall]

<!-- Definitions -->

[license]: https://github.com/Nevenall/remark-terms/blob/master/LICENSE

[nevenall]: https://github.com/nevenall

[npm]: https://www.npmjs.com/package/remark-terms

[remark]: https://github.com/remarkjs/remark