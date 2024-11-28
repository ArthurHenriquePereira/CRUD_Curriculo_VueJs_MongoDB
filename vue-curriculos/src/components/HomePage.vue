<template>
  <div class="text-center">
    <h1 class="text-4xl font-bold mb-4">Bem-vindo ao Sistema de Cadastro de Currículos</h1>
    <p class="text-xl mb-8">Gerencie seus currículos de forma fácil e eficiente.</p>
    <div class="space-x-4">
      <router-link to="/cadastrar" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Cadastrar
        Currículo</router-link>
      <router-link to="/curriculos" class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">Ver
        Currículos</router-link>
    </div>
  </div>
</template>