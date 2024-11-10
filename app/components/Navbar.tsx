import { auth ,signOut,signIn} from '@/auth'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { BadgePlus, LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const Navbar = async() => {
    const session  = await auth()
    return (
        <header 
            className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className='flex justify-between items-center'>
                <Link href='/'>
                    <Image src='/logo.jpg' alt='logo' width={100} height={30} style={{borderRadius: "100%"}}/>
                </Link>
                <div className='flex items-center gap-5 text-black'>
                    {session && session?.user ?(
                        <>
                        
                            <Link href="/startup/create">
                                <span style={{ backgroundColor: 'rgb(238, 42, 104)' }} className="px-4 py-2 text-white rounded hover:opacity-90 transition duration-300  max-sm:hidden">Create</span>
                                <BadgePlus className="size-6 sm:hidden" />
                            </Link>
                            <form action={async()=>{ 
                                "use server"
                                await signOut({redirectTo:"/"})}}>
                                <button type="submit">
                                <span style={{ backgroundColor: 'black' }} className="px-4 py-2 text-white rounded hover:opacity-90 transition duration-300 max-sm:hidden">Logout</span>
                                <LogOut className="size-6 sm:hidden text-red-500" />
                                </button>

                            </form>
                            <Link href={`/user/${session?.id}`}>
                                {/* <span>{session?.user?.name}</span> */}
                                <Avatar className='size-10'>
                                    <AvatarImage src={session?.user?.image||""} alt={session?.user?.name||""}/>
                                </Avatar>
                            </Link>
                        </>
                    ):(
                        <form action={async()=>{
                            "use server"
                            await signIn('github')}}>
                            <button type='submit' 
                            style={{ backgroundColor: 'black' }} 
                            className='px-4 py-2 text-white rounded hover:opacity-90 transition duration-300'>
                            Login</button>
                        
                        </form>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar