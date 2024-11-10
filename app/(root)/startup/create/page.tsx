import StartupForm from "@/app/components/StartupForm"
import { auth } from "@/auth"
import { redirect } from "next/navigation"


const page = async() => {
    const session = await auth()
    if(!session) redirect("/")
    return (
        <div>
            <section className="pink_container !min-h-[230px]">
                <h1 className="heading">Submit Your Startup Pitch</h1>
            </section>
            <StartupForm/>
        </div>
    )
}

export default page