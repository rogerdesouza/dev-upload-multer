const express = require('express')
const multer = require('multer')
const path = require('path')

const app = express()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '..', '..', 'uploads', 'sge'))
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
        // ou originalmente
        // cb(null, file.originalname)
    }
})

const upload = multer({ storage })

app.use(express.static('public'))

app.post('/file/upload', upload.single('file'), 
    (req, res) => res.send('<h2>Upload realizado com sucesso</h2>'));

app.listen(3003, () => console.log('App na porta 3003'))