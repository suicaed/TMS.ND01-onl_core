const { argv } = require('process')
const ImageEditor = require('./ImageEditor')

const [resizeHeight, resizeWidth] = argv[2].split('x')
const inputDirPath = argv[3]
const outputDirPath = argv[4]

const editor = new ImageEditor({
  inputDir: inputDirPath,
  outputDir: outputDirPath,
  editorOptions: {
    height: Number(resizeHeight),
    width: Number(resizeWidth),
  },
})

editor.start()
