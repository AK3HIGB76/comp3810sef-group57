## 1. Project Information
- **Project Name**: Inventory Management System  
- **Group Number**: Group 57  
- **Group Members**:
  | Name             | Student ID   |
  |------------------|--------------|
  | Ip Ka Chung      | 14108542     |
  | Yung Tsz Chai    | 14109090     |
  | Mok Chun Hei     | 14030330     |
  | Ching Chin Ming  | 14108289     |
  
## 2. Project File Introduction
  | File / Folder     | Description |
  |-------------------|-------------|
  | **server.js**     | The main program includes: Express setup, MongoDB connection, session login system, employee registration, protected Inventory CRUD webpage, and RESTful API (/api/inventory). |
  | **package.json**  | Dependencies: express, ejs, express-session, mongodb, cookie-session, express-formidable   |
  | **Views**         | 'dashboard.ejs', 'inventory_add.ejs', 'inventory_edit.ejs', 'inventory_list.ejs', 'login.ejs', 'register.ejs'   |
 
## 3. Cloud-based Server URL
  - https://comp3810sef-group57.onrender.com
 
## 4. Operation Guides

### 4.1 Use of Login/Logout Pages
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

### 4.2 Use of CRUD Web Pages
All CRUD pages are protected; Access via /inventory after login.
| Operation   | UI/Steps  |
|-------------|-----------|
| **Create**  | From /inventory list, click "Add New Item" Button -> Redirects to /add form -> Fill all data and click "Save item"|
| **Read**| Visit /inventory -. Shows table of all items sorted by name|
| **Update**| In /inventory list, click "Edit" button in action field -> Redirects to /edit form -> Modify data and click "Update Item"|
| **Delete**| In /inventory list, click "Delete" button in action field -> Pop-up confirm remind -> click confirm then delete item; click cancel then noting happend|

### 4.3 Use of RESTful CRUD Services
| Operation   | HTTP Method | Path URI              | Description |
|-------------|-------------|-----------------------|----------------------------|
| **Read**    | GET        | /api/inventory        | Returns array of all items. |
| **Create**  | POST       | /api/inventory        | Add a new inventory item.   |
| **Update**  | PUT        | /api/inventory/:id    | Update item by '_id'.       |
| **Delete**  | DELETE     | /api/inventory/:id    | Delete item by '_id'.       |

**How to Test**
- **GET all**: curl https://comp3810sef-group57.onrender.com/api/inventory
- **POST add**: curl -X PUT https://comp3810sef-group57.onrender.com/api/inventory/69201d7e9a0f5b8367d9dcca \
-H "Content-Type: application/json" \
-d '{"quantity":999}'
- **PUT update**: `curl -X PUT https://comp3810sef-group57.onrender.com/api/inventory/66f9a1b2c3d4e5f6789abcd -H "Content-Type: application/json" -d '{"quantity":999}'`
