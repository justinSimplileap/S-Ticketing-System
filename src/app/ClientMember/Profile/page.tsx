import ClientMemberTabs from "../../../Components/common/ClientMemberTabs";


export default function Profile() {
  return (
    <div className="">
      <div className="lg:mt-7 lg:mx-8 mx-5 my-8">
        <h1 className="text-3xl text-sidebarBackground">Profile</h1>
      </div>

      {/* Tabs starts */}

      <div className="p-2 lg:m-8 m-4 bg-[#F9F9F9] lg:rounded-md">
        <ClientMemberTabs />
      </div>
    </div>
  );
}
