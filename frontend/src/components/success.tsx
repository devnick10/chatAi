'use client'
import { useSearchParams } from 'next/navigation'
import React from 'react'

export default function Success() {
    const searchParams = useSearchParams()
    const referance = searchParams.get('referance')
    return (
        <div>
            <h1>Payment success</h1>
            <p>Referance No.{referance}</p>
        </div>
    )
}
