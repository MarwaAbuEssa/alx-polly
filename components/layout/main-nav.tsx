'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { getAppConfig, getAuthConfig } from '@/lib/env';
import { useAuth } from '@/context/AuthContext';

export function MainNav() {
  const pathname = usePathname();
  const { appName } = getAppConfig();
  const { authEnabled, signupEnabled } = getAuthConfig();
  const { user, signOut } = useAuth();
  
  const isLoggedIn = !!user;

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="font-bold text-xl">{appName}</Link>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/polls">
              <Button variant={pathname.includes('/polls') ? 'default' : 'ghost'}>Polls</Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <div className="flex h-full w-full items-center justify-center bg-muted text-xs font-medium">
                      U
                    </div>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              {authEnabled && (
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
              )}
              {signupEnabled && (
                <Link href="/register">
                  <Button>Sign Up</Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}