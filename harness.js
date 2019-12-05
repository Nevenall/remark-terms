var unified = require('unified')
var markdown = require('remark-parse')
var remark2rehype = require('remark-rehype')
var html = require('rehype-stringify')
var report = require('vfile-reporter')


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
   .use(markdown)
   .use(terms)
   .use(remark2rehype)
   .use(html)


let text = `
# header with special {term} inside

also we want to:

- {{term2}} should be term2
- {term1}{{followed by term2}}
- {{term2 also}} more stuff!
- {I am a {{nested}} term to see what happens}
- {{I am a differently nested {term}}}
- {{I am a thirdly {nested} term}}

But also {we want to see if we can do a phrase that transends a 
new line?}

`


processor.process(text, function(err, file) {
   console.error(report(err || file))
   console.log(String(file))
})




// processor.process("//", function(err, file) {
//    console.error(report(err || file))
//    console.log(String(file))
// })

// processor.process("////", function(err, file) {
//    console.error(report(err || file))
//    console.log(String(file))
// })

// processor.process("{}", function(err, file) {
//    console.error(report(err || file))
//    console.log(String(file))
// })

// processor.process("{{}}", function(err, file) {
//    console.error(report(err || file))
//    console.log(String(file))
// })


// processor.process(`{term phrase with
//     a new line}`, function(err, file) {
//    console.error(report(err || file))
//    console.log(String(file))
// })

// processor.process(`/term phrase with
//    a new line/`, function(err, file) {
//    console.error(report(err || file))
//    console.log(String(file))
// })



// processor.process("//term/", function(err, file) {
//    console.error(report(err || file))
//    console.log(String(file))
// })

// processor.process("/term//", function(err, file) {
//    console.error(report(err || file))
//    console.log(String(file))
// })

processor.process("{/term/}", function(err, file) {
   console.error(report(err || file))
   console.log(String(file))
})

processor.process("/{term}/", function(err, file) {
   console.error(report(err || file))
   console.log(String(file))
})