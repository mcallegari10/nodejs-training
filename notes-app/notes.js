const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNote = notes.find(note => note.title === title)

  if (!duplicateNote) {
    notes.push({ title, body })
    saveNotes(notes)
  }
}

const removeNote = (title) => {
  const notes = loadNotes()
  const filtered = notes.filter(note => note.title != title)
  if (notes.length > filtered.length) {
    console.log(chalk.green.inverse('Note removed!'))
    saveNotes(filtered)
  } else {
    console.log(chalk.red.inverse('Note not found!'))
  }
}

const listNotes = () => {
  console.log(chalk.blue('Your notes'))
  const notes = loadNotes()
  notes.forEach(note => {
    console.log(note.title)
  })
}

const readNote = (title) => {
  const notes = loadNotes()
  const noteFound = notes.find(note => note.title === title)
  
  if (noteFound) {
    console.log(chalk.blue.inverse(noteFound.title))
    console.log(noteFound.body)
  } else {
    console.log(chalk.red.inverse('Note not found'))
  }
}

const loadNotes = () => {
  try {
    const data = fs.readFileSync('notes.json').toString()
    return JSON.parse(data)
  } catch (e) {
    return []
  }
}

const saveNotes = (notes) => {
  fs.writeFileSync('notes.json', JSON.stringify(notes))
}

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote
}
