# Task Manager API

پروژه درس مباحث ویژه: طراحی REST API برای مدیریت کاربران (Users) و وظایف (Tasks) و آماده‌سازی Back-End با Docker.

## 1. منابع (Resources)
- **Users**: شناسه، نام و ایمیل کاربر
- **Tasks**: شناسه، عنوان، توضیحات، userId و وضعیت انجام
هر وظیفه از طریق userId به یک کاربر مرتبط است.

## 2. قرارداد API

### Users
| Method | Endpoint | کاربرد | Status |
|---|---|---|---|
| GET | /api/users | دریافت همه کاربران | 200 |
| GET | /api/users/:id | دریافت یک کاربر | 200 / 404 |
| POST | /api/users | ساخت کاربر | 201 / 400 |
| PUT | /api/users/:id | ویرایش کاربر | 200 / 404 |
| DELETE | /api/users/:id | حذف کاربر | 200 / 404 |

### Tasks
| Method | Endpoint | کاربرد | Status |
|---|---|---|---|
| GET | /api/tasks | دریافت همه وظایف | 200 |
| GET | /api/tasks/:id | دریافت یک وظیفه | 200 / 404 |
| POST | /api/tasks | ساخت وظیفه | 201 / 400 |
| PUT | /api/tasks/:id | ویرایش وظیفه | 200 / 400 / 404 |
| DELETE | /api/tasks/:id | حذف وظیفه | 200 / 404 |

### معنی Status Codeها
- 200 OK: درخواست موفق
- 201 Created: منبع جدید ساخته شد
- 400 Bad Request: داده ورودی ناقص یا نامعتبر
- 404 Not Found: منبع موردنظر پیدا نشد

نمونه ساخت کاربر:
```json
{ "name": "Reza", "email": "reza@example.com" }
```

نمونه ساخت وظیفه:
```json
{ "title": "تمرین Docker", "description": "ساخت Image", "userId": 1, "completed": false }
```

## 3. دیاگرام معماری

```text
       Client / Postman / Frontend
                  |
               HTTP/JSON
                  |
          Node.js + Express
               :3000
                  |
          +-------+-------+
          |               |
       Users API       Tasks API
       /api/users      /api/tasks
          |               |
      Users Data       Tasks Data
      (memory)         (memory)
```

## 4. فایل‌های Docker
- Dockerfile: دستور ساخت Image
- .dockerignore: حذف فایل‌های غیرضروری از Image
- package.json: وابستگی‌های پروژه
- server.js: کد API

## 5. اجرای پروژه

نصب و اجرای محلی:
```bash
npm install
npm start
```

ساخت Image:
```bash
docker build -t task-manager-api:1.0 .
```

اجرای Container با Port Mapping:
```bash
docker run -d --name task-manager-container -p 8080:3000 task-manager-api:1.0
```

بررسی:
```bash
docker ps
docker logs task-manager-container
```

آدرس تست: http://localhost:8080

Endpointهای نمونه:
- GET /api/users
- GET /api/tasks

توقف و حذف:
```bash
docker stop task-manager-container
docker rm task-manager-container
```

## 6. نکته
برای ساده‌سازی تمرین، داده‌ها در حافظه نگهداری می‌شوند و با توقف برنامه از بین می‌روند. در نسخه عملیاتی باید از پایگاه داده استفاده شود.

## نتیجه
در این فعالیت دو Resource طراحی شده، Endpointها و Status Codeها مشخص شده‌اند، دیاگرام معماری ارائه شده و Back-End با Docker قابل ساخت و اجرا است.
