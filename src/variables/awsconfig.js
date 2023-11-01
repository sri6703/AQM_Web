const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-west-2', // Replace with your AWS region
  accessKeyId: 'AKIAXFCQFL4BS4MZVEFO',
  secretAccessKey: '4F2rVuRRkgwRVnIaRtz4mmh8dD2KJKZistcDgYRX',
});

const dynamodb = new AWS.DynamoDB();
const tableName = 'aqm-dynamo'; // Replace with your DynamoDB table name

const getAllColumnsFromDynamoDB = async () => {
  const params = {
    TableName: tableName,
  };

  try {
    const result = await dynamodb.scan(params).promise();

    if (result.Items) {
      const columns = Object.keys(result.Items[0]);
      const columnValues = columns.reduce((acc, column) => {
        const values = result.Items.map((item) => {
          const value = item[column].S || item[column].N || item[column].BOOL;
          return typeof value === 'number' ? value : Number(value);
        });
        acc[column] = values;
        
        return acc;
      }, {});
      console.log(columnValues)
      return columnValues;
    }
  } catch (error) {
    console.error('Error retrieving columns from DynamoDB:', error);
  }

  return {};
};

module.exports = getAllColumnsFromDynamoDB;