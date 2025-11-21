1. Show inventory
curl <link>/api/inventory

2. Add new item
curl -X POST <link>/api/inventory \
-H "Content-Type: application/json" \
-d '{"name":"A4 Paper","quantity":500,"category":"Office Supplies","price":3,"status":"Available"}'

3. Update item
curl -X PUT <link>/api/inventory/69201d7e9a0f5b8367d9dcca \
-H "Content-Type: application/json" \
-d '{"quantity":999}'

