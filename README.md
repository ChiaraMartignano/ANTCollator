# ANTCollator ![ANT-Collator-logo](https://user-images.githubusercontent.com/23243170/110352236-fc554200-8035-11eb-994d-06b37819de12.png)
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
Please notice that currently the software is only in Italian. Support for i18n will be implemented as soon as possible.

### Add files
![choose-files](https://user-images.githubusercontent.com/23243170/110351933-9d8fc880-8035-11eb-8c80-aa4de1b8e0c1.JPG)
**Step 1: load files**
* Select the MEI document that will be used as base text of the collation.
* Select the the MEI documents of the texts to collate.
* Load texts in the tool, by clicking on the button.

**Step2: collate files**
* Start collation process, by clicking on the button.

### Add metadata
![add-metadata](https://user-images.githubusercontent.com/23243170/110351930-9cf73200-8035-11eb-8b74-f75aa1be5356.JPG)
**Step 3: add metadata**
* Insert the metadata in the corresponding fields.

### Edit a scholar-oriented critical apparatus
![add-apparatus](https://user-images.githubusercontent.com/23243170/110351929-9cf73200-8035-11eb-9dac-b6e34a9cd761.JPG)
**Step 4: add custom critical apparatus entries**
* Click on the button to add a new note.
* Enter the measure number to which the apparatus entry is related.
* Edit the text of the apparatus entry in the editor below. You can use the special SMuFL characters keyboard.

### Save the files
![save-files](https://user-images.githubusercontent.com/23243170/110351926-9c5e9b80-8035-11eb-9d7c-83b75f1bf10d.JPG)
**Step 5: save resulting files**
* Click on the 'copy to clipboard' icon next to the file name.
* Paste the file in the editor you prefer, then save file.
