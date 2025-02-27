import { Home } from "lucide-react";

const GetBreadCrumbIcon = (name: string) => {
  switch (name) {
    case "":
      return <Home className="h-4 w-4 mr-1" />;
    default:
      return null;
  }
};

export default GetBreadCrumbIcon;
