type convertRealToCentsProps = {
  amount: string
}

/**
 * Converte um valor monetário de real(BRL) para centavos.
 * @param {string} amount O valor em real(BRL) a ser convertido.
 * @returns {number} O valor convertido em centavos.
 */
export function convertRealToCents({ amount }: convertRealToCentsProps): number {
  const numericPrice = parseFloat(amount.replace(/[^\d,]/g, '').replace(',', '.'))
  const priceInCents = Math.round(numericPrice * 100)

  return priceInCents
}
