import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/utils/trpc";
import { useQueryClient } from "@tanstack/react-query";

const initialData = () => Array.from({ length: 50 }, () => Array(80).fill(0));

export default function Index() {
  const queryClient = useQueryClient();

  const data = trpc.grid.getGrid.useQuery(undefined, {
    // initialData: initialData(),
    refetchInterval: !queryClient.isMutating() ? 1000 : false,
  });

  const mutation = trpc.grid.updateGrid.useMutation({
    onMutate: ({ x, y }) => {
      let newData: number[][] =
        queryClient.getQueryData([["grid", "getGrid"], { type: "query" }]) ??
        initialData();

      newData[x][y] = !!newData[x][y] ? 0 : 1;

      queryClient.setQueryData(
        [["grid", "getGrid"], { type: "query" }],
        () => newData
      );
    },
    onSuccess: (undefined, { x, y }) => {
      // setTimeout(() => {
      //   data.refetch();
      // }, 200);
    },
  });

  if (data.data)
    return (
      <>
        <div className=" flex flex-col w-full mb-10">
          <div className="flex flex-col mx-auto">
            {data.data?.map((val, idx) => (
              <div className="flex flex-row " key={idx}>
                {val.map((val, id) => (
                  <div
                    key={id}
                    onClick={() => mutation.mutate({ x: idx, y: id })}
                    className={`h-1 w-1 sm:h-2 sm:w-2 ${
                      val == 0 ? `bg-gray-700` : "bg-gray-300"
                    } cursor-pointer transition-all`}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <ClearComponent />
        <br />
        <br />
      </>
    );
}

function ClearComponent() {
  const queryClient = useQueryClient();
  const mutation = trpc.grid.clearGrid.useMutation({
    onMutate: () => {
      queryClient.setQueryData([["grid", "getGrid"], { type: "query" }], () =>
        initialData()
      );
    },
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          console.log(formData.get("password"));
          mutation.mutate({
            password: (formData.get("password") as string) ?? "",
          });
        }}
        className="flex gap-10"
      >
        <Input name="password" required type="password" />
        <Button>Clear canvas</Button>
      </form>
    </>
  );
}
