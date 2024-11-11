import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div className="min-h-[410px]">

        <Helmet>
          <title>Home | Test</title>
        </Helmet>

      <h2 className="text-2xl font-bold">
        Welcome to email and password login and singup
      </h2>
    </div>
  );
};

export default Home;
