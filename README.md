# Firebase Doll Stock Manage

## จุดประสงค์
เนื่องจากมีโรงงานตุ๊กตาแห่งหนึ่งที่ต้องการระบบจัดการ Stock ของโรงงานซึ่งระบบนี้สามารถจัดเก็บข้อมูลรายละเอียดของตุ๊กตา,เนื้อผ้า,ข้อมูลลูกค้า, และยังสามารถคำนวณการใช้ผ้าใน Order ได้ และต้องการให้ระบบนี้สามารถทำงานได้ทุก Platform เข้าถึงได้จากทุกที่ กระผมจึงคิดที่จะทำ
Web Application สำหรับจัดการคลังสินค้าด้วยระบบจัดเก็บฐานข้อมูลแบบ NoSQL ด้วย Firebase โดยสามารถที่จะจัดการคลังสินค้าของโรงงานได้อย่างง่ายดาย มี User Interface ที่สวยงามใช้งานง่าย และสามารถที่จะเข้าถึงฐานข้อมูลที่ได้จากที่ไหนก็ได้บนโลก เพียงแค่มีการเชื่อมต่อ Internet 

## Feature
- ระบบจัดการ Stock แก้ไข,เพิ่ม,ลบ ข้อมูล Stock
- ระบบ Authentication
- แยกสิทธ์การเข้าถึงข้อมูลของผู้จัดการกับพนักงาน
- ระบบคาดเดาที่อยู่
- สร้างรูปแบบของตุ๊กตาโดยดึงข้อมูลจาก Stock ที่มีอยู่
- ระบบ Checkout ตุ๊กตา คำนวณการใช้ผ้าของตุ๊กตา และตัด Stock ตามการคำนวณอัตโนมัติ
- หน้าจัดการส่งตุ๊กตาให้กับ Supplier
- หน้าสรุป Order ของ Supplier

## Demo Account
- Owner Em@il : owner@fabricstock.co.th | Password : 123456789z
- Staff Em@il : staff@fabricstock.co.th | Password : 123456789z

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
