import { existsSync } from 'node:fs'
import { spawn, spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import http from 'node:http'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '..')
const rendererUrl = 'http://127.0.0.1:5173'
const packagedElectronBinary = join(projectRoot, 'release', 'linux-unpacked', 'hafta13')

if (!existsSync(packagedElectronBinary)) {
  const packageResult = spawnSync('pnpm', ['package'], {
    cwd: projectRoot,
    stdio: 'inherit',
    env: process.env,
  })

  if (packageResult.status !== 0) {
    process.exit(packageResult.status ?? 1)
  }
}

const viteProcess = spawn('pnpm', ['exec', 'vite', '--host', '127.0.0.1', '--port', '5173'], {
  stdio: 'inherit',
  env: process.env,
})

let electronProcess = null

const waitForRenderer = async () => {
  while (true) {
    const ready = await new Promise((resolve) => {
      const request = http.get(rendererUrl, () => {
        request.destroy()
        resolve(true)
      })

      request.on('error', () => resolve(false))
    })

    if (ready) {
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 300))
  }
}

const stopAll = () => {
  electronProcess?.kill('SIGTERM')
  viteProcess.kill('SIGTERM')
}

process.on('SIGINT', stopAll)
process.on('SIGTERM', stopAll)
process.on('exit', stopAll)

await waitForRenderer()

electronProcess = spawn(packagedElectronBinary, [], {
  stdio: 'inherit',
  env: {
    ...process.env,
    ELECTRON_RENDERER_URL: rendererUrl,
  },
})

electronProcess.on('exit', (code) => {
  viteProcess.kill('SIGTERM')
  process.exit(code ?? 0)
})