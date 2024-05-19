'use client'

import { formattedDate } from "@/lib/utils"
import { Suspense } from "react"

export function LocalTime({ date }: Readonly<{ date: Date }>) {
    return (
        <Suspense>
            <time dateTime={date.toISOString()}>
                <p className="text-xs xl:text-sm">{formattedDate(date.toLocaleDateString())}</p>
            </time>
        </Suspense>
    )
}