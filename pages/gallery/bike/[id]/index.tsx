import { showNotification } from "@mantine/notifications";
import { Plan } from "@prisma/client";
import { GetServerSideProps } from "next";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Header from "../../../../src/components/common/Header";
import Loading, {
  loadingState,
} from "../../../../src/components/common/Loading";
import BikeImage from "../../../../src/components/gallery/BikeImage";
import { Bike } from "../../../../src/types/Bike";
import { User } from "../../../../src/types/User";

const Bike = ({
  accessToken,
  user: userFetched,
  id,
}: {
  accessToken: string;
  user: User;
  id: string;
}) => {
  const router = useRouter();
  const { t: tCommon } = useTranslation("common");
  const [loading, setLoading] = useRecoilState(loadingState);
  const [bike, setBike] = useState<Bike | undefined>();
  const [plans, setPlans] = useState<Plan[]>([]);

  const [user, setUser] = useState<User | undefined>(userFetched || undefined);

  useEffect(() => {
    fetchBike();
    fetchPlans();
  }, []);

  const fetchBike = () => {
    setLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL as string}/api/bikes/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          setLoading(false);

          return showNotification({
            title: "Error",
            message: "Error updating bike",
            color: "red",
          });
        }

        res.json().then((data) => {
          if (data.error) {
            console.log(data.error);
            setLoading(false);

            return showNotification({
              title: "Error",
              message: data.error,
              color: "red",
            });
          } else {
            showNotification({
              title: "Success",
              message: "Bikes fetched successfully",
              color: "green",
            });

            setLoading(false);
            console.log({ bike: data.bike });
            return setBike(data.bike);
          }
        });
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        return showNotification({
          title: "Error",
          message: e,
          color: "red",
        });
      });
  };

  const fetchPlans = () => {
    setLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL as string}/api/plans`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          setLoading(false);

          return showNotification({
            title: "Error",
            message: "Error updating plans",
            color: "red",
          });
        }

        res.json().then((data) => {
          if (data.error) {
            console.log(data.error);
            setLoading(false);

            return showNotification({
              title: "Error",
              message: data.error,
              color: "red",
            });
          } else {
            showNotification({
              title: "Success",
              message: "plans fetched successfully",
              color: "green",
            });

            setLoading(false);
            console.log({ plans: data.plans });
            return setPlans(data.plans);
          }
        });
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        return showNotification({
          title: "Error",
          message: e,
          color: "red",
        });
      });
  };

  const subscribe = (planId: string, bikeId: string, userId: string) => {
    setLoading(true);

    fetch(
      `${
        process.env.NEXT_PUBLIC_SERVER_URL as string
      }/api/subscriptions/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          subscription: {
            planId,
            bikeId,
            userId,
          },
        }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          setLoading(false);

          return showNotification({
            title: "Error",
            message: "Something went wrong while subscribing",
            color: "red",
          });
        }

        res.json().then((data) => {
          if (data.error) {
            console.log(data.error);
            setLoading(false);

            return showNotification({
              title: "Error",
              message: data.error,
              color: "red",
            });
          } else {
            showNotification({
              title: "Success",
              message: "Subscribed successfully",
              color: "green",
            });

            updateUser();
          }
        });
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        return showNotification({
          title: "Error",
          message: e,
          color: "red",
        });
      });
  };

  const updateUser = () => {
    setLoading(true);

    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL as string}/api/user/${
        user?.id
      }/update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          user: {
            id: user?.id,
          },
        }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          setLoading(false);

          return showNotification({
            title: "Error",
            message: "Error updating user",
            color: "red",
          });
        }

        res.json().then((data) => {
          if (data.error) {
            console.log(data.error);
            setLoading(false);

            return showNotification({
              title: "Error",
              message:
                typeof data.error === "string"
                  ? data.error
                  : data.error.message,
              color: "red",
            });
          } else {
            showNotification({
              title: "Success",
              message: "User updated successfully",
              color: "green",
            });

            setLoading(false);
            console.log({ user: data.user });
            window.document.cookie = `next-auth.session-token=${data.user.accessToken}; path=/;`;
            return setUser(data.user);
          }
        });
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        return showNotification({
          title: "Error",
          message: typeof e === "string" ? e : e.message,
          color: "red",
        });
      });
  };

  return (
    <div className="profile w-screen h-screen flex flex-col items-center justify-center bg-gray-100">
      <Header user={user} />
      <Loading />
      <div className="wrapper bg-white flex flex-col items-center justify-start w-full max-w-[800px] h-full shadow-md shadow-[#00000050] rounded-lg p-5 my-5">
        {bike && bike?.image ? (
          <div className="img h-[200px] w-[200px] max-h-full max-w-full relative ">
            <Image src={bike.image} alt="Bike" layout="fill" objectFit="fill" />
          </div>
        ) : (
          <div className="image w-full m-2 rounded-md overflow-hidden">
            <BikeImage />
          </div>
        )}
        <div className="name text-center text-lg font-semibold text-gray-700 mt-2 px-2 w-full border-b">
          <h3 className=" bg-[#00000030] rounded-full w-fit mx-auto py-1 px-3 m-2">
            {bike?.name}
          </h3>
        </div>

        {user?.subscriptions?.some((s) => s?.bikeId === bike?.id) ? (
          <div className="msg">
            <h3 className="text-center text-lg font-semibold text-red-700 mt-2 px-2 w-full">
              You are already subscribed to this bike
            </h3>
          </div>
        ) : (
          <div className="plans flex-1 flex w-full overflow-x-auto justify-center items-start">
            {plans?.map((plan) => (
              <div
                key={plan.id}
                className="plan cursor-pointer rounded-lg h-full w-[200px] max-h-[300px] p-5 flex flex-col items-center justify-start m-5 shadow-lg shadow-[#00000020] hover:translate-y-[-5px] hover:shadow-[#00000050] border-transparent hover:border-red-500 border"
                onClick={() => {
                  if (!user) {
                    return showNotification({
                      title: "Error",
                      message:
                        "You need to be logged in to subscribe to a plan",
                      color: "red",
                    });
                  }
                  subscribe(plan.id, bike?.id as string, user.id);
                }}
              >
                <div className="name text-center text-lg font-semibold text-gray-700 mt-2 px-2 w-full border-b">
                  <h3 className="w-fit mx-auto py-1 px-3 m-2 font-[Monteserrat]">
                    {plan.name}
                  </h3>
                </div>

                <div className="description text-start w-full flex-1 overflow-y-auto break-words text-sm text-[#00000070]">
                  <p className="m-2">{plan.description}</p>
                </div>

                <div className="price text-start text-md font-semibold text-white mt-2 px-2 w-full">
                  <h3 className="w-fit bg-red-500 rounded-full py-1 px-3 m-2 font-[Monteserrat]">
                    {plan.costPerUnit} ₹
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  let accessToken = req.cookies["next-auth.session-token"];
  if (!accessToken) {
    accessToken = context.query?.accessToken as string;
    if (!accessToken) {
      return {
        props: {
          accessToken: null,
          user: null,
          id: context.params?.id,
        },
      };
    }
  }

  console.log("Access token from profile [id] sever side props:", {
    accessToken,
  });

  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL as string}/api/auth/verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await result.json();
    console.log({ data });

    if (data.error) {
      throw data.error;
    }

    if (data.valid) {
      return {
        props: {
          accessToken,
          user: data.user,
          id: context.params?.id,
        },
      };
    }

    return {
      props: {
        accessToken,
        user: null,
        id: context.params?.id,
      },
    };
  } catch (error) {
    console.log({ error });

    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};

export default Bike;
