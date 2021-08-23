# Assignment
Postman Assignment

### Steps to run the code
 There are 3 different services:
  * Ingestion:To read from csv and produce to kafka
  * Uploader: To fetch from the kafka topic and send to db
  * Conluent kafka docker: To run kafka in the local system.

 ### Starting kafka
 In the project directory run
     
     docker-compose up 
     
  To create test topic go to localhost:9021 and configure "test" topic with 10 partition and 2 replication factor
  
 ### Starting Uploading Service
  This service will run multiple instance of node clients and single instance of mysql db
  ``` 
  cd Upload/
  docker-compose up
  ```
  
  ### Starting Ingestion Service
   ``` 
   cd Ingestion/
   docker-compose
   ```
   
   ### Stop any docker container
   ```
    docker-compose down
    
   ```

