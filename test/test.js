var assert = require('assert')
var unified = require('unified')
var markdown = require('remark-parse')
var remark2rehype = require('remark-rehype')
var html = require('rehype-stringify')

var terms = require('../src/index')


function runTests(tests, processor) {
   tests.forEach(test => {
      if (test.ignore) return

      it(`(${test.testing}) ${test.md}`, function () {
         processor.process(test.md, function (err, file) {
            if (err) assert.fail(err)
            assert.equal(file.toString(), test.expected)
         })
      })

   })
}



describe('basic usage', function () {

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
      md: `\\{Escaped term\\}`,
      expected: `<p>{Escaped term}</p>`
   }
   ]

   runTests(tests, processor)
})


describe('nested terms', function () {

   let processor = unified()
      .use(markdown, { commonmark: true })
      .use(terms)
      .use(remark2rehype)
      .use(html)


   let tests = [
      {
         ignore: false,
         testing: 'term 1 with interior nested term 2',
         md: `{term phrase with a {{nested term}} inside it}`,
         expected: `<p><span class="term-1">term phrase with a <span class="term-2">nested term</span> inside it</span></p>`
      },
      {
         ignore: false,
         testing: 'term 2 with interior nested term 1',
         md: `{{term phrase with a {nested term} inside it}}`,
         expected: `<p><span class="term-2">term phrase with a <span class="term-1">nested term</span> inside it</span></p>`
      },
      {
         ignore: false,
         testing: 'term 1 with nested term 2 at end',
         md: `{term phrase with a {{nested term}}}`,
         expected: `<p><span class="term-1">term phrase with a <span class="term-2">nested term</span></span></p>`
      },
      {
         ignore: true,
         testing: 'term 1 with two nested term 2s',
         md: `{term 1 with {{TWO}} nested {{term2s}}}`,
         expected: `<p><span class="term-1">term phrase with a <span class="term-2">nested term</span></span></p>`
      },
      {
         ignore: false,
         testing: 'term 2 with nested term 1 at end',
         md: `{{term phrase with a {nested term}}}`,
         expected: `<p><span class="term-2">term phrase with a <span class="term-1">nested term</span></span></p>`
      },
      {
         ignore: true,
         testing: 'term 1 with escaped braces and nested term 2 at end',
         md: `{term 1 with {escaped braces} and a {{nested term2}}}`,
         expected: `<p><span class="term-2">term phrase with a <span class="term-1">nested term</span></span></p>`
      },
   ]

   runTests(tests, processor)
})

describe.skip('customized terms', function () {

   let processor = unified()
      .use(markdown, { commonmark: true })
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
         ignore: false,
         testing: 'dev',
         md: `{term phrase with a {{nested term}}}`,
         expected: `<p><span class="term-1">term phrase with a <span class="term-2">nested term</span></span></p>`
      },
   ]

   runTests(tests, processor)
})