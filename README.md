Basic Run Command-
Open Both Folder in Vs Code run 'npm start' on spearte terminals on both of the folder


![Screenshot (214)](https://github.com/codekid69/CSV_CRUD/assets/123632128/73d4b5c4-42d9-41af-8fdc-f6d621122ccf)



Working Condition And Basic Functionalities


1) Upload The CSV file to perform the Crud functionility

![Screenshot (207)](https://github.com/codekid69/CSV_CRUD/assets/123632128/0c1a5e29-d771-438d-b4bb-15b95e3d4c53)


2) Here It Converts the CSV Data to JSON data and give the preview
   
 ![Screenshot (206)](https://github.com/codekid69/CSV_CRUD/assets/123632128/37481757-488b-40b5-98ac-9391f4feb67c)


 3) Starting with create which is one of CRUD functionality user is able to create the new entry

![Screenshot (212)](https://github.com/codekid69/CSV_CRUD/assets/123632128/fa34b961-0db7-4c79-8978-6365a12a26b7)

4) It also Allows User to Edit Or Delete the data as per the requirements

   ![Screenshot (211)](https://github.com/codekid69/CSV_CRUD/assets/123632128/2d7f89ad-fb88-47ee-81e3-63aa78dc681e)


5) At last user can export/download its newly edit csv
   
![Screenshot (213)](https://github.com/codekid69/CSV_CRUD/assets/123632128/881669ff-190b-4c1b-aebf-b564e5bb128b)


API USED TO PERFORM THE FUNCTIONALITIES

1) For converting csv file to json -"POST" "http://127.0.0.1:5000/upload" 
2) For Fetching the newly edited data-"GET" "http://127.0.0.1:5000/data"
3) For Posting the newly extry in data-"POST" "http://127.0.0.1:5000/data"
4) For Updating the entry in the data-"PUT" "http://127.0.0.1:5000/data/id"
5) For Deleting the entry from the data-"DELETE" "http://127.0.0.1:5000/data/id"
6) For Downloading the final edited file in csv format-"GET" "http://127.0.0.1:5000/export"
   
