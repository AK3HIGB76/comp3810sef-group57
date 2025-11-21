1. Show inventory
curl https://comp3810sef-group57.onrender.com/api/inventory

2. Add new item
curl -X POST https://comp3810sef-group57.onrender.com/api/inventory \
-H "Content-Type: application/json" \
-d '{"name":"A4 Paper","quantity":500,"category":"Office Supplies","price":3,"status":"Available"}'

3. Update item
curl -X PUT https://comp3810sef-group57.onrender.com/api/inventory/69201d7e9a0f5b8367d9dcca \
-H "Content-Type: application/json" \
-d '{"quantity":999}'

