# remark-terms

This [remark] plugin adds customizable parsing to wrap arbitrary markdown text with an inline element. 

todo - clarify nesting precedence

## Default Syntax

By default, special terms are marked with single or double curly braces: `{}` or `{{}}`. 

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

Nested terms will also be parsed: `{I am a special phrase with {several} nested {{terms}}` renders as `<p><span class="term-1">I am a special phrase with <span class="term-1">several</span> nested <span class="term-2">terms</span></span></p>`

Special term syntax can be escaped in markdown with a backslash (`\`). For example: `{this special term needs to \{preserve\} curly braces}` renders as `<p><span class="term-1">this special term needs to {preserve} curly braces</span></p>`

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

**Specifying custom configurations will override the default behavior. To preserve the default syntax, be sure to include the configurations in the example below.**

Options can be supplied to `remark-terms` as an `[]` of `Configurations`:

```javascript
var processor = unified()
   .use(markdown)
   .use(terms, [{
      name: 'term_1',
      open: '{',
      close: '}',
      element: 'span',
      class: 'term-1'
   }, {
      name: 'term_2',
      open: '{{',
      close: '}}',
      element: 'span',
      class: 'term-2'
   }])
   .use(remark2rehype)
   .use(html)
```


### A `Configuration`

Configures a particular special term. 

#### `name`

*Optional, default is `term_1` and `term_2` or `term_{index of config in the reversed configurations array}`*

A string used as the [remark tokenizer] name and the name of the [MDAST] node. 

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

[mdast]: https://github.com/syntax-tree/mdast#nodes

[remark tokenizer]: https://github.com/remarkjs/remark/tree/master/packages/remark-parse#parserinlinetokenizers