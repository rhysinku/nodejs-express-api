import { useSelector } from "react-redux"
import { RootState } from "../redux/store"

const Profile: React.FC = () => {

    const {currentUser} = useSelector((state:RootState) => state.user)

  return (
    <div className="grid md:grid-cols-[300px_1fr] min-h-screen w-full">
      <div className="bg-background border-r">
        <div className="flex flex-col items-center justify-center h-[300px] bg-[url('/placeholder-banner.jpg')] bg-cover bg-center">
          <div className="text-white text-center space-y-4">
            <h1 className="text-4xl font-bold">John Doe</h1>
            <p className="text-lg">Software Engineer</p>
          </div>
        </div>
        <div className="p-6">
          <div className="bg-card rounded-lg shadow-md overflow-hidden">
            <div className="bg-card py-8 px-6">
              <div className="flex items-center space-x-4">
                <figure className="h-16 w-16 ring-2 ring-primary">
                  <img src={currentUser?.profilePicture} alt={currentUser?.username} />
                </figure>
                <div>
                  <h1 className="text-2xl font-bold text-card-foreground">John Doe</h1>
                  <p className="text-card-foreground/80">Software Engineer</p>
                </div>
              </div>
              <p className="mt-4 text-card-foreground/80">
                I'm a passionate software engineer with a love for building innovative and user-friendly applications.
                In my free time, I enjoy exploring new technologies and contributing to open-source projects.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-3xl mx-auto py-8 px-4 md:px-6">
        <div className="bg-background rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div>
              <h2 className="text-lg font-bold mb-2 text-card-foreground">Friends</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <figure className="h-8 w-8 ring-1 ring-card-foreground/20">
                    <img src={currentUser?.profilePicture} alt={currentUser?.username} />

                  </figure>
                  <div className="text-sm text-card-foreground/80">Jane Doe</div>
                </div>
                <div className="flex items-center space-x-2">
                  <figure className="h-8 w-8 ring-1 ring-card-foreground/20">
                    <img src={currentUser?.profilePicture} alt={currentUser?.username} />

                  </figure>
                  <div className="text-sm text-card-foreground/80">Bob Smith</div>
                </div>
                <div className="flex items-center space-x-2">
                  <figure className="h-8 w-8 ring-1 ring-card-foreground/20">
                    <img src={currentUser?.profilePicture} alt={currentUser?.username} />

                  </figure>
                  <div className="text-sm text-card-foreground/80">Alice Johnson</div>
                </div>
                <div className="flex items-center space-x-2">
                  <figure className="h-8 w-8 ring-1 ring-card-foreground/20">
                    <img src={currentUser?.profilePicture} alt={currentUser?.username} />

                  </figure>
                  <div className="text-sm text-card-foreground/80">Tom Wilson</div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-2 text-card-foreground">Contact Info</h2>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <MailIcon className="h-5 w-5 text-card-foreground/80" />
                  <div className="text-sm text-card-foreground/80">john.doe@example.com</div>
                </div>
                <div className="flex items-center space-x-2">
                  <PhoneIcon className="h-5 w-5 text-card-foreground/80" />
                  <div className="text-sm text-card-foreground/80">(123) 456-7890</div>
                </div>
                <div className="flex items-center space-x-2">
                  <LocateIcon className="h-5 w-5 text-card-foreground/80" />
                  <div className="text-sm text-card-foreground/80">123 Main St, Anytown USA</div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-2 text-card-foreground">Social Media</h2>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <TwitterIcon className="h-5 w-5 text-card-foreground/80" />
                  <Link href="#" className="text-sm hover:underline text-card-foreground/80" prefetch={false}>
                    @johndoe
                  </Link>
                </div>
                <div className="flex items-center space-x-2">
                  <LinkedinIcon className="h-5 w-5 text-card-foreground/80" />
                  <Link href="#" className="text-sm hover:underline text-card-foreground/80" prefetch={false}>
                    linkedin.com/in/johndoe
                  </Link>
                </div>
                <div className="flex items-center space-x-2">
                  <InstagramIcon className="h-5 w-5 text-card-foreground/80" />
                  <Link href="#" className="text-sm hover:underline text-card-foreground/80" prefetch={false}>
                    @johndoe
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

  

export default Profile
