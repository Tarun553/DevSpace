import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import { prisma } from '@/lib/prisma'

const layout = async ({children}: {children: React.ReactNode }) => {
    const user = await currentUser()
    // console.log(user)
    if(!user) {
        return <div>Not logged in</div>
    }

    const loggedInUser = await prisma.user.findUnique({
        where: {
            clerkUserId: user.id
        }
    })

    if(!loggedInUser) {
        await prisma.user.create({
            data: {
                clerkUserId: user.id,
                email: user.emailAddresses[0].emailAddress,
                name: user.fullName as string,
                imageUrl: user.imageUrl
            },
        })   
    }

    return (
        <div>
            
            
        {children}
    </div>
  )
}

export default layout