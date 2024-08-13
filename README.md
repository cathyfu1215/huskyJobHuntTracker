## Project Name: HuskyJobHuntTracker
#### CS5520 2024 Summer , Group 2
#### Team members: Jieling Gong, Cong Fu

## Iteration 2:
In iteration 2 we implemented functionalities like Authentication, Camera use and Location use. 
Our users now can :
- see a welcome page to encourage them login / signup
- sent a password reset email if they forget their password when logging in
- get alerted when they are creating a weak password when signing up
- only see and modify their own job application records/notes
- sort their job application record by date or preference score
- add a note with or without taking a picture using their phone camera to the job application record
- see the interactive map in the job application detail page marking the company's location and the current location [to be modified]

### current state of our product:
- welcome page
- ![welcomePage](https://github.com/user-attachments/assets/6f80074e-66f8-4ada-a60d-d1c565026dfd)
- add a note with a picture taken
- ![addANote](https://github.com/user-attachments/assets/9ede5d16-f353-488e-8681-de3bc3f3e554)
- notes added to the job application record
- ![NoteAdded](https://github.com/user-attachments/assets/185e211f-b511-4c32-abe2-d9e411288d81)
- the sorted job records list
- ![sortedJobList](https://github.com/user-attachments/assets/858bf6e9-e2ca-4314-9ea4-7a2d36238cbd)


### members contributions:
#### Cong:
- Authentication
- Camera use
- some styling and added the sorting function to jobRecords


#### Jieling:
- Location use
[to be edited]

----

## Iteration 1:

In iteration 1 we implement the MVP of our project, we focus on building the skeleton of the whole project and the CRUD on JobApplicationRecords collection. Our
MVP version supports add / update / delete / browse the basic information(company name, position, status, date and perference score) of a job application record.


### current state of our product:
![1](https://github.com/user-attachments/assets/76d430f2-571c-4482-ac39-d1828e96c1bf)

![2](https://github.com/user-attachments/assets/28a549a5-cbe0-4996-8464-fb4964bb18dc)

![3](https://github.com/user-attachments/assets/380096df-3de2-4710-a7a0-0d7021d662aa)

![4](https://github.com/user-attachments/assets/9bce4604-9e58-42eb-92a1-87e42ad73e79)

![5](https://github.com/user-attachments/assets/2c959d4d-bbe1-4222-9478-3b54ef896305)



### members contributions:
#### Cong:
- whole skeleton of the app(screens and components)
- navigation (Stack and Tab)
- modified some styling of AddAJobApplication, added the preferenceScore selection
- created and implemented the EditJobApplication and JobApplicationDetail component


#### Jieling:
- the whole CRUD of JobApplicationRecords
- implemented the firebase set up and helper files
- implemented most of AddAJobApplication screen
- implemeneted the JobApplicationRecords screen


### Data Model in Iteration 1:

Collections and subcollections: 
- users (contains document 'user')
- jobApplicationRecords (contains document 'jobApplicationRecord')
- notes (contains document 'note')
- todos (contains document 'todo')

Documents: 
- user
- jobApplicationRecord
- note
- todo

The organization of the collections and documents:
- The top level of our collection is the users collection.
- Each user in users collection will have a document, which contains several properties, including the subcollection of jobApplicationRecords.
- Each jobApplicationRecord document will contain several properties, including the subcollection of notes and todos.
- Please see details of the documents below.


#### (Document)User
- email (String)
- name (String)
- profilePhoto (blob)
- numJobsSaved (int)
- numJobsApplied (int)
- numInterview (int)
- numAcceptance (int)
- numRejection (int)
- achievementLogs (list of Strings)
- badgesEarned (list of blobs)
- jobApplicationRecords (collection)

#### (Document)JobApplicationRecord
- company (String)
- postion (String)
- location (String/location object)
- preferenceScore (int, [1,10])
- URL (String,optional)
- status (Enum):
    - In Progress
    - Applied
    - Interviewing
    - Interviewed
    - Offer
    - Offer Accepted
    - Rejected
- notes (Collection,optional)
- todos (Collection,optional)
- isFavourite (boolean)
- hasTodoDue (boolean)
- lastUpdated (datetime)


#### (Document) Note
- photo (blob)
- text (String)

#### (Document) Todo
- text (String)
- completed (boolean)
- dueDate (datetime,optional)
- notifyBefore (int,optional)







