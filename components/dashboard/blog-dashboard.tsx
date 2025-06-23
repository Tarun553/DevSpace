import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { FileText, MessageSquare, ThumbsUp, ArrowUp } from 'lucide-react'
import RecentArticle from './recent-article'

const BlogDashboard = () => {
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <Card className="hover:shadow-lg transition-shadow w-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Articles</CardTitle>
                        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                            <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl sm:text-3xl font-bold'>5</div>
                        <p className="text-xs text-muted-foreground flex items-center">
                            <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                            <span className="whitespace-nowrap">+5 from last month</span>
                        </p>
                    </CardContent>
                </Card>


                <Card className="hover:shadow-lg transition-shadow w-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Comments</CardTitle>
                        <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                            <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl sm:text-3xl font-bold'>24</div>
                        <p className="text-xs text-muted-foreground flex items-center">
                            <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                            <span className="whitespace-nowrap">+12 from last month</span>
                        </p>
                    </CardContent>
                </Card>


                <Card className="hover:shadow-lg transition-shadow w-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Likes</CardTitle>
                        <div className="p-2 rounded-lg bg-pink-100 dark:bg-pink-900/30">
                            <ThumbsUp className="h-4 w-4 sm:h-5 sm:w-5 text-pink-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl sm:text-3xl font-bold'>156</div>
                        <p className="text-xs text-muted-foreground flex items-center">
                            <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
                            <span className="whitespace-nowrap">+28 from last month</span>
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="mt-8">
             <RecentArticle />
            </div>
        </div>
    )
}

export default BlogDashboard