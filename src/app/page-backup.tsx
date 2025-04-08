'use client'
import TopFlowers from '../components/top-flowers'
import FlowersFallLeft from '../components/flowers-fall-left'
import FlowerdFallRight from '../components/flowers-fall-right'
import { AnimatePresence, motion } from 'framer-motion'
import { animationConfig, FadeIn, FadeIn2, FadeIn3, FadeOut } from '../utils/GsapAnimation'
import { useEffect, useRef, useState } from 'react'
import FlowersLeft from '../components/flowers-left'
import FlowersRight from '../components/flowers-right'
import Countdown from '../components/countdown'
import CopyToClipboard from '../components/copyToClipboard'
import ModalImage from 'react-modal-image'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, onSnapshot, orderBy, query } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyALbQGbaNbjxV5EEFPHlNKygOM8SsPFxEo',
    authDomain: 'wedding-afifah.firebaseapp.com',
    projectId: 'wedding-afifah',
    storageBucket: 'wedding-afifah.firebasestorage.app',
    messagingSenderId: '546783871880',
    appId: '1:546783871880:web:d68bee5db084249ebeb03d',
    measurementId: 'G-8TD9K14FHV',
}

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default function Home() {
    const [state, setState] = useState(1)
    const [isPlaying, setIsPlaying] = useState(true)
    const [showGift, setShowGift] = useState(false)
    const [showKado, setShowKado] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [name, setName] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const [comments, setComments] = useState<{ name: string; message: string }[]>([])
    const [nameInvite, setNameInvite] = useState<string | null>(null)
    console.log('Halaman utama dirender')

    const playMusic = () => {
        if (audioRef.current) {
            audioRef.current.play()
        }
    }

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
            } else {
                audioRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play()
            setIsPlaying(true)
        }
    }, [audioRef])

    useEffect(() => {
        const script = document.createElement('script')
        script.src =
            'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs'
        script.type = 'module'
        document.body.appendChild(script)
    }, [])

    // Fungsi untuk menyimpan ucapan ke Firestore
    const saveMessage = async (name: string, message: string): Promise<void> => {
        const weddingMessage = {
            name,
            message,
            timestamp: new Date(),
        }

        try {
            await addDoc(collection(db, 'weddingMessages'), weddingMessage)
            console.log('Ucapan berhasil disimpan!')
            setName('')
            setMessage('')
        } catch (error) {
            console.error('Gagal menyimpan ucapan: ', error)
        }
    }

    // Handle submit formulir
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (name && message) {
            await saveMessage(name, message)
        } else {
            console.log('Nama dan pesan harus diisi.')
        }
    }

    // Mengambil dan menampilkan ucapan dari Firestore
    useEffect(() => {
        const q = query(collection(db, 'weddingMessages'), orderBy('timestamp', 'desc'))
        const unsubscribe = onSnapshot(q, snapshot => {
            const newMessages = snapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name, // Pastikan properti `name` ada di data
                message: doc.data().message, // Pastikan properti `message` ada di data
            }))
            setComments(newMessages)
        })

        return () => unsubscribe()
    }, [])

    useEffect(() => {
        // Ambil parameter dari URL
        const queryName =
            typeof window !== 'undefined'
                ? new URLSearchParams(window.location.search).get('to')
                : null
        if (queryName) {
            setNameInvite(queryName)
        } else {
            setNameInvite(null)
        }
    }, [])

    // Jika tidak ada nama, maka tidak menampilkan apapun
    if (!nameInvite) {
        return null // Sama dengan menghapus elemen saat tidak ada nama
    }

    const handleSaveTheDate = () => {
        const date = new Date('2024-11-23T08:00:00') // Ganti dengan tanggal acara
        const title = ' Undangan Pernikahan Afifah & Haidar (chimol) 💍'
        const description = 'Jangan lupa untuk hadir di acara kami! Terima Kasih 🙏'

        // Menampilkan alert
        alert(
            `Tanggal disimpan: ${date.toLocaleString()}\nJudul: ${title}\nDeskripsi: ${description}`,
        )
        const isIphone = /iPhone/i.test(navigator.userAgent)

        if (isIphone) {
            alert('Silakan buka link di Google Chrome untuk pengalaman yang lebih baik.')
            const calendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(
                title,
            )}&dates=${formatDateForCalendar(date)}&details=${encodeURIComponent(description)}`
            setTimeout(() => {
                if (typeof window !== 'undefined') {
                    window.open(calendarUrl, '_blank')
                }
            }, 500)
        } else {
            const calendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(
                title,
            )}&dates=${formatDateForCalendar(date)}&details=${encodeURIComponent(description)}`
            setTimeout(() => {
                if (typeof window !== 'undefined') {
                    window.open(calendarUrl, '_blank')
                }
            }, 500)
        }
    }

    const formatDateForCalendar = (date: Date) => {
        const start = date.toISOString().replace(/-|:|\.\d{3}/g, '') // Format: YYYYMMDDTHHMMSSZ
        const end = new Date(date.getTime() + 2 * 60 * 60 * 1000) // Tambahkan 2 jam
            .toISOString()
            .replace(/-|:|\.\d{3}/g, '') // Format: YYYYMMDDTHHMMSSZ
        return `${start}/${end}`
    }
    return (
        <>
            <AnimatePresence>
                {state === 1 && (
                    <motion.section
                        variants={FadeOut}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 2 }}
                        style={{ backgroundImage: 'url(/assets/images/opening.jpeg)' }}
                        className="w-full h-screen bg-cover bg-no-repeat bg-center bg-[#f1f2ed]  overflow-y-hidden overflow-x-hidden"
                    >
                        <div className="bg-[#86AF91] bg-opacity-50 h-screen w-full flex justify-center items-center">
                            <div className="py-10 flex justify-center items-center h-full relative">
                                <div className="flex flex-col gap-5 md:gap-6 lg:gap-7 xl:gap-8 2xl:gap-10 relative z-10">
                                    <motion.p
                                        variants={FadeIn}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                        className="inter-font text-center font-semibold text-slate-200 text-lg md:text-xl lg:text-xl xl:text-xl 2xl:text-2xl "
                                    >
                                        The Wedding Of
                                    </motion.p>
                                    <motion.h1
                                        variants={FadeIn}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        transition={{ duration: 0.5, delay: 0.8 }}
                                        className="viva-font  font-bold text-center text-4xl md:text-6xl lg:text-6xl xl:text-7xl text-white"
                                    >
                                        Afifah & Haidar
                                    </motion.h1>
                                    <div className="flex flex-col gap-2 md:gap-3">
                                        <motion.div
                                            variants={FadeIn}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            transition={{ duration: 0.5, delay: 1.1 }}
                                            className="inter-font text-center font-semibold text-slate-200 text-md md:text-md lg:text-lg"
                                            id="guest-name"
                                        >
                                            Kepada Yth Bapak/Ibu/Saudara/i
                                        </motion.div>
                                        <motion.p
                                            variants={FadeIn}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            transition={{ duration: 0.5, delay: 1.4 }}
                                            className="text-center font-bold text-slate-200 text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-4xl great-vibes"
                                        >
                                            {nameInvite}
                                        </motion.p>
                                        <motion.div
                                            variants={FadeIn}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            transition={{ duration: 0.5, delay: 1.1 }}
                                            className="inter-font mt-5 text-center font-semibold text-slate-200 text-xs md:text-xs lg:text-md px-10"
                                        >
                                            Kami Mengundang Anda Untuk Hadir Di Acara Pernikahan
                                            Kami.
                                        </motion.div>
                                    </div>
                                    <div className=" flex justify-center mt-5">
                                        <motion.button
                                            onClick={() => {
                                                playMusic()
                                                setState(2)
                                            }}
                                            variants={FadeIn2}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            transition={{ duration: 0.5, delay: 1.7 }}
                                            className="px-6 py-3 rounded-3xl bg-[#b58a34] text-white shadow-2xl shadow-slate-800 xl:text-xl 2xl:text-xl"
                                        >
                                            <i className="fa-solid fa-book-open mr-2 text-white"></i>
                                            Buka Undangan
                                        </motion.button>
                                    </div>
                                </div>

                                {/* {BottomRightFlowers()} */}
                                {/* {BottomLeftFlowers()} */}
                                {/* {TopFlowers()} */}
                            </div>
                        </div>
                    </motion.section>
                )}
                {state === 2 && (
                    <motion.div
                        variants={FadeIn3}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 2 }}
                        className="relative h-screen overflow-hidden"
                    >
                        <div className="flex">
                            <section
                                style={{ background: 'url(/assets/images/couple-1.jpeg)' }}
                                className=" h-screen hidden md:block w-full !bg-cover !bg-no-repeat !bg-center"
                            >
                                <div className="bg-[#86AF91] bg-opacity-80 h-screen w-full flex justify-center items-center">
                                    <div className="flex flex-col gap-9">
                                        <motion.p
                                            variants={FadeIn}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            transition={{ duration: 1, delay: 0.2 }}
                                            className="inter-font text-center font-semibold text-[#465e46] text-lg md:text-xl lg:text-xl xl:text-xl 2xl:text-2xl "
                                        >
                                            The Wedding Of
                                        </motion.p>
                                        <motion.h1
                                            variants={FadeIn}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className="great-vibes font-bold text-center text-4xl md:text-6xl lg:text-6xl xl:text-7xl  text-[#b58a34]"
                                        >
                                            Afifah & Haidar
                                        </motion.h1>
                                        <motion.p
                                            variants={FadeIn}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            transition={{ duration: 1, delay: 0.8 }}
                                            className="inter-font text-center font-semibold text-[#465e46] text-lg md:text-xl lg:text-xl xl:text-xl 2xl:text-2xl"
                                        >
                                            23.11.2024
                                        </motion.p>
                                        <div className="flex justify-center">
                                            <motion.button
                                                onClick={handleSaveTheDate}
                                                variants={FadeIn2}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                transition={{ duration: 0.5, delay: 1 }}
                                                className="px-6 py-3 rounded-3xl bg-[#b58a34] text-white shadow-2xl shadow-slate-800 xl:text-xl 2xl:text-xl"
                                            >
                                                <i className="fa-solid fa-calendar mr-2 text-white"></i>
                                                Save The Date
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <aside className="max-w-full md:max-w-[480px] w-full bg-white h-screen overflow-y-auto overflow-x-hidden relative">
                                {/* SECTION SALAM */}
                                <section
                                    style={{
                                        background: 'url(/assets/images/bg-3.png)',
                                    }}
                                    className="h-screen w-full !bg-cover !bg-no-repeat !bg-bottom relative flex justify-center items-center "
                                >
                                    {FlowersFallLeft()}
                                    {FlowerdFallRight()}
                                    <div className="">
                                        {/* <motion.h6 initial={animationConfig.initial}
                          whileInView={animationConfig.whileInView}
                          exit={animationConfig.exit}
                          transition={{ duration: 0.5, delay: 0.3 }} className='inter-font text-center font-semibold text-[#465e46] text-md md:text-lg capitalize mb-10 px-10'>Mengundang anda ke pesta perninkahan kami</motion.h6> */}
                                        <div
                                            style={{
                                                background: 'url(/assets/images/bg-2.webp)',
                                            }}
                                            className="bg-slate-50 rounded-full h-96 mx-8 bg-cover bg-center border-8 border-[#86AF91] shadow-xl flex justify-center items-center"
                                        >
                                            <div className="px-6 flex flex-col gap-4 justify-center items-center">
                                                <div className="">
                                                    <motion.h6
                                                        initial={animationConfig.initial}
                                                        whileInView={animationConfig.whileInView}
                                                        exit={animationConfig.exit}
                                                        transition={{ duration: 0.5, delay: 0.8 }}
                                                        className="text-center great-vibes text-[#b58a34] font-medium text-4xl"
                                                    >
                                                        Afifah
                                                    </motion.h6>
                                                    <motion.h6
                                                        initial={animationConfig.initial}
                                                        whileInView={animationConfig.whileInView}
                                                        exit={animationConfig.exit}
                                                        transition={{ duration: 0.5, delay: 0.8 }}
                                                        className="text-center great-vibes text-[#b58a34] font-medium text-3xl"
                                                    >
                                                        &
                                                    </motion.h6>
                                                    <motion.h6
                                                        initial={animationConfig.initial}
                                                        whileInView={animationConfig.whileInView}
                                                        exit={animationConfig.exit}
                                                        transition={{ duration: 0.5, delay: 0.8 }}
                                                        className="text-center great-vibes text-[#b58a34] font-medium text-4xl"
                                                    >
                                                        Haidar
                                                    </motion.h6>
                                                </div>
                                                <div className="flex justify-center mt-10">
                                                    <motion.button
                                                        onClick={handleSaveTheDate}
                                                        variants={FadeIn2}
                                                        initial="hidden"
                                                        animate="visible"
                                                        exit="exit"
                                                        transition={{ duration: 0.5, delay: 1 }}
                                                        className="px-6 py-2 rounded-3xl bg-[#b58a34] text-white text-sm  xl:text-md"
                                                    >
                                                        <i className="fa-solid fa-calendar mr-2 text-white"></i>
                                                        Save The Date
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {TopFlowers()}
                                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-transition-top"></div>
                                </section>

                                {/* SECTION  MEMPELAI */}
                                <section className="w-full relative overflow-hidden">
                                    <div className="px-6 py-10 bg-[#86AF91] bg-opacity-90 flex flex-col gap-4 overflow-hidden">
                                        <div
                                            style={{
                                                background: 'url(/assets/images/bg-2.webp)',
                                            }}
                                            className=" flex flex-col gap-4 bg-slate-200 rounded-3xl py-10 !bg-cover !bg-no-repeat !bg-top relative overflow-hidden"
                                        >
                                            <motion.div
                                                initial={animationConfig.initial}
                                                whileInView={animationConfig.whileInView}
                                                exit={animationConfig.exit}
                                                transition={{ duration: 0.5, delay: 0.3 }}
                                                className="w-52 h-72 md:h-60 md:w-48 lg:h-80 lg:w-60 xl:h-80 xl:w-60 2xl:h-96 2xl:w-72 rounded-3xl overflow-hidden mx-auto border-4 border-slate-300"
                                            >
                                                <img
                                                    src="/assets/images/women.jpeg"
                                                    className=" w-full h-full object-cover"
                                                    alt="couple image"
                                                />
                                            </motion.div>
                                            <motion.h6
                                                initial={animationConfig.initial}
                                                whileInView={animationConfig.whileInView}
                                                exit={animationConfig.exit}
                                                transition={{ duration: 0.5, delay: 0.8 }}
                                                className="text-center great-vibes text-[#b58a34] font-medium text-3xl px-4"
                                            >
                                                Afifah Dina Ayu Ningtyas, S.Mat
                                            </motion.h6>
                                            <motion.p
                                                initial={animationConfig.initial}
                                                whileInView={animationConfig.whileInView}
                                                exit={animationConfig.exit}
                                                transition={{ duration: 0.5, delay: 1 }}
                                                className="text-center text-xs font-normal quicksand-font text-[#b58a34]"
                                            >
                                                Putri Kedua Bapak Tuhri dan Ibu Purliatun
                                            </motion.p>
                                            <motion.div
                                                initial={animationConfig.initial}
                                                whileInView={animationConfig.whileInView}
                                                exit={animationConfig.exit}
                                                transition={{ duration: 0.5, delay: 1.3 }}
                                                className="flex justify-center"
                                            >
                                                <a
                                                    href="https://www.instagram.com/dantttt___/"
                                                    target="_blank"
                                                    className="text-[#b58a34] text-center bg-white rounded-xl px-3 py-1 text-sm border border-[#b58a34]"
                                                >
                                                    <i className="text-md fa-brands fa-square-instagram"></i>{' '}
                                                    @dantttt___
                                                </a>
                                            </motion.div>
                                        </div>
                                        <motion.h6
                                            initial={animationConfig.initial}
                                            whileInView={animationConfig.whileInView}
                                            exit={animationConfig.exit}
                                            transition={{ duration: 0.5, delay: 0.3 }}
                                            className="text-center great-vibes text-[#b58a34] font-medium text-4xl my-10"
                                        >
                                            &
                                        </motion.h6>
                                        <div
                                            style={{
                                                background: 'url(/assets/images/bg-2.webp)',
                                            }}
                                            className=" flex flex-col gap-4 bg-slate-200 rounded-3xl py-10 !bg-cover !bg-no-repeat !bg-top relative overflow-hidden"
                                        >
                                            <motion.div
                                                initial={animationConfig.initial}
                                                whileInView={animationConfig.whileInView}
                                                exit={animationConfig.exit}
                                                transition={{ duration: 0.5, delay: 0.8 }}
                                                className="w-52 h-72 md:h-60 md:w-48 lg:h-80 lg:w-60 xl:h-80 xl:w-60 2xl:h-96 2xl:w-72 rounded-3xl overflow-hidden mx-auto border-4 border-slate-300"
                                            >
                                                <img
                                                    src="/assets/images/men.jpeg"
                                                    className=" w-full h-full object-cover"
                                                    alt="couple image"
                                                />
                                            </motion.div>
                                            <motion.h6
                                                initial={animationConfig.initial}
                                                whileInView={animationConfig.whileInView}
                                                exit={animationConfig.exit}
                                                transition={{ duration: 0.5, delay: 1 }}
                                                className="text-center great-vibes text-[#b58a34] font-medium text-3xl px-4"
                                            >
                                                Khaedar Lafid Daeni, S.Pd
                                            </motion.h6>
                                            <motion.p
                                                initial={animationConfig.initial}
                                                whileInView={animationConfig.whileInView}
                                                exit={animationConfig.exit}
                                                transition={{ duration: 0.5, delay: 1.2 }}
                                                className="text-center text-xs font-normal quicksand-font text-[#b58a34]"
                                            >
                                                Putra Kedua Bapak Agus Machfud dan Ibu Danusri
                                            </motion.p>
                                            <motion.div
                                                initial={animationConfig.initial}
                                                whileInView={animationConfig.whileInView}
                                                exit={animationConfig.exit}
                                                transition={{ duration: 0.5, delay: 1.5 }}
                                                className="flex justify-center"
                                            >
                                                <a
                                                    href="https://www.instagram.com/xyzytpov_/"
                                                    target="_blank"
                                                    className="text-[#b58a34] text-center bg-white rounded-xl px-3 py-1 text-sm border border-[#b58a34]"
                                                >
                                                    <i className="text-md fa-brands fa-square-instagram"></i>{' '}
                                                    @xyzytpov_
                                                </a>
                                            </motion.div>
                                        </div>
                                    </div>
                                </section>

                                {/* SECTION   QUOTE */}
                                <section className="w-full relative overflow-hidden">
                                    <div className="px-6 py-20 bg-white flex flex-col gap-4 overflow-hidden relative">
                                        {FlowersLeft()}
                                        {FlowersRight()}
                                        <div className="px-10">
                                            <motion.p
                                                initial={animationConfig.initial}
                                                whileInView={animationConfig.whileInView}
                                                exit={animationConfig.exit}
                                                transition={{ duration: 0.5, delay: 0.3 }}
                                                className="text-sm leading-6 font-normal quicksand-font text-[#b58a34] text-center"
                                            >
                                                “Dan diantara tanda-tanda kekuasaanNya ialah Dia
                                                menciptakan untukmu isteri-isteri dari jenismu
                                                sendiri, supaya kamu cenderung dan merasa tenteram
                                                kepadanya, dan dijadikanNya diantaramu rasa kasih
                                                dan sayang. Sesungguhnya pada yang demikian itu
                                                benar-benar terdapat tanda-tanda bagi kaum yang
                                                berpikir.”
                                            </motion.p>
                                            <motion.p
                                                initial={animationConfig.initial}
                                                whileInView={animationConfig.whileInView}
                                                exit={animationConfig.exit}
                                                transition={{ duration: 0.5, delay: 0.8 }}
                                                className="text-sm leading-6 font-normal quicksand-font text-[#b58a34] text-center mt-5"
                                            >
                                                (Qs. Ar. Rum (30) : 21)
                                            </motion.p>
                                        </div>
                                    </div>
                                </section>

                                {/* SECTION  ACARA */}
                                <section
                                    style={{
                                        background: 'url(/assets/images/background-2.webp)',
                                    }}
                                    className="min-h-screen w-full !bg-cover !bg-no-repeat !bg-bottom   relative   overflow-hidden"
                                >
                                    {FlowersFallLeft()}
                                    {FlowerdFallRight()}

                                    <div className="py-14 w-full px-10 flex flex-col gap-6">
                                        <motion.h6
                                            initial={animationConfig.initial}
                                            whileInView={animationConfig.whileInView}
                                            exit={animationConfig.exit}
                                            transition={{ duration: 0.5, delay: 0.3 }}
                                            className="text-center great-vibes text-[#b58a34] mt-3 font-medium text-4xl"
                                        >
                                            Acara Pernikahan
                                        </motion.h6>

                                        <div
                                            style={{
                                                background: 'url(/assets/images/bg-2.webp)',
                                            }}
                                            className="bg-white p-4 rounded-2xl border-4 border-slate-300 flex flex-col gap-5 !bg-cover !bg-no-repeat !bg-bottom"
                                        >
                                            <motion.h6
                                                initial={animationConfig.initial}
                                                whileInView={animationConfig.whileInView}
                                                exit={animationConfig.exit}
                                                transition={{ duration: 0.5, delay: 0.3 }}
                                                className="text-center great-vibes text-[#b58a34] mt-3 font-medium text-4xl"
                                            >
                                                Akad
                                            </motion.h6>
                                            <div className="flex flex-col gap-3 ">
                                                <motion.p
                                                    initial={animationConfig.initial}
                                                    whileInView={animationConfig.whileInView}
                                                    exit={animationConfig.exit}
                                                    transition={{ duration: 0.5, delay: 0.3 }}
                                                    className="text-sm leading-6 font-semibold quicksand-font text-[#465e46] text-center"
                                                >
                                                    Sabtu, 23 November 2024
                                                </motion.p>
                                                <motion.p
                                                    initial={animationConfig.initial}
                                                    whileInView={animationConfig.whileInView}
                                                    exit={animationConfig.exit}
                                                    transition={{ duration: 0.5, delay: 0.3 }}
                                                    className="text-sm leading-6 font-normal quicksand-font text-[#465e46] text-center"
                                                >
                                                    <i className="fa-solid fa-clock"></i> Pukul
                                                    08.00 WIB
                                                </motion.p>
                                                <motion.p
                                                    initial={animationConfig.initial}
                                                    whileInView={animationConfig.whileInView}
                                                    exit={animationConfig.exit}
                                                    transition={{ duration: 0.5, delay: 0.3 }}
                                                    className="text-sm leading-6 font-normal quicksand-font text-[#465e46] text-center"
                                                >
                                                    {' '}
                                                    Lokasi : Masjid Sabiluttaqwa Dk. Krajan ds.
                                                    Karangtengah kec. Subah kab. Batang
                                                </motion.p>
                                                <div className="  py-4 px-4 w-full ">
                                                    <motion.div
                                                        initial={animationConfig.initial}
                                                        whileInView={animationConfig.whileInView}
                                                        exit={animationConfig.exit}
                                                        transition={{ duration: 0.5, delay: 0.3 }}
                                                        className=""
                                                    >
                                                        <iframe
                                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1314.9129192598493!2d109.89984643288064!3d-7.0023572188732714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7015c2d3f83505%3A0x48d85a340e00436c!2sMasjid%20Sabiluttaqwa%20Karangtengah!5e1!3m2!1sid!2sid!4v1731336831502!5m2!1sid!2sid"
                                                            className="w-full h-60 rounded-lg"
                                                            loading="lazy"
                                                        ></iframe>
                                                    </motion.div>
                                                    <div className="flex justify-center mt-6">
                                                        <motion.a
                                                            initial={animationConfig.initial}
                                                            whileInView={
                                                                animationConfig.whileInView
                                                            }
                                                            exit={animationConfig.exit}
                                                            transition={{
                                                                duration: 0.5,
                                                                delay: 0.3,
                                                            }}
                                                            href="https://maps.app.goo.gl/fE1Rsbmf6JfuVyMR7"
                                                            target="_blank"
                                                            className="px-5 py-2 rounded-3xl bg-white text-[#b58a34] shadow-2xl shadow-slate-800 font-semibold text-md"
                                                        >
                                                            <i className="fa-solid fa-map-location"></i>{' '}
                                                            Lihat Maps
                                                        </motion.a>
                                                    </div>
                                                </div>
                                                <motion.div
                                                    initial={animationConfig.initial}
                                                    whileInView={animationConfig.whileInView}
                                                    exit={animationConfig.exit}
                                                    transition={{ duration: 0.5, delay: 0.3 }}
                                                    className=""
                                                >
                                                    <Countdown key={1} date="2024-11-23T08:00:00" />
                                                </motion.div>
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                background: 'url(/assets/images/bg-2.webp)',
                                            }}
                                            className="bg-white p-4 rounded-2xl border-4 border-slate-300 flex flex-col gap-5 !bg-cover !bg-no-repeat !bg-bottom"
                                        >
                                            <div className="">
                                                <motion.h6
                                                    initial={animationConfig.initial}
                                                    whileInView={animationConfig.whileInView}
                                                    exit={animationConfig.exit}
                                                    transition={{ duration: 0.5, delay: 0.3 }}
                                                    className="text-center great-vibes text-[#b58a34]  font-medium text-4xl mt-2"
                                                >
                                                    Resepsi
                                                </motion.h6>
                                            </div>
                                            <div className="flex flex-col gap-3 ">
                                                <motion.p
                                                    initial={animationConfig.initial}
                                                    whileInView={animationConfig.whileInView}
                                                    exit={animationConfig.exit}
                                                    transition={{ duration: 0.5, delay: 0.3 }}
                                                    className="text-sm leading-6 font-semibold quicksand-font text-[#465e46] text-center"
                                                >
                                                    Minggu, 24 November 2024
                                                </motion.p>
                                                <motion.p
                                                    initial={animationConfig.initial}
                                                    whileInView={animationConfig.whileInView}
                                                    exit={animationConfig.exit}
                                                    transition={{ duration: 0.5, delay: 0.3 }}
                                                    className="text-sm leading-6 font-normal quicksand-font text-[#465e46] text-center"
                                                >
                                                    <i className="fa-solid fa-clock"></i> Pukul
                                                    12.00 WIB
                                                </motion.p>
                                                <motion.p
                                                    initial={animationConfig.initial}
                                                    whileInView={animationConfig.whileInView}
                                                    exit={animationConfig.exit}
                                                    transition={{ duration: 0.5, delay: 0.3 }}
                                                    className="text-sm leading-6 font-normal quicksand-font text-[#465e46] text-center"
                                                >
                                                    {' '}
                                                    Lokasi : Kediaman mempelai pria Dk. Pompongan
                                                    ds. Siwatu 16/05 kec. Wonotunggal kab. Batang
                                                </motion.p>
                                                <div className="  py-4 px-4 w-full ">
                                                    <motion.div
                                                        initial={animationConfig.initial}
                                                        whileInView={animationConfig.whileInView}
                                                        exit={animationConfig.exit}
                                                        transition={{ duration: 0.5, delay: 0.3 }}
                                                        className=""
                                                    >
                                                        <iframe
                                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d250.10240923309445!2d109.7516407987978!3d-6.963882415363912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7023d59261d217%3A0x1bf9c75bead05414!2sJrsecond!5e1!3m2!1sid!2sid!4v1731127868935!5m2!1sid!2sid"
                                                            className="w-full h-60 rounded-lg"
                                                            loading="lazy"
                                                        ></iframe>
                                                    </motion.div>
                                                    <div className="flex justify-center mt-6">
                                                        <motion.a
                                                            initial={animationConfig.initial}
                                                            whileInView={
                                                                animationConfig.whileInView
                                                            }
                                                            exit={animationConfig.exit}
                                                            transition={{
                                                                duration: 0.5,
                                                                delay: 0.3,
                                                            }}
                                                            href="https://maps.app.goo.gl/PaFQo5daoE74Acgh7"
                                                            target="_blank"
                                                            className="px-5 py-2 rounded-3xl bg-white text-[#b58a34] shadow-2xl shadow-slate-800 font-semibold text-md"
                                                        >
                                                            <i className="fa-solid fa-map-location"></i>{' '}
                                                            Lihat Maps
                                                        </motion.a>
                                                    </div>
                                                </div>
                                                <motion.div
                                                    initial={animationConfig.initial}
                                                    whileInView={animationConfig.whileInView}
                                                    exit={animationConfig.exit}
                                                    transition={{ duration: 0.5, delay: 0.3 }}
                                                    className=""
                                                >
                                                    <Countdown key={2} date="2024-11-24T12:00:00" />
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* SECTION  GALLERY  */}
                                <section className="w-full bg-white  relative pt-20 pb-0 overflow-hidden ">
                                    {TopFlowers()}
                                    <motion.h6
                                        initial={animationConfig.initial}
                                        whileInView={animationConfig.whileInView}
                                        exit={animationConfig.exit}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                        className="text-center great-vibes text-[#86AF91] mt-3 font-medium text-5xl mb-6"
                                    >
                                        Our Gallery
                                    </motion.h6>
                                    <motion.div
                                        initial={animationConfig.initial}
                                        whileInView={animationConfig.whileInView}
                                        exit={animationConfig.exit}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                        className=" w-full h-full overflow-hidden mx-auto bg-[#86AF91]"
                                    >
                                        <ModalImage
                                            small={'/assets/images/couple-1-sm.jpeg'}
                                            large={'/assets/images/couple-1.jpeg'}
                                            alt=""
                                        />
                                        <ModalImage
                                            small={'/assets/images/couple-2-sm.jpeg'}
                                            large={'/assets/images/couple-2.jpeg'}
                                            alt=""
                                        />
                                        <ModalImage
                                            small={'/assets/images/couple-3-sm.jpeg'}
                                            large={'/assets/images/couple-3.jpeg'}
                                            alt=""
                                        />
                                        <ModalImage
                                            small={'/assets/images/couple-4-sm.jpeg'}
                                            large={'/assets/images/couple-4.jpeg'}
                                            alt=""
                                        />
                                        <ModalImage
                                            small={'/assets/images/couple-5-sm.jpeg'}
                                            large={'/assets/images/couple-5.jpeg'}
                                            alt=""
                                        />
                                        <ModalImage
                                            small={'/assets/images/couple-6-sm.jpeg'}
                                            large={'/assets/images/couple-6.jpeg'}
                                            alt=""
                                        />
                                        <ModalImage
                                            small={'/assets/images/couple-7-sm.jpeg'}
                                            large={'/assets/images/couple-7.jpeg'}
                                            alt=""
                                        />
                                        <ModalImage
                                            small={'/assets/images/couple-8-sm.jpeg'}
                                            large={'/assets/images/couple-8.jpeg'}
                                            alt=""
                                        />
                                    </motion.div>
                                </section>

                                {/* SECTION GIFT */}
                                <section className=" w-full bg-[#86AF91] relative py-10   overflow-hidden ">
                                    <div className="  py-10 px-10 w-full flex flex-col gap-6 ">
                                        <div
                                            style={{
                                                background: 'url(/assets/images/bg-2.webp)',
                                            }}
                                            className="bg-white p-4 rounded-2xl border-4 border-slate-300 flex flex-col gap-5 !bg-cover !bg-no-repeat !bg-bottom"
                                        >
                                            <motion.h6
                                                initial={animationConfig.initial}
                                                whileInView={animationConfig.whileInView}
                                                exit={animationConfig.exit}
                                                transition={{ duration: 0.5, delay: 0.3 }}
                                                className="text-center great-vibes text-[#b58a34] mt-3 font-medium text-4xl"
                                            >
                                                Kado
                                            </motion.h6>
                                            <div className="flex flex-col gap-1 ">
                                                <motion.p
                                                    initial={animationConfig.initial}
                                                    whileInView={animationConfig.whileInView}
                                                    exit={animationConfig.exit}
                                                    transition={{ duration: 0.5, delay: 0.3 }}
                                                    className="text-md leading-6 font-normal quicksand-font text-[#465e46] text-center"
                                                >
                                                    {' '}
                                                    Doa Restu Anda merupakan karunia yang sangat
                                                    berarti bagi kami.
                                                </motion.p>
                                                <motion.p
                                                    initial={animationConfig.initial}
                                                    whileInView={animationConfig.whileInView}
                                                    exit={animationConfig.exit}
                                                    transition={{ duration: 0.5, delay: 0.3 }}
                                                    className="text-md leading-6 font-normal quicksand-font text-[#465e46] text-center"
                                                >
                                                    Namun jika Anda ingin memberikan hadiah, kami
                                                    sediakan fitur berikut:
                                                </motion.p>

                                                <div className="flex flex-col gap-6 mt-10">
                                                    <div className="flex justify-center">
                                                        <motion.button
                                                            onClick={() => {
                                                                setShowGift(!showGift)
                                                                setShowKado(false)
                                                            }}
                                                            variants={FadeIn2}
                                                            initial="hidden"
                                                            animate="visible"
                                                            exit="exit"
                                                            transition={{ duration: 0.5, delay: 1 }}
                                                            className="px-6 py-3 w-48 rounded-3xl bg-[#b58a34] text-white shadow-2xl shadow-slate-800 xl:text-xl 2xl:text-xl"
                                                        >
                                                            <i className="fa-solid fa-gift"></i>{' '}
                                                            Hadiah
                                                        </motion.button>
                                                    </div>
                                                    <div className="flex justify-center">
                                                        <motion.button
                                                            onClick={() => {
                                                                setShowKado(!showKado)
                                                                setShowGift(false)
                                                            }}
                                                            variants={FadeIn2}
                                                            initial="hidden"
                                                            animate="visible"
                                                            exit="exit"
                                                            transition={{ duration: 0.5, delay: 1 }}
                                                            className="px-6 py-3  w-48 rounded-3xl bg-[#b58a34] text-white shadow-2xl shadow-slate-800 xl:text-xl 2xl:text-xl"
                                                        >
                                                            <i className="fa-solid fa-gifts"></i>{' '}
                                                            Kado
                                                        </motion.button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {showGift && (
                                            <div className="">
                                                <div
                                                    style={{
                                                        background:
                                                            'url(/assets/images/background.webp)',
                                                    }}
                                                    className="bg-white p-4 rounded-2xl border-4 border-slate-300 flex flex-col gap-5 !bg-cover !bg-no-repeat !bg-bottom"
                                                >
                                                    <div className="flex flex-col gap-1 ">
                                                        <motion.img
                                                            initial={animationConfig.initial}
                                                            whileInView={
                                                                animationConfig.whileInView
                                                            }
                                                            exit={animationConfig.exit}
                                                            transition={{ duration: 0.5, delay: 0 }}
                                                            src="/assets/pattern/bri.png"
                                                            className=" w-32 mx-auto mb-4"
                                                            alt="couple image"
                                                        />
                                                        <motion.p
                                                            initial={animationConfig.initial}
                                                            whileInView={
                                                                animationConfig.whileInView
                                                            }
                                                            exit={animationConfig.exit}
                                                            transition={{
                                                                duration: 0.5,
                                                                delay: 0.3,
                                                            }}
                                                            className="text-md leading-6 font-semibold quicksand-font text-[#465e46] text-center"
                                                        >
                                                            374501031970532
                                                        </motion.p>
                                                        <motion.p
                                                            initial={animationConfig.initial}
                                                            whileInView={
                                                                animationConfig.whileInView
                                                            }
                                                            exit={animationConfig.exit}
                                                            transition={{
                                                                duration: 0.5,
                                                                delay: 0.8,
                                                            }}
                                                            className="text-md leading-6 font-semibold quicksand-font text-[#465e46] text-center"
                                                        >
                                                            Afifah Dina Ayu Ningtyas
                                                        </motion.p>

                                                        <div className="flex flex-col mb-6 mt-6">
                                                            <div className="flex justify-center">
                                                                <CopyToClipboard textToCopy="374501031970532" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    style={{
                                                        background:
                                                            'url(/assets/images/background.webp)',
                                                    }}
                                                    className="bg-white p-4 rounded-2xl border-4 border-slate-300 flex flex-col gap-5 !bg-cover !bg-no-repeat !bg-bottom"
                                                >
                                                    <div className="flex flex-col gap-1 ">
                                                        <motion.img
                                                            initial={animationConfig.initial}
                                                            whileInView={
                                                                animationConfig.whileInView
                                                            }
                                                            exit={animationConfig.exit}
                                                            transition={{ duration: 0.5, delay: 0 }}
                                                            src="/assets/pattern/bri.png"
                                                            className=" w-32 mx-auto mb-4"
                                                            alt="couple image"
                                                        />
                                                        <motion.p
                                                            initial={animationConfig.initial}
                                                            whileInView={
                                                                animationConfig.whileInView
                                                            }
                                                            exit={animationConfig.exit}
                                                            transition={{
                                                                duration: 0.5,
                                                                delay: 0.3,
                                                            }}
                                                            className="text-md leading-6 font-semibold quicksand-font text-[#465e46] text-center"
                                                        >
                                                            699801020497537
                                                        </motion.p>
                                                        <motion.p
                                                            initial={animationConfig.initial}
                                                            whileInView={
                                                                animationConfig.whileInView
                                                            }
                                                            exit={animationConfig.exit}
                                                            transition={{
                                                                duration: 0.5,
                                                                delay: 0.8,
                                                            }}
                                                            className="text-md leading-6 font-semibold quicksand-font text-[#465e46] text-center"
                                                        >
                                                            Khaedar Lafid Daeni
                                                        </motion.p>

                                                        <div className="flex flex-col mb-6 mt-6">
                                                            <div className="flex justify-center">
                                                                <CopyToClipboard textToCopy="699801020497537" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {showKado && (
                                            <div
                                                style={{
                                                    background:
                                                        'url(/assets/images/background.webp)',
                                                }}
                                                className="bg-white p-4 rounded-2xl border-4 border-slate-300 flex flex-col gap-5 !bg-cover !bg-no-repeat !bg-bottom"
                                            >
                                                <div className="flex flex-col gap-1 ">
                                                    <div className="flex justify-center">
                                                        <motion.i
                                                            initial={animationConfig.initial}
                                                            whileInView={
                                                                animationConfig.whileInView
                                                            }
                                                            exit={animationConfig.exit}
                                                            transition={{ duration: 0.5, delay: 0 }}
                                                            className="fa-solid fa-gifts text-4xl my-6 text-[#b58a34]"
                                                        ></motion.i>
                                                    </div>
                                                    <motion.p
                                                        initial={animationConfig.initial}
                                                        whileInView={animationConfig.whileInView}
                                                        exit={animationConfig.exit}
                                                        transition={{ duration: 0.5, delay: 0.3 }}
                                                        className="text-md leading-6 font-semibold quicksand-font text-[#465e46] text-center"
                                                    >
                                                        {' '}
                                                        Kirim kado ke alamat
                                                    </motion.p>
                                                    <motion.p
                                                        initial={animationConfig.initial}
                                                        whileInView={animationConfig.whileInView}
                                                        exit={animationConfig.exit}
                                                        transition={{ duration: 0.5, delay: 0.8 }}
                                                        className="text-md leading-6 font-normal quicksand-font text-[#465e46] text-center"
                                                    >
                                                        {' '}
                                                        Dk. Pompongan ds. Siwatu 16/05 kec.
                                                        Wonotunggal kab. Batang
                                                    </motion.p>
                                                    <motion.p
                                                        initial={animationConfig.initial}
                                                        whileInView={animationConfig.whileInView}
                                                        exit={animationConfig.exit}
                                                        transition={{ duration: 0.5, delay: 0.3 }}
                                                        className="text-md leading-6 font-semibold quicksand-font text-[#465e46] text-center mt-3"
                                                    >
                                                        {' '}
                                                        An. Khaedar Lafid Daeni
                                                    </motion.p>
                                                    <div className="flex flex-col mb-6 mt-6">
                                                        <div className="flex justify-center">
                                                            <CopyToClipboard textToCopy="Dk. Pompongan ds. Siwatu 16/05 kec. Wonotunggal kab. Batang" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </section>

                                {/* SECTION UCAPAN */}
                                <section
                                    style={{
                                        background: 'url(/assets/images/background.webp)',
                                    }}
                                    className="flex flex-col gap-4 bg-slate-200  min-h-screen py-10 !bg-cover !bg-no-repeat !bg-top relative overflow-hidden"
                                >
                                    {FlowersLeft()}
                                    {FlowersRight()}
                                    <motion.h6
                                        initial={animationConfig.initial}
                                        whileInView={animationConfig.whileInView}
                                        exit={animationConfig.exit}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                        className="text-center great-vibes text-[#b58a34] mt-3 font-medium text-4xl"
                                    >
                                        Ucapan Terbaik
                                    </motion.h6>
                                    <motion.p
                                        initial={animationConfig.initial}
                                        whileInView={animationConfig.whileInView}
                                        exit={animationConfig.exit}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                        className="text-sm leading-5 font-normal quicksand-font text-[#b58a34] text-center"
                                    >
                                        Sampaikan doa dan ucapan terbaik Anda
                                    </motion.p>

                                    <div className="mx-6 bg-white p-6 rounded-xl relative z-50">
                                        <form onSubmit={handleSubmit}>
                                            <input
                                                type="text"
                                                placeholder="Nama"
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                required
                                                className="w-full border-slate-100 p-3 rounded-xl border mb-4 text-slate-900"
                                            />
                                            <textarea
                                                placeholder="Ucapan"
                                                value={message}
                                                onChange={e => setMessage(e.target.value)}
                                                required
                                                className="w-full border-slate-100 p-3 rounded-xl border mb-4 text-slate-900"
                                            />
                                            <button
                                                type="submit"
                                                className="px-6 py-3  w-full rounded-3xl bg-[#b58a34] text-white shadow-2xl shadow-slate-800 xl:text-xl 2xl:text-xl"
                                            >
                                                Kirim
                                            </button>
                                        </form>

                                        <div className="overflow-auto max-h-96 mt-10">
                                            {comments.map((comment, key) => (
                                                <div
                                                    key={key}
                                                    style={{
                                                        marginTop: '20px',
                                                        borderBottom: '1px solid #ccc',
                                                    }}
                                                >
                                                    <strong className="text-slate-900">
                                                        {comment.name}
                                                    </strong>
                                                    <p className="text-slate-800">
                                                        {comment.message}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>

                                {/* SECTION  TERIMAKASIH */}
                                <section
                                    style={{
                                        background: 'url(/assets/images/couple-1.jpeg)',
                                    }}
                                    className=" w-full !bg-cover !bg-no-repeat !bg-bottom bg-[#b58a34] relative pb-20 pt-80  flex flex-col justify-end overflow-hidden "
                                >
                                    <div className="absolute bottom-0 left-0 right-0 h-full bg-transition-top-2"></div>
                                    <div className="flex flex-col gap-7 px-10 relative">
                                        <motion.p
                                            initial={animationConfig.initial}
                                            whileInView={animationConfig.whileInView}
                                            exit={animationConfig.exit}
                                            transition={{ duration: 0.5, delay: 0.3 }}
                                            className="text-sm leading-5 font-normal quicksand-font text-white text-center"
                                        >
                                            Merupakan suatu kehormatan dan kebahagiaan bagi kami
                                            apabila Anda berkenan hadir dan memberikan do’a restunya
                                            untuk pernikahan kami.
                                        </motion.p>
                                        <motion.p
                                            initial={animationConfig.initial}
                                            whileInView={animationConfig.whileInView}
                                            exit={animationConfig.exit}
                                            transition={{ duration: 0.5, delay: 0.3 }}
                                            className=" text-sm leading-5 font-normal quicksand-font text-white text-center"
                                        >
                                            Atas do’a & restunya, kami ucapkan terima kasih.
                                        </motion.p>
                                        <motion.h6
                                            initial={animationConfig.initial}
                                            whileInView={animationConfig.whileInView}
                                            exit={animationConfig.exit}
                                            transition={{ duration: 0.5, delay: 0.3 }}
                                            className="text-center great-vibes text-white mt-3 font-medium text-5xl mb-6"
                                        >
                                            Afifah & Haidar
                                        </motion.h6>
                                        <div className="">
                                            <motion.p
                                                initial={animationConfig.initial}
                                                whileInView={animationConfig.whileInView}
                                                exit={animationConfig.exit}
                                                transition={{ duration: 0.5, delay: 0.3 }}
                                                className=" text-sm leading-5 font-normal quicksand-font text-white text-center"
                                            >
                                                Made by Hafidz Al Afaf
                                            </motion.p>
                                            <motion.p
                                                initial={animationConfig.initial}
                                                whileInView={animationConfig.whileInView}
                                                exit={animationConfig.exit}
                                                transition={{ duration: 0.5, delay: 0.3 }}
                                                className=" text-sm leading-5 font-normal quicksand-font text-white text-center"
                                            >
                                                Visit my instagram{' '}
                                                <a
                                                    href="https://www.instagram.com/hafidz00/"
                                                    target="_blank"
                                                    className="border-b border-white"
                                                >
                                                    {' '}
                                                    @hafidz00
                                                </a>
                                            </motion.p>
                                        </div>
                                    </div>
                                </section>

                                {/* <div className="py-6"></div> */}

                                <div className="fixed bottom-24 right-5 z-50">
                                    <button
                                        onClick={toggleMusic}
                                        className="w-10 h-10 flex justify-center items-center bg-[#b58a34] text-white rounded-full shadow-lg"
                                    >
                                        {isPlaying ? (
                                            <>
                                                <i className="fa-solid fa-music"></i>
                                            </>
                                        ) : (
                                            <>
                                                <i className="fa-solid fa-pause"></i>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </aside>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <audio ref={audioRef} src="/assets/music/background-music.mp3" loop />
        </>
    )
}
