# ANTCollator
__*A tool to automatically collate MEI-encoded musical texts and produce a critical edition.*__

## About
The tool compares different MEI documents and generates a single MEI document, where the differences found are stored as critical entries (`<app>` elements) of the critical apparatus, embedded in the score of the MEI document used as _base text_ of the collation.
It is possible to add to the final MEI document metadata like title and composer of the musical work, editor of the edition, etc. and create another more scholar-oriented critical apparatus.
  
For the moment the collating algorithm is pretty trivial. The software compares the base text against an other musical text at the time and measure by measure. If the two measures differ, the measure of the latter is added to the critical apparatus entry associated to that measure number.

The tool is developed within the ERC funded [European Ars Nova project](https://www.europeanarsnova.eu/). 

## Install & Run
Download and install [NodeJS](https://nodejs.org/).

Run `npm i`

Run `npm run build`

Go inside 'build' folder, in the software's main directory.

Open `index.html` file in a browser that allows cross-origin requests.

## Use

### Add files
### Edit a scholar-oriented critical apparatus
### Add metadata
### Save the files
