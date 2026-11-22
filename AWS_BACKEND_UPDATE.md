# INDUSPORTAL AWS Backend Update Guide
## Features Added:
1. **Option 4: Admin Dashboard (DynamoDB Enquiries Viewer)**
2. **Option 3: Amazon SNS Email Alerts on Enquiry Submission**

---

### Step 1: Update Your AWS Lambda Code (`IndusPortalEnquiryHandler`)

1. Open **AWS Lambda Console** in your browser.
2. Select your function: **`IndusPortalEnquiryHandler`**.
3. Under the **Code** tab, open **`index.mjs`** (or **`index.js`**).
4. Replace the entire code with the code below:

```javascript
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

const REGION = "ap-southeast-2"; // Sydney region matching your API Gateway
const ddbClient = new DynamoDBClient({ region: REGION });
const docClient = DynamoDBDocumentClient.from(ddbClient);
const snsClient = new SNSClient({ region: REGION });

const TABLE_NAME = "Enquiries";

// Optional: Set your SNS Topic ARN here, or configure it as Lambda Environment Variable SNS_TOPIC_ARN
const SNS_TOPIC_ARN = process.env.SNS_TOPIC_ARN || "";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Content-Type": "application/json"
};

exports.handler = async (event) => {
  console.log("Incoming event:", JSON.stringify(event));

  // Determine HTTP Method (supports HTTP API v2 & REST API)
  const httpMethod = event.requestContext?.http?.method || event.httpMethod || "POST";

  // 1. Handle CORS Preflight OPTIONS
  if (httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: ""
    };
  }

  // 2. Handle GET -> Return all enquiries for Admin Dashboard
  if (httpMethod === "GET") {
    try {
      const scanResult = await docClient.send(new ScanCommand({
        TableName: TABLE_NAME
      }));

      // Sort newest first by enquiryId or createdAt
      const items = (scanResult.Items || []).sort((a, b) => {
        const idA = String(a.enquiryId || "");
        const idB = String(b.enquiryId || "");
        return idB.localeCompare(idA);
      });

      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          message: "Enquiries fetched successfully",
          count: items.length,
          enquiries: items
        })
      };
    } catch (error) {
      console.error("DynamoDB Scan Error:", error);
      return {
        statusCode: 500,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          message: "Unable to retrieve enquiries from DynamoDB",
          error: error.message
        })
      };
    }
  }

  // 3. Handle POST -> Save enquiry to DynamoDB & Publish SNS notification
  if (httpMethod === "POST") {
    try {
      let bodyData = {};
      if (typeof event.body === "string") {
        bodyData = JSON.parse(event.body);
      } else if (typeof event.body === "object" && event.body !== null) {
        bodyData = event.body;
      }

      const enquiryId = "IMR-" + Date.now();
      const createdAt = new Date().toISOString();

      const newRecord = {
        enquiryId: enquiryId,
        buyerName: bodyData.buyerName || "",
        companyName: bodyData.companyName || "",
        buyerEmail: bodyData.buyerEmail || "",
        buyerPhone: bodyData.buyerPhone || "",
        materialName: bodyData.materialName || "",
        quantity: bodyData.quantity || "",
        quantityUnit: bodyData.quantityUnit || "",
        deliveryLocation: bodyData.deliveryLocation || "",
        additionalNotes: bodyData.additionalNotes || "",
        createdAt: createdAt
      };

      // Put item into DynamoDB
      await docClient.send(new PutCommand({
        TableName: TABLE_NAME,
        Item: newRecord
      }));

      console.log("Saved to DynamoDB successfully:", enquiryId);

      // Publish to Amazon SNS (Option 3: Email Notification)
      if (SNS_TOPIC_ARN) {
        try {
          const emailSubject = `🔔 New Enquiry: ${newRecord.materialName} (${enquiryId})`;
          const emailMessage = 
`New Industrial Material Enquiry Received!

------------------------------------------------
RFQ Reference: ${newRecord.enquiryId}
Material:      ${newRecord.materialName}
Quantity:      ${newRecord.quantity} ${newRecord.quantityUnit}

BUYER DETAILS:
Buyer Name:    ${newRecord.buyerName}
Company:       ${newRecord.companyName}
Email:         ${newRecord.buyerEmail}
Phone:         ${newRecord.buyerPhone}

LOGISTICS & REQUIREMENTS:
Delivery:      ${newRecord.deliveryLocation || "Not specified"}
Notes:         ${newRecord.additionalNotes || "None"}
Received At:   ${newRecord.createdAt}
------------------------------------------------

Please review this requirement in IndusPortal Admin Desk.`;

          await snsClient.send(new PublishCommand({
            TopicArn: SNS_TOPIC_ARN,
            Subject: emailSubject,
            Message: emailMessage
          }));
          console.log("SNS Notification dispatched successfully");
        } catch (snsErr) {
          console.warn("SNS Notification failed, but enquiry was saved:", snsErr.message);
        }
      }

      return {
        statusCode: 201,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          message: "Enquiry saved successfully",
          enquiryId: enquiryId
        })
      };

    } catch (error) {
      console.error("DynamoDB Put Error:", error);
      return {
        statusCode: 500,
        headers: CORS_HEADERS,
        body: JSON.stringify({ message: "Unable to save enquiry", error: error.message })
      };
    }
  }

  // Default catch-all
  return {
    statusCode: 405,
    headers: CORS_HEADERS,
    body: JSON.stringify({ message: "Method Not Allowed" })
  };
};
```
*(Note: If your Lambda uses ES Modules `import ... from ...`, you can also use `import` syntax or keep CommonJS `require`)*
5. Click **Deploy** in the Lambda Console.

---

### Step 2: Grant Permissions to Lambda (IAM Role)

1. In Lambda, go to the **Configuration** tab ➔ **Permissions**.
2. Click on the **Role name** to open IAM.
3. Click **Add permissions** ➔ **Attach policies** (or **Create inline policy**).
4. Add:
   - **AmazonDynamoDBFullAccess** (or allow `dynamodb:Scan` on table `Enquiries`).
   - **AmazonSNSFullAccess** (or allow `sns:Publish`).
5. Save the policy.

---

### Step 3: Set Up Amazon SNS (For Option 3 Email Alerts)

1. Open **Amazon SNS Console** (in `ap-southeast-2` Sydney region).
2. Click **Topics** ➔ **Create topic**.
   - Type: **Standard**
   - Name: `IndusPortalEnquiryAlerts`
   - Click **Create topic**.
3. Copy the **Topic ARN** (e.g., `arn:aws:sns:ap-southeast-2:083268669338:IndusPortalEnquiryAlerts`).
4. On the Topic page, click **Create subscription**:
   - Protocol: **Email**
   - Endpoint: Enter your email (e.g. `karthikhugar88@gmail.com`).
   - Click **Create subscription**.
5. Check your email inbox for an email from **AWS Notifications** and click **Confirm subscription**.
6. Back in **Lambda Console** (`IndusPortalEnquiryHandler`):
   - Go to **Configuration** ➔ **Environment variables** ➔ **Edit**.
   - Add:
     - Key: `SNS_TOPIC_ARN`
     - Value: `arn:aws:sns:ap-southeast-2:...:IndusPortalEnquiryAlerts`
   - Click **Save**.

---

### Step 4: Deploy the Updated Website to AWS Amplify

Upload the newly updated **`IndusPortal-Updated.zip`** to AWS Amplify to enable the **📊 Admin View** button and live DynamoDB table on your live site!
