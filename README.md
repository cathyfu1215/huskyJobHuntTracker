## Project Name: HuskyJobHuntTracker
#### CS5520 2024 Summer , Group 2
#### Team members: Jieling Gong, Cong Fu

### Data Model:

Collections and subcollections: 
- users
- jobApplicationRecords
- notes 
- todos

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
- status (Enum)
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







