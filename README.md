## Project Name: HuskyJobHuntTracker
#### CS5520 2024 Summer , Group 2
#### Team members:  Cong (Cathy) Fu , Jieling (Serena) Gong


----

## ❗️❗️Important note about iteration2 and iteration3:
- Please ensure that you have included this mapsApiKey and newsAPIKey in .env👇:
  - mapsApiKey="AIzaSyD53Fbwb06wlLX5hJIS0aRNnvhRYZXxT5c"
  - newsAPIKey="a1a6d062c00e441e8fb5ce6c581b025f"


We allocated our work so that Cathy has three functionalities to implement: Image, Auth, 3rd party API. Serena has three functionalities: location and notifications, 3rd party API.
Cathy plans to do more work in iteration 1 and 2, so she can relax in the last week. Serena will do more work in iteration 2 and 3.
Our total comtribution will be approximately 50:50.

----

## Iteration 3:

In iteration 3 we implemented functionalities of external APIs and Notification use. We also fixed bugs in the second iteration about location use and rendering a scrollable view containing virtual lists. 

Our users can :
- Add a to-do list, which contains several to-do items to a jobApplication record
- Issue a notification of each to-do item
- edit, save, and display user's home location , the target company's location and the user's current location
- Browse the top 3 news headlines in the job application record detail page
- Filter and quickly locate a job application record in the main view


### current state of our product:

- Add a to-do list item and issue a notification
- ![todoitem1](https://github.com/user-attachments/assets/661dfdc8-fbaf-4d62-a739-213a73189f34)
- edit, save and display multiple locations
- ![location1](https://github.com/user-attachments/assets/a11c6a58-f62c-4243-a1a1-096a41dd55c1)
- Browse news in the job application record detail view
- ![newsnotes](https://github.com/user-attachments/assets/a286b08d-d8d9-4bd8-8b43-ae7868aed03f)
- See the notes and todos in the application record detail view
- ![todo2](https://github.com/user-attachments/assets/a41e9866-79d6-40c9-bf89-615154184b0b)
- Filter one job application record according to company name or postion name
- ![jobrecords1](https://github.com/user-attachments/assets/c53d1ea9-c7a6-4d19-9eb8-77801a5e5e28)
- ![recordFilter1](https://github.com/user-attachments/assets/9f617f6a-0094-48d5-b9e1-c6b0cb64bed8)


### members contributions:
#### Cong:
- External API use (a news API)
- Added Filter to job application record list
- Some styling and UX design



#### Jieling:
- Notificate use
- The todo list component
- Fixed bugs in location use
  








----

## Iteration 2:



In iteration 2 we implemented functionalities like Authentication, Camera use and Location use. 
Our users now can :
- see a welcome page to encourage them login / signup
- sent a password reset email if they forget their password when logging in
- get alerted when they are creating a weak password when signing up
- only see and modify their own job application records/notes
- sort their job application record by date or preference score
- add a note with or without taking a picture using their phone camera to the job application record
- browse user's current and company's location in a seperate page under detail mode
- edit user's current and company's location in a seperate page under edit mode

### current state of our product:
- welcome page
- ![welcomePage](https://github.com/user-attachments/assets/6f80074e-66f8-4ada-a60d-d1c565026dfd)
- add a note with a picture taken
- ![addANote](https://github.com/user-attachments/assets/9ede5d16-f353-488e-8681-de3bc3f3e554)
- notes added to the job application record
- ![NoteAdded](https://github.com/user-attachments/assets/185e211f-b511-4c32-abe2-d9e411288d81)
- the sorted job records list
- ![sortedJobList](https://github.com/user-attachments/assets/858bf6e9-e2ca-4314-9ea4-7a2d36238cbd)
- view location info
- ![view_location_info](https://github.com/user-attachments/assets/f6df4306-6bf4-438c-b4c5-fb5cde603dcd)
- browse location info to detail mode
- ![location_info_detail_mode](https://github.com/user-attachments/assets/fead7884-6e97-4329-b009-f41c278e3bff)
- edit company location
- ![edit_company_location](https://github.com/user-attachments/assets/9fae5b34-5081-475a-8e97-5f0839e53c70)
- browse location info to edit mode
- ![location_info_edit_mode](https://github.com/user-attachments/assets/39a47ba1-e37c-47b1-8953-606b744bcd0a)

### firebase rules of our top collection: Users Collection
```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    match /{document=**} {
      allow read, write: if request.auth != null;
      //Currently i am allowing registered users to read and write anything.
      
      //The logic is: I am using the uid from Auth to generate the user document id in
      //my Users collection. That is to say, only when users register/log in they will
      //have a unique id, and they will only have access to all the records in their 
      //own user document and its subcollections.
      
      //All of my stored data belongs to specific users and there is no "universal data".
    }
  }
}
```
### firebase rules of our storage

```
rules_version = '2';


service firebase.storage {
  match /b/{bucket}/o {

   
    match /{allPaths=**} {
      allow read, write: if true
    }
  }
}
```


### members contributions:
#### Cong:
- Authentication
- Camera use
- some styling and added the sorting function to jobRecords


#### Jieling:
- Integrated with Google Map API
- Enbaled the Location functionality
- Styling modification
  
- Plan for iteration 3:
  - Notification
  - Enable two markers on location component
  - User experience optimization

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







