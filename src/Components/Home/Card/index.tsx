import { Card } from "antd";
import "./CardContent.css";

interface propsCardContent {
  className: any,
  icon: any,
  title: any,
  decription: any
}

function CardContent({ className, icon, title, decription }: propsCardContent) {
  return (

    <Card
      className="card-content"
      bordered={false}>
      <div className={className}>{icon}</div>
      <div className="border-bottom"></div>
      <p className="type-content-title">{title}</p>
      <p className="type-content-description">{decription}</p>
    </Card>
  );
}
export default CardContent;
