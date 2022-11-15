import { GetServerSideProps } from "next";

const Admin = () => {
  return (
    <div>
      <h1>Admin</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: "/admin/add-bike",
    },

    props: {},
  };
};

export default Admin;
