import FileSaver from 'file-saver'

export default function downloadImage(_id: string, photo: string) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`)
}