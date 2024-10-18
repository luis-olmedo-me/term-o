function evaluarCodigo(code) {
  const queso = 2
  const leche = 3
  const queso2 = 5
  const queso3 = () => {
    console.log('test')
    return 54
  }

  const restrictedEval = new Function(
    'queso',
    'leche',
    'queso2',
    'queso3',
    `"use strict"; return (function() { ${code} })();`
  )

  try {
    return restrictedEval(queso, leche, queso2, queso3)
  } catch (error) {
    return `Error: ${error.message}`
  }
}

// const safeEval = event => {
//   const code = event.data.code

//   const storage = props => {
//     return new Promise(resolve => {
//       const handleSandboxCommand = event => {
//         if (event.data?.type !== 'sandbox-command-return') return

//         window.removeEventListener('message', handleSandboxCommand)
//         resolve(event.data.updates)
//       }

//       window.addEventListener('message', handleSandboxCommand)

//       event.source.window.postMessage(
//         { type: 'sandbox-command', data: { props, name: 'storage' } },
//         event.origin
//       )
//     })
//   }

// const update = (...args) => {
//   event.source.window.postMessage(
//     { type: 'sandbox-command-update', data: { updates: args } },
//     event.origin
//   )
// }

//   const restrictedEval = new Function(
//     'update',
//     'storage',
//     `
//         "use strict";
//         return (function() {
//             ${code}
//         })();
//     `
//   )

//   try {
//     return restrictedEval(storage, update)
//   } catch (error) {
//     return `Error: ${error.message}`
//   }
// }

window.addEventListener('message', async function(event) {
  if (event.data?.type !== 'sandbox-code') return

  event.source.window.postMessage(
    { type: 'sandbox-command-finish', data: evaluarCodigo('return queso3();') },
    event.origin
  )
})
