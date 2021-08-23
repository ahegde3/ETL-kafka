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
   
   ### Other Details
   * There is a single table product which is decribed in /uploader/mydump.sql file
    
    
      create table product (`name` varchar(25),`sku` varchar(25),`description` varchar(200),PRIMARY KEY(`sku`))
     
     
  * The service is able to extract and store data in a distributed manner which could is scalable and fault tolerant when hosted in multiple servers 
   
  * The service is not able to upload all the data in under 2 minutes but if given more time it could have been acheived

