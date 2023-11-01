import { Text, useColorModeValue } from "@chakra-ui/react";
import Project1 from "assets/img/profile/Project1.png";
import Project2 from "assets/img/profile/Project2.png";
import Project3 from "assets/img/profile/Project3.png";
import { useState, useEffect } from "react";
import Card from "components/card/Card.js";
import React from "react";
import { MdDangerous } from 'react-icons/md';
import Project from "views/admin/profile/components/Project";
import * as AWS from 'aws-sdk';
import { AiFillSafetyCertificate } from 'react-icons/ai';
AWS.config.update({
  region: 'us-west-2',
  endpoint: 'dynamodb.us-west-2.amazonaws.com',
  accessKeyId: 'AKIAXFCQFL4BS4MZVEFO',
  secretAccessKey: '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'
});

export default function Projects(props) {
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  const onRead = () => {
    return new Promise((resolve, reject) => {
      var docClient = new AWS.DynamoDB.DocumentClient();

      let params = {
        TableName: "aqm-dynamo",
        ProjectionExpression: "BP, WD, WS, PM10, O3, SR"
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

        const lastElementArray = [
          column1Values[len - 1],
          column2Values[len - 1],
          column3Values[len - 1],
          column4Values[len - 1],
          column5Values[len - 1],
          column6Values[len - 1]
        ];

        resolve(lastElementArray);
      });
    });
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

  let texts = "";
  let image ;

  if (x) {
    let average = x.reduce((a, b) => a + b, 0) / x.length;
    average=Math.round(average)
    console.log(average);

    if (average > 100) {
      texts = "AQI-" + average + " It is Not Safe To Go Outside. Breathing Problems & Possible Allergy";
      image = MdDangerous;
    } else if (average < 100 && average > 50) {
      texts = "AQI-" + average + " It is Safe to Go Outside. Can Cause Little Irritation";
      image = Project2;
    } else {
      texts = "AQI-" + average + " It is Safe to Go Outside. Air Is Healthy";
      image = AiFillSafetyCertificate;
    }

    return (
      <Card mb={{ base: "0px", "2xl": "20px" }}>
        <Text
          color={textColorPrimary}
          fontWeight='bold'
          fontSize='2xl'
          mt='10px'
          mb='4px'>
          Recommendation
        </Text>
        <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
          {texts}
        </Text>
        <Project
          boxShadow={cardShadow}
          mb='20px'
          image={Project1}
          ranking='1'
          link='#'
          title='Health Advise'
          average={average} // Pass the value of x as a prop to the Project component
        />
      </Card>
    );
  } else {
    return null; // Return null or a loading indicator while waiting for the data to be fetched
  }
}
