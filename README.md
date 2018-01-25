# Priority based Queuing System for Emergency Room with ETA
This project is under development. Objective is to develop queuing system for emergency room where patient can register itself to the queue using a touch screen form or by talking to
Amazon Alexa and patient will get ETA for treatment. For acceptance of system and easy deployment the complete system will be developed
on low cost on board computing like Raspberry Pi. Once case is registered in the queue, it will be queued by priority aligned to severity of the
case. Doctors will be able to pick next available case. Paramedics can update the case while it is in queue with information like current medications,
allergies, health conditions and update the severity if patient’s condition is deteriorated in ER. Once patient is treated the total wait and
treatment time is recorded in the database, this historic data will be used to predict ETA for future.

# Proposed Technologies

 1. NodeJS (HTTP API)
 2. MongoDB (Database System)
 3. AngularJS (Front-end framework)
 4. RabbitMQ (QueuingSystem)
 5. Amazon Alexa
 6. On-board computing (Rasberry Pi)

![Flow](https://raw.githubusercontent.com/chetan-lu/er_queue/master/Flow.png)


# Introduction

 - Registering case(Producer): This can be done in two ways
	- Amazon Alexa: Amazon Alexa is an Amazon Web Services service which provides API for voice processing
and voice generation. Patient can communicate with this system which will be hosted on Raspberry
Pi and register his/her case.  
	- A touch screen web form: Patient or hospital staff can use this web form on behalf of patient to register
a case. It will be based on single page application using front end technology like AngularJS and use
WebRTC to send data quickly to NodeJS instance which tied to database and manages queue.
 - Queue management will be done using queue management systems like RabbitMQ and severity of case will act
as priority in the queue. The message in the queue which represents a case can be updated by paramedics with
information of patient while they are in the queue.
 - Doctor’s portal(Consumer): The ready messages(cases) will be pushed to Web Portal on Doctor’s account to
be picked up. Multiple Doctor Logins can act as consumer. The Web Portal will be touch screen enabled. This
application can be used by Doctor’s assistance. Due to nature of application, Web Sockets will be used to
communicate with web server which is much efficient than REST Calls and polling for notification data from
server to client
