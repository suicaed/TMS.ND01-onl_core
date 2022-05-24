require('dotenv').config()
const { argv } = require('process')
const ImageEditor = require('./ImageEditor')

const { outputSize, outputDirPath, inputDirPath } = process.env
const [resizeHeight, resizeWidth] = outputSize.split('x')

const editor = new ImageEditor({
  inputDir: inputDirPath,
  outputDir: outputDirPath,
  editorOptions: {
    height: Number(resizeHeight),
    width: Number(resizeWidth),
  },
})

editor.start()
