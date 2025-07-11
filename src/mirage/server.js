import { createServer, Response } from "miragejs"

export function makeServer({ environment = "development" } = {}) {
  console.log("Mirage server started")

  return createServer({
    environment,
    routes() {
      this.namespace = "api"

     let shipments = [
        {
          id: 1,
          origin: "Jakarta",
          destination: "Bandung",
          status: "Not Assigned",
          vehicle: "Truck",
          route: "Via Toll",
          transporter: null
        },
        {
          id: 2,
          origin: "Surabaya",
          destination: "Bali",
          status: "Assigned",
          vehicle: "Van",
          route: "Via Ferry",
          transporter: "PT. Kirim Cepat"
        },
        {
          id: 3,
          origin: "Medan",
          destination: "Padang",
          status: "Not Assigned",
          vehicle: "Truck",
          route: "Lintas Sumatera",
          transporter: null
        },
        {
          id: 4,
          origin: "Yogyakarta",
          destination: "Semarang",
          status: "Assigned",
          vehicle: "Pickup",
          route: "Via Jalan Nasional",
          transporter: "PT. Angkut Aman"
        },
        {
          id: 5,
          origin: "Makassar",
          destination: "Manado",
          status: "Not Assigned",
          vehicle: "Truck",
          route: "Via Laut",
          transporter: null
        },
        {
          id: 6,
          origin: "Palembang",
          destination: "Lampung",
          status: "Assigned",
          vehicle: "Van",
          route: "Trans Sumatera",
          transporter: "PT. Logistik Hebat"
        },
        {
          id: 7,
          origin: "Pontianak",
          destination: "Samarinda",
          status: "Not Assigned",
          vehicle: "Truck",
          route: "Via Jalan Kalimantan",
          transporter: null
        },
        {
          id: 8,
          origin: "Balikpapan",
          destination: "Banjarmasin",
          status: "Assigned",
          vehicle: "Truck",
          route: "Via Jalan Kalimantan",
          transporter: "PT. Kirim Cepat"
        },
        {
          id: 9,
          origin: "Kupang",
          destination: "Ende",
          status: "Not Assigned",
          vehicle: "Pickup",
          route: "Via Jalur NTT",
          transporter: null
        },
        {
          id: 10,
          origin: "Jayapura",
          destination: "Merauke",
          status: "Assigned",
          vehicle: "Truck",
          route: "Via Papua Route",
          transporter: "PT. Logistik Hebat"
        }
      ]

      this.get("/shipments", () => shipments)

      this.post("/shipments/:id/assign", (schema, request) => {
        const id = parseInt(request.params.id)
        const { transporter } = JSON.parse(request.requestBody)
        const shipment = shipments.find(s => s.id === id)
        if (shipment) {
          shipment.transporter = transporter
          shipment.status = "Assigned"
          return { success: true }
        } else {
          return new Response(404, {}, { error: "Not found" })
        }
      })
    }
  })
}