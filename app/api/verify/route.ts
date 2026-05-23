import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { payload } = await req.json()

    const verifyRes = await fetch(
      `https://developer.worldcoin.org/api/v2/verify/${process.env.APP_ID}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nullifier_hash: payload.nullifier_hash,
          merkle_root: payload.merkle_root,
          proof: payload.proof,
          verification_level: payload.verification_level,
          action: 'worldx-verify',
        }),
      }
    )

    const data = await verifyRes.json()

    if (verifyRes.ok) {
      return NextResponse.json({ success: true })
    }

    return NextResponse.json(
      { success: false, error: data },
      { status: 400 }
    )
  } catch {
    return NextResponse.json(
      { success: false, error: 'Internal error' },
      { status: 500 }
    )
  }
}