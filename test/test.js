var assert = require('assert')
var unified = require('unified')
var markdown = require('remark-parse')
var remark2rehype = require('remark-rehype')
var html = require('rehype-stringify')

var terms = require('../src/index')


function runTests(tests, processor) {
   tests.forEach(test => {
      if (test.ignore) return

      it(`(${test.testing}) ${test.md}`, () => {
         processor.process(test.md, (err, file) => {
            if (err) assert.fail(err)
            assert.equal(file.toString(), test.expected)
         })
      })


   })
}



describe('basic useage', () => {

   let processor = unified()
      .use(markdown, { commonmark: true })
      .use(terms)
      .use(remark2rehype)
      .use(html)

   let tests = [{
      testing: 'title with terms',
      md: `# Title with {term} with some {{text}} after.`,
      expected: `<h1>Title with <span class="term-1">term</span> with some <span class="term-2">text</span> after.</h1>`
   },
   {
      testing: 'empty terms',
      md: `{}{{}}`,
      expected: `<p><span class="term-1"></span><span class="term-2"></span></p>`
   },
   {
      testing: 'spaces are preserved',
      md: `{ term with extra  spaces}`,
      expected: `<p><span class="term-1"> term with extra  spaces</span></p>`
   },
   {
      testing: 'newlines are preserved',
      md: `{term phrase with 
         a new line}`,
      expected: `<p><span class="term-1">term phrase with\na new line</span></p>`
   },
   {
      testing: 'escaped term',
      md: `\{Escaped term\}`,
      expected: `<p>Escaped term</p>`
   }
   ]

   runTests(tests, processor)
})


describe('nested terms', () => {

   let processor = unified()
      .use(markdown)
      .use(terms)
      .use(remark2rehype)
      .use(html)


   let tests = [
      {
         ignore: true,
         testing: 'term 1 with nested term 2',
         md: `{term phrase with a {{nested term}}}`,
         expected: `<p><span class="term-1">term phrase with a <span class="term-2">nested term</span></span></p>`
      },
   ]

   runTests(tests, processor)
})

describe('customized terms', function () {

   let processor = unified()
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


   let tests = [
      {
         ignore: true,
         testing: 'dev',
         md: `{term phrase with a {{nested term}}}`,
         expected: `<p><span class="term-1">term phrase with a <span class="term-2">nested term</span></span></p>`
      },
   ]

   runTests(tests, processor)
})