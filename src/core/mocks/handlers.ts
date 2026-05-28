import { delay, HttpResponse, http } from "msw"
import { faker } from '@faker-js/faker';


const planoId = String(faker.number.int({ min: 1, max: 999 })).padStart(6, '0');


// Importando a sua massa de dados real
import userData from './user.json'
import garagesData from './garages.json'
import garageDetailsData from './garage-details.json'
import garagePlansData from './garage-plans.json'


// Armazenando em memória variável para permitir mutações (Criar / Editar / Listar)
let dbGarages = [...garagesData]
let dbGarageDetails = [...garageDetailsData]
let dbGaragePlans = [...garagePlansData]

export const handlers = [
  // 1. ENDPOINT DE AUTENTICAÇÃO (Login)
  http.post('/api/auth/sign-in', async ({ request }) => {
    await delay(600)
    const { username, password } = await request.json() as any

    if (
      (username === userData.username || username === userData.name) && 
      password === userData.password
    ) {
      return HttpResponse.json({
        user: {
          name: userData.name,
          username: userData.username,
          avatar: userData.avatar,
          role: userData.role
        },
        token: "jwt-token-fake-estapar-b2b"
      }, { status: 200 })
    }

    return HttpResponse.json(
      { message: "Usuário ou senha incorretos." }, 
      { status: 401 }
    )
  }),

  // 2. LISTAGEM DE GARAGENS (Tabela Principal com Filtros)
  http.get('*/api/garagens', async ({ request }) => {
    await delay(500)
    const url = new URL(request.url)
    const search = url.searchParams.get('search')?.toLowerCase()

    let responseData = [...dbGarages]

    // Aplica filtro de busca por nome se o gestor digitar no input
    if (search) {
      responseData = responseData.filter(g => 
        g.name.toLowerCase().includes(search) || 
        g.id.includes(search)
      )
    }

    return HttpResponse.json( responseData)
  }),

  // 3. DETALHES DE UMA GARAGEM ESPECÍFICA (Dados de Vagas + QR Code)
  http.get('*/api/garagens/:id', async ({ params }) => {
    await delay(300)
    const { id } = params

    const details = dbGarageDetails.find(d => d.garageId === id)
    const baseGarage = dbGarages.find(g => g.id === id)

    if (!details || !baseGarage) {
      return HttpResponse.json({ message: "Garagem não encontrada" }, { status: 404 })
    }

    // Retorna a junção das informações da garagem com os detalhes de ocupação
    return HttpResponse.json({
      ...baseGarage,
      ...details
    })
  }),

  // 4. LISTAR PLANOS DE UMA GARAGEM ESPECÍFICA (Aba do Sheet de Detalhes)
  http.get('*/api/garagens/:id/planos', async ({ params }) => {
    await delay(400)
    const { id } = params

    // Filtra no banco de planos apenas aqueles que pertencem à garagem selecionada
    const planosDaGaragem = dbGaragePlans.filter(p => p.garageId === id)
    
    return HttpResponse.json(planosDaGaragem)
  }),

  // 5. CRIAR NOVO PLANO PARA UMA GARAGEM (O seu Modal)
  http.post('*/api/planos', async ({ request }) => {
    await delay(600)
    const novoPlano = await request.json() as any

    // Estrutura o novo plano exatamente no formato que o seu garage-plans.json usa
    const planoSalvo = {
      id:planoId,
      garageId: novoPlano.garageId, // O ID da garagem ativa no momento
      description: novoPlano.description,
      vehicleType: novoPlano.vehicleType,
      totalSpotsByVehicleType: Number(novoPlano.totalSpotsByVehicleType),
      price: Number(novoPlano.price),
      cancellationFee: Number(novoPlano.cancellationFee || 0),
      validityStart: novoPlano.validityStart,
      validityEnd: novoPlano.validityEnd
    }

    // Dá o push no nosso "banco de dados" fake em memória
    dbGaragePlans.unshift(planoSalvo)

    return HttpResponse.json(planoSalvo, { status: 201 })
  })
]