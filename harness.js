var unified = require('unified')
var markdown = require('remark-parse')
var remark2rehype = require('remark-rehype')
var html = require('rehype-stringify')
var report = require('vfile-reporter')


var terms = require('./src/index')


var processor = unified()
   .use(markdown)
   .use(terms, {
      classes: {
         doubleSlash: "game-term"
      }
   })
   .use(remark2rehype)
   .use(html)



processor.process("# totally a header with //doubleslash// and /singleslash/", function(err, file) {
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