export function getBrazilTimezones(): string[] {
  const allTimezones = Intl.supportedValuesOf('timeZone')

  return allTimezones.filter(
    tz =>
      tz.startsWith('America/') &&
      [
        'Sao_Paulo',
        'Manaus',
        'Rio_Branco',
        'Porto_Velho',
        'Boa_Vista',
        'Campo_Grande',
        'Cuiaba',
        'Belem',
        'Fortaleza',
        'Recife',
        'Maceio',
        'Araguaina',
        'Santarem',
      ].some(city => tz.includes(city))
  )
}
