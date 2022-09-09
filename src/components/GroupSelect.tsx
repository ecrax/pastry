import { type Session } from "next-auth";
import Link from "next/link";
import { trpc } from "../utils/trpc";

const GroupSelect: React.FC<{ session: Session }> = ({ session }) => {
  const { data, isLoading } = trpc.group.getAllWhereUser.useQuery();
  console.log(data);

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Join or create Group</h1>
      {data.length > 0 ? (
        <div>
          {data.map((g) => {
            return (
              <Link key={g.id} href={"/group/" + g.id}>
                {g.name}
              </Link>
            );
          })}
        </div>
      ) : (
        <div>
          There are no groups to join. Either create your own or get invited
          into one using your email ({session.user?.email})
        </div>
      )}
    </div>
  );
};

export default GroupSelect;
