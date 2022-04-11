import { argv } from 'process'
import ImageEditor from './ImageEditor.mjs'

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
