import { cn } from '@/app/libs/utils'
import { ButtonHTMLAttributes } from 'react'
// é um a tipagem tipo HTML que foi desestruturada e ela vai aceitar tudo que um botão aceita
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>
export const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'bg-[#9b2053] py-3 px-4 rounded-lg text-gray-50 flex justify-center items-center gap-2 hover:bg-[#5a1230] transition-all disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
