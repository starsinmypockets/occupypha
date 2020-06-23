const csv = require("csv")
const fs = require("fs")
const path = require("path")

const directoryPath = path.join(__dirname, "raw")

fs.readdir(directoryPath, function(err, files) {
  if (err) {
    return console.log("Unable to scan directory: " + err)
  }

  // operate on files in directory
  files.forEach(function(file) {
    try {
      // Do whatever you want to do with the file
      const raw = fs.readFileSync(path.join(__dirname, "raw", file))
      const parsed = JSON.parse(raw)
      const records = parsed.features.map(feature => {
        return feature.properties.street_address
      })
      console.log(records)
    } catch (e) {
      console.log("Failed parsing JSON file", e)
    }
  })
})

// TODO => output as CSV
/* csv */
/*   // Generate 20 records */
/*   .generate({ */
/*     delimiter: "|", */
/*     length: 20 */
/*   }) */
/*   // Parse the records */
/*   .pipe( */
/*     csv.parse({ */
/*       delimiter: "|" */
/*     }) */
/*   ) */
/*   // Transform each value into uppercase */
/*   .pipe( */
/*     csv.transform(function(record) { */
/*       return record.map(function(value) { */
/*         return value.toUpperCase() */
/*       }) */
/*     }) */
/*   ) */
/*   // Convert the object into a stream */
/*   .pipe( */
/*     csv.stringify({ */
/*       quoted: true */
/*     }) */
/*   ) */
/*   // Print the CSV stream to stdout */
/*   .pipe(process.stdout) */
