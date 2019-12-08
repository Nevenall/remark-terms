var unified = require('unified')
var markdown = require('remark-parse')
var remark2rehype = require('remark-rehype')
var html = require('rehype-stringify')
var report = require('vfile-reporter')
var vfile = require('to-vfile')


var terms = require('./src/index')

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

// let str = `{I am a {{differently}} nested {{term}}}`
let str = `{this special term needs to \\{\\{preserve\\}\\} curly braces}`

// console.log(str)


processor.process(vfile.readSync('test.md'), function (err, file) {
   console.error(report(err || file))
   console.log(String(file))
})

