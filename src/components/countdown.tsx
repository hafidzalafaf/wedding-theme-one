import { useState, useEffect } from 'react'

interface Countdown {
    date: string
}

export default function Countdown({ date }: Countdown) {
    const calculateTimeLeft = () => {
        const difference = +new Date(date) - +new Date()
        let timeLeft: { [key: string]: number } = {}

        if (difference > 0) {
            timeLeft = {
                Hari: Math.floor(difference / (1000 * 60 * 60 * 24)),
                Jam: Math.floor((difference / (1000 * 60 * 60)) % 24),
                Menit: Math.floor((difference / 1000 / 60) % 60),
                Detik: Math.floor((difference / 1000) % 60),
            }
        }

        return timeLeft
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)

        return () => clearTimeout(timer)
    })

    const timerComponents: JSX.Element[] = []

    Object.keys(timeLeft).forEach((interval, index) => {
        if (!timeLeft[interval]) {
            return
        }

        timerComponents.push(
            <div key={`${index}-${interval}`} className="flex items-center">
                <div key={` ${interval}`} className="flex flex-col gap-1 items-center">
                    <span className="text-3xl text-slate-600 font-bold">{timeLeft[interval]}</span>
                    <span className="text-xs text-slate-600   font-medium"> {interval}</span>
                </div>
                {interval !== 'Detik' && (
                    <div className="flex items-start px-2">
                        <span className="text-3xl text-slate-600 font-bold">:</span>
                    </div>
                )}
            </div>,
        )
    })
    return (
        <div className="px-3 sm:px-4 bg-white rounded-xl bg-opacity-100">
            <div className="flex gap-0 px-6 py-3 justify-center ">
                {timerComponents.length ? timerComponents : <span>Waktu habis!</span>}
            </div>
        </div>
    )
}
