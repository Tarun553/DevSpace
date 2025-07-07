import { currentUser } from '@clerk/nextjs/server'

import React from 'react'
import { prisma } from '@/lib/prisma'

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const user = await currentUser()
    
    // If user is logged in, ensure they exist in the database
    if (user) {
        const loggedInUser = await prisma.user.findUnique({
            where: {
                clerkUserId: user.id
            }
        })

        if (!loggedInUser) {
            await prisma.user.create({
                data: {
                    clerkUserId: user.id,
                    email: user.emailAddresses[0].emailAddress,
                    name: user.fullName as string,
                    imageUrl: user.imageUrl
                },
            })   
        }
    }

    return (
        <div className="min-h-screen">
            {children}
        </div>
    )
}

export default Layout