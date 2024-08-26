import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(_req: NextRequest, { params }: { params: { baremod: string } }) {
  const requestedFile = params.baremod
  const nodeModulesPath = path.join(process.cwd(), `node_modules/@mercuryworkshop/bare-as-module3/dist/${requestedFile}`)
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
