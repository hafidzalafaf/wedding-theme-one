'use client'
import FlowersFallLeft from '../components/flowers-fall-left'
import FlowerdFallRight from '../components/flowers-fall-right'
import { AnimatePresence, motion } from 'framer-motion'
import { animationConfig, FadeIn, FadeIn2, FadeIn3, FadeOut } from '../utils/GsapAnimation'
import { useEffect, useRef, useState } from 'react'
import Countdown from '../components/countdown'
import CopyToClipboard from '../components/copyToClipboard'
// import ModalImage from 'react-modal-image'
import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    addDoc,
    onSnapshot,
    orderBy,
    query,
    Timestamp,
} from 'firebase/firestore'
import Image from 'next/image'
import ModalImage from 'react-modal-image'
import moment from 'moment'
import 'moment/locale/id'

const firebaseConfig = {
    apiKey: 'AIzaSyClBFOCUwe9XhIqtld_y_L0-crDEGZDXHY',
    authDomain: 'wedding-ulfa.firebaseapp.com',
    projectId: 'wedding-ulfa',
    storageBucket: 'wedding-ulfa.firebasestorage.app',
    messagingSenderId: '666572757191',
    appId: '1:666572757191:web:720611681626d65a4ac6e2',
    measurementId: 'G-0GE9K1P8JH',
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
    const [comments, setComments] = useState<
        { name: string; message: string; timestamp: Timestamp }[]
    >([])
    const [nameInvite, setNameInvite] = useState<string | null>('-')

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
            timestamp: Timestamp.now(),
        }

        try {
            await addDoc(collection(db, 'weddingMessage'), weddingMessage)
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
        const q = query(collection(db, 'weddingMessage'), orderBy('timestamp', 'desc'))
        const unsubscribe = onSnapshot(q, snapshot => {
            const newMessages = snapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name, // Pastikan properti `name` ada di data
                message: doc.data().message, // Pastikan properti `message` ada di data
                timestamp: doc.data().timestamp, // Pastikan properti `message` ada di data
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
    // if (!nameInvite) {
    //     return null // Sama dengan menghapus elemen saat tidak ada nama
    // }

    const handleSaveTheDate = () => {
        const date = new Date('2025-04-27T09:00:00') // Ganti dengan tanggal acara
        const title = ' Undangan Pernikahan Ulfa  Ahmad 💍'
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
                        style={{ backgroundImage: 'url(/assets/images/image-1.webp)' }}
                        className="w-full h-screen bg-cover bg-no-repeat bg-center bg-[#F9E4BC]  overflow-y-hidden overflow-x-hidden"
                    >
                        <div className=" h-screen bg-transition-bottom w-full flex justify-center items-end">
                            <div className="py-10   flex justify-center items-end h-3/4 relative">
                                <div className="flex flex-col gap-3 md:gap-6 lg:gap-7 xl:gap-8 2xl:gap-10 relative z-10">
                                    <motion.p
                                        variants={FadeIn}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                        className="inter-font text-center font-semibold text-slate-200 text-lg md:text-xl lg:text-xl xl:text-xl 2xl:text-2xl capitalize"
                                    >
                                        THE WEDDING OF
                                    </motion.p>
                                    <motion.h1
                                        variants={FadeIn}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        transition={{ duration: 0.5, delay: 0.8 }}
                                        className="viva-font  font-normal text-center text-5xl md:text-6xl lg:text-6xl xl:text-7xl text-white"
                                    >
                                        Ulfa & Ahmad
                                    </motion.h1>
                                    <div className="flex flex-col gap-2 md:gap-3">
                                        <motion.div
                                            variants={FadeIn}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            transition={{ duration: 0.5, delay: 1.1 }}
                                            className="inter-font text-center font-semibold text-slate-200 text-sm md:text-md lg:text-lg"
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
                                            className="text-center font-bold text-slate-200 text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-4xl inter-font "
                                        >
                                            {nameInvite ?? '-'}
                                        </motion.p>
                                        <motion.div
                                            variants={FadeIn}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            transition={{ duration: 0.5, delay: 1.1 }}
                                            className="inter-font  text-center font-semibold text-slate-200 text-xs md:text-xs lg:text-md px-10"
                                        >
                                            Kami Mengundang Anda Untuk Hadir Di Acara Pernikahan
                                            Kami.
                                        </motion.div>
                                    </div>
                                    <div className=" flex justify-center mt-2">
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
                                            className="px-6 py-3 rounded-3xl border-[#F6E8B1] border text-[#F6E8B1] shadow-2xl shadow-slate-800 xl:text-xl 2xl:text-xl"
                                        >
                                            <i className="fa-solid fa-book-open mr-2 text-[#F6E8B1]"></i>
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
                                style={{ background: 'url(/assets/images/image-1.webp)' }}
                                className=" h-screen hidden md:block w-full !bg-cover !bg-no-repeat !bg-center"
                            >
                                <div className="bg-[#F9E4BC] bg-opacity-80 h-screen w-full flex justify-center items-center">
                                    <div className="flex flex-col gap-9">
                                        <motion.p
                                            variants={FadeIn}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            transition={{ duration: 1, delay: 0.2 }}
                                            className="inter-font text-center font-semibold text-[#483C32] text-lg md:text-xl lg:text-xl xl:text-xl 2xl:text-2xl "
                                        >
                                            The Wedding Of
                                        </motion.p>
                                        <motion.h1
                                            variants={FadeIn}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className="viva-font font-normal text-center text-4xl md:text-6xl lg:text-6xl xl:text-7xl  text-[#483C32]"
                                        >
                                            Ulfa & Ahmad
                                        </motion.h1>
                                        <motion.p
                                            variants={FadeIn}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            transition={{ duration: 1, delay: 0.8 }}
                                            className="inter-font text-center font-semibold text-[#483C32] text-lg md:text-xl lg:text-xl xl:text-xl 2xl:text-2xl"
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
                                                className="px-6 py-3 rounded-3xl bg-[#483C32] text-white shadow-2xl shadow-slate-800 xl:text-xl 2xl:text-xl"
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
                                        background: 'url(/assets/images/bg-new-2.webp)',
                                    }}
                                    className="h-screen w-full !bg-cover !bg-no-repeat !bg-bottom relative flex justify-center items-center "
                                >
                                    {/* {FlowersFallLeft()} */}
                                    {/* {FlowerdFallRight()} */}
                                    <div className="">
                                        <div className="bg-white rounded-[32px] h-3/4 my-auto border-2 border-[#F9E4BC]   flex justify-center items-center mx-6">
                                            <div className="px-6  flex flex-col gap-4 justify-center items-center py-10">
                                                <div className="">
                                                    <motion.h6
                                                        initial={animationConfig.initial}
                                                        whileInView={animationConfig.whileInView}
                                                        exit={animationConfig.exit}
                                                        transition={{ duration: 0.5, delay: 0.8 }}
                                                        className="text-center viva-font mb-6 text-[#483C32] font-medium text-4xl"
                                                    >
                                                        Ulfa & Ahmad
                                                    </motion.h6>
                                                </div>
                                                <div className="">
                                                    <motion.h6
                                                        initial={animationConfig.initial}
                                                        whileInView={animationConfig.whileInView}
                                                        exit={animationConfig.exit}
                                                        transition={{ duration: 0.5, delay: 0.8 }}
                                                        className="text-center inter-font text-[#534b53] font-normal text-base"
                                                    >
                                                        Dan di antara tanda-tanda kekuasaan-Nya
                                                        ialah Dia menciptakan untukmu isteri-isteri
                                                        dari jenismu sendiri, supaya kamu cenderung
                                                        dan merasa tenteram kepadanya, dan
                                                        dijadikan-Nya diantaramu rasa kasih dan
                                                        sayang. Sesungguhnya pada yang demikian itu
                                                        benar-benar terdapat tanda-tanda bagi kaum
                                                        yang berfikir. <br /> <br />
                                                        (QS Ar-Rum : 21)
                                                    </motion.h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="absolute bottom-0 left-0 right-0 h-20 bg-transition-top"></div> */}
                                </section>

                                {/* SECTION  MEMPELAI */}
                                <section
                                    style={{ background: 'url(/assets/images/image-5.webp)' }}
                                    className="w-full !bg-fixed !bg-cover !bg-no-repeat !bg-center relative overflow-hidden"
                                >
                                    {FlowersFallLeft()}
                                    {FlowerdFallRight()}
                                    <div className="px-0 py-10 !bg-[#FFFDF0] !bg-opacity-90 flex flex-col gap-4 overflow-hidden">
                                        <Image
                                            src={'/assets/images/tl.webp'}
                                            alt="image flower"
                                            className="absolute bottom-0 left-0 rotate-180 scale-x-[-1]"
                                            width={140}
                                            height={140}
                                        />
                                        <div className="flex justify-center px-6">
                                            <div className="relative pb-12 mr-10">
                                                <h2 className="analogue-font text-[#534b53] text-[32px] italic">
                                                    Kedua
                                                </h2>
                                                <span className="viva-font text-[#534b53] text-[32px] italic absolute bottom-7 left-10">
                                                    Mempelai
                                                </span>
                                            </div>
                                        </div>
                                        <p className=" px-6 text-sm text-[#534b53] font-bold inter-font text-center">
                                            Assalamu’alaikum Warahmatullahi Wabarakatuh
                                        </p>
                                        <p className=" px-6 text-sm quicksand-font text-center text-[#534b53] text-opacity-70 font-normal">
                                            Maha Suci Allah yang telah menciptakan makhluk-Nya
                                            berpasang-pasangan. Ya Allah semoga ridho-Mu tercurah
                                            mengiringi pernikahan kami.
                                        </p>
                                        <div className="mt-10">
                                            <div className="relative">
                                                <div className="absolute bg-[#483C32] h-[330px] w-[270px] bg-opacity-10 top-5 left-5 z-10"></div>
                                                <Image
                                                    src="/assets/images/image-11.webp"
                                                    className="z-20 relative object-cover h-[330px]"
                                                    alt="couple image"
                                                    width={270}
                                                    height={330}
                                                />
                                            </div>
                                            <div className="px-6 mt-10">
                                                <motion.h6
                                                    initial={animationConfig.initial}
                                                    whileInView={animationConfig.whileInView}
                                                    exit={animationConfig.exit}
                                                    transition={{ duration: 0.5, delay: 0.8 }}
                                                    className=" analogue-font text-[#483C32] font-normal text-2xl mb-2"
                                                >
                                                    Ulfatul Khasanah A.Md.Kep
                                                </motion.h6>
                                                <motion.p
                                                    initial={animationConfig.initial}
                                                    whileInView={animationConfig.whileInView}
                                                    exit={animationConfig.exit}
                                                    transition={{ duration: 0.5, delay: 1 }}
                                                    className=" text-xs  font-normal quicksand-font text-[#483C32] mb-2"
                                                >
                                                    Putri Kedua Bp Sanyoto & Ibu Khalimah Sadiyah
                                                </motion.p>
                                                <motion.div
                                                    initial={animationConfig.initial}
                                                    whileInView={animationConfig.whileInView}
                                                    exit={animationConfig.exit}
                                                    transition={{ duration: 0.5, delay: 1.3 }}
                                                    className="flex justify-start"
                                                >
                                                    <a
                                                        href="https://www.instagram.com/dantttt___/"
                                                        target="_blank"
                                                        className="text-[#483C32] text-center    text-sm "
                                                    >
                                                        <i className="text-sm fa-brands fa-square-instagram"></i>{' '}
                                                        @dantttt___
                                                    </a>
                                                </motion.div>
                                            </div>
                                        </div>
                                        <motion.h6
                                            initial={animationConfig.initial}
                                            whileInView={animationConfig.whileInView}
                                            exit={animationConfig.exit}
                                            transition={{ duration: 0.5, delay: 0.3 }}
                                            className="text-center viva-font text-[#534b53] font-medium text-4xl my-3"
                                        >
                                            &
                                        </motion.h6>
                                        <div className="mt-10 mb-10">
                                            <div className="relative">
                                                <div className="absolute bg-[#483C32] h-[330px] w-[270px] bg-opacity-10 top-5 right-5 z-10"></div>
                                                <div className="h-[330px] w-[270px] overflow-hidden ml-auto z-20 relative">
                                                    <Image
                                                        src="/assets/images/image-12.webp"
                                                        className="object-cover object-[50%_35%] scale-120 transform h-[330px] "
                                                        alt="couple image"
                                                        width={270}
                                                        height={330}
                                                    />
                                                </div>
                                            </div>
                                            <div className="px-6 mt-10">
                                                <motion.h6
                                                    initial={animationConfig.initial}
                                                    whileInView={animationConfig.whileInView}
                                                    exit={animationConfig.exit}
                                                    transition={{ duration: 0.5, delay: 0.8 }}
                                                    className=" analogue-font text-right text-[#483C32] font-normal text-2xl mb-2"
                                                >
                                                    Ahmad Nurhasan A.Md.Kep
                                                </motion.h6>
                                                <motion.p
                                                    initial={animationConfig.initial}
                                                    whileInView={animationConfig.whileInView}
                                                    exit={animationConfig.exit}
                                                    transition={{ duration: 0.5, delay: 1 }}
                                                    className=" text-xs text-right font-normal quicksand-font text-[#483C32] mb-2"
                                                >
                                                    Putra Ketiga Bp Nurman (Alm) & Ibu Entin
                                                </motion.p>
                                                <motion.div
                                                    initial={animationConfig.initial}
                                                    whileInView={animationConfig.whileInView}
                                                    exit={animationConfig.exit}
                                                    transition={{ duration: 0.5, delay: 1.3 }}
                                                    className="flex justify-end"
                                                >
                                                    <a
                                                        href="https://www.instagram.com/dantttt___/"
                                                        target="_blank"
                                                        className="text-[#483C32] text-center   text-sm "
                                                    >
                                                        <i className="text-sm fa-brands fa-square-instagram"></i>{' '}
                                                        @dantttt___
                                                    </a>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* SECTION   QUOTE */}
                                <section className="w-full relative overflow-hidden">
                                    <div className="px-6 py-20 bg-[#483C32] flex flex-col gap-4 overflow-hidden relative">
                                        <Image
                                            src={'/assets/images/tl.webp'}
                                            alt="image flower"
                                            className="absolute top-0 left-0"
                                            width={140}
                                            height={140}
                                        />
                                        <Image
                                            src={'/assets/images/br.webp'}
                                            alt="image flower"
                                            className="absolute bottom-0 right-0"
                                            width={140}
                                            height={140}
                                        />
                                        <div className="flex justify-center px-6">
                                            <h2 className="analogue-font text-white text-[32px] italic">
                                                Save The Date
                                            </h2>
                                        </div>
                                        <motion.div
                                            initial={animationConfig.initial}
                                            whileInView={animationConfig.whileInView}
                                            exit={animationConfig.exit}
                                            transition={{ duration: 0.5, delay: 0.3 }}
                                            className=""
                                        >
                                            <Countdown key={1} date="2025-04-27T09:00:00" />
                                        </motion.div>
                                        <div className="flex justify-center mt-10">
                                            <motion.button
                                                onClick={handleSaveTheDate}
                                                variants={FadeIn2}
                                                initial="hidden"
                                                animate="visible"
                                                exit="exit"
                                                transition={{ duration: 0.5, delay: 1 }}
                                                className="px-6 py-2 rounded-3xl border border-white text-white text-sm  xl:text-md"
                                            >
                                                <i className="fa-solid fa-calendar mr-2 text-white"></i>
                                                Save The Date
                                            </motion.button>
                                        </div>
                                    </div>
                                </section>

                                {/* SECTION  ACARA */}
                                <section
                                    style={{
                                        background: 'url(/assets/images/image-6.webp)',
                                    }}
                                    className="min-h-screen w-full !bg-fixed !bg-cover !bg-no-repeat !bg-bottom   relative   overflow-hidden"
                                >
                                    <div className="py-14 w-full px-10 flex flex-col gap-6 bg-[#FFFDF0] bg-opacity-90">
                                        <Image
                                            src={'/assets/images/br.webp'}
                                            alt="image flower"
                                            className="absolute top-0 right-0 rotate-180 scale-x-[-1]"
                                            width={140}
                                            height={140}
                                        />
                                        <div className="flex justify-center px-6">
                                            <div className="relative pb-12 mr-10">
                                                <h2 className="analogue-font text-[#534b53] text-[32px] italic">
                                                    Wedding
                                                </h2>
                                                <span className="viva-font text-[#534b53] text-[48px] italic absolute bottom-2 left-10">
                                                    Event
                                                </span>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-tr-[160px]">
                                            <img
                                                src={'/assets/images/image-2.webp'}
                                                alt="image flower"
                                                className="w-full h-64 object-cover object-[50%_65%] rounded-tr-[160px]"
                                            />
                                            <div className="bg-[#483C32] py-4 px-4">
                                                <motion.h6
                                                    initial={animationConfig.initial}
                                                    whileInView={animationConfig.whileInView}
                                                    exit={animationConfig.exit}
                                                    transition={{ duration: 0.5, delay: 0.3 }}
                                                    className="text-center analogue-font text-white font-normal italic text-3xl"
                                                >
                                                    Akad
                                                </motion.h6>
                                            </div>
                                            <div className="bg-white px-6 pb-6">
                                                <div className="flex gap-4 items-center border-b border-[#483C32] border-opacity-30 justify-center">
                                                    <h6 className="text-[70px] text-[#483C32] quicksand-font font-normal">
                                                        27
                                                    </h6>
                                                    <div className="flex flex-col gap-1">
                                                        <p className="text-[#483C32] quicksand-font">
                                                            Minggu,
                                                        </p>
                                                        <p className="text-[#483C32] quicksand-font">
                                                            April 2025
                                                        </p>
                                                    </div>
                                                </div>
                                                <motion.p
                                                    initial={animationConfig.initial}
                                                    whileInView={animationConfig.whileInView}
                                                    exit={animationConfig.exit}
                                                    transition={{ duration: 0.5, delay: 0.3 }}
                                                    className="text-sm leading-6 font-normal mt-4 mb-2 quicksand-font text-[#483C32] text-center"
                                                >
                                                    <i className="fa-solid fa-clock mr-2"></i>
                                                    09.00 WIB
                                                </motion.p>
                                                <motion.p
                                                    initial={animationConfig.initial}
                                                    whileInView={animationConfig.whileInView}
                                                    exit={animationConfig.exit}
                                                    transition={{ duration: 0.5, delay: 0.3 }}
                                                    className="text-sm leading-6 font-normal quicksand-font text-[#483C32] text-center"
                                                >
                                                    {' '}
                                                    Lokasi : Dk Krajan Rt 01 Rw 02 Ds Keborangan Kec
                                                    Subah Kab Batang
                                                </motion.p>
                                                <div className="flex justify-center">
                                                    <motion.a
                                                        initial={animationConfig.initial}
                                                        whileInView={animationConfig.whileInView}
                                                        exit={animationConfig.exit}
                                                        transition={{
                                                            duration: 0.5,
                                                            delay: 0.3,
                                                        }}
                                                        href="https://maps.app.goo.gl/PaFQo5daoE74Acgh7"
                                                        target="_blank"
                                                        className="px-5 py-2 mt-4 rounded-3xl border border-[#483C32] text-[#483C32]  font-normal text-sm"
                                                    >
                                                        <i className="fa-solid fa-map-location"></i>{' '}
                                                        Lihat Maps
                                                    </motion.a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-white rounded-tl-[160px] mt-14">
                                            <img
                                                src={'/assets/images/image-10.webp'}
                                                alt="image flower"
                                                className="w-full h-64 object-cover object-[50%_35%] rounded-tl-[160px]"
                                            />
                                            <div className="bg-[#483C32] py-4 px-4">
                                                <motion.h6
                                                    initial={animationConfig.initial}
                                                    whileInView={animationConfig.whileInView}
                                                    exit={animationConfig.exit}
                                                    transition={{ duration: 0.5, delay: 0.3 }}
                                                    className="text-center analogue-font text-white font-normal italic text-3xl"
                                                >
                                                    Resepsi
                                                </motion.h6>
                                            </div>
                                            <div className="bg-white px-6 pb-6">
                                                <div className="flex gap-4 items-center border-b border-[#483C32] border-opacity-30 justify-center">
                                                    <h6 className="text-[70px] text-[#483C32] quicksand-font font-normal">
                                                        27
                                                    </h6>
                                                    <div className="flex flex-col gap-1">
                                                        <p className="text-[#483C32] quicksand-font">
                                                            Minggu,
                                                        </p>
                                                        <p className="text-[#483C32] quicksand-font">
                                                            April 2025
                                                        </p>
                                                    </div>
                                                </div>
                                                <motion.p
                                                    initial={animationConfig.initial}
                                                    whileInView={animationConfig.whileInView}
                                                    exit={animationConfig.exit}
                                                    transition={{ duration: 0.5, delay: 0.3 }}
                                                    className="text-sm leading-6 font-normal mt-4 mb-2 quicksand-font text-[#483C32] text-center"
                                                >
                                                    <i className="fa-solid fa-clock mr-2"></i>
                                                    09.00 WIB
                                                </motion.p>
                                                <motion.p
                                                    initial={animationConfig.initial}
                                                    whileInView={animationConfig.whileInView}
                                                    exit={animationConfig.exit}
                                                    transition={{ duration: 0.5, delay: 0.3 }}
                                                    className="text-sm leading-6 font-normal quicksand-font text-[#483C32] text-center"
                                                >
                                                    {' '}
                                                    Lokasi : Dk Krajan Rt 01 Rw 02 Ds Keborangan Kec
                                                    Subah Kab Batang
                                                </motion.p>
                                                <div className="flex justify-center">
                                                    <motion.a
                                                        initial={animationConfig.initial}
                                                        whileInView={animationConfig.whileInView}
                                                        exit={animationConfig.exit}
                                                        transition={{
                                                            duration: 0.5,
                                                            delay: 0.3,
                                                        }}
                                                        href="https://maps.app.goo.gl/PaFQo5daoE74Acgh7"
                                                        target="_blank"
                                                        className="px-5 py-2 mt-4 rounded-3xl border border-[#483C32] text-[#483C32]  font-normal text-sm"
                                                    >
                                                        <i className="fa-solid fa-map-location"></i>{' '}
                                                        Lihat Maps
                                                    </motion.a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* SECTION  GALLERY  */}
                                <section className="w-full bg-white  relative pt-10 pb-0 overflow-hidden ">
                                    <div className="flex justify-center px-6">
                                        <div className="relative pb-12 mr-10">
                                            <h2 className="analogue-font text-[#534b53] text-[32px] italic">
                                                Momen
                                            </h2>
                                            <span className="viva-font text-[#534b53] text-[32px] italic absolute bottom-7 left-10">
                                                Bahagia
                                            </span>
                                        </div>
                                    </div>
                                    <motion.div
                                        initial={animationConfig.initial}
                                        whileInView={animationConfig.whileInView}
                                        exit={animationConfig.exit}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                        className=" w-full h-full overflow-hidden mx-auto bg-[#F9E4BC]"
                                    >
                                        <ModalImage
                                            small={'/assets/images/couple-sm-1.webp'}
                                            large={'/assets/images/image-8.webp'}
                                            alt=""
                                        />
                                        <ModalImage
                                            small={'/assets/images/couple-sm-2.webp'}
                                            large={'/assets/images/image-1.webp'}
                                            alt=""
                                        />
                                        <ModalImage
                                            small={'/assets/images/couple-sm-3.webp'}
                                            large={'/assets/images/image-2.webp'}
                                            alt=""
                                        />
                                        <ModalImage
                                            small={'/assets/images/couple-sm-4.webp'}
                                            large={'/assets/images/image-4.webp'}
                                            alt=""
                                        />
                                        <ModalImage
                                            small={'/assets/images/couple-sm-5.webp'}
                                            large={'/assets/images/image-3.webp'}
                                            alt=""
                                        />
                                        <ModalImage
                                            small={'/assets/images/couple-sm-6.webp'}
                                            large={'/assets/images/image-5.webp'}
                                            alt=""
                                        />
                                        <ModalImage
                                            small={'/assets/images/couple-sm-7.webp'}
                                            large={'/assets/images/image-7.webp'}
                                            alt=""
                                        />
                                        <ModalImage
                                            small={'/assets/images/couple-sm-8.webp'}
                                            large={'/assets/images/image-6.webp'}
                                            alt=""
                                        />
                                        <ModalImage
                                            small={'/assets/images/couple-sm-9.webp'}
                                            large={'/assets/images/image-10.webp'}
                                            alt=""
                                        />
                                        <ModalImage
                                            small={'/assets/images/couple-sm-11.webp'}
                                            large={'/assets/images/image-9.webp'}
                                            alt=""
                                        />
                                    </motion.div>
                                </section>

                                {/* SECTION GIFT */}
                                <section className=" w-full bg-[#483C32] relative py-10 bg-opacity-90  overflow-hidden ">
                                    <div className="  py-10 px-10 w-full flex flex-col gap-6 ">
                                        <Image
                                            src={'/assets/images/tl.webp'}
                                            alt="image flower"
                                            className="absolute top-0 left-0"
                                            width={140}
                                            height={140}
                                        />
                                        <Image
                                            src={'/assets/images/br.webp'}
                                            alt="image flower"
                                            className="absolute bottom-0 right-0"
                                            width={140}
                                            height={140}
                                        />
                                        <div
                                            style={{
                                                background: 'url(/assets/images/bg-2.webp)',
                                            }}
                                            className="bg-[#483C32] p-4 rounded-2xl  flex flex-col gap-5 !bg-cover !bg-no-repeat !bg-bottom"
                                        >
                                            <motion.h6
                                                initial={animationConfig.initial}
                                                whileInView={animationConfig.whileInView}
                                                exit={animationConfig.exit}
                                                transition={{ duration: 0.5, delay: 0.3 }}
                                                className="text-center viva-font text-[#483C32] mt-3 font-medium text-4xl"
                                            >
                                                Wedding Gift
                                            </motion.h6>
                                            <div className="flex flex-col gap-1 ">
                                                <motion.p
                                                    initial={animationConfig.initial}
                                                    whileInView={animationConfig.whileInView}
                                                    exit={animationConfig.exit}
                                                    transition={{ duration: 0.5, delay: 0.3 }}
                                                    className="text-sm leading-6 font-normal quicksand-font text-[#483C32] text-center"
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
                                                    className="text-sm leading-6 font-normal quicksand-font text-[#483C32] text-center"
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
                                                            className="px-6 py-2 w-48 rounded-3xl border border-[#483C32] text-[#483C32] xl:text-xl 2xl:text-xl"
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
                                                            className="px-6 py-2  w-48 rounded-3xl border border-[#483C32] text-[#483C32] xl:text-xl 2xl:text-xl"
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
                                                    className="bg-[#483C32] p-4 rounded-2xl  flex flex-col gap-5 !bg-cover !bg-no-repeat !bg-bottom"
                                                >
                                                    <div className="flex flex-col gap-1 ">
                                                        <motion.img
                                                            initial={animationConfig.initial}
                                                            whileInView={
                                                                animationConfig.whileInView
                                                            }
                                                            exit={animationConfig.exit}
                                                            transition={{ duration: 0.5, delay: 0 }}
                                                            src="/assets/pattern/mandiri.png"
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
                                                            className="text-md leading-6 font-semibold quicksand-font text-[#483C32] text-center"
                                                        >
                                                            1390029292608
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
                                                            className="text-md leading-6 font-semibold quicksand-font text-[#483C32] text-center"
                                                        >
                                                            ULFATUL KHASANAH
                                                        </motion.p>

                                                        <div className="flex flex-col mb-6 mt-6">
                                                            <div className="flex justify-center">
                                                                <CopyToClipboard textToCopy="1390029292608" />
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
                                                className="bg-[#483C32] p-4 rounded-2xl  flex flex-col gap-5 !bg-cover !bg-no-repeat !bg-bottom"
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
                                                            className="fa-solid fa-gifts text-4xl my-6 text-[#483C32]"
                                                        ></motion.i>
                                                    </div>
                                                    <motion.p
                                                        initial={animationConfig.initial}
                                                        whileInView={animationConfig.whileInView}
                                                        exit={animationConfig.exit}
                                                        transition={{ duration: 0.5, delay: 0.3 }}
                                                        className="text-md leading-6 font-semibold quicksand-font text-[#483C32] text-center"
                                                    >
                                                        {' '}
                                                        Kirim kado ke alamat
                                                    </motion.p>
                                                    <motion.p
                                                        initial={animationConfig.initial}
                                                        whileInView={animationConfig.whileInView}
                                                        exit={animationConfig.exit}
                                                        transition={{ duration: 0.5, delay: 0.8 }}
                                                        className="text-md leading-6 font-normal quicksand-font text-[#483C32] text-center"
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
                                                        className="text-md leading-6 font-semibold quicksand-font text-[#483C32] text-center mt-3"
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
                                        background: 'url(/assets/images/bg-new-2.webp)',
                                    }}
                                    className="flex flex-col gap-4 bg-slate-200  min-h-screen py-10 !bg-cover !bg-no-repeat !bg-top relative overflow-hidden"
                                >
                                    <motion.h6
                                        initial={animationConfig.initial}
                                        whileInView={animationConfig.whileInView}
                                        exit={animationConfig.exit}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                        className="text-center viva-font text-[#483C32] mt-3 font-medium text-4xl"
                                    >
                                        Ucapan Terbaik
                                    </motion.h6>
                                    <motion.p
                                        initial={animationConfig.initial}
                                        whileInView={animationConfig.whileInView}
                                        exit={animationConfig.exit}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                        className="text-sm leading-5 font-normal quicksand-font text-[#483C32] text-center"
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
                                                className="w-full border-slate-100 p-3 rounded-xl border mb-4 text-[#483C32]"
                                            />
                                            <textarea
                                                placeholder="Ucapan"
                                                value={message}
                                                onChange={e => setMessage(e.target.value)}
                                                required
                                                className="w-full border-slate-100 p-3 rounded-xl border mb-4 text-[#483C32]"
                                            />
                                            <button
                                                type="submit"
                                                className="px-6 py-3  w-full rounded-3xl border border-[#483C32] text-[#483C32]  xl:text-xl 2xl:text-xl"
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
                                                    <strong className="quicksand-font text-[#483C32]">
                                                        {comment.name}
                                                    </strong>
                                                    <p className="quicksand-font  text-[#483C32]">
                                                        {comment.message}
                                                    </p>
                                                    <p className="quicksand-font  text-[#483C32] text-xs pb-1">
                                                        {moment(
                                                            (
                                                                comment.timestamp as Timestamp
                                                            ).toDate(),
                                                        )
                                                            .locale('id')
                                                            .format('dddd, DD MMMM YYYY')}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>

                                {/* SECTION  TERIMAKASIH */}
                                <section
                                    style={{
                                        background: 'url(/assets/images/image-1.webp)',
                                    }}
                                    className=" w-full !bg-cover !bg-no-repeat !bg-bottom bg-[#483C32] relative pb-20 pt-80  flex flex-col justify-end overflow-hidden "
                                >
                                    <div className="absolute bottom-0 left-0 right-0 h-full bg-transition-bottom"></div>
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
                                            className="text-center viva-font text-white mt-3 font-medium text-5xl mb-6"
                                        >
                                            Ulfa & Ahmad
                                        </motion.h6>
                                        <div className="">
                                            <motion.p
                                                initial={animationConfig.initial}
                                                whileInView={animationConfig.whileInView}
                                                exit={animationConfig.exit}
                                                transition={{ duration: 0.5, delay: 0.3 }}
                                                className=" text-sm leading-5 font-normal quicksand-font text-white text-center"
                                            >
                                                Made by{' '}
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
                                        className="w-10 h-10 flex justify-center items-center bg-[#483C32] text-white rounded-full shadow-lg"
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
