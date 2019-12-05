function plugin(options) {
   options = options || [{
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

   const Parser = this.Parser
   const tokenizers = Parser.prototype.inlineTokenizers
   const methods = Parser.prototype.inlineMethods

   var insertPoint = methods.indexOf('text')

   options.reverse().forEach((config, idx) => {
      //require: term.open, term.closed
      if (config.open !== undefined && config.open !== null && config.open !== '' && config.close !== undefined && config.close !== null && config.close !== '') {
         // default element 'span', default class 'term'
         // name will be the name of the tokenizer
         let name = config.name || `term_${idx}`

         tokenizers[name] = function(eat, value, silent) {
            if (value.startsWith(config.open)) {

            // todo - how can we ensure that nested doubles works? 
            // ensure that the close we picked doesn't match any other close. 
               let closeIndex = value.indexOf(config.close, config.open.length)
               
               // alternately we can

               if (closeIndex !== -1) {
                  if (silent) return true

                  let term = value.substring(config.open.length, closeIndex)
                  let toEat = value.substring(0, closeIndex + config.close.length)

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

         tokenizers[name].locator = function(value, fromIndex) {
            return value.indexOf(config.open, fromIndex)
         }

         tokenizers[name].notInLink = true

         methods.splice(insertPoint++, 0, name)
      }
   })

}

module.exports = plugin