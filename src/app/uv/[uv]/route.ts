import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(_req: NextRequest, { params }: { params: { uv: string } }) {
  const requestedFile = params.uv
  if (requestedFile === 'uv.config.js' || requestedFile === 'sw.js') {
    const filePath = path.join(process.cwd(), `/src/lib/uv/${requestedFile}`)
    if (fs.existsSync(filePath)) {
      const file = fs.readFileSync(filePath)
      return new Response(file, {
        headers: {
          'Content-Type': 'application/javascript'
        }
      })
    } else {
      return notFound()
    }
  } else {
    const nodeModulesPath = path.join(process.cwd(), `node_modules/@titaniumnetwork-dev/ultraviolet/dist/${requestedFile}`)
    if (fs.existsSync(nodeModulesPath)) {
      const file = fs.readFileSync(nodeModulesPath)
      return new Response(file, {
        headers: {
          'Content-Type': 'application/javascript'
        }
      })
    } else {
      return notFound()
    }
  }
}
