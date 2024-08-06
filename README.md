## Project Name: HuskyJobHuntTracker
#### CS5520 2024 Summer , Group 2
#### Team members: Jieling Gong, Cong Fu


# Iteration 1:


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







