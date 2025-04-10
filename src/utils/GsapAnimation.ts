import { Variants } from 'framer-motion'

export const grassVariants: Variants = {
    initial: { rotate: 0 },
    sway: {
        rotate: [-3, 3, -3],
        transition: {
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'mirror',
        },
    },
}
export const grassVariants2: Variants = {
    initial: { rotate: 0 },
    sway: {
        rotate: [-1, 1, -1],
        transition: {
            duration: 3,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'mirror',
        },
    },
}

export const cambodiaVariants: Variants = {
    initial: { y: -100, opacity: 0 },
    animate: (i: number) => ({
        y: [0, 1000],
        x: [0, (i % 2 === 0 ? 1 : -1) * (Math.random() * 300)],
        opacity: 1,
        rotate: [0, 360],
        transition: {
            duration: 5 + Math.random() * 2,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
        },
    }),
}
export const cambodiaVariants2: Variants = {
    initial: {
        y: -100,
        x: typeof window !== 'undefined' ? window.innerWidth : 0,
        opacity: 0,
    },
    animate: () => ({
        y: [0, 1000], // Gerakan vertikal dari posisi awal ke bawah
        x: [
            typeof window !== 'undefined' ? window.innerWidth : 0,
            typeof window !== 'undefined' ? window.innerWidth - Math.random() * 300 : 0,
        ], // Gerakan horizontal
        opacity: 1,
        rotate: [0, 360],
        transition: {
            duration: 5 + Math.random() * 2,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
        },
    }),
}

export const FadeIn: Variants = {
    hidden: {
        y: 20,
        x: 0,
        opacity: 0,
    },
    visible: {
        y: 0,
        x: 0,
        opacity: 1,
    },
    exit: {
        y: -5,
        x: 0,
        opacity: 0,
    },
}

export const FadeIn2: Variants = {
    hidden: {
        y: 0,
        x: 0,
        opacity: 0,
    },
    visible: {
        y: 0,
        x: 0,
        opacity: 1,
    },
    exit: {
        y: 0,
        x: 0,
        opacity: 0,
    },
}
export const FadeOut: Variants = {
    hidden: {
        y: 0,
        x: 0,
        opacity: 1,
    },
    visible: {
        y: 0,
        x: 0,
        opacity: 1,
    },
    exit: {
        y: 0,
        x: 0,
        opacity: 0,
    },
}
export const FadeIn3: Variants = {
    hidden: {
        y: 0,
        x: 0,
        opacity: 0,
    },
    visible: {
        y: 0,
        x: 0,
        opacity: 1,
    },
    exit: {
        y: 0,
        x: 0,
        opacity: 0,
    },
}

export const FadeInZoomIn: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 1.5 },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.5 } },
}

export const animationConfig = {
    initial: { opacity: 0, y: 20, x: 0 }, // Status awal
    whileInView: { opacity: 1, y: 0, x: 0 }, // Status saat berada di viewport
    exit: { opacity: 0, y: 20, x: 0 },
}

export const fadeFromLeftConfig = {
    initial: { opacity: 0, y: 0, x: -40 }, // Status awal
    whileInView: { opacity: 1, y: 0, x: 0 }, // Status saat berada di viewport
    exit: { opacity: 0, y: 0, x: 40 },
}

export const fadeFromRightConfig = {
    initial: { opacity: 0, y: 0, x: 40 }, // Status awal
    whileInView: { opacity: 1, y: 0, x: 0 }, // Status saat berada di viewport
    exit: { opacity: 0, y: 0, x: -40 },
}

export const ZoomIn: Variants = {
    initial: { opacity: 0, y: 0, x: 0 }, // Status awal
    whileInView: { opacity: 1, y: 0, x: 0 }, // Status saat berada di viewport
    exit: { opacity: 0, y: 0, x: 0 },
}

export const ScaleIn: Variants = {
    initial: { opacity: 0, y: 0, x: 0, scale: 0 }, // Status awal
    whileInView: { opacity: 1, y: 0, x: 0, scale: 1 }, // Status saat berada di viewport
    exit: { opacity: 0, y: 0, x: 0, scale: 0 },
}
