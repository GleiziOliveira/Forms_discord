'use client'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { Button } from '../button'
import { SectionTitle } from '@/app/section-title'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import toast from 'react-hot-toast'

// o zod foi criado para que desse para usar o register no código e ter o autocomplete, dentro do parentese, passa alguns parametros, como quantidade minima e máxima de caracteres.
// tipagem para dizer que o ContactFormData tem as informações acima
// se está no mesmo dominio não precisa colocar o localhost, basta colocar dessa forma.
// Ao criar a const com os valores de handleSubmit, register, reset, o formulário começou a se tornar funcional, porém ao passar as informações para os campos foi criado o onSubmite para que seja recebido os dados.
// Foi usado o register para o onSubimit saber que os inputs existem, e para usar esse register
// Foi acrescentado essa parte ao código   {...register('name')} onde cada parte dentro do parentese foi colocado o que typo especifico do input.

const contactFormSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(500),
})
type ContactFormData = z.infer<typeof contactFormSchema>
export const ContactForm = () => {
  const { handleSubmit, register, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })
  const onSubmit = async (data: ContactFormData) => {
    try {
      await axios.post('/api/contact', data)
      toast.success('Mensagem enviada com sucesso')
      reset()
    } catch (error) {
      toast.error('Ocorreu um erro ao enviar a mensagem. Tente novamente')
      console.error(error)
    }
  }
  return (
    <section
      id="contact"
      className="py-16 px-6 md:py-32 flex items-center justify-center bg-gray-950"
    >
      <div>
        <SectionTitle
          subtitle="Contato"
          title="Vamos trabalhar juntos? Entre em contato"
          className="items-center text-center"
        />
        <form
          className="mt-12 w-full flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            placeholder="Nome"
            className="w-full h-14 bg-gray-800 rounded-lg placeholder:text-gray-400 text-gray-50 p-4 focus:outline-none focus:ring-2 ring-[#f868cf]"
            {...register('name')}
          />
          <input
            placeholder="E-mail"
            type="email"
            className="w-full h-14 bg-gray-800 rounded-lg placeholder:text-gray-400 text-gray-50 p-4 focus:outline-none focus:ring-2 ring-[#f868cf]"
            {...register('email')}
          />
          <textarea
            placeholder="Mensagem"
            className="resize-none w-full h-[138px] bg-gray-800 rounded-lg placeholder:text-gray-400 text-gray-50 p-4 focus:outline-none focus:ring-2 ring-[#f868cf]"
            maxLength={500}
            {...register('message')}
          />
          <Button type="submit" className="w-max mx-auto mt-6 shadow-button">
            Enviar mensagem
            <HiArrowNarrowRight size={18} />
          </Button>
        </form>
      </div>
    </section>
  )
}
