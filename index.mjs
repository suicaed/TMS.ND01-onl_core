import { fileURLToPath } from 'url'
import os from 'os'
import { dirname, resolve } from 'path'
import fsPromises from 'fs/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

task1()

async function task1() {
  const { username } = os.userInfo()
  const cpus = os.cpus()
  const cpuCoreCount = cpus.length
  const cpusSpeed = cpus.map((cpu) => `${cpu.speed} MHz`).join(', ')
  const freeMemory = Math.floor(os.freemem() / 1000 / 1000)
  const osVersion = `${os.platform()} ${os.release()}`

  const fileContent = `username: ${username}${os.EOL}CPU core count: ${cpuCoreCount}${os.EOL}free memory: ${freeMemory} MB${os.EOL}cpus speed: ${cpusSpeed}${os.EOL}OS version: ${osVersion}`

  const outputPath = resolve(__dirname, 'output')

  try {
    await fsPromises.stat(outputPath)
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fsPromises.mkdir(outputPath)
    }
  }

  try {
    await fsPromises.writeFile(`${outputPath}/output.txt`, fileContent)
  } catch (err) {
    console.error(err)
  }
}
