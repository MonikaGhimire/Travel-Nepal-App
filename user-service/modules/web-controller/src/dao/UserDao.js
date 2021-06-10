import AWS from 'aws-sdk';
AWS.config.update({ region: 'eu-west-2' });
var db = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
const converter = AWS.DynamoDB.Converter;

const TABLE = "USER";

export const createUser = async (user) => {

    const convertedUser = converter.marshall(user);

    var params = {
        TableName: TABLE,
        ConditionExpression: 'attribute_not_exists(id)',
        Item: convertedUser
    };

    return db.putItem(params).promise();
}

export const findByEmail = async (email) => {

    var params = {
        ExpressionAttributeValues: {
            ":email": {
                S: email
            }
        },
        FilterExpression: "email = :email",
        TableName: TABLE
    };

    const result = await db.scan(params).promise();

    const items = result.Items;
    if (items.length == 0) {
        return null;
    }

    return converter.unmarshall(items[0]);
}

export const getUser = async (userId) => {

    var params = {
        TableName: 'USER',
        Key: { 'id': { S: userId } }
    };

    const user = await db.getItem(params).promise();

    return converter.unmarshall(user);
}
