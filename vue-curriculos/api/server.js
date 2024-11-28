import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined in the environment variables')
    process.exit(1)
}

mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('Could not connect to MongoDB:')
        console.error('Error name:', err.name)
        console.error('Error message:', err.message)
        if (err.reason) console.error('Error reason:', err.reason)
        if (err.code) console.error('Error code:', err.code)
        if (err.stack) console.error('Error stack:', err.stack)
        process.exit(1)
    })

// Define o modelo de Currículo
const curriculoSchema = new mongoose.Schema({
    nome: String,
    email: String,
    telefone: String,
    endereco: String,
    formacaoAcademica: [{
        curso: String,
        instituicao: String,
        anoConclusao: Number
    }],
    experienciaProfissional: [{
        empresa: String,
        cargo: String,
        periodo: String
    }],
    habilidades: [String],
    idiomas: [String],
    objetivo: String
})

const Curriculo = mongoose.model('Curriculo', curriculoSchema)

// Rota para cadastrar um novo currículo
app.post('/api/cadastrar', async (req, res) => {
    try {
        const novoCurriculo = new Curriculo(req.body)
        await novoCurriculo.save()
        res.status(201).json(novoCurriculo)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Rota para obter todos os currículos
app.get('/api/curriculos', async (req, res) => {
    try {
        const curriculos = await Curriculo.find()
        res.json(curriculos)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Rota para obter um currículo específico
app.get('/api/curriculos/:id', async (req, res) => {
    try {
        const curriculo = await Curriculo.findById(req.params.id)
        if (curriculo) {
            res.json(curriculo)
        } else {
            res.status(404).json({ message: 'Currículo não encontrado' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Rota para atualizar um currículo
app.put('/api/curriculos/:id', async (req, res) => {
    try {
        const curriculo = await Curriculo.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (curriculo) {
            res.json(curriculo)
        } else {
            res.status(404).json({ message: 'Currículo não encontrado' })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Rota para excluir um currículo
app.delete('/api/curriculos/:id', async (req, res) => {
    try {
        const curriculo = await Curriculo.findByIdAndDelete(req.params.id)
        if (curriculo) {
            res.json({ message: 'Currículo excluído com sucesso' })
        } else {
            res.status(404).json({ message: 'Currículo não encontrado' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})