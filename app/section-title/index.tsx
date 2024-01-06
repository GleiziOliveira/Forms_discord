import { cn } from '@/app/libs/utils'

// está retornando as propriedades tipadas, ou seja, a SectionTitle já tem seu tipo.
// O símbolo de ? quer dizer que é opcional
type SectionTitleProps = {
  title: string
  subtitle: string
  className?: string
}

export const SectionTitle = ({
  title,
  subtitle,
  className,
}: SectionTitleProps) => {
  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <span className="font-mono text-sm text-[#A80079]">{`../${subtitle}`}</span>
      <h3 className="text-3xl font-medium">{title}</h3>
    </div>
  )
}
