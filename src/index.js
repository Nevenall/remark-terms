function plugin(options) {
   options = options || [{
      name: 'term_1',
      open: '{',
      close: '}',
      element: 'span',
      class: 'term-1'
   }, {
      name: 'term_2',
      open: '{{',
      close: '}}',
      elemddent: 'span',
      class: 'term-2'
   }]

   // reverse the options in place, so rules declared first get precedence in nesting
   options.reverse()

   const Parser = this.Parser
   const tokenizers = Parser.prototype.inlineTokenizers
   const methods = Parser.prototype.inlineMethods

   var insertPoint = methods.indexOf('text')

   options.forEach((config, idx) => {
      //require: term.open, term.closed
      if (config.open !== undefined && config.open !== null && config.open !== '' && config.close !== undefined && config.close !== null && config.close !== '') {
         // default element 'span', default class 'term'
         // name will be the name of the tokenizer
         let name = config.name || `term_${idx}`

         tokenizers[name] = function (eat, value, silent) {

            if (value.startsWith(config.open)) {
               // Start a small stack-based parser to handle nested terms
               let start = config.open.length
               let index = start
               let closers = [config.close]

               do {
                  // if the next token is the terminal we are looking for, pop it and advance the index
                  if (value.startsWith(closers[0], index)) {
                     let closed = closers.shift()
                     index += closed.length
                  } else {
                     // otherwise if there is a new opener, push it on the stack and advance the index
                     let result = checkForNestedTerms(value, index, options)
                     if (result) {
                        closers.unshift(result.closer)
                        index += result.advance
                     } else {
                        // it's just part of the term, advance
                        ++index
                     }
                  }
               }
               while (closers.length > 0 && index <= value.length)

               // if the stack is empty we've found a complete term
               if (closers.length == 0) {
                  if (silent) return true
                  let term = value.substring(start, index - config.close.length)
                  let toEat = value.substring(0, index)

                  let node = {
                     type: name,
                     data: {
                        hName: config.element || 'span'
                     },
                     children: this.tokenizeInline(term, eat.now())
                  }

                  if (config.class) {
                     node.data.hProperties = {
                        className: config.class
                     }
                  }

                  eat(toEat)(node)
               }
            }
         }

         tokenizers[name].locator = function (value, fromIndex) {
            return value.indexOf(config.open, fromIndex)
         }

         tokenizers[name].notInLink = true

         methods.splice(insertPoint++, 0, name)
      }
   })



   function checkForNestedTerms(str, index, options) {
      for (let i = 0; i < options.length; i++) {
         const term = options[i]
         if (str.startsWith(term.open, index)) {
            return { closer: term.close, advance: term.open.length }
         }
      }
      return null
   }
}

export default plugin
