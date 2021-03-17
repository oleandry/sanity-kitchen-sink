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
  fs.appendFileSync('ready-for-import.ndjson', docAsNewLineJson, { flag: 'a+' })
}

function moviesByTitles(titles) {
  return client.fetch('*[_type == "company" && title in $titles]', { titles: titles })
}

fs.createReadStream('./data/Caphub Company.csv')
  .pipe(csv())
  .on('data', data => {

    let company = {};
    const keys = Object.getOwnPropertyNames(data)
    .forEach(key => {
      company[key.trim().replace(/ /g,'')] = data[key].trim();
    });

    const document = {
      ...company,
      Antallansatte: +company.Antallansatte,
      _type: 'organisasjon',
      _id: company.OrgNumber
    };
    
    appendToFile(document);
  });