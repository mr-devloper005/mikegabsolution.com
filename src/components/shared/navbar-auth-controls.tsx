'use client'

import Link from 'next/link'
import { Bookmark, LogOut, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'
import { cn } from '@/lib/utils'

type NavbarAuthControlsProps = {
  useClassifieds?: boolean
}

export function NavbarAuthControls({ useClassifieds = false }: NavbarAuthControlsProps) {
  const { user, logout } = useAuth()

  return (
    <div className="flex min-w-0 items-center justify-end gap-1.5 sm:gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              'h-10 w-10 shrink-0 rounded-full p-0 sm:h-10 sm:min-w-[2.5rem] sm:px-0',
              useClassifieds
                ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                : 'text-[#5f4750] hover:bg-[rgba(110,26,55,0.06)] hover:text-[#8f1f3f]',
            )}
            aria-label="Account menu"
          >
            <Avatar
              className={cn('h-9 w-9 border', useClassifieds ? 'border-slate-200' : 'border-[rgba(110,26,55,0.12)]')}
            >
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="text-sm">{user?.name?.charAt(0) ?? '?'}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className={cn('w-56', useClassifieds ? 'border-slate-200/80 bg-white' : 'border-[rgba(110,26,55,0.12)] bg-[rgba(255,250,244,0.98)]')}
        >
          <div className="flex items-center gap-3 p-3">
            <Avatar className={cn('h-10 w-10 border', useClassifieds ? 'border-slate-200' : 'border-[rgba(110,26,55,0.12)]')}>
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0) ?? '?'}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex flex-col">
              <span className="truncate text-sm font-medium text-foreground">{user?.name}</span>
              <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
            </div>
          </div>
          {!useClassifieds ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/saved" className="inline-flex w-full items-center">
                  <Bookmark className="mr-2 h-4 w-4" />
                  Saved Items
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="inline-flex w-full items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
            </>
          ) : null}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={logout}
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
