import Playlist from "@/components/favorite-card";
import { Helmet } from "react-helmet";

const HistoryPage = () => {
  return (
    <section className="grid  gap-2 py-10">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Your Playlist - Football Drills Platform</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Playlist />
    </section>
  );
};

export default HistoryPage;
