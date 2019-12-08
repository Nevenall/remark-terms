var unified = require('unified')
var markdown = require('remark-parse')
var remark2rehype = require('remark-rehype')
var html = require('rehype-stringify')
var report = require('vfile-reporter')


var tokenizeWords = require('space-separated-tokens')

var terms = require('./src/index')


// [{
//    open: '{',
//    close: '}',
//    element: 'span',
//    class: 'term-1'
// }, {
//    open: '{{',
//    close: '}}',
//    element: 'span',
//    class: 'term-2'
// }]


var processor = unified()
   .use(markdown, { commonmark: true })
   .use(terms)
   .use(remark2rehype)
   .use(html)





let text = `
# header with special {term} inside

also we want to:

- {{term2}} should be term2
- {term1}{{followed by term2}}
- more stuff and {{term2 also}}
- {I am a {{nested}} term to see what happens}
- {{I am a differently nested {term}}}
- {{I am a thirdly {nested} term}}

But also {we want to see if we can do a phrase that transends a 
new line?}
`
let text3 = `{term1}{{followed by term2}}`

let str = `{I am a {{differently}} nested {{term}}}`
//let str = `one {line} with {two} terms`

console.log(str)


// open , i
// depth 0

// have to do this character by character
// use str.startsWith and an index 
// if we find another opener now, depth ++,
// but we need to track multiple opening and closings
// except, we always know the closer we are looking for because it will match
// the opener. 
// 


let options = [{
   name: 'special_term_1',
   open: '{',
   close: '}',
   element: 'span',
   class: 'term-1'
}, {
   name: 'special_term_2',
   open: '{{',
   close: '}}',
   element: 'span',
   class: 'term-2'
}]

let start = str.indexOf('{') + 1
let index = start
let closers = ['}']

do {
   // if the next token is the terminal we are looking for, pop it
   if (str.startsWith(closers[0], index)) {
      closers.shift()
      // either this is the end we desire
      // or there's more stuff 
   } else {
      // otherwise check for a new opener and push it on the stack
      let result = checkForNestedTerms(str, index, options)
      if (result) {
         closers.unshift(result.closer)
         index += result.advance
      } else {
         // it's just part of the term
         ++index
      }

   }
}
while (closers.length > 0 && index <= str.length)


function checkForNestedTerms(str, index, options) {
   options.forEach(t => {
      if (str.startsWith(t.open, index)) {
         return { closer: t.close, advance: t.open.length }
      }
   })
   return null
}

console.log(index)
console.log(str.substring(start, index )) // minus the length of the closer
// let open = str.indexOf('{')

// let close = str.indexOf('}', open)


// // if there is another opener
// let escapedOpen = str.indexOf('{', open) // config.open
// let nestedOpen = str.indexOf('{{', open) // search once for each other term opener, if any of then are < close, we may have an issue

// if (nestedOpen < close) {
//    // look for the closer for the nested term
//    let nestedClose = str.indexOf('}}', nestedOpen)

//    if (nestedClose > -1) {
//       // find the first closer after the end of the nested term
//       close = str.indexOf('}', nestedClose + 2)  // closing term.length
//    }

// } else if (escapedOpen < close) {
//    let escapedClose = str.indexOf('}', nestedOpen)
//    if (escapedClose > -1) {
//       close = str.indexOf('}', escapedClose + 1)// closing term.length
//    }

// }

// console.log(str.substring(open + 1, close))

// if escaped and nested are not -1 and equal, we got a nested 
// if just escaped is greater then -1 then it's an escape sequence
// if nested, look for 












// processor.process(text2, function (err, file) {
//    console.error(report(err || file))
//    console.log(String(file))
// })


