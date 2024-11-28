<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Cadastrar Currículo</h2>
    <form @submit.prevent="submitForm" class="space-y-4">
      <div>
        <label for="nome" class="block mb-1">Nome completo</label>
        <input type="text" id="nome" v-model="form.nome" required class="w-full px-3 py-2 border rounded">
      </div>
      <div>
        <label for="email" class="block mb-1">E-mail</label>
        <input type="email" id="email" v-model="form.email" required class="w-full px-3 py-2 border rounded">
      </div>
      <div>
        <label for="telefone" class="block mb-1">Telefone</label>
        <input type="tel" id="telefone" v-model="form.telefone" required class="w-full px-3 py-2 border rounded">
      </div>
      <div>
        <label for="endereco" class="block mb-1">Endereço completo</label>
        <input type="text" id="endereco" v-model="form.endereco" required class="w-full px-3 py-2 border rounded">
      </div>
      <div>
        <h3 class="font-bold mb-2">Formação acadêmica</h3>
        <div v-for="(formacao, index) in form.formacaoAcademica" :key="index" class="space-y-2 mb-2">
          <input type="text" v-model="formacao.curso" placeholder="Curso" class="w-full px-3 py-2 border rounded">
          <input type="text" v-model="formacao.instituicao" placeholder="Instituição" class="w-full px-3 py-2 border rounded">
          <input type="number" v-model="formacao.anoConclusao" placeholder="Ano de conclusão" class="w-full px-3 py-2 border rounded">
        </div>
        <button @click="addFormacao" type="button" class="bg-blue-600 text-white px-4 py-2 rounded">Adicionar Formação</button>
      </div>
      <div>
        <h3 class="font-bold mb-2">Experiência profissional</h3>
        <div v-for="(experiencia, index) in form.experienciaProfissional" :key="index" class="space-y-2 mb-2">
          <input type="text" v-model="experiencia.empresa" placeholder="Empresa" class="w-full px-3 py-2 border rounded">
          <input type="text" v-model="experiencia.cargo" placeholder="Cargo" class="w-full px-3 py-2 border rounded">
          <input type="text" v-model="experiencia.periodo" placeholder="Período" class="w-full px-3 py-2 border rounded">
        </div>
        <button @click="addExperiencia" type="button" class="bg-blue-600 text-white px-4 py-2 rounded">Adicionar Experiência</button>
      </div>
      <div>
        <label for="habilidades" class="block mb-1">Habilidades (separadas por vírgula)</label>
        <input type="text" id="habilidades" v-model="form.habilidades" class="w-full px-3 py-2 border rounded">
      </div>
      <div>
        <label for="idiomas" class="block mb-1">Idiomas (separados por vírgula)</label>
        <input type="text" id="idiomas" v-model="form.idiomas" class="w-full px-3 py-2 border rounded">
      </div>
      <div>
        <label for="objetivo" class="block mb-1">Objetivo profissional</label>
        <textarea id="objetivo" v-model="form.objetivo" rows="3" class="w-full px-3 py-2 border rounded"></textarea>
      </div>
      <button type="submit" class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700" :disabled="isSubmitting">
        {{ isSubmitting ? 'Cadastrando...' : 'Cadastrar Currículo' }}
      </button>
    </form>
    <div v-if="message" :class="['mt-4 p-4 rounded', message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700']">
      {{ message.text }}
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'

const form = reactive({
  nome: '',
  email: '',
  telefone: '',
  endereco: '',
  formacaoAcademica: [{ curso: '', instituicao: '', anoConclusao: '' }],
  experienciaProfissional: [{ empresa: '', cargo: '', periodo: '' }],
  habilidades: '',
  idiomas: '',
  objetivo: ''
})

const isSubmitting = ref(false)
const message = ref(null)

const addFormacao = () => {
  form.formacaoAcademica.push({ curso: '', instituicao: '', anoConclusao: '' })
}

const addExperiencia = () => {
  form.experienciaProfissional.push({ empresa: '', cargo: '', periodo: '' })
}

const submitForm = async () => {
  isSubmitting.value = true
  message.value = null

  try {
    const formData = {
      ...form,
      habilidades: form.habilidades.split(',').map(item => item.trim()),
      idiomas: form.idiomas.split(',').map(item => item.trim())
    }

    const response = await axios.post('http://localhost:3000/api/cadastrar', formData)
    
    if (response.status === 201) {
      message.value = { type: 'success', text: 'Currículo cadastrado com sucesso!' }
      // Limpar o formulário
      Object.keys(form).forEach(key => {
        if (Array.isArray(form[key])) {
          form[key] = [{}]
        } else {
          form[key] = ''
        }
      })
    }
  } catch (error) {
    console.error('Erro ao cadastrar currículo:', error)
    message.value = { type: 'error', text: 'Erro ao cadastrar currículo. Por favor, tente novamente.' }
  } finally {
    isSubmitting.value = false
  }
}
</script>