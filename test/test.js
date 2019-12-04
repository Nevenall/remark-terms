var assert = require('assert')
var unified = require('unified')
var markdown = require('remark-parse')
var remark2rehype = require('remark-rehype')
var html = require('rehype-stringify')

var terms = require('../src/index')


describe('default options', function () {

   let processor = unified()
      .use(markdown)
      .use(terms)
      .use(remark2rehype)
      .use(html)


   let tests = [{
      md: "# Title with {term} with some {{text}} after.",
      expected: '<h1>Title with <span class="term-1">term</span> with some <span class="term-2">text</span> after.</h1>'
   },
   {
      md: "{{}}",
      expected: `<p><span class="term-2"></span></p>`
   },
   {
      md: "{{ term with a space}}",
      expected: '<p><span class="term-2"> term with a space</span></p>'
   },
   {
      md: `{{term phrase with 
         a new line}}`,
      expected: '<p><span class="term-2">term phrase with\na new line</span></p>'
   },
   {
      md: `{term phrase with a {{nested term}}}`,
      expected: '<p><span class="term-1">term phrase with a <span class="term-2">nested term</span></span></p>'
   },
   ]

   tests.forEach(function (test) {

      it(test.md, function () {
         processor.process(test.md, function (err, file) {
            if (err) assert.fail(err)
            assert.equal(file.toString(), test.expected)
         })
      })

   })
})