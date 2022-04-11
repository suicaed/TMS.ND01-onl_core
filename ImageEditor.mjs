import fsPromises from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

export default class ImageEditor {
  inputDir
  outputDir
  editorOptions = {}
  allowedFileExt = ['.jpg', '.png', '.gif']

  constructor({
    inputDir,
    outputDir,
    editorOptions: { height = 100, width = 100 },
  }) {
    this.inputDir = inputDir
    this.outputDir = outputDir

    this.editorOptions.height = height
    this.editorOptions.width = width
  }

  async #checkDirAccess(dirPath) {
    try {
      await fsPromises.access(dirPath)
    } catch (err) {
      return err
    }
  }

  async #getImages(dirPath) {
    const dirItems = await fsPromises.readdir(dirPath, {
      withFileTypes: true,
    })

    const files = dirItems.filter((dirItem) => dirItem.isFile())

    const images = files.filter((file) =>
      this.allowedFileExt.includes(path.extname(file.name))
    )

    return images
  }

  async start() {
    const inputCheckError = await this.#checkDirAccess(this.inputDir)
    if (inputCheckError) {
      console.error('Cannot find input directory', inputCheckError)
      return
    }

    const outputCheckError = await this.#checkDirAccess(this.outputDir)
    if (outputCheckError) {
      try {
        await fsPromises.mkdir(this.outputDir)
        console.info('Created output directory..')
      } catch (err) {
        console.error('Cannot create output directory', err)
        return
      }
    }

    const existingImages = await this.#getImages(this.outputDir)
    for (const image of existingImages) {
      try {
        const imgPath = path.resolve(this.outputDir, image.name)
        await fsPromises.unlink(imgPath)
      } catch (err) {
        console.error('Error while removing file', err)
      }
    }

    const images = await this.#getImages(this.inputDir)
    for (const image of images) {
      const imgPath = path.resolve(this.inputDir, image.name)
      await sharp(imgPath)
        .resize(this.editorOptions.width, this.editorOptions.height)
        .toFile(path.resolve(this.outputDir, image.name))
    }
  }
}
