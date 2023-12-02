import { Button } from '@/components/ui/button'
import { HeaderSearchInput } from '@/components/header-search-input'
import { ButtonsWithTooltip } from '@/components/buttons-with-tooltip'
import { leftButtons, rightButtons } from '@/constants/header-data'

export function Header() {
  return (
    <header className='px-4 py-1 border-b fixed top-0 bg-white inset-x-0'>
      <section className='flex max-w-[1920px] mx-auto items-center'>
        <ButtonsWithTooltip items={leftButtons} />
        <HeaderSearchInput />

        <div className='flex gap-2 items-center ml-auto'>
          <Button variant='indigo' size='sm'>
            New Note
          </Button>
          <ButtonsWithTooltip items={rightButtons} />
        </div>
      </section>
    </header>
  )
}
