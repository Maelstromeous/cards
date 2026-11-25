import { describe, expect, it } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { GameCard } from '#components'
import { CardType } from '@humanity-deck/shared/constants/CardTypes'

describe('GameCard', () => {
  it('shows a white card as dark text on white', async () => {
    const wrapper = await mountSuspended(GameCard, {
      props: {
        card: {
          id: 'w1',
          text: 'Puberty.',
          type: CardType.WHITE_CARD,
          pack: 1,
        },
      },
    })

    expect(wrapper.text()).toBe('Puberty.')
    expect(wrapper.find('article').classes()).toContain('bg-white')
  })

  it('shows a black card as white text on black', async () => {
    const wrapper = await mountSuspended(GameCard, {
      props: {
        card: { id: 'b1', text: 'Why?', type: CardType.BLACK_CARD, pack: 1 },
      },
    })

    expect(wrapper.find('article').classes()).toContain('bg-neutral-900')
    expect(wrapper.find('article').classes()).toContain('text-white')
  })

  it('draws a line for each blank instead of the <blank> marker', async () => {
    const wrapper = await mountSuspended(GameCard, {
      props: {
        card: {
          id: 'b2',
          text: 'I like <blank> and <blank>.',
          type: CardType.BLACK_CARD,
          pack: 1,
        },
      },
    })

    expect(wrapper.text()).not.toContain('<blank>')
    expect(wrapper.findAll('[aria-label="blank"]')).toHaveLength(2)
    expect(wrapper.text()).toBe('I like  and .')
  })
})
