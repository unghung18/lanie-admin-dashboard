import Header from "@/components/Header"
import PageWrapper from "@/components/PageWrapper"
import { Sidebar } from "@/components/Sidebar"

export default function DashboardLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <section className="flex min-h-screen">
            <Sidebar />
            <Header />
            <PageWrapper>
                {children}
            </PageWrapper>
        </section>
    )
}
