import { ButtonsWithTooltip } from '@/components/buttons-with-tooltip'
import { HeaderSearchInput } from '@/components/header-search-input'
import { leftButtons, rightButtons } from '@/constants/header-data'
import { HeaderNewnoteButton } from './header-newnote-button'

export function Header() {
  return (
    <header className='px-4 py-1 border-b fixed top-0 bg-white inset-x-0 z-50'>
      <section className='flex max-w-[1920px] mx-auto items-center'>
        <ButtonsWithTooltip items={leftButtons} />
        <HeaderSearchInput />

        <div className='flex gap-2 items-center ml-auto'>
          <HeaderNewnoteButton />
          <ButtonsWithTooltip items={rightButtons} />
        </div>
      </section>
    </header>
  )
}
