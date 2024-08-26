import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(_req: NextRequest, { params }: { params: { baremux: string } }) {
  const requestedFile = params.baremux
  const nodeModulesPath = path.join(process.cwd(), `node_modules/bare-mux-tb/dist/${requestedFile}`)
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
