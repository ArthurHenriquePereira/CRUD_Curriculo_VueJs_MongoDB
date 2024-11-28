<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Currículos Cadastrados</h2>
    <div v-if="loading" class="text-center text-gray-600">
      Carregando currículos...
    </div>
    <div v-else-if="error" class="text-center text-red-600">
      {{ error }}
    </div>
    <div v-else-if="curriculos.length === 0" class="text-center text-gray-600">
      Nenhum currículo cadastrado ainda.
    </div>
    <div v-else class="space-y-4">
      <div v-for="curriculo in curriculos" :key="curriculo._id" class="bg-white p-4 rounded-lg shadow">
        <h3 class="text-xl font-bold mb-2">{{ curriculo.nome }}</h3>
        <p><strong>E-mail:</strong> {{ curriculo.email }}</p>
        <p><strong>Telefone:</strong> {{ curriculo.telefone }}</p>
        <p><strong>Endereço:</strong> {{ curriculo.endereco }}</p>
        <h4 class="font-bold mt-2">Formação Acadêmica</h4>
        <ul class="list-disc list-inside">
          <li v-for="(formacao, index) in curriculo.formacaoAcademica" :key="index">
            {{ formacao.curso }} - {{ formacao.instituicao }} ({{ formacao.anoConclusao }})
          </li>
        </ul>
        <h4 class="font-bold mt-2">Experiência Profissional</h4>
        <ul class="list-disc list-inside">
          <li v-for="(experiencia, index) in curriculo.experienciaProfissional" :key="index">
            {{ experiencia.cargo }} em {{ experiencia.empresa }} ({{ experiencia.periodo }})
          </li>
        </ul>
        <p><strong>Habilidades:</strong> {{ curriculo.habilidades.join(', ') }}</p>
        <p><strong>Idiomas:</strong> {{ curriculo.idiomas.join(', ') }}</p>
        <p><strong>Objetivo Profissional:</strong> {{ curriculo.objetivo }}</p>
        <div class="mt-4 space-x-2">
          <button @click="editarCurriculo(curriculo)" class="bg-blue-600 text-white px-4 py-2 rounded">Editar</button>
          <button @click="excluirCurriculo(curriculo._id)" class="bg-red-600 text-white px-4 py-2 rounded">Excluir</button>
        </div>
      </div>
    </div>

    <!-- Modal de edição -->
    <div v-if="curriculoEmEdicao" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 class="text-lg font-bold mb-4">Editar Currículo</h3>
        <form @submit.prevent="salvarEdicao" class="space-y-4">
          <div>
            <label for="nome" class="block mb-1">Nome completo</label>
            <input type="text" id="nome" v-model="curriculoEmEdicao.nome" required class="w-full px-3 py-2 border rounded">
          </div>
          <div>
            <label for="email" class="block mb-1">E-mail</label>
            <input type="email" id="email" v-model="curriculoEmEdicao.email" required class="w-full px-3 py-2 border rounded">
          </div>
          <div>
            <label for="telefone" class="block mb-1">Telefone</label>
            <input type="tel" id="telefone" v-model="curriculoEmEdicao.telefone" required class="w-full px-3 py-2 border rounded">
          </div>
          <div>
            <label for="endereco" class="block mb-1">Endereço</label>
            <input type="text" id="endereco" v-model="curriculoEmEdicao.endereco" required class="w-full px-3 py-2 border rounded">
          </div>
          <!-- Adicione campos para formação acadêmica, experiência profissional, habilidades, idiomas e objetivo -->
          <div class="flex justify-end space-x-2">
            <button type="button" @click="cancelarEdicao" class="bg-gray-300 text-black px-4 py-2 rounded">Cancelar</button>
            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const curriculos = ref([])
const loading = ref(true)
const error = ref(null)
const curriculoEmEdicao = ref(null)

const API_URL = 'http://localhost:3000/api'

const fetchCurriculos = async () => {
  try {
    loading.value = true
    const response = await axios.get(`${API_URL}/curriculos`)
    curriculos.value = response.data
  } catch (err) {
    console.error('Erro ao buscar currículos:', err)
    error.value = 'Ocorreu um erro ao carregar os currículos. Por favor, tente novamente mais tarde.'
  } finally {
    loading.value = false
  }
}

const editarCurriculo = (curriculo) => {
  curriculoEmEdicao.value = { ...curriculo }
}

const cancelarEdicao = () => {
  curriculoEmEdicao.value = null
}

const salvarEdicao = async () => {
  try {
    const response = await axios.put(`${API_URL}/curriculos/${curriculoEmEdicao.value._id}`, curriculoEmEdicao.value)
    const index = curriculos.value.findIndex(c => c._id === response.data._id)
    if (index !== -1) {
      curriculos.value[index] = response.data
    }
    curriculoEmEdicao.value = null
  } catch (err) {
    console.error('Erro ao salvar currículo:', err)
    alert('Ocorreu um erro ao salvar o currículo. Por favor, tente novamente.')
  }
}

const excluirCurriculo = async (id) => {
  if (confirm('Tem certeza que deseja excluir este currículo?')) {
    try {
      await axios.delete(`${API_URL}/curriculos/${id}`)
      curriculos.value = curriculos.value.filter(c => c._id !== id)
    } catch (err) {
      console.error('Erro ao excluir currículo:', err)
      alert('Ocorreu um erro ao excluir o currículo. Por favor, tente novamente.')
    }
  }
}

onMounted(() => {
  fetchCurriculos()
})
</script>