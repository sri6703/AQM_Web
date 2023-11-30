import {
  
  Box,

  Icon,
  
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";

import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useEffect, useState } from "react";
import { MdCompress} from "react-icons/md";
import { BsFillSunFill ,BsWind} from "react-icons/bs";
import { HiPaperAirplane } from "react-icons/hi";

import { GiChemicalDrop } from "react-icons/gi";
import { GiEarthAmerica } from "react-icons/gi";
import avatar from "assets/img/avatars/avatar4.png";
import banner from "assets/img/auth/banner.png";

import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";

import * as AWS from 'aws-sdk';
import Projects from "views/admin/profile/components/Projects";



AWS.config.update({
  region: 'us-west-2',
  endpoint: 'dynamodb.us-west-2.amazonaws.com',
  accessKeyId: 'AKIAXFCQFL4BS4MZVEFO',
  secretAccessKey: '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'
});

const onRead = () => {
  return new Promise((resolve, reject) => {
    var docClient = new AWS.DynamoDB.DocumentClient();

    let params = {
      TableName: "aqm-dynamo",
      ProjectionExpression: "BP, WD, WS, PM10, O3, SR, PM25, SO2, NO2, CO, AQI"
    };

    docClient.scan(params, function(err, data) {
      if (err) {
        reject(err);
      }

      const columnValues = data.Items.map(item => item.BP);
      const len = columnValues.length;

      const column1Values = data.Items.map(item => item.BP);
      const column2Values = data.Items.map(item => item.WD);
      const column3Values = data.Items.map(item => item.WS);
      const column4Values = data.Items.map(item => item.PM10);
      const column5Values = data.Items.map(item => item.O3);
      const column6Values = data.Items.map(item => item.SR);
      const column7Values = data.Items.map(item => item.PM25);
      const column8Values = data.Items.map(item => item.SO2);
      const column9Values = data.Items.map(item => item.NO2);
      const column10Values = data.Items.map(item => item.CO);
      const column11Values = data.Items.map(item => item.AQI);


      const lastElementArray = [
        column1Values[len - 1],
        column2Values[len - 1],
        column3Values[len - 1],
        column4Values[len - 1],
        column5Values[len - 1],
        column6Values[len - 1],
        column7Values[len - 1],
        column8Values[len - 1],
        column9Values[len - 1],
        column10Values[len - 1],
        column11Values[len - 1]
      ];

      resolve(lastElementArray);
    });
  });
};

const UserReports = () => {
  const handleReload = () => {
    // Fetch new data and update the state
    // You can make an API request or update the 'x' state in another way
    // For this example, we'll just simulate updating the data after a delay
    setTimeout(() => {
      onRead()
        .then(lastElementArray => {
          console.log(lastElementArray);
          setX(lastElementArray); // Assign the last element array to x here
        })
        .catch(error => {
          console.log(error); // Handle any error that occurred during the retrieval
        });
    }, 1000); // Simulated delay (1 second)
  };

  const [x, setX] = useState(null);

  useEffect(() => {
    onRead()
      .then(lastElementArray => {
        console.log(lastElementArray);
        setX(lastElementArray); // Assign the last element array to x here
      })
      .catch(error => {
        console.log(error); // Handle any error that occurred during the retrieval
      });
  }, []);

  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  


  if (x === null) {
    return <div>Loading...</div>; // Render a loading state until x has a valid value
  }
  
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <button onClick={handleReload}><img src="" alt="Reload" /></button>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }} gap="20px" mb="20px">
        <MiniStatistics
          startContent={
            <IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={MdCompress} color={brandColor}  />} />
          }
          name="Pressure"
          value={x[0]}
        />
     
        <MiniStatistics
          startContent={
            <IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={HiPaperAirplane} color={brandColor}  />} />
          }
          name="Wind Direction"
          value={x[1]}
        />
        <MiniStatistics startContent={
            <IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={GiChemicalDrop} color={brandColor}  />} />
          }
          name="PM10" value={x[3]} />
        <MiniStatistics
          startContent={
            <IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={GiEarthAmerica} color={brandColor}  />} />
          }
          
          name="Ozone"
          value={x[4]}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={<Icon w="32px" h="32px"  as={BsFillSunFill} color={brandColor} />}
            />
          }
          name="Solar Radiation"
          value={x[5]}
        />
        <MiniStatistics
          startContent={
            <IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={BsWind} color={brandColor} />} />
          }
          name="WindSpeed"
          value={x[2]}
        />
        <MiniStatistics
          startContent={
            <IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={GiChemicalDrop} color={brandColor}  />} />
          }
          name="PM25"
          value={x[6]}
        />
        <MiniStatistics
          startContent={
            <IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={GiChemicalDrop} color={brandColor}  />} />
          }
          name="SO2"
          value={x[7]}
          />
        <MiniStatistics
        startContent={
          <IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={GiChemicalDrop} color={brandColor}/>} />
        }
        name="NO2"
        value={x[8]}
        />
        <MiniStatistics
        startContent={
          <IconBox w="56px" h="56px" bg={boxBg} icon={<Icon w="32px" h="32px" as={GiChemicalDrop} color={brandColor} />} />
        }
        name="CO"
        value={x[9]}
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <TotalSpent />
        <Projects
          
          banner={banner}
          avatar={avatar}
          
        />
        {/* <WeeklyRevenue /> */}
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          {/* <DailyTraffic /> */}
          {/* <PieCard /> */}
          
         
        </SimpleGrid>
        
        
      </SimpleGrid>
      
    </Box>
  );
};

export default UserReports;
