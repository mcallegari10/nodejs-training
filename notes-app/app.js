const chalk = require('chalk')
const yargs = require('yargs')

const notes = require('./notes')

yargs.command({
  command: 'add',
  describe: 'Adds a newnote',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => notes.addNote(argv.title, argv.body)
})

yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => notes.removeNote(argv.title)
})

yargs.command({
  command: 'list',
  describe: 'List notes',
  handler: () => notes.listNotes()
})

yargs.command({
  command: 'read',
  describe: 'Reads notes',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => notes.readNote(argv.title)
})

yargs.parse()
