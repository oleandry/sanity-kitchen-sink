console.log("aaaaaaaaaaaaaaaaaa")


const csv = require('csv-parser')
const fs = require('fs')
const sanityClient = require('@sanity/client')
const client = sanityClient({
  projectId: 'my-project-id',
  dataset: 'my-dataset',
  useCdn: false
})

function appendToFile(document) {
  const docAsNewLineJson = `${JSON.stringify(document)}\n`
  fs.appendFileSync('ready-for-import.ndjson', docAsNewLineJson, {flag: 'a+'})
}

function moviesByTitles(titles) {
  return client.fetch('*[_type == "movie" && title in $titles]', {titles: titles})
}

fs.createReadStream('./data/Caphub Company.csv')
  .pipe(csv())
  .on('data', data => {
    // Assuming movie titles are semi-colon separated
    const titles = data.MOVIES.split(';')
    // Fetch movies with these titles 
    moviesByTitles(titles).then(movies => {
      // Build a Sanity document which matches your Studio type
      const document = {
        _type: 'studio',
        name: data.NAME,
        webPage: data.WEBPAGE,
        movies: movies.map(movie => {
          return {
            _ref: movie._id,
            _type: 'reference'
          }
        })
      }
      // Append the document to a file for later import
      appendToFile(document)  
    })
  })