declare module 'react-modal-image' {
    import { Component } from 'react'

    export interface ModalImageProps {
        small: string
        large: string
        alt?: string
        className?: string
        hideDownload?: boolean
        hideZoom?: boolean
    }

    export default class ModalImage extends Component<ModalImageProps> {}
}
