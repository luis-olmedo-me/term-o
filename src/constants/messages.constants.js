export const messages = [
  {
    original: /^Error: No tab with id: \d+\.$/g,
    new: 'No tab id found.'
  },
  {
    original: /^Could not establish connection. Receiving end does not exist\./,
    new: 'Term-o cannot establish a connection to the tab. Please refresh the page or ensure it is open. Note that Term-o cannot execute commands on extension or browser built-in pages.'
  },
  {
    original:
      /^A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received/,
    new: 'Term-o cannot establish a connection to the tab. Please refresh the page or ensure it is open.'
  }
]
