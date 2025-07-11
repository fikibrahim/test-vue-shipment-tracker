<template>
  <div class="p-6 max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-gray-800">📦 Daftar Pengiriman</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="s in shipments"
        :key="s.id"
        class="bg-white border rounded-lg shadow hover:shadow-md transition p-4"
      >
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-lg font-semibold text-gray-800">ID: {{ s.id }}</h2>
          <span
            class="text-xs px-2 py-1 rounded-full font-semibold"
            :class="s.status === 'Assigned' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'"
          >
            {{ s.status }}
          </span>
        </div>

        <p class="text-sm text-gray-600 mb-1">
          <strong>Asal:</strong> {{ s.origin }}
        </p>
        <p class="text-sm text-gray-600 mb-3">
          <strong>Tujuan:</strong> {{ s.destination }}
        </p>

        <router-link
          :to="`/shipment/${s.id}`"
          class="inline-flex items-center text-blue-600 text-sm font-medium hover:underline"
        >
          Lihat Detail
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useShipmentStore } from '../stores/shipment'

const store = useShipmentStore()
const shipments = computed(() => store.shipments)

onMounted(() => {
  if (store.shipments.length === 0) store.loadShipments()
})
</script>
