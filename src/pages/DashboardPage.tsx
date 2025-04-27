import { useParams } from "react-router-dom";

const DashboardPage = () => {
  const { userId } = useParams<{ userId: string }>();
  return (
    <>
      <div>Welcome to your dashboard, Chief 🚀🤘!</div>
      <div>Your userId is: {userId}</div>
    </>
  );
};
export default DashboardPage;
