const IndexPage = () => {
  return null;
};

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/gallery",
      permanent: false,
    },
  };
};

export default IndexPage;
