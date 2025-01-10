import { Card, Button, CardHeader, CardBody, Image } from "@nextui-org/react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const ManagerDashboard = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-row border-4 bg-red-500 justify-center gap-4 p-4">
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h4 className="font-bold text-large">Create Food Plan</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src="https://nextui.org/images/hero-card-complete.jpeg"
            width={270}
          />
          <Link to="/create-food-plan">
            <Button>Create</Button>
          </Link>
        </CardBody>
      </Card>
      
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h4 className="font-bold text-large">Add Patient</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src="https://nextui.org/images/hero-card-complete.jpeg"
            width={270}
          />
            <Button onPress={() => navigate('/manager-dashboard/add-patient')}>Add</Button>
          
        </CardBody>
      </Card>
      {/* <Outlet /> */}
    </div>
  );
};

export default ManagerDashboard;
