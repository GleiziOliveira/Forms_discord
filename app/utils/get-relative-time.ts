/**
 * Converte uma data para uma string de tempo relativo, como
 * 'há um minuto', 'em 2 horas', 'ontem', 'há 3 meses', etc.
 * usando Intl.RelativeTimeFormat
 * // Array representando um minuto, hora, dia, semana, mês, etc. em segundos
 *   // Obtém a quantidade de segundos entre a data fornecida e agora
 *   // Permite que datas ou horários sejam passados
 *  // Array equivalente ao acima, mas na representação de string das unidades
 *   // Obtém o índice da unidade ideal de corte
 *   // Obtém o divisor para dividir a partir dos segundos. Por exemplo, se nossa unidade for 'dia', nosso divisor
  // é um dia em segundos, então podemos dividir nossos segundos por isso para obter o número de dias
    // Deixe o Intl.RelativeTimeFormat fazer sua mágica

 */
export function getRelativeTimeString(
  date: Date | number,
  lang = navigator.language,
): string {
  const timeMs = typeof date === 'number' ? date : date.getTime()
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000)
  const cutoffs = [
    60,
    3600,
    86400,
    86400 * 7,
    86400 * 30,
    86400 * 365,
    Infinity,
  ]
  const units: Intl.RelativeTimeFormatUnit[] = [
    'second',
    'minute',
    'hour',
    'day',
    'week',
    'month',
    'year',
  ]
  const unitIndex = cutoffs.findIndex(
    (cutoff) => cutoff > Math.abs(deltaSeconds),
  )
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' })
  return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex])
}
