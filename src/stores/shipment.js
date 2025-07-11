import { defineStore } from 'pinia'

export const useShipmentStore = defineStore('shipment', {
  state: () => ({
    shipments: []
  }),
  actions: {
    async loadShipments() {
      const res = await fetch('/api/shipments')
      const data = await res.json()
      this.shipments = data
    },
    async assignTransporter(id, transporter) {
      const res = await fetch(`/api/shipments/${id}/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transporter })
      })
      if (res.ok) {
        const s = this.shipments.find(x => x.id === id)
        if (s) {
          s.transporter = transporter
          s.status = 'Assigned'
        }
        return true
      }
      return false
    }
  }
})