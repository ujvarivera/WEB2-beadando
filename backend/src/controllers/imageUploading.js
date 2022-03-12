import multer from 'multer'
import path from 'path'
import Avatar from '../models/Avatar.js'

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(path.dirname('.'), 'images'))
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        cb(null, req.user + ext)
    }
})

export const upload = multer({ storage: fileStorage })

export const fileUploading = async(req, res) => {
    try {
        const location = '/api/files/' + req.file.filename
        const created = await Avatar.create({ avatar: location, userId: req.user })
        res.json(location)
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({message: "You already have a profile pic"})
            return
        }
        res.json(error.message)
    }
}

export const avatarLocation = async(req, res) => {
    try {
        const pic = await Avatar.findOne({ userId: req.user })
        res.json(pic)
    } catch (error) {
        res.json('you have no profile pic')
    }
}

export const deleteAvatar = async(req,res) => {
    const id  = req.params.id
    const deleted = await Avatar.findByIdAndDelete(id)
    res.json({ message: 'You successfully deleted your profile pic' })    
}