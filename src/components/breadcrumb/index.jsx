import { Breadcrumb } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function BreadCb() {
  const location = useLocation();
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  useEffect(() => {
    const pathnames = location.pathname.split("/").filter(Boolean);
    const items = pathnames.map((path, index) => ({
      name: path,
      path: `/${pathnames.slice(0, index + 1).join("/")}`,
    }));
    setBreadcrumbItems(items);
  }, [location]);

  const tags = breadcrumbItems.map((item) => {
    return { title: item.name };
  });

  return (
    <Breadcrumb
      style={{ fontStyle: "italic" }}
      separator=">"
      items={tags}
    ></Breadcrumb>
  );
}

export default BreadCb;
