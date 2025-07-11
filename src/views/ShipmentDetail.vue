<template>
  <div class="p-6 max-w-3xl mx-auto">
    <router-link to="/" class="text-blue-500 hover:underline mb-6 inline-block">← Kembali ke daftar</router-link>

    <div v-if="shipment" class="bg-white border shadow rounded p-6">
      <h1 class="text-3xl font-bold mb-6 text-gray-800">📦 Detail Pengiriman</h1>

      <div class="space-y-2 text-gray-700">
        <p><strong>🚗 Rute:</strong> {{ shipment.route }}</p>
        <p><strong>🚚 Kendaraan:</strong> {{ shipment.vehicle }}</p>
        <p>
          <strong>📌 Status:</strong>
          <span :class="shipment.status === 'Assigned' ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'">
            {{ shipment.status }}
          </span>
        </p>
        <p><strong>🏢 Transporter:</strong> {{ shipment.transporter || 'Belum Ditentukan' }}</p>
      </div>

      <div class="mt-6 border-t pt-4">
        <label class="block mb-2 font-medium text-gray-800">Assign Transporter:</label>
        <select v-model="selected" class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300">
          <option disabled value="">-- Pilih transporter --</option>
          <option>PT. Kirim Cepat</option>
          <option>PT. Angkut Aman</option>
          <option>PT. Logistik Hebat</option>
        </select>

        <button
          @click="assign"
          class="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded shadow"
        >
          Simpan
        </button>

        <p v-if="success" class="text-green-600 mt-3">✅ Berhasil assign transporter</p>
      </div>
    </div>

    <div v-else class="text-gray-500">🔄 Loading data pengiriman...</div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useShipmentStore } from '../stores/shipment'
import { ref, computed, onMounted } from 'vue'

const store = useShipmentStore()
const route = useRoute()

const shipment = computed(() =>
  store.shipments.find(s => s.id === parseInt(route.params.id))
)

const selected = ref('')
const success = ref(false)

function assign() {
  if (!selected.value) return
  store.assignTransporter(parseInt(route.params.id), selected.value).then(result => {
    success.value = result
  })
}

onMounted(() => {
  if (store.shipments.length === 0) store.loadShipments()
})
</script>
