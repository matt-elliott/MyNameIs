# My Name Is
An event management app that helps your attendees get to know each other. A digital "My Name Is" badge.


### APP FLOW
#### Admin user
1. admin user logs in to site / signs up and creates profile
2. admin user creates an event
3. admin user adds emails of people to invite
4. app sends invite links (links are to login page but with event id so new users are attached to event)
5. admin user can now go back and check event page
6. admin profile has my events : a list of previous events attended and created

#### Invited user
1. user follows signup url to sign up page with event id in url
2. creates profile and submits to app
3. app links user to event
4. user is presented with the event page 
5. user can follow link to their profile and update info

#### Login
1. User inputs username and password
2. If their account exists we add "loggedin" cookie. They now have access to their dashboard, profile page, and the create event page
3. If their account doesnt exist display "try again" or "signup" prompts.

---

*#### TIME CONTROL
X. first remove get functions from events model and leave it to receive datetime
X. add momentjs to add event page
x. have date, start time, and end time inputs receive strings
6. on get event page translate UTC datetimes into HH:mm a MM/DD/YYYY format and send to front end*