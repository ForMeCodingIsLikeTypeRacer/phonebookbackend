const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
  }
  
const password = process.argv[2]

const url =
  `mongodb+srv://tomkwon:${password}@phonebook.l8wctjq.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String
})

const PhonebookEntry = mongoose.model('PhonebookEntry', phonebookSchema)

module.exports = async function connectToDatabase() {
  await mongoose.connect('mongodb://localhost/phonebook', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  return PhonebookEntry
}