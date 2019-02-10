const singleBraceRegex = /\{(.+?)\}/s
const doubleBraceRegex = /\{\{(.+?)\}\}/s
const singleSlashRegex = /\/(?!\/)(.+?)\//s
const doubleSlashRegex = /\/\/(.+?)\/\//s

function plugin(options) {

   options = options || {
      classes: {
         singleSlash: 'term-1',
         doubleSlash: 'term-2',
         singleBrace: 'term-3',
         doubleBrace: 'term-4'
      }
   }

   // console.log("", options)

   // restructure as braces and slashes then we can fiddle with the
   // the correct 
   function singleBrace(eat, value, silent) {
      var m = singleBraceRegex.exec(value)
      if (m) {
         if (silent) {
            return true
         }

         const [match, term] = m

         // need to make the values escapable, 
         // need to make empty terms not render
         // or terms with 

         var text = value.substring(0, m.index)
         eat(text)({
            type: 'text',
            value: text
         })

         return eat(match)({
            type: 'single-brace',
            children: [{
               type: 'text',
               value: term
            }],
            data: {
               hName: 'span',
               hProperties: {
                  className: [options.classes.singleBrace || 'term-3']
               }
            }
         })
      }
   }

   function doubleBrace(eat, value, silent) {
      var m = doubleBraceRegex.exec(value)
      if (m) {
         if (silent) {
            return true
         }

         const [match, term] = m

         // need to make the values escapable, 
         // need to make empty terms not render
         // or terms with 

         var text = value.substring(0, m.index)
         eat(text)({
            type: 'text',
            value: text
         })

         return eat(match)({
            type: 'double-brace',
            children: [{
               type: 'text',
               value: term
            }],
            data: {
               hName: 'span',
               hProperties: {
                  className: [options.classes.doubleBrace || 'term-4']
               }
            }
         })
      }
   }

   function singleSlash(eat, value, silent) {
      var m = singleSlashRegex.exec(value)
      if (m) {
         if (silent) {
            return true
         }

         const [match, term] = m

         // need to make the values escapable, 
         // need to make empty terms not render
         // or terms with 

         var text = value.substring(0, m.index)
         eat(text)({
            type: 'text',
            value: text
         })

         return eat(match)({
            type: 'single-slash',
            children: [{
               type: 'text',
               value: term
            }],
            data: {
               hName: 'span',
               hProperties: {
                  className: [options.classes.singleSlash || 'term-1']
               }
            }
         })
      }
   }

   function doubleSlash(eat, value, silent) {
      var m = doubleSlashRegex.exec(value)
      if (m) {
         if (silent) {
            return true
         }

         const [match, term] = m

         // need to make the values escapable, 
         // need to make empty terms not render
         // or terms with 

         var text = value.substring(0, m.index)
         eat(text)({
            type: 'text',
            value: text
         })

         return eat(match)({
            type: 'double-slash',
            children: [{
               type: 'text',
               value: term
            }],
            data: {
               hName: 'span',
               hProperties: {
                  className: [options.classes.doubleSlash || 'term-2']
               }
            }
         })
      }
   }


   singleBrace.notInLink = true
   doubleBrace.notInLink = true
   singleSlash.notInLink = true
   doubleSlash.notInLink = true

   singleBrace.locator = function locateTerms(value, fromIndex) {
      return value.indexOf('{', fromIndex)
   }

   doubleBrace.locator = function locateTerms(value, fromIndex) {
      return value.indexOf('{{', fromIndex)
   }

   singleSlash.locator = function locateTerms(value, fromIndex) {
      return value.indexOf('/', fromIndex)
   }

   doubleSlash.locator = function locateTerms(value, fromIndex) {
      return value.indexOf('//', fromIndex)
   }

   const Parser = this.Parser

   // Inject the tokenizer
   const tokenizers = Parser.prototype.inlineTokenizers
   const methods = Parser.prototype.inlineMethods

   tokenizers.singleBrace = singleBrace
   tokenizers.doubleBrace = doubleBrace
   tokenizers.singleSlash = singleSlash
   tokenizers.doubleSlash = doubleSlash

   methods.splice(methods.indexOf('text'), 0, 'doubleSlash')
   methods.splice(methods.indexOf('text'), 0, 'doubleBrace')
   methods.splice(methods.indexOf('text'), 0, 'singleSlash')
   methods.splice(methods.indexOf('text'), 0, 'singleBrace')

}

module.exports = plugin