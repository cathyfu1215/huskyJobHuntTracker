## Project Name: HuskyJobHuntTracker
#### CS5520 2024 Summer , Group 2
#### Team members: Jieling Gong, Cong Fu


# Iteration 1:


### current state of our product:

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







