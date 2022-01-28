# Basic AWS Lambda deploy using GitHub Actions & Serverless

## Prerequisites
 - Having an **AWS** account
 - Having a **GitHub** account
 - Having **NodeJS** and **npm** installed on your machine

## Index

 1. Create a GitHub repo
 2. Set up AWS IAM user
 3. Init your GitHub repo
 4. Create GitHub Actions
 5. Test your Lambda function
 6. Create API Gateway

## 1. Create a GitHub repo

 - Go to your GitHub profile, and then click on "**Repositories**". Click on the green button "**New**", give the repo a name (***basic-serverless-lambda***) and then choose Public or Private based on your needs; then click on the "**Create repository**" green button. Once you have created it, copy the link, go to your terminal and enter the command: `git clone [link-to-your-repo.git]`.

## 2. Set up AWS IAM user

 - In your AWS account, go to the **IAM control panel**, in the section **Users**:
   https://console.aws.amazon.com/iam/home#/users
   
 - Create a new user:
	 - click on "**Add user**" button, then give a name (***lambda-user***) and, under the "Select AWS access type" section, check the "**Programmatic access**" box; then, click on "**Next: Permissions**"
	 - In "Set permissions" section, be sure that the "**Add user to group**" is setted, and then click "**Create group**". Give the group a name (***lambda-group***), and in the Search box find the following policies:
		 - **AmazonS3FullAccess**
		 - **AWSCloudFormationFullAccess**
		 - **AWSLambda_FullAccess**
		 - **AWSLambdaRole**
		 - **CloudWatchLogsFullAccess**
		 - **IAMFullAccess**
	 - Then click on "**Next: Tags**" and then on "**Next: Review**". Be sure that everything's ok and then click on "**Create user**".
	 - **IMPORTANT**: now you'll see the ***Access key ID*** and the ***Secret access key*** for the User you just created. We need to set them as GitHub Secrets. Don't close this window until the next steps aren't completed, or you'll lose these credentials forever, making it necessary to repeat the entire User creation procedure.
		 - In your GitHub repo, go to the "**Settings**" panel, then go to "**Secrets**";
		 - Click on "**New repository secret**": give the secret a name (`AWS_ACCESS_KEY_ID`) and paste the value you see in the AWS User page. Then click on "**Add Secret**";
		 - Do the same for the Secret access key: give it a name (`AWS_SECRET_ACCESS_KEY`), paste the value and then "**Add Secret**".

## 3. Init your GitHub repo

 - **Install serverless** by entering the command: `npm i -g serverless`
 - **Create serverless template** by entering the command: `serverless create --template aws-nodejs`
 - **Create a directory** called "src", and move the `handler.js` file inside that folder. 
 - **Edit** the `serverless.yml` file:
	 - under `provider`, **change** the `runtime` to `nodejs14.x`;
	 - **uncomment** the `stage` and `region`, and be sure that this is set to your correct region (mine is `eu-central-1`);
	 - in the `functions`, name the function as you wish, and feel free to add more. For this example, be sure that the `handler` path correctly refers to your `src/handler.hello`;
	 - **add** `timeout: 60` and `memorySize: 128`.

## 4. Create GitHub Actions

 - In your project folder, **create a folder** and name it `.github`. Mind the dot before github. Inside that folder, **create another folder** called `workflows`. Inside that folder, **create a file** called `main.yml`.
 - Go to the serverless GitHub page: https://github.com/serverless/github-action and **copy the given example, then paste it** inside your `main.yml` file.
 - **Change** the `name` to wathaver suites your needs.
 - Feel free to delete the line: `- run: npm ci`.
 - Under `env`, **delete** the `SERVERLESS_ACCESS_KEY: ${{ secrets.SERVERLESS_ACCESS_KEY }}`, and **uncomment the last two lines** (`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`).
 - **Commit and push** your changes, then go to your GitHub repo; click on the "**Actions**" panel to verify the workflows is correctly running and that the jobs finishes successfully.

## 5. Test your Lambda function

 - In your AWS account, go to the **Lambda control panel**: https://console.aws.amazon.com/lambda/home
 - **IMPORTANT: if you don't see any Lambda function, be sure that you're on the correct region**. On the top-right corner, to the right of your username, click to select the correct region.
 -  Once you see you lambda function, **click on it**. Under the "Function overview" section, **switch from "Code" panel to "Test"**. Click on the orange button **Test**; if it succeed, click on **logs** to see more details.

## 6. Create API Gateway

 - In your AWS account, go to the **API Gateway panel**: https://console.aws.amazon.com/apigateway/home
 - Choose **HTTP API** and click the **Build** button.
 - Click the **Add integration** button and from the menu select **Lambda**. Be sure that you're using the correct region, then selected the lambda function you just created.
 -  **Choose a name** for the API (***Lambda_API***), then click **Next**, then **Next** again and **Next** for the third time.
 - Check if everything's ok, then click on the **Create** button.

**Congratulations, you successfully completed this tutorial!**
