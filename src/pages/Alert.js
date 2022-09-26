import React from "react"

export default function Alert ({message}) {
    return <div className="bg-red-500 border border-red-600
     text-red-900 px-4 py-3 rounded relative mb-2">
        <span>{message}</span>
    </div>
}