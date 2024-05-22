import ProfileSettings from "./_components/ProfileSettings";

export default async function AccountSettings(): Promise<JSX.Element> {

  return (<>
    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 py-4">
      <ProfileSettings />
    </div>
  </>);
}
