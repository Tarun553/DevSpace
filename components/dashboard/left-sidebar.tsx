import React from 'react'
import {
    Sidebar,
    SidebarProvider,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
    SidebarTrigger,
} from "@/components/ui/sidebar"

import {
    MessageCircle,
    Home,
    Newspaper,
    ChartNoAxesColumnIncreasing,
    Settings,
    PlusCircle,
    
} from "lucide-react"
import { Button } from '../ui/button'
import Link from "next/link"
import BlogDashboard from './blog-dashboard'



// Menu items
const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Article",
        url: "/articles/create",
        icon: Newspaper,
    },
    {
        title: "Comments",
        url: "#",
        icon: MessageCircle,
    },
    {
        title: "Analytics",
        url: "#",
        icon: ChartNoAxesColumnIncreasing,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]


const LeftSidebar = () => {
    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel><span className='text-xl font-bold'>DevSpace</span></SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu className='mt-2'>
                                {items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild tooltip={item.title}>
                                            <a href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter>
                    <SidebarGroup>
                 
                    </SidebarGroup>
                </SidebarFooter>
            </Sidebar>

            <main className="flex-1 min-w-100vh">
                <div className="flex justify-between items-center px-4 py-2 mt-8">
                    <SidebarTrigger className="h-4 w-4 mt-2" />
                    <Link href="/articles/create">
                        <Button className="flex items-center gap-2">
                            <PlusCircle className="h-4 w-4" />
                            New Article
                        </Button>
                    </Link>
                </div>
                <div className="p-6">
                    <h1 className="text-2xl font-bold">Blog Dashboard</h1>
                    <p className="mt-2">Manage your content and Analytics.</p>
                </div>
           <BlogDashboard />
          
            </main>
        </SidebarProvider>
    )
}

export default LeftSidebar