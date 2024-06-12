import OauthForm from "./_components/OauthForm"

const Page = ({ params }: { params: { passport: string } }) => {
  return (
    <div className="flex justify-center min-h-screen">
      <OauthForm passport={params.passport} />
    </div>
  )
}

export default Page
