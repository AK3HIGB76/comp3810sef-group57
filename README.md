# 1. Project info:
- **project Name**: Inventory Management System
- **Group Number**: Group 57
- **Group Members**:

## 1. Project Information
- **Project Name**: Inventory Management System  
- **Group Number**: Group 57  
- **Group Members**:
  | Name             | Student ID   |
  |------------------|--------------|
  |    |     |
  | Yung Tsz Chai    | 14109090     |
  |    |     |
  |    |     |
  
## 2. Project File Introduction
  | File / Folder     | Description |
  |-------------------|-------------|
  | **server.js**     | The main program includes: Express setup, MongoDB connection, session login system, employee registration, protected Inventory CRUD webpage, and RESTful API (/api/inventory). |
  | **package.json**  | Dependencies: express, ejs, express-session, mongodb, cookie-session, express-formidable   |
  | **Views**         | 'dashboard.ejs', 'inventory_add.ejs', 'inventory_edit.ejs', 'inventory_list.ejs', 'login.ejs', 'register.ejs'   |
 
## 3. Cloud-based Server URL
  - https://comp3810sef-group57.onrender.com
 
## 4. Operation Guides

### Use of Login/Logout Pages
**Login**:
  -Staff ID: '(StaffID )'
  -Password: '(Password)'
  
**Step**:
  1. Visit the login page.
  2. Enter Staff ID and Password in the form.
  3. Click "Login" button -redirects to /dashboard on success; shows error on failure.
  4. To register new staff, click link "Register here" to /register.
     
**Logout**:
  From any page, click "Logout" link to /logout.
  
