import './style.css'

const API = import.meta.env.VITE_API_URL

document.querySelector('#app').innerHTML = `
  <h1>Tareas</h1>
  <form id="form">
    <input id="title" placeholder="Nueva tarea" required />
    <button>Agregar</button>
  </form>
  <p id="status"></p>
  <ul id="list"></ul>
`

const list = document.querySelector('#list')
const status = document.querySelector('#status')

async function load() {
  status.textContent = 'Cargando…'
  try {
    const res = await fetch(`${API}/api/tasks`, { headers: { Accept: 'application/json' } })
    const tasks = await res.json()
    list.innerHTML = tasks.map((t) => `<li>${t.title}</li>`).join('')
    status.textContent = `API: ${API}`
  } catch (e) {
    status.textContent = `No se pudo conectar con la API (${API})`
  }
}

document.querySelector('#form').addEventListener('submit', async (e) => {
  e.preventDefault()
  const input = document.querySelector('#title')
  await fetch(`${API}/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ title: input.value }),
  })
  input.value = ''
  load()
})

load()
