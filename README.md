#DearJournalApp

##Installation

Install all Dependencies
```
npm install
```

##Start The Server

To run the server with default settings run
```
gulp
```

##Usage

If you want to reference your firebase database in your code to grab items strictly from the database you must call it like so below in your code after a controller call:

```
var ref = firebase.database().ref();
var itemRef = ref.child('itemRefs');
var itemRefs = $firebaseArray(itemRef);
```

##Workflow

Steps to follow when setting up your feature branch work stations via command line:

1. Create a 2nd branch aside from your master branch

  ```
  git checkout -b newBranch
  ```

2. Merge new branch with your master branch

  ```
  git merge master
  ```

3. Push merged code up to newBranch for updated version

  ```
  git push origin newBranch
  ```

4. Check newBranch repo to see if it's up to date with the master branch.  



##Deployment

In order to deploy your final adjustments to your work you must first check/realize if you are on the current branch that you want to deploy out.

Via command line:

1. Check what branch you are currently on

  ```
  git branch
  ```

2. If you're not on the correct branch, change it to the branch that you wish to deploy

  ```
  git checkout deployreadyBranch
  ```

3. Commit any code changes made to the soon deployed branch before deployment

  **git add all:**
  ```
  git gaa
  ```

  **git commit message:**
  ```
  gcmsg 'Added readme file to complete for deployment'
  ```

  **git push:**
  ```
  ggp deployreadyBranch
  ```

4. Merge updated code from ```deployreadyBranch``` to master branch for final deployment

  ```
  git merge master
  ```

5. If you haven't set up firebase hosting yet, do so by setting up deployment tools from the firebase google console database

  ```
  npm install -g firebase-tools
  ```


6. Set up firebase.json from the firebase google console database

  ```
  firebase init
  ```

7. Deploy ready code to firebase console

  ```
  firebase deploy
  ```
