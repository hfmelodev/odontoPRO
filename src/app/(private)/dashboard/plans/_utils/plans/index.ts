type PlanDetailsProps = {
  maxServices: number
}

export type PlansProps = {
  BASIC: PlanDetailsProps
  PROFESSIONAL: PlanDetailsProps
}

export const PLANS: PlansProps = {
  BASIC: {
    maxServices: 3,
  },
  PROFESSIONAL: {
    maxServices: 50,
  },
}

export const subscriptionPlans = [
  {
    id: 'BASIC',
    name: 'Basic',
    description: 'Perfeiro para pequenos projetos e uso pessoal.',
    oldPrice: 'R$ 99,90',
    price: 'R$ 29,90',
    features: [`Até ${PLANS.BASIC.maxServices} serviços ativos`, 'Agendamentos ilimitados', 'Acesso a atualizações regulares'],
  },
  {
    id: 'PROFESSIONAL',
    name: 'Professional',
    description: 'Ideal para empresas grandes e projetos em crescimento.',
    oldPrice: 'R$ 199,90',
    price: 'R$ 99,90',
    features: [
      `Até ${PLANS.PROFESSIONAL.maxServices} serviços ativos`,
      'Agendamentos ilimitados',
      'Acesso a todas as atualizações e novos recursos',
      'Análises avançadas e relatórios',
    ],
  },
]
