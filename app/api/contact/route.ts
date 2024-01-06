import axios from 'axios'
import { NextResponse } from 'next/server'
import { z } from 'zod'

// Foi criado uma validação de informações
const bodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
})
const WEBHOOK_URL = process.env.WEBHOOK_URL!
// esse termo de webhook é usado pelo discord, ou seja isso vem de lá.
// É preciso criar um WEBHOOK_URL no .env.local e colocar a chave/ token lá dentro,pois se trata de uma informação sensivel.
// coloca apenas a array embads, pois vem mais informações.
// para criar customizado as informações do embeds acesse discord embed-builder e customiza o seu.
// é para criar uma mensagem de contato, pois ele vai enviar uma mensagem via api para o discord
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = bodySchema.parse(body)
    const messageData = {
      embeds: [
        {
          title: 'Mensagem de Contato',
          color: 0x4983f5,
          fields: [
            {
              name: 'Nome',
              value: name,
              inline: true,
            },
            {
              name: 'E-mail',
              value: email,
              inline: true,
            },
            {
              name: 'Mensagem',
              value: message,
            },
          ],
        },
      ],
    }
    await axios.post(WEBHOOK_URL, messageData)
    return NextResponse.json({
      message: 'Mensagem enviada com sucesso!',
    })
  } catch (err) {
    return NextResponse.error()
  }
}
