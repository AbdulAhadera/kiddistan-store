
import Navbar from "./navbar";
import AnnouncementBar from "./navbar/AnnouncementBar";

export default function Header() {
  return (
    <div className="sticky top-0 z-40">
      <AnnouncementBar />
      <Navbar />
    </div>
  );
}