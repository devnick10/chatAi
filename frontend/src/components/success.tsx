'use client'
import Loader from '@/app/_components/loader'
import { useSearchParams } from 'next/navigation'
import React, { Suspense } from 'react'

function DisplayPaymentRef() {
    const searchParams = useSearchParams()
    const referance = searchParams.get('referance')
    return (
        <div>
            <h1>Payment success</h1>
            <p>Referance No.{referance}</p>
        </div>
    )
}

export default function Success() {
    return (<>
        <Suspense fallback={<Loader />}>
            <DisplayPaymentRef />
        </Suspense>
    </>)
}
